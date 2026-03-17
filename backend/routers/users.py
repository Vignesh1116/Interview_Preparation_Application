from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import models, auth, database
from pydantic import BaseModel, EmailStr

router = APIRouter()

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(name=user.name, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = auth.create_access_token(data={"sub": new_user.email, "is_admin": new_user.is_admin})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = auth.create_access_token(data={"sub": db_user.email, "is_admin": db_user.is_admin})
    return {"access_token": access_token, "token_type": "bearer"}

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os

CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "your-placeholder-client-id.apps.googleusercontent.com")

class GoogleLogin(BaseModel):
    id_token: str

@router.post("/google-login", response_model=Token)
def google_login(data: GoogleLogin, db: Session = Depends(database.get_db)):
    try:
        # Verify the ID token
        idinfo = id_token.verify_oauth2_token(data.id_token, google_requests.Request(), CLIENT_ID)

        # ID token is valid. Get user's Google info
        email = idinfo['email']
        name = idinfo.get('name', 'Google User')
        
        db_user = db.query(models.User).filter(models.User.email == email).first()
        
        if not db_user:
            # Create new user if they don't exist
            # We use a long random string for password since they'll login via Google
            placeholder_password = auth.get_password_hash(os.urandom(32).hex())
            db_user = models.User(name=name, email=email, password=placeholder_password)
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
        
        # Generate access token for the authenticated user
        access_token = auth.create_access_token(data={"sub": db_user.email, "is_admin": db_user.is_admin})
        return {"access_token": access_token, "token_type": "bearer"}
        
    except ValueError as e:
        # Invalid token
        raise HTTPException(status_code=401, detail="Invalid Google token")

@router.post("/seed-admin")
def seed_admin(db: Session = Depends(database.get_db)):
    admin_email = "admin@gmail.com"
    db_user = db.query(models.User).filter(models.User.email == admin_email).first()
    if not db_user:
        hashed_password = auth.get_password_hash("admin@123")
        admin_user = models.User(name="Admin", email=admin_email, password=hashed_password, is_admin=1)
        db.add(admin_user)
        db.commit()
    return {"message": "Admin user ensured"}

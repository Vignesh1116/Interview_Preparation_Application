from sqlalchemy.orm import Session
from database import SessionLocal
import models
import auth

db = SessionLocal()
admin_email = "admin@gmail.com"
db_user = db.query(models.User).filter(models.User.email == admin_email).first()
if db_user:
    db.delete(db_user)
    db.commit()
    print("Old admin deleted")

hashed_password = auth.get_password_hash("admin@123")
admin_user = models.User(name="Admin", email=admin_email, password=hashed_password, is_admin=1)
db.add(admin_user)
db.commit()
print("New admin created with pbkdf2_sha256")
db.close()

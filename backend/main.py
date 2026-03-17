from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models
from routers import users, questions, answers

# Create the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Interview Prep Platform API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, tags=["Authentication"])
app.include_router(questions.router, tags=["Questions"])
app.include_router(answers.router, tags=["Answers"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Interview Preparation Platform API"}

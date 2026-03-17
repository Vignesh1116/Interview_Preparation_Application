from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
import models, database
from pydantic import BaseModel

router = APIRouter()

class QuestionSchema(BaseModel):
    id: int
    topic: str
    difficulty: str
    question_text: str
    question_type: str
    options: Optional[str] = None
    explanation: Optional[str] = None

    class Config:
        from_attributes = True

@router.get("/questions", response_model=List[QuestionSchema])
def get_questions(topic: Optional[str] = None, difficulty: Optional[str] = None, db: Session = Depends(database.get_db)):
    query = db.query(models.Question)
    if topic:
        query = query.filter(models.Question.topic == topic)
    if difficulty:
        query = query.filter(models.Question.difficulty == difficulty)
    return query.all()

@router.post("/questions/seed")
def seed_questions(db: Session = Depends(database.get_db)):
    from seed_data import seed_database
    count = seed_database(db)
    return {"message": f"Successfully seeded {count} questions"}

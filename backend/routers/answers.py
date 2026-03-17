from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import models, database, auth
from ml_service import ai_scorer
from pydantic import BaseModel
from typing import List

router = APIRouter()
security = HTTPBearer()

class AnswerSubmit(BaseModel):
    question_id: int
    answer_text: str

class AnswerResult(BaseModel):
    score: float
    feedback: str

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(database.get_db)):
    token = credentials.credentials
    payload = auth.decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(models.User).filter(models.User.email == payload["sub"]).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

@router.post("/submit-answer", response_model=AnswerResult)
def submit_answer(data: AnswerSubmit, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    question = db.query(models.Question).filter(models.Question.id == data.question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    if question.question_type == "MCQ":
        if data.answer_text == question.correct_option:
            score = 100.0
            feedback = "Correct! Well done."
        else:
            score = 0.0
            feedback = f"Incorrect. The correct answer was: {question.correct_option}"
    else:
        score, feedback = ai_scorer.score_answer(data.answer_text, question.topic)
    
    new_answer = models.Answer(
        user_id=current_user.id,
        question_id=question.id,
        answer_text=data.answer_text,
        score=score
    )
    db.add(new_answer)
    db.commit()
    
    return {"score": score, "feedback": feedback}

@router.get("/results")
def get_results(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    results = db.query(models.Answer).filter(models.Answer.user_id == current_user.id).all()
    return results

@router.get("/performance")
def get_performance(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    # Group results by topic for analytics
    answers = db.query(models.Answer).filter(models.Answer.user_id == current_user.id).all()
    
    topic_scores = {}
    for ans in answers:
        q = db.query(models.Question).filter(models.Question.id == ans.question_id).first()
        if q.topic not in topic_scores:
            topic_scores[q.topic] = []
        topic_scores[q.topic].append(ans.score)
        
    performance = {topic: sum(scores)/len(scores) for topic, scores in topic_scores.items()}
    return performance

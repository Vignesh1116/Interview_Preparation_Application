from sqlalchemy import create_engine, text
engine = create_engine("sqlite:///./interview.db")
with engine.connect() as conn:
    try:
        res = conn.execute(text("SELECT COUNT(*) FROM questions"))
        print(f"Questions count: {res.scalar()}")
    except Exception as e:
        print(f"Error: {e}")

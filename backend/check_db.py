from sqlalchemy import create_engine, inspect
import os

db_url = "sqlite:///./interview.db"
engine = create_engine(db_url)
inspector = inspect(engine)
if "users" in inspector.get_table_names():
    columns = [c["name"] for c in inspector.get_columns("users")]
    print(f"Users columns: {columns}")
else:
    print("Users table not found")

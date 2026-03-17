from auth import get_password_hash

try:
    h = get_password_hash("admin@123")
    print(f"Hash: {h}")
except Exception as e:
    print(f"Error: {e}")

from auth import verify_password
h = "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s57gzRTf3U2O." # admin@123
try:
    match = verify_password("admin@123", h)
    print(f"Match: {match}")
except Exception as e:
    print(f"Error: {e}")

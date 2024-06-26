from fastapi import FastAPI
from app.core.config import settings
from app.db.base import init_db

app = FastAPI()
app.title = settings.PROJECT_NAME

@app.on_event("startup")
def on_startup():
    init_db()

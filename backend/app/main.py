from fastapi import FastAPI
from app.core.config import settings
from app.api.v1.api_v1 import api_router
from app.db.base import init_db

app = FastAPI()
app.title = settings.PROJECT_NAME

app.include_router(api_router, prefix="/api/v1")

@app.on_event("startup")
def on_startup():
    init_db()

from fastapi import FastAPI
from app.core.config import settings

app = FastAPI()
app.title = settings.PROJECT_NAME

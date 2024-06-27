from fastapi import FastAPI
from app.core.config import settings
from app.api.v1.api_v1 import api_router
from app.db.base import init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.title = settings.PROJECT_NAME

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # TODO: update this before deploying to production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.on_event("startup")
def on_startup():
    init_db()

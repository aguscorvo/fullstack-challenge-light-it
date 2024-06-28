from http.client import HTTPException
from typing import Optional
from fastapi import APIRouter, Depends, File, UploadFile, Query
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.patient import PatientCreate
from app.services.patients import create, get, get_since, upload_document_photo
from pydantic import BaseModel

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", status_code=201)
def create_patient(
    patient: PatientCreate, db: Session = Depends(get_db)
):
    new_patient = create(patient, db)

    # TODO: send confirmation email

    return new_patient

@router.get("/", status_code=200)
def get_patients(since: Optional[int] = Query(None, description="Fetch users created since this timestamp in milliseconds"), db: Session = Depends(get_db)):
    try:
        if since:
            patients = get_since(db, since)
        else:
            patients= get(db)
        return patients
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/upload-photo")
async def upload_photo(file: UploadFile = File(...)):
    url = upload_document_photo(file)
    return url

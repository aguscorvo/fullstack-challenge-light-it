from http.client import HTTPException
from typing import Optional
from fastapi import APIRouter, Depends, File, UploadFile, Query, BackgroundTasks
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.patient import PatientCreate
from app.services.patients import create, get, get_since, send_email, startup_create, upload_document_photo
from pydantic import BaseModel

router = APIRouter()

class EmailSchema(BaseModel):
    recipient: str
    subject: str
    body: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/startup-create", status_code=201)
def startup(db: Session = Depends(get_db)):
    startup_create(db)

@router.post("/", status_code=201)
def create_patient(
    patient: PatientCreate, db: Session = Depends(get_db), background_tasks: BackgroundTasks = BackgroundTasks):
    new_patient = create(patient, db)

    if(new_patient):
        background_tasks.add_task(send_email, patient.first_name, patient.email,)

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

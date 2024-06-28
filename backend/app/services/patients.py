from app.schemas.patient import PatientCreate
from fastapi import HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from app.db.models.patient import Patient
import cloudinary
from cloudinary.uploader import upload
from app.core.config import settings
from fastapi.responses import JSONResponse
import smtplib
from datetime import datetime


cloudinary.config(
    cloud_name = settings.CLOUDINARY_CLOUD_NAME,
    api_key = settings.CLOUDINARY_API_KEY,
    api_secret= settings.CLOUDINARY_API_SECRET)

def create(patient: PatientCreate, db: Session):
    db_patient = db.query(Patient).filter(Patient.email == patient.email).first()
    if db_patient:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_patient = Patient(
        first_name=patient.first_name,
        last_name=patient.last_name,
        email=patient.email,
        phone_country_code=patient.phone_country_code,
        phone_number=patient.phone_number,
        document_photo=patient.document_photo,
    )
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient

def get(db: Session):
    patients = db.query(Patient).all()
    return patients

def get_since(db: Session, since: int):
    since_datetime = datetime.fromtimestamp(since / 1000.0)
    patients = db.query(Patient).filter(Patient.created_at >= since_datetime).all()
    return patients

def upload_document_photo(file: UploadFile = File(...)):
    try:
        result = upload(file.file)
        return JSONResponse(content= {"url": result["secure_url"]})
    except Exception as e:
        raise HTTPException(status_code=400, detail={e})

from app.schemas.patient import PatientCreate
from app.templates.email import getTemplate
from fastapi import HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from app.db.models.patient import Patient
import cloudinary
from cloudinary.uploader import upload
from app.core.config import settings
from fastapi.responses import JSONResponse
import resend
from typing import Dict
import smtplib
from datetime import datetime
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

cloudinary.config(
    cloud_name = settings.CLOUDINARY_CLOUD_NAME,
    api_key = settings.CLOUDINARY_API_KEY,
    api_secret= settings.CLOUDINARY_API_SECRET)



def startup_create(db: Session):
    first_email = "ajuanperez@gmail.com"
    db_patient = db.query(Patient).filter(Patient.email == first_email).first()
    if(db_patient):
        return

    db.add_all([
        Patient(first_name="Juan", last_name="Perez", email=first_email, phone_country_code="598", phone_number="099111222", document_photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSkaSapNtWFwALz6Su_xYY9Kg1Z_1M86RDUA&s"),
        Patient(first_name="Maria", last_name="Gonzalez", email="bmariagonzalez@gmail.com", phone_country_code="598", phone_number="099333444", document_photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL2ro0tzrVjLJ8eC19aogh-ZiO6UzmRVYuTw&s"),
        Patient(first_name="Luis", last_name="Rodriguez", email="cluisrodriguez@gmail.com", phone_country_code="598", phone_number="099555666", document_photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB69DxHjl5PLatP_LLZk_zoJVM2bVOxAQ5vg&s"),
    ])
    db.commit()
 
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
    
conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS = True
)
    
async def send_email(name: str, email:str):
    message = MessageSchema(
        subject="Successfully registered!",
        recipients=[email],
        body= getTemplate(name),
        subtype=MessageType.html,
    )
    
    fm = FastMail(conf)
    await fm.send_message(message)

from app.schemas.patient import PatientCreate
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.db.models.patient import Patient

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

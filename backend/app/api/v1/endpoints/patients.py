from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.patient import PatientCreate

from app.services.patients import create, get

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
def get_patients(db: Session = Depends(get_db)):
    patients= get(db)
    return patients

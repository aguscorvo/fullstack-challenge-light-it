from app.db.session import Base
from sqlalchemy import Column, Integer, String, DateTime
import datetime


class Patient(Base):
    __tablename__ = "patients"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False, unique=True)
    phone_country_code = Column(String(5), nullable=False)
    phone_number = Column(String(20), nullable=False)
    document_photo = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now)

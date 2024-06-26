from pydantic import BaseModel, EmailStr, field_validator, HttpUrl

class PatientCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone_country_code: str
    phone_number: str
    document_photo: HttpUrl

    class Config:
        json_schema_extra = {
            "example":{
                "first_name": "Juan",
                "last_name": "Perez",
                "email": "juanperez@gmail.com",
                "phone_country_code": "598",
                "phone_number": "099111222",
                "document_photo": "https://example.com"
            }
        }

    @field_validator("first_name", "last_name")
    def validate_first_names(cls, v):
        if not v.isalpha():
            raise ValueError("Name must contain only letters")
        return v

    @field_validator("email")
    def validate_email(cls, v):
        if not v.endswith("@gmail.com"):
            raise ValueError("Email must be a @gmail.com address")
        return v

import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "FullStack Challenge"
    SQLALCHEMY_DATABASE_URI: str = "mysql://root:example@db/patients"
    CLOUDINARY_CLOUD_NAME: str = os.environ.get("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY: str = os.environ.get("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET: str = os.environ.get("CLOUDINARY_API_SECRET")
    MAIL_USERNAME: str = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD: str = os.environ.get("MAIL_PASSWORD")
    MAIL_FROM: str = os.environ.get("MAIL_FROM")
    MAIL_PORT: str = os.environ.get("MAIL_PORT")
    MAIL_SERVER: str = os.environ.get("MAIL_SERVER")
    MAIL_FROM_NAME: str = os.environ.get("MAIL_FROM_NAME")

settings = Settings()

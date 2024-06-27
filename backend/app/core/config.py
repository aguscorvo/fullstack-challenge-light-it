import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "FullStack Challenge"
    SQLALCHEMY_DATABASE_URI: str = "mysql://root:example@db/patients"
    CLOUDINARY_CLOUD_NAME: str = os.environ.get("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY: str = os.environ.get("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET: str = os.environ.get("CLOUDINARY_API_SECRET")

settings = Settings()

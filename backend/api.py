from fastapi import FastAPI, HTTPException, Security
from fastapi.security import APIKeyHeader
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from model.phishingmodel import PhishingModel
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# CORS Middleware
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Key Security
api_key_header = APIKeyHeader(name="X-API-Key")

def get_api_key(api_key_header: str = Security(api_key_header)) -> str:
    if api_key_header == os.environ['API_KEY']:
        return api_key_header
    return

# Pydantic Models
class Email(BaseModel):
    text: str

# API Endpoints
@app.post("/api/email")
async def analyze_email(email: Email, api_key: str = Security(get_api_key)):
    model = PhishingModel()
    result = model.analyze_email(email.text)
    return {"phishingProbability": result[0], "analysis": result[1]}
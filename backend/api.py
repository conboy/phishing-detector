from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from model.phishingmodel import PhishingModel

app = FastAPI()

origins = ["*"]

# CORS Protection
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
class Email(BaseModel):
    text: str

# API Endpoints
@app.post("/api/email")
async def analyze_email(email: Email):
    model = PhishingModel()
    result = model.analyze_email(email.text)
    return {"phishingProbability": result[0], "analysis": result[1]}
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="SHINOBI Appliances API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str

# Routes
@app.get("/api/")
async def root():
    return {"message": "SHINOBI Appliances API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact_form(form: ContactForm):
    """
    Handle contact form submissions.
    In a real application, this would:
    - Save to database
    - Send email notification
    - Trigger CRM integration
    """
    try:
        # For now, just log the submission
        print(f"Contact form submission:")
        print(f"  Name: {form.name}")
        print(f"  Email: {form.email}")
        print(f"  Phone: {form.phone or 'Not provided'}")
        print(f"  Message: {form.message}")
        
        # In production, add actual email sending logic here
        # For example, using SendGrid, AWS SES, etc.
        
        return ContactResponse(
            success=True,
            message="Thank you for contacting us! We'll get back to you within 24 hours."
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to submit contact form: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8002))
    uvicorn.run("server:app", host="0.0.0.0", port=port, reload=True)

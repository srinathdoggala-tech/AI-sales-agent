"""HTTP API server for PRISHA.IO Mobile App Control Center."""

from __future__ import annotations

import logging
import os
import threading
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from voice_agent.config.business_context import get_business_context
from voice_agent.telephony.twilio_handler import TwilioCallManager

logger = logging.getLogger(__name__)

app = FastAPI(
    title="PRISHA.IO AI Sales Agent Control Center API",
    description="API for triggering outbound AI sales calls, monitoring leads, and managing settings.",
    version="1.0.0",
)

# Enable CORS for mobile web app / local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for call logs & leads
_call_manager = TwilioCallManager()
_call_history: list[dict[str, Any]] = [
    {
        "id": "lead-101",
        "name": "Rajesh Kumar",
        "company": "Royal Spice Restaurant",
        "phone": "+919876543210",
        "industry": "Restaurants & Cafés",
        "status": "completed",
        "score": 88.5,
        "decision": "BOOK_MEETING",
        "stage": "booking",
        "timestamp": "2026-07-28T09:30:00Z",
        "transcript": "User: Hi, looking to automate our table reservations.\nAgent: Hi Rajesh, Prisha from PRISHA.IO. We build AI voice receptionists for restaurants. Let's schedule a 20-min discovery call.",
    },
    {
        "id": "lead-102",
        "name": "Sarah Jenkins",
        "company": "Apex Fitness Gyms",
        "phone": "+17542903085",
        "industry": "Gyms & Fitness Centers",
        "status": "completed",
        "score": 72.0,
        "decision": "STRONG_FOLLOWUP",
        "stage": "qualification",
        "timestamp": "2026-07-28T08:15:00Z",
        "transcript": "User: We need a new website and member lead capture.\nAgent: Great, PRISHA.IO builds full digital growth systems. I will follow up with our 10-step strategy.",
    },
]


class InitiateCallRequest(BaseModel):
    name: str = Field(..., example="Amit Sharma")
    company: str = Field(..., example="Sharma Dental Clinic")
    phone: str = Field(..., example="+919876543210")
    industry: str = Field(default="Local Business", example="Healthcare Clinics")


@app.get("/")

def root_check():
    return {
        "status": "online",
        "app": "PRISHA.IO AI Sales Agent Mobile Control Center API",
        "version": "1.0.0",
    }


@app.get("/api/status")
def get_system_status():
    gemini_key = os.getenv("GEMINI_API_KEY", "")
    twilio_sid = os.getenv("TWILIO_ACCOUNT_SID", "")
    eleven_key = os.getenv("ELEVENLABS_API_KEY", "")
    supabase_url = os.getenv("SUPABASE_URL", "")

    return {
        "gemini": "configured" if gemini_key and not gemini_key.startswith("AQ.") else "invalid_or_missing",
        "twilio": "configured" if twilio_sid else "missing",
        "elevenlabs": "configured" if eleven_key else "missing",
        "supabase": "configured" if supabase_url else "missing",
        "phone_india": os.getenv("TWILIO_PHONE_NUMBER_INDIA", "+917569656550"),
        "phone_intl": os.getenv("TWILIO_PHONE_NUMBER_INTL", "+17542903085"),
    }


@app.get("/api/config")
def get_config_info():
    biz = get_business_context()
    return {
        "agent_name": biz.agent_name,
        "company_name": biz.company_name,
        "tagline": biz.tagline,
        "value_proposition": biz.value_proposition,
        "services": biz.services,
        "target_industries": biz.target_industries,
        "calendar_link": biz.calendar_link,
    }


@app.get("/api/leads")
def get_leads():
    return {"leads": _call_history}


@app.post("/api/calls/initiate")
def initiate_call(req: InitiateCallRequest):
    logger.info("Received outbound call request for %s (%s) at %s", req.name, req.company, req.phone)

    lead_id = f"lead-{len(_call_history) + 101}"
    public_host = os.getenv("PUBLIC_HOST", "localhost")
    ws_port = os.getenv("WS_PORT", "8080")
    ws_url = f"wss://{public_host}:{ws_port}" if public_host != "localhost" else f"ws://localhost:{ws_port}"

    result = None
    if _call_manager.client:
        result = _call_manager.make_call(
            to_number=req.phone,
            lead_id=lead_id,
            ws_base_url=ws_url,
        )

    new_lead = {
        "id": lead_id,
        "name": req.name,
        "company": req.company,
        "phone": req.phone,
        "industry": req.industry,
        "status": "calling" if result else "simulated_call",
        "score": 0.0,
        "decision": "CALL_INITIATED",
        "stage": "greeting",
        "timestamp": "Just now",
        "transcript": f"Call initiated to {req.phone} for {req.name} ({req.company})...",
    }
    _call_history.insert(0, new_lead)

    return {
        "success": True,
        "lead_id": lead_id,
        "call_sid": result.get("call_sid") if result else "simulated_sid",
        "status": "calling" if result else "simulated",
        "message": f"AI Sales Call initiated to {req.phone} representing PRISHA.IO",
    }


def start_api_server(host: str = "0.0.0.0", port: int = 8000):
    """Start FastAPI HTTP server on a background thread."""
    import uvicorn

    logger.info("Starting PRISHA.IO HTTP API server on %s:%d", host, port)
    threading.Thread(
        target=lambda: uvicorn.run(app, host=host, port=port, log_level="info"),
        daemon=True,
    ).start()

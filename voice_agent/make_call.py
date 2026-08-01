"""Initiate an outbound AI sales call directly from the command line."""

import sys
import os
from dotenv import load_dotenv

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "voice_agent", ".env")
if os.path.exists(env_path):
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from voice_agent.main import CallAgent

def main():
    if len(sys.argv) < 2:
        print("\n=======================================================")
        print("  PRISHA AI SALES AGENT -- OUTBOUND CALL INITIATOR")
        print("=======================================================")
        print("Usage:   python voice_agent/make_call.py <phone_number> [lead_name]")
        print("Example: python voice_agent/make_call.py +1234567890 \"John Doe\"\n")
        sys.exit(1)

    phone = sys.argv[1]
    name = sys.argv[2] if len(sys.argv) > 2 else "Lead"

    print(f"\n[INITIATING CALL]")
    print(f"  To:    {phone}")
    print(f"  Name:  {name}")

    agent = CallAgent()
    result = agent.call_lead({"id": "manual-call-001", "name": name, "phone": phone})

    if result:
        print(f"\n[SUCCESS] Call Placed via Twilio!")
        print(f"  Call SID: {result.get('call_sid')}")
        print(f"  Status:   {result.get('status')}")
        print(f"  To:       {result.get('to')}\n")
    else:
        print(f"\n[FAIL] Could not initiate call. Ensure credentials in voice_agent/.env are correct.\n")

if __name__ == "__main__":
    main()

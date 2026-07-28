<div align="center">
  <br>
  <pre style="font-family: monospace; font-size: 13px; line-height: 1.2;">
██████╗ ██████╗ ██╗███████╗██╗  ██╗██╗██╗  ██╗██████╗ 
██╔══██╗██╔══██╗██║██╔════╝██║  ██║██║██║  ██║██╔═══██╗
██████╔╝██████╔╝██║███████╗███████║██║██║  ██║██║   ██║
██╔═══╝ ██╔══██╗██║╚════██║██╔══██║██║██║  ██║██║   ██║
██║     ██║  ██║██║███████║██║  ██║██║╚█████╔╝╚██████╔╝
╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝ ╚════╝  ╚═════╝ 
  </pre>
  <h3>⚡ Premium Digital Experiences & AI Voice Solutions for Business Growth ⚡</h3>
  <br>
  <p>
    <img src="https://img.shields.io/badge/PRISHA.IO-Digital_Agency-8B5CF6?style=for-the-badge&logo=openai&logoColor=white">
    <img src="https://img.shields.io/badge/LangGraph-State_Machine-6366f1?style=for-the-badge">
    <img src="https://img.shields.io/badge/Gemini-2.0_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white">
    <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white">
    <br>
    <img src="https://img.shields.io/badge/ElevenLabs-TTS-7c3aed?style=for-the-badge">
    <img src="https://img.shields.io/badge/Whisper-STT-412991?style=for-the-badge&logo=openai&logoColor=white">
    <img src="https://img.shields.io/badge/Twilio-Telephony-F22F46?style=for-the-badge&logo=twilio&logoColor=white">
    <img src="https://img.shields.io/badge/Supabase-CRM-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white">
  </p>
</div>

---

# 🤖 PRISHA.IO Agentic Voice AI — The Autonomous Business Growth Agent

**PRISHA.IO Agentic Voice AI is an autonomous AI sales agent designed to represent PRISHA.IO — making real discovery calls, qualifying prospective clients, answering business questions, and booking consultations automatically over phone calls.**

> At **PRISHA.IO**, we don't just build websites — we create digital assets and AI automation systems that increase brand value, customer trust, and business growth. This AI Voice Agent perceives, reasons, scores lead potential, and schedules business discovery sessions live on the phone.

<br>

## 🏢 About PRISHA.IO

PRISHA.IO is a premium AI-powered digital transformation agency focused on helping local businesses and growing enterprises establish a world-class online presence.

### Our Core Solutions:
- **Premium Website Design & UI/UX Development**
- **Custom AI Agents & Voice AI Receptionists**
- **AI-Powered Business Automation & CRM Workflows**
- **Lead Generation & Reservation/Appointment Systems**
- **Google Business Profile & SEO Optimization**

### Target Industries:
- Restaurants & Cafés | Hotels & Resorts | Salons & Spas
- Gyms & Fitness Centers | Healthcare Clinics | Real Estate
- Educational Institutions | Professional Service Providers & Retail

<br>

## 🧠 What Makes It An Agent

| Agent Capability | How PRISHA.IO Agent Does It |
|:---|:---|
| **Perceive** | Streaming Whisper STT transcribes incoming caller audio in real time |
| **Reason** | Gemini 2.0 Flash analyzes sentiment, intent, authority, budget & industry requirements |
| **Decide** | 6-factor composite scoring engine decides `BOOK_MEETING` / `STRONG_FOLLOWUP` / `NURTURE` / `DROP` |
| **Act** | ElevenLabs TTS speaks human-like responses; Twilio bridges the live call |
| **Learn** | LangGraph state machine tracks conversation turns & context across stages |
| **Tools** | Supabase CRM persistence, Twilio call routing, and Discovery Call booking |

<br>

## 🏗 Architecture

```
                    ┌─────────────────────────────┐
                    │         TWILIO CLOUD         │
                    │   +1-XXX-XXX-XXXX            │
                    └──────────┬──────────────────┘
                               │ WebSocket Media Stream
                               ▼
              ┌─────────────────────────────────┐
              │     AUDIO INGESTION SERVER       │
              │  (WebSocket ↔ Streaming Audio)   │
              └──────┬──────────────┬───────────┘
                     │              │
              ┌──────▼──────┐  ┌───▼────────────┐
              │   WHISPER   │  │   ELEVENLABS    │
              │  (STT In)   │  │   (TTS Out)     │
              └──────┬──────┘  └───▲────────────┘
                     │              │
                     ▼              │
         ┌───────────────────────────────────────┐
         │                                       │
         │     LANGGRAPH AGENT ORCHESTRATOR      │
         │                                       │
         │  ┌──────────┐    ┌──────────────────┐ │
         │  │ ANALYZE  │    │                  │ │
         │  │ (Gemini) ├───►│     SCORING      │ │
         │  └──────────┘    │  6-factor model  │ │
         │                  └────────┬─────────┘ │
         │                           │           │
         │  ┌──────────┐    ┌───────▼─────────┐ │
         │  │  ACTION  │◄───┤    RESPONSE     │ │
         │  │  BOOK /  │    │    (Gemini)     │ │
         │  │ FOLLOWUP │    └─────────────────┘ │
         │  │ NURTURE  │                        │
         │  │   DROP   │                        │
         │  └──────────┘                        │
         └───────────────────────────────────────┘
                     │
                     ▼
              ┌─────────────┐
              │   SUPABASE  │
              │  (CRM/DB)   │
              └─────────────┘
```

<br>

## ⚙ The Agent's Decision Loop

Every turn of the conversation goes through 4 nodes:

| # | Node | What Happens |
|:--|:-----|:---|
| 1 | **analyze** | Gemini reads transcript history. Extracts sentiment, engagement, budget, timeline, authority, need, and objection flags. |
| 2 | **scoring** | 6-factor composite lead score computed. Thresholds map score → decision. |
| 3 | **response** | Gemini generates a contextual, business-aware response representing PRISHA.IO. |
| 4 | **action** | Executes the decision (e.g. books 20-min discovery call, schedules follow-up, or gracefully closes call). |

<br>

## 📊 The Scoring Engine

The agent scores prospective clients against a 6-factor weighted model recalculated on every turn:

| Factor | Weight | What It Measures |
|:---|:---:|:---|
| **Budget** | 25% | Project budget extracted from conversation ($5k, $25k, $50k+) |
| **Need** | 20% | Pain point clarity — web redesign, AI voice automation, CRM needs |
| **Timeline** | 20% | Project urgency — `immediate` → `6+ months` |
| **Authority** | 15% | Decision maker level — founder, CEO, marketing director |
| **Engagement** | 10% | Responsiveness & interest in PRISHA.IO solutions |
| **Sentiment** | 10% | Emotional tone — positive / neutral / negative |

```
score = (budget×0.25 + need×0.20 + timeline×0.20 + authority×0.15 + engagement×0.10 + sentiment×0.10) × 100
```

### Decision Thresholds

| Score | Decision | Agent's Action |
|:---:|:---|:---|
| ≥ 80 | **BOOK_MEETING** | Book 20-min PRISHA.IO Business Discovery session |
| ≥ 60 | **STRONG_FOLLOWUP** | Secure commitment, schedule callback |
| ≥ 40 | **NURTURE** | Share PRISHA.IO insights, ask discovery questions |
| < 40 | **DROP** | End politely (only after 4+ turns or explicit rejection) |

<br>

## 🎯 PRISHA.IO Objection Playbook

The agent handles common business objections using tailored responses:

| Objection | Scenario | Agent's Approach |
|:---|:---|:---|
| **price** | Budget concerns | Emphasizes ROI & business growth systems rather than template costs. |
| **not_interested** | Cold reaction | Offers a 2-minute overview of how local competitors use AI voice receptionists. |
| **competitor** | Using another agency | Explains PRISHA.IO's unique AI automation & custom digital transformation focus. |
| **timing** | Not right now | Offers to send the 10-step PRISHA.IO process summary for future reference. |
| **gatekeeper** | Reaching assistant | Asks politely for the business owner or digital transformation leader. |

All business knowledge lives in `voice_agent/config/business_context.py`.

<br>

## 🚀 Quick Start

```bash
# Clone Repository
git clone https://github.com/srinathdoggala-tech/AI-sales-agent.git
cd AI-sales-agent

# Install Dependencies
python -m pip install -r voice_agent/requirements.txt

# Configure Environment Variables
cp voice_agent/.env.example voice_agent/.env
```

### Configure `.env`
Add your API keys to `voice_agent/.env`:
```env
GEMINI_API_KEY=AIzaSy...
ELEVENLABS_API_KEY=sk_...
ELEVENLABS_VOICE_ID=RABOvaPec1ymXz02oDQi
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...
SUPABASE_URL=https://....supabase.co
SUPABASE_KEY=sb_secret_...
```

<br>

## 🧪 Testing & Simulation

```bash
# 1. Run full 27-test validation suite
python test_validation.py

# 2. Test scoring engine
python voice_agent/main.py test

# 3. Simulate an interactive PRISHA.IO sales call
python voice_agent/main.py simulate

# 4. Launch live call WebSocket server
python voice_agent/main.py serve
```

<br>

## 📁 Project Structure

```
AI-sales-agent/
├── voice_agent/
│   ├── main.py                    # CLI: serve | test | simulate
│   │
│   ├── config/
│   │   └── business_context.py    # ⭐ PRISHA.IO company profile & playbook
│   │
│   ├── agents/
│   │   └── listener.py            # Gemini reasoning & prompt orchestrator
│   │
│   ├── graph/
│   │   └── graph_builder.py       # LangGraph: analyze → score → respond → act
│   │
│   ├── scoring/
│   │   └── scoring.py             # 6-factor composite lead scoring
│   │
│   ├── state/
│   │   └── schema.py              # CallState dataclass & schema definitions
│   │
│   ├── stt/
│   │   └── whisper_stream.py      # Streaming OpenAI Whisper STT
│   │
│   ├── tts/
│   │   └── elevenlabs_stream.py   # Streaming ElevenLabs TTS
│   │
│   ├── telephony/
│   │   ├── twilio_handler.py      # Twilio call manager
│   │   └── websocket_server.py    # WebSocket audio bridge server
│   │
│   ├── db/
│   │   └── models.py              # Supabase lead persistence & logs
│   │
│   └── requirements.txt
│
└── test_validation.py             # 27 validation unit tests
```

---

### 🌐 Developed for PRISHA.IO Digital Transformation Agency

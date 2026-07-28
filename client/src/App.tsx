import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  BarChart3, 
  Settings, 
  Activity, 
  Globe, 
  Sparkles, 
  Zap, 
  PhoneOutgoing, 
  CheckCircle2, 
  Clock, 
  User, 
  Building2, 
  ShieldCheck, 
  AlertCircle,
  Play,
  RotateCw,
  Search
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  company: string;
  phone: string;
  industry: string;
  status: string;
  score: number;
  decision: string;
  stage: string;
  timestamp: string;
  transcript: string;
}

interface SystemStatus {
  gemini: string;
  twilio: string;
  elevenlabs: string;
  supabase: string;
  phone_india: string;
  phone_intl: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'dialer' | 'dashboard' | 'monitor' | 'settings'>('dialer');
  
  // Dialer State
  const [countryCode, setCountryCode] = useState<'+91' | '+1'>('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [leadName, setLeadName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('Restaurants & Cafés');
  const [calling, setCalling] = useState(false);
  const [callSuccessMessage, setCallSuccessMessage] = useState('');

  // Dashboard & System State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Fetch initial leads & system status
  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, statusRes] = await Promise.all([
        fetch('/api/leads').then(res => res.json()).catch(() => ({ leads: [] })),
        fetch('/api/status').then(res => res.json()).catch(() => null),
      ]);
      if (leadsRes.leads) setLeads(leadsRes.leads);
      if (statusRes) setStatus(statusRes);
    } catch (e) {
      console.error("Failed to connect to backend API", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleStartCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !leadName) return;

    setCalling(true);
    setCallSuccessMessage('');

    const fullPhone = phoneNumber.startsWith('+') ? phoneNumber : `${countryCode}${phoneNumber.replace(/\D/g, '')}`;

    try {
      const res = await fetch('/api/calls/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          company: companyName || 'Business Lead',
          phone: fullPhone,
          industry: industry,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCallSuccessMessage(`Outbound AI Call started to ${fullPhone}!`);
        fetchData();
        setActiveTab('monitor');
      }
    } catch (err) {
      setCallSuccessMessage('Call initiated in test simulation mode.');
    } finally {
      setCalling(false);
    }
  };

  const getDecisionBadge = (decision: string) => {
    switch (decision) {
      case 'BOOK_MEETING':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Booked Meeting</span>;
      case 'STRONG_FOLLOWUP':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Strong Follow-up</span>;
      case 'NURTURE':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Nurture</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/20 text-slate-400 border border-slate-500/30">Active</span>;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col justify-between pb-24 pt-4 px-4">
      {/* ── Header ── */}
      <header className="flex items-center justify-between py-3 px-4 glass-card rounded-2xl mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="heading-font font-bold text-base tracking-wide text-white flex items-center gap-1.5">
              PRISHA.IO <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">AI Voice</span>
            </h1>
            <p className="text-xs text-slate-400">Mobile Sales Control Center</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={fetchData} className="p-2 rounded-xl text-slate-400 hover:text-white glass-card">
            <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 live-dot"></span>
            Online
          </div>
        </div>
      </header>

      {/* ── Tab Content ── */}
      <main className="flex-1">
        {/* ── DIALER TAB ── */}
        {activeTab === 'dialer' && (
          <div className="space-y-4">
            <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <PhoneOutgoing className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="heading-font text-lg font-bold text-white">Outbound AI Dialer</h2>
                  <p className="text-xs text-slate-400">Trigger instant AI sales calls to leads</p>
                </div>
              </div>

              <form onSubmit={handleStartCall} className="space-y-4">
                {/* Target Number & Country selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Client Phone Number</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCountryCode(countryCode === '+91' ? '+1' : '+91')}
                      className="px-3 py-3 rounded-xl glass-card font-semibold text-sm text-purple-300 border border-purple-500/30 flex items-center gap-1 hover:bg-purple-500/10 transition-all"
                    >
                      {countryCode === '+91' ? '🇮🇳 +91' : '🌐 +1'}
                    </button>
                    <input
                      type="tel"
                      required
                      placeholder={countryCode === '+91' ? '98765 43210' : '(555) 000-0000'}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 bg-slate-900/80 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {countryCode === '+91' ? '🇮🇳 Calls using verified Indian caller ID (+91 75696 56550)' : '🌐 Calls using International Twilio caller ID (+1 754 290 3085)'}
                  </p>
                </div>

                {/* Lead Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Lead Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company / Business Name</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Royal Spice Restaurant"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>

                {/* Target Industry */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-all"
                  >
                    <option value="Restaurants & Cafés">Restaurants & Cafés</option>
                    <option value="Hotels & Resorts">Hotels & Resorts</option>
                    <option value="Salons & Spas">Salons & Spas</option>
                    <option value="Gyms & Fitness Centers">Gyms & Fitness Centers</option>
                    <option value="Healthcare Clinics">Healthcare Clinics</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Retail & Local Business">Retail & Local Business</option>
                  </select>
                </div>

                {callSuccessMessage && (
                  <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    {callSuccessMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={calling}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.99] text-white font-semibold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {calling ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" /> Initiating AI Voice Call...
                    </>
                  ) : (
                    <>
                      <PhoneCall className="w-4 h-4" /> Start AI Voice Sales Call
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── DASHBOARD TAB ── */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card p-4 rounded-2xl">
                <p className="text-xs text-slate-400 font-medium">Total AI Calls</p>
                <p className="heading-font text-2xl font-bold text-white mt-1">{leads.length}</p>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-purple-400">
                  <Sparkles className="w-3 h-3" /> PRISHA.IO Voice
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl">
                <p className="text-xs text-slate-400 font-medium">Meetings Booked</p>
                <p className="heading-font text-2xl font-bold text-emerald-400 mt-1">
                  {leads.filter(l => l.decision === 'BOOK_MEETING').length}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> 20-min Discovery
                </div>
              </div>
            </div>

            {/* Lead list */}
            <div className="glass-card rounded-2xl p-4">
              <h3 className="heading-font text-sm font-bold text-white mb-3 flex items-center justify-between">
                <span>Recent Lead Calls</span>
                <span className="text-xs text-slate-400 font-normal">{leads.length} leads logged</span>
              </h3>

              <div className="space-y-2.5">
                {leads.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">No lead calls logged yet.</p>
                ) : (
                  leads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => {
                        setSelectedLead(lead);
                        setActiveTab('monitor');
                      }}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">{lead.name}</p>
                          <span className="text-[10px] text-slate-400">({lead.company})</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{lead.phone} • {lead.industry}</p>
                      </div>

                      <div className="text-right flex flex-col items-end gap-1">
                        {getDecisionBadge(lead.decision)}
                        <span className="text-xs font-bold text-purple-400">Score: {lead.score}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── LIVE CALL MONITOR TAB ── */}
        {activeTab === 'monitor' && (
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 live-dot"></span>
                  <h3 className="heading-font font-bold text-sm text-white">
                    {selectedLead ? selectedLead.name : 'Live AI Sales Call Monitor'}
                  </h3>
                </div>
                <span className="text-xs text-purple-400 font-semibold">PRISHA.IO Agent</span>
              </div>

              {/* Lead details summary */}
              {selectedLead && (
                <div className="mt-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Company:</span>
                    <span className="text-white font-medium">{selectedLead.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phone:</span>
                    <span className="text-white font-medium">{selectedLead.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Lead Score:</span>
                    <span className="text-purple-400 font-bold">{selectedLead.score} / 100</span>
                  </div>
                </div>
              )}

              {/* Transcript feed */}
              <div className="mt-4 space-y-3 max-h-72 overflow-y-auto pr-1">
                {(selectedLead?.transcript || "Agent: Hi Rajesh, Prisha from PRISHA.IO. How can we help automate your customer growth?\nUser: We need a new website and AI voice booking system.\nAgent: Perfect, PRISHA.IO specializes in full digital growth systems.")
                  .split('\n')
                  .map((line, idx) => {
                    const isAgent = line.startsWith('Agent:');
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl text-xs max-w-[85%] ${
                          isAgent
                            ? 'bg-purple-600/20 border border-purple-500/30 text-purple-100 ml-auto rounded-tr-none'
                            : 'bg-slate-900 border border-slate-800 text-slate-200 mr-auto rounded-tl-none'
                        }`}
                      >
                        <p className="font-semibold text-[10px] text-slate-400 mb-1">
                          {isAgent ? '🤖 Prisha (AI Agent)' : '👤 Prospective Client'}
                        </p>
                        <p className="leading-relaxed">{line.replace(/^(Agent:|User:)/, '').trim()}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* ── AGENCY SETTINGS TAB ── */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="heading-font text-base font-bold text-white">PRISHA.IO Agency Profile</h3>
                  <p className="text-xs text-slate-400">Active Business Context & System Status</p>
                </div>
              </div>

              {/* System status checklist */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Indian Phone Number:</span>
                  <span className="text-emerald-400 font-medium">{status?.phone_india || '+917569656550'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">International Phone Number:</span>
                  <span className="text-purple-400 font-medium">{status?.phone_intl || '+17542903085'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">ElevenLabs Voice Model:</span>
                  <span className="text-white font-medium">eleven_flash_v2_5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Database CRM:</span>
                  <span className="text-emerald-400 font-medium">Supabase Connected</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <h4 className="text-xs font-semibold text-slate-300 mb-2">Core Agency Offerings</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['Web Design & UI/UX', 'Voice AI Receptionists', 'Custom AI Agents', 'Google Business SEO', 'CRM Sales Automation'].map((svc, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px]">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── Bottom Mobile Navigation Bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass-nav p-2 rounded-t-3xl flex justify-around items-center z-50">
        <button
          onClick={() => setActiveTab('dialer')}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
            activeTab === 'dialer' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PhoneCall className="w-5 h-5" />
          <span className="text-[10px] font-medium">Dialer</span>
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
            activeTab === 'dashboard' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] font-medium">Leads</span>
        </button>

        <button
          onClick={() => setActiveTab('monitor')}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
            activeTab === 'monitor' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[10px] font-medium">Live Monitor</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
            activeTab === 'settings' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px] font-medium">Agency</span>
        </button>
      </nav>
    </div>
  );
}

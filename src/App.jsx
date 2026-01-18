import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Scale, FileText, DollarSign, Users, Phone, Gavel, ArrowRight, Lock } from 'lucide-react';

// --- মডার্ন ল্যান্ডিং পেজ (পাবলিক) ---
const PublicHome = ({ onLoginClick }) => (
  <div className="min-h-screen bg-law-navy text-white font-sans">
    {/* Header */}
    <nav className="p-6 flex justify-between items-center glass-card m-4 rounded-xl">
      <div className="flex items-center gap-2">
        <Scale className="text-law-gold h-8 w-8" />
        <span className="text-2xl font-bold tracking-wider">CHAMBER OF LAW</span>
      </div>
      <button onClick={onLoginClick} className="bg-law-gold text-law-navy px-6 py-2 rounded-full font-bold hover:bg-white transition">
        Client / Admin Login
      </button>
    </nav>

    {/* Hero Section */}
    <header className="text-center py-20 px-4">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
        Justice & Integrity
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Supreme Court of Bangladesh. Delivering excellence in legal services with a modern approach.
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-law-gold text-law-navy px-8 py-3 rounded-lg font-bold">Consultation</button>
        <button className="border border-law-gold text-law-gold px-8 py-3 rounded-lg">Practice Areas</button>
      </div>
    </header>

    {/* Features */}
    <div className="grid md:grid-cols-3 gap-6 p-10 max-w-6xl mx-auto">
      {[
        { icon: Gavel, title: "Litigation", desc: "Expert representation in High Court & Judge Court." },
        { icon: FileText, title: "Documentation", desc: "Drafting, Vetting & Legal Notices." },
        { icon: Users, title: "Corporate", desc: "Company matters and legal compliance." }
      ].map((item, i) => (
        <div key={i} className="glass-card p-8 rounded-2xl hover:bg-white/10 transition cursor-pointer">
          <item.icon className="text-law-gold h-10 w-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-gray-400">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

// --- এডমিন ড্যাশবোর্ড (লগিন করার পর) ---
const Dashboard = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState('cases');
  const [cases, setCases] = useState([]);
  const [newCase, setNewCase] = useState({ case_no: '', party_name: '', next_date: '' });

  // ডাটা লোড করা
  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    const { data, error } = await supabase.from('cases').select('*').order('next_date', { ascending: true });
    if (!error) setCases(data);
  };

  const addCase = async () => {
    const { error } = await supabase.from('cases').insert([newCase]);
    if (!error) {
      alert('Case Added!');
      setNewCase({ case_no: '', party_name: '', next_date: '' });
      fetchCases();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 p-6 border-r border-slate-800 hidden md:block">
        <div className="text-2xl font-bold text-law-gold mb-10">DASHBOARD</div>
        <nav className="space-y-4">
          <button onClick={() => setActiveTab('cases')} className={`flex items-center gap-3 w-full p-3 rounded ${activeTab === 'cases' ? 'bg-law-gold text-slate-900' : 'text-gray-400'}`}>
            <Gavel size={20} /> Case Diary
          </button>
          <button onClick={() => setActiveTab('accounts')} className={`flex items-center gap-3 w-full p-3 rounded ${activeTab === 'accounts' ? 'bg-law-gold text-slate-900' : 'text-gray-400'}`}>
            <DollarSign size={20} /> Accounts
          </button>
          <button onClick={onLogout} className="flex items-center gap-3 w-full p-3 text-red-400 mt-10">
            <Lock size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">{activeTab === 'cases' ? 'Digital Case Diary' : 'Financial Ledger'}</h2>
        
        {activeTab === 'cases' && (
          <div>
            {/* Add Case Form */}
            <div className="glass-card p-6 rounded-xl mb-8 flex gap-4 flex-wrap">
              <input 
                placeholder="Case No" 
                className="bg-slate-800 p-3 rounded border border-slate-700 text-white"
                value={newCase.case_no}
                onChange={e => setNewCase({...newCase, case_no: e.target.value})}
              />
              <input 
                placeholder="Party Name" 
                className="bg-slate-800 p-3 rounded border border-slate-700 text-white"
                value={newCase.party_name}
                onChange={e => setNewCase({...newCase, party_name: e.target.value})}
              />
              <input 
                type="date" 
                className="bg-slate-800 p-3 rounded border border-slate-700 text-white"
                value={newCase.next_date}
                onChange={e => setNewCase({...newCase, next_date: e.target.value})}
              />
              <button onClick={addCase} className="bg-law-gold text-slate-900 px-6 py-3 rounded font-bold hover:bg-yellow-500">
                + Add Case
              </button>
            </div>

            {/* Case List */}
            <div className="grid gap-4">
              {cases.map((c) => (
                <div key={c.id} className="bg-slate-800 p-6 rounded-lg border-l-4 border-law-gold flex justify-between items-center hover:bg-slate-700 transition">
                  <div>
                    <h3 className="text-xl font-bold text-white">{c.case_no}</h3>
                    <p className="text-gray-400">{c.party_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Next Date</p>
                    <p className="text-law-gold font-bold text-lg">{c.next_date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'accounts' && (
          <div className="text-center py-20 text-gray-500">
            <DollarSign className="h-16 w-16 mx-auto mb-4 opacity-50"/>
            <p>Accounts Module is ready to be connected.</p>
          </div>
        )}
      </main>
    </div>
  );
};

// --- মেইন অ্যাপ কন্ট্রোলার ---
export default function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState('home'); // 'home', 'login', 'dashboard'

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if(session) setView('dashboard');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setView(session ? 'dashboard' : 'home');
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  if (view === 'home') return <PublicHome onLoginClick={() => setView('login')} />;
  
  if (view === 'login') return (
    <div className="min-h-screen bg-law-navy flex items-center justify-center p-4">
      <div className="glass-card p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-law-gold">Member Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input name="email" type="email" placeholder="Email" className="w-full bg-slate-800 p-3 rounded text-white border border-slate-600" />
          <input name="password" type="password" placeholder="Password" className="w-full bg-slate-800 p-3 rounded text-white border border-slate-600" />
          <button type="submit" className="w-full bg-law-gold text-slate-900 py-3 rounded font-bold">Sign In</button>
        </form>
        <button onClick={() => setView('home')} className="w-full text-center mt-4 text-gray-400 text-sm">Back to Home</button>
      </div>
    </div>
  );

  return <Dashboard session={session} onLogout={() => supabase.auth.signOut()} />;
}

import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Scale, Gavel, DollarSign, Bell, 
  Calendar as CalIcon, Save, Trash2, 
  ExternalLink, MessageCircle, FolderOpen, LogOut, 
  Plus, X, Edit3, Filter, ChevronLeft, ChevronRight, 
  Eye, History, User, Lock, Folder, Check, Mail, Phone, MapPin, ArrowRight, Menu, RefreshCw
} from 'lucide-react';

// ==============================================================================
// 1. LEXSWORD PUBLIC HOMEPAGE (Input Colors Fixed)
// ==============================================================================

const PublicHome = ({ onLoginClick, loading }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-sans text-slate-800 bg-white selection:bg-[#c5a059] selection:text-white">
      
      {/* --- Navbar --- */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 py-4 px-6 md:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-[#c5a059] p-2 rounded-sm">
              <Scale size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight leading-none">LexSword</h1>
              <p className="text-[10px] text-[#c5a059] font-bold tracking-[0.3em] uppercase">Your Justice, Our Mission</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 tracking-wide">
            <a href="#home" className="hover:text-[#c5a059] transition">HOME</a>
            <a href="#about" className="hover:text-[#c5a059] transition">WHY US</a>
            <a href="#practice" className="hover:text-[#c5a059] transition">PRACTICE AREAS</a>
            <a href="#team" className="hover:text-[#c5a059] transition">LAWYERS</a>
            <a href="#contact" className="hover:text-[#c5a059] transition">CONTACT</a>
          </div>

          <button onClick={onLoginClick} className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-sm font-bold text-sm tracking-wide hover:bg-[#c5a059] hover:text-white transition shadow-lg">
            {loading ? <span className="loading loading-spinner loading-xs"></span> : <User size={16}/>} MEMBER LOGIN
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-slate-900">
             {menuOpen ? <X/> : <Menu/>}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-t p-6 flex flex-col gap-4 font-bold text-center">
             <a href="#home" onClick={()=>setMenuOpen(false)}>Home</a>
             <a href="#practice" onClick={()=>setMenuOpen(false)}>Practice Areas</a>
             <a href="#contact" onClick={()=>setMenuOpen(false)}>Contact</a>
             <button onClick={onLoginClick} className="text-[#c5a059]">{loading ? <span className="loading loading-spinner loading-xs"></span> : 'Login Portal'}</button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header id="home" className="relative min-h-screen flex items-center justify-center bg-slate-50 pt-32 pb-20 overflow-hidden">
         <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#444cf7_1px,transparent_1px)] [background-size:16px_16px]"></div>
         
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8 text-center md:text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold tracking-widest border border-blue-100 uppercase">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> Expert Legal Defense
               </div>
               
               <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-[1.1]">
                  Protecting Rights <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-yellow-600">Securing Futures</span>
               </h1>
               <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0">
                  An experienced lawyer stands between you and injustice, navigating complex laws to secure the outcome you deserve. At LexSword, we fight for your legacy.
               </p>
               
               <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                  <a href="#contact" className="bg-slate-900 text-white px-8 py-4 rounded-sm font-bold tracking-widest hover:bg-[#c5a059] transition shadow-xl text-center">
                     CASE EVALUATION
                  </a>
                  <a href="tel:+8801911008518" className="border border-slate-300 text-slate-900 px-8 py-4 rounded-sm font-bold tracking-widest hover:border-slate-900 transition flex items-center justify-center gap-2">
                     <Phone size={18}/> +88 01911 008 518
                  </a>
               </div>
            </div>
            
            <div className="relative">
               <div className="absolute -inset-4 bg-[#c5a059]/20 rounded-full blur-3xl hidden md:block"></div>
               <img 
                 src="/head.jpg" 
                 alt="Md. Azadur Rahman, Head of LexSword" 
                 className="relative rounded-lg shadow-2xl border-4 border-white object-cover object-top h-[500px] md:h-[650px] w-full"
               />
               <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl rounded-sm border-l-4 border-[#c5a059] hidden md:block">
                  <p className="text-xl font-serif font-bold text-slate-900">Md. Azadur Rahman</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Head of Chamber</p>
               </div>
            </div>
         </div>
      </header>

      {/* --- Why Choose Us --- */}
      <section id="about" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
               <h2 className="text-sm font-bold text-[#c5a059] tracking-[0.2em] uppercase mb-2">Our Values</h2>
               <h3 className="text-4xl font-serif font-bold text-slate-900">Why Clients Trust LexSword</h3>
               <div className="w-20 h-1 bg-slate-900 mx-auto mt-6"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-12 text-center">
               {[
                  {icon: Scale, title: "Integrity First", desc: "We uphold the highest standards of ethics and transparency in every case we handle."},
                  {icon: Check, title: "Proven Track Record", desc: "Our history of favorable verdicts and settlements speaks for our dedication."},
                  {icon: Gavel, title: "Strategic Defense", desc: "We don't just fight; we strategize to ensure the best possible outcome for you."}
               ].map((item, i) => (
                  <div key={i} className="group p-8 hover:bg-slate-50 transition duration-300 rounded-lg border border-transparent hover:border-slate-100">
                     <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#c5a059] transition">
                        <item.icon className="text-slate-900 group-hover:text-white" size={32}/>
                     </div>
                     <h4 className="text-xl font-bold mb-4 font-serif">{item.title}</h4>
                     <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Practice Areas --- */}
      <section id="practice" className="py-24 bg-slate-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
               <div>
                  <h2 className="text-sm font-bold text-[#c5a059] tracking-[0.2em] uppercase mb-2">Expertise</h2>
                  <h3 className="text-4xl font-serif font-bold text-slate-900">Our Practice Areas</h3>
               </div>
               <a href="#contact" className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:text-[#c5a059] transition">
                  View All Services <ArrowRight size={18}/>
               </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
               {[
                  "Civil Litigation", "Criminal Defense", "Writ Petition", 
                  "Family Law", "Commercial Law", "Documentation"
               ].map((area, i) => (
                  <div key={i} className="bg-white p-8 border-l-4 border-[#c5a059] shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
                     <div className="flex justify-between items-start mb-4">
                        <Gavel className="text-slate-300 group-hover:text-[#c5a059] transition"/>
                        <span className="text-5xl font-serif font-bold text-slate-100 group-hover:text-slate-200 transition">0{i+1}</span>
                     </div>
                     <h4 className="text-2xl font-bold text-slate-900 font-serif mb-2">{area}</h4>
                     <p className="text-gray-500 text-sm mb-4">Professional legal representation and consultancy services.</p>
                     <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059] group-hover:text-slate-900 transition">Learn More</span>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Team Section --- */}
      <section id="team" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-sm font-bold text-[#c5a059] tracking-[0.2em] uppercase mb-2">The Lawyers</h2>
               <h3 className="text-4xl font-serif font-bold text-slate-900">Meet Our Team</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
               {/* 1. Head of Chamber */}
               <div className="md:col-span-3 flex justify-center mb-8">
                  <div className="text-center group">
                     <div className="relative overflow-hidden rounded-lg mb-6 w-80 h-96 mx-auto shadow-2xl border-4 border-white">
                        <img src="/head.jpg" alt="Md. Azadur Rahman" className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-500"/>
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition"></div>
                     </div>
                     <h4 className="text-3xl font-serif font-bold text-slate-900">Md. Azadur Rahman</h4>
                     <p className="text-[#c5a059] font-bold uppercase text-sm tracking-wider mt-1">Head of Chamber</p>
                     <p className="text-gray-500 text-sm mt-1">Supreme Court of Bangladesh</p>
                  </div>
               </div>

               {/* Associates */}
               <div className="text-center group">
                  <div className="relative overflow-hidden rounded-lg mb-4 h-80 w-full max-w-xs mx-auto shadow-lg bg-slate-100">
                     <img src="/team1.jpg" alt="Associate 1" className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-500"/>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Adv. Anisuru Rahman</h4>
                  <p className="text-[#c5a059] text-xs font-bold uppercase tracking-wider">Senior Associate</p>
               </div>

               <div className="text-center group">
                  <div className="relative overflow-hidden rounded-lg mb-4 h-80 w-full max-w-xs mx-auto shadow-lg bg-slate-100">
                     <img src="/team2.jpg" alt="Associate 2" className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-500"/>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Adv. Abdur Razzak</h4>
                  <p className="text-[#c5a059] text-xs font-bold uppercase tracking-wider">Associate Lawyer</p>
               </div>

               <div className="text-center group">
                  <div className="relative overflow-hidden rounded-lg mb-4 h-80 w-full max-w-xs mx-auto shadow-lg bg-slate-100">
                     <img src="/team3.jpg" alt="Associate 3" className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-500"/>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Adv. Tariqul Islam</h4>
                  <p className="text-[#c5a059] text-xs font-bold uppercase tracking-wider">Associate Lawyer</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- Appointment Form (Input Color Fixed) --- */}
      <section id="contact" className="py-16 md:py-24 bg-slate-900 text-white relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            
            <div className="space-y-8 order-2 md:order-1">
               <h2 className="text-3xl md:text-4xl font-serif font-bold">Free Case Evaluation</h2>
               <p className="text-slate-400 text-base md:text-lg">Please fill out the form to request an appointment. We will review your case and get back to you within 24 hours.</p>
               
               <div className="space-y-6 pt-4 md:pt-8">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-[#c5a059] rounded-sm flex items-center justify-center text-slate-900 shrink-0"><Phone size={20}/></div>
                     <div>
                        <p className="text-xs md:text-sm text-slate-400 uppercase font-bold">Call Us 24/7</p>
                        <p className="text-lg md:text-xl font-bold">+88 01911 008 518</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-[#c5a059] rounded-sm flex items-center justify-center text-slate-900 shrink-0"><Mail size={20}/></div>
                     <div className="overflow-hidden">
                        <p className="text-xs md:text-sm text-slate-400 uppercase font-bold">Email Us</p>
                        <p className="text-lg md:text-xl font-bold truncate">lexsword.bd@gmail.com</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-[#c5a059] rounded-sm flex items-center justify-center text-slate-900 shrink-0"><MapPin size={20}/></div>
                     <div>
                        <p className="text-xs md:text-sm text-slate-400 uppercase font-bold">Location</p>
                        <p className="text-lg font-bold">Dhaka, Bangladesh</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-5 md:p-8 rounded-sm shadow-2xl order-1 md:order-2">
               <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="col-span-1 md:col-span-2">
                     <label className="block text-slate-700 font-bold text-xs uppercase mb-2">Full Name</label>
                     <input name="name" type="text" className="w-full bg-slate-50 border border-gray-200 p-3 md:p-4 outline-none focus:border-[#c5a059] text-slate-900 text-sm md:text-base rounded-sm" placeholder="Your Name" required/>
                  </div>
                  <div className="col-span-1">
                     <label className="block text-slate-700 font-bold text-xs uppercase mb-2">Phone Number</label>
                     <input name="phone" type="tel" className="w-full bg-slate-50 border border-gray-200 p-3 md:p-4 outline-none focus:border-[#c5a059] text-slate-900 text-sm md:text-base rounded-sm" placeholder="+880..." required/>
                  </div>
                  <div className="col-span-1">
                     <label className="block text-slate-700 font-bold text-xs uppercase mb-2">Email Address</label>
                     <input name="email" type="email" className="w-full bg-slate-50 border border-gray-200 p-3 md:p-4 outline-none focus:border-[#c5a059] text-slate-900 text-sm md:text-base rounded-sm" placeholder="email@example.com"/>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                     <label className="block text-slate-700 font-bold text-xs uppercase mb-2">Practice Area</label>
                     <select name="service" className="w-full bg-slate-50 border border-gray-200 p-3 md:p-4 outline-none focus:border-[#c5a059] text-slate-900 text-sm md:text-base rounded-sm">
                        <option>Civil Litigation</option>
                        <option>Criminal Defense</option>
                        <option>Writ Petition</option>
                        <option>Family Law</option>
                        <option>Commercial Law</option>
                        <option>Other Legal Matter</option>
                     </select>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                     <label className="block text-slate-700 font-bold text-xs uppercase mb-2">Case Details</label>
                     <textarea name="message" rows="4" className="w-full bg-slate-50 border border-gray-200 p-3 md:p-4 outline-none focus:border-[#c5a059] text-slate-900 text-sm md:text-base rounded-sm" placeholder="Briefly describe your legal issue..."></textarea>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                     <button type="submit" className="w-full bg-[#c5a059] text-slate-900 py-3 md:py-4 font-bold tracking-widest hover:bg-slate-900 hover:text-white transition uppercase text-sm md:text-base rounded-sm">
                        Submit Request
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-900">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
               <h2 className="text-2xl font-serif font-bold text-white tracking-wide">LEXSWORD</h2>
               <p className="text-sm mt-2">&copy; {new Date().getFullYear()} LexSword Chambers. All Rights Reserved.</p>
            </div>
            <div className="flex gap-6 text-sm font-bold">
               <a href="#" className="hover:text-white transition">Privacy Policy</a>
               <a href="#" className="hover:text-white transition">Terms of Service</a>
               <a href="#" className="hover:text-white transition">Disclaimer</a>
            </div>
         </div>
      </footer>
    </div>
  );
};

// ==============================================================================
// 2. DASHBOARD & MODULES (FIXED: Update Button & Input Colors)
// ==============================================================================

// --- ক্লায়েন্ট ড্যাশবোর্ড ---
const ClientDashboard = ({ session, onLogout }) => {
  const [myCases, setMyCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      const { data: profile } = await supabase.from('profiles').select('mobile_no').eq('id', session.user.id).single();
      if (profile && profile.mobile_no) {
        const { data: cases } = await supabase.from('cases').select('*').eq('client_mobile', profile.mobile_no);
        setMyCases(cases || []);
      }
      setLoading(false);
    };
    fetchClientData();
  }, [session]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2"><Scale className="text-[#c5a059]"/> <span className="font-bold text-xl">My Case Portal</span></div>
        <button onClick={onLogout} className="text-red-400 font-bold flex gap-2"><LogOut size={20}/> Logout</button>
      </nav>

      <main className="max-w-4xl mx-auto p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">My Ongoing Cases</h2>
        {loading && <p className="text-slate-700">Loading records...</p>}
        {!loading && myCases.length === 0 && <p className="text-slate-600">No cases found linked to your mobile number.</p>}
        
        <div className="grid gap-6">
          {myCases.map(c => (
            <div key={c.id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#c5a059]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="bg-slate-200 text-slate-900 px-2 py-1 rounded text-xs font-bold">{c.court_type}</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">{c.case_no}</h3>
                  <p className="text-lg text-slate-700">{c.party_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-600 uppercase font-bold">Next Date</p>
                  <p className="text-2xl font-bold text-red-600">{c.next_date}</p>
                </div>
              </div>
              <div className="bg-slate-100 p-4 rounded border">
                <p className="text-sm font-bold text-slate-600">Latest Status / Step:</p>
                <p className="text-lg font-bold text-[#c5a059]">{c.current_step}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// --- এডমিন ড্যাশবোর্ড (FIXED: Input Colors & Update Button) ---
const AdminDashboard = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refresh, setRefresh] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ডাটা স্টেটস
  const [cases, setCases] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [historyLog, setHistoryLog] = useState([]);
  const [documents, setDocuments] = useState([]); 
  const [caseFilter, setCaseFilter] = useState('week');
  const [accountFilter, setAccountFilter] = useState({ client: '', month: '', type: 'All' });
  
  // ক্যালেন্ডার স্টেট
  const [calendarDate, setCalendarDate] = useState(new Date()); 
  const [selectedDateCases, setSelectedDateCases] = useState(null);

  // মোডাল স্টেটস
  const [modalMode, setModalMode] = useState(null); // 'addCase', 'updateStatus', etc.
  const [selectedCase, setSelectedCase] = useState(null);
  const [formData, setFormData] = useState({});
  const [newDoc, setNewDoc] = useState({ folder_type: 'Plaint (Arji)', doc_name: '', drive_link: '' });

  useEffect(() => { fetchAllData(); }, [refresh]);

  const fetchAllData = async () => {
    const { data: cData } = await supabase.from('cases').select('*').order('next_date', { ascending: true });
    setCases(cData || []);
    const { data: aData } = await supabase.from('accounts').select('*').order('date', { ascending: false });
    setAccounts(aData || []);
  };

  const fetchHistory = async (caseId) => {
    const { data } = await supabase.from('case_history').select('*').eq('case_id', caseId).order('recorded_at', { ascending: false });
    setHistoryLog(data || []);
  };

  const fetchDocuments = async (caseId) => {
    const { data } = await supabase.from('documents').select('*').eq('case_id', caseId).order('created_at', { ascending: false });
    setDocuments(data || []);
  };

  const changeMonth = (offset) => {
    const newDate = new Date(calendarDate.setMonth(calendarDate.getMonth() + offset));
    setCalendarDate(new Date(newDate));
  };

  const getFilteredCases = () => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrowDate = new Date(); tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split('T')[0];
    
    const curr = new Date();
    const first = curr.getDate() - curr.getDay(); 
    const last = first + 4; 
    const sunday = new Date(curr.setDate(first)).toISOString().split('T')[0];
    const thursday = new Date(curr.setDate(last)).toISOString().split('T')[0];

    return cases.filter(c => {
      if (caseFilter === 'all') return true;
      if (caseFilter === 'today') return c.next_date === today;
      if (caseFilter === 'tomorrow') return c.next_date === tomorrow;
      if (caseFilter === 'week') return c.next_date >= sunday && c.next_date <= thursday;
      if (caseFilter === 'disposed') return c.status === 'Disposed';
      if (caseFilter === 'update') return c.next_date < today && c.status === 'Ongoing';
      return true;
    });
  };

  const handleSaveCase = async () => {
    const { error } = formData.id 
      ? await supabase.from('cases').update(formData).eq('id', formData.id)
      : await supabase.from('cases').insert([formData]);
    if(error) alert(error.message);
    else { alert("Saved!"); setModalMode(null); setRefresh(r => r+1); }
  };

  // --- NEW: Update Status/Date Function ---
  const handleUpdateStatus = async () => {
    const { error } = await supabase.from('cases').update({
        next_date: formData.next_date,
        current_step: formData.current_step
    }).eq('id', formData.id);

    if(error) alert(error.message);
    else { alert("Status Updated & History Saved!"); setModalMode(null); setRefresh(r => r+1); }
  };

  const handleDeleteCase = async (id) => {
    if(confirm("Delete entire case record?")) {
      await supabase.from('cases').delete().eq('id', id);
      setRefresh(r => r+1);
    }
  };

  const handleSaveDoc = async () => {
    if(!newDoc.drive_link) return alert("Please provide a Google Drive Link");
    const { error } = await supabase.from('documents').insert([{...newDoc, case_id: selectedCase.id}]);
    if(error) alert(error.message);
    else { 
      fetchDocuments(selectedCase.id); 
      setNewDoc({ folder_type: 'Plaint (Arji)', doc_name: '', drive_link: '' });
    }
  };

  const handleSaveTxn = async () => {
    const { error } = formData.id 
      ? await supabase.from('accounts').update(formData).eq('id', formData.id)
      : await supabase.from('accounts').insert([formData]);
    if(error) alert(error.message);
    else { alert("Transaction Saved!"); setModalMode(null); setRefresh(r => r+1); }
  };

  const handleDeleteTxn = async (id) => {
    if(confirm("Delete this transaction?")) {
      await supabase.from('accounts').delete().eq('id', id);
      setRefresh(r => r+1);
    }
  };

  const filteredAccounts = accounts.filter(a => {
    const matchClient = accountFilter.client ? a.client_name?.toLowerCase().includes(accountFilter.client.toLowerCase()) : true;
    const matchMonth = accountFilter.month ? a.date.startsWith(accountFilter.month) : true;
    return matchClient && matchMonth;
  });

  const totalIncome = filteredAccounts.filter(a => a.txn_type === 'Income').reduce((sum, a) => sum + Number(a.amount), 0);
  const totalExpense = filteredAccounts.filter(a => a.txn_type === 'Expense').reduce((sum, a) => sum + Number(a.amount), 0);
  const totalDueIncome = filteredAccounts.filter(a => a.txn_type === 'Income' && a.payment_status === 'Due').reduce((sum, a) => sum + Number(a.amount), 0);
  const totalDueExpense = filteredAccounts.filter(a => a.txn_type === 'Expense' && a.payment_status === 'Due').reduce((sum, a) => sum + Number(a.amount), 0);

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden text-slate-900">
      
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col shadow-2xl transition-transform duration-300
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
        <div className="p-6 text-2xl font-bold font-serif text-[#c5a059] border-b border-slate-800 tracking-wider flex justify-between items-center">
          CHAMBERS
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(false)}>
            <X size={24}/>
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button onClick={() => {setActiveTab('dashboard'); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'dashboard' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <Gavel size={20}/> Case Dashboard
          </button>
          <button onClick={() => {setActiveTab('calendar'); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'calendar' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <CalIcon size={20}/> Calendar
          </button>
          <button onClick={() => {setActiveTab('accounts'); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'accounts' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <DollarSign size={20}/> Accounts & Ledger
          </button>
        </nav>
        <button onClick={onLogout} className="m-4 p-3 flex items-center gap-2 text-red-400 hover:bg-slate-800 rounded">
          <LogOut size={20}/> Logout
        </button>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md shrink-0">
           <span className="font-bold font-serif text-[#c5a059]">LEXSWORD</span>
           <button onClick={() => setMobileMenuOpen(true)}>
             <Menu size={24}/>
           </button>
        </div>

        <main className="flex-1 overflow-y-auto relative p-4 md:p-6">
          
          {activeTab === 'dashboard' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Case Dashboard</h2>
                <button onClick={() => { setFormData({}); setModalMode('addCase'); }} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded shadow hover:bg-[#c5a059] font-bold w-full md:w-auto justify-center">
                  <Plus size={18}/> NEW CASE
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  {id: 'week', label: 'This Week'}, {id: 'today', label: 'Today'}, {id: 'tomorrow', label: 'Tomorrow'}, 
                  {id: 'all', label: 'All Cases'}, {id: 'update', label: 'Needs Update'}, {id: 'disposed', label: 'Disposed'}
                ].map(f => (
                  <button key={f.id} onClick={() => setCaseFilter(f.id)} 
                    className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold border transition ${caseFilter === f.id ? 'bg-[#c5a059] text-slate-900 border-[#c5a059]' : 'bg-white text-slate-600 border-gray-400'}`}>
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="grid gap-4">
                {getFilteredCases().length === 0 && <p className="text-slate-500 italic">No cases found in this filter.</p>}
                {getFilteredCases().map(c => (
                  <div key={c.id} className="bg-white p-4 md:p-5 rounded-lg shadow border-l-4 border-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 transition">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-1">
                        <span className="text-xs font-bold bg-blue-100 text-blue-900 px-2 rounded">{c.court_type}</span>
                        <span className="text-xs font-bold bg-gray-200 text-slate-800 px-2 rounded truncate max-w-[150px]">{c.court_name}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{c.case_no}</h3>
                      <p className="text-slate-700 font-medium">{c.party_name}</p>
                      <p className="text-xs text-slate-500">Section: {c.section}</p>
                    </div>
                    
                    <div className="text-left md:text-right w-full md:w-auto">
                      <p className="text-xs text-slate-600">Next Date</p>
                      <p className="text-lg font-bold text-red-600">{c.next_date}</p>
                      <p className="text-xs font-bold text-[#c5a059] uppercase">{c.current_step}</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                      
                      {/* --- ADDED: QUICK UPDATE BUTTON --- */}
                      <button onClick={() => { setFormData(c); setModalMode('updateStatus'); }} className="p-2 bg-slate-900 text-white rounded hover:bg-[#c5a059] font-bold flex items-center gap-1" title="Update Date & Step">
                        <RefreshCw size={16}/> Update
                      </button>

                      <button onClick={() => { setSelectedCase(c); setModalMode('viewCase'); }} className="p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200" title="View">
                        <Eye size={18}/>
                      </button>
                      <button onClick={() => { setFormData(c); setModalMode('addCase'); }} className="p-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200" title="Edit">
                        <Edit3 size={18}/>
                      </button>
                      <button onClick={() => handleDeleteCase(c.id)} className="p-2 bg-red-100 text-red-800 rounded hover:bg-red-200" title="Delete">
                        <Trash2 size={18}/>
                      </button>
                      <button onClick={() => window.open(`https://wa.me/${c.client_mobile}`, '_blank')} className="p-2 bg-green-100 text-green-800 rounded hover:bg-green-200">
                        <MessageCircle size={18}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="bg-white p-4 md:p-6 rounded shadow h-full flex flex-col text-slate-900">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                 <h2 className="text-2xl font-bold">Monthly Schedule</h2>
                 <div className="flex items-center gap-4 bg-slate-200 p-2 rounded text-slate-900">
                   <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-300 rounded"><ChevronLeft/></button>
                   <span className="font-bold text-lg w-32 text-center">
                     {calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                   </span>
                   <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-300 rounded"><ChevronRight/></button>
                 </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 font-bold text-center bg-slate-200 text-slate-900 p-2 rounded mb-2 text-xs md:text-base">
                 <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
              </div>
              <div className="grid grid-cols-7 gap-1 flex-1">
                 {[...Array(35)].map((_, i) => {
                   const year = calendarDate.getFullYear();
                   const month = calendarDate.getMonth();
                   const firstDay = new Date(year, month, 1).getDay();
                   const d = new Date(year, month, 1 + i - firstDay);
                   
                   const dateStr = d.toISOString().split('T')[0];
                   const isCurrentMonth = d.getMonth() === month;
                   const hasCase = cases.filter(c => c.next_date === dateStr);
                   
                   return (
                     <div key={i} onClick={() => isCurrentMonth && setSelectedDateCases(hasCase)} 
                       className={`border p-1 md:p-2 h-16 md:h-24 rounded cursor-pointer transition 
                       ${!isCurrentMonth ? 'bg-slate-100 opacity-50' : hasCase.length > 0 ? 'bg-red-50 border-red-300 hover:bg-red-100' : 'bg-white hover:bg-blue-50 border-slate-300'}`}>
                       <div className="flex justify-between items-start">
                         <span className={`text-[10px] md:text-xs font-bold ${isCurrentMonth ? 'text-slate-900' : 'text-slate-400'}`}>{d.getDate()}</span>
                         {isCurrentMonth && hasCase.length > 0 && <span className="text-[10px] md:text-xs bg-red-600 text-white px-1 rounded-full">{hasCase.length}</span>}
                       </div>
                       <div className="mt-1 overflow-hidden h-8 md:h-14">
                         {isCurrentMonth && hasCase.map(c => <div key={c.id} className="text-[8px] md:text-[10px] truncate text-slate-900 font-bold">• {c.case_no}</div>)}
                       </div>
                     </div>
                   )
                 })}
              </div>
              
              {selectedDateCases && (
                 <div className="mt-4 border-t pt-4">
                   <h3 className="font-bold text-lg mb-2 text-slate-900">Cases on Selected Date:</h3>
                   {selectedDateCases.length === 0 ? <p className="text-slate-600">No cases.</p> : 
                     selectedDateCases.map(c => (
                       <div key={c.id} className="flex gap-4 items-center bg-slate-100 p-2 mb-2 rounded border text-sm text-slate-900">
                         <span className="font-bold">{c.case_no}</span>
                         <span className="truncate flex-1">{c.party_name}</span>
                         <span className="text-[#c5a059] font-bold">{c.current_step}</span>
                       </div>
                     ))
                   }
                 </div>
              )}
            </div>
          )}

          {activeTab === 'accounts' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-3xl font-bold text-slate-900">Accounts & Ledger</h2>
                <button onClick={() => { setFormData({txn_type: 'Income', category: 'Office', payment_status: 'Paid'}); setModalMode('addTxn'); }} className="bg-slate-900 text-white px-6 py-2 rounded font-bold hover:bg-[#c5a059] w-full md:w-auto">
                   + ADD TRANSACTION
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-100 p-4 rounded border border-green-300">
                   <p className="text-xs font-bold text-green-900 uppercase">Income (Paid)</p>
                   <p className="text-xl md:text-2xl font-bold text-slate-900">৳{totalIncome - totalDueIncome}</p>
                </div>
                <div className="bg-red-100 p-4 rounded border border-red-300">
                   <p className="text-xs font-bold text-red-900 uppercase">Expense (Paid)</p>
                   <p className="text-xl md:text-2xl font-bold text-slate-900">৳{totalExpense - totalDueExpense}</p>
                </div>
                <div className="bg-slate-900 text-white p-4 rounded">
                   <p className="text-xs font-bold text-[#c5a059] uppercase">Cash In Hand</p>
                   <p className="text-xl md:text-2xl font-bold">৳{(totalIncome - totalDueIncome) - (totalExpense - totalDueExpense)}</p>
                </div>
                <div className="bg-orange-100 p-4 rounded border border-orange-300">
                   <p className="text-xs font-bold text-orange-900 uppercase">Dues (Pending)</p>
                   <p className="text-xs md:text-sm font-bold text-slate-900">In: ৳{totalDueIncome}</p>
                   <p className="text-xs md:text-sm font-bold text-slate-900">Out: ৳{totalDueExpense}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-4 items-center">
                 <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter size={18} className="text-slate-500"/>
                    <span className="font-bold text-sm text-slate-700">Filter:</span>
                 </div>
                 <input placeholder="Client Name..." className="border border-slate-300 p-2 rounded flex-1 w-full text-slate-900" 
                    onChange={e => setAccountFilter({...accountFilter, client: e.target.value})} />
                 <input type="month" className="border border-slate-300 p-2 rounded w-full md:w-auto text-slate-900" 
                    onChange={e => setAccountFilter({...accountFilter, month: e.target.value})} />
              </div>

              <div className="bg-white rounded shadow overflow-x-auto">
                 <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="p-3 text-slate-900 font-bold">Date</th>
                        <th className="p-3 text-slate-900 font-bold">Client / Name</th>
                        <th className="p-3 text-slate-900 font-bold">Description</th>
                        <th className="p-3 text-slate-900 font-bold">Category</th>
                        <th className="p-3 text-slate-900 font-bold">Status</th>
                        <th className="p-3 text-right text-slate-900 font-bold">Amount</th>
                        <th className="p-3 text-center text-slate-900 font-bold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAccounts.map(a => (
                        <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="p-3 text-sm text-slate-700">{a.date}</td>
                          <td className="p-3 font-bold text-slate-900">{a.client_name || '-'}</td>
                          <td className="p-3 text-sm text-slate-700">{a.description}</td>
                          <td className="p-3"><span className="bg-slate-200 text-slate-800 px-2 py-1 rounded text-xs">{a.category}</span></td>
                          <td className="p-3">
                             <span className={`px-2 py-1 rounded text-xs font-bold ${a.payment_status === 'Paid' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                               {a.payment_status}
                             </span>
                          </td>
                          <td className={`p-3 text-right font-bold ${a.txn_type === 'Income' ? 'text-green-700' : 'text-red-700'}`}>
                             {a.txn_type === 'Income' ? '+' : '-'} {a.amount}
                          </td>
                          <td className="p-3 flex justify-center gap-2">
                             <button onClick={() => { setFormData(a); setModalMode('addTxn'); }} className="text-blue-600 hover:bg-blue-100 p-1 rounded"><Edit3 size={16}/></button>
                             <button onClick={() => handleDeleteTxn(a.id)} className="text-red-600 hover:bg-red-100 p-1 rounded"><Trash2 size={16}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================= MODALS (With Darker Text & Update Status) ================= */}
      
      {/* --- NEW: Quick Update Status Modal --- */}
      {modalMode === 'updateStatus' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-slate-900 p-4 text-white flex justify-between">
              <h3 className="font-bold flex items-center gap-2"><RefreshCw size={18}/> Update Status</h3>
              <button onClick={() => setModalMode(null)}><X/></button>
            </div>
            <div className="p-6 space-y-4">
               <div className="bg-slate-100 p-3 rounded mb-4">
                  <p className="text-xs font-bold text-slate-500">CASE NO</p>
                  <p className="text-xl font-bold text-slate-900">{formData.case_no}</p>
                  <p className="text-sm text-slate-700">{formData.party_name}</p>
               </div>
               
               <div>
                  <label className="block text-xs font-bold text-red-700 mb-1">New Date</label>
                  <input type="date" value={formData.next_date} onChange={e => setFormData({...formData, next_date: e.target.value})} className="w-full border-2 border-red-200 p-3 rounded text-slate-900 bg-white font-bold"/>
               </div>
               
               <div>
                  <label className="block text-xs font-bold text-red-700 mb-1">New Step / Status</label>
                  <input placeholder="e.g. Hearing / Order" value={formData.current_step} onChange={e => setFormData({...formData, current_step: e.target.value})} className="w-full border-2 border-red-200 p-3 rounded text-slate-900 bg-white font-bold"/>
               </div>

               <button onClick={handleUpdateStatus} className="w-full bg-slate-900 text-white py-3 rounded font-bold hover:bg-[#c5a059]">CONFIRM UPDATE</button>
            </div>
          </div>
        </div>
      )}

      {modalMode === 'addCase' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-slate-900 p-4 text-white flex justify-between">
              <h3 className="font-bold flex items-center gap-2"><Gavel/> {formData.id ? 'Edit Case' : 'New Case Entry'}</h3>
              <button onClick={() => setModalMode(null)}><X/></button>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-4">
               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Court Type</label>
               <select value={formData.court_type} onChange={e => setFormData({...formData, court_type: e.target.value})} className="w-full border p-2 rounded text-slate-900 bg-white">
                 <option>High Court</option><option>Judge Court</option>
               </select></div>
               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Court Name</label>
               <input placeholder="e.g. 5th Joint District Judge" value={formData.court_name} onChange={e => setFormData({...formData, court_name: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Case No</label>
               <input value={formData.case_no} onChange={e => setFormData({...formData, case_no: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Section</label>
               <input value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Party Name</label>
               <input value={formData.party_name} onChange={e => setFormData({...formData, party_name: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">On Behalf</label>
               <select value={formData.on_behalf} onChange={e => setFormData({...formData, on_behalf: e.target.value})} className="w-full border p-2 rounded text-slate-900 bg-white">
                 <option>Petitioner</option><option>Defendant</option><option>Plaintiff</option><option>Accused</option>
               </select></div>
               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Client Mobile</label>
               <input placeholder="017xxxxxxxx" value={formData.client_mobile} onChange={e => setFormData({...formData, client_mobile: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Status</label>
               <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border p-2 rounded text-slate-900 bg-white">
                 <option>Ongoing</option><option>Disposed</option>
               </select></div>
               <div className="col-span-2 grid grid-cols-2 gap-4 bg-yellow-50 p-4 rounded border border-yellow-200">
                  <div className="space-y-1"><label className="text-xs font-bold text-red-700">Next Date</label>
                  <input type="date" value={formData.next_date} onChange={e => setFormData({...formData, next_date: e.target.value})} className="w-full border p-2 rounded bg-white text-slate-900"/></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-red-700">Next Step</label>
                  <input value={formData.current_step} onChange={e => setFormData({...formData, current_step: e.target.value})} className="w-full border p-2 rounded bg-white text-slate-900"/></div>
               </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-3">
               <button onClick={() => setModalMode(null)} className="px-4 py-2 border rounded text-slate-700">Cancel</button>
               <button onClick={handleSaveCase} className="px-6 py-2 bg-slate-900 text-white rounded font-bold">SAVE</button>
            </div>
          </div>
        </div>
      )}

      {modalMode === 'viewCase' && selectedCase && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-slate-900">
             <div className="bg-slate-900 p-4 text-white flex justify-between">
                <h3 className="font-bold flex items-center gap-2">Case Record: {selectedCase.case_no}</h3>
                <button onClick={() => setModalMode(null)}><X/></button>
             </div>
             
             <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6 text-sm bg-slate-50 p-4 rounded border">
                   <div>
                      <p className="text-slate-500 font-bold uppercase text-xs">Court Info</p>
                      <p className="font-bold text-lg text-slate-900">{selectedCase.court_name}</p>
                      <p className="text-slate-700">{selectedCase.court_type}</p>
                   </div>
                   <div>
                      <p className="text-slate-500 font-bold uppercase text-xs">Parties</p>
                      <p className="font-bold text-lg text-slate-900">{selectedCase.party_name}</p>
                      <p className="text-slate-700">For: {selectedCase.on_behalf}</p>
                   </div>
                   <div>
                      <p className="text-slate-500 font-bold uppercase text-xs">Status</p>
                      <p className="text-lg font-bold text-red-600">{selectedCase.next_date}</p>
                      <p className="text-slate-900">{selectedCase.current_step}</p>
                   </div>
                   <div className="flex items-end">
                      <button onClick={() => { fetchHistory(selectedCase.id); setModalMode('history'); }} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded text-xs font-bold">
                         <History size={16}/> VIEW DATE HISTORY
                      </button>
                   </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h4 className="font-bold text-lg flex items-center gap-2 text-slate-900"><FolderOpen className="text-[#c5a059]"/> Digital Archive</h4>
                    <button onClick={() => fetchDocuments(selectedCase.id)} className="text-xs underline text-slate-600">Refresh</button>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded flex gap-2 items-end mb-4 border border-blue-200">
                     <div className="flex-1 space-y-1">
                        <label className="text-xs font-bold text-slate-600">Folder</label>
                        <select className="w-full p-2 border rounded text-sm text-slate-900 bg-white" 
                           onChange={e => setNewDoc({...newDoc, folder_type: e.target.value})}>
                           <option>Plaint (Arji)</option><option>Written Statement (Jabab)</option>
                           <option>Complaint (Nalishi)</option><option>Judgment</option><option>Misc</option>
                        </select>
                     </div>
                     <div className="flex-1 space-y-1">
                        <label className="text-xs font-bold text-slate-600">Doc Name</label>
                        <input placeholder="e.g. Certified Copy" className="w-full p-2 border rounded text-sm text-slate-900"
                           value={newDoc.doc_name} onChange={e => setNewDoc({...newDoc, doc_name: e.target.value})}/>
                     </div>
                     <div className="flex-[2] space-y-1">
                        <label className="text-xs font-bold text-slate-600">Google Drive Link</label>
                        <input placeholder="https://drive.google.com/..." className="w-full p-2 border rounded text-sm text-slate-900"
                           value={newDoc.drive_link} onChange={e => setNewDoc({...newDoc, drive_link: e.target.value})}/>
                     </div>
                     <button onClick={handleSaveDoc} className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#c5a059]">ADD</button>
                  </div>

                  <div className="space-y-2">
                     {documents.length === 0 && <p className="text-slate-500 text-sm italic">No documents linked yet.</p>}
                     {documents.map(d => (
                        <div key={d.id} className="flex justify-between items-center bg-white border p-3 rounded hover:bg-gray-50">
                           <div className="flex items-center gap-3">
                              <Folder className="text-yellow-500" size={18}/>
                              <div>
                                 <p className="font-bold text-sm text-slate-900">{d.folder_type}</p>
                                 <p className="text-xs text-slate-500">{d.doc_name}</p>
                              </div>
                           </div>
                           <a href={d.drive_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 font-bold text-xs border border-blue-200 px-3 py-1 rounded hover:bg-blue-50">
                              OPEN FILE <ExternalLink size={12}/>
                           </a>
                        </div>
                     ))}
                  </div>
                </div>

             </div>
          </div>
        </div>
      )}

      {modalMode === 'history' && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
               <div className="bg-slate-900 p-4 text-white flex justify-between">
                  <h3 className="font-bold">History Log</h3>
                  <button onClick={() => setModalMode('viewCase')}><ChevronLeft/></button>
               </div>
               <div className="p-4 h-96 overflow-y-auto">
                  {historyLog.length === 0 && <p className="text-slate-500">No history recorded yet.</p>}
                  {historyLog.map((h, i) => (
                     <div key={i} className="flex gap-4 border-l-2 border-slate-300 pl-4 pb-6 relative">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-300 rounded-full"></div>
                        <div>
                           <p className="font-bold text-slate-900">{h.prev_date}</p>
                           <p className="text-sm text-slate-700">{h.prev_step}</p>
                           <p className="text-xs text-slate-500 mt-1">Recorded: {new Date(h.recorded_at).toLocaleDateString()}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      )}

      {modalMode === 'addTxn' && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl">
               <div className="bg-slate-900 p-4 text-white flex justify-between">
                  <h3 className="font-bold">{formData.id ? 'Edit Transaction' : 'New Transaction'}</h3>
                  <button onClick={() => setModalMode(null)}><X/></button>
               </div>
               <div className="p-6 space-y-4">
                  <div className="flex gap-2">
                     <button onClick={() => setFormData({...formData, txn_type: 'Income'})} className={`flex-1 py-2 rounded font-bold ${formData.txn_type === 'Income' ? 'bg-green-600 text-white' : 'bg-gray-100 text-slate-900'}`}>Income</button>
                     <button onClick={() => setFormData({...formData, txn_type: 'Expense'})} className={`flex-1 py-2 rounded font-bold ${formData.txn_type === 'Expense' ? 'bg-red-600 text-white' : 'bg-gray-100 text-slate-900'}`}>Expense</button>
                  </div>
                  <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border p-2 rounded text-slate-900"/>
                  <input placeholder="Client Name (e.g. Rahim)" value={formData.client_name} onChange={e => setFormData({...formData, client_name: e.target.value})} className="w-full border p-2 rounded text-slate-900"/>
                  <input placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-2 rounded text-slate-900"/>
                  <div className="flex gap-2">
                     <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-1/2 border p-2 rounded text-slate-900 bg-white">
                        <option>Office</option><option>Personal</option><option>Client</option>
                     </select>
                     <select value={formData.payment_status} onChange={e => setFormData({...formData, payment_status: e.target.value})} className="w-1/2 border p-2 rounded text-slate-900 bg-white">
                        <option>Paid</option><option>Due</option>
                     </select>
                  </div>
                  <input type="number" placeholder="Amount" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full border p-2 rounded font-bold text-lg text-slate-900"/>
                  <button onClick={handleSaveTxn} className="w-full bg-slate-900 text-white py-3 rounded font-bold">SAVE ENTRY</button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
};

// ==============================================================================
// 3. MAIN APP CONTROLLER
// ==============================================================================
export default function App() {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null); 
  const [view, setView] = useState('home');
  const [loading, setLoading] = useState(false); // Login Animation State

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if(session) checkRole(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if(session) checkRole(session.user.id);
      else { setView('home'); setUserRole(null); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkRole = async (uid) => {
    const { data } = await supabase.from('profiles').select('role').eq('id', uid).single();
    if(data) {
      setUserRole(data.role);
      setView('dashboard');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start animation
    const { error } = await supabase.auth.signInWithPassword({ 
      email: e.target.email.value, password: e.target.password.value 
    });
    if (error) {
      alert(error.message);
      setLoading(false); // Stop if error
    }
    // If success, supabase listener will handle redirect
  };

  if (view === 'home') return <PublicHome onLoginClick={() => setView('login')} loading={loading} />;
  
  if (view === 'login') return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-2xl w-full max-w-md border-t-8 border-[#c5a059]">
        <div className="text-center mb-6">
           <Lock className="mx-auto h-12 w-12 text-[#c5a059] mb-2"/>
           <h2 className="text-2xl font-bold">Secure Portal</h2>
           <p className="text-gray-500 text-sm">Client & Admin Access</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input name="email" type="email" placeholder="Email Address" className="w-full p-3 border rounded text-slate-900" required />
          <input name="password" type="password" placeholder="Password" className="w-full p-3 border rounded text-slate-900" required />
          <button type="submit" className="w-full bg-slate-900 text-white py-3 font-bold hover:bg-[#c5a059] flex justify-center items-center gap-2">
            {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : "AUTHENTICATE"}
          </button>
        </form>
        <button onClick={() => setView('home')} className="w-full text-center mt-4 text-sm text-gray-500 hover:text-[#c5a059]">Return to Home</button>
      </div>
    </div>
  );

  if (userRole === 'client') return <ClientDashboard session={session} onLogout={() => supabase.auth.signOut()} />;
  
  return <AdminDashboard session={session} onLogout={() => supabase.auth.signOut()} />;
}

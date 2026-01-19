import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Scale, Gavel, DollarSign, Bell, 
  Calendar as CalIcon, Save, Trash2, 
  ExternalLink, MessageCircle, FolderOpen, LogOut, 
  Plus, X, Edit3, Filter, ChevronLeft, ChevronRight, 
  Eye, History, User, Lock, Folder, Check, Mail, Phone, MapPin, ArrowRight, Menu, RefreshCw, CheckCircle, Search
} from 'lucide-react';

// ==============================================================================
// 1. LEXSWORD PUBLIC HOMEPAGE (UNCHANGED)
// ==============================================================================

const PublicHome = ({ onLoginClick, loading }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xqeepnrr", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setShowSuccessModal(true);
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans text-slate-800 bg-white selection:bg-[#c5a059] selection:text-white">
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 py-4 px-6 md:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-[#c5a059] p-2 rounded-sm">
              <Scale size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight leading-none">LexSword</h1>
              <p className="text-[10px] text-[#c5a059] font-bold tracking-[0.3em] uppercase">A Top Law Firm</p>
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
                  alt="Md. Azadur Rahman" 
                  className="relative rounded-lg shadow-2xl border-4 border-white object-cover object-top h-[500px] md:h-[650px] w-full"
               />
               <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl rounded-sm border-l-4 border-[#c5a059] hidden md:block">
                  <p className="text-xl font-serif font-bold text-slate-900">Adv. Azadur Rahman</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Head of Chamber</p>
               </div>
            </div>
         </div>
      </header>

      <section id="contact" className="py-16 md:py-24 bg-slate-900 text-white relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-8 order-2 md:order-1">
               <h2 className="text-3xl md:text-4xl font-serif font-bold">Free Case Evaluation</h2>
               <p className="text-slate-400 text-base md:text-lg">Please fill out the form to request an appointment. We will review your case and get back to you within 24 hours.</p>
            </div>
            <div className="bg-white p-5 md:p-8 rounded-sm shadow-2xl order-1 md:order-2">
               <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="col-span-1 md:col-span-2">
                     <label className="block text-slate-700 font-bold text-xs uppercase mb-2">Full Name</label>
                     <input name="name" type="text" className="w-full bg-slate-50 border border-gray-200 p-3 md:p-4 outline-none focus:border-[#c5a059] text-slate-900 text-sm md:text-base rounded-sm" required/>
                  </div>
                  <div className="col-span-1">
                     <label className="block text-slate-700 font-bold text-xs uppercase mb-2">Phone</label>
                     <input name="phone" type="tel" className="w-full bg-slate-50 border border-gray-200 p-3 md:p-4 outline-none focus:border-[#c5a059] text-slate-900 text-sm md:text-base rounded-sm" required/>
                  </div>
                  <div className="col-span-1">
                     <label className="block text-slate-700 font-bold text-xs uppercase mb-2">Email</label>
                     <input name="email" type="email" className="w-full bg-slate-50 border border-gray-200 p-3 md:p-4 outline-none focus:border-[#c5a059] text-slate-900 text-sm md:text-base rounded-sm"/>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                     <textarea name="message" rows="4" className="w-full bg-slate-50 border border-gray-200 p-3 md:p-4 outline-none focus:border-[#c5a059] text-slate-900 text-sm md:text-base rounded-sm" placeholder="Case Details..."></textarea>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                     <button type="submit" disabled={isSubmitting} className="w-full bg-[#c5a059] text-slate-900 py-3 md:py-4 font-bold tracking-widest hover:bg-slate-900 hover:text-white transition uppercase text-sm md:text-base rounded-sm flex justify-center items-center gap-2">
                        {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : "Submit Request"}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </section>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-sm shadow-2xl w-full max-w-md border-t-8 border-[#c5a059] text-center animate-bounce-in">
             <div className="mb-4 flex justify-center">
                <CheckCircle size={64} className="text-green-500"/>
             </div>
             <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Submission Received</h3>
             <p className="text-slate-600 mb-6">Thank you for contacting LexSword.</p>
             <button onClick={() => setShowSuccessModal(false)} className="bg-slate-900 text-white px-8 py-3 rounded-sm font-bold hover:bg-[#c5a059] transition uppercase tracking-wider w-full">Close</button>
          </div>
        </div>
      )}
      
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-900">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 className="text-2xl font-serif font-bold text-white tracking-wide">LEXSWORD</h2>
            <p className="text-sm mt-2">&copy; {new Date().getFullYear()} LexSword Chambers.</p>
         </div>
      </footer>
    </div>
  );
};

// ==============================================================================
// 2. DASHBOARD & MODULES
// ==============================================================================

// --- Client Dashboard ---
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
        <div className="grid gap-6">
          {myCases.map(c => (
            <div key={c.id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#c5a059]">
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{c.case_no}</h3>
              <p className="text-lg text-slate-700">{c.party_name}</p>
              <div className="bg-slate-100 p-4 rounded border mt-4">
                <p className="text-sm font-bold text-slate-600">Next Date: <span className="text-red-600">{c.next_date}</span></p>
                <p className="text-lg font-bold text-[#c5a059]">{c.current_step}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// --- Admin Dashboard (UPDATED: Filters with Counts & Blinking Alert) ---
const AdminDashboard = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refresh, setRefresh] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // States
  const [cases, setCases] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [historyLog, setHistoryLog] = useState([]);
  const [documents, setDocuments] = useState([]); 
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState(''); 
  const [mainCaseTab, setMainCaseTab] = useState('judge'); // 'judge' or 'high'
  const [caseFilter, setCaseFilter] = useState('all'); // Sub-filter
  const [accountFilter, setAccountFilter] = useState({ client: '', month: '', type: 'All' });
  
  const [calendarDate, setCalendarDate] = useState(new Date()); 
  const [selectedDateCases, setSelectedDateCases] = useState(null);

  const [modalMode, setModalMode] = useState(null);
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

  // Timezone Fix
  const getLocalStr = (d) => {
    const offset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - offset).toISOString().split('T')[0];
  };

  const today = getLocalStr(new Date());
  const tomorrowDate = new Date(); tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = getLocalStr(tomorrowDate);
  const curr = new Date();
  const first = curr.getDate() - curr.getDay(); 
  const last = first + 4; 
  const sunday = getLocalStr(new Date(curr.setDate(first)));
  const thursday = getLocalStr(new Date(curr.setDate(last)));

  // --- Dynamic Count Calculation Helper ---
  const getCounts = (tab) => {
    const activeList = cases.filter(c => tab === 'judge' ? c.court_type === 'Judge Court' : c.court_type === 'High Court');
    return {
        all: activeList.length,
        today: activeList.filter(c => c.next_date === today).length,
        tomorrow: activeList.filter(c => c.next_date === tomorrow).length,
        week: activeList.filter(c => c.next_date >= sunday && c.next_date <= thursday).length,
        update: activeList.filter(c => c.next_date < today && c.status === 'Ongoing').length,
        disposed: activeList.filter(c => c.status === 'Disposed').length,
        pending: activeList.filter(c => c.status === 'Ongoing').length,
        // Specific types count
        writ: activeList.filter(c => c.case_nature === 'Writ Petition').length,
        civilRev: activeList.filter(c => c.case_nature === 'Civil Revision').length,
        crimRev: activeList.filter(c => c.case_nature === 'Criminal Revision').length,
        civilApp: activeList.filter(c => c.case_nature === 'Civil Appeal').length,
        crimApp: activeList.filter(c => c.case_nature === 'Criminal Appeal').length,
        misc: activeList.filter(c => c.case_nature === 'Misc Case').length,
    };
  };

  const currentCounts = getCounts(mainCaseTab);

  // --- Filter Logic ---
  const getFilteredCases = () => {
    let result = cases.filter(c => 
      (c.case_no && c.case_no.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.party_name && c.party_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Filter by Main Tab (Judge vs High)
    result = result.filter(c => c.court_type === (mainCaseTab === 'judge' ? 'Judge Court' : 'High Court'));

    // Sub-filters
    if (caseFilter === 'today') result = result.filter(c => c.next_date === today);
    else if (caseFilter === 'tomorrow') result = result.filter(c => c.next_date === tomorrow);
    else if (caseFilter === 'week') result = result.filter(c => c.next_date >= sunday && c.next_date <= thursday);
    else if (caseFilter === 'update') result = result.filter(c => c.next_date < today && c.status === 'Ongoing');
    else if (caseFilter === 'disposed') result = result.filter(c => c.status === 'Disposed');
    else if (caseFilter === 'pending') result = result.filter(c => c.status === 'Ongoing');
    else if (caseFilter !== 'all') {
        // Nature specific filters (Writ, etc.)
        result = result.filter(c => c.case_nature === caseFilter);
    }

    return result;
  };

  const handleSaveCase = async () => {
    const { error } = formData.id 
      ? await supabase.from('cases').update(formData).eq('id', formData.id)
      : await supabase.from('cases').insert([formData]);
    if(error) alert(error.message);
    else { alert("Saved!"); setModalMode(null); setRefresh(r => r+1); }
  };

  const handleUpdateStatus = async () => {
    const { error } = await supabase.from('cases').update({
        next_date: formData.next_date,
        current_step: formData.current_step
    }).eq('id', formData.id);

    if(error) alert(error.message);
    else { alert("Status Updated!"); setModalMode(null); setRefresh(r => r+1); }
  };

  const handleDeleteCase = async (id) => {
    if(confirm("Delete entire case record?")) {
      await supabase.from('cases').delete().eq('id', id);
      setRefresh(r => r+1);
    }
  };

  const handleSaveDoc = async () => {
    if(!newDoc.drive_link) return alert("Please provide a link");
    const { error } = await supabase.from('documents').insert([{...newDoc, case_id: selectedCase.id}]);
    if(error) alert(error.message);
    else { fetchDocuments(selectedCase.id); setNewDoc({ folder_type: 'Plaint (Arji)', doc_name: '', drive_link: '' }); }
  };

  const handleSaveTxn = async () => {
    const { error } = formData.id 
      ? await supabase.from('accounts').update(formData).eq('id', formData.id)
      : await supabase.from('accounts').insert([formData]);
    if(error) alert(error.message);
    else { alert("Saved!"); setModalMode(null); setRefresh(r => r+1); }
  };

  const handleDeleteTxn = async (id) => {
    if(confirm("Delete transaction?")) {
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

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden text-slate-900">
      {mobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
        <div className="p-6 text-2xl font-bold font-serif text-[#c5a059] border-b border-slate-800 tracking-wider flex justify-between items-center">
          CHAMBERS <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(false)}><X size={24}/></button>
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
        <button onClick={onLogout} className="m-4 p-3 flex items-center gap-2 text-red-400 hover:bg-slate-800 rounded"><LogOut size={20}/> Logout</button>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md shrink-0">
           <span className="font-bold font-serif text-[#c5a059]">LEXSWORD</span>
           <button onClick={() => setMobileMenuOpen(true)}><Menu size={24}/></button>
        </div>

        <main className="flex-1 overflow-y-auto relative p-4 md:p-6">
          
          {activeTab === 'dashboard' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Case Dashboard</h2>
                <div className="flex gap-2 w-full md:w-auto">
                    <button onClick={() => { setFormData({}); setModalMode('addCase'); }} className="flex-1 items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded shadow hover:bg-[#c5a059] font-bold flex justify-center">
                    <Plus size={18}/> NEW CASE
                    </button>
                </div>
              </div>

              {/* MAIN TABS */}
              <div className="flex gap-0 mb-4 border-b-2 border-slate-300">
                  <button onClick={() => { setMainCaseTab('judge'); setCaseFilter('all'); }} className={`px-6 py-3 font-bold text-lg transition-all ${mainCaseTab === 'judge' ? 'border-b-4 border-[#c5a059] text-slate-900 bg-white' : 'text-gray-500 hover:text-slate-700'}`}>
                      Judge Court ({getCounts('judge').all})
                  </button>
                  <button onClick={() => { setMainCaseTab('high'); setCaseFilter('all'); }} className={`px-6 py-3 font-bold text-lg transition-all ${mainCaseTab === 'high' ? 'border-b-4 border-[#c5a059] text-slate-900 bg-white' : 'text-gray-500 hover:text-slate-700'}`}>
                      High Court ({getCounts('high').all})
                  </button>
              </div>

              <div className="mb-4 relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20}/>
                  <input 
                    type="text" 
                    placeholder="Search by Case No or Party Name..." 
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded focus:border-[#c5a059] outline-none text-slate-900"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>

              {/* DYNAMIC FILTERS WITH COUNTS */}
              <div className="flex flex-wrap gap-2 mb-6">
                {mainCaseTab === 'judge' ? (
                    <>
                        <button onClick={() => setCaseFilter('all')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'all' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>All ({currentCounts.all})</button>
                        <button onClick={() => setCaseFilter('pending')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'pending' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Pending ({currentCounts.pending})</button>
                        <button onClick={() => setCaseFilter('disposed')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'disposed' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Disposed ({currentCounts.disposed})</button>
                        <button onClick={() => setCaseFilter('today')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'today' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Today ({currentCounts.today})</button>
                        <button onClick={() => setCaseFilter('tomorrow')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'tomorrow' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Tomorrow ({currentCounts.tomorrow})</button>
                        <button onClick={() => setCaseFilter('week')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'week' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>This Week ({currentCounts.week})</button>
                        
                        {/* Blinking Alert Button */}
                        <button onClick={() => setCaseFilter('update')} 
                            className={`px-3 py-1 rounded-full text-sm font-bold border transition
                            ${currentCounts.update > 0 ? 'bg-red-600 text-white border-red-600 animate-pulse' : 'bg-white text-slate-600'}`}>
                            Needs Update ({currentCounts.update})
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setCaseFilter('all')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'all' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>All ({currentCounts.all})</button>
                        <button onClick={() => setCaseFilter('pending')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'pending' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Pending ({currentCounts.pending})</button>
                        <button onClick={() => setCaseFilter('disposed')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'disposed' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Disposed ({currentCounts.disposed})</button>
                        
                        {/* Blinking Alert Button */}
                        <button onClick={() => setCaseFilter('update')} 
                            className={`px-3 py-1 rounded-full text-sm font-bold border transition
                            ${currentCounts.update > 0 ? 'bg-red-600 text-white border-red-600 animate-pulse' : 'bg-white text-slate-600'}`}>
                            Needs Update ({currentCounts.update})
                        </button>

                        <button onClick={() => setCaseFilter('Writ Petition')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Writ Petition' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Writ ({currentCounts.writ})</button>
                        <button onClick={() => setCaseFilter('Civil Revision')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Civil Revision' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Civil Rev ({currentCounts.civilRev})</button>
                        <button onClick={() => setCaseFilter('Criminal Revision')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Criminal Revision' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Crim Rev ({currentCounts.crimRev})</button>
                        <button onClick={() => setCaseFilter('Civil Appeal')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Civil Appeal' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Civil Appeal ({currentCounts.civilApp})</button>
                        <button onClick={() => setCaseFilter('Criminal Appeal')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Criminal Appeal' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Crim Appeal ({currentCounts.crimApp})</button>
                        <button onClick={() => setCaseFilter('Misc Case')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Misc Case' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Misc ({currentCounts.misc})</button>
                    </>
                )}
              </div>

              <div className="grid gap-4">
                {getFilteredCases().length === 0 && <p className="text-slate-500 italic">No cases found.</p>}
                {getFilteredCases().map(c => (
                  <div key={c.id} className="bg-white p-4 md:p-5 rounded-lg shadow border-l-4 border-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 transition">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-1">
                        <span className="text-xs font-bold bg-blue-100 text-blue-900 px-2 rounded">{c.court_type}</span>
                        {c.court_type === 'High Court' && <span className="text-xs font-bold bg-yellow-100 text-yellow-900 px-2 rounded">{c.case_nature}</span>}
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
                      <button onClick={() => { setFormData(c); setModalMode('updateStatus'); }} className="p-2 bg-slate-900 text-white rounded hover:bg-[#c5a059] font-bold flex items-center gap-1" title="Update">
                        <RefreshCw size={16}/> Update
                      </button>
                      <button onClick={() => { setSelectedCase(c); setModalMode('viewCase'); }} className="p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"><Eye size={18}/></button>
                      <button onClick={() => { setFormData(c); setModalMode('addCase'); }} className="p-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"><Edit3 size={18}/></button>
                      <button onClick={() => handleDeleteCase(c.id)} className="p-2 bg-red-100 text-red-800 rounded hover:bg-red-200"><Trash2 size={18}/></button>
                      <button onClick={() => window.open(`https://wa.me/${c.client_mobile}`, '_blank')} className="p-2 bg-green-100 text-green-800 rounded hover:bg-green-200"><MessageCircle size={18}/></button>
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
                   <span className="font-bold text-lg w-32 text-center">{calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
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
                   const dateStr = getLocalStr(d); 
                   const isCurrentMonth = d.getMonth() === month;
                   const hasCase = cases.filter(c => c.next_date === dateStr);
                   
                   return (
                     <div key={i} onClick={() => isCurrentMonth && setSelectedDateCases(hasCase)} 
                       className={`border p-1 md:p-2 h-16 md:h-24 rounded cursor-pointer transition ${!isCurrentMonth ? 'bg-slate-100 opacity-50' : hasCase.length > 0 ? 'bg-red-50 border-red-300 hover:bg-red-100' : 'bg-white hover:bg-blue-50 border-slate-300'}`}>
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
                <button onClick={() => { setFormData({txn_type: 'Income', category: 'Office', payment_status: 'Paid'}); setModalMode('addTxn'); }} className="bg-slate-900 text-white px-6 py-2 rounded font-bold hover:bg-[#c5a059] w-full md:w-auto">+ ADD TRANSACTION</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-100 p-4 rounded border border-green-300">
                   <p className="text-xs font-bold text-green-900 uppercase">Income</p>
                   <p className="text-xl md:text-2xl font-bold text-slate-900">৳{totalIncome}</p>
                </div>
                <div className="bg-red-100 p-4 rounded border border-red-300">
                   <p className="text-xs font-bold text-red-900 uppercase">Expense</p>
                   <p className="text-xl md:text-2xl font-bold text-slate-900">৳{totalExpense}</p>
                </div>
              </div>
              <div className="bg-white rounded shadow overflow-x-auto">
                 <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="p-3 text-slate-900 font-bold">Date</th>
                        <th className="p-3 text-slate-900 font-bold">Client / Name</th>
                        <th className="p-3 text-slate-900 font-bold">Description</th>
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
                          <td className={`p-3 text-right font-bold ${a.txn_type === 'Income' ? 'text-green-700' : 'text-red-700'}`}>{a.txn_type === 'Income' ? '+' : '-'} {a.amount}</td>
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

      {/* --- MODALS --- */}
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
               </div>
               <div>
                  <label className="block text-xs font-bold text-red-700 mb-1">New Date</label>
                  <input type="date" value={formData.next_date} onChange={e => setFormData({...formData, next_date: e.target.value})} className="w-full border-2 border-red-200 p-3 rounded text-slate-900 bg-white font-bold"/>
               </div>
               <div>
                  <label className="block text-xs font-bold text-red-700 mb-1">New Step</label>
                  <input value={formData.current_step} onChange={e => setFormData({...formData, current_step: e.target.value})} className="w-full border-2 border-red-200 p-3 rounded text-slate-900 bg-white font-bold"/>
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
                 <option>Judge Court</option><option>High Court</option>
               </select></div>
               
               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Case Nature / Type</label>
               <select value={formData.case_nature} onChange={e => setFormData({...formData, case_nature: e.target.value})} className="w-full border p-2 rounded text-slate-900 bg-white">
                 <option value="">-- Select Type --</option>
                 <option>Civil Suit</option><option>Criminal Case</option>
                 <option>Writ Petition</option><option>Civil Revision</option>
                 <option>Criminal Revision</option><option>Civil Appeal</option>
                 <option>Criminal Appeal</option><option>Misc Case</option>
               </select></div>

               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Court Name</label>
               <input value={formData.court_name} onChange={e => setFormData({...formData, court_name: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Case No</label>
               <input value={formData.case_no} onChange={e => setFormData({...formData, case_no: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Section</label>
               <input value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Party Name</label>
               <input value={formData.party_name} onChange={e => setFormData({...formData, party_name: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
               <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Client Mobile</label>
               <input value={formData.client_mobile} onChange={e => setFormData({...formData, client_mobile: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
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
                  <input placeholder="Client Name" value={formData.client_name} onChange={e => setFormData({...formData, client_name: e.target.value})} className="w-full border p-2 rounded text-slate-900"/>
                  <input placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-2 rounded text-slate-900"/>
                  <input type="number" placeholder="Amount" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full border p-2 rounded font-bold text-lg text-slate-900"/>
                  <button onClick={handleSaveTxn} className="w-full bg-slate-900 text-white py-3 rounded font-bold">SAVE ENTRY</button>
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
                      <p className="text-slate-700">{selectedCase.court_type} - {selectedCase.case_nature}</p>
                   </div>
                   <div>
                      <p className="text-slate-500 font-bold uppercase text-xs">Parties</p>
                      <p className="font-bold text-lg text-slate-900">{selectedCase.party_name}</p>
                   </div>
                   <div>
                      <p className="text-slate-500 font-bold uppercase text-xs">Status</p>
                      <p className="text-lg font-bold text-red-600">{selectedCase.next_date}</p>
                      <p className="text-slate-900">{selectedCase.current_step}</p>
                   </div>
                   <div className="flex items-end">
                      <button onClick={() => { fetchHistory(selectedCase.id); setModalMode('history'); }} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded text-xs font-bold">
                         <History size={16}/> VIEW HISTORY
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
                         <label className="text-xs font-bold text-slate-600">Drive Link</label>
                         <input placeholder="https://..." className="w-full p-2 border rounded text-sm text-slate-900"
                            value={newDoc.drive_link} onChange={e => setNewDoc({...newDoc, drive_link: e.target.value})}/>
                      </div>
                      <button onClick={handleSaveDoc} className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#c5a059]">ADD</button>
                   </div>
                   <div className="space-y-2">
                      {documents.map(d => (
                         <div key={d.id} className="flex justify-between items-center bg-white border p-3 rounded hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                               <Folder className="text-yellow-500" size={18}/>
                               <div><p className="font-bold text-sm text-slate-900">{d.folder_type}</p><p className="text-xs text-slate-500">{d.doc_name}</p></div>
                            </div>
                            <a href={d.drive_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 font-bold text-xs border border-blue-200 px-3 py-1 rounded hover:bg-blue-50">OPEN <ExternalLink size={12}/></a>
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ 
      email: e.target.email.value, password: e.target.password.value 
    });
    if (error) {
      alert(error.message);
      setLoading(false);
    }
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

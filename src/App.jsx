import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Scale, Gavel, DollarSign, FileText, Bell, 
  Phone, User, Calendar as CalIcon, Save, Trash2, 
  ExternalLink, MessageCircle, FolderOpen, LogOut, 
  Plus, X, Edit3, Filter, ChevronLeft, ChevronRight, 
  Eye, History, Folder, Lock, CheckCircle
} from 'lucide-react';

// --- ১. পাবলিক হোমপেজ (International Standard) ---
const PublicHome = ({ onAdminLogin, onClientLogin }) => (
  <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
    {/* Navigation */}
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#c5a059] p-2 rounded-full text-white"><Scale size={24} /></div>
          <div>
            <h1 className="text-2xl font-bold font-serif tracking-tight text-slate-900">JUSTICE & CO.</h1>
            <p className="text-[10px] tracking-widest text-gray-500 uppercase">Supreme Court Chambers</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={onClientLogin} className="px-6 py-2 rounded-full border border-gray-300 text-sm font-bold text-gray-600 hover:bg-gray-50 transition flex items-center gap-2">
            <User size={16}/> CLIENT PORTAL
          </button>
          <button onClick={onAdminLogin} className="px-6 py-2 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-[#c5a059] transition flex items-center gap-2">
            <Lock size={16}/> ADMIN ACCESS
          </button>
        </div>
      </div>
    </nav>

    {/* Hero Section */}
    <header className="flex-1 flex items-center justify-center relative overflow-hidden">
       <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]"></div>
       <div className="text-center max-w-4xl px-6 relative z-10">
         <span className="text-[#c5a059] font-bold tracking-widest text-xs uppercase mb-4 block">Est. 2025 • Dhaka, Bangladesh</span>
         <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-8 leading-tight">
           Unwavering Commitment <br/> to Justice
         </h1>
         <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
           Providing strategic legal solutions in the High Court & Judge Courts. 
           We combine deep legal knowledge with modern efficiency.
         </p>
         <div className="flex justify-center gap-6">
            <div className="flex flex-col items-center">
               <span className="text-3xl font-bold text-slate-900">500+</span>
               <span className="text-xs text-gray-400 uppercase">Cases Solved</span>
            </div>
            <div className="w-px bg-gray-300 h-12"></div>
            <div className="flex flex-col items-center">
               <span className="text-3xl font-bold text-slate-900">98%</span>
               <span className="text-xs text-gray-400 uppercase">Success Rate</span>
            </div>
         </div>
       </div>
    </header>
  </div>
);

// --- ২. মেইন অ্যাপ (লজিক ও ড্যাশবোর্ড) ---
export default function App() {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'client'
  const [view, setView] = useState('home'); // home, loginAdmin, loginClient, dashboard

  // --- ডাটা স্টেটস ---
  const [activeTab, setActiveTab] = useState('cases');
  const [refresh, setRefresh] = useState(0);
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [historyLog, setHistoryLog] = useState([]);
  
  // --- ক্যালেন্ডার স্টেট ---
  const [currentDate, setCurrentDate] = useState(new Date());

  // --- মডাল স্টেট ---
  const [modal, setModal] = useState({ type: null, data: null }); // type: addCase, viewCase, addDoc, history, addTxn

  // --- ফর্ম ডাটা ---
  const [formData, setFormData] = useState({});

  // Auth Check
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) handleAuthSuccess(session);
    });
  }, []);

  const handleAuthSuccess = async (session) => {
    setSession(session);
    // রোল চেক করা (প্রোফাইল টেবিল থেকে)
    const { data } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
    if (data) {
      setUserRole(data.role);
      setView('dashboard');
    } else {
      // যদি প্রোফাইল না থাকে তবে ডিফল্ট ক্লায়েন্ট (সেফটি)
      setUserRole('client'); 
      setView('dashboard');
    }
  };

  // ডাটা ফেচিং
  useEffect(() => {
    if (view === 'dashboard') fetchData();
  }, [view, refresh, currentDate]);

  const fetchData = async () => {
    if (!session) return;

    let caseQuery = supabase.from('cases').select('*').order('next_date', { ascending: true });
    
    // ক্লায়েন্ট হলে শুধু নিজের মামলা দেখবে
    if (userRole === 'client') {
       // মোবাইল নম্বর দিয়ে ফিল্টার (ধরি ইমেইল = mobile@lawfirm.com)
       const mobile = session.user.email.split('@')[0];
       caseQuery = caseQuery.eq('client_mobile', mobile);
    }

    const { data: cData } = await caseQuery;
    setCases(cData || []);
    setFilteredCases(cData || []); // ডিফল্ট সব শো করবে

    if (userRole === 'admin') {
      const { data: aData } = await supabase.from('accounts').select('*').order('date', { ascending: false });
      setAccounts(aData || []);
    }
  };

  const fetchDocs = async (caseId) => {
    const { data } = await supabase.from('documents').select('*').eq('case_id', caseId);
    setDocuments(data || []);
  };

  const fetchHistory = async (caseId) => {
    const { data } = await supabase.from('case_history').select('*').eq('case_id', caseId).order('recorded_at', { ascending: false });
    setHistoryLog(data || []);
  };

  // --- অ্যাকশন হ্যান্ডলার (সেভ/ডিলিট) ---
  const handleSaveCase = async () => {
    if (!formData.case_no) return alert("Case No required");
    const payload = { ...formData, client_mobile: formData.client_mobile?.trim() };
    
    const { error } = formData.id 
      ? await supabase.from('cases').update(payload).eq('id', formData.id)
      : await supabase.from('cases').insert([payload]);
    
    if (error) alert(error.message);
    else { alert("Saved Successfully"); setModal({ type: null }); setRefresh(prev => prev + 1); }
  };

  const handleSaveDoc = async () => {
    if (!formData.drive_link) return alert("Link required");
    await supabase.from('documents').insert([{ ...formData, case_id: modal.data.id }]);
    fetchDocs(modal.data.id); // রিফ্রেশ ডকস
    setFormData({ ...formData, doc_name: '', drive_link: '' }); // ফর্ম ক্লিয়ার (ফোল্ডার টাইপ বাদে)
  };

  // --- ক্যালেন্ডার নেভিগেশন ---
  const changeMonth = (dir) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + dir);
    setCurrentDate(newDate);
  };

  // --- লগিন লজিক ---
  const handleLogin = async (e, type) => {
    e.preventDefault();
    const input = e.target.email.value;
    const password = e.target.password.value;
    
    // ক্লায়েন্ট লগিন ট্রিক: মোবাইল নম্বরকে ইমেইল বানাও
    let email = input;
    if (type === 'client' && !input.includes('@')) {
      email = `${input}@lawfirm.com`;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Login Failed: " + error.message);
    else handleAuthSuccess(data.session);
  };

  // --- ভিউ কন্ট্রোল ---
  if (view === 'home') return <PublicHome onAdminLogin={() => setView('loginAdmin')} onClientLogin={() => setView('loginClient')} />;
  
  if (view === 'loginAdmin' || view === 'loginClient') return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-slate-50 mb-4 text-[#c5a059]"><User size={32}/></div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            {view === 'loginAdmin' ? 'Admin Portal' : 'Client Access'}
          </h2>
          <p className="text-gray-400 text-sm mt-2">Please enter your credentials</p>
        </div>
        <form onSubmit={(e) => handleLogin(e, view === 'loginAdmin' ? 'admin' : 'client')} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">{view === 'loginAdmin' ? 'Email' : 'Mobile Number'}</label>
            <input name="email" className="w-full p-4 bg-slate-50 border border-gray-200 rounded-lg outline-none focus:border-[#c5a059] transition" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Password</label>
            <input name="password" type="password" className="w-full p-4 bg-slate-50 border border-gray-200 rounded-lg outline-none focus:border-[#c5a059] transition" required />
          </div>
          <button className="w-full py-4 bg-slate-900 text-white rounded-lg font-bold hover:bg-[#c5a059] transition">SECURE LOGIN</button>
        </form>
        <button onClick={() => setView('home')} className="w-full text-center mt-6 text-sm text-gray-400 hover:text-slate-900">Cancel & Return</button>
      </div>
    </div>
  );

  // ================= DASHBOARD UI =================
  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-slate-800">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col z-20">
        <div className="p-8 border-b border-gray-100">
           <h2 className="font-serif font-bold text-xl tracking-tight text-slate-900">JUSTICE & CO.</h2>
           <p className="text-xs text-[#c5a059] uppercase tracking-widest mt-1">Legal Management</p>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
           <MenuBtn label="Case Diary" icon={Gavel} active={activeTab === 'cases'} onClick={() => setActiveTab('cases')} />
           <MenuBtn label="Calendar" icon={CalIcon} active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} />
           {userRole === 'admin' && <MenuBtn label="Accounts" icon={DollarSign} active={activeTab === 'accounts'} onClick={() => setActiveTab('accounts')} />}
        </nav>

        <div className="p-6 border-t border-gray-100">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><User size={20}/></div>
              <div>
                <p className="text-sm font-bold text-slate-900">{userRole === 'admin' ? 'Administrator' : 'Client'}</p>
                <p className="text-xs text-gray-400">Online</p>
              </div>
           </div>
           <button onClick={() => { supabase.auth.signOut(); setView('home'); }} className="flex items-center gap-2 text-red-400 hover:text-red-600 text-sm font-bold">
             <LogOut size={16}/> Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        
        {/* --- CASES MODULE --- */}
        {activeTab === 'cases' && (
          <div className="max-w-7xl mx-auto">
             <div className="flex justify-between items-end mb-8">
               <div>
                 <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Case Diary</h1>
                 <p className="text-gray-500">Manage all legal proceedings and records.</p>
               </div>
               {userRole === 'admin' && (
                 <button onClick={() => { setFormData({}); setModal({ type: 'addCase' }); }} className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-[#c5a059] transition flex items-center gap-2">
                   <Plus size={18}/> NEW CASE ENTRY
                 </button>
               )}
             </div>

             {/* Case Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {cases.map(c => {
                 const isNext = new Date(c.next_date) >= new Date();
                 return (
                   <div key={c.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition group cursor-pointer" 
                        onClick={() => { setModal({ type: 'viewCase', data: c }); fetchDocs(c.id); }}>
                     <div className="flex justify-between items-start mb-4">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${c.court_type === 'High Court' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
                         {c.court_type}
                       </span>
                       <span className={`text-xs font-bold ${c.status === 'Disposed' ? 'text-green-600' : 'text-gray-400'}`}>{c.status}</span>
                     </div>
                     
                     <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-[#c5a059] transition">{c.case_no}</h3>
                     <p className="text-sm text-gray-500 mb-4 line-clamp-1">{c.party_name}</p>
                     
                     <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold">Next Date</p>
                          <p className={`text-sm font-bold ${isNext ? 'text-red-500' : 'text-slate-700'}`}>{c.next_date}</p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-full text-slate-400 group-hover:bg-[#c5a059] group-hover:text-white transition">
                          <Eye size={16}/>
                        </div>
                     </div>
                   </div>
                 )
               })}
             </div>
          </div>
        )}

        {/* --- CALENDAR MODULE --- */}
        {activeTab === 'calendar' && (
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-serif font-bold text-slate-900">
                   {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                 </h2>
                 <div className="flex gap-2">
                    <button onClick={() => changeMonth(-1)} className="p-2 border rounded hover:bg-gray-50"><ChevronLeft/></button>
                    <button onClick={() => changeMonth(1)} className="p-2 border rounded hover:bg-gray-50"><ChevronRight/></button>
                 </div>
              </div>
              
              <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden flex-1">
                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="bg-slate-50 p-4 text-center font-bold text-gray-400 text-xs uppercase">{d}</div>
                 ))}
                 
                 {/* Calendar Days */}
                 {[...Array(35)].map((_, i) => {
                    // ক্যালেন্ডার লজিক (সিম্পলিফাইড)
                    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                    d.setDate(d.getDate() - d.getDay() + i);
                    const dateStr = d.toISOString().split('T')[0];
                    const dayCases = cases.filter(c => c.next_date === dateStr);
                    const isToday = dateStr === new Date().toISOString().split('T')[0];

                    return (
                       <div key={i} className={`bg-white p-2 min-h-[100px] hover:bg-blue-50 transition relative group ${d.getMonth() !== currentDate.getMonth() ? 'opacity-40' : ''}`}>
                          <span className={`text-xs font-bold p-1 rounded ${isToday ? 'bg-[#c5a059] text-white' : 'text-gray-400'}`}>
                            {d.getDate()}
                          </span>
                          <div className="mt-2 space-y-1">
                             {dayCases.map(c => (
                               <div key={c.id} className="text-[10px] bg-slate-100 p-1 rounded border-l-2 border-slate-900 truncate cursor-pointer hover:bg-slate-200"
                                    onClick={() => { setModal({ type: 'viewCase', data: c }); fetchDocs(c.id); }}>
                                  {c.case_no}
                               </div>
                             ))}
                          </div>
                       </div>
                    )
                 })}
              </div>
           </div>
        )}

        {/* --- ACCOUNTS MODULE (ADMIN ONLY) --- */}
        {activeTab === 'accounts' && userRole === 'admin' && (
           <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                 <h1 className="text-3xl font-serif font-bold text-slate-900">Financial Ledger</h1>
                 <button onClick={() => { setFormData({ txn_type: 'Income', category: 'Office', payment_status: 'Paid' }); setModal({ type: 'addTxn' }); }} 
                    className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-[#c5a059]">
                    + ADD TRANSACTION
                 </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-gray-100">
                       <tr>
                          <th className="p-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                          <th className="p-4 text-xs font-bold text-gray-500 uppercase">Description</th>
                          <th className="p-4 text-xs font-bold text-gray-500 uppercase">Client</th>
                          <th className="p-4 text-xs font-bold text-gray-500 uppercase">Type</th>
                          <th className="p-4 text-right text-xs font-bold text-gray-500 uppercase">Amount</th>
                       </tr>
                    </thead>
                    <tbody>
                       {accounts.map(a => (
                          <tr key={a.id} className="border-b border-gray-50 hover:bg-slate-50">
                             <td className="p-4 text-sm text-gray-600">{a.date}</td>
                             <td className="p-4 font-bold text-slate-800">{a.description}</td>
                             <td className="p-4 text-sm text-gray-500">{a.client_name || '-'}</td>
                             <td className="p-4"><span className={`text-xs px-2 py-1 rounded ${a.txn_type === 'Income' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{a.txn_type}</span></td>
                             <td className={`p-4 text-right font-bold ${a.txn_type === 'Income' ? 'text-green-600' : 'text-red-500'}`}>
                                {a.txn_type === 'Income' ? '+' : '-'} {a.amount}
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        )}
      </main>

      {/* ================= MODALS ================= */}
      
      {/* 1. Add Case Modal */}
      {modal.type === 'addCase' && (
         <Modal title="New Case Entry" onClose={() => setModal({ type: null })}>
            <div className="grid grid-cols-2 gap-4">
               <Input label="Court Type" type="select" options={['High Court', 'Judge Court']} value={formData.court_type} onChange={v => setFormData({...formData, court_type: v})} />
               <Input label="Court Name" placeholder="e.g. 5th Joint District Judge" value={formData.court_name} onChange={v => setFormData({...formData, court_name: v})} />
               <Input label="Case No" placeholder="e.g. 10/2025" value={formData.case_no} onChange={v => setFormData({...formData, case_no: v})} />
               <Input label="Section" placeholder="e.g. 302 Penal Code" value={formData.section} onChange={v => setFormData({...formData, section: v})} />
               <Input label="Party Name" value={formData.party_name} onChange={v => setFormData({...formData, party_name: v})} />
               <Input label="On Behalf" type="select" options={['Petitioner', 'Defendant', 'Plaintiff', 'Accused']} value={formData.on_behalf} onChange={v => setFormData({...formData, on_behalf: v})} />
               <Input label="Client Mobile" placeholder="017..." value={formData.client_mobile} onChange={v => setFormData({...formData, client_mobile: v})} />
               <Input label="Filing Date" type="date" value={formData.filing_date} onChange={v => setFormData({...formData, filing_date: v})} />
               <div className="col-span-2 bg-yellow-50 p-4 rounded border border-yellow-100 grid grid-cols-2 gap-4">
                  <Input label="Next Date" type="date" value={formData.next_date} onChange={v => setFormData({...formData, next_date: v})} />
                  <Input label="Next Step" value={formData.current_step} onChange={v => setFormData({...formData, current_step: v})} />
               </div>
               <button onClick={handleSaveCase} className="col-span-2 bg-slate-900 text-white py-3 rounded font-bold hover:bg-[#c5a059]">SAVE RECORD</button>
            </div>
         </Modal>
      )}

      {/* 2. View Case Details (With Documents & History) */}
      {modal.type === 'viewCase' && modal.data && (
         <Modal title={`Case Details: ${modal.data.case_no}`} onClose={() => setModal({ type: null })}>
            <div className="space-y-6">
               {/* Info Grid */}
               <div className="bg-slate-50 p-6 rounded-xl border border-gray-100 grid grid-cols-2 gap-6 text-sm">
                  <div><p className="text-gray-400 text-xs uppercase font-bold">Court</p><p className="font-bold text-slate-900">{modal.data.court_name}</p><p>{modal.data.court_type}</p></div>
                  <div><p className="text-gray-400 text-xs uppercase font-bold">Party</p><p className="font-bold text-slate-900">{modal.data.party_name}</p><p>For: {modal.data.on_behalf}</p></div>
                  <div><p className="text-gray-400 text-xs uppercase font-bold">Next Date</p><p className="font-bold text-red-600 text-lg">{modal.data.next_date}</p></div>
                  <div><p className="text-gray-400 text-xs uppercase font-bold">Step</p><p className="font-bold text-slate-900">{modal.data.current_step}</p></div>
               </div>

               {/* Tabs */}
               <div className="border-b flex gap-6 text-sm font-bold text-gray-400">
                  <span className="text-slate-900 border-b-2 border-slate-900 pb-2 cursor-pointer">Documents</span>
                  <span className="hover:text-slate-900 pb-2 cursor-pointer" onClick={() => { fetchHistory(modal.data.id); setModal({ type: 'history', data: modal.data }); }}>History Log</span>
                  {userRole === 'admin' && <span className="hover:text-slate-900 pb-2 cursor-pointer" onClick={() => { setFormData(modal.data); setModal({ type: 'addCase' }); }}>Edit Info</span>}
               </div>

               {/* Document List (Folder Style) */}
               <div className="min-h-[200px]">
                  {/* Add Doc Form (Admin Only) */}
                  {userRole === 'admin' && (
                     <div className="flex gap-2 mb-4 bg-blue-50 p-3 rounded items-end">
                        <div className="flex-1">
                           <label className="text-[10px] font-bold text-blue-800 uppercase">Folder Name</label>
                           <input list="folders" className="w-full p-2 text-xs border rounded" placeholder="Select or Type..." 
                              value={formData.folder_type || ''} onChange={e => setFormData({...formData, folder_type: e.target.value})} />
                           <datalist id="folders"><option value="Arji (Plaint)"/><option value="Jabab (WS)"/><option value="Orders"/><option value="Evidence"/></datalist>
                        </div>
                        <div className="flex-[2]">
                           <label className="text-[10px] font-bold text-blue-800 uppercase">Google Drive Link</label>
                           <input className="w-full p-2 text-xs border rounded" placeholder="https://..." 
                              value={formData.drive_link || ''} onChange={e => setFormData({...formData, drive_link: e.target.value})} />
                        </div>
                        <button onClick={handleSaveDoc} className="bg-blue-600 text-white p-2 rounded font-bold text-xs hover:bg-blue-700">ADD LINK</button>
                     </div>
                  )}

                  {/* Display Docs Grouped */}
                  {documents.length === 0 ? <p className="text-gray-400 text-sm italic">No documents attached.</p> : (
                     <div className="grid grid-cols-2 gap-4">
                        {/* We categorize docs simply by listing them */}
                        {documents.map(d => (
                           <a key={d.id} href={d.drive_link} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50 group">
                              <Folder className="text-yellow-500 fill-yellow-500" size={24}/>
                              <div className="overflow-hidden">
                                 <p className="font-bold text-sm text-slate-800 truncate">{d.folder_type}</p>
                                 <p className="text-xs text-blue-500 group-hover:underline truncate">Open Document</p>
                              </div>
                           </a>
                        ))}
                     </div>
                  )}
               </div>
            </div>
         </Modal>
      )}

      {/* 3. History Log Modal */}
      {modal.type === 'history' && (
         <Modal title="Case History Log" onClose={() => setModal({ type: 'viewCase', data: modal.data })}>
            <div className="space-y-4 max-h-96 overflow-y-auto pl-2">
               {historyLog.map((h, i) => (
                  <div key={i} className="relative border-l-2 border-slate-200 pl-6 pb-2">
                     <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-slate-400"></div>
                     <p className="font-bold text-slate-800">{h.prev_date}</p>
                     <p className="text-sm text-gray-500">{h.prev_step}</p>
                     <p className="text-[10px] text-gray-300 mt-1">{new Date(h.recorded_at).toLocaleDateString()}</p>
                  </div>
               ))}
            </div>
         </Modal>
      )}

      {/* 4. Add Transaction Modal */}
      {modal.type === 'addTxn' && (
         <Modal title="New Transaction" onClose={() => setModal({ type: null })}>
             <div className="space-y-4">
               <div className="flex gap-2">
                  <button onClick={() => setFormData({...formData, txn_type: 'Income'})} className={`flex-1 py-2 rounded font-bold border ${formData.txn_type === 'Income' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white'}`}>Income</button>
                  <button onClick={() => setFormData({...formData, txn_type: 'Expense'})} className={`flex-1 py-2 rounded font-bold border ${formData.txn_type === 'Expense' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white'}`}>Expense</button>
               </div>
               <Input label="Date" type="date" value={formData.date} onChange={v => setFormData({...formData, date: v})} />
               <Input label="Client Name" value={formData.client_name} onChange={v => setFormData({...formData, client_name: v})} />
               <Input label="Description" value={formData.description} onChange={v => setFormData({...formData, description: v})} />
               <Input label="Amount" type="number" value={formData.amount} onChange={v => setFormData({...formData, amount: v})} />
               <button onClick={async () => {
                  await supabase.from('accounts').insert([formData]);
                  alert("Added!"); setModal({type:null}); setRefresh(r=>r+1);
               }} className="w-full bg-slate-900 text-white py-3 rounded font-bold">SAVE</button>
             </div>
         </Modal>
      )}
    </div>
  );
}

// --- UI COMPONENTS (Milk Clean Design) ---
const MenuBtn = ({ label, icon: Icon, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${active ? 'bg-slate-900 text-white shadow-lg' : 'text-gray-500 hover:bg-slate-50 hover:text-slate-900'}`}>
    <Icon size={20} className={active ? 'text-[#c5a059]' : ''}/>
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
       <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-lg font-serif text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X size={20}/></button>
       </div>
       <div className="p-8 max-h-[80vh] overflow-y-auto">{children}</div>
    </div>
  </div>
);

const Input = ({ label, type = 'text', options, value, onChange, placeholder }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</label>
    {type === 'select' ? (
      <select className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#c5a059]" value={value || ''} onChange={e => onChange(e.target.value)}>
        <option value="">Select...</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    ) : (
      <input type={type} className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#c5a059] transition" 
        placeholder={placeholder} value={value || ''} onChange={e => onChange(e.target.value)} />
    )}
  </div>
);

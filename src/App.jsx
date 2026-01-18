import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Scale, Gavel, DollarSign, Bell, 
  Calendar as CalIcon, Save, Trash2, 
  ExternalLink, MessageCircle, FolderOpen, LogOut, 
  Plus, X, Edit3, Filter, ChevronLeft, ChevronRight, 
  Eye, History, User, Lock, Folder
} from 'lucide-react';

// --- ১. পাবলিক হোমপেজ ---
const PublicHome = ({ onLoginClick }) => (
  <div className="font-sans text-slate-800 bg-white">
    <nav className="fixed w-full bg-slate-900 text-white z-50 px-6 py-4 shadow-lg flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Scale className="text-[#c5a059] h-8 w-8" />
        <div><h1 className="text-2xl font-bold font-serif">JUSTICE & CO.</h1></div>
      </div>
      <div className="flex gap-4">
        {/* ক্লায়েন্ট ও এডমিন উভয়ের জন্য একই লগিন পোর্টাল, সিস্টেম অটোমেটিক চিনবে */}
        <button onClick={onLoginClick} className="bg-[#c5a059] text-slate-900 px-6 py-2 rounded-sm font-bold hover:bg-white transition flex items-center gap-2">
           <User size={18}/> MEMBER LOGIN
        </button>
      </div>
    </nav>
    <header className="h-screen flex items-center justify-center bg-slate-900 text-white pt-20 relative">
       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73')] bg-cover opacity-20"></div>
       <div className="relative z-10 text-center max-w-4xl px-4">
         <h1 className="text-6xl font-serif font-bold mb-6">Supreme Court Advocates</h1>
         <p className="text-xl text-gray-300 mb-8">Excellence in Legal Representation across Bangladesh.</p>
       </div>
    </header>
  </div>
);

// --- ২. ক্লায়েন্ট ড্যাশবোর্ড (শুধুমাত্র রিড-অনলি) ---
const ClientDashboard = ({ session, onLogout }) => {
  const [myCases, setMyCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      // ১. ইউজারের প্রোফাইল থেকে মোবাইল নম্বর বের করা
      const { data: profile } = await supabase.from('profiles').select('mobile_no').eq('id', session.user.id).single();
      
      if (profile && profile.mobile_no) {
        // ২. সেই মোবাইল নম্বরের সাথে মিল থাকা মামলাগুলো আনা
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

      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">My Ongoing Cases</h2>
        {loading && <p>Loading records...</p>}
        {!loading && myCases.length === 0 && <p className="text-gray-500">No cases found linked to your mobile number.</p>}
        
        <div className="grid gap-6">
          {myCases.map(c => (
            <div key={c.id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#c5a059]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">{c.court_type}</span>
                  <h3 className="text-2xl font-bold text-slate-800 mt-2">{c.case_no}</h3>
                  <p className="text-lg text-slate-600">{c.party_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase font-bold">Next Date</p>
                  <p className="text-2xl font-bold text-red-600">{c.next_date}</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded border">
                <p className="text-sm font-bold text-gray-500">Latest Status / Step:</p>
                <p className="text-lg font-bold text-[#c5a059]">{c.current_step}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// --- ৩. এডমিন ড্যাশবোর্ড ---
const AdminDashboard = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refresh, setRefresh] = useState(0);

  // ডাটা স্টেটস
  const [cases, setCases] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [historyLog, setHistoryLog] = useState([]);
  const [documents, setDocuments] = useState([]); // ডকুমেন্টস লিস্ট
  const [caseFilter, setCaseFilter] = useState('week');
  const [accountFilter, setAccountFilter] = useState({ client: '', month: '', type: 'All' });
  
  // ক্যালেন্ডার স্টেট
  const [calendarDate, setCalendarDate] = useState(new Date()); // বর্তমান মাস দেখার জন্য
  const [selectedDateCases, setSelectedDateCases] = useState(null);

  // মোডাল স্টেটস
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

  // --- লজিক: ক্যালেন্ডার নেভিগেশন ---
  const changeMonth = (offset) => {
    const newDate = new Date(calendarDate.setMonth(calendarDate.getMonth() + offset));
    setCalendarDate(new Date(newDate));
  };

  // --- লজিক: কেস ফিল্টারিং ---
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

  // --- অ্যাকশন হ্যান্ডলার ---
  const handleSaveCase = async () => {
    const { error } = formData.id 
      ? await supabase.from('cases').update(formData).eq('id', formData.id)
      : await supabase.from('cases').insert([formData]);
    if(error) alert(error.message);
    else { alert("Saved!"); setModalMode(null); setRefresh(r => r+1); }
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

  // --- একাউন্টস ক্যালকুলেশন ---
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
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      
      {/* সাইডবার */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 text-2xl font-bold font-serif text-[#c5a059] border-b border-slate-800 tracking-wider">CHAMBERS</div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'dashboard' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <Gavel size={20}/> Case Dashboard
          </button>
          <button onClick={() => setActiveTab('calendar')} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'calendar' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <CalIcon size={20}/> Calendar
          </button>
          <button onClick={() => setActiveTab('accounts')} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'accounts' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <DollarSign size={20}/> Accounts & Ledger
          </button>
        </nav>
        <button onClick={onLogout} className="m-4 p-3 flex items-center gap-2 text-red-400 hover:bg-slate-800 rounded">
          <LogOut size={20}/> Logout
        </button>
      </aside>

      {/* মেইন এরিয়া */}
      <main className="flex-1 overflow-y-auto relative p-6">
        
        {/* --- মডিউল ১: কেস ড্যাশবোর্ড --- */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-slate-800">Case Dashboard</h2>
              <button onClick={() => { setFormData({}); setModalMode('addCase'); }} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded shadow hover:bg-[#c5a059] font-bold">
                <Plus size={18}/> NEW CASE
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {[
                {id: 'week', label: 'This Week'}, {id: 'today', label: 'Today'}, {id: 'tomorrow', label: 'Tomorrow'}, 
                {id: 'all', label: 'All Cases'}, {id: 'update', label: 'Needs Update'}, {id: 'disposed', label: 'Disposed'}
              ].map(f => (
                <button key={f.id} onClick={() => setCaseFilter(f.id)} 
                  className={`px-4 py-2 rounded-full text-sm font-bold border transition ${caseFilter === f.id ? 'bg-[#c5a059] text-slate-900 border-[#c5a059]' : 'bg-white text-gray-500 border-gray-300'}`}>
                  {f.label}
                </button>
              ))}
            </div>

            <div className="grid gap-4">
              {getFilteredCases().length === 0 && <p className="text-gray-400 italic">No cases found in this filter.</p>}
              {getFilteredCases().map(c => (
                <div key={c.id} className="bg-white p-5 rounded-lg shadow border-l-4 border-slate-900 flex justify-between items-center hover:bg-slate-50 transition">
                  <div>
                    <div className="flex gap-2 mb-1">
                      <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 rounded">{c.court_type}</span>
                      <span className="text-xs font-bold bg-gray-200 text-gray-700 px-2 rounded">{c.court_name}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">{c.case_no}</h3>
                    <p className="text-slate-600 font-medium">{c.party_name}</p>
                    <p className="text-xs text-gray-400">Section: {c.section}</p>
                  </div>
                  
                  <div className="text-right mr-6">
                    <p className="text-xs text-gray-500">Next Date</p>
                    <p className="text-lg font-bold text-red-600">{c.next_date}</p>
                    <p className="text-xs font-bold text-[#c5a059] uppercase">{c.current_step}</p>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedCase(c); setModalMode('viewCase'); }} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-200" title="View Details & Docs">
                      <Eye size={18}/>
                    </button>
                    <button onClick={() => { setFormData(c); setModalMode('addCase'); }} className="p-2 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-200" title="Edit">
                      <Edit3 size={18}/>
                    </button>
                    <button onClick={() => handleDeleteCase(c.id)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-200" title="Delete">
                      <Trash2 size={18}/>
                    </button>
                    <button onClick={() => window.open(`https://wa.me/${c.client_mobile}`, '_blank')} className="p-2 bg-green-50 text-green-600 rounded hover:bg-green-200">
                      <MessageCircle size={18}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- মডিউল ২: ক্যালেন্ডার --- */}
        {activeTab === 'calendar' && (
          <div className="bg-white p-6 rounded shadow h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-2xl font-bold">Monthly Schedule</h2>
               <div className="flex items-center gap-4 bg-slate-100 p-2 rounded">
                 <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-200 rounded"><ChevronLeft/></button>
                 <span className="font-bold text-lg w-32 text-center">
                   {calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                 </span>
                 <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-200 rounded"><ChevronRight/></button>
               </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 font-bold text-center bg-slate-100 p-2 rounded mb-2">
               <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-1 flex-1">
               {[...Array(35)].map((_, i) => {
                 // ক্যালেন্ডার লজিক (Current Month based)
                 const year = calendarDate.getFullYear();
                 const month = calendarDate.getMonth();
                 const firstDay = new Date(year, month, 1).getDay();
                 const d = new Date(year, month, 1 + i - firstDay);
                 
                 const dateStr = d.toISOString().split('T')[0];
                 const isCurrentMonth = d.getMonth() === month;
                 const hasCase = cases.filter(c => c.next_date === dateStr);
                 
                 return (
                   <div key={i} onClick={() => isCurrentMonth && setSelectedDateCases(hasCase)} 
                     className={`border p-2 h-24 rounded cursor-pointer transition 
                     ${!isCurrentMonth ? 'bg-gray-50 opacity-50' : hasCase.length > 0 ? 'bg-red-50 border-red-200 hover:bg-red-100' : 'bg-white hover:bg-blue-50'}`}>
                     <div className="flex justify-between">
                       <span className={`text-xs font-bold ${isCurrentMonth ? 'text-gray-600' : 'text-gray-300'}`}>{d.getDate()}</span>
                       {isCurrentMonth && hasCase.length > 0 && <span className="text-xs bg-red-600 text-white px-1 rounded-full">{hasCase.length}</span>}
                     </div>
                     <div className="mt-1 overflow-hidden h-14">
                       {isCurrentMonth && hasCase.map(c => <div key={c.id} className="text-[10px] truncate text-slate-800">• {c.case_no}</div>)}
                     </div>
                   </div>
                 )
               })}
            </div>
            
            {/* Selected Date List */}
            {selectedDateCases && (
               <div className="mt-4 border-t pt-4">
                 <h3 className="font-bold text-lg mb-2">Cases on Selected Date:</h3>
                 {selectedDateCases.length === 0 ? <p>No cases.</p> : 
                   selectedDateCases.map(c => (
                     <div key={c.id} className="flex gap-4 items-center bg-slate-50 p-2 mb-2 rounded border">
                       <span className="font-bold">{c.case_no}</span>
                       <span>{c.party_name}</span>
                       <span className="text-[#c5a059] font-bold">{c.current_step}</span>
                     </div>
                   ))
                 }
               </div>
            )}
          </div>
        )}

        {/* --- মডিউল ৩: একাউন্টস --- */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-800">Accounts & Ledger</h2>
              <button onClick={() => { setFormData({txn_type: 'Income', category: 'Office', payment_status: 'Paid'}); setModalMode('addTxn'); }} className="bg-slate-900 text-white px-6 py-2 rounded font-bold hover:bg-[#c5a059]">
                 + ADD TRANSACTION
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-green-100 p-4 rounded border border-green-300">
                 <p className="text-xs font-bold text-green-800 uppercase">Total Income (Paid)</p>
                 <p className="text-2xl font-bold text-slate-800">৳{totalIncome - totalDueIncome}</p>
              </div>
              <div className="bg-red-100 p-4 rounded border border-red-300">
                 <p className="text-xs font-bold text-red-800 uppercase">Total Expense (Paid)</p>
                 <p className="text-2xl font-bold text-slate-800">৳{totalExpense - totalDueExpense}</p>
              </div>
              <div className="bg-slate-800 text-white p-4 rounded">
                 <p className="text-xs font-bold text-[#c5a059] uppercase">Cash In Hand</p>
                 <p className="text-2xl font-bold">৳{(totalIncome - totalDueIncome) - (totalExpense - totalDueExpense)}</p>
              </div>
              <div className="bg-orange-100 p-4 rounded border border-orange-300">
                 <p className="text-xs font-bold text-orange-800 uppercase">Dues (Pending)</p>
                 <p className="text-sm font-bold">Receive: ৳{totalDueIncome}</p>
                 <p className="text-sm font-bold">Pay: ৳{totalDueExpense}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow flex gap-4 items-center">
               <Filter size={18} className="text-gray-400"/>
               <input placeholder="Filter by Client Name (e.g. Rahim)" className="border p-2 rounded flex-1" 
                  onChange={e => setAccountFilter({...accountFilter, client: e.target.value})} />
               <input type="month" className="border p-2 rounded" 
                  onChange={e => setAccountFilter({...accountFilter, month: e.target.value})} />
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="p-3">Date</th>
                      <th className="p-3">Client / Name</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Amount</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAccounts.map(a => (
                      <tr key={a.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-sm">{a.date}</td>
                        <td className="p-3 font-bold text-slate-700">{a.client_name || '-'}</td>
                        <td className="p-3 text-sm">{a.description}</td>
                        <td className="p-3"><span className="bg-slate-100 px-2 py-1 rounded text-xs">{a.category}</span></td>
                        <td className="p-3">
                           <span className={`px-2 py-1 rounded text-xs font-bold ${a.payment_status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {a.payment_status}
                           </span>
                        </td>
                        <td className={`p-3 text-right font-bold ${a.txn_type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                           {a.txn_type === 'Income' ? '+' : '-'} {a.amount}
                        </td>
                        <td className="p-3 flex justify-center gap-2">
                           <button onClick={() => { setFormData(a); setModalMode('addTxn'); }} className="text-blue-500 hover:bg-blue-50 p-1 rounded"><Edit3 size={16}/></button>
                           <button onClick={() => handleDeleteTxn(a.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={16}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODALS (POP-UPS) ================= */}

      {/* 1. Add/Edit Case Modal */}
      {modalMode === 'addCase' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-slate-900 p-4 text-white flex justify-between">
              <h3 className="font-bold flex items-center gap-2"><Gavel/> {formData.id ? 'Edit Case' : 'New Case Entry'}</h3>
              <button onClick={() => setModalMode(null)}><X/></button>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-4">
               {/* Fields */}
               <div className="space-y-1"><label className="text-xs font-bold text-gray-500">Court Type</label>
               <select value={formData.court_type} onChange={e => setFormData({...formData, court_type: e.target.value})} className="w-full border p-2 rounded">
                 <option>High Court</option><option>Judge Court</option>
               </select></div>
               <div className="space-y-1"><label className="text-xs font-bold text-gray-500">Court Name</label>
               <input placeholder="e.g. 5th Joint District Judge" value={formData.court_name} onChange={e => setFormData({...formData, court_name: e.target.value})} className="w-full border p-2 rounded"/></div>
               
               <div className="space-y-1"><label className="text-xs font-bold text-gray-500">Case No</label>
               <input value={formData.case_no} onChange={e => setFormData({...formData, case_no: e.target.value})} className="w-full border p-2 rounded"/></div>
               <div className="space-y-1"><label className="text-xs font-bold text-gray-500">Section</label>
               <input value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} className="w-full border p-2 rounded"/></div>

               <div className="space-y-1"><label className="text-xs font-bold text-gray-500">Party Name</label>
               <input value={formData.party_name} onChange={e => setFormData({...formData, party_name: e.target.value})} className="w-full border p-2 rounded"/></div>
               <div className="space-y-1"><label className="text-xs font-bold text-gray-500">On Behalf</label>
               <select value={formData.on_behalf} onChange={e => setFormData({...formData, on_behalf: e.target.value})} className="w-full border p-2 rounded">
                 <option>Petitioner</option><option>Defendant</option><option>Plaintiff</option><option>Accused</option>
               </select></div>

               <div className="space-y-1"><label className="text-xs font-bold text-gray-500">Client Mobile (For Client Access)</label>
               <input placeholder="017xxxxxxxx" value={formData.client_mobile} onChange={e => setFormData({...formData, client_mobile: e.target.value})} className="w-full border p-2 rounded"/></div>
               <div className="space-y-1"><label className="text-xs font-bold text-gray-500">Status</label>
               <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border p-2 rounded">
                 <option>Ongoing</option><option>Disposed</option>
               </select></div>

               <div className="col-span-2 grid grid-cols-2 gap-4 bg-yellow-50 p-4 rounded border border-yellow-200">
                  <div className="space-y-1"><label className="text-xs font-bold text-red-600">Next Date</label>
                  <input type="date" value={formData.next_date} onChange={e => setFormData({...formData, next_date: e.target.value})} className="w-full border p-2 rounded bg-white"/></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-red-600">Next Step</label>
                  <input value={formData.current_step} onChange={e => setFormData({...formData, current_step: e.target.value})} className="w-full border p-2 rounded bg-white"/></div>
               </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-3">
               <button onClick={() => setModalMode(null)} className="px-4 py-2 border rounded">Cancel</button>
               <button onClick={handleSaveCase} className="px-6 py-2 bg-slate-900 text-white rounded font-bold">SAVE</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. View Details Modal with Documents & History */}
      {modalMode === 'viewCase' && selectedCase && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
             <div className="bg-slate-900 p-4 text-white flex justify-between">
                <h3 className="font-bold flex items-center gap-2">Case Record: {selectedCase.case_no}</h3>
                <button onClick={() => setModalMode(null)}><X/></button>
             </div>
             
             <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-6 text-sm bg-slate-50 p-4 rounded border">
                   <div>
                      <p className="text-gray-500 font-bold uppercase text-xs">Court Info</p>
                      <p className="font-bold text-lg">{selectedCase.court_name}</p>
                      <p>{selectedCase.court_type}</p>
                   </div>
                   <div>
                      <p className="text-gray-500 font-bold uppercase text-xs">Parties</p>
                      <p className="font-bold text-lg">{selectedCase.party_name}</p>
                      <p>For: {selectedCase.on_behalf}</p>
                   </div>
                   <div>
                      <p className="text-gray-500 font-bold uppercase text-xs">Status</p>
                      <p className="text-lg font-bold text-red-600">{selectedCase.next_date}</p>
                      <p>{selectedCase.current_step}</p>
                   </div>
                   <div className="flex items-end">
                      <button onClick={() => { fetchHistory(selectedCase.id); setModalMode('history'); }} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded text-xs font-bold">
                         <History size={16}/> VIEW DATE HISTORY
                      </button>
                   </div>
                </div>

                {/* --- DIGITAL ARCHIVE SECTION --- */}
                <div>
                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h4 className="font-bold text-lg flex items-center gap-2"><FolderOpen className="text-[#c5a059]"/> Digital Archive</h4>
                    <button onClick={() => fetchDocuments(selectedCase.id)} className="text-xs underline">Refresh</button>
                  </div>
                  
                  {/* Add New Doc Form */}
                  <div className="bg-blue-50 p-4 rounded flex gap-2 items-end mb-4 border border-blue-200">
                     <div className="flex-1 space-y-1">
                        <label className="text-xs font-bold text-slate-500">Folder</label>
                        <select className="w-full p-2 border rounded text-sm" 
                           onChange={e => setNewDoc({...newDoc, folder_type: e.target.value})}>
                           <option>Plaint (Arji)</option><option>Written Statement (Jabab)</option>
                           <option>Complaint (Nalishi)</option><option>Judgment</option><option>Misc</option>
                        </select>
                     </div>
                     <div className="flex-1 space-y-1">
                        <label className="text-xs font-bold text-slate-500">Doc Name</label>
                        <input placeholder="e.g. Certified Copy" className="w-full p-2 border rounded text-sm"
                           value={newDoc.doc_name} onChange={e => setNewDoc({...newDoc, doc_name: e.target.value})}/>
                     </div>
                     <div className="flex-[2] space-y-1">
                        <label className="text-xs font-bold text-slate-500">Google Drive Link</label>
                        <input placeholder="https://drive.google.com/..." className="w-full p-2 border rounded text-sm"
                           value={newDoc.drive_link} onChange={e => setNewDoc({...newDoc, drive_link: e.target.value})}/>
                     </div>
                     <button onClick={handleSaveDoc} className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#c5a059]">ADD</button>
                  </div>

                  {/* Documents List */}
                  <div className="space-y-2">
                     {documents.length === 0 && <p className="text-gray-400 text-sm italic">No documents linked yet.</p>}
                     {documents.map(d => (
                        <div key={d.id} className="flex justify-between items-center bg-white border p-3 rounded hover:bg-gray-50">
                           <div className="flex items-center gap-3">
                              <Folder className="text-yellow-500" size={18}/>
                              <div>
                                 <p className="font-bold text-sm text-slate-800">{d.folder_type}</p>
                                 <p className="text-xs text-gray-500">{d.doc_name}</p>
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

      {/* 3. History Modal */}
      {modalMode === 'history' && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
               <div className="bg-slate-900 p-4 text-white flex justify-between">
                  <h3 className="font-bold">History Log</h3>
                  <button onClick={() => setModalMode('viewCase')}><ChevronLeft/></button>
               </div>
               <div className="p-4 h-96 overflow-y-auto">
                  {historyLog.length === 0 && <p>No history recorded yet.</p>}
                  {historyLog.map((h, i) => (
                     <div key={i} className="flex gap-4 border-l-2 border-slate-300 pl-4 pb-6 relative">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-300 rounded-full"></div>
                        <div>
                           <p className="font-bold text-slate-800">{h.prev_date}</p>
                           <p className="text-sm text-gray-600">{h.prev_step}</p>
                           <p className="text-xs text-gray-400 mt-1">Recorded: {new Date(h.recorded_at).toLocaleDateString()}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      )}

      {/* 4. Add/Edit Transaction Modal */}
      {modalMode === 'addTxn' && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl">
               <div className="bg-slate-900 p-4 text-white flex justify-between">
                  <h3 className="font-bold">{formData.id ? 'Edit Transaction' : 'New Transaction'}</h3>
                  <button onClick={() => setModalMode(null)}><X/></button>
               </div>
               <div className="p-6 space-y-4">
                  <div className="flex gap-2">
                     <button onClick={() => setFormData({...formData, txn_type: 'Income'})} className={`flex-1 py-2 rounded font-bold ${formData.txn_type === 'Income' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>Income</button>
                     <button onClick={() => setFormData({...formData, txn_type: 'Expense'})} className={`flex-1 py-2 rounded font-bold ${formData.txn_type === 'Expense' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>Expense</button>
                  </div>
                  <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border p-2 rounded"/>
                  <input placeholder="Client Name (e.g. Rahim)" value={formData.client_name} onChange={e => setFormData({...formData, client_name: e.target.value})} className="w-full border p-2 rounded"/>
                  <input placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-2 rounded"/>
                  <div className="flex gap-2">
                     <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-1/2 border p-2 rounded">
                        <option>Office</option><option>Personal</option><option>Client</option>
                     </select>
                     <select value={formData.payment_status} onChange={e => setFormData({...formData, payment_status: e.target.value})} className="w-1/2 border p-2 rounded">
                        <option>Paid</option><option>Due</option>
                     </select>
                  </div>
                  <input type="number" placeholder="Amount" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full border p-2 rounded font-bold text-lg"/>
                  <button onClick={handleSaveTxn} className="w-full bg-slate-900 text-white py-3 rounded font-bold">SAVE ENTRY</button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
};

// --- মেইন অ্যাপ কন্ট্রোলার (লগিন ও রাউটিং হ্যান্ডলার) ---
export default function App() {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'client'
  const [view, setView] = useState('home');

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

  // ইউজার রোল চেক ফাংশন
  const checkRole = async (uid) => {
    const { data } = await supabase.from('profiles').select('role').eq('id', uid).single();
    if(data) {
      setUserRole(data.role);
      setView('dashboard');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ 
      email: e.target.email.value, password: e.target.password.value 
    });
    if (error) alert(error.message);
  };

  // --- ভিউ কন্ট্রোল ---
  if (view === 'home') return <PublicHome onLoginClick={() => setView('login')} />;
  
  if (view === 'login') return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-2xl w-full max-w-md border-t-8 border-[#c5a059]">
        <div className="text-center mb-6">
           <Lock className="mx-auto h-12 w-12 text-[#c5a059] mb-2"/>
           <h2 className="text-2xl font-bold">Secure Portal</h2>
           <p className="text-gray-500 text-sm">Client & Admin Access</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input name="email" type="email" placeholder="Email Address" className="w-full p-3 border rounded" required />
          <input name="password" type="password" placeholder="Password" className="w-full p-3 border rounded" required />
          <button type="submit" className="w-full bg-slate-900 text-white py-3 font-bold hover:bg-[#c5a059]">AUTHENTICATE</button>
        </form>
        <button onClick={() => setView('home')} className="w-full text-center mt-4 text-sm text-gray-500 hover:text-[#c5a059]">Return to Home</button>
      </div>
    </div>
  );

  // রোল অনুযায়ী ড্যাশবোর্ড
  if (userRole === 'client') return <ClientDashboard session={session} onLogout={() => supabase.auth.signOut()} />;
  
  // ডিফল্টভাবে এডমিন ড্যাশবোর্ড
  return <AdminDashboard session={session} onLogout={() => supabase.auth.signOut()} />;
}

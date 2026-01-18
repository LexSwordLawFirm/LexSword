import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Scale, Gavel, DollarSign, FileText, Bell, Phone, User, 
  Calendar as CalIcon, Save, Trash2, ExternalLink, MessageCircle, 
  FolderOpen, LogOut, Plus, X, Edit3, Filter, ChevronLeft, ChevronRight, 
  Clock, CheckCircle, AlertCircle, Search, Menu
} from 'lucide-react';

// --- ১. ইন্টারন্যাশনাল স্ট্যান্ডার্ড পাবলিক হোমপেজ (গ্রে-স্কেল লুক) ---
const PublicHome = ({ onLoginClick }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <div className="font-sans text-slate-800 bg-white selection:bg-gray-200">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-sm"><Scale className="text-white h-6 w-6" /></div>
            <div>
              <h1 className="text-xl font-bold tracking-widest font-serif text-black">CHAMBERS OF LAW</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Supreme Court Bangladesh</p>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-gray-600">
            <a href="#home" className="hover:text-black transition">HOME</a>
            <a href="#about" className="hover:text-black transition">THE FIRM</a>
            <a href="#practice" className="hover:text-black transition">PRACTICE AREAS</a>
            <a href="#contact" className="hover:text-black transition">CONTACT</a>
          </div>
          <button onClick={onLoginClick} className="bg-black text-white px-6 py-2 text-xs font-bold tracking-widest hover:bg-gray-800 transition uppercase">
            Client Portal
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="h-screen flex items-center bg-[#f8f9fa] pt-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-500 uppercase tracking-widest mb-4 text-sm">Est. 2025 • Dhaka</p>
            <h1 className="text-6xl font-serif font-medium leading-tight mb-8 text-black">
              Defending Rights,<br/>Defining Justice.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
              A premier law firm providing strategic legal solutions in the High Court and Judge Courts. We are committed to integrity and excellence.
            </p>
            <div className="flex gap-4">
              <button className="bg-black text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-gray-800 uppercase">Book Consultation</button>
              <button className="border border-black px-8 py-4 text-sm font-bold tracking-widest hover:bg-black hover:text-white transition uppercase">Our Team</button>
            </div>
          </div>
          <div className="hidden md:block h-[500px] bg-gray-200 grayscale bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80')] bg-cover"></div>
        </div>
      </header>

      {/* Practice Areas */}
      <section id="practice" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-8">
            <h2 className="text-4xl font-serif text-black">Practice Areas</h2>
            <a href="#" className="text-sm font-bold underline decoration-1 underline-offset-4">VIEW ALL</a>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Criminal Defense", desc: "Expert representation in trials, bail hearings, and appeals." },
              { title: "Civil Litigation", desc: "Resolving property disputes, contracts, and family matters." },
              { title: "Corporate Law", desc: "Advising businesses on compliance, mergers, and liability." }
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="h-0.5 w-12 bg-gray-300 mb-6 group-hover:bg-black transition-all group-hover:w-full duration-500"></div>
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-sm text-gray-400">
          <div className="col-span-2">
            <h3 className="text-xl font-serif text-white mb-6">CHAMBERS OF LAW</h3>
            <p className="max-w-xs">Supreme Court Bar Association Building, Dhaka-1000.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Contact</h4>
            <p>+880 1711 000 000</p>
            <p>info@lawfirm.com</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Links</h4>
            <p>Careers</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- ২. ড্যাশবোর্ড (এডমিন এবং ক্লায়েন্ট লজিক) ---
const Dashboard = ({ session, onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [refresh, setRefresh] = useState(0);

  // ডাটা স্টেটস
  const [cases, setCases] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [caseHistory, setCaseHistory] = useState([]);

  // ফিল্টার স্টেটস
  const [caseFilter, setCaseFilter] = useState('Week'); // Week, Today, Tomorrow, Disposed, Update
  const [accFilter, setAccFilter] = useState('Month'); // Month, Custom, Search
  const [selectedClientLedger, setSelectedClientLedger] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // মডাল স্টেটস
  const [modal, setModal] = useState({ type: null, data: null }); // type: 'addCase', 'details', 'history', 'docs', 'editCase'

  // লোডিং
  useEffect(() => {
    checkUserRole();
  }, [session]);

  useEffect(() => {
    if (profile) {
      fetchCases();
      if (profile.role === 'admin') fetchAccounts();
    }
  }, [profile, refresh, caseFilter, accFilter, dateRange, selectedClientLedger]);

  // ১. ইউজার রোল চেক
  const checkUserRole = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
    if (data) setProfile(data);
    else {
      // যদি প্রোফাইল না থাকে (প্রথমবার), তবে এডমিন হিসেবে সেট করি (আপনার সুবিধার জন্য)
      const newProfile = { id: session.user.id, role: 'admin', full_name: 'Admin', mobile_no: session.user.email };
      await supabase.from('profiles').insert([newProfile]);
      setProfile(newProfile);
    }
  };

  // ২. ডাটা ফেচিং (ফিল্টার সহ)
  const fetchCases = async () => {
    let query = supabase.from('cases').select('*').order('next_date', { ascending: true });

    // ক্লায়েন্ট হলে শুধু নিজের মামলা দেখবে
    if (profile?.role === 'client') {
      // আমরা ধরে নিচ্ছি ক্লায়েন্টের মোবাইল নম্বর দিয়ে ম্যাচ হবে
      query = query.eq('client_mobile', profile.mobile_no);
    } else {
      // এডমিন ফিল্টার
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
      const nextWeek = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];

      if (caseFilter === 'Today') query = query.eq('next_date', today);
      else if (caseFilter === 'Tomorrow') query = query.eq('next_date', tomorrow);
      else if (caseFilter === 'Week') query = query.gte('next_date', today).lte('next_date', nextWeek);
      else if (caseFilter === 'Disposed') query = query.eq('status', 'Disposed');
      else if (caseFilter === 'Update') query = query.lt('next_date', today).eq('status', 'Ongoing');
    }
    
    const { data } = await query;
    setCases(data || []);
  };

  const fetchAccounts = async () => {
    let query = supabase.from('accounts').select('*').order('date', { ascending: false });
    
    if (selectedClientLedger) {
      query = query.ilike('client_name', `%${selectedClientLedger}%`);
    }

    if (accFilter === 'Custom' && dateRange.start && dateRange.end) {
      query = query.gte('date', dateRange.start).lte('date', dateRange.end);
    } else if (accFilter === 'Month') {
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
      query = query.gte('date', startOfMonth);
    }

    const { data } = await query;
    setAccounts(data || []);
  };

  // ৩. অ্যাকশন হ্যান্ডলার (এডমিন)
  const handleSaveCase = async (formData) => {
    const { error } = await supabase.from('cases').insert([formData]);
    if (!error) { alert("Case Added!"); setModal({ type: null }); setRefresh(p=>p+1); }
  };

  const handleUpdateCase = async (id, updates, oldData) => {
    // যদি ডেট বা স্টেপ চেঞ্জ হয়, হিস্ট্রি সেভ হবে
    if (oldData && (updates.next_date !== oldData.next_date || updates.current_step !== oldData.current_step)) {
      await supabase.from('case_history').insert({
        case_id: id, prev_date: oldData.next_date, prev_step: oldData.current_step
      });
    }
    await supabase.from('cases').update(updates).eq('id', id);
    alert("Updated Successfully");
    setModal({ type: null });
    setRefresh(p=>p+1);
  };

  const handleDeleteCase = async (id) => {
    if(confirm("Are you sure? This will delete all history and docs.")) {
      await supabase.from('cases').delete().eq('id', id);
      setModal({ type: null });
      setRefresh(p=>p+1);
    }
  };

  const handleAccountEntry = async (formData) => {
    await supabase.from('accounts').insert([formData]);
    alert("Entry Saved");
    setRefresh(p=>p+1);
  };

  // --- ক্যালকুলেশন ---
  const totalIncome = accounts.filter(a => a.txn_type === 'Income').reduce((s, a) => s + Number(a.amount), 0);
  const totalExpense = accounts.filter(a => a.txn_type === 'Expense').reduce((s, a) => s + Number(a.amount), 0);
  const totalDueReceive = accounts.filter(a => a.txn_type === 'Due_Receive' && !a.is_paid).reduce((s, a) => s + Number(a.amount), 0);

  // --- UI কম্পোনেন্টস ---
  
  // ১. সাইডবার
  const Sidebar = () => (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-serif tracking-widest">CHAMBERS</h2>
        <p className="text-xs text-gray-500 mt-1 uppercase">{profile?.role === 'admin' ? 'Admin Portal' : 'Client View'}</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 p-3 rounded ${activeTab === 'dashboard' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:bg-gray-800'}`}>
          <Gavel size={18}/> Case Diary
        </button>
        
        {profile?.role === 'admin' && (
          <>
            <button onClick={() => setActiveTab('calendar')} className={`w-full flex items-center gap-3 p-3 rounded ${activeTab === 'calendar' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:bg-gray-800'}`}>
              <CalIcon size={18}/> Calendar
            </button>
            <button onClick={() => setActiveTab('accounts')} className={`w-full flex items-center gap-3 p-3 rounded ${activeTab === 'accounts' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:bg-gray-800'}`}>
              <DollarSign size={18}/> Accounts & Due
            </button>
          </>
        )}
      </nav>
      <button onClick={onLogout} className="m-4 p-3 bg-red-900/30 text-red-400 flex items-center justify-center gap-2 rounded hover:bg-red-900/50">
        <LogOut size={18}/> Sign Out
      </button>
    </aside>
  );

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        
        {/* টপ হেডার */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-slate-800">
            {activeTab === 'dashboard' ? 'Case Management' : activeTab === 'accounts' ? 'Finance & Ledger' : 'Schedule'}
          </h1>
          {profile?.role === 'admin' && activeTab === 'dashboard' && (
            <button onClick={() => setModal({ type: 'addCase' })} className="bg-black text-white px-6 py-3 rounded-sm font-bold flex items-center gap-2 shadow-lg hover:bg-gray-800">
              <Plus size={18}/> NEW CASE ENTRY
            </button>
          )}
        </div>

        {/* --- মডিউল ১: ড্যাশবোর্ড (কেস) --- */}
        {activeTab === 'dashboard' && (
          <div>
            {/* ফিল্টার বার */}
            {profile?.role === 'admin' && (
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['Week', 'Today', 'Tomorrow', 'Update', 'Disposed', 'All'].map(f => (
                  <button key={f} onClick={() => setCaseFilter(f)} 
                    className={`px-4 py-2 rounded-full text-sm font-bold border ${caseFilter === f ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200'}`}>
                    {f}
                  </button>
                ))}
              </div>
            )}

            {/* কেস কার্ড গ্রিড */}
            <div className="grid grid-cols-1 gap-4">
              {cases.length === 0 && <div className="text-center py-20 text-gray-400">No cases found in this filter.</div>}
              {cases.map(c => {
                const isLate = new Date(c.next_date) < new Date() && c.status === 'Ongoing';
                return (
                  <div key={c.id} onClick={() => setModal({ type: 'details', data: c })} 
                    className={`bg-white p-5 rounded-lg border-l-4 shadow-sm hover:shadow-md transition cursor-pointer flex justify-between items-center ${isLate ? 'border-red-500 bg-red-50' : 'border-black'}`}>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold bg-gray-200 px-2 py-0.5 rounded text-gray-700 uppercase">{c.court_type}</span>
                        <span className="text-xs text-gray-500">{c.court_name}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{c.case_no}</h3>
                      <p className="text-gray-600 font-medium">{c.party_name}</p>
                      <div className="flex gap-4 text-xs text-gray-500 mt-2">
                        <span>Section: {c.section}</span>
                        <span>Client: {c.client_name}</span>
                      </div>
                    </div>

                    <div className="text-right px-4 border-l">
                      <p className="text-xs text-gray-500 uppercase">Next Date</p>
                      <p className={`text-xl font-bold ${isLate ? 'text-red-600' : 'text-black'}`}>{c.next_date}</p>
                      <p className="text-xs font-bold bg-yellow-100 px-2 py-1 rounded mt-1 inline-block">{c.current_step}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* --- মডিউল ২: অ্যাকাউন্টস --- */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            {/* সামারি কার্ডস */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
                <p className="text-xs text-gray-500 uppercase font-bold">Income (Month)</p>
                <p className="text-2xl font-bold text-green-600">৳{totalIncome}</p>
              </div>
              <div className="bg-white p-6 rounded shadow border-l-4 border-red-500">
                <p className="text-xs text-gray-500 uppercase font-bold">Expense (Month)</p>
                <p className="text-2xl font-bold text-red-600">৳{totalExpense}</p>
              </div>
              <div className="bg-slate-800 p-6 rounded shadow text-white">
                <p className="text-xs text-gray-400 uppercase font-bold">Cash In Hand</p>
                <p className="text-2xl font-bold">৳{totalIncome - totalExpense}</p>
              </div>
              <div className="bg-orange-50 p-6 rounded shadow border-l-4 border-orange-500">
                <p className="text-xs text-orange-600 uppercase font-bold">Total Due To Receive</p>
                <p className="text-2xl font-bold text-orange-700">৳{totalDueReceive}</p>
              </div>
            </div>

            {/* ফিল্টারস এবং লেজার সার্চ */}
            <div className="bg-white p-4 rounded shadow flex flex-wrap gap-4 items-end">
              <div>
                 <label className="text-xs font-bold block mb-1">Filter By</label>
                 <select className="p-2 border rounded" onChange={e => setAccFilter(e.target.value)}>
                   <option value="Month">Current Month</option>
                   <option value="Custom">Custom Date</option>
                 </select>
              </div>
              {accFilter === 'Custom' && (
                <>
                  <div><label className="text-xs font-bold block">Start</label><input type="date" className="p-2 border rounded" onChange={e => setDateRange({...dateRange, start: e.target.value})}/></div>
                  <div><label className="text-xs font-bold block">End</label><input type="date" className="p-2 border rounded" onChange={e => setDateRange({...dateRange, end: e.target.value})}/></div>
                </>
              )}
              <div className="flex-1">
                <label className="text-xs font-bold block mb-1">Search Client Ledger</label>
                <input placeholder="Enter Client Name..." className="w-full p-2 border rounded" onChange={e => setSelectedClientLedger(e.target.value)} />
              </div>
              <button onClick={() => setModal({ type: 'addTxn' })} className="bg-black text-white px-4 py-2 rounded font-bold">+ New Entry</button>
            </div>

            {/* টেবিল */}
            <div className="bg-white rounded shadow overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 font-bold uppercase">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">Amount</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map(a => (
                    <tr key={a.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{a.date}</td>
                      <td className="p-4">{a.description}</td>
                      <td className="p-4">{a.client_name}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${a.txn_type === 'Due_Receive' ? 'bg-orange-100 text-orange-700' : 'bg-gray-200'}`}>
                          {a.txn_type}
                        </span>
                      </td>
                      <td className={`p-4 text-right font-bold ${a.txn_type === 'Income' ? 'text-green-600' : a.txn_type === 'Expense' ? 'text-red-600' : 'text-orange-600'}`}>
                        {a.txn_type === 'Expense' ? '-' : ''}{a.amount}
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={async () => {
                           if(confirm('Delete this entry?')) {
                             await supabase.from('accounts').delete().eq('id', a.id);
                             setRefresh(p=>p+1);
                           }
                        }} className="text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- মডিউল ৩: ক্যালেন্ডার --- */}
        {activeTab === 'calendar' && (
          <div className="bg-white p-6 rounded shadow">
             <div className="grid grid-cols-7 gap-2">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="font-bold text-center p-2 bg-gray-100">{d}</div>)}
                {[...Array(35)].map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() - d.getDay() + i); // Crude weekly view generator
                  const dateStr = d.toISOString().split('T')[0];
                  const dayCases = cases.filter(c => c.next_date === dateStr);
                  
                  return (
                    <div key={i} className={`min-h-[100px] border p-2 ${dayCases.length > 0 ? 'bg-blue-50' : 'bg-white'}`}
                       onClick={() => { if(dayCases.length) alert(`Cases on ${dateStr}:\n` + dayCases.map(c => c.case_no).join('\n')) }}>
                      <div className="flex justify-between">
                         <span className={`text-sm ${dateStr === new Date().toISOString().split('T')[0] ? 'bg-black text-white rounded-full w-6 h-6 flex items-center justify-center' : 'text-gray-500'}`}>{d.getDate()}</span>
                         {dayCases.length > 0 && <span className="bg-red-500 w-2 h-2 rounded-full"></span>}
                      </div>
                      <div className="mt-1 space-y-1">
                        {dayCases.map(c => (
                          <div key={c.id} className="text-[10px] bg-white border px-1 truncate rounded">{c.case_no}</div>
                        ))}
                      </div>
                    </div>
                  )
                })}
             </div>
          </div>
        )}

      </main>

      {/* ================= MODALS (POP-UPS) ================= */}
      
      {/* 1. ADD CASE MODAL */}
      {modal.type === 'addCase' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded shadow-2xl overflow-hidden">
            <div className="bg-black text-white p-4 font-bold flex justify-between">
              <span>NEW CASE ENTRY</span>
              <button onClick={() => setModal({ type: null })}><X/></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = Object.fromEntries(new FormData(e.target));
              handleSaveCase(formData);
            }} className="p-6 grid grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto">
              <select name="court_type" className="p-3 border rounded"><option>High Court</option><option>Judge Court</option></select>
              <input name="court_name" placeholder="Court Name (e.g. 5th Joint District)" className="p-3 border rounded" required />
              <input name="case_no" placeholder="Case No" className="p-3 border rounded" required />
              <input name="section" placeholder="Section" className="p-3 border rounded" />
              <input name="party_name" placeholder="Party Name" className="p-3 border rounded" required />
              <input name="client_name" placeholder="Client Name" className="p-3 border rounded" />
              <input name="client_mobile" placeholder="Client Mobile" className="p-3 border rounded" />
              <select name="on_behalf" className="p-3 border rounded"><option>Plaintiff</option><option>Defendant</option><option>Petitioner</option></select>
              <div><label className="text-xs">Filing Date</label><input type="date" name="filing_date" className="w-full p-3 border rounded" /></div>
              <div><label className="text-xs text-red-600 font-bold">Next Date</label><input type="date" name="next_date" className="w-full p-3 border rounded" required /></div>
              <input name="current_step" placeholder="Next Step (e.g. Hearing)" className="col-span-2 p-3 border rounded" required />
              <button type="submit" className="col-span-2 bg-black text-white py-3 font-bold hover:bg-gray-800">SAVE RECORD</button>
            </form>
          </div>
        </div>
      )}

      {/* 2. CASE DETAILS & EDIT MODAL */}
      {modal.type === 'details' && modal.data && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-lg shadow-2xl flex flex-col max-h-[90vh]">
            <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
               <div>
                 <h2 className="text-xl font-bold font-serif">{modal.data.case_no}</h2>
                 <p className="text-sm text-gray-500">{modal.data.court_name}</p>
               </div>
               <div className="flex gap-2">
                 {profile?.role === 'admin' && (
                    <button onClick={() => handleDeleteCase(modal.data.id)} className="text-red-500 p-2 hover:bg-red-50 rounded"><Trash2 size={20}/></button>
                 )}
                 <button onClick={() => setModal({ type: null })} className="p-2"><X size={24}/></button>
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 grid md:grid-cols-2 gap-8">
               {/* Left: Info */}
               <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><p className="font-bold text-gray-500">Party</p><p>{modal.data.party_name}</p></div>
                    <div><p className="font-bold text-gray-500">Section</p><p>{modal.data.section}</p></div>
                    <div><p className="font-bold text-gray-500">Client</p><p>{modal.data.client_name}</p></div>
                    <div><p className="font-bold text-gray-500">Mobile</p><p>{modal.data.client_mobile}</p></div>
                    <div><p className="font-bold text-gray-500">On Behalf</p><p>{modal.data.on_behalf}</p></div>
                    <div><p className="font-bold text-gray-500">Status</p><p>{modal.data.status}</p></div>
                 </div>
                 
                 {/* Update Section */}
                 {profile?.role === 'admin' && (
                   <div className="bg-blue-50 p-4 rounded border border-blue-100 mt-6">
                      <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Clock size={16}/> Update Date & Step</h4>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const next_date = e.target.date.value;
                        const current_step = e.target.step.value;
                        handleUpdateCase(modal.data.id, { next_date, current_step }, modal.data);
                      }} className="flex gap-2">
                        <input name="date" type="date" className="border p-2 rounded" defaultValue={modal.data.next_date} required/>
                        <input name="step" placeholder="New Step" className="border p-2 rounded flex-1" defaultValue={modal.data.current_step} required/>
                        <button className="bg-blue-600 text-white px-4 rounded font-bold">Update</button>
                      </form>
                   </div>
                 )}

                 {/* History Button */}
                 <button onClick={async () => {
                    const { data } = await supabase.from('case_history').select('*').eq('case_id', modal.data.id).order('updated_at', {ascending: false});
                    setCaseHistory(data);
                    setModal({ type: 'history', data: modal.data }); // Switch modal
                 }} className="w-full border p-2 rounded hover:bg-gray-50 font-bold text-sm mt-4">View History Log</button>
               </div>

               {/* Right: Docs */}
               <div className="bg-gray-50 p-6 rounded border">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><FolderOpen size={18}/> Digital Archive</h3>
                  {/* Doc List would go here - simplified for brevity */}
                  <p className="text-xs text-gray-500 mb-4">Files are stored securely via Google Drive Links.</p>
                  <a href="#" className="text-blue-600 text-sm font-bold underline">Open Document Folder</a>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. HISTORY MODAL */}
      {modal.type === 'history' && (
         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
               <div className="flex justify-between mb-4">
                 <h3 className="font-bold">Case History Log</h3>
                 <button onClick={() => setModal({ type: null })}><X/></button>
               </div>
               <div className="max-h-60 overflow-y-auto space-y-2">
                 {caseHistory.map((h, i) => (
                   <div key={i} className="border-l-2 border-black pl-3 py-1">
                      <p className="text-xs text-gray-500">{new Date(h.updated_at).toLocaleDateString()}</p>
                      <p className="font-bold text-sm">Date was: {h.prev_date}</p>
                      <p className="text-sm">Step was: {h.prev_step}</p>
                   </div>
                 ))}
               </div>
            </div>
         </div>
      )}

      {/* 4. ACCOUNTS ENTRY MODAL */}
      {modal.type === 'addTxn' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
             <h3 className="font-bold mb-4">New Transaction / Due</h3>
             <form onSubmit={(e) => {
               e.preventDefault();
               const formData = Object.fromEntries(new FormData(e.target));
               handleAccountEntry(formData);
               setModal({type:null});
             }} className="space-y-3">
               <select name="txn_type" className="w-full p-2 border rounded">
                 <option value="Income">Income (Received)</option>
                 <option value="Expense">Expense (Paid)</option>
                 <option value="Due_Receive">Due (I will get)</option>
                 <option value="Due_Pay">Debt (I owe)</option>
               </select>
               <input name="amount" type="number" placeholder="Amount" className="w-full p-2 border rounded" required />
               <input name="description" placeholder="Description" className="w-full p-2 border rounded" required />
               <input name="client_name" placeholder="Client Name (Optional)" className="w-full p-2 border rounded" />
               <select name="category" className="w-full p-2 border rounded">
                 <option>Office</option><option>Personal</option><option>Case Fee</option>
               </select>
               <button className="w-full bg-black text-white py-3 font-bold rounded">SAVE</button>
             </form>
             <button onClick={() => setModal({ type: null })} className="w-full text-center mt-2 text-sm text-gray-500">Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
};

// --- ৩. মেইন অ্যাপ (অপরিবর্তিত লজিক) ---
export default function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState('home');

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
    const { error } = await supabase.auth.signInWithPassword({ 
      email: e.target.email.value, password: e.target.password.value 
    });
    if (error) alert(error.message);
  };

  if (view === 'home') return <PublicHome onLoginClick={() => setView('login')} />;
  
  if (view === 'login') return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-serif font-bold text-center mb-6">Portal Access</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input name="email" type="email" placeholder="Email / ID" className="w-full p-3 border rounded bg-gray-50" required />
          <input name="password" type="password" placeholder="Password" className="w-full p-3 border rounded bg-gray-50" required />
          <button type="submit" className="w-full bg-black text-white py-3 font-bold tracking-widest hover:bg-gray-800">AUTHENTICATE</button>
        </form>
        <button onClick={() => setView('home')} className="w-full text-center mt-4 text-sm text-gray-500 underline">Back to Home</button>
      </div>
    </div>
  );

  return <Dashboard session={session} onLogout={() => supabase.auth.signOut()} />;
}

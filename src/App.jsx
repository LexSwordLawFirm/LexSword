import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Scale, Gavel, DollarSign, FileText, Bell, 
  Phone, User, Calendar, Save, Trash2, 
  ExternalLink, MessageCircle, FolderOpen, LogOut, CheckCircle, Menu, X
} from 'lucide-react';

// --- ১. পাবলিক হোমপেজ (ইন্টারন্যাশনাল ডিজাইন) ---
const PublicHome = ({ onLoginClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="font-sans text-slate-800 bg-white">
      {/* নেভিগেশন বার */}
      <nav className="fixed w-full bg-slate-900 text-white z-50 px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scale className="text-[#c5a059] h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold tracking-widest font-serif">JUSTICE & CO.</h1>
              <p className="text-xs text-[#c5a059] tracking-widest">SUPREME COURT ADVOCATES</p>
            </div>
          </div>
          
          <div className="hidden md:flex gap-8 font-medium text-sm tracking-wide">
            <a href="#home" className="hover:text-[#c5a059] transition">HOME</a>
            <a href="#practice" className="hover:text-[#c5a059] transition">PRACTICE AREAS</a>
            <a href="#team" className="hover:text-[#c5a059] transition">ATTORNEYS</a>
            <a href="#contact" className="hover:text-[#c5a059] transition">CONTACT</a>
          </div>

          <button onClick={onLoginClick} className="hidden md:flex items-center gap-2 bg-[#c5a059] text-slate-900 px-6 py-2 rounded-sm font-bold hover:bg-white transition">
            <User size={18}/> CLIENT PORTAL
          </button>
          
          {/* মোবাইল মেনু বাটন */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* হিরো সেকশন */}
      <header id="home" className="relative h-screen flex items-center justify-center bg-slate-900 text-white pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-[#c5a059] tracking-[0.2em] font-bold mb-4">ESTABLISHED 2025</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Unparalleled Legal <br/> Representation
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Providing strategic legal solutions in the High Court and Judge Courts of Bangladesh. We fight for your rights with integrity and excellence.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-[#c5a059] text-slate-900 px-8 py-4 font-bold text-lg rounded-sm hover:bg-white transition">
              FREE CONSULTATION
            </button>
            <button className="border border-[#c5a059] text-[#c5a059] px-8 py-4 font-bold text-lg rounded-sm hover:bg-[#c5a059] hover:text-slate-900 transition">
              OUR SERVICES
            </button>
          </div>
        </div>
      </header>

      {/* প্র্যাকটিস এরিয়া */}
      <section id="practice" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Practice Areas</h2>
          <div className="w-24 h-1 bg-[#c5a059] mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {icon: Gavel, title: "Criminal Defense", desc: "Expert defense in criminal proceedings."},
            {icon: FileText, title: "Civil Litigation", desc: "Property disputes, contracts, and family law."},
            {icon: Scale, title: "Corporate Law", desc: "Business formation, compliance, and mergers."}
          ].map((item, i) => (
            <div key={i} className="p-8 border border-gray-200 hover:border-[#c5a059] hover:shadow-xl transition group">
              <item.icon className="w-12 h-12 text-slate-400 group-hover:text-[#c5a059] mb-6"/>
              <h3 className="text-xl font-bold mb-3 font-serif">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* অ্যাপয়েন্টমেন্ট ফর্ম */}
      <section id="contact" className="bg-slate-50 py-20 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 shadow-2xl rounded-sm border-t-4 border-[#c5a059]">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">Request an Appointment</h2>
          <form className="grid md:grid-cols-2 gap-6">
            <input placeholder="Full Name" className="p-4 bg-gray-50 border border-gray-200 focus:border-[#c5a059] outline-none"/>
            <input placeholder="Phone Number" className="p-4 bg-gray-50 border border-gray-200 focus:border-[#c5a059] outline-none"/>
            <input placeholder="Email Address" className="p-4 bg-gray-50 border border-gray-200 focus:border-[#c5a059] outline-none"/>
            <select className="p-4 bg-gray-50 border border-gray-200 focus:border-[#c5a059] outline-none">
              <option>Select Case Type</option>
              <option>Criminal</option>
              <option>Civil</option>
              <option>Writ</option>
            </select>
            <textarea placeholder="Brief Details of Case" className="md:col-span-2 p-4 bg-gray-50 border border-gray-200 focus:border-[#c5a059] outline-none h-32"></textarea>
            <button className="md:col-span-2 bg-slate-900 text-white py-4 font-bold tracking-widest hover:bg-[#c5a059] transition">
              SUBMIT REQUEST
            </button>
          </form>
        </div>
      </section>

      {/* ফুটার */}
      <footer className="bg-slate-900 text-gray-400 py-12 px-6 text-center">
        <p>&copy; 2026 Justice & Co. All Rights Reserved. | Supreme Court of Bangladesh</p>
      </footer>
    </div>
  );
};

// --- ২. ড্যাশবোর্ড (এডমিন প্যানেল) ---
const AdminDashboard = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState('cases'); // cases, accounts, documents, tasks
  
  // -- স্টেট ভেরিয়েবল --
  const [cases, setCases] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  // ফর্ম ডাটা
  const [newCase, setNewCase] = useState({ court_type: 'High Court', case_no: '', next_date: '', current_step: '' });
  const [newTxn, setNewTxn] = useState({ amount: '', txn_type: 'Expense', category: 'Office', description: '' });
  const [newTask, setNewTask] = useState({ task_name: '', due_date: '' });

  // ডাটা লোড
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: cData } = await supabase.from('cases').select('*').order('next_date', { ascending: true });
    setCases(cData || []);
    const { data: aData } = await supabase.from('accounts').select('*').order('date', { ascending: false });
    setAccounts(aData || []);
    const { data: tData } = await supabase.from('tasks').select('*');
    setTasks(tData || []);
  };

  // --- ফাংশন: মামলা যোগ করা ---
  const handleAddCase = async () => {
    if(!newCase.case_no) return alert("Case No is required");
    const { error } = await supabase.from('cases').insert([newCase]);
    if (error) alert("Error: " + error.message);
    else {
      alert("Case Added Successfully!");
      setNewCase({ court_type: 'High Court', case_no: '', next_date: '', current_step: '' });
      fetchData();
    }
  };

  // --- ফাংশন: মামলা আপডেট (হিস্ট্রি সেভ সহ) ---
  const updateCase = async (id, oldDate, oldStep, newDate, newStep) => {
    // ১. হিস্ট্রি সেভ
    await supabase.from('case_history').insert({ case_id: id, prev_date: oldDate, prev_step: oldStep });
    // ২. মেইন আপডেট
    await supabase.from('cases').update({ next_date: newDate, current_step: newStep }).eq('id', id);
    alert("Updated & History Saved!");
    fetchData();
  };

  // --- ফাংশন: অ্যাকাউন্টস যোগ করা ---
  const handleAddTxn = async () => {
    const { error } = await supabase.from('accounts').insert([newTxn]);
    if (!error) {
      alert("Transaction Added");
      fetchData();
    }
  };

  // --- ফাংশন: WhatsApp এ পাঠানো ---
  const sendWhatsApp = (mobile, caseNo, date) => {
    const msg = `Dear Client, Your case (${caseNo}) next date is ${date}. Please contact office.`;
    window.open(`https://wa.me/${mobile}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // --- ক্যালকুলেশন: Cash in Hand ---
  const income = accounts.filter(a => a.txn_type === 'Income').reduce((acc, c) => acc + Number(c.amount), 0);
  const expense = accounts.filter(a => a.txn_type === 'Expense' && a.category === 'Office').reduce((acc, c) => acc + Number(c.amount), 0);
  const cashInHand = income - expense;

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* সাইডবার */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold font-serif text-[#c5a059] border-b border-slate-800">CHAMBERS</div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('cases')} className={`w-full flex items-center gap-3 p-3 rounded ${activeTab === 'cases' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <Gavel size={20}/> Case Diary
          </button>
          <button onClick={() => setActiveTab('accounts')} className={`w-full flex items-center gap-3 p-3 rounded ${activeTab === 'accounts' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <DollarSign size={20}/> Accounts
          </button>
          <button onClick={() => setActiveTab('tasks')} className={`w-full flex items-center gap-3 p-3 rounded ${activeTab === 'tasks' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <Bell size={20}/> Assistant
          </button>
        </nav>
        <button onClick={onLogout} className="m-4 p-3 flex items-center gap-2 text-red-400 hover:bg-slate-800 rounded">
          <LogOut size={20}/> Logout
        </button>
      </aside>

      {/* মেইন এরিয়া */}
      <main className="flex-1 overflow-y-auto p-8">
        
        {/* মডিউল ১: কেস ডায়েরি */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Digital Case Diary</h2>
            
            {/* Add Case Form */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#c5a059]">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Gavel size={16}/> Add New Case</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <select className="p-2 border rounded bg-slate-50" onChange={e => setNewCase({...newCase, court_type: e.target.value})}>
                  <option>High Court</option>
                  <option>Judge Court</option>
                </select>
                <input placeholder="Case No (e.g. 50/2025)" className="p-2 border rounded" onChange={e => setNewCase({...newCase, case_no: e.target.value})}/>
                <input placeholder="Party Name" className="p-2 border rounded" onChange={e => setNewCase({...newCase, party_name: e.target.value})}/>
                <input placeholder="Client Mobile" className="p-2 border rounded" onChange={e => setNewCase({...newCase, client_mobile: e.target.value})}/>
                <input type="date" className="p-2 border rounded" onChange={e => setNewCase({...newCase, next_date: e.target.value})}/>
                <input placeholder="Step (e.g. Hearing)" className="p-2 border rounded" onChange={e => setNewCase({...newCase, current_step: e.target.value})}/>
                <button onClick={handleAddCase} className="bg-slate-900 text-white px-4 py-2 rounded font-bold hover:bg-[#c5a059] transition">
                  SAVE CASE
                </button>
              </div>
            </div>

            {/* Case List with Blinking Alert */}
            <div className="grid gap-4">
              {cases.map((c) => {
                const isToday = new Date().toISOString().split('T')[0] === c.next_date;
                return (
                  <div key={c.id} className={`bg-white p-5 rounded-lg shadow flex justify-between items-center ${isToday ? 'border-2 border-red-500 animate-pulse' : ''}`}>
                    <div>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${c.court_type === 'High Court' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>{c.court_type}</span>
                      <h3 className="text-xl font-bold mt-2">{c.case_no}</h3>
                      <p className="text-gray-600">{c.party_name}</p>
                      <p className="text-sm text-gray-500 mt-1">Last Step: {c.current_step}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className={`text-lg font-bold ${isToday ? 'text-red-600' : 'text-slate-800'}`}>
                         Next: {c.next_date}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => sendWhatsApp(c.client_mobile, c.case_no, c.next_date)} className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200" title="WhatsApp Client">
                          <MessageCircle size={18}/>
                        </button>
                        <button className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200" title="Google Drive Docs">
                          <FolderOpen size={18}/>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* মডিউল ২: স্মার্ট অ্যাকাউন্টস */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Smart Accounts</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <p className="text-sm text-green-600 font-bold uppercase">Total Income</p>
                <p className="text-3xl font-bold text-slate-800">৳{income}</p>
              </div>
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <p className="text-sm text-red-600 font-bold uppercase">Office Expense</p>
                <p className="text-3xl font-bold text-slate-800">৳{expense}</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-xl text-white">
                <p className="text-sm text-[#c5a059] font-bold uppercase">Cash In Hand</p>
                <p className="text-3xl font-bold">৳{cashInHand}</p>
              </div>
            </div>

            {/* Entry Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold mb-4">New Transaction</h3>
              <div className="flex gap-4 mb-4">
                <button onClick={() => setNewTxn({...newTxn, txn_type: 'Income'})} className={`flex-1 py-2 rounded font-bold ${newTxn.txn_type === 'Income' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>Income</button>
                <button onClick={() => setNewTxn({...newTxn, txn_type: 'Expense'})} className={`flex-1 py-2 rounded font-bold ${newTxn.txn_type === 'Expense' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>Expense</button>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <select className="p-2 border rounded" onChange={e => setNewTxn({...newTxn, category: e.target.value})}>
                  <option>Office</option>
                  <option>Personal</option>
                </select>
                <input placeholder="Amount" type="number" className="p-2 border rounded" onChange={e => setNewTxn({...newTxn, amount: e.target.value})}/>
                <input placeholder="Description / Client Name" className="p-2 border rounded col-span-2" onChange={e => setNewTxn({...newTxn, description: e.target.value})}/>
                <button onClick={handleAddTxn} className="bg-slate-900 text-white px-6 py-2 rounded font-bold col-span-4 hover:bg-[#c5a059]">ADD ENTRY</button>
              </div>
            </div>

            {/* Ledger Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map(a => (
                    <tr key={a.id} className="border-b hover:bg-slate-50">
                      <td className="p-4">{a.date}</td>
                      <td className="p-4">{a.description}</td>
                      <td className="p-4"><span className={`text-xs px-2 py-1 rounded ${a.category === 'Personal' ? 'bg-orange-100 text-orange-800' : 'bg-slate-200'}`}>{a.category}</span></td>
                      <td className={`p-4 text-right font-bold ${a.txn_type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                        {a.txn_type === 'Income' ? '+' : '-'} {a.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* মডিউল ৫: অ্যাসিস্ট্যান্ট (Tasks) */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
             <h2 className="text-3xl font-bold text-slate-800">Smart Assistant</h2>
             <div className="bg-white p-6 rounded-lg shadow flex gap-4">
                <input placeholder="New Task (e.g. Draft Writ Petition)" className="flex-1 p-2 border rounded" onChange={e => setNewTask({...newTask, task_name: e.target.value})}/>
                <input type="date" className="p-2 border rounded" onChange={e => setNewTask({...newTask, due_date: e.target.value})}/>
                <button onClick={async () => {
                  await supabase.from('tasks').insert([newTask]);
                  fetchData();
                }} className="bg-slate-900 text-white px-6 rounded font-bold">ADD TASK</button>
             </div>
             <div className="space-y-2">
               {tasks.map(t => (
                 <div key={t.id} className="bg-white p-4 rounded shadow flex justify-between items-center border-l-4 border-[#c5a059]">
                    <div>
                      <p className="font-bold">{t.task_name}</p>
                      <p className="text-xs text-red-500">Due: {t.due_date}</p>
                    </div>
                    <button onClick={async () => {
                      await supabase.from('tasks').delete().eq('id', t.id);
                      fetchData();
                    }} className="text-gray-400 hover:text-red-600"><Trash2 size={18}/></button>
                 </div>
               ))}
             </div>
          </div>
        )}

      </main>
    </div>
  );
};

// --- মেইন অ্যাপ কন্ট্রোলার ---
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
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  if (view === 'home') return <PublicHome onLoginClick={() => setView('login')} />;
  
  if (view === 'login') return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744')] bg-cover bg-blend-overlay">
      <div className="bg-white p-10 rounded-sm shadow-2xl w-full max-w-md border-t-8 border-[#c5a059]">
        <div className="text-center mb-8">
          <Scale className="h-12 w-12 text-[#c5a059] mx-auto mb-2"/>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Secure Portal</h2>
          <p className="text-gray-500">Enter your credentials to access</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email / Client ID</label>
            <input name="email" type="email" className="w-full p-3 bg-slate-50 border border-gray-300 rounded focus:border-[#c5a059] outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input name="password" type="password" className="w-full p-3 bg-slate-50 border border-gray-300 rounded focus:border-[#c5a059] outline-none" required />
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white py-4 font-bold tracking-wider hover:bg-[#c5a059] transition">
            AUTHENTICATE
          </button>
        </form>
        <button onClick={() => setView('home')} className="w-full text-center mt-6 text-slate-500 hover:text-[#c5a059] font-bold text-sm">
          ← Return to Website
        </button>
      </div>
    </div>
  );

  return <AdminDashboard session={session} onLogout={() => supabase.auth.signOut()} />;
}

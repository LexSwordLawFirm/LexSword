import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Scale, Gavel, DollarSign, FileText, Bell, 
  Phone, User, Calendar as CalIcon, Save, Trash2, 
  ExternalLink, MessageCircle, FolderOpen, LogOut, 
  Plus, X, Edit3, Filter, ChevronLeft, ChevronRight, Folder
} from 'lucide-react';

// --- ১. পাবলিক হোমপেজ (আপনার আগের ডিজাইন অপরিবর্তিত) ---
const PublicHome = ({ onLoginClick }) => (
  <div className="font-sans text-slate-800 bg-white">
    <nav className="fixed w-full bg-slate-900 text-white z-50 px-6 py-4 shadow-lg flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Scale className="text-[#c5a059] h-8 w-8" />
        <div><h1 className="text-2xl font-bold font-serif">JUSTICE & CO.</h1></div>
      </div>
      <button onClick={onLoginClick} className="bg-[#c5a059] text-slate-900 px-6 py-2 rounded-sm font-bold hover:bg-white transition">
        CLIENT / ADMIN LOGIN
      </button>
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

// --- ২. মেইন ড্যাশবোর্ড ---
const AdminDashboard = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, calendar, accounts
  const [cases, setCases] = useState([]);
  const [refresh, setRefresh] = useState(0); // ডাটা রিফ্রেশ ট্রিগার

  // -- মোডাল (Pop-up) স্টেটস --
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [selectedCaseForDoc, setSelectedCaseForDoc] = useState(null);
  const [documents, setDocuments] = useState([]);

  // -- ফর্ম স্টেটস --
  const [newCase, setNewCase] = useState({
    court_type: 'High Court', court_name: '', case_no: '', section: '',
    party_name: '', on_behalf: 'Petitioner', client_mobile: '',
    filing_date: '', next_date: '', current_step: '', status: 'Ongoing'
  });

  const [newDoc, setNewDoc] = useState({ folder_type: 'Plaint (Arji)', doc_name: '', drive_link: '' });

  // -- ডাটা লোড --
  useEffect(() => {
    fetchCases();
  }, [refresh]);

  const fetchCases = async () => {
    const { data } = await supabase.from('cases').select('*').order('next_date', { ascending: true });
    setCases(data || []);
  };

  const fetchDocuments = async (caseId) => {
    const { data } = await supabase.from('documents').select('*').eq('case_id', caseId);
    setDocuments(data || []);
  };

  // --- অ্যাকশন: মামলা সেভ ---
  const handleSaveCase = async () => {
    if (!newCase.case_no || !newCase.party_name) return alert("Case No & Party Name Required!");
    const { error } = await supabase.from('cases').insert([newCase]);
    if (error) alert(error.message);
    else {
      alert("Case Added Successfully!");
      setIsAddModalOpen(false);
      setRefresh(prev => prev + 1);
      // ফর্ম রিসেট
      setNewCase({
        court_type: 'High Court', court_name: '', case_no: '', section: '',
        party_name: '', on_behalf: 'Petitioner', client_mobile: '',
        filing_date: '', next_date: '', current_step: '', status: 'Ongoing'
      });
    }
  };

  // --- অ্যাকশন: মামলা আপডেট (হিস্ট্রি সহ) ---
  const handleUpdateDate = async (id, oldDate, oldStep) => {
    const newDate = prompt("Enter New Date (YYYY-MM-DD):", oldDate);
    const newStep = prompt("Enter New Step:", oldStep);
    
    if (newDate && newStep) {
      // ১. হিস্ট্রি সেভ
      await supabase.from('case_history').insert({ case_id: id, prev_date: oldDate, prev_step: oldStep });
      // ২. আপডেট
      await supabase.from('cases').update({ next_date: newDate, current_step: newStep }).eq('id', id);
      setRefresh(prev => prev + 1);
    }
  };

  // --- অ্যাকশন: ডকুমেন্ট যোগ ---
  const handleAddDocument = async () => {
    if(!newDoc.drive_link) return alert("Link Required");
    await supabase.from('documents').insert([{ ...newDoc, case_id: selectedCaseForDoc.id }]);
    fetchDocuments(selectedCaseForDoc.id);
    setNewDoc({ folder_type: 'Plaint (Arji)', doc_name: '', drive_link: '' });
  };

  // --- ক্যালকুলেশনস ---
  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date(); tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];

  const todayCases = cases.filter(c => c.next_date === today);
  const tomorrowCases = cases.filter(c => c.next_date === tomorrow);
  
  // রবিবার থেকে বৃহস্পতিবার (This Week)
  const getNextThursday = () => {
     const d = new Date();
     d.setDate(d.getDate() + (4 + 7 - d.getDay()) % 7);
     return d.toISOString().split('T')[0];
  }
  const weekCases = cases.filter(c => c.next_date > tomorrow && c.next_date <= getNextThursday());

  const needsUpdateCount = cases.filter(c => c.next_date < today && c.status === 'Ongoing').length;

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      
      {/* ১. সাইডবার */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 text-2xl font-bold font-serif text-[#c5a059] border-b border-slate-800 tracking-wider">CHAMBERS</div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'dashboard' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <Gavel size={20}/> Case Dashboard
          </button>
          <button onClick={() => setActiveTab('calendar')} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'calendar' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <CalIcon size={20}/> Monthly Calendar
          </button>
          <button className={`w-full flex items-center gap-3 p-3 rounded transition text-gray-400 hover:bg-slate-800`}>
            <DollarSign size={20}/> Accounts
          </button>
        </nav>
        <button onClick={onLogout} className="m-4 p-3 flex items-center gap-2 text-red-400 hover:bg-slate-800 rounded">
          <LogOut size={20}/> Logout
        </button>
      </aside>

      {/* ২. মেইন এরিয়া */}
      <main className="flex-1 overflow-y-auto relative">
        {/* টপ বার */}
        <header className="bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-700">
            {activeTab === 'dashboard' ? 'Overview' : 'Calendar Schedule'}
          </h2>
          <div className="flex gap-4">
             {/* Add Case Button - Opens Modal */}
             <button 
               onClick={() => setIsAddModalOpen(true)}
               className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded shadow hover:bg-[#c5a059] transition font-bold"
             >
               <Plus size={18}/> NEW CASE
             </button>
          </div>
        </header>

        {/* কনটেন্ট এরিয়া */}
        <div className="p-8">
          
          {/* স্ট্যাটাস কার্ডস */}
          <div className="grid grid-cols-4 gap-6 mb-8">
             <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-slate-900">
                <p className="text-gray-500 text-xs font-bold uppercase">Total Cases</p>
                <p className="text-3xl font-bold text-slate-800">{cases.length}</p>
             </div>
             <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
                <p className="text-gray-500 text-xs font-bold uppercase">Ongoing</p>
                <p className="text-3xl font-bold text-green-600">{cases.filter(c => c.status === 'Ongoing').length}</p>
             </div>
             <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-red-500">
                <p className="text-gray-500 text-xs font-bold uppercase">Needs Update</p>
                <p className="text-3xl font-bold text-red-600">{needsUpdateCount}</p>
             </div>
          </div>

          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* আজকের মামলা */}
              <Section title="Today's Hearing" color="red">
                 {todayCases.length === 0 && <p className="text-gray-400 italic">No hearings today.</p>}
                 {todayCases.map(c => (
                   <CaseCard key={c.id} c={c} isToday={true} onUpdate={handleUpdateDate} onDoc={() => { setSelectedCaseForDoc(c); fetchDocuments(c.id); setIsDocModalOpen(true); }} />
                 ))}
              </Section>

              {/* আগামীকালের মামলা */}
              <Section title="Tomorrow's List" color="blue">
                 {tomorrowCases.map(c => (
                   <CaseCard key={c.id} c={c} onUpdate={handleUpdateDate} onDoc={() => { setSelectedCaseForDoc(c); fetchDocuments(c.id); setIsDocModalOpen(true); }} />
                 ))}
              </Section>

              {/* সপ্তাহের বাকি মামলা */}
              <Section title="Rest of the Week (Sun-Thu)" color="slate">
                 {weekCases.map(c => (
                   <CaseCard key={c.id} c={c} onUpdate={handleUpdateDate} onDoc={() => { setSelectedCaseForDoc(c); fetchDocuments(c.id); setIsDocModalOpen(true); }} />
                 ))}
              </Section>

            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-4 text-slate-700">Monthly Schedule</h3>
              <div className="grid grid-cols-7 gap-2 text-center font-bold text-gray-500 mb-2">
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(30)].map((_, i) => {
                  const d = new Date(); 
                  d.setDate(d.getDate() - d.getDate() + i + 1); // Simple generic month view for demo
                  const dateStr = d.toISOString().split('T')[0];
                  const hasCase = cases.some(c => c.next_date === dateStr);
                  return (
                    <div key={i} className={`h-24 border rounded p-2 ${hasCase ? 'bg-red-50 border-red-200' : 'bg-slate-50'}`}>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{i+1}</span>
                        {hasCase && <span className="h-3 w-3 bg-red-600 rounded-full animate-pulse"></span>}
                      </div>
                      <div className="mt-2 text-xs text-slate-800">
                        {cases.filter(c => c.next_date === dateStr).map(c => (
                          <div key={c.id} className="truncate">• {c.case_no}</div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ============ MODAL: ADD CASE (POP-UP) ============ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden border border-[#c5a059]">
            {/* Header */}
            <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg flex items-center gap-2"><Plus className="text-[#c5a059]"/> New Case Entry</h3>
              <button onClick={() => setIsAddModalOpen(false)}><X className="hover:text-red-400"/></button>
            </div>
            
            {/* Body - Grid Form */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto">
              
              {/* 1. Court Type */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">1. Court Type</label>
                <select className="w-full p-3 border rounded bg-slate-50 focus:border-[#c5a059] outline-none"
                  onChange={e => setNewCase({...newCase, court_type: e.target.value})}>
                  <option>High Court</option>
                  <option>Judge Court</option>
                </select>
              </div>

              {/* 2. Court Name */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">2. Court Name</label>
                <input placeholder="e.g. 3rd Joint District Judge" className="w-full p-3 border rounded focus:border-[#c5a059] outline-none"
                  onChange={e => setNewCase({...newCase, court_name: e.target.value})} />
              </div>

              {/* 3. Case No */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">3. Case Number</label>
                <input placeholder="e.g. 105/2025" className="w-full p-3 border rounded focus:border-[#c5a059] outline-none"
                  onChange={e => setNewCase({...newCase, case_no: e.target.value})} />
              </div>

              {/* 4. Section */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">4. Section / Dhara</label>
                <input placeholder="e.g. 302 Penal Code" className="w-full p-3 border rounded focus:border-[#c5a059] outline-none"
                  onChange={e => setNewCase({...newCase, section: e.target.value})} />
              </div>

              {/* 5. Party Name */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">5. Party Names</label>
                <input placeholder="e.g. Rahim vs Karim" className="w-full p-3 border rounded focus:border-[#c5a059] outline-none"
                  onChange={e => setNewCase({...newCase, party_name: e.target.value})} />
              </div>

              {/* 6. On Behalf Of */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">6. On Behalf Of</label>
                <select className="w-full p-3 border rounded bg-slate-50 focus:border-[#c5a059] outline-none"
                  onChange={e => setNewCase({...newCase, on_behalf: e.target.value})}>
                  <option>Plaintiff (বাদী)</option>
                  <option>Defendant (বিবাদী)</option>
                  <option>Complainant (ফরিয়াদী)</option>
                  <option>Accused (আসামী)</option>
                  <option>Petitioner (দরখাস্তকারী)</option>
                  <option>Opposite Party (বিপরীত পক্ষ)</option>
                </select>
              </div>

               {/* 7. Client Mobile */}
               <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">7. Client Phone</label>
                <input placeholder="017..." className="w-full p-3 border rounded focus:border-[#c5a059] outline-none"
                  onChange={e => setNewCase({...newCase, client_mobile: e.target.value})} />
              </div>

              {/* 8. Filing Date */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">8. Filing / Receiving Date</label>
                <input type="date" className="w-full p-3 border rounded focus:border-[#c5a059] outline-none"
                  onChange={e => setNewCase({...newCase, filing_date: e.target.value})} />
              </div>

              {/* 9. Next Date */}
              <div className="col-span-1 bg-yellow-50 p-2 rounded border border-yellow-200">
                <label className="block text-xs font-bold text-red-600 mb-1">9. Next Date</label>
                <input type="date" className="w-full p-3 border rounded focus:border-[#c5a059] outline-none bg-white"
                  onChange={e => setNewCase({...newCase, next_date: e.target.value})} />
              </div>

              {/* 10. Next Step */}
              <div className="col-span-1 bg-yellow-50 p-2 rounded border border-yellow-200">
                <label className="block text-xs font-bold text-red-600 mb-1">10. Next Step</label>
                <input placeholder="e.g. Hearing / Order" className="w-full p-3 border rounded focus:border-[#c5a059] outline-none bg-white"
                  onChange={e => setNewCase({...newCase, current_step: e.target.value})} />
              </div>

              {/* 11. Documents Note */}
              <div className="col-span-2 p-4 bg-blue-50 text-blue-800 text-sm rounded border border-blue-100 flex items-center gap-2">
                 <FolderOpen size={20}/>
                 <span>Note: You can add Case Documents (Folders & Links) after saving the case from the Dashboard.</span>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-6 flex justify-end gap-4 border-t">
              <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-3 rounded text-gray-600 font-bold hover:bg-gray-200">Cancel</button>
              <button onClick={handleSaveCase} className="px-8 py-3 bg-slate-900 text-white rounded font-bold hover:bg-[#c5a059] flex items-center gap-2">
                <Save size={18}/> SAVE CASE RECORD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ MODAL: DOCUMENTS MANAGER ============ */}
      {isDocModalOpen && selectedCaseForDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
               <div>
                  <h3 className="font-bold">Digital Archive: {selectedCaseForDoc.case_no}</h3>
                  <p className="text-xs text-[#c5a059]">Manage Files & Links (Admin Only)</p>
               </div>
               <button onClick={() => setIsDocModalOpen(false)}><X/></button>
            </div>

            <div className="p-6 h-[50vh] overflow-y-auto bg-slate-50">
               {/* Add New Doc Form */}
               <div className="bg-white p-4 rounded shadow mb-6 border border-gray-200">
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2"><Plus size={16}/> Add New Document Link</h4>
                  <div className="flex gap-2 mb-2">
                     <select className="p-2 border rounded text-sm bg-gray-50" 
                        onChange={e => setNewDoc({...newDoc, folder_type: e.target.value})}>
                        <option>Plaint (Arji)</option>
                        <option>Written Statement (Jabab)</option>
                        <option>List of Docs (Firisti)</option>
                        <option>Judgment / Order</option>
                        <option>Others</option>
                     </select>
                     <input placeholder="Doc Name (e.g. Arji Copy)" className="flex-1 p-2 border rounded text-sm" 
                        value={newDoc.doc_name} onChange={e => setNewDoc({...newDoc, doc_name: e.target.value})}/>
                  </div>
                  <input placeholder="Paste Google Drive Link Here..." className="w-full p-2 border rounded text-sm mb-2" 
                     value={newDoc.drive_link} onChange={e => setNewDoc({...newDoc, drive_link: e.target.value})}/>
                  <button onClick={handleAddDocument} className="w-full bg-slate-800 text-white py-2 rounded text-sm font-bold hover:bg-[#c5a059]">ADD TO ARCHIVE</button>
               </div>

               {/* Folders Display */}
               <div className="space-y-2">
                  <h4 className="font-bold text-sm text-gray-500">Existing Files</h4>
                  {documents.length === 0 && <p className="text-sm text-gray-400">No documents linked yet.</p>}
                  {documents.map(d => (
                     <div key={d.id} className="bg-white p-3 rounded border flex justify-between items-center hover:bg-blue-50 transition">
                        <div className="flex items-center gap-3">
                           <Folder className="text-yellow-500" size={20}/>
                           <div>
                              <p className="font-bold text-sm">{d.folder_type}</p>
                              <p className="text-xs text-gray-500">{d.doc_name}</p>
                           </div>
                        </div>
                        <a href={d.drive_link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs font-bold flex items-center gap-1">
                           Open File <ExternalLink size={12}/>
                        </a>
                     </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// --- সাব-কম্পোনেন্ট: সেকশন হেডার ---
const Section = ({ title, children, color }) => (
  <div className="mb-10">
    <div className={`flex items-center gap-3 mb-4 border-b pb-2 border-${color}-200`}>
      <h3 className={`text-lg font-bold text-${color}-800 uppercase tracking-wider`}>{title}</h3>
      <span className={`bg-${color}-100 text-${color}-800 px-2 py-0.5 rounded-full text-xs font-bold`}>{Array.isArray(children) ? children.length : 1}</span>
    </div>
    <div className="grid gap-4">{children}</div>
  </div>
);

// --- সাব-কম্পোনেন্ট: কেস কার্ড ---
const CaseCard = ({ c, isToday, onUpdate, onDoc }) => (
  <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition relative overflow-hidden ${isToday ? 'ring-2 ring-red-500 bg-red-50' : ''}`}>
    {isToday && <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-3 py-1 font-bold animate-pulse">TODAY</div>}
    
    <div className="flex justify-between items-start">
       <div>
          <div className="flex gap-2 mb-2">
             <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">{c.court_type}</span>
             <span className="text-xs font-bold bg-blue-100 px-2 py-1 rounded text-blue-600">{c.section}</span>
          </div>
          <h4 className="text-xl font-bold text-slate-800">{c.case_no}</h4>
          <p className="text-sm font-medium text-slate-600 mt-1">{c.party_name}</p>
          <p className="text-xs text-gray-400 mt-1">On behalf of: {c.on_behalf}</p>
       </div>

       <div className="text-right">
          <p className="text-xs text-gray-500">Next Date</p>
          <p className={`text-xl font-bold ${isToday ? 'text-red-600' : 'text-slate-800'}`}>{c.next_date}</p>
          <p className="text-xs font-bold text-[#c5a059] mt-1 uppercase">{c.current_step}</p>
       </div>
    </div>

    {/* Action Buttons */}
    <div className="mt-6 flex gap-3 border-t pt-4">
       <button onClick={() => onUpdate(c.id, c.next_date, c.current_step)} className="flex-1 bg-slate-900 text-white py-2 rounded text-sm font-bold hover:bg-[#c5a059] flex justify-center items-center gap-2">
          <Edit3 size={14}/> UPDATE DATE
       </button>
       <button onClick={onDoc} className="px-4 py-2 border border-gray-300 rounded text-slate-600 hover:bg-gray-100 flex items-center gap-2 text-sm font-bold">
          <FolderOpen size={16}/> DOCS
       </button>
       <button onClick={() => window.open(`https://wa.me/${c.client_mobile}`, '_blank')} className="px-3 py-2 bg-green-100 text-green-600 rounded hover:bg-green-200">
          <MessageCircle size={18}/>
       </button>
    </div>
  </div>
);

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
    const { error } = await supabase.auth.signInWithPassword({ 
      email: e.target.email.value, password: e.target.password.value 
    });
    if (error) alert(error.message);
  };

  if (view === 'home') return <PublicHome onLoginClick={() => setView('login')} />;
  
  if (view === 'login') return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-2xl w-full max-w-md border-t-8 border-[#c5a059]">
        <h2 className="text-2xl font-bold text-center mb-6">Secure Access</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input name="email" type="email" placeholder="Email" className="w-full p-3 border rounded" required />
          <input name="password" type="password" placeholder="Password" className="w-full p-3 border rounded" required />
          <button type="submit" className="w-full bg-slate-900 text-white py-3 font-bold hover:bg-[#c5a059]">LOGIN</button>
        </form>
        <button onClick={() => setView('home')} className="w-full text-center mt-4 text-sm text-gray-500">Back</button>
      </div>
    </div>
  );

  return <AdminDashboard session={session} onLogout={() => supabase.auth.signOut()} />;
}

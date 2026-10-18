import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';
import { 
  Scale, Gavel, DollarSign, Bell, 
  Calendar as CalIcon, Save, Trash2, 
  ExternalLink, MessageCircle, FolderOpen, LogOut, 
  Plus, X, Edit3, Filter, ChevronLeft, ChevronRight, 
  Eye, History, Lock, Folder, Check, Mail, Phone, MapPin, 
  ArrowRight, Menu, RefreshCw, CheckCircle, Search, ClipboardList, 
  AlertTriangle, Clock, CheckSquare, Printer, PieChart, TrendingUp, TrendingDown,
  Quote, Shield, Users, Award, BookOpen, Briefcase, Landmark, HardHat, HeartPulse, Gem, FileText, Scale as ScaleIcon, ShieldCheck, MessageSquare
} from 'lucide-react';

// ==============================================================================
// 1. ANIMATION HOOK (MODERN UX - BLUR REVEAL)
// ==============================================================================
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-modern').forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);
};

// ==============================================================================
// 2. LEXSWORD PUBLIC HOMEPAGE (UPDATED SOFT BLUE THEME & MODERN UX)
// ==============================================================================

const PublicHome = ({ onLoginClick, loading }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const establishedYear = 2016;
  const currentYear = new Date().getFullYear();
  const yearsOfService = currentYear - establishedYear;

  useScrollAnimation();
 useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Disclaimer Logic
    const isAgreed = sessionStorage.getItem('lexswordDisclaimerAgreed');
    if(isAgreed) {
        setShowDisclaimer(false);
        document.body.style.overflow = 'auto';
    } else {
        document.body.style.overflow = 'hidden';
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAgreeDisclaimer = () => {
      sessionStorage.setItem('lexswordDisclaimerAgreed', 'true');
      setShowDisclaimer(false);
      document.body.style.overflow = 'auto';
  };

const handleDisagreeDisclaimer = () => {
      document.body.innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; background:#f8fafc; color:#475569; font-family:sans-serif; text-align:center; padding:20px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:20px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <h2 style="margin-bottom:10px; font-size: 24px; font-weight: bold; color: #1e293b;">Access Denied</h2>
            <p style="max-width:450px; line-height:1.6; color: #475569;">As you have declined the terms and disclaimer, we are unable to display this website to ensure legal compliance.</p>
            <button onclick="location.reload()" style="margin-top:20px; padding:10px 25px; background:#1e293b; color:white; border:none; border-radius:5px; cursor:pointer; font-weight: bold;">Try Again</button>
        </div>
    `;
  };
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
  const practiceAreas = [
    { icon: Gavel, title: "Civil Litigation", desc: "Resolving property disputes, land issues, and contract enforcement disputes." },
    { icon: ScaleIcon, title: "Criminal Litigation", desc: "Expert defense in Magistrate & Sessions Courts for bail and trials." },
    { icon: Users, title: "Family Law", desc: "Compassionate handling of divorce, custody, dower & inheritance matters." },
    { icon: Briefcase, title: "Commercial Law", desc: "Corporate advisory, Artha Rin suits, and business dispute resolution." },
    { icon: FileText, title: "Writ Petition", desc: "Challenging illegal government actions in the High Court Division." },
    { icon: Landmark, title: "Property Law", desc: "Expert vetting of land documents and handling transfer disputes." },
    { icon: ClipboardList, title: "Documentation", desc: "Professional drafting of deeds, wills, contracts and legal notices." },
    { icon: ShieldCheck, title: "Service Matter", desc: "Legal remedies for employment disputes, wrongful termination, and benefits." },
    { icon: MessageSquare, title: "Consultations", desc: "Strategic legal advice and consultation for individuals and corporations." },
  ];

  return (
    <div className="font-sans text-slate-800 bg-white selection:bg-[#c5a059] selection:text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Outfit:wght@300;400;500;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Outfit', sans-serif; }
        .reveal-modern {
            opacity: 0;
            filter: blur(8px);
            transform: translateY(40px) scale(0.98);
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-modern.animate-active {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0) scale(1);
        }
        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-300 { transition-delay: 0.3s; }
        .bg-soft-blue-gradient { background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%); } 
        .bg-soft-blue-solid { background-color: #1e293b; }
        .text-gold { color: #c5a059; }
        .bg-gold { background-color: #c5a059; }
        .border-gold { border-color: #c5a059; }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        /* Custom scrollbar for modern calendar */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #94a3b8; }
      `}</style>
{/* --- PROFESSIONAL DISCLAIMER MODAL --- */}
      {showDisclaimer && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[999999] flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-8 max-w-xl w-full text-center shadow-2xl border border-slate-200">
                  <ScaleIcon size={48} className="text-[#c5a059] mx-auto mb-4" />
                  <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">Disclaimer & Terms of Use</h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 text-justify">
                      As per the <strong>Canons of Professional Conduct and Etiquette</strong> formulated by the Bangladesh Bar Council, lawyers are strictly prohibited from engaging in any form of advertising or solicitation. The primary objective of this website is solely to serve as a digital platform for providing access to general legal information and sharing professional credentials. By clicking "I Agree", you acknowledge that no lawyer-client relationship is created by merely accessing this website.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button onClick={handleAgreeDisclaimer} className="bg-slate-900 text-white px-8 py-3 rounded-md font-bold hover:bg-[#c5a059] transition flex items-center justify-center gap-2 flex-1">
                          <Check size={20}/> I Agree
                      </button>
                      <button onClick={handleDisagreeDisclaimer} className="bg-slate-50 text-slate-500 px-8 py-3 rounded-md font-bold border border-slate-200 hover:bg-slate-100 hover:text-red-500 transition flex items-center justify-center gap-2 flex-1">
                          <X size={20}/> I Decline
                      </button>
                  </div>
              </div>
          </div>
      )}
   {/* Header / Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          
          {/* LOGO SECTION */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center ${scrolled ? 'text-[#c5a059]' : 'text-[#c5a059]'}`}>
                {/* Custom LexSword Shield & Sword Logo */}
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 hover:scale-110 drop-shadow-md">
                   <path d="M3.5 3h17v7c0 5.5-4 10-8.5 12C7.5 20 3.5 15.5 3.5 10V3z" />
                   <line x1="12" y1="5.5" x2="12" y2="9" />
                   <line x1="8.5" y1="9" x2="15.5" y2="9" />
                   <line x1="12" y1="9" x2="12" y2="18.5" />
                </svg>
            </div>
            <div>
              <h1 className={`text-2xl font-serif font-bold tracking-widest ${scrolled ? 'text-slate-900' : 'text-white'}`}>LexSword</h1>
              <p className={`text-[10px] font-bold tracking-[0.3em] uppercase ${scrolled ? 'text-gray-500' : 'text-gray-300'} mt-1`}>Your Law Firm</p>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className={`hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wider ${scrolled ? 'text-slate-800' : 'text-white'}`}>
            <a href="#home" className="hover:text-[#c5a059] transition border-b-2 border-transparent hover:border-[#c5a059] pb-1">Home</a>
            <a href="#about" className="hover:text-[#c5a059] transition border-b-2 border-transparent hover:border-[#c5a059] pb-1">About</a>
            <a href="#practice" className="hover:text-[#c5a059] transition border-b-2 border-transparent hover:border-[#c5a059] pb-1">Practice Areas</a>
            <a href="#team" className="hover:text-[#c5a059] transition border-b-2 border-transparent hover:border-[#c5a059] pb-1">Team</a>
            <a href="#contact" className="hover:text-[#c5a059] transition border-b-2 border-transparent hover:border-[#c5a059] pb-1">Contact</a>
          </div>
          
          {/* CONTACT & LOGIN BUTTON */}
          <div className="hidden md:flex items-center gap-6">
             <a href="tel:+8801911008518" className="flex items-center gap-3 group">
                <div className={`text-[#c5a059] group-hover:animate-pulse`}><Phone size={24}/></div>
                <div className={`${scrolled ? 'text-slate-800' : 'text-white'} leading-tight`}>
                   <p className="text-[10px] opacity-80 uppercase">Call for Consultation</p>
                   <p className="font-bold text-lg">+88 01911 008 518</p>
                </div>
             </a>
             <button onClick={onLoginClick} className="bg-[#c5a059] text-white px-5 py-2 rounded-sm font-bold text-xs uppercase tracking-wide hover:bg-slate-900 transition shadow-md">
                {loading ? '...' : 'Login Portal'}
             </button>
          </div>
          
          {/* MOBILE MENU TOGGLE BUTTON */}
          <button onClick={() => setMenuOpen(!menuOpen)} className={`lg:hidden ${scrolled ? 'text-slate-900' : 'text-white'}`}>
            {menuOpen ? <X size={28}/> : <Menu size={28}/>}
          </button>
        </div>
        
        {/* MOBILE MENU DROPDOWN */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-soft-blue-solid border-t border-slate-700 p-6 flex flex-col gap-4 font-bold text-center text-gray-300 shadow-xl">
             <a href="#home" onClick={()=>setMenuOpen(false)}>Home</a>
             <a href="#about" onClick={()=>setMenuOpen(false)}>About</a>
             <a href="#practice" onClick={()=>setMenuOpen(false)}>Practice Areas</a>
             <a href="#team" onClick={()=>setMenuOpen(false)}>Team</a>
             <a href="#contact" onClick={()=>setMenuOpen(false)}>Contact</a>
             <button onClick={onLoginClick} className="text-[#c5a059]">Member Login</button>
          </div>
        )}
      </nav>
      {/* 1. HERO SECTION */}
      <header id="home" className="relative min-h-screen flex items-center bg-soft-blue-gradient overflow-hidden pt-32 md:pt-48 pb-48">
         <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 reveal-modern order-2 md:order-1 relative z-20 text-center md:text-left">
               <p className="text-[#c5a059] font-bold text-lg md:text-xl tracking-wide flex items-center justify-center md:justify-start gap-2">
                  <span className="w-8 h-[2px] bg-[#c5a059]"></span> 
                  Established {establishedYear}
               </p>
               <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1]">
                  Your Justice, <br/>
                  <span className="text-[#c5a059]">Our Mission.</span>
               </h1>
               <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg border-l-0 md:border-l-2 border-[#c5a059] pl-0 md:pl-6 mx-auto md:mx-0">
                  LexSword Chambers provides expert legal representation in the Supreme Court and all lower courts of Bangladesh with uncompromised integrity.
               </p>
               <div className="pt-6 flex flex-col md:flex-row gap-4 relative z-30 justify-center md:justify-start">
                  <a href="#contact" className="bg-[#c5a059] text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition duration-300 shadow-xl flex items-center justify-center gap-2">
                     Free Consultation <ArrowRight size={18}/>
                  </a>
                  <a href="#practice" className="border-2 border-gray-400 text-gray-300 px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:border-[#c5a059] hover:text-[#c5a059] transition duration-300 flex items-center justify-center">
                     Our Services
                  </a>
               </div>
            </div>
            <div className="order-1 md:order-2 reveal-modern delay-200 flex justify-center md:justify-end relative py-10 md:py-0">
   {/* Background Soft Glow */}
   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

   {/* Modern Code-based Law Emblem */}
   <div className="relative w-[280px] h-[280px] md:w-[450px] md:h-[450px] flex items-center justify-center animate-float z-10">
       
       {/* Rotating Decorative Rings */}
       <div className="absolute inset-4 md:inset-8 border border-[#c5a059]/20 rounded-full animate-[spin_12s_linear_infinite] shadow-[inset_0_0_20px_rgba(197,160,89,0.1)]"></div>
       <div className="absolute inset-8 md:inset-16 border-2 border-dashed border-[#c5a059]/40 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
       <div className="absolute inset-12 md:inset-24 border border-[#c5a059]/30 rounded-full"></div>

       {/* Core Gold Center */}
       <div className="relative flex items-center justify-center bg-gradient-to-br from-[#c5a059] to-[#9c7d41] rounded-full shadow-[0_0_60px_rgba(197,160,89,0.3)] p-10 md:p-14 transition-transform duration-500 hover:scale-105">
           
           {/* Main Justice Scale Icon */}
           <ScaleIcon className="text-slate-900 w-[90px] h-[90px] md:w-[150px] md:h-[150px]" strokeWidth={1.2} />
           
           {/* Protection Shield Accent */}
           <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-slate-900 p-3 md:p-5 rounded-full border-4 border-[#c5a059] shadow-lg">
               <ShieldCheck className="text-[#c5a059] w-[24px] h-[24px] md:w-[36px] md:h-[36px]" strokeWidth={2}/>
           </div>
           
       </div>
   </div>
</div>
         </div>
      </header>

      {/* 2. THREE COLORED CARDS */}
      <section className="relative z-20 -mt-16 md:-mt-24 px-4 md:px-0">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 shadow-2xl reveal-modern delay-200">
             <div className="bg-[#fdfaf5] p-10 md:p-12 text-center group hover:-translate-y-2 transition duration-300 border-b-4 border-transparent hover:border-[#c5a059]">
                <div className="text-[#c5a059] mb-4 flex justify-center group-hover:scale-110 transition"><ClipboardList size={48}/></div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">Case Evaluation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Submit your case details for a preliminary assessment by our legal experts to understand your position.</p>
             </div>
             <div className="bg-[#cfa660] p-10 md:p-12 text-center group hover:-translate-y-2 transition duration-300 relative overflow-hidden border-b-4 border-transparent hover:border-white">
                <div className="text-white mb-4 flex justify-center group-hover:scale-110 transition"><Search size={48}/></div>
                <h3 className="text-xl font-serif font-bold text-white mb-3">Legal Investigation</h3>
                <p className="text-white/90 text-sm leading-relaxed">We conduct thorough factual and legal investigations to build a strong foundation for your case strategy.</p>
             </div>
             <div className="bg-[#2a2520] p-10 md:p-12 text-center group hover:-translate-y-2 transition duration-300 border-b-4 border-transparent hover:border-[#c5a059]">
                <div className="text-[#c5a059] mb-4 flex justify-center group-hover:scale-110 transition"><Gavel size={48}/></div>
                <h3 className="text-xl font-serif font-bold text-white mb-3">Court Representation</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Aggressive and strategic representation in trial and appellate courts to fight for the best possible outcome.</p>
             </div>
          </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-20 md:py-28 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
             <div className="relative reveal-modern h-full min-h-[400px] md:min-h-[500px]">
                 <div className="absolute top-4 left-4 w-full h-full border-4 border-[#c5a059] rounded-sm -z-10"></div>
                 <img src="/head.jpg" alt="Advocate Azadur Rahman" className="w-full h-full object-contain shadow-lg rounded-sm grayscale hover:grayscale-0 transition duration-700 bg-gray-50"/>
                 <div className="absolute bottom-10 left-[-10px] bg-soft-blue-solid text-white p-6 md:p-8 max-w-[220px] shadow-2xl border-t-4 border-[#c5a059]">
                    <span className="block text-5xl font-serif font-bold text-[#c5a059]">{yearsOfService}+</span>
                    <span className="block text-sm uppercase font-bold mt-2 leading-tight">Years of Professional Service</span>
                 </div>
             </div>
             <div className="space-y-6 reveal-modern delay-200">
                 <h4 className="text-[#c5a059] font-bold uppercase tracking-[0.2em] text-sm">About LexSword</h4>
                 <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">Integrity, Strategy, <br/> & Results.</h2>
                 <p className="text-gray-600 text-lg leading-relaxed">Founded in {establishedYear}, LexSword Chambers is led by Advocate Azadur Rahman of the Supreme Court of Bangladesh. We combine deep legal knowledge with a modern, client-focused approach.</p>
                 <p className="text-gray-500 leading-relaxed text-sm">Whether facing complex civil litigation, criminal charges, or corporate legal challenges, your voice should be heard and your rights should be protected under Bangladeshi law.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <ul className="space-y-3">
                        {['Supreme Court Practice', 'Strategic Defense', 'Transparent Process'].map((item,i) => (
                          <li key={i} className="flex items-center gap-3 font-bold text-slate-900">
                             <CheckCircle size={20} className="text-[#c5a059] shadow-sm rounded-full"/> {item}
                          </li>
                       ))}
                    </ul>
                 </div>
                 <div className="pt-4">
                   <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi0DwJoJmLaK_Afp4Vd_6MF4swNbTGUYveLivralUSYJ9sOqnb4JfyntWRIx8b9dv-8L2WreZYSmg9AwHxVP4n39sRyQkMtMYflgyrzD0pmpg21xIlXfHVfQdylAurZGt2NXe53sHDuxaOsSMC99aQHfMpRaH8FMKqaRSqpA2ei-lDsMWlzc8YzCZ4blLG2/s320/signature-removebg-preview.png" alt="Signature" className="h-16 opacity-60 filter grayscale"/>
                 </div>
             </div>
         </div>
      </section>

      {/* 4. AREAS OF PRACTICE */}
      <section id="practice" className="py-24 bg-soft-blue-solid relative overflow-hidden">
         <div className="absolute -top-24 -right-24 p-4 opacity-5 pointer-events-none text-white"><Scale size={500}/></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal-modern">
               <div>
                  <h4 className="text-[#c5a059] font-bold uppercase tracking-[0.2em] text-sm mb-2">Our Expertise</h4>
                  <h2 className="text-4xl font-serif font-bold text-white">Areas of Practice</h2>
                  <div className="w-20 h-1 bg-[#c5a059] mt-4"></div>
               </div>
               <p className="text-gray-300 max-w-md text-sm mt-4 md:mt-0">Specialized legal services tailored to meet complex challenges in the Bangladeshi legal landscape.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-modern delay-100">
               {practiceAreas.map((item, i) => (
                  <div key={i} className="bg-[#2a3447] p-8 group hover:bg-[#c5a059] transition duration-500 cursor-pointer border-b-4 border-transparent hover:border-white shadow-lg rounded-sm hover:-translate-y-1">
                     <div className="text-[#c5a059] group-hover:text-white transition mb-6"><item.icon size={40}/></div>
                     <h3 className="text-xl font-serif font-bold text-white mb-3">{item.title}</h3>
                     <p className="text-gray-400 group-hover:text-white/90 transition text-sm leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

     

      {/* 6. TEAM SECTION */}
      <section id="team" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6 text-center mb-16 reveal-modern">
            <h4 className="text-[#c5a059] font-bold uppercase tracking-[0.2em] text-sm mb-2">The Team</h4>
            <h2 className="text-4xl font-serif font-bold text-slate-900">Our Legal Experts</h2>
            <div className="w-16 h-1 bg-[#c5a059] mx-auto mt-4"></div>
         </div>
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6 reveal-modern delay-200">
             <div className="group relative bg-white shadow-xl rounded-sm overflow-hidden hover:-translate-y-2 transition duration-300">
                 <div className="overflow-hidden h-[350px]">
                   <img src="/head.jpg" alt="Adv. Azadur Rahman" className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"/>
                 </div>
                 <div className="bg-soft-blue-solid text-white p-6 text-center relative z-10 border-b-4 border-[#c5a059]">
                    <h3 className="text-lg font-serif font-bold truncate">Adv. Azadur Rahman</h3>
                    <p className="text-[#c5a059] text-xs uppercase tracking-wider mt-1 font-bold">Head of Chamber</p>
                    <p className="text-gray-400 text-[10px] mt-1">Supreme Court of Bangladesh</p>
                 </div>
             </div>
             <div className="group relative bg-white shadow-xl rounded-sm overflow-hidden hover:-translate-y-2 transition duration-300">
                 <div className="overflow-hidden h-[350px]">
                    <img src="/team1.jpg" alt="Senior Associate" className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 bg-gray-200"/>
                 </div>
                 <div className="bg-white text-slate-900 p-6 text-center relative z-10 border-b-4 border-[#c5a059] group-hover:bg-soft-blue-solid group-hover:text-white transition">
                    <h3 className="text-lg font-serif font-bold truncate">Adv. Anisur Rahman</h3>
                    <p className="text-[#c5a059] text-xs uppercase tracking-wider mt-1 font-bold">Senior Associate</p>
                    <p className="text-gray-500 group-hover:text-gray-300 text-[10px] mt-1">Judge Court</p>
                 </div>
             </div>
             <div className="group relative bg-white shadow-xl rounded-sm overflow-hidden hover:-translate-y-2 transition duration-300">
                 <div className="overflow-hidden h-[350px]">
                    <img src="/team2.jpg" alt="Associate" className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 bg-gray-200"/>
                 </div>
                 <div className="bg-white text-slate-900 p-6 text-center relative z-10 border-b-4 border-[#c5a059] group-hover:bg-soft-blue-solid group-hover:text-white transition">
                    <h3 className="text-lg font-serif font-bold truncate">Adv. Abdur Razzak</h3>
                    <p className="text-[#c5a059] text-xs uppercase tracking-wider mt-1 font-bold">Associate Lawyer</p>
                    <p className="text-gray-500 group-hover:text-gray-300 text-[10px] mt-1">High Court Division</p>
                 </div>
             </div>
              <div className="group relative bg-white shadow-xl rounded-sm overflow-hidden hover:-translate-y-2 transition duration-300">
                 <div className="overflow-hidden h-[350px]">
                    <img src="/team3.jpg" alt="Associate" className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 bg-gray-200"/>
                 </div>
                 <div className="bg-white text-slate-900 p-6 text-center relative z-10 border-b-4 border-[#c5a059] group-hover:bg-soft-blue-solid group-hover:text-white transition">
                    <h3 className="text-lg font-serif font-bold truncate">Adv. Tariqul Islam</h3>
                    <p className="text-[#c5a059] text-xs uppercase tracking-wider mt-1 font-bold">Associate Lawyer</p>
                    <p className="text-gray-500 group-hover:text-gray-300 text-[10px] mt-1">Judge Court</p>
                 </div>
             </div>
         </div>
      </section>

    {/* 8. LEGAL PUBLICATIONS & BOOKS (Replaces Testimonials) */}
      <section className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-6 text-center mb-16 reveal-modern">
             <h4 className="text-[#c5a059] font-bold uppercase tracking-[0.2em] text-sm mb-2">Legal Resources</h4>
             <h2 className="text-4xl font-serif font-bold text-slate-900">Publications & Books</h2>
             <div className="w-16 h-1 bg-[#c5a059] mx-auto mt-4"></div>
             <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">A collection of highly acclaimed legal manuals and practice guides authored by Adv. Azadur Rahman, designed to assist legal professionals.</p>
         </div>
         
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 reveal-modern delay-100">
             
             {/* Book 1 */}
             <div className="bg-white p-8 shadow-xl border-t-4 border-[#c5a059] rounded-sm hover:-translate-y-2 transition duration-300 flex flex-col">
                <div className="text-[#c5a059] mb-6 flex justify-center"><BookOpen size={48} strokeWidth={1.5}/></div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 text-center">Judge Court Practice Manual</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed text-center">A highly acclaimed, hands-on guide featuring practical procedures, filing methods, and drafting samples for subordinate courts.</p>
                <div className="mt-auto pt-4 border-t border-gray-100 text-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Author: Adv. Azadur Rahman</span>
                </div>
             </div>
             
             {/* Book 2 */}
             <div className="bg-white p-8 shadow-xl border-t-4 border-slate-800 rounded-sm hover:-translate-y-2 transition duration-300 flex flex-col">
                <div className="text-slate-800 mb-6 flex justify-center"><Landmark size={48} strokeWidth={1.5}/></div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 text-center">High Court Practice Manual</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed text-center">A comprehensive two-part (Part 1 & 2) manual teaching High Court filing, procedures, and practical drafting with real-world samples.</p>
                <div className="mt-auto pt-4 border-t border-gray-100 text-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Author: Adv. Azadur Rahman</span>
                </div>
             </div>
             
             {/* Book 3 */}
             <div className="bg-white p-8 shadow-xl border-t-4 border-[#c5a059] rounded-sm hover:-translate-y-2 transition duration-300 flex flex-col">
                <div className="text-[#c5a059] mb-6 flex justify-center"><TrendingUp size={48} strokeWidth={1.5}/></div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 text-center">Judge Court to High Court</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed text-center">An engaging, narrative-driven guide explaining the step-by-step journey of taking a case from the lower courts to the High Court Division.</p>
                <div className="mt-auto pt-4 border-t border-gray-100 text-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Author: Adv. Azadur Rahman</span>
                </div>
             </div>

             {/* Book 4 */}
             <div className="bg-white p-8 shadow-xl border-t-4 border-slate-800 rounded-sm hover:-translate-y-2 transition duration-300 flex flex-col">
                <div className="text-slate-800 mb-6 flex justify-center"><Award size={48} strokeWidth={1.5}/></div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 text-center">How to Win a Case</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed text-center">An insightful exploration of litigation strategies, courtroom tactics, and the hidden formulas for achieving legal victories.</p>
                <div className="mt-auto pt-4 border-t border-gray-100 text-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Author: Adv. Azadur Rahman</span>
                </div>
             </div>

             {/* Book 5 */}
             <div className="bg-white p-8 shadow-xl border-t-4 border-[#c5a059] rounded-sm hover:-translate-y-2 transition duration-300 flex flex-col">
                <div className="text-[#c5a059] mb-6 flex justify-center"><FileText size={48} strokeWidth={1.5}/></div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 text-center">Cheque Dishonour Manual</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed text-center">A Q&A based manual resolving complex legal issues in NI Act cases, backed by landmark judgments from the apex courts of Bangladesh and India.</p>
                <div className="mt-auto pt-4 border-t border-gray-100 text-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Author: Adv. Azadur Rahman</span>
                </div>
             </div>

             {/* Book 6 */}
             <div className="bg-white p-8 shadow-xl border-t-4 border-slate-800 rounded-sm hover:-translate-y-2 transition duration-300 flex flex-col">
                <div className="text-slate-800 mb-6 flex justify-center"><Briefcase size={48} strokeWidth={1.5}/></div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 text-center">Appellate Division Case Reference</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed text-center">An up-to-date, authoritative compilation of landmark Civil and Criminal precedents established by the Appellate Division.</p>
                <div className="mt-auto pt-4 border-t border-gray-100 text-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Author: Adv. Azadur Rahman</span>
                </div>
             </div>

         </div>
      </section>
    

       {/* Contact / Consultation Form */}
       <section id="contact" className="py-24 bg-white relative">
         <div className="max-w-7xl mx-auto px-6 reveal-modern">
            <div className="bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row">
               <div className="bg-soft-blue-solid p-12 md:w-2/5 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 opacity-10 text-[#c5a059]"><Scale size={200}/></div>
                  <div className="relative z-10">
                     <h3 className="text-3xl font-serif font-bold mb-2">Get In Touch</h3>
                     <p className="text-gray-400 mb-8">Contact us for a free initial case evaluation.</p>
                     <div className="space-y-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-sm bg-[#c5a059] flex items-center justify-center text-slate-900 shrink-0"><Phone size={24}/></div>
                           <div>
                              <p className="text-xs text-[#c5a059] uppercase font-bold">Phone</p>
                              <p className="text-xl font-bold">+88 01911 008 518</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-sm bg-[#c5a059] flex items-center justify-center text-slate-900 shrink-0"><Mail size={24}/></div>
                           <div className="overflow-hidden">
                              <p className="text-xs text-[#c5a059] uppercase font-bold">Email</p>
                              <p className="text-lg font-bold truncate">lexsword.bd@gmail.com</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-4">
                           <div className="w-12 h-12 rounded-sm bg-[#c5a059] flex items-center justify-center text-slate-900 shrink-0"><MapPin size={24}/></div>
                           <div>
                              <p className="text-xs text-[#c5a059] uppercase font-bold">Chamber Location</p>
                              <p className="text-lg font-bold leading-tight">Supreme Court Bar<br/>Association, Dhaka</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="p-12 md:w-3/5 bg-gray-50">
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">Request A Consultation</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid md:grid-cols-2 gap-6">
                        <input name="name" type="text" placeholder="Your Full Name" className="w-full bg-white border border-gray-300 p-4 outline-none focus:border-[#c5a059] text-sm rounded-sm font-medium text-slate-900" required/>
                        <input name="phone" type="tel" placeholder="Phone Number" className="w-full bg-white border border-gray-300 p-4 outline-none focus:border-[#c5a059] text-sm rounded-sm font-medium text-slate-900" required/>
                     </div>
                     <div className="grid md:grid-cols-2 gap-6">
                        <input name="email" type="email" placeholder="Email Address (Optional)" className="w-full bg-white border border-gray-300 p-4 outline-none focus:border-[#c5a059] text-sm rounded-sm font-medium text-slate-900"/>
                        <select name="service" className="w-full bg-white border border-gray-300 p-4 outline-none focus:border-[#c5a059] text-sm rounded-sm font-medium text-slate-500">
                           <option value="">Select Matter Type</option>
                           {practiceAreas.map((item, i) => <option key={i}>{item.title}</option>)}
                           <option>Other</option>
                         </select>
                     </div>
                     <textarea name="message" rows="4" placeholder="Briefly describe your case..." className="w-full bg-white border border-gray-300 p-4 outline-none focus:border-[#c5a059] text-sm rounded-sm font-medium text-slate-900"></textarea>
                     <button type="submit" disabled={isSubmitting} className="bg-soft-blue-solid text-white px-10 py-4 rounded-sm font-bold tracking-widest hover:bg-[#c5a059] hover:text-slate-900 transition uppercase w-full md:w-auto flex justify-center items-center gap-2 shadow-lg">
                        {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : "Submit Request"}
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-soft-blue-solid text-gray-400 pt-20 pb-10 border-t-4 border-[#c5a059] relative z-10">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 mb-12 text-sm">
            <div>
               <div className="flex items-center gap-3 text-white mb-6">
                  <div className="p-2 border-2 border-[#c5a059] rounded-full"><Scale size={20} className="text-[#c5a059]"/></div>
                  <span className="text-2xl font-serif font-bold tracking-widest">LEXSWORD</span>
               </div>
               <p className="mb-6 leading-relaxed">Dedicated to providing top-tier legal services in Bangladesh with integrity, professionalism, and a results-driven approach since {establishedYear}.</p>
               <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#c5a059] hover:border-[#c5a059] hover:text-white transition">Fb</a>
                  <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#c5a059] hover:border-[#c5a059] hover:text-white transition">Li</a>
               </div>
            </div>
            <div>
               <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Practice Areas</h4>
               <ul className="space-y-3">
                  {practiceAreas.slice(0,5).map((item, i) => (
                    <li key={i}><a href="#practice" className="hover:text-[#c5a059] transition flex items-center gap-2"><ChevronRight size={14} className="text-[#c5a059]"/> {item.title}</a></li>
                  ))}
               </ul>
             </div>
            <div>
               <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Quick Links</h4>
               <ul className="space-y-3">
                  <li><a href="#home" className="hover:text-[#c5a059] transition flex items-center gap-2"><ChevronRight size={14} className="text-[#c5a059]"/> Home</a></li>
                  <li><a href="#about" className="hover:text-[#c5a059] transition flex items-center gap-2"><ChevronRight size={14} className="text-[#c5a059]"/> About Us</a></li>
                  <li><a href="#team" className="hover:text-[#c5a059] transition flex items-center gap-2"><ChevronRight size={14} className="text-[#c5a059]"/> Our Team</a></li>
                  <li><a href="#contact" className="hover:text-[#c5a059] transition flex items-center gap-2"><ChevronRight size={14} className="text-[#c5a059]"/> Contact</a></li>
                  <li><a href="#" className="hover:text-[#c5a059] transition flex items-center gap-2"><ChevronRight size={14} className="text-[#c5a059]"/> Privacy Policy</a></li>
               </ul>
            </div>
            <div>
               <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Contact Info</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                     <MapPin size={20} className="text-[#c5a059] shrink-0 mt-1"/>
                     <span>Supreme Court Bar Association, Dhaka, Bangladesh</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <Phone size={20} className="text-[#c5a059] shrink-0"/>
                     <a href="tel:+8801911008518" className="hover:text-[#c5a059] transition">+88 01911 008 518</a>
                  </li>
                  <li className="flex items-center gap-3">
                     <Mail size={20} className="text-[#c5a059] shrink-0"/>
                     <a href="mailto:lexsword.bd@gmail.com" className="hover:text-[#c5a059] transition">lexsword.bd@gmail.com</a>
                  </li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; {currentYear} <span className="text-[#c5a059] font-bold">LexSword Chambers</span>. All Rights Reserved.</p>
         </div>
      </footer>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-sm shadow-2xl w-full max-w-md border-t-4 border-[#c5a059] text-center animate-[bounce-in_0.5s]">
             <div className="mb-4 flex justify-center"><CheckCircle size={64} className="text-green-500"/></div>
             <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Submission Received</h3>
             <p className="text-gray-600 mb-6">Thank you for contacting LexSword. We will get back to you shortly.</p>
             <button onClick={() => setShowSuccessModal(false)} className="bg-soft-blue-solid text-white px-8 py-3 rounded-sm font-bold hover:bg-[#c5a059] hover:text-slate-900 transition uppercase tracking-wider w-full">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ==============================================================================
// 2. DASHBOARD & MODULES 
// ==============================================================================

// --- NEW UPDATED CLIENT DASHBOARD ---
const ClientDashboard = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [myCases, setMyCases] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters & State
  const [searchTerm, setSearchTerm] = useState(''); 
  const [mainCaseTab, setMainCaseTab] = useState('judge'); 
  const [caseFilter, setCaseFilter] = useState('all');
  
  // Modals & Document States
  const [modalMode, setModalMode] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [historyLog, setHistoryLog] = useState([]);
  const [documents, setDocuments] = useState([]);

  // Calendar
  const [calendarDate, setCalendarDate] = useState(new Date());
  
  useEffect(() => {
    fetchClientData();
  }, [session]);

  const fetchClientData = async () => {
    const { data: profile } = await supabase.from('profiles').select('mobile_no').eq('id', session.user.id).single();
    if (profile && profile.mobile_no) {
      const { data: cases } = await supabase.from('cases').select('*').eq('client_mobile', profile.mobile_no).order('next_date', { ascending: true });
      setMyCases(cases || []);
    }
    setLoading(false);
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
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + offset, 1));
  };

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
  
  const getCounts = (tab) => {
    const activeList = myCases.filter(c => tab === 'judge' ? c.court_type === 'Judge Court' : c.court_type === 'High Court');
    return {
        all: activeList.length,
        today: activeList.filter(c => c.next_date === today).length,
        tomorrow: activeList.filter(c => c.next_date === tomorrow).length,
        week: activeList.filter(c => c.next_date >= sunday && c.next_date <= thursday).length,
        update: activeList.filter(c => c.next_date < today && c.status === 'Ongoing').length,
        disposed: activeList.filter(c => c.status === 'Disposed').length,
        pending: activeList.filter(c => c.status === 'Ongoing').length,
        writ: activeList.filter(c => c.case_nature === 'Writ Petition').length,
        civilRev: activeList.filter(c => c.case_nature === 'Civil Revision').length,
        crimRev: activeList.filter(c => c.case_nature === 'Criminal Revision').length,
        civilApp: activeList.filter(c => c.case_nature === 'Civil Appeal').length,
        crimApp: activeList.filter(c => c.case_nature === 'Criminal Appeal').length,
        misc: activeList.filter(c => c.case_nature === 'Misc Case').length,
    };
  };

  const currentCounts = getCounts(mainCaseTab);

  const getFilteredCases = () => {
    let result = myCases.filter(c => 
      (c.case_no && c.case_no.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.party_name && c.party_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    result = result.filter(c => c.court_type === (mainCaseTab === 'judge' ? 'Judge Court' : 'High Court'));
    if (caseFilter === 'today') result = result.filter(c => c.next_date === today);
    else if (caseFilter === 'tomorrow') result = result.filter(c => c.next_date === tomorrow);
    else if (caseFilter === 'week') result = result.filter(c => c.next_date >= sunday && c.next_date <= thursday);
    else if (caseFilter === 'update') result = result.filter(c => c.next_date < today && c.status === 'Ongoing');
    else if (caseFilter === 'disposed') result = result.filter(c => c.status === 'Disposed');
    else if (caseFilter === 'pending') result = result.filter(c => c.status === 'Ongoing');
    else if (caseFilter !== 'all') {
        result = result.filter(c => c.case_nature === caseFilter);
    }
    return result;
  };

  return (
    <div className="lex-dashboard lex-client-dashboard flex h-screen bg-slate-100 font-sans overflow-hidden text-slate-900">
      
      {/* Mobile Dark Overlay */}
      {mobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>}

      <aside className={`lex-sidebar fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static no-print`}>
        <div className="p-6 text-2xl font-bold font-serif text-[#c5a059] border-b border-slate-800 tracking-wider flex justify-between items-center">
          CHAMBERS <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(false)}><X size={24}/></button>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          <button onClick={() => {setActiveTab('dashboard'); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'dashboard' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <Gavel size={20}/> My Cases
          </button>
          <button onClick={() => {setActiveTab('calendar'); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'calendar' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <CalIcon size={20}/> Calendar View
          </button>
        </nav>
        <button onClick={onLogout} className="m-4 p-3 flex items-center gap-2 text-red-400 hover:bg-slate-800 rounded"><LogOut size={20}/> Logout</button>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lex-mobile-topbar md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md shrink-0 no-print">
           <span className="font-bold font-serif text-[#c5a059]">My Case Portal</span>
           <button onClick={() => setMobileMenuOpen(true)}><Menu size={24}/></button>
        </div>

        <main className="lex-main flex-1 overflow-y-auto relative p-4 md:p-6 print-container">
          
          {activeTab === 'dashboard' && (
            <div>
              <section className="lex-overview-hero">
                <div className="lex-overview-copy">
                  <p className="lex-overview-kicker">LEXSWORD · LEGAL CASE MANAGEMENT</p>
                  <h2 className="text-2xl md:text-3xl font-bold">My Case Dashboard</h2>
                  <p>Keep your hearings, case status and important dates in one place.</p>
                </div>
                <div className="lex-overview-side">
                  <div className="lex-overview-total">
                    <span>Cases listed</span>
                    <strong>{currentCounts.all}</strong>
                    <small>{mainCaseTab === 'judge' ? 'Judge Court' : 'High Court'}</small>
                  </div>
                </div>
              </section>

              <section className="lex-stat-grid" aria-label="Case summary">
                <div className="lex-stat-card"><div><span className="lex-stat-label">Total cases</span><strong>{currentCounts.all}</strong><small>Selected court</small></div><Gavel className="lex-stat-icon lex-icon-blue" size={24}/></div>
                <div className="lex-stat-card"><div><span className="lex-stat-label">Pending cases</span><strong>{currentCounts.pending}</strong><small>Ongoing matters</small></div><Clock className="lex-stat-icon lex-icon-gold" size={24}/></div>
                <div className="lex-stat-card"><div><span className="lex-stat-label">Hearings today</span><strong>{currentCounts.today}</strong><small>Scheduled for today</small></div><CalIcon className="lex-stat-icon lex-icon-green" size={24}/></div>
                <div className="lex-stat-card"><div><span className="lex-stat-label">Needs update</span><strong>{currentCounts.update}</strong><small>Past-date ongoing cases</small></div><AlertTriangle className="lex-stat-icon lex-icon-red" size={24}/></div>
              </section>

              <div className="lex-case-tabs flex gap-0 mb-4 border-b-2 border-slate-300">
                  <button onClick={() => { setMainCaseTab('judge'); setCaseFilter('all'); }} className={`px-6 py-3 font-bold text-lg transition-all ${mainCaseTab === 'judge' ? 'border-b-4 border-[#c5a059] text-slate-900 bg-white' : 'text-gray-500 hover:text-slate-700'}`}>
                      Judge Court ({getCounts('judge').all})
                  </button>
                  <button onClick={() => { setMainCaseTab('high'); setCaseFilter('all'); }} className={`px-6 py-3 font-bold text-lg transition-all ${mainCaseTab === 'high' ? 'border-b-4 border-[#c5a059] text-slate-900 bg-white' : 'text-gray-500 hover:text-slate-700'}`}>
                      High Court ({getCounts('high').all})
                  </button>
              </div>

              <div className="lex-case-search mb-4 relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20}/>
                  <input type="text" placeholder="Search by Case No or Party Name..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded focus:border-[#c5a059] outline-none text-slate-900" onChange={(e) => setSearchTerm(e.target.value)}/>
              </div>

              <div className="lex-filter-row flex flex-wrap gap-2 mb-6">
                {mainCaseTab === 'judge' ? (
                    <>
                        <button onClick={() => setCaseFilter('all')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'all' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>All <span className="lex-filter-count">{currentCounts.all}</span></button>
                        <button onClick={() => setCaseFilter('pending')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'pending' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Pending <span className="lex-filter-count">{currentCounts.pending}</span></button>
                        <button onClick={() => setCaseFilter('disposed')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'disposed' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Disposed <span className="lex-filter-count">{currentCounts.disposed}</span></button>
                        <button onClick={() => setCaseFilter('today')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'today' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Today <span className="lex-filter-count">{currentCounts.today}</span></button>
                        <button onClick={() => setCaseFilter('tomorrow')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'tomorrow' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Tomorrow <span className="lex-filter-count">{currentCounts.tomorrow}</span></button>
                        <button onClick={() => setCaseFilter('week')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'week' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>This Week <span className="lex-filter-count">{currentCounts.week}</span></button>
                        <button onClick={() => setCaseFilter('update')} className={`px-3 py-1 rounded-full text-sm font-bold border transition ${caseFilter === 'update' || currentCounts.update > 0 ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600'}`}>Needs Update <span className="lex-filter-count">{currentCounts.update}</span></button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setCaseFilter('all')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'all' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>All <span className="lex-filter-count">{currentCounts.all}</span></button>
                        <button onClick={() => setCaseFilter('pending')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'pending' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Pending <span className="lex-filter-count">{currentCounts.pending}</span></button>
                        <button onClick={() => setCaseFilter('disposed')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'disposed' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Disposed <span className="lex-filter-count">{currentCounts.disposed}</span></button>
                        <button onClick={() => setCaseFilter('update')} className={`px-3 py-1 rounded-full text-sm font-bold border transition ${caseFilter === 'update' || currentCounts.update > 0 ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600'}`}>Needs Update <span className="lex-filter-count">{currentCounts.update}</span></button>
                        <button onClick={() => setCaseFilter('Writ Petition')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Writ Petition' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Writ <span className="lex-filter-count">{currentCounts.writ}</span></button>
                        <button onClick={() => setCaseFilter('Civil Revision')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Civil Revision' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Civil Rev <span className="lex-filter-count">{currentCounts.civilRev}</span></button>
                        <button onClick={() => setCaseFilter('Criminal Revision')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Criminal Revision' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Crim Rev <span className="lex-filter-count">{currentCounts.crimRev}</span></button>
                        <button onClick={() => setCaseFilter('Civil Appeal')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Civil Appeal' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Civil Appeal <span className="lex-filter-count">{currentCounts.civilApp}</span></button>
                        <button onClick={() => setCaseFilter('Criminal Appeal')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Criminal Appeal' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Crim Appeal <span className="lex-filter-count">{currentCounts.crimApp}</span></button>
                        <button onClick={() => setCaseFilter('Misc Case')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Misc Case' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Misc <span className="lex-filter-count">{currentCounts.misc}</span></button>
                    </>
                )}
              </div>

              <div className="lex-case-list grid gap-4">
                {getFilteredCases().length === 0 && <p className="text-slate-500 italic">No cases found.</p>}
                {getFilteredCases().map(c => (
                  <div key={c.id} className="lex-case-card bg-white p-4 md:p-5 rounded-lg shadow border-l-4 border-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 transition">
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
                      <p className="text-lg font-bold text-red-600">{c.next_date ? c.next_date.split('-').reverse().join('-') : ''}</p>
                      <p className="text-xs font-bold text-[#c5a059] uppercase">{c.current_step}</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                      <button onClick={() => { setSelectedCase(c); setModalMode('viewCase'); }} className="p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 font-bold flex items-center gap-2 px-4"><Eye size={18}/> View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="lex-calendar-panel bg-white p-4 md:p-6 rounded shadow h-full flex flex-col text-slate-900">
              <div className="lex-calendar-toolbar flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                  <h2 className="text-2xl font-bold">Monthly Schedule</h2>
                  <div className="lex-calendar-controls flex items-center gap-4 bg-slate-200 p-2 rounded text-slate-900">
                    <button aria-label="Previous month" onClick={() => changeMonth(-1)} className="lex-calendar-arrow p-2 hover:bg-slate-300 rounded"><ChevronLeft/></button>
                    <button onClick={() => setCalendarDate(new Date())} className="lex-calendar-jump-today">Today</button>
                    <span className="font-bold text-lg w-36 text-center">{calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                    <button aria-label="Next month" onClick={() => changeMonth(1)} className="lex-calendar-arrow p-2 hover:bg-slate-300 rounded"><ChevronRight/></button>
                  </div>
              </div>
              <div className="lex-calendar-weekdays grid grid-cols-7 gap-1 font-bold text-center bg-slate-200 text-slate-900 p-2 rounded mb-2 text-xs md:text-base">
                  <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
              </div>
              <div className="lex-calendar-grid grid grid-cols-7 gap-1 md:gap-2 flex-1">
                  {[...Array(42)].map((_, i) => {
                    const year = calendarDate.getFullYear();
                    const month = calendarDate.getMonth();
                    const firstDay = new Date(year, month, 1).getDay();
                    const d = new Date(year, month, 1 + i - firstDay);
                    const dateStr = getLocalStr(d);
                    const isCurrentMonth = d.getMonth() === month;
                    const hasCase = myCases.filter(c => c.next_date === dateStr);
                    return (
                      <div key={i} className={`lex-calendar-cell border p-1 md:p-2 h-24 md:h-32 rounded-lg flex flex-col transition-all ${dateStr === today ? 'lex-calendar-today' : ''} ${!isCurrentMonth ? 'bg-slate-50 opacity-50' : hasCase.length > 0 ? 'bg-white border-red-200 shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                        <div className="flex justify-between items-start mb-1.5">
                           <span className={`text-xs md:text-sm font-bold ${isCurrentMonth ? 'text-slate-900' : 'text-slate-400'}`}>{d.getDate()}</span>
                        </div>
                        <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                          {isCurrentMonth && hasCase.map(c => (
                            <div key={c.id} onClick={(e) => { e.stopPropagation(); setSelectedCase(c); setModalMode('viewCase'); }} className="lex-calendar-event text-[10px] md:text-xs truncate bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded cursor-pointer hover:bg-red-600 hover:text-white transition-colors font-semibold shadow-sm flex items-center gap-1.5" title={`${c.case_no} - ${c.party_name}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span> 
                              <span className="truncate">{c.case_no}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}

        </main>
      </div>

      <nav className="lex-bottom-nav no-print" aria-label="Mobile navigation" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <button className={activeTab === 'dashboard' ? 'is-active' : ''} onClick={() => setActiveTab('dashboard')}><Gavel size={19}/><span>My Cases</span></button>
        <button className={activeTab === 'calendar' ? 'is-active' : ''} onClick={() => setActiveTab('calendar')}><CalIcon size={19}/><span>Calendar</span></button>
        <button onClick={() => setMobileMenuOpen(true)}><Menu size={19}/><span>More</span></button>
      </nav>

      {/* --- CLIENT MODALS --- */}
      {modalMode === 'viewCase' && selectedCase && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-slate-900">
             <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2">Case Record: {selectedCase.case_no}</h3>
                <button onClick={() => setModalMode(null)}><X/></button>
             </div>
             <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6 text-sm bg-slate-50 p-4 rounded border">
                       <div>
                          <p className="text-slate-500 font-bold uppercase text-xs">Court Info</p>
                          <p className="font-bold text-lg text-slate-900">{selectedCase.court_name}</p>
                          <p className="text-slate-700">{selectedCase.court_type} - {selectedCase.case_nature}</p>
                          
                          {/* --- High Court Fields --- */}
                          {selectedCase.court_type === 'High Court' && (
                             <div className="mt-2 pt-2 border-t border-slate-200">
                                <p className="text-[10px] font-bold text-slate-500 uppercase">District</p>
                                <p className="font-semibold text-slate-800">{selectedCase.district_name || 'N/A'}</p>
                             </div>
                          )}
                       </div>
                       <div>
                          <p className="text-slate-500 font-bold uppercase text-xs">Parties</p>
                          <p className="font-bold text-lg text-slate-900">{selectedCase.party_name}</p>

                          {/* --- High Court Fields --- */}
                          {selectedCase.court_type === 'High Court' && (
                             <div className="mt-2 pt-2 border-t border-slate-200">
                                <p className="text-[10px] font-bold text-slate-500 uppercase">On Behalf Of</p>
                                <p className="font-semibold text-slate-800">{selectedCase.on_behalf_of || 'N/A'}</p>
                             </div>
                          )}
                       </div>
                       <div>
                          <p className="text-slate-500 font-bold uppercase text-xs">Status</p>
                          <p className="text-lg font-bold text-red-600">{selectedCase.next_date ? selectedCase.next_date.split('-').reverse().join('-') : ''}</p>
                          <p className="text-slate-900">{selectedCase.current_step}</p>
                       {selectedCase.note && <p className="text-sm text-slate-700 mt-3 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">{selectedCase.note}</p>}
                       </div>
                       <div className="flex items-end">
                          <button onClick={() => { fetchHistory(selectedCase.id); setModalMode('history'); }} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded text-xs font-bold hover:bg-[#c5a059] transition">
                             <History size={16}/> VIEW HISTORY
                          </button>
                       </div>
                    </div>
                <div>
                   <div className="flex justify-between items-center mb-4 border-b pb-2">
                     <h4 className="font-bold text-lg flex items-center gap-2 text-slate-900"><FolderOpen className="text-[#c5a059]"/> Professional Digital Case File Manager</h4>
                     <button onClick={() => fetchDocuments(selectedCase.id)} className="text-xs underline text-slate-600">Sync Files</button>
                   </div>
                   <div className="space-y-2 mt-4">
                      {documents.map(d => (
                         <div key={d.id} className="flex justify-between items-center bg-slate-50 border p-3 rounded">
                             <div className="flex items-center gap-3">
                               <Folder className="text-yellow-500" size={18}/>
                               <div><p className="font-bold text-sm text-slate-900">{d.folder_type}</p><p className="text-xs text-slate-500">{d.doc_name}</p></div>
                             </div>
                            <a href={d.drive_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 font-bold text-xs border border-blue-200 px-3 py-1 rounded hover:bg-blue-50">OPEN <ExternalLink size={12}/></a>
                         </div>
                       ))}
                      {documents.length === 0 && <p className="text-sm text-slate-500 italic">No documents available.</p>}
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {modalMode === 'history' && (
         <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-5 no-print">
            <div className="lex-history-modal bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
               <div className="lex-history-modal-header"><div><p>LEXSWORD · PROCEEDINGS</p><h3>Case history log</h3><span>{selectedCase?.case_no || 'Case record'}</span></div><button aria-label="Back to case details" onClick={() => setModalMode('viewCase')}><ChevronLeft/></button></div>
               <div className="lex-history-modal-body custom-scrollbar">
                  {historyLog.length === 0 && <div className="lex-case-history-empty"><History size={24}/><strong>No history entries</strong><span>নতুন তারিখ ও পদক্ষেপ আপডেট করার সময় আদেশের সারাংশ সংরক্ষণ হবে।</span></div>}
                  {historyLog.map((h, i) => (
                     <article key={h.id || i} className="lex-history-log-entry">
                        <div className="lex-history-log-top"><strong>{(h.order_date || h.prev_date) ? (h.order_date || h.prev_date).split('-').reverse().join('-') : 'Date not recorded'}</strong><span>{h.recorded_at ? new Date(h.recorded_at).toLocaleString('en-GB') : 'Recorded date unavailable'}</span></div>
                        {(h.prev_date || h.prev_step) && <div className="lex-history-transition"><span>Previous listing</span><strong>{h.prev_date ? h.prev_date.split('-').reverse().join('-') : '—'} · {h.prev_step || 'Step not recorded'}</strong></div>}
                        {(h.new_date || h.new_step) && <div className="lex-history-transition is-new"><span>Next listing</span><strong>{h.new_date ? h.new_date.split('-').reverse().join('-') : '—'} · {h.new_step || 'Step not recorded'}</strong></div>}
                        {h.note && <p className="lex-history-log-note">{h.note}</p>}
                        {h.updated_by_email && <small className="lex-history-actor">Updated by {h.updated_by_email}</small>}
                     </article>
                  ))}
               </div>
            </div>
         </div>
      )}

    </div>
  );
};


// --- Admin Dashboard ---
const AdminDashboard = ({ session, userRole, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refresh, setRefresh] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Security check for Admin rights (makes it case insensitive and removes spaces)
  const role = (userRole || '').trim().toLowerCase();
  const isAdmin = role === 'admin';

  // Data States
  const [cases, setCases] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [tasks, setTasks] = useState([]); 
  const [historyLog, setHistoryLog] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loanTab, setLoanTab] = useState('Taken');
  
  // Filters
  const [searchTerm, setSearchTerm] = useState(''); 
  const [mainCaseTab, setMainCaseTab] = useState('judge'); 
  const [caseFilter, setCaseFilter] = useState('all');
  const [taskFilter, setTaskFilter] = useState('pending');
   
  // Accounts Filters
  const [accountSearch, setAccountSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
   
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(() => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  });
  const [modalMode, setModalMode] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [formData, setFormData] = useState({});
  const [newDoc, setNewDoc] = useState({ folder_type: 'Plaint (Arji)', doc_name: '', drive_link: '', id: null });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSavingTxn, setIsSavingTxn] = useState(false);
  const [isSavingCase, setIsSavingCase] = useState(false);
  const txnSaveLock = useRef(false);
  const caseSaveLock = useRef(false);
  const [txnReturnMode, setTxnReturnMode] = useState(null);
  const [financeReturnMode, setFinanceReturnMode] = useState(null);
  const [accountAudit, setAccountAudit] = useState([]);
  const [accountAuditLoading, setAccountAuditLoading] = useState(false);



  
  useEffect(() => { fetchAllData(); }, [refresh]);

  const fetchAllData = async () => {
    const { data: cData } = await supabase.from('cases').select('*').order('next_date', { ascending: true });
    setCases(cData || []);
    const { data: aData } = await supabase.from('accounts').select('*').order('date', { ascending: false });
    setAccounts(aData || []);
    const { data: tData } = await supabase.from('tasks').select('*').order('due_date', { ascending: true });
    setTasks(tData || []);
    const { data: lnData } = await supabase.from('loans').select('*').order('date', { ascending: false });
    setLoans(lnData || []);
  };

  const fetchHistory = async (caseId) => {
    setHistoryLog([]);
    const { data, error } = await supabase.from('case_history').select('*').eq('case_id', caseId).order('recorded_at', { ascending: false });
    if (error) { console.error('Unable to load case history:', error); return; }
    setHistoryLog(data || []);
  };

  const fetchDocuments = async (caseId) => {
    setDocuments([]);
    const { data, error } = await supabase.from('documents').select('*').eq('case_id', caseId).order('created_at', { ascending: false });
    if (error) { console.error('Unable to load case documents:', error); return; }
    setDocuments(data || []);
  };

  const openCaseDetails = (caseRecord) => {
    setSelectedCase(caseRecord);
    setHistoryLog([]);
    setDocuments([]);
    setNewDoc({ folder_type: 'Plaint (Arji)', doc_name: '', drive_link: '', id: null });
    fetchHistory(caseRecord.id);
    fetchDocuments(caseRecord.id);
    setModalMode('viewCase');
  };

  const changeMonth = (offset) => {
    const nextMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + offset, 1);
    setCalendarDate(nextMonth);
    const offsetMs = nextMonth.getTimezoneOffset() * 60000;
    setSelectedCalendarDate(new Date(nextMonth.getTime() - offsetMs).toISOString().slice(0, 10));
  };

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

  const addDaysToDateString = (dateStr, amount) => {
    const date = new Date(`${dateStr}T12:00:00`);
    date.setDate(date.getDate() + amount);
    return getLocalStr(date);
  };
  const selectedCalendarDateObject = new Date(`${selectedCalendarDate}T12:00:00`);
  const selectedCalendarDateLabel = selectedCalendarDateObject.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
  const selectedDateCases = cases.filter(c => c.next_date === selectedCalendarDate && c.status !== 'Disposed');
  const selectedDateTasks = tasks.filter(t => t.due_date === selectedCalendarDate && t.status !== 'Done');
  const calendarWeekDays = (() => {
    const start = new Date(`${selectedCalendarDate}T12:00:00`);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => { const date = new Date(start); date.setDate(start.getDate() + i); return date; });
  })();
  const agendaEndDate = addDaysToDateString(selectedCalendarDate, 30);
  const calendarAgendaItems = [
    ...cases.filter(c => c.next_date && c.next_date >= selectedCalendarDate && c.next_date <= agendaEndDate && c.status !== 'Disposed').map(c => ({ id: `case-${c.id}`, type: 'case', date: c.next_date, title: c.case_no || 'Case hearing', subtitle: c.party_name || c.court_name || '', detail: c.current_step || '', record: c })),
    ...tasks.filter(t => t.due_date && t.due_date >= selectedCalendarDate && t.due_date <= agendaEndDate && t.status !== 'Done').map(t => ({ id: `task-${t.id}`, type: 'task', date: t.due_date, title: t.title || 'Task', subtitle: t.details || '', detail: t.priority || 'Task', record: t }))
  ].sort((a, b) => a.date.localeCompare(b.date));
  const upcomingHearings = cases.filter(c => c.next_date && c.next_date >= today && c.status !== 'Disposed');
  const todaysHearings = cases.filter(c => c.next_date === today);
  const upcomingTasks = tasks.filter(t => t.due_date && t.due_date >= today && t.status !== 'Done');
  const overdueCaseReminders = cases.filter(c => c.next_date && c.next_date < today && c.status !== 'Disposed').sort((a, b) => a.next_date.localeCompare(b.next_date));
  const nearTermHearings = cases.filter(c => c.next_date && c.next_date >= today && c.next_date <= addDaysToDateString(today, 3) && c.status !== 'Disposed').sort((a, b) => a.next_date.localeCompare(b.next_date));
  const overdueTaskReminders = tasks.filter(t => t.due_date && t.due_date < today && t.status !== 'Done').sort((a, b) => a.due_date.localeCompare(b.due_date));
  const nearTermTaskReminders = tasks.filter(t => t.due_date && t.due_date >= today && t.due_date <= addDaysToDateString(today, 3) && t.status !== 'Done').sort((a, b) => a.due_date.localeCompare(b.due_date));
  const formatMoney = (value) => Number(value || 0).toLocaleString('en-US', { maximumFractionDigits: 2 });
  
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
        writ: activeList.filter(c => c.case_nature === 'Writ Petition').length,
        civilRev: activeList.filter(c => c.case_nature === 'Civil Revision').length,
        crimRev: activeList.filter(c => c.case_nature === 'Criminal Revision').length,
        civilApp: activeList.filter(c => c.case_nature === 'Civil Appeal').length,
        crimApp: activeList.filter(c => c.case_nature === 'Criminal Appeal').length,
        misc: activeList.filter(c => c.case_nature === 'Misc Case').length,
    };
  };

  const currentCounts = getCounts(mainCaseTab);

  const getFilteredCases = () => {
    let result = cases.filter(c => 
      (c.case_no && c.case_no.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.party_name && c.party_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    result = result.filter(c => c.court_type === (mainCaseTab === 'judge' ? 'Judge Court' : 'High Court'));
    if (caseFilter === 'today') result = result.filter(c => c.next_date === today);
    else if (caseFilter === 'tomorrow') result = result.filter(c => c.next_date === tomorrow);
    else if (caseFilter === 'week') result = result.filter(c => c.next_date >= sunday && c.next_date <= thursday);
    else if (caseFilter === 'update') result = result.filter(c => c.next_date < today && c.status === 'Ongoing');
    else if (caseFilter === 'disposed') result = result.filter(c => c.status === 'Disposed');
    else if (caseFilter === 'pending') result = result.filter(c => c.status === 'Ongoing');
    else if (caseFilter !== 'all') {
        result = result.filter(c => c.case_nature === caseFilter);
    }
    return result;
  };

  const getFilteredTasks = () => {
    let list = tasks;
    if(taskFilter === 'pending') list = tasks.filter(t => t.status !== 'Done');
    if(taskFilter === 'completed') list = tasks.filter(t => t.status === 'Done');
    return list;
  };

  const openCaseFinance = (caseRecord, returnMode = null) => {
    setSelectedCase(caseRecord);
    setFinanceReturnMode(returnMode);
    setModalMode('caseFinance');
  };

  const openCaseTransaction = (caseRecord, txnType, returnMode = null) => {
    const isIncome = txnType === 'Income';
    setSelectedCase(caseRecord);
    setTxnReturnMode(returnMode);
    setFormData({
      date: today,
      txn_type: txnType,
      category: isIncome ? 'Case Fee' : 'Case Cost',
      payment_status: isIncome ? 'Due' : 'Paid',
      amount: '',
      client_name: caseRecord.party_name || '',
      description: `${caseRecord.case_no || 'Case'} — ${isIncome ? 'Professional fee' : 'Case cost'}`,
      case_id: caseRecord.id,
      voucher_no: ''
    });
    setModalMode('addTxn');
  };

  const openTransactionEditor = (transaction, returnMode = null) => {
    setFormData({ ...transaction });
    setTxnReturnMode(returnMode);
    setModalMode('addTxn');
  };

  const generateVoucherNo = () => `LS-${today.replace(/-/g, '')}-${Date.now().toString(36).toUpperCase()}`;

  const handleSaveCase = async () => {
    if (caseSaveLock.current) return;
    if (!String(formData.case_no || '').trim()) return alert('মামলা নম্বর লিখুন।');
    caseSaveLock.current = true;
    setIsSavingCase(true);
    try {
      const { order_date, ...casePayload } = formData;
      const result = formData.id
        ? await supabase.from('cases').update(casePayload).eq('id', formData.id)
        : await supabase.from('cases').insert([casePayload]);
      if (result.error) throw result.error;
      alert('মামলার তথ্য সফলভাবে সংরক্ষণ হয়েছে।');
      setModalMode(null);
      setRefresh(r => r + 1);
    } catch (err) {
      alert(err.message || 'মামলার তথ্য সংরক্ষণ করা যায়নি।');
    } finally {
      caseSaveLock.current = false;
      setIsSavingCase(false);
    }
  };

  const handleDeleteCase = async (id) => {
    if (!confirm('Delete entire case record?')) return;
    const { data: linkedTransactions, error: linkError } = await supabase.from('accounts').select('id').eq('case_id', id).limit(1);
    if (linkError) {
      alert(`মামলার আর্থিক রেকর্ড যাচাই করা যায়নি: ${linkError.message}`);
      return;
    }
    if (linkedTransactions && linkedTransactions.length > 0) {
      alert('এই মামলার সঙ্গে আয়/ব্যয়ের রেকর্ড যুক্ত আছে। আর্থিক ইতিহাস অক্ষুণ্ণ রাখতে মামলাটি ডিলিট না করে Disposed হিসেবে চিহ্নিত করুন।');
      return;
    }
    const { error } = await supabase.from('cases').delete().eq('id', id);
    if (error) alert(error.message);
    else setRefresh(r => r + 1);
  };

  const handleWhatsApp = (c) => {
      const msg = `আসসালামু আলাইকুম।\nআপনার মামলার তথ্য:\nমামলা নং: ${c.case_no}\nকোর্ট: ${c.court_name}\nআগামী তারিখ: ${c.next_date}\nপদক্ষেপ: ${c.current_step}\n\nধন্যবাদান্তে,\nঅ্যাডভোকেট আজাদুর রহমান\nহেড অফ চেম্বার, লেক্সসোর্ড ল ফার্ম।`;
      const url = `https://wa.me/${c.client_mobile}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
  };

  const handleSaveDoc = async () => {
    if(!newDoc.drive_link) return alert("Please provide a link");
    if (newDoc.id) {
        const { error } = await supabase.from('documents').update({
            folder_type: newDoc.folder_type,
            doc_name: newDoc.doc_name,
            drive_link: newDoc.drive_link
        }).eq('id', newDoc.id);
        if(error) alert(error.message);
        else { 
            fetchDocuments(selectedCase.id);
            setNewDoc({ folder_type: 'Plaint (Arji)', doc_name: '', drive_link: '', id: null });
        }
    } else {
        const { id, ...docData } = newDoc;
        const { error } = await supabase.from('documents').insert([{ ...docData, case_id: selectedCase.id }]);
        if(error) alert(error.message);
        else { 
            fetchDocuments(selectedCase.id);
            setNewDoc({ folder_type: 'Plaint (Arji)', doc_name: '', drive_link: '', id: null }); 
        }
    }
  };

  const handleDeleteDoc = async (id) => {
    if(confirm("Are you sure you want to delete this document?")) {
        const { error } = await supabase.from('documents').delete().eq('id', id);
        if(error) alert(error.message);
        else fetchDocuments(selectedCase.id);
    }
  };

  const recordAccountAudit = async (accountId, action, snapshot) => {
    const { error } = await supabase.from('account_audit').insert([{
      account_id: String(accountId),
      action,
      transaction_snapshot: snapshot,
      changed_by: session?.user?.id || null,
      changed_by_email: session?.user?.email || null
    }]);
    return error;
  };

  const openAccountAudit = async () => {
    setAccountAudit([]);
    setAccountAuditLoading(true);
    setModalMode('accountAudit');
    try {
      const { data, error } = await supabase.from('account_audit').select('*').order('changed_at', { ascending: false }).limit(100);
      if (error) throw error;
      setAccountAudit(data || []);
      setModalMode('accountAudit');
    } catch (err) {
      alert(err.message || 'Account audit history could not be loaded.');
    } finally {
      setAccountAuditLoading(false);
    }
  };

  const handleSaveTxn = async () => {
    if (txnSaveLock.current) return;
    const amount = Number(formData.amount);
    if (!formData.date) return alert('লেনদেনের তারিখ নির্বাচন করুন।');
    if (!Number.isFinite(amount) || amount <= 0) return alert('সঠিক পরিমাণ লিখুন।');
    if (!String(formData.description || '').trim()) return alert('লেনদেনের বিবরণ লিখুন।');

    txnSaveLock.current = true;
    setIsSavingTxn(true);
    try {
      const { id, ...rawData } = formData;
      const payload = {
        ...rawData,
        date: formData.date,
        txn_type: formData.txn_type,
        amount,
        voucher_no: String(formData.voucher_no || '').trim() || generateVoucherNo(),
        case_id: formData.case_id || null,
        client_name: String(formData.client_name || '').trim(),
        description: String(formData.description || '').trim()
      };
      let savedRecord;
      let auditWarning = '';
      if (id) {
        const { data: beforeRecord, error: readError } = await supabase.from('accounts').select('*').eq('id', id).single();
        if (readError) throw readError;
        const { data, error } = await supabase.from('accounts').update(payload).eq('id', id).select('*').single();
        if (error) throw error;
        savedRecord = data;
        const auditError = await recordAccountAudit(id, 'UPDATE', { before: beforeRecord, after: savedRecord });
        if (auditError) auditWarning = `
Warning: the transaction was updated, but its audit record could not be saved (${auditError.message}).`;
      } else {
        const { data, error } = await supabase.from('accounts').insert([payload]).select('*').single();
        if (error) throw error;
        savedRecord = data;
        const auditError = await recordAccountAudit(savedRecord.id, 'CREATE', { after: savedRecord });
        if (auditError) auditWarning = `
Warning: the transaction was saved, but its audit record could not be saved (${auditError.message}).`;
      }

      await fetchAllData();
      alert(`লেনদেন সংরক্ষিত হয়েছে। Accounts ও সংশ্লিষ্ট মামলার হিসাব একই রেকর্ড থেকে আপডেট হয়েছে।${auditWarning}`);
      const returnMode = txnReturnMode;
      setTxnReturnMode(null);
      setModalMode(returnMode === 'caseFinance' || returnMode === 'viewCase' ? returnMode : null);
    } catch (err) {
      alert(err.message || 'লেনদেন সংরক্ষণ করা যায়নি।');
    } finally {
      txnSaveLock.current = false;
      setIsSavingTxn(false);
    }
  };

  const handleDeleteTxn = async (id) => {
    if (!confirm('Delete transaction? This will also remove it from the linked case summary.')) return;
    const { data: beforeRecord, error: readError } = await supabase.from('accounts').select('*').eq('id', id).single();
    if (readError) { alert(readError.message); return; }
    const { error } = await supabase.from('accounts').delete().eq('id', id);
    if (error) { alert(error.message); return; }
    const auditError = await recordAccountAudit(id, 'DELETE', { before: beforeRecord });
    await fetchAllData();
    if (auditError) alert(`লেনদেন ডিলিট হয়েছে, তবে অডিট রেকর্ড সংরক্ষণ করা যায়নি: ${auditError.message}`);
  };

  const getFilteredAccounts = () => {
    return accounts.filter(a => {
        const linkedCase = a.case_id ? cases.find(c => String(c.id) === String(a.case_id)) : null;
        const query = accountSearch.toLowerCase();
        const matchSearch = accountSearch === '' ||
            (a.client_name?.toLowerCase().includes(query) ||
             a.description?.toLowerCase().includes(query) ||
             a.category?.toLowerCase().includes(query) ||
             linkedCase?.case_no?.toLowerCase().includes(query) ||
             linkedCase?.party_name?.toLowerCase().includes(query) ||
             a.voucher_no?.toLowerCase().includes(query));
        
        let matchDate = true;
        if(startDate && endDate) {
            matchDate = a.date >= startDate && a.date <= endDate;
        } else if(startDate) {
            matchDate = a.date >= startDate;
        }
        return matchSearch && matchDate;
    });
  };

 const filteredTxns = getFilteredAccounts();
  
  // --- NEW SAVINGS & TODAY'S CALCULATIONS ---
  // 1. Total Savings Calculation (From all accounts, not just filtered)
  const globalSavingsDeposit = accounts.filter(a => a.category === 'Savings' && a.txn_type === 'Expense' && a.payment_status === 'Paid').reduce((sum, a) => sum + Number(a.amount), 0);
  const globalSavingsWithdrawal = accounts.filter(a => a.category === 'Savings' && a.txn_type === 'Income' && a.payment_status === 'Paid').reduce((sum, a) => sum + Number(a.amount), 0);
  const totalSavings = globalSavingsDeposit - globalSavingsWithdrawal;

  // 2. Today's Calculations
  const todayTxns = accounts.filter(a => a.date === today && a.payment_status === 'Paid');
  const todayIncome = todayTxns.filter(a => a.txn_type === 'Income' && a.category !== 'Savings').reduce((sum, a) => sum + Number(a.amount), 0);
  const todayExpense = todayTxns.filter(a => a.txn_type === 'Expense' && a.category !== 'Savings').reduce((sum, a) => sum + Number(a.amount), 0);
  const todaySavingsDeposit = todayTxns.filter(a => a.category === 'Savings' && a.txn_type === 'Expense').reduce((sum, a) => sum + Number(a.amount), 0);
  const todaySavingsWithdraw = todayTxns.filter(a => a.category === 'Savings' && a.txn_type === 'Income').reduce((sum, a) => sum + Number(a.amount), 0);
  const todaySavingsNet = todaySavingsDeposit - todaySavingsWithdraw;

  // 3. Filtered Stats (For the bottom cards)
  const calcFilteredTotal = (type, excludeSavings = false, status = 'Paid') => 
      filteredTxns.filter(a => a.txn_type === type && a.payment_status === status && (!excludeSavings || a.category !== 'Savings')).reduce((sum, a) => sum + Number(a.amount), 0);

  const accStats = {
      income: calcFilteredTotal('Income', true), // Regular income (excludes savings withdrawal)
      expense: calcFilteredTotal('Expense', true), // Regular expense (excludes savings deposit)
      dueIncome: calcFilteredTotal('Income', false, 'Due'),
      dueExpense: calcFilteredTotal('Expense', false, 'Due'),
  };
  
  // Cash in Hand = All Income (including from savings) - All Expense (including to savings)
  const totalFilteredIncome = filteredTxns.filter(a => a.txn_type === 'Income' && a.payment_status === 'Paid').reduce((sum, a) => sum + Number(a.amount), 0);
  const totalFilteredExpense = filteredTxns.filter(a => a.txn_type === 'Expense' && a.payment_status === 'Paid').reduce((sum, a) => sum + Number(a.amount), 0);
  const cashInHand = totalFilteredIncome - totalFilteredExpense;

  const caseFinanceTransactions = selectedCase
    ? accounts.filter(a => a.case_id !== null && a.case_id !== undefined && String(a.case_id) === String(selectedCase.id)).sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
    : [];
  const caseIncomeTransactions = caseFinanceTransactions.filter(a => a.txn_type === 'Income');
  const caseExpenseTransactions = caseFinanceTransactions.filter(a => a.txn_type === 'Expense');
  const sumAmounts = (rows) => rows.reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const caseFinanceTotals = {
    totalIncome: sumAmounts(caseIncomeTransactions),
    received: sumAmounts(caseIncomeTransactions.filter(a => a.payment_status === 'Paid')),
    dueIncome: sumAmounts(caseIncomeTransactions.filter(a => a.payment_status === 'Due')),
    totalExpense: sumAmounts(caseExpenseTransactions),
    paidExpense: sumAmounts(caseExpenseTransactions.filter(a => a.payment_status === 'Paid')),
    dueExpense: sumAmounts(caseExpenseTransactions.filter(a => a.payment_status === 'Due')),
    profit: sumAmounts(caseIncomeTransactions) - sumAmounts(caseExpenseTransactions),
    netCash: sumAmounts(caseIncomeTransactions.filter(a => a.payment_status === 'Paid')) - sumAmounts(caseExpenseTransactions.filter(a => a.payment_status === 'Paid'))
  };

  const handlePrint = () => window.print();
  const setMonthFilter = () => {
      const now = new Date();
      const first = new Date(now.getFullYear(), now.getMonth(), 1);
      const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const firstDay = getLocalStr(first);
      const lastDay = getLocalStr(last);
      setStartDate(firstDay);
      setEndDate(lastDay);
  };
  const setYearFilter = () => {
      const now = new Date();
      setStartDate(`${now.getFullYear()}-01-01`);
      setEndDate(`${now.getFullYear()}-12-31`);
  };

  const handleSaveTask = async () => {
    const { error } = await supabase.from('tasks').insert([formData]);
    if(error) alert(error.message);
    else { alert("Task Added!"); setModalMode(null); setRefresh(r => r+1); }
  };
  const handleToggleTask = async (task) => {
    const newStatus = task.status === 'Done' ? 'Pending' : 'Done';
    const { error } = await supabase.from('tasks').update({ status: newStatus }).eq('id', task.id);
    if(!error) setRefresh(r => r+1);
  };
  const handleDeleteTask = async (id) => {
    if(confirm("Delete task?")) {
      await supabase.from('tasks').delete().eq('id', id);
      setRefresh(r => r+1);
    }
  };

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status !== 'Done').length,
    urgent: tasks.filter(t => t.priority === 'Urgent' && t.status !== 'Done').length,
    completed: tasks.filter(t => t.status === 'Done').length
  };

  const loanSummaries = loans.reduce((acc, curr) => {
      const key = `${curr.person_name}_${curr.loan_category}`;
      if (!acc[key]) {
          acc[key] = { id: curr.id, person_name: curr.person_name, loan_category: curr.loan_category, balance: 0, history: [] };
      }
      if (curr.action === 'Add') acc[key].balance += Number(curr.amount);
      if (curr.action === 'Repay') acc[key].balance -= Number(curr.amount);
      acc[key].history.push(curr);
      return acc;
  }, {});

  const currentLoans = Object.values(loanSummaries).filter(l => l.loan_category === loanTab);
  const totalLoanBalance = currentLoans.reduce((sum, l) => sum + l.balance, 0);

  const handleSaveLoanTxn = async () => {
      const { error } = await supabase.from('loans').insert([formData]);
      if(error) alert(error.message);
      else { alert("Loan Record Saved!"); setModalMode(null); setRefresh(r => r+1); }
  };
  const handleDeleteLoanTxn = async (id) => {
      if(confirm("Delete this loan transaction permanently?")) {
          await supabase.from('loans').delete().eq('id', id);
          setRefresh(r => r+1);
      }
  };
  
  const handleUpdateStatus = async () => {
    if (isUpdating) return;
    if (!formData.id) return alert('মামলার রেকর্ড পাওয়া যায়নি।');
    if (!formData.next_date || !String(formData.current_step || '').trim()) {
      return alert('পরবর্তী তারিখ ও পরবর্তী পদক্ষেপ পূরণ করুন।');
    }

    setIsUpdating(true);
    try {
      const { data: oldCase, error: readError } = await supabase.from('cases').select('*').eq('id', formData.id).single();
      if (readError || !oldCase) throw readError || new Error('Case record not found.');

      // Save the order summary against the hearing/order date before changing the next hearing.
      const orderSummary = String(formData.note || '').trim();
      const { error: historyError } = await supabase.from('case_history').insert([{
        case_id: oldCase.id,
        order_date: formData.order_date || oldCase.next_date || today,
        prev_date: oldCase.next_date || null,
        prev_step: oldCase.current_step || '',
        new_date: formData.next_date,
        new_step: String(formData.current_step).trim(),
        note: orderSummary,
        updated_by: session?.user?.id || null,
        updated_by_email: session?.user?.email || null
      }]);
      if (historyError) throw new Error(`Order history could not be saved: ${historyError.message}`);

      const { error: updateError } = await supabase.from('cases').update({
        next_date: formData.next_date,
        current_step: String(formData.current_step).trim(),
        note: ''
      }).eq('id', formData.id);
      if (updateError) throw new Error(`Order history was saved, but the case status could not be updated: ${updateError.message}`);

      alert('মামলার তারিখ ও পদক্ষেপ আপডেট হয়েছে; আদেশের সারাংশ হিস্ট্রিতে সংরক্ষিত হয়েছে।');
      setModalMode(null);
      setRefresh(r => r + 1);
    } catch (err) {
      console.error(err);
      alert(err.message || 'আপডেট করার সময় একটি ত্রুটি হয়েছে।');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="lex-dashboard lex-admin-dashboard flex h-screen bg-slate-100 font-sans overflow-hidden text-slate-900">
      
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          aside, nav { display: none !important; }
          body { background: white; }
          .print-container { padding: 20px; width: 100%; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #94a3b8; }
      `}</style>

      {mobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden no-print" onClick={() => setMobileMenuOpen(false)}></div>}

      <aside className={`lex-sidebar fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static no-print`}>
        <div className="p-6 text-2xl font-bold font-serif text-[#c5a059] border-b border-slate-800 tracking-wider flex flex-col">
          <div className="flex justify-between items-center">
            <span>CHAMBERS</span>
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(false)}><X size={24}/></button>
          </div>
          <span className="text-xs text-gray-400 capitalize mt-1 tracking-normal font-sans">Role: {role}</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          <button onClick={() => {setActiveTab('dashboard'); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'dashboard' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <Gavel size={20}/> Case Dashboard
          </button>
          
          <button onClick={() => {setActiveTab('calendar'); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'calendar' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <CalIcon size={20}/> Calendar
          </button>

          {isAdmin && (
            <>
              <button onClick={() => {setActiveTab('tasks'); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'tasks' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
                <ClipboardList size={20}/> Task Manager
              </button>
              <button onClick={() => {setActiveTab('accounts'); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'accounts' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
                <DollarSign size={20}/> Accounts & Ledger
              </button>
              <button onClick={() => {setActiveTab('loans'); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'loans' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
                <Landmark size={20}/> Loans & Debts
              </button>
            </>
          )}
        </nav>
        <button onClick={onLogout} className="m-4 p-3 flex items-center gap-2 text-red-400 hover:bg-slate-800 rounded"><LogOut size={20}/> Logout</button>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lex-mobile-topbar md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md shrink-0 no-print">
           <span className="font-bold font-serif text-[#c5a059]">LEXSWORD</span>
           <button onClick={() => setMobileMenuOpen(true)}><Menu size={24}/></button>
        </div>

        <main className="lex-main flex-1 overflow-y-auto relative p-4 md:p-6 print-container">
          
          {activeTab === 'dashboard' && (
            <div className="no-print">
              <section className="lex-overview-hero">
                <div className="lex-overview-copy">
                  <p className="lex-overview-kicker">LEXSWORD · CHAMBER WORKSPACE</p>
                  <h2 className="text-2xl md:text-3xl font-bold">Case Dashboard</h2>
                  <p>A clear view of your chamber workload, hearings and pending matters.</p>
                </div>
                <div className="lex-overview-side">
                  <div className="lex-overview-total">
                    <span>Cases listed</span>
                    <strong>{currentCounts.all}</strong>
                    <small>{mainCaseTab === 'judge' ? 'Judge Court' : 'High Court'}</small>
                  </div>
                  {isAdmin && <button onClick={() => { setFormData({ file_no: '', court_type: 'Judge Court', case_nature: 'Civil Suit', status: 'Ongoing' }); setModalMode('addCase'); }} className="lex-hero-action"><Plus size={18}/> New case</button>}
                </div>
              </section>

              <section className="lex-stat-grid" aria-label="Case summary">
                <div className="lex-stat-card"><div><span className="lex-stat-label">Total cases</span><strong>{currentCounts.all}</strong><small>Selected court</small></div><Gavel className="lex-stat-icon lex-icon-blue" size={24}/></div>
                <div className="lex-stat-card"><div><span className="lex-stat-label">Pending cases</span><strong>{currentCounts.pending}</strong><small>Ongoing matters</small></div><Clock className="lex-stat-icon lex-icon-gold" size={24}/></div>
                <div className="lex-stat-card"><div><span className="lex-stat-label">Hearings today</span><strong>{currentCounts.today}</strong><small>Scheduled for today</small></div><CalIcon className="lex-stat-icon lex-icon-green" size={24}/></div>
                <div className="lex-stat-card"><div><span className="lex-stat-label">Needs update</span><strong>{currentCounts.update}</strong><small>Past-date ongoing cases</small></div><AlertTriangle className="lex-stat-icon lex-icon-red" size={24}/></div>
              </section>

              <section className="lex-reminder-grid no-print" aria-label="Hearing and task reminders">
                <div className={`lex-reminder-panel ${overdueCaseReminders.length || overdueTaskReminders.length ? 'has-alerts' : ''}`}>
                  <div className="lex-reminder-panel-head"><span className="lex-reminder-icon is-alert"><AlertTriangle size={18}/></span><div><p>ATTENTION REQUIRED</p><h3>Overdue follow-ups</h3></div><span className="lex-reminder-count">{overdueCaseReminders.length + overdueTaskReminders.length}</span></div>
                  <div className="lex-reminder-list">
                    {overdueCaseReminders.slice(0, 3).map(c => <button type="button" key={`overdue-case-${c.id}`} onClick={() => openCaseDetails(c)} className="lex-reminder-item"><span className="lex-reminder-date is-alert">{c.next_date?.split('-').reverse().join('-')}</span><span className="lex-reminder-copy"><strong>{c.case_no || 'Case hearing'}</strong><small>{c.current_step || c.party_name || 'Hearing date passed'}</small></span><ChevronRight size={16}/></button>)}
                    {overdueTaskReminders.slice(0, 2).map(t => <button type="button" key={`overdue-task-${t.id}`} onClick={() => { setActiveTab('tasks'); setTaskFilter('pending'); }} className="lex-reminder-item"><span className="lex-reminder-date is-alert">{t.due_date?.split('-').reverse().join('-')}</span><span className="lex-reminder-copy"><strong>{t.title || 'Pending task'}</strong><small>Overdue task · {t.priority || 'Normal'} priority</small></span><ChevronRight size={16}/></button>)}
                    {!overdueCaseReminders.length && !overdueTaskReminders.length && <div className="lex-reminder-empty"><CheckCircle size={18}/> No overdue hearings or tasks.</div>}
                  </div>
                </div>
                <div className="lex-reminder-panel">
                  <div className="lex-reminder-panel-head"><span className="lex-reminder-icon is-upcoming"><CalIcon size={18}/></span><div><p>NEXT 3 DAYS</p><h3>Upcoming schedule</h3></div><span className="lex-reminder-count">{nearTermHearings.length + nearTermTaskReminders.length}</span></div>
                  <div className="lex-reminder-list">
                    {nearTermHearings.slice(0, 3).map(c => <button type="button" key={`near-case-${c.id}`} onClick={() => openCaseDetails(c)} className="lex-reminder-item"><span className="lex-reminder-date">{c.next_date?.split('-').reverse().join('-')}</span><span className="lex-reminder-copy"><strong>{c.case_no || 'Case hearing'}</strong><small>{c.current_step || c.party_name || 'Court hearing'}</small></span><ChevronRight size={16}/></button>)}
                    {nearTermTaskReminders.slice(0, 2).map(t => <button type="button" key={`near-task-${t.id}`} onClick={() => { setActiveTab('tasks'); setTaskFilter('pending'); }} className="lex-reminder-item"><span className="lex-reminder-date">{t.due_date?.split('-').reverse().join('-')}</span><span className="lex-reminder-copy"><strong>{t.title || 'Pending task'}</strong><small>Task deadline · {t.priority || 'Normal'} priority</small></span><ChevronRight size={16}/></button>)}
                    {!nearTermHearings.length && !nearTermTaskReminders.length && <div className="lex-reminder-empty"><CalIcon size={18}/> No hearings or task deadlines in the next 3 days.</div>}
                  </div>
                </div>
              </section>

              <div className="lex-case-tabs flex gap-0 mb-4 border-b-2 border-slate-300">
                  <button onClick={() => { setMainCaseTab('judge'); setCaseFilter('all'); }} className={`px-6 py-3 font-bold text-lg transition-all ${mainCaseTab === 'judge' ? 'border-b-4 border-[#c5a059] text-slate-900 bg-white' : 'text-gray-500 hover:text-slate-700'}`}>
                      Judge Court ({getCounts('judge').all})
                  </button>
                  <button onClick={() => { setMainCaseTab('high'); setCaseFilter('all'); }} className={`px-6 py-3 font-bold text-lg transition-all ${mainCaseTab === 'high' ? 'border-b-4 border-[#c5a059] text-slate-900 bg-white' : 'text-gray-500 hover:text-slate-700'}`}>
                      High Court ({getCounts('high').all})
                  </button>
              </div>

              <div className="lex-case-search mb-4 relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20}/>
                  <input type="text" placeholder="Search by Case No or Party Name..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded focus:border-[#c5a059] outline-none text-slate-900" onChange={(e) => setSearchTerm(e.target.value)}/>
              </div>

              <div className="lex-filter-row flex flex-wrap gap-2 mb-6">
                {mainCaseTab === 'judge' ? (
                    <>
                        <button onClick={() => setCaseFilter('all')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'all' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>All <span className="lex-filter-count">{currentCounts.all}</span></button>
                        <button onClick={() => setCaseFilter('pending')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'pending' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Pending <span className="lex-filter-count">{currentCounts.pending}</span></button>
                        <button onClick={() => setCaseFilter('disposed')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'disposed' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Disposed <span className="lex-filter-count">{currentCounts.disposed}</span></button>
                        <button onClick={() => setCaseFilter('today')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'today' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Today <span className="lex-filter-count">{currentCounts.today}</span></button>
                        <button onClick={() => setCaseFilter('tomorrow')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'tomorrow' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Tomorrow <span className="lex-filter-count">{currentCounts.tomorrow}</span></button>
                        <button onClick={() => setCaseFilter('week')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'week' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>This Week <span className="lex-filter-count">{currentCounts.week}</span></button>
                        <button onClick={() => setCaseFilter('update')} className={`px-3 py-1 rounded-full text-sm font-bold border transition ${caseFilter === 'update' || currentCounts.update > 0 ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600'}`}>Needs Update <span className="lex-filter-count">{currentCounts.update}</span></button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setCaseFilter('all')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'all' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>All <span className="lex-filter-count">{currentCounts.all}</span></button>
                        <button onClick={() => setCaseFilter('pending')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'pending' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Pending <span className="lex-filter-count">{currentCounts.pending}</span></button>
                        <button onClick={() => setCaseFilter('disposed')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'disposed' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Disposed <span className="lex-filter-count">{currentCounts.disposed}</span></button>
                        <button onClick={() => setCaseFilter('update')} className={`px-3 py-1 rounded-full text-sm font-bold border transition ${caseFilter === 'update' || currentCounts.update > 0 ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600'}`}>Needs Update <span className="lex-filter-count">{currentCounts.update}</span></button>
                        <button onClick={() => setCaseFilter('Writ Petition')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Writ Petition' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Writ <span className="lex-filter-count">{currentCounts.writ}</span></button>
                        <button onClick={() => setCaseFilter('Civil Revision')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Civil Revision' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Civil Rev <span className="lex-filter-count">{currentCounts.civilRev}</span></button>
                        <button onClick={() => setCaseFilter('Criminal Revision')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Criminal Revision' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Crim Rev <span className="lex-filter-count">{currentCounts.crimRev}</span></button>
                        <button onClick={() => setCaseFilter('Civil Appeal')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Civil Appeal' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Civil Appeal <span className="lex-filter-count">{currentCounts.civilApp}</span></button>
                        <button onClick={() => setCaseFilter('Criminal Appeal')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Criminal Appeal' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Crim Appeal <span className="lex-filter-count">{currentCounts.crimApp}</span></button>
                        <button onClick={() => setCaseFilter('Misc Case')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'Misc Case' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Misc <span className="lex-filter-count">{currentCounts.misc}</span></button>
                    </>
                )}
              </div>

              <div className="lex-case-list grid gap-4 overflow-hidden">
                {getFilteredCases().length === 0 && <p className="text-slate-500 italic">No cases found.</p>}
                {getFilteredCases().map(c => (
                  <div key={c.id} className="lex-case-card bg-white p-4 md:p-5 rounded-lg shadow border-l-4 border-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 transition w-full overflow-hidden">
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-2 mb-1 overflow-x-auto custom-scrollbar pb-1">
                         <span className="text-xs font-bold bg-blue-100 text-blue-900 px-2 rounded whitespace-nowrap shrink-0">{c.court_type}</span>
                        {c.court_type === 'High Court' && <span className="text-xs font-bold bg-yellow-100 text-yellow-900 px-2 rounded whitespace-nowrap shrink-0">{c.case_nature}</span>}
                        <span className="text-xs font-bold bg-gray-200 text-slate-800 px-2 rounded truncate max-w-[150px] shrink-0">{c.court_name}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 truncate">{c.case_no}</h3>
                      <p className="text-slate-700 font-medium truncate">{c.party_name}</p>
                      <p className="text-xs text-slate-500 truncate">Section: {c.section}</p>
                    </div>
                    
                    <div className="text-left md:text-right w-full md:w-auto shrink-0">
                      <p className="text-xs text-slate-600">Next Date</p>
                      <p className="text-lg font-bold text-red-600">{c.next_date}</p>
                      <p className="text-xs font-bold text-[#c5a059] uppercase truncate max-w-[200px]">{c.current_step}</p>
                    </div>

                    <div className="lex-case-card-actions flex gap-2 w-full md:w-auto justify-start md:justify-end border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
                      {isAdmin && (
                        <>
                          <button type="button" onClick={() => openCaseTransaction(c, 'Income')} className="lex-case-money-action is-fee" title="Add a fee / income to this case"><DollarSign size={16}/><span>Fee</span></button>
                          <button type="button" onClick={() => openCaseTransaction(c, 'Expense')} className="lex-case-money-action is-cost" title="Add a cost / expense to this case"><TrendingDown size={16}/><span>Cost</span></button>
                          <button type="button" onClick={() => openCaseFinance(c)} className="lex-case-money-action is-finance" title="View this case's income, costs and dues" aria-label="Case finance"><PieChart size={17}/></button>
                        </>
                      )}
                      <button onClick={() => { setFormData({...c, order_date: c.next_date || today, note: ''}); setModalMode('updateStatus'); }} className="p-2 shrink-0 bg-slate-900 text-white rounded hover:bg-[#c5a059] font-bold flex items-center gap-1" title="Update hearing date, next step and order summary">
                        <RefreshCw size={16}/> Update
                      </button>
                      <button onClick={() => openCaseDetails(c)} title="View complete case profile and order history" className="lex-case-view-action p-2 shrink-0 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"><Eye size={18}/><span>View case</span></button>
                      {isAdmin && (
                        <>
                          <button onClick={() => { setFormData(c); setModalMode('addCase'); }} className="p-2 shrink-0 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200" title="Edit case"><Edit3 size={18}/></button>
                          <button onClick={() => handleDeleteCase(c.id)} className="p-2 shrink-0 bg-red-100 text-red-800 rounded hover:bg-red-200" title="Delete case"><Trash2 size={18}/></button>
                        </>
                      )}
                      <button onClick={() => handleWhatsApp(c)} className="p-2 shrink-0 bg-green-100 text-green-800 rounded hover:bg-green-200" title="Share case update by WhatsApp"><MessageCircle size={18}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && isAdmin && (
            <div className="no-print">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-slate-900">Task Manager</h2>
                <button onClick={() => { setFormData({priority: 'Normal', status: 'Pending'}); setModalMode('addTask'); }} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded shadow hover:bg-[#c5a059] font-bold">
                  <Plus size={18}/> ADD TASK
                </button>
               </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
                  <p className="text-xs font-bold text-gray-500 uppercase">Total Tasks</p>
                  <p className="text-2xl font-bold text-slate-900">{taskStats.total}</p>
                 </div>
                <div className="bg-white p-4 rounded shadow border-l-4 border-yellow-500">
                  <p className="text-xs font-bold text-gray-500 uppercase">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{taskStats.pending}</p>
                </div>
                 <div className="bg-white p-4 rounded shadow border-l-4 border-red-500">
                  <p className="text-xs font-bold text-gray-500 uppercase">Urgent</p>
                  <p className="text-2xl font-bold text-red-600">{taskStats.urgent}</p>
                </div>
                <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
                  <p className="text-xs font-bold text-gray-500 uppercase">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
                </div>
              </div>
              <div className="flex gap-4 mb-4 border-b border-slate-200 pb-2">
                 <button onClick={() => setTaskFilter('pending')} className={`font-bold pb-2 px-2 ${taskFilter === 'pending' ? 'text-[#c5a059] border-b-2 border-[#c5a059]' : 'text-gray-500'}`}>To-Do List</button>
                <button onClick={() => setTaskFilter('completed')} className={`font-bold pb-2 px-2 ${taskFilter === 'completed' ? 'text-[#c5a059] border-b-2 border-[#c5a059]' : 'text-gray-500'}`}>Completed</button>
                <button onClick={() => setTaskFilter('all')} className={`font-bold pb-2 px-2 ${taskFilter === 'all' ? 'text-[#c5a059] border-b-2 border-[#c5a059]' : 'text-gray-500'}`}>All Tasks</button>
              </div>
              <div className="space-y-3">
                {getFilteredTasks().length === 0 && <p className="text-slate-500 italic">No tasks found.</p>}
                {getFilteredTasks().map(t => (
                  <div key={t.id} className={`bg-white p-4 rounded shadow flex items-center justify-between group transition ${t.status === 'Done' ? 'opacity-60 bg-gray-50' : 'hover:shadow-md'}`}>
                    <div className="flex items-center gap-4">
                      <button onClick={() => handleToggleTask(t)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${t.status === 'Done' ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-[#c5a059]'}`}>
                        {t.status === 'Done' && <Check size={14}/>}
                      </button>
                      <div>
                        <h4 className={`font-bold text-lg text-slate-900 ${t.status === 'Done' ? 'line-through text-gray-500' : ''}`}>{t.title}</h4>
                        {t.details && <p className="text-sm text-slate-600">{t.details}</p>}
                        <div className="flex gap-3 mt-1 text-xs font-bold items-center">
                          {t.due_date && (
                             <span className={`flex items-center gap-1 ${new Date(t.due_date) < new Date() && t.status !== 'Done' ? 'text-red-600' : 'text-slate-500'}`}>
                              <Clock size={12}/> {t.due_date}
                            </span>
                           )}
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wide ${t.priority === 'Urgent' ? 'bg-red-100 text-red-700' : t.priority === 'High' ? 'bg-orange-100 text-orange-700' : t.priority === 'Normal' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                            {t.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteTask(t.id)} className="text-slate-400 hover:text-red-500 p-2"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
             </div>
          )}

          {activeTab === 'calendar' && (
            <section className="lex-calendar-workspace no-print">
              <div className="lex-calendar-heading">
                <div>
                  <p className="lex-section-eyebrow">LEXSWORD · CHAMBER PLANNER</p>
                  <h2>Hearing calendar</h2>
                  <p>এক জায়গায় শুনানির তারিখ, মামলার পদক্ষেপ ও দৈনন্দিন কাজ দেখুন।</p>
                </div>
                <div className="lex-calendar-view-switch" role="tablist" aria-label="Calendar view">
                  {[['month', 'Month'], ['week', 'Week'], ['agenda', 'Agenda']].map(([view, label]) => (
                    <button key={view} type="button" role="tab" aria-selected={calendarView === view} onClick={() => setCalendarView(view)} className={calendarView === view ? 'is-active' : ''}>{label}</button>
                  ))}
                </div>
              </div>

              <div className="lex-calendar-insights">
                <div className="lex-calendar-insight"><span className="lex-insight-mark lex-mark-blue"><Gavel size={17}/></span><div><small>Upcoming hearings</small><strong>{upcomingHearings.length}</strong><span>Open matters with future dates</span></div></div>
                <div className="lex-calendar-insight"><span className="lex-insight-mark lex-mark-gold"><CalIcon size={17}/></span><div><small>Today's hearings</small><strong>{todaysHearings.length}</strong><span>{today.split('-').reverse().join('-')}</span></div></div>
                <div className="lex-calendar-insight"><span className="lex-insight-mark lex-mark-green"><CheckSquare size={17}/></span><div><small>Upcoming tasks</small><strong>{isAdmin ? upcomingTasks.length : '—'}</strong><span>Pending chamber actions</span></div></div>
              </div>

              <div className="lex-calendar-main-grid">
                <div className="lex-calendar-board">
                  <div className="lex-calendar-toolbar">
                    <div>
                      <h3>{calendarDate.toLocaleString('en-GB', { month: 'long', year: 'numeric' })}</h3>
                      <p>{calendarView === 'month' ? 'Monthly overview' : calendarView === 'week' ? 'Selected week · Sunday to Saturday' : 'Upcoming schedule · next 30 days'}</p>
                    </div>
                    <div className="lex-calendar-controls">
                      <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)} className="lex-calendar-arrow"><ChevronLeft size={18}/></button>
                      <button type="button" onClick={() => { const now = new Date(); setCalendarDate(now); setSelectedCalendarDate(today); }} className="lex-calendar-jump-today">Today</button>
                      <button type="button" aria-label="Next month" onClick={() => changeMonth(1)} className="lex-calendar-arrow"><ChevronRight size={18}/></button>
                    </div>
                  </div>

                  {calendarView === 'month' && (
                    <>
                      <div className="lex-calendar-weekdays"><div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div></div>
                      <div className="lex-calendar-grid">
                        {[...Array(42)].map((_, i) => {
                          const year = calendarDate.getFullYear();
                          const month = calendarDate.getMonth();
                          const firstDay = new Date(year, month, 1).getDay();
                          const d = new Date(year, month, 1 + i - firstDay);
                          const dateStr = getLocalStr(d);
                          const isCurrentMonth = d.getMonth() === month;
                          const dayCases = cases.filter(c => c.next_date === dateStr && c.status !== 'Disposed');
                          const dayTasks = isAdmin ? tasks.filter(t => t.due_date === dateStr && t.status !== 'Done') : [];
                          return (
                            <div key={dateStr} role="button" tabIndex={0} onClick={() => setSelectedCalendarDate(dateStr)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedCalendarDate(dateStr); }} className={`lex-calendar-cell ${dateStr === today ? 'lex-calendar-today' : ''} ${dateStr === selectedCalendarDate ? 'lex-calendar-selected' : ''} ${!isCurrentMonth ? 'lex-calendar-outside' : ''}`}>
                              <div className="lex-calendar-date-row"><span>{d.getDate()}</span>{dayCases.length + dayTasks.length > 0 && <span className="lex-calendar-count">{dayCases.length + dayTasks.length}</span>}</div>
                              <div className="lex-calendar-cell-events">
                                {isCurrentMonth && dayCases.slice(0, 2).map(c => (
                                  <button key={c.id} type="button" onClick={e => { e.stopPropagation(); openCaseDetails(c); }} className="lex-calendar-event" title={`${c.case_no} — ${c.party_name}`}>
                                    <span className="lex-calendar-event-dot lex-case-dot"></span><span>{c.case_no || 'Case hearing'}</span>
                                  </button>
                                ))}
                                {isCurrentMonth && dayTasks.slice(0, 1).map(t => (
                                  <button key={t.id} type="button" onClick={e => { e.stopPropagation(); setActiveTab('tasks'); setTaskFilter('pending'); }} className="lex-calendar-event lex-calendar-event-task" title={t.title}>
                                    <span className="lex-calendar-event-dot"></span><span>{t.title}</span>
                                  </button>
                                ))}
                                {isCurrentMonth && dayCases.length + dayTasks.length > 3 && <span className="lex-calendar-more">+{dayCases.length + dayTasks.length - 3} more</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {calendarView === 'week' && (
                    <div className="lex-calendar-week-grid">
                      {calendarWeekDays.map(d => {
                        const dateStr = getLocalStr(d);
                        const dayCases = cases.filter(c => c.next_date === dateStr && c.status !== 'Disposed');
                        const dayTasks = isAdmin ? tasks.filter(t => t.due_date === dateStr && t.status !== 'Done') : [];
                        return (
                          <div key={dateStr} className={`lex-calendar-week-day ${dateStr === today ? 'is-today' : ''} ${dateStr === selectedCalendarDate ? 'is-selected' : ''}`}>
                            <button type="button" className="lex-calendar-week-day-head" onClick={() => setSelectedCalendarDate(dateStr)}><span>{d.toLocaleDateString('en-GB', { weekday: 'short' })}</span><strong>{d.getDate()}</strong></button>
                            <div className="lex-calendar-week-events">
                              {dayCases.map(c => <button key={c.id} type="button" className="lex-calendar-week-event is-case" onClick={() => openCaseDetails(c)}><strong>{c.case_no || 'Case hearing'}</strong><span>{c.current_step || c.party_name}</span></button>)}
                              {dayTasks.map(t => <button key={t.id} type="button" className="lex-calendar-week-event is-task" onClick={() => { setActiveTab('tasks'); setTaskFilter('pending'); }}><strong>{t.title}</strong><span>{t.priority || 'Task'}</span></button>)}
                              {dayCases.length + dayTasks.length === 0 && <span className="lex-calendar-empty-day">No events</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {calendarView === 'agenda' && (
                    <div className="lex-calendar-agenda-list">
                      <div className="lex-calendar-agenda-intro"><h4>Upcoming schedule</h4><span>From {selectedCalendarDate.split('-').reverse().join('-')} · next 30 days</span></div>
                      {calendarAgendaItems.length === 0 && <div className="lex-calendar-empty-state"><CalIcon size={26}/><strong>No upcoming events</strong><span>Choose another date or add a hearing/task.</span></div>}
                      {calendarAgendaItems.map(item => (
                        <button key={item.id} type="button" className="lex-calendar-agenda-item" onClick={() => item.type === 'case' ? openCaseDetails(item.record) : (setActiveTab('tasks'), setTaskFilter('pending'))}>
                          <span className={`lex-agenda-date ${item.type === 'case' ? 'is-case' : 'is-task'}`}><strong>{item.date.slice(8, 10)}</strong><small>{new Date(`${item.date}T12:00:00`).toLocaleDateString('en-GB', { month: 'short' })}</small></span>
                          <span className="lex-agenda-copy"><strong>{item.title}</strong><small>{item.subtitle || '—'}</small><em>{item.detail || (item.type === 'case' ? 'Court hearing' : 'Task')}</em></span>
                          <span className={`lex-agenda-type ${item.type}`}>{item.type === 'case' ? 'HEARING' : 'TASK'}</span>
                          <ChevronRight size={17}/>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <aside className="lex-calendar-day-panel">
                  <div className="lex-calendar-day-panel-head">
                    <p>SELECTED DATE</p>
                    <h3>{selectedCalendarDateLabel}</h3>
                    <span>{selectedDateCases.length} hearing{selectedDateCases.length === 1 ? '' : 's'} · {selectedDateTasks.length} task{selectedDateTasks.length === 1 ? '' : 's'}</span>
                  </div>
                  <div className="lex-day-agenda-section">
                    <div className="lex-day-section-title"><h4><Gavel size={16}/> Court hearings</h4><span>{selectedDateCases.length}</span></div>
                    {selectedDateCases.length === 0 && <p className="lex-calendar-panel-empty">No hearings scheduled for this date.</p>}
                    {selectedDateCases.map(c => (
                      <button key={c.id} type="button" className="lex-day-event-card is-case" onClick={() => openCaseDetails(c)}>
                        <span className="lex-day-event-marker"></span><span className="lex-day-event-copy"><strong>{c.case_no || 'Case hearing'}</strong><small>{c.party_name || 'Party not specified'}</small><em>{c.current_step || c.court_name || 'Next step not specified'}</em></span><ChevronRight size={16}/>
                      </button>
                    ))}
                  </div>
                  {isAdmin && <div className="lex-day-agenda-section">
                    <div className="lex-day-section-title"><h4><CheckSquare size={16}/> Chamber tasks</h4><span>{selectedDateTasks.length}</span></div>
                    {selectedDateTasks.length === 0 && <p className="lex-calendar-panel-empty">No pending tasks for this date.</p>}
                    {selectedDateTasks.map(t => <button key={t.id} type="button" className="lex-day-event-card is-task" onClick={() => { setActiveTab('tasks'); setTaskFilter('pending'); }}><span className="lex-day-event-marker"></span><span className="lex-day-event-copy"><strong>{t.title}</strong><small>{t.details || 'Task'}</small><em>{t.priority || 'Normal priority'}</em></span><ChevronRight size={16}/></button>)}
                  </div>}
                  {isAdmin && <button type="button" className="lex-calendar-add-case" onClick={() => { setFormData({ file_no: '', court_type: 'Judge Court', case_nature: 'Civil Suit', status: 'Ongoing', next_date: selectedCalendarDate, current_step: '', note: '' }); setModalMode('addCase'); }}><Plus size={17}/> Add case on this date</button>}
                </aside>
              </div>
            </section>
          )}

          {activeTab === 'accounts' && isAdmin && (
            <div className="lex-finance-page space-y-6">
              <div className="lex-finance-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
                <div><p className="lex-section-eyebrow">LEXSWORD · FINANCE WORKSPACE</p><h2 className="text-3xl font-bold text-slate-900">Accounts & Ledger</h2><p>আয়, ব্যয়, বকেয়া এবং সঞ্চয়ের হিসাব এক জায়গায় পরিচালনা করুন।</p></div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button onClick={handlePrint} className="bg-slate-200 text-slate-900 px-4 py-2 rounded font-bold hover:bg-slate-300 flex items-center gap-2">
                         <Printer size={18}/> Print / PDF
                    </button>
                    <button type="button" onClick={openAccountAudit} className="bg-indigo-50 text-indigo-800 px-4 py-2 rounded font-bold hover:bg-indigo-100 flex items-center gap-2">
                         <History size={18}/> Audit log
                    </button>
                    <button onClick={() => { setTxnReturnMode(null); setFormData({date: today, txn_type: 'Income', category: 'Office', payment_status: 'Paid', amount: '', client_name: '', description: '', voucher_no: '', case_id: null}); setModalMode('addTxn'); }} className="bg-slate-900 text-white px-6 py-2 rounded font-bold hover:bg-[#c5a059] flex items-center gap-2">
                        <Plus size={18}/> Add Entry
                    </button>
                </div>
              </div>

              <div className="lex-finance-filter-panel bg-white p-4 rounded shadow border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 no-print">
                  <div className="col-span-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Search</label>
                      <div className="relative">
                           <Search className="absolute left-2 top-2.5 text-gray-400" size={16}/>
                          <input placeholder="Client, Category..." value={accountSearch} onChange={e => setAccountSearch(e.target.value)} className="w-full pl-8 p-2 border rounded text-sm text-slate-900"/>
                       </div>
                  </div>
                  <div className="col-span-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Start Date</label>
                      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded text-sm text-slate-900"/>
                  </div>
                  <div className="col-span-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">End Date</label>
                      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 border rounded text-sm text-slate-900"/>
                   </div>
                  <div className="col-span-1 flex items-end gap-2">
                      <button onClick={setMonthFilter} className="flex-1 bg-blue-50 text-blue-800 text-xs font-bold py-2.5 rounded hover:bg-blue-100">This Month</button>
                      <button onClick={setYearFilter} className="flex-1 bg-blue-50 text-blue-800 text-xs font-bold py-2.5 rounded hover:bg-blue-100">This Year</button>
                      <button onClick={() => {setStartDate(''); setEndDate(''); setAccountSearch('')}} className="p-2.5 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"><RefreshCw size={16}/></button>
                  </div>
              </div>

            {/* --- NEW STATS GRID FOR TODAY & SAVINGS --- */}
              <div className="lex-finance-stat-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white p-4 rounded shadow border-l-4 border-blue-500 flex flex-col justify-between">
                      <p className="text-xs font-bold text-gray-500 uppercase">Today's Income</p>
                      <p className="text-2xl font-bold text-slate-900 mt-1">৳{todayIncome}</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow border-l-4 border-pink-500 flex flex-col justify-between">
                      <p className="text-xs font-bold text-gray-500 uppercase">Today's Expense</p>
                      <p className="text-2xl font-bold text-slate-900 mt-1">৳{todayExpense}</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow border-l-4 border-indigo-500 flex flex-col justify-between">
                      <p className="text-xs font-bold text-gray-500 uppercase">Today's Savings</p>
                      <p className="text-2xl font-bold text-slate-900 mt-1">
                          {todaySavingsNet > 0 ? '+' : ''}৳{todaySavingsNet}
                      </p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded shadow text-white flex flex-col justify-between border-l-4 border-[#c5a059]">
                      <p className="text-xs font-bold text-[#c5a059] uppercase flex items-center gap-2"><PieChart size={14}/> Total Savings</p>
                      <p className="text-3xl font-bold mt-1">৳{totalSavings}</p>
                  </div>
              </div>

              {/* ORIGINAL FILTERED STATS GRID */}
              <div className="lex-finance-stat-grid grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded shadow border-l-4 border-green-500 flex flex-col justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><TrendingUp size={14}/> Total Income</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">৳{accStats.income}</p>
                    </div>
                    <p className="text-xs text-green-600 font-bold mt-2 bg-green-50 inline-block px-2 py-1 rounded w-max">Paid: ৳{accStats.income}</p>
                </div>
                <div className="bg-white p-4 rounded shadow border-l-4 border-red-500 flex flex-col justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><TrendingDown size={14}/> Total Expense</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">৳{accStats.expense}</p>
                    </div>
                    <p className="text-xs text-red-600 font-bold mt-2 bg-red-50 inline-block px-2 py-1 rounded w-max">Paid: ৳{accStats.expense}</p>
                 </div>
                <div className="bg-slate-900 p-4 rounded shadow text-white flex flex-col justify-between">
                    <div>
                        <p className="text-xs font-bold text-[#c5a059] uppercase flex items-center gap-2"><PieChart size={14}/> Cash In Hand</p>
                        <p className="text-3xl font-bold mt-1">৳{cashInHand}</p>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">Available Balance</p>
                </div>
                <div className="bg-white p-4 rounded shadow border-l-4 border-orange-500 flex flex-col justify-between">
                     <div>
                        <p className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><AlertTriangle size={14}/> Pending Dues</p>
                        <p className="text-xl font-bold text-slate-900 mt-1">Receivable: ৳{accStats.dueIncome}</p>
                      </div>
                    <p className="text-xs text-red-600 font-bold mt-2">Payable: ৳{accStats.dueExpense}</p>
                </div>
              </div>

              <div className="hidden print-only mb-6 text-center border-b pb-4">
                  <h1 className="text-3xl font-serif font-bold text-slate-900">LEXSWORD CHAMBERS</h1>
                  <p className="text-sm text-gray-600">Financial Report</p>
                  <p className="text-xs mt-2">Period: {startDate || 'All Time'} to {endDate || 'Present'}</p>
              </div>

              <div className="lex-ledger-panel bg-white rounded shadow overflow-x-auto">
                 <table className="lex-ledger-table w-full text-left min-w-[850px]">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="p-3 text-slate-900 font-bold text-xs uppercase">Date</th>
                        <th className="p-3 text-slate-900 font-bold text-xs uppercase">Client / Name</th>
                        <th className="p-3 text-slate-900 font-bold text-xs uppercase">Case</th>
                        <th className="p-3 text-slate-900 font-bold text-xs uppercase">Description</th>
                        <th className="p-3 text-slate-900 font-bold text-xs uppercase">Voucher</th>
                        <th className="p-3 text-slate-900 font-bold text-xs uppercase">Category</th>
                        <th className="p-3 text-slate-900 font-bold text-xs uppercase text-center">Status</th>
                        <th className="p-3 text-right text-slate-900 font-bold text-xs uppercase">Amount</th>
                        <th className="p-3 text-center text-slate-900 font-bold text-xs uppercase no-print">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTxns.length === 0 && <tr><td colSpan="9" className="p-4 text-center text-slate-500 italic">No records found for this period.</td></tr>}
                      {filteredTxns.map(a => (
                        <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="p-3 text-sm text-slate-700">{a.date ? a.date.split('-').reverse().join('-') : ''}</td>
                          <td className="p-3 font-bold text-slate-900 text-sm">{a.client_name || '-'}</td>
                          <td className="p-3 text-sm">{a.case_id ? <button type="button" className="lex-ledger-case-link" onClick={() => { const linkedCase = cases.find(c => String(c.id) === String(a.case_id)); if (linkedCase) openCaseFinance(linkedCase); else alert('The linked case could not be found.'); }}>{cases.find(c => String(c.id) === String(a.case_id))?.case_no || 'Linked case'}</button> : <span className="text-slate-400">General</span>}</td>
                          <td className="p-3 text-sm text-slate-700">{a.description}</td>
                          <td className="p-3 text-xs font-bold text-slate-600">{a.voucher_no || '—'}</td>
                          <td className="p-3"><span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{a.category}</span></td>
                          <td className="p-3 text-center">
                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${a.payment_status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>{a.payment_status}</span>
                          </td>
                          <td className={`p-3 text-right font-bold text-sm ${a.txn_type === 'Income' ? 'text-green-700' : 'text-red-700'}`}>{a.txn_type === 'Income' ? '+' : '-'} {a.amount}</td>
                          <td className="p-3 flex justify-center gap-2 no-print">
                             <button type="button" onClick={() => openTransactionEditor(a)} className="text-blue-600 hover:bg-blue-100 p-1 rounded" title="Edit transaction"><Edit3 size={16}/></button>
                             <button onClick={() => handleDeleteTxn(a.id)} className="text-red-600 hover:bg-red-100 p-1 rounded"><Trash2 size={16}/></button>
                          </td>
                        </tr>
                       ))}
                    </tbody>
                    <tfoot className="bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-300">
                        <tr>
                            <td colSpan="7" className="p-3 text-right">NET TOTAL (Cash):</td>
                            <td className="p-3 text-right">৳{cashInHand}</td>
                            <td className="no-print"></td>
                        </tr>
                    </tfoot>
                 </table>
              </div>
            </div>
          )}

          {activeTab === 'loans' && isAdmin && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
                <h2 className="text-3xl font-bold text-slate-900">Loan & Debt Management</h2>
                <div className="flex gap-2 w-full md:w-auto">
                    <button onClick={() => { setFormData({ loan_category: loanTab, action: 'Add', date: today, person_name: '', amount: '', note: '' }); setModalMode('addLoanTxn'); }} className="bg-slate-900 text-white px-6 py-2 rounded font-bold hover:bg-[#c5a059] flex items-center gap-2">
                        <Plus size={18}/> Add Record
                    </button>
                </div>
              </div>

              <div className="flex gap-0 mb-4 border-b-2 border-slate-300">
                  <button onClick={() => setLoanTab('Taken')} className={`px-6 py-3 font-bold text-lg transition-all ${loanTab === 'Taken' ? 'border-b-4 border-red-600 text-slate-900 bg-white' : 'text-gray-500 hover:text-slate-700'}`}>
                      My Debts
                  </button>
                  <button onClick={() => setLoanTab('Given')} className={`px-6 py-3 font-bold text-lg transition-all ${loanTab === 'Given' ? 'border-b-4 border-green-600 text-slate-900 bg-white' : 'text-gray-500 hover:text-slate-700'}`}>
                      Loans Given
                  </button>
              </div>

              <div className="bg-white p-6 rounded shadow border-l-4 border-[#c5a059]">
                  <p className="text-sm font-bold text-gray-500 uppercase">Total Outstanding Balance</p>
                  <p className={`text-3xl font-bold ${loanTab === 'Taken' ? 'text-red-600' : 'text-green-600'}`}>৳{totalLoanBalance}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentLoans.map((l, idx) => (
                      <div key={idx} className="bg-white p-5 rounded shadow border border-slate-200 flex flex-col justify-between hover:shadow-lg transition">
                          <div className="flex justify-between items-start mb-4">
                              <div>
                                  <h3 className="text-xl font-bold text-slate-900">{l.person_name}</h3>
                                  <p className="text-xs font-bold text-slate-500 uppercase">{l.loan_category === 'Taken' ? 'Lender' : 'Borrower'}</p>
                              </div>
                              <div className="text-right">
                                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Current Balance</p>
                                  <p className={`text-2xl font-bold ${l.balance === 0 ? 'text-slate-500' : loanTab === 'Taken' ? 'text-red-600' : 'text-green-600'}`}>
                                      ৳{l.balance}
                                  </p>
                               </div>
                          </div>
                          <div className="flex gap-2 border-t pt-4">
                              <button onClick={() => { setFormData({ person_name: l.person_name, loan_category: l.loan_category, action: 'Add', date: today, amount: '', note: '' }); setModalMode('addLoanTxn'); }} className="flex-1 bg-slate-100 text-slate-900 py-2 rounded text-xs font-bold hover:bg-slate-200 flex justify-center items-center gap-1">
                                  <TrendingUp size={14}/> Add Amount
                              </button>
                              <button onClick={() => { setFormData({ person_name: l.person_name, loan_category: l.loan_category, action: 'Repay', date: today, amount: '', note: '' }); setModalMode('addLoanTxn'); }} className="flex-1 bg-slate-100 text-slate-900 py-2 rounded text-xs font-bold hover:bg-slate-200 flex justify-center items-center gap-1">
                                  <CheckCircle size={14}/> Repay / Adjust
                              </button>
                              <button onClick={() => { setSelectedCase(l); setModalMode('viewLoanHistory'); }} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100" title="History">
                                  <History size={18}/>
                              </button>
                          </div>
                       </div>
                  ))}
                  {currentLoans.length === 0 && <p className="text-slate-500 italic p-4 col-span-full">No records found in this category.</p>}
              </div>
            </div>
          )}

        </main>
      </div>

      <nav className="lex-bottom-nav no-print" aria-label="Mobile navigation" style={{ gridTemplateColumns: `repeat(${isAdmin ? 5 : 3}, minmax(0, 1fr))` }}>
        <button className={activeTab === 'dashboard' ? 'is-active' : ''} onClick={() => setActiveTab('dashboard')}><Gavel size={19}/><span>Cases</span></button>
        <button className={activeTab === 'calendar' ? 'is-active' : ''} onClick={() => setActiveTab('calendar')}><CalIcon size={19}/><span>Calendar</span></button>
        {isAdmin && <button className={activeTab === 'tasks' ? 'is-active' : ''} onClick={() => setActiveTab('tasks')}><ClipboardList size={19}/><span>Tasks</span></button>}
        {isAdmin && <button className={activeTab === 'accounts' ? 'is-active' : ''} onClick={() => setActiveTab('accounts')}><DollarSign size={19}/><span>Accounts</span></button>}
        <button onClick={() => setMobileMenuOpen(true)}><Menu size={19}/><span>More</span></button>
      </nav>

      {modalMode === 'addTxn' && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print">
            <div className="lex-finance-entry-modal bg-white w-full max-w-lg rounded-xl shadow-2xl">
               <div className="bg-slate-900 p-4 text-white flex justify-between">
                  <h3 className="font-bold">{formData.id ? 'Edit Transaction' : 'New Transaction'}</h3>
                  <button onClick={() => { const returnMode = txnReturnMode; setTxnReturnMode(null); setModalMode(returnMode === 'caseFinance' || returnMode === 'viewCase' ? returnMode : null); }}><X/></button>
               </div>
               <div className="p-6 space-y-4">
                  <div className="flex gap-2">
                      <button onClick={() => setFormData({...formData, txn_type: 'Income'})} className={`flex-1 py-2 rounded font-bold ${formData.txn_type === 'Income' ? 'bg-green-600 text-white' : 'bg-gray-100 text-slate-900'}`}>Income</button>
                      <button onClick={() => setFormData({...formData, txn_type: 'Expense'})} className={`flex-1 py-2 rounded font-bold ${formData.txn_type === 'Expense' ? 'bg-red-600 text-white' : 'bg-gray-100 text-slate-900'}`}>Expense</button>
                  </div>
                  <div className="lex-form-field"><label>Transaction date</label><input type="date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
                  <div className="lex-form-field"><label>Voucher / receipt number <span className="font-normal normal-case">(auto-generated if blank)</span></label><input placeholder="e.g. LS-20261018-123456" value={formData.voucher_no || ''} onChange={e => setFormData({...formData, voucher_no: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
                  <div className="lex-form-field"><label>Link to case (optional)</label><select value={formData.case_id ? String(formData.case_id) : ''} onChange={e => setFormData({...formData, case_id: e.target.value || null})} disabled={txnReturnMode === 'caseFinance'} className="w-full border p-2 rounded text-slate-900 bg-white"><option value="">General / not linked to a case</option>{cases.map(c => <option key={c.id} value={String(c.id)}>{c.case_no || 'Case'} — {c.party_name || c.court_name || ''}</option>)}</select>{formData.case_id && <small className="text-xs text-indigo-700">This entry will appear in the linked case's financial summary.</small>}</div>
                  <div className="lex-form-field"><label>Client / payee name</label><input placeholder="Client Name" value={formData.client_name || ''} onChange={e => setFormData({...formData, client_name: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
                  <div className="lex-form-field"><label>Description</label><input placeholder="Describe the fee, cost or transaction" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
                  <div className="flex gap-2">
                     <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-1/2 border p-2 rounded text-slate-900 bg-white">
                        <option>Office</option><option>Personal</option><option>Client</option><option>Case Fee</option><option>Case Cost</option><option>Court Fee</option><option>Salary</option><option>Savings</option><option>Evidence</option><option>Affidavit</option><option>Order Sheet</option><option>Misc</option>
                      </select>
                      <select value={formData.payment_status} onChange={e => setFormData({...formData, payment_status: e.target.value})} className="w-1/2 border p-2 rounded text-slate-900 bg-white">
                        <option>Paid</option><option>Due</option>
                      </select>
                  </div>
                  <input type="number" placeholder="Amount" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full border p-2 rounded font-bold text-lg text-slate-900"/>
                  <button type="button" onClick={handleSaveTxn} disabled={isSavingTxn} className="w-full bg-slate-900 text-white py-3 rounded font-bold disabled:opacity-60 disabled:cursor-wait">{isSavingTxn ? 'Saving…' : formData.id ? 'UPDATE ENTRY' : 'SAVE ENTRY'}</button>
               </div>
            </div>
         </div>
      )}

      {modalMode === 'accountAudit' && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-5 no-print">
          <div className="lex-history-modal bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="lex-history-modal-header"><div><p>LEXSWORD · FINANCIAL CONTROLS</p><h3>Accounts audit log</h3><span>Latest 100 create, edit and delete events</span></div><button type="button" aria-label="Close audit log" onClick={() => setModalMode(null)}><X/></button></div>
            <div className="lex-history-modal-body custom-scrollbar">
              {accountAuditLoading && <div className="lex-case-finance-empty"><History size={24}/><strong>Loading audit history…</strong></div>}
              {!accountAuditLoading && accountAudit.length === 0 && <div className="lex-case-finance-empty"><History size={24}/><strong>No audit events yet</strong><span>New financial entries and subsequent edits or deletions will appear here.</span></div>}
              {!accountAuditLoading && accountAudit.map(entry => {
                const before = entry.transaction_snapshot?.before;
                const after = entry.transaction_snapshot?.after;
                const displayTxn = after || before || {};
                return <article key={entry.id} className="lex-history-log-entry">
                  <div className="lex-history-log-top"><strong>{entry.action === 'CREATE' ? 'Transaction created' : entry.action === 'UPDATE' ? 'Transaction updated' : 'Transaction deleted'}</strong><span>{entry.changed_at ? new Date(entry.changed_at).toLocaleString('en-GB') : 'Timestamp unavailable'}</span></div>
                  <div className="lex-audit-summary-row"><span>Voucher</span><strong>{displayTxn.voucher_no || '—'}</strong><span>Record ID</span><strong>{entry.account_id || '—'}</strong></div>
                  {before && <div className="lex-history-transition"><span>Before change</span><strong>{before.date || '—'} · {before.txn_type || 'Transaction'} · ৳{formatMoney(before.amount)} · {before.description || '—'} · {before.payment_status || '—'}</strong></div>}
                  {after && <div className="lex-history-transition is-new"><span>{entry.action === 'CREATE' ? 'Saved transaction' : 'After change'}</span><strong>{after.date || '—'} · {after.txn_type || 'Transaction'} · ৳{formatMoney(after.amount)} · {after.description || '—'} · {after.payment_status || '—'}</strong></div>}
                  <small className="lex-history-actor">{entry.changed_by_email ? `Changed by ${entry.changed_by_email}` : 'User not recorded'}</small>
                </article>;
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- Task Manager Modal --- */}
      {modalMode === 'addTask' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-slate-900 p-4 text-white flex justify-between">
              <h3 className="font-bold flex items-center gap-2"><CheckSquare/> New Task</h3>
              <button onClick={() => setModalMode(null)}><X/></button>
            </div>
            <div className="p-6 space-y-4">
               <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Task Title</label>
                  <input placeholder="e.g. Call Client Mr. Rahim" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border p-3 rounded text-slate-900"/>
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Details (Optional)</label>
                  <textarea rows="2" placeholder="Details..." value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full border p-3 rounded text-slate-900"/>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Due Date</label>
                      <input type="date" value={formData.due_date} onChange={e => setFormData({...formData, due_date: e.target.value})} className="w-full border p-3 rounded text-slate-900"/>
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                      <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full border p-3 rounded text-slate-900 bg-white">
                        <option>Normal</option><option>High</option><option>Urgent</option><option>Low</option>
                      </select>
                  </div>
               </div>
                <button onClick={handleSaveTask} className="w-full bg-slate-900 text-white py-3 rounded font-bold hover:bg-[#c5a059]">CREATE TASK</button>
            </div>
          </div>
        </div>
      )}

      {/* Premium hearing update + order history capture */}
      {modalMode === 'updateStatus' && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print">
          <div className="lex-update-modal bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="lex-update-modal-header">
              <div className="flex items-center gap-3"><span className="lex-modal-icon"><RefreshCw size={19}/></span><div><p>CASE WORKFLOW</p><h3>Update hearing & order</h3></div></div>
              <button type="button" aria-label="Close update dialog" onClick={() => setModalMode(null)}><X size={21}/></button>
            </div>
            <div className="p-5 md:p-7 space-y-5">
              <div className="lex-update-case-summary"><span>CASE NUMBER</span><strong>{formData.case_no || 'N/A'}</strong><small>{formData.party_name || formData.court_name || 'Case record'}</small></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="lex-form-field"><label>Order / hearing date</label><input type="date" value={formData.order_date || formData.next_date || today} onChange={e => setFormData({...formData, order_date: e.target.value})} className="w-full"/><small>যে তারিখের আদেশের সারাংশ সংরক্ষণ করছেন।</small></div>
                <div className="lex-form-field"><label>Next hearing date <span>*</span></label><input type="date" value={formData.next_date || ''} onChange={e => setFormData({...formData, next_date: e.target.value})} className="w-full" required/></div>
                <div className="lex-form-field sm:col-span-2"><label>Next step / পদক্ষেপ <span>*</span></label><input value={formData.current_step || ''} onChange={e => setFormData({...formData, current_step: e.target.value})} placeholder="যেমন: সাক্ষ্য গ্রহণ, যুক্তিতর্ক, আদেশের জন্য" className="w-full" required/></div>
                <div className="lex-form-field sm:col-span-2"><label>Order summary / আদেশের সারাংশ</label><textarea rows="5" value={formData.note || ''} onChange={e => setFormData({...formData, note: e.target.value})} placeholder="আজকের আদেশ, আদালতের নির্দেশনা, সম্পন্ন কাজ এবং পরবর্তী করণীয় লিখুন..." className="w-full"/><small>সেভ করলে সারাংশটি মামলার History-তে থাকবে; বর্তমান তারিখ ও পদক্ষেপও আপডেট হবে।</small></div>
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setModalMode(null)} className="lex-secondary-action">Cancel</button>
                <button type="button" onClick={handleUpdateStatus} disabled={isUpdating} className="lex-primary-action"><Save size={17}/>{isUpdating ? 'Saving history…' : 'Save update & order history'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

     {modalMode === 'addCase' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print">
          <div className="lex-case-entry-modal bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="lex-case-entry-header bg-slate-900 p-4 text-white flex justify-between">
              <div><p>LEXSWORD · CASE MANAGEMENT</p><h3 className="font-bold flex items-center gap-2"><Gavel/> {formData.id ? 'Edit case record' : 'Create new case'}</h3><span>মামলার তথ্য নির্ভুলভাবে সংরক্ষণ করুন।</span></div>
              <button type="button" aria-label="Close case form" onClick={() => setModalMode(null)}><X/></button>
            </div>
            
            <div className="p-6">
               {/* Court Type Selection (Always Visible) */}
               <div className="mb-6 w-full md:w-1/3">
                 <label className="text-sm font-bold text-slate-700 block mb-2">Select Court Type First:</label>
                 <select value={formData.court_type} onChange={e => setFormData({...formData, court_type: e.target.value})} className="w-full border-2 border-[#c5a059] p-2 rounded text-slate-900 bg-yellow-50 font-bold focus:outline-none">
                   <option>Judge Court</option>
                   <option>High Court</option>
                 </select>
               </div>

               {/* ============================================================== */}
               {/* HIGH COURT FIELDS (Conditional) */}
               {/* ============================================================== */}
               {formData.court_type === 'High Court' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 border-t pt-4 border-slate-200">
                    <div className="space-y-1"><label className="text-xs font-bold text-slate-700">District Name</label>
                    <input value={formData.district_name || ''} onChange={e => setFormData({...formData, district_name: e.target.value})} className="w-full border p-2 rounded text-slate-900 bg-white" placeholder="Enter District"/></div>

                    <div className="space-y-1"><label className="text-xs font-bold text-slate-700">File Name / No.</label>
                    <input value={formData.file_no || ''} onChange={e => setFormData({...formData, file_no: e.target.value})} className="w-full border p-2 rounded text-slate-900 bg-white" placeholder="Enter File Name"/></div>

                    <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Court Name</label>
                    <input value={formData.court_name || ''} onChange={e => setFormData({...formData, court_name: e.target.value})} className="w-full border p-2 rounded text-slate-900 bg-white" placeholder="High Court Division"/></div>

                    <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Case Number</label>
                    <input value={formData.case_no || ''} onChange={e => setFormData({...formData, case_no: e.target.value})} className="w-full border p-2 rounded text-slate-900 bg-white" placeholder="e.g. Writ Petition 123/2026"/></div>

                    <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Party Name</label>
                    <input value={formData.party_name || ''} onChange={e => setFormData({...formData, party_name: e.target.value})} className="w-full border p-2 rounded text-slate-900 bg-white" placeholder="Plaintiff vs Defendant"/></div>

                    <div className="space-y-1"><label className="text-xs font-bold text-slate-700">On Behalf Of</label>
                    <input value={formData.on_behalf_of || ''} onChange={e => setFormData({...formData, on_behalf_of: e.target.value})} className="w-full border p-2 rounded text-slate-900 bg-white" placeholder="Petitioner / Respondent"/></div>

                    <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Status</label>
                    <select value={formData.status || 'Ongoing'} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border p-2 rounded text-slate-900 bg-white">
                      <option>Ongoing</option><option>Disposed</option>
                    </select></div>

                    <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Present Status</label>
                    <input value={formData.present_status || ''} onChange={e => setFormData({...formData, present_status: e.target.value})} className="w-full border p-2 rounded text-slate-900 bg-white" placeholder="Current Situation"/></div>

                    <div className="space-y-1"><label className="text-xs font-bold text-red-700">Next Date</label>
                    <input type="date" value={formData.next_date || ''} onChange={e => setFormData({...formData, next_date: e.target.value})} className="w-full border border-red-300 p-2 rounded bg-white text-slate-900"/></div>

                    <div className="space-y-1"><label className="text-xs font-bold text-red-700">Step / Next Step</label>
                    <input value={formData.current_step || ''} onChange={e => setFormData({...formData, current_step: e.target.value})} className="w-full border border-red-300 p-2 rounded bg-white text-slate-900" placeholder="Next Hearing"/></div>

                    <div className="space-y-1 lg:col-span-2"><label className="text-xs font-bold text-slate-700">Order Summary</label>
                    <textarea rows="2" value={formData.note || ''} onChange={e => setFormData({...formData, note: e.target.value})} placeholder="Write order summary here..." className="w-full border p-2 rounded bg-white text-slate-900"></textarea></div>
                  </div>
               ) : (
               /* ============================================================== */
               /* JUDGE COURT FIELDS (Default/Previous) */
               /* ============================================================== */
                  <div className="grid md:grid-cols-2 gap-4 border-t pt-4 border-slate-200">
                    <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Case Nature / Type</label>
                    <select value={formData.case_nature} onChange={e => setFormData({...formData, case_nature: e.target.value})} className="w-full border p-2 rounded text-slate-900 bg-white">
                      <option value="">-- Select Type --</option>
                      <option>Civil Suit</option><option>Criminal Case</option>
                      <option>Civil Revision</option><option>Criminal Revision</option>
                      <option>Civil Appeal</option><option>Criminal Appeal</option><option>Misc Case</option>
                    </select></div>

                    <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Court Name</label>
                    <input value={formData.court_name} onChange={e => setFormData({...formData, court_name: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
                    <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Case No</label>
                    <input value={formData.case_no} onChange={e => setFormData({...formData, case_no: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
                    <div className="space-y-1"><label className="text-xs font-bold text-slate-700">File No (ফাইল নম্বর)</label>
                    <input value={formData.file_no || ''} onChange={e => setFormData({...formData, file_no: e.target.value})} className="w-full border p-2 rounded text-slate-900"/></div>
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
                    <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-slate-700">Case Note / Order Summary</label>
                        <textarea rows="1" value={formData.note || ''} onChange={e => setFormData({...formData, note: e.target.value})} placeholder="আদেশের সারাংশ বা নোট লিখুন..." className="w-full border p-2 rounded bg-white text-slate-900"></textarea>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-2 gap-4 bg-yellow-50 p-4 rounded border border-yellow-200">
                      <div className="space-y-1"><label className="text-xs font-bold text-red-700">Next Date</label>
                      <input type="date" value={formData.next_date} onChange={e => setFormData({...formData, next_date: e.target.value})} className="w-full border p-2 rounded bg-white text-slate-900"/></div>
                      <div className="space-y-1"><label className="text-xs font-bold text-red-700">Next Step</label>
                      <input value={formData.current_step} onChange={e => setFormData({...formData, current_step: e.target.value})} className="w-full border p-2 rounded bg-white text-slate-900"/></div>
                    </div>
                  </div>
               )}

            </div>
            
            <div className="lex-case-entry-footer p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
               <button onClick={() => setModalMode(null)} className="px-6 py-2 border border-slate-300 bg-white rounded text-slate-700 font-bold hover:bg-slate-100">Cancel</button>
               <button type="button" onClick={handleSaveCase} disabled={isSavingCase} className="px-8 py-2 bg-slate-900 text-white rounded font-bold hover:bg-[#c5a059] transition shadow disabled:opacity-60 disabled:cursor-wait"><Save size={16} className="inline mr-2"/>{isSavingCase ? 'Saving…' : 'SAVE CASE'}</button>
            </div>
          </div>
        </div>
      )}
      {modalMode === 'viewCase' && selectedCase && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="lex-case-detail-modal bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto text-slate-900">
             <div className="lex-case-detail-header bg-slate-900 p-4 text-white flex justify-between items-center">
                <div><p>LEXSWORD · CASE FILE</p><h3 className="font-bold flex items-center gap-2">{selectedCase.case_no || 'Case Record'}</h3><span>{selectedCase.party_name || selectedCase.court_name || 'Case details and proceedings'}</span></div>
                <div className="flex items-center gap-2">{isAdmin && <button type="button" onClick={() => { setFormData({...selectedCase, order_date: selectedCase.next_date || today, note: ''}); setModalMode('updateStatus'); }} className="lex-case-header-update"><RefreshCw size={15}/> Update</button>}<button type="button" aria-label="Close case profile" onClick={() => setModalMode(null)}><X/></button></div>
             </div>
             <div className="p-4 md:p-6 space-y-6">
                <div className="lex-case-detail-hero">
                  <div><p>NEXT HEARING</p><strong>{selectedCase.next_date ? selectedCase.next_date.split('-').reverse().join('-') : 'Not scheduled'}</strong><span>{selectedCase.current_step || 'Next step not specified'}</span></div>
                  <span className={`lex-case-status-pill ${selectedCase.status === 'Disposed' ? 'is-disposed' : 'is-active'}`}>{selectedCase.status || 'Ongoing'}</span>
                </div>
                <div className="lex-case-detail-section-head"><div><p className="lex-section-eyebrow">CASE PROFILE</p><h4>Case information</h4></div><button type="button" onClick={() => { fetchHistory(selectedCase.id); setModalMode('history'); }} className="lex-history-link"><History size={16}/> Full history</button></div>
                <div className="lex-case-detail-grid">
                  {[
                    ['Court type', selectedCase.court_type],
                    ['Case nature', selectedCase.case_nature],
                    ['Court name', selectedCase.court_name],
                    ['File number', selectedCase.file_no],
                    ['District', selectedCase.district_name],
                    ['Case section', selectedCase.section],
                    ['Party name', selectedCase.party_name],
                    ['On behalf of', selectedCase.on_behalf_of],
                    ['Client mobile', selectedCase.client_mobile],
                    ['Present status', selectedCase.present_status],
                    ['Case status', selectedCase.status]
                  ].filter(([label, value]) => value !== null && value !== undefined && String(value).trim() !== '').map(([label, value]) => (
                    <div key={label} className="lex-case-detail-field"><span>{label}</span><strong>{String(value)}</strong></div>
                  ))}
                </div>
                {selectedCase.note && <div className="lex-case-current-note"><span>Current case note</span><p>{selectedCase.note}</p></div>}

                {isAdmin && (
                  <section className="lex-case-finance-preview">
                    <div className="lex-case-detail-section-head"><div><p className="lex-section-eyebrow">CASE FINANCE</p><h4>Fees, costs & outstanding dues</h4></div><button type="button" className="lex-finance-open-link" onClick={() => openCaseFinance(selectedCase, 'viewCase')}><PieChart size={16}/> Full financial summary</button></div>
                    <div className="lex-case-finance-preview-grid">
                      <div><span>Total income / fees</span><strong className="is-income">৳{formatMoney(caseFinanceTotals.totalIncome)}</strong></div>
                      <div><span>Total expenses</span><strong className="is-expense">৳{formatMoney(caseFinanceTotals.totalExpense)}</strong></div>
                      <div><span>Net profit / margin</span><strong className={caseFinanceTotals.profit >= 0 ? 'is-income' : 'is-expense'}>৳{formatMoney(caseFinanceTotals.profit)}</strong></div>
                      <div><span>Receivable due</span><strong className="is-due">৳{formatMoney(caseFinanceTotals.dueIncome)}</strong></div>
                    </div>
                    <div className="lex-case-finance-quick-actions"><button type="button" className="is-fee" onClick={() => openCaseTransaction(selectedCase, 'Income', 'viewCase')}><DollarSign size={16}/> Add fee</button><button type="button" className="is-cost" onClick={() => openCaseTransaction(selectedCase, 'Expense', 'viewCase')}><TrendingDown size={16}/> Add cost</button></div>
                  </section>
                )}

                <section className="lex-case-timeline-section">
                  <div className="lex-case-detail-section-head"><div><p className="lex-section-eyebrow">COURT PROCEEDINGS</p><h4>Order & hearing history</h4></div><span className="lex-timeline-count">{historyLog.length} record{historyLog.length === 1 ? '' : 's'}</span></div>
                  {historyLog.length === 0 ? (
                    <div className="lex-case-history-empty"><History size={22}/><strong>No order history recorded yet</strong><span>তারিখ ও পদক্ষেপ আপডেট করার সময় আদেশের সারাংশ লিখলে এখানে সংরক্ষিত হবে।</span></div>
                  ) : (
                    <div className="lex-case-timeline">
                      {historyLog.slice(0, 5).map((h, i) => (
                        <article key={h.id || `${h.prev_date}-${i}`} className="lex-case-timeline-entry">
                          <span className="lex-case-timeline-dot"></span>
                          <div className="lex-case-timeline-meta"><strong>{(h.order_date || h.prev_date) ? (h.order_date || h.prev_date).split('-').reverse().join('-') : 'Date not recorded'}</strong><span>{h.recorded_at ? new Date(h.recorded_at).toLocaleString('en-GB') : 'History record'}</span></div>
                          <h5>{h.new_step || h.prev_step || 'Step not recorded'}</h5>
                          {(h.prev_date || h.prev_step) && <div className="lex-history-transition"><span>Previous listing</span><strong>{h.prev_date ? h.prev_date.split('-').reverse().join('-') : '—'} · {h.prev_step || 'Step not recorded'}</strong></div>}
                          {(h.new_date || h.new_step) && <div className="lex-history-transition is-new"><span>Next listing</span><strong>{h.new_date ? h.new_date.split('-').reverse().join('-') : '—'} · {h.new_step || 'Step not recorded'}</strong></div>}
                          {h.note ? <p>{h.note}</p> : <p className="is-muted">No order summary was entered for this record.</p>}
                          {h.updated_by_email && <small className="lex-history-actor">Updated by {h.updated_by_email}</small>}
                        </article>
                      ))}
                    </div>
                  )}
                </section>

                <div>
                   <div className="flex justify-between items-center mb-4 border-b pb-2">
                     <h4 className="font-bold text-lg flex items-center gap-2 text-slate-900"><FolderOpen className="text-[#c5a059]"/> Professional Digital Case File Manager</h4>
                     <button onClick={() => fetchDocuments(selectedCase.id)} className="text-xs underline text-slate-600">Sync Files</button>
                   </div>
                   
                   {isAdmin && (
                     <div className="bg-blue-50 p-4 rounded flex gap-2 items-end mb-4 border border-blue-200">
                        <div className="flex-1 space-y-1">
                           <label className="text-xs font-bold text-slate-600">Folder</label>
                           <select className="w-full p-2 border rounded text-sm text-slate-900 bg-white" value={newDoc.folder_type} onChange={e => setNewDoc({...newDoc, folder_type: e.target.value})}>
                               <option>Plaint (Arji)</option><option>Written Statement (Jabab)</option>
                              <option>Complaint (Nalishi)</option><option>Judgment</option><option>Evidence</option><option>Affidavit</option><option>Order Sheet</option><option>Misc</option>
                           </select>
                        </div>
                        <div className="flex-1 space-y-1">
                           <label className="text-xs font-bold text-slate-600">Doc Name</label>
                           <input placeholder="e.g. Certified Copy" className="w-full p-2 border rounded text-sm text-slate-900" value={newDoc.doc_name} onChange={e => setNewDoc({...newDoc, doc_name: e.target.value})}/>
                        </div>
                        <div className="flex-[2] space-y-1">
                           <label className="text-xs font-bold text-slate-600">Drive Link</label>
                           <input placeholder="https://..." className="w-full p-2 border rounded text-sm text-slate-900" value={newDoc.drive_link} onChange={e => setNewDoc({...newDoc, drive_link: e.target.value})}/>
                        </div>
                        <button onClick={handleSaveDoc} className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#c5a059]">
                            {newDoc.id ? 'UPDATE' : 'ADD'}
                        </button>
                     </div>
                   )}
                   
                   <div className="space-y-2">
                      {documents.map(d => (
                         <div key={d.id} className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                           <div className="flex items-center gap-3">
                               <Folder className="text-yellow-500" size={18}/>
                               <div><p className="font-bold text-sm text-slate-900">{d.folder_type}</p><p className="text-xs text-slate-500">{d.doc_name}</p></div>
                           </div>
                            <div className="flex items-center gap-2">
                                <a href={d.drive_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 font-bold text-xs border border-blue-200 px-3 py-1 rounded hover:bg-blue-50">OPEN <ExternalLink size={12}/></a>
                                {isAdmin && (
                                   <>
                                     <button onClick={() => setNewDoc(d)} className="text-blue-600 hover:bg-blue-100 p-1 rounded" title="Edit Link/Folder"><Edit3 size={16}/></button>
                                     <button onClick={() => handleDeleteDoc(d.id)} className="text-red-600 hover:bg-red-100 p-1 rounded" title="Delete Doc"><Trash2 size={16}/></button>
                                   </>
                                )}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
           </div>
        </div>
      )}

      {modalMode === 'caseFinance' && selectedCase && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-5 no-print">
          <div className="lex-case-finance-modal bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col">
            <header className="lex-case-finance-header">
              <div className="min-w-0"><p>LEXSWORD · CASE FINANCIAL STATEMENT</p><h3>{selectedCase.case_no || 'Case financial summary'}</h3><span>{selectedCase.party_name || selectedCase.court_name || 'Linked case'} · {selectedCase.court_name || selectedCase.court_type || ''}</span></div>
              <div className="lex-case-finance-header-actions"><button type="button" className="is-fee" onClick={() => openCaseTransaction(selectedCase, 'Income', 'caseFinance')}><DollarSign size={16}/> Add fee</button><button type="button" className="is-cost" onClick={() => openCaseTransaction(selectedCase, 'Expense', 'caseFinance')}><TrendingDown size={16}/> Add cost</button><button type="button" className="is-close" aria-label="Close case financial summary" onClick={() => { const returnMode = financeReturnMode; setFinanceReturnMode(null); setModalMode(returnMode || null); }}><X size={20}/></button></div>
            </header>
            <div className="lex-case-finance-body custom-scrollbar">
              <div className="lex-case-finance-kpis">
                <div className="is-income"><span>Total income / fees</span><strong>৳{formatMoney(caseFinanceTotals.totalIncome)}</strong><small>All fee and income entries</small></div>
                <div className="is-received"><span>Received income</span><strong>৳{formatMoney(caseFinanceTotals.received)}</strong><small>Marked as paid</small></div>
                <div className="is-expense"><span>Total costs / expenses</span><strong>৳{formatMoney(caseFinanceTotals.totalExpense)}</strong><small>Paid and unpaid costs</small></div>
                <div className={caseFinanceTotals.profit >= 0 ? 'is-income' : 'is-expense'}><span>Net profit / margin</span><strong>৳{formatMoney(caseFinanceTotals.profit)}</strong><small>Total income minus total costs</small></div>
                <div className="is-due"><span>Receivable due</span><strong>৳{formatMoney(caseFinanceTotals.dueIncome)}</strong><small>Income entries still due</small></div>
                <div className="is-payable"><span>Payable cost</span><strong>৳{formatMoney(caseFinanceTotals.dueExpense)}</strong><small>Expenses still due</small></div>
              </div>
              <div className="lex-case-finance-cashline"><div><span>Net cash collected / paid</span><strong>৳{formatMoney(caseFinanceTotals.netCash)}</strong></div><p>Net cash = received income − paid expenses. The margin above includes due amounts, so both figures are shown separately.</p></div>
              <section className="lex-case-finance-transactions">
                <div className="lex-case-finance-section-head"><div><p>CASE LEDGER</p><h4>Transaction history</h4><span>{caseFinanceTransactions.length} linked transaction{caseFinanceTransactions.length === 1 ? '' : 's'} · sorted by date</span></div><button type="button" onClick={() => openCaseTransaction(selectedCase, 'Income', 'caseFinance')}><Plus size={16}/> New entry</button></div>
                {caseFinanceTransactions.length === 0 ? <div className="lex-case-finance-empty"><PieChart size={28}/><strong>No financial entries for this case yet</strong><span>Add a fee or cost here, or link an existing Accounts entry to this case.</span></div> : (
                  <div className="lex-case-finance-list">
                    {caseFinanceTransactions.map(txn => (
                      <article key={txn.id} className="lex-case-finance-row">
                        <div className="lex-case-finance-row-date"><strong>{txn.date ? txn.date.split('-').reverse().join('-') : 'No date'}</strong><span>{txn.voucher_no || 'No voucher no.'}</span></div>
                        <div className="lex-case-finance-row-copy"><strong>{txn.description || 'Transaction'}</strong><span>{txn.client_name || selectedCase.party_name || '—'} · {txn.category || 'General'}</span></div>
                        <span className={`lex-finance-type-pill ${txn.txn_type === 'Income' ? 'is-income' : 'is-expense'}`}>{txn.txn_type === 'Income' ? 'Income' : 'Expense'}</span>
                        <span className={`lex-finance-status-pill ${txn.payment_status === 'Paid' ? 'is-paid' : 'is-due'}`}>{txn.payment_status || 'Unspecified'}</span>
                        <strong className={`lex-case-finance-row-amount ${txn.txn_type === 'Income' ? 'is-income' : 'is-expense'}`}>{txn.txn_type === 'Income' ? '+' : '−'}৳{formatMoney(txn.amount)}</strong>
                        <div className="lex-case-finance-row-actions"><button type="button" title="Edit transaction" onClick={() => openTransactionEditor(txn, 'caseFinance')}><Edit3 size={16}/></button><button type="button" title="Delete transaction" onClick={() => handleDeleteTxn(txn.id)}><Trash2 size={16}/></button></div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      )}

      {modalMode === 'history' && (
         <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-5 no-print">
            <div className="lex-history-modal bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
               <div className="lex-history-modal-header"><div><p>LEXSWORD · PROCEEDINGS</p><h3>Case history log</h3><span>{selectedCase?.case_no || 'Case record'}</span></div><button aria-label="Back to case details" onClick={() => setModalMode('viewCase')}><ChevronLeft/></button></div>
               <div className="lex-history-modal-body custom-scrollbar">
                  {historyLog.length === 0 && <div className="lex-case-history-empty"><History size={24}/><strong>No history entries</strong><span>নতুন তারিখ ও পদক্ষেপ আপডেট করার সময় আদেশের সারাংশ সংরক্ষণ হবে।</span></div>}
                  {historyLog.map((h, i) => (
                     <article key={h.id || i} className="lex-history-log-entry">
                        <div className="lex-history-log-top"><strong>{(h.order_date || h.prev_date) ? (h.order_date || h.prev_date).split('-').reverse().join('-') : 'Date not recorded'}</strong><span>{h.recorded_at ? new Date(h.recorded_at).toLocaleString('en-GB') : 'Recorded date unavailable'}</span></div>
                        {(h.prev_date || h.prev_step) && <div className="lex-history-transition"><span>Previous listing</span><strong>{h.prev_date ? h.prev_date.split('-').reverse().join('-') : '—'} · {h.prev_step || 'Step not recorded'}</strong></div>}
                        {(h.new_date || h.new_step) && <div className="lex-history-transition is-new"><span>Next listing</span><strong>{h.new_date ? h.new_date.split('-').reverse().join('-') : '—'} · {h.new_step || 'Step not recorded'}</strong></div>}
                        {h.note && <p className="lex-history-log-note">{h.note}</p>}
                        {h.updated_by_email && <small className="lex-history-actor">Updated by {h.updated_by_email}</small>}
                     </article>
                  ))}
               </div>
             </div>
         </div>
      )}

      {/* --- NEW: LOAN ADD / EDIT MODAL --- */}
      {modalMode === 'addLoanTxn' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-slate-900 p-4 text-white flex justify-between">
               <h3 className="font-bold flex items-center gap-2"><Landmark/> Add Loan / Debt Record</h3>
              <button onClick={() => setModalMode(null)}><X/></button>
            </div>
            <div className="p-6 space-y-4">
                <div>
                    <label className="text-xs font-bold text-slate-700">Person / Organization Name</label>
                    <input value={formData.person_name} onChange={e => setFormData({...formData, person_name: e.target.value})} placeholder="e.g. Rahim, Bank, etc." className="w-full border p-3 rounded text-slate-900" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-slate-700">Category</label>
                        <select value={formData.loan_category} onChange={e => setFormData({...formData, loan_category: e.target.value})} className="w-full border p-3 rounded text-slate-900 bg-white">
                            <option value="Taken">I Borrowed</option>
                            <option value="Given">I Lent</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-700">Action Type</label>
                        <select value={formData.action} onChange={e => setFormData({...formData, action: e.target.value})} className="w-full border p-3 rounded text-slate-900 bg-white">
                            <option value="Add">Add / Increase Loan</option>
                            <option value="Repay">Repayment / Adjusted</option>
                         </select>
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-700">Date</label>
                    <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border p-3 rounded text-slate-900" />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-700">Amount</label>
                    <input type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} placeholder="0.00" className="w-full border p-3 rounded text-slate-900 font-bold text-lg" />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-700">Note / Description (Optional)</label>
                    <input value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} placeholder="Reason or method..." className="w-full border p-3 rounded text-slate-900" />
                 </div>
                <button onClick={handleSaveLoanTxn} className="w-full bg-slate-900 text-white py-3 rounded font-bold hover:bg-[#c5a059]">SAVE RECORD</button>
            </div>
          </div>
        </div>
      )}

      {/* --- NEW: LOAN HISTORY MODAL --- */}
      {modalMode === 'viewLoanHistory' && selectedCase && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-slate-900 p-4 text-white flex justify-between">
              <h3 className="font-bold">Transaction History: {selectedCase.person_name}</h3>
              <button onClick={() => setModalMode(null)}><X/></button>
            </div>
         
            <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
                <span className="font-bold text-slate-700">Total Balance:</span>
                <span className={`text-xl font-bold ${selectedCase.loan_category === 'Taken' ? 'text-red-600' : 'text-green-600'}`}>৳{selectedCase.balance}</span>
            </div>
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
                {selectedCase.history.sort((a,b) => new Date(b.date) - new Date(a.date)).map((h, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border rounded bg-white shadow-sm">
                        <div>
                            <p className="font-bold text-sm text-slate-900">{h.date}</p>
                            <p className="text-xs text-slate-500">{h.note || (h.action === 'Add' ? 'Loan Increased' : 'Repayment')}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`font-bold ${h.action === 'Add' ? 'text-red-600' : 'text-green-600'}`}>
                                {h.action === 'Add' ? '+' : '-'} ৳{h.amount}
                            </span>
                            <button onClick={() => handleDeleteLoanTxn(h.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
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
    const { data, error } = await supabase.from('profiles').select('role').eq('id', uid).single();
    if (data) {
      setUserRole(data.role);
      setView('dashboard');
      setLoading(false);
    } else {
      alert("Error: Profile not found! Please ask the Admin to add your profile in the database.");
      setLoading(false); 
      supabase.auth.signOut(); 
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
   
  return <AdminDashboard session={session} userRole={userRole} onLogout={() => supabase.auth.signOut()} />;
}

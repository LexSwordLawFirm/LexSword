import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Scale, Gavel, DollarSign, Bell, 
  Calendar as CalIcon, Save, Trash2, 
  ExternalLink, MessageCircle, FolderOpen, LogOut, 
  Plus, X, Edit3, Filter, ChevronLeft, ChevronRight, 
  Eye, History, User, Lock, Folder, Check, Mail, Phone, MapPin, 
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
        // Trigger when 10% of element is visible
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
          // Stop observing once animated for performance
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
  const establishedYear = 2016;
  const currentYear = new Date().getFullYear();
  const yearsOfService = currentYear - establishedYear;

  // Initialize Scroll Animation
  useScrollAnimation();

  // Navbar Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    // Simulate submission success for demo
    setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccessModal(true);
        e.target.reset();
    }, 1500);
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
      
      {/* --- CUSTOM STYLES & ANIMATIONS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Outfit:wght@300;400;500;700&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Outfit', sans-serif; }
        
        /* Modern Reveal Animation Classes */
        .reveal-modern {
            opacity: 0;
            filter: blur(8px);
            transform: translateY(40px) scale(0.98);
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); /* Smooth easing */
        }
        .reveal-modern.animate-active {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0) scale(1);
        }
        
        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-300 { transition-delay: 0.3s; }

        /* Custom Gradients & Colors */
        /* Soft Blue Gradient */
        .bg-soft-blue-gradient { background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%); } 
        .bg-soft-blue-solid { background-color: #1e293b; }

        .text-gold { color: #c5a059; }
        .bg-gold { background-color: #c5a059; }
        .border-gold { border-color: #c5a059; }
        
        .section-title-bar {
            width: 60px;
            height: 3px;
            background-color: #c5a059;
            margin: 1rem auto;
        }

        /* Floating animation for Hero Image */
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* --- Header / Navbar --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full border-2 ${scrolled ? 'border-[#c5a059] text-[#c5a059]' : 'border-white text-[#c5a059]'}`}>
              <Scale size={22} />
            </div>
            <div>
              <h1 className={`text-2xl font-serif font-bold tracking-widest ${scrolled ? 'text-slate-900' : 'text-white'}`}>LEXSWORD</h1>
              <p className={`text-[10px] font-bold tracking-[0.3em] uppercase ${scrolled ? 'text-gray-500' : 'text-gray-300'} mt-1`}>Chambers of Law</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wider ${scrolled ? 'text-slate-800' : 'text-white'}`}>
            <a href="#home" className="hover:text-[#c5a059] transition border-b-2 border-transparent hover:border-[#c5a059] pb-1">Home</a>
            <a href="#about" className="hover:text-[#c5a059] transition border-b-2 border-transparent hover:border-[#c5a059] pb-1">About</a>
            <a href="#practice" className="hover:text-[#c5a059] transition border-b-2 border-transparent hover:border-[#c5a059] pb-1">Practice Areas</a>
            <a href="#team" className="hover:text-[#c5a059] transition border-b-2 border-transparent hover:border-[#c5a059] pb-1">Team</a>
            <a href="#contact" className="hover:text-[#c5a059] transition border-b-2 border-transparent hover:border-[#c5a059] pb-1">Contact</a>
          </div>

          {/* Right Info */}
          <div className="hidden md:flex items-center gap-6">
             <a href="tel:+8801911008518" className="flex items-center gap-3 group">
                <div className={`text-[#c5a059] group-hover:animate-pulse`}>
                   <Phone size={24}/>
                </div>
                <div className={`${scrolled ? 'text-slate-800' : 'text-white'} leading-tight`}>
                   <p className="text-[10px] opacity-80 uppercase">Call for Consultation</p>
                   <p className="font-bold text-lg">+88 01911 008 518</p>
                </div>
             </a>
             <button onClick={onLoginClick} className="bg-[#c5a059] text-white px-5 py-2 rounded-sm font-bold text-xs uppercase tracking-wide hover:bg-slate-900 transition shadow-md">
                {loading ? '...' : 'Login Portal'}
             </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className={`lg:hidden ${scrolled ? 'text-slate-900' : 'text-white'}`}>
            {menuOpen ? <X size={28}/> : <Menu size={28}/>}
          </button>
        </div>

        {/* Mobile Menu */}
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

      {/* --- 1. HERO SECTION (SOFT BLUE GRADIENT + 3D LAW VECTOR) --- */}
      <header id="home" className="relative min-h-screen flex items-center bg-soft-blue-gradient overflow-hidden pt-28 pb-16 md:py-0">
         {/* Subtle Pattern Overlay */}
         <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

         <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side Text */}
            <div className="space-y-6 reveal-modern order-2 md:order-1 relative z-20 text-center md:text-left">
               <p className="text-[#c5a059] font-bold text-lg md:text-xl tracking-wide flex items-center justify-center md:justify-start gap-2">
                  <span className="w-8 h-[2px] bg-[#c5a059]"></span> Established {establishedYear}
               </p>
               
               <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1]">
                  Defending Your Rights, <br/>
                  <span className="text-[#c5a059]">Securing Your Future.</span>
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

            {/* Right Side Vector Art with Animation */}
            <div className="order-1 md:order-2 reveal-modern delay-200 flex justify-center md:justify-end relative">
               {/* 3D Law Illustration Placeholder */}
               <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
               <img 
                  src="https://cdni.iconscout.com/illustration/premium/thumb/law-and-justice-5648538-4708176.png" 
                  alt="Law and Justice Vector Art" 
                  className="w-full max-w-md md:max-w-lg animate-float drop-shadow-2xl relative z-10"
               />
            </div>
         </div>
      </header>

      {/* --- 2. THREE COLORED CARDS (MODERN UX, NO READ MORE) --- */}
      <section className="relative z-20 -mt-16 md:-mt-24 px-4 md:px-0">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 shadow-2xl reveal-modern delay-200">
             
             {/* Card 1: Light Beige (Request Quote) */}
             <div className="bg-[#fdfaf5] p-10 md:p-12 text-center group hover:-translate-y-2 transition duration-300 border-b-4 border-transparent hover:border-[#c5a059]">
                <div className="text-[#c5a059] mb-4 flex justify-center group-hover:scale-110 transition"><ClipboardList size={48}/></div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">Case Evaluation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Submit your case details for a preliminary assessment by our legal experts to understand your position.</p>
             </div>

             {/* Card 2: Gold/Tan (Investigation) */}
             <div className="bg-[#cfa660] p-10 md:p-12 text-center group hover:-translate-y-2 transition duration-300 relative overflow-hidden border-b-4 border-transparent hover:border-white">
                <div className="text-white mb-4 flex justify-center group-hover:scale-110 transition"><Search size={48}/></div>
                <h3 className="text-xl font-serif font-bold text-white mb-3">Legal Investigation</h3>
                <p className="text-white/90 text-sm leading-relaxed">We conduct thorough factual and legal investigations to build a strong foundation for your case strategy.</p>
             </div>

             {/* Card 3: Dark Brown/Black (Case Fight) */}
             <div className="bg-[#2a2520] p-10 md:p-12 text-center group hover:-translate-y-2 transition duration-300 border-b-4 border-transparent hover:border-[#c5a059]">
                <div className="text-[#c5a059] mb-4 flex justify-center group-hover:scale-110 transition"><Gavel size={48}/></div>
                <h3 className="text-xl font-serif font-bold text-white mb-3">Court Representation</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Aggressive and strategic representation in trial and appellate courts to fight for the best possible outcome.</p>
             </div>

          </div>
      </section>

      {/* --- 3. ABOUT SECTION (Full Image & Signature) --- */}
      <section id="about" className="py-20 md:py-28 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
             <div className="relative reveal-modern h-full min-h-[400px] md:min-h-[500px]">
                 <div className="absolute top-4 left-4 w-full h-full border-4 border-[#c5a059] rounded-sm -z-10"></div>
                 {/* Using object-contain to show full image without cropping */}
                 <img src="/head.jpg" alt="Advocate Azadur Rahman" className="w-full h-full object-contain shadow-lg rounded-sm grayscale hover:grayscale-0 transition duration-700 bg-gray-50"/>
                 <div className="absolute bottom-10 left-[-10px] bg-soft-blue-solid text-white p-6 md:p-8 max-w-[220px] shadow-2xl border-t-4 border-[#c5a059]">
                    <span className="block text-5xl font-serif font-bold text-[#c5a059]">{yearsOfService}+</span>
                    <span className="block text-sm uppercase font-bold mt-2 leading-tight">Years of Professional Service</span>
                 </div>
             </div>
             
             <div className="space-y-6 reveal-modern delay-200">
                 <h4 className="text-[#c5a059] font-bold uppercase tracking-[0.2em] text-sm">About LexSword</h4>
                 <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                    Integrity, Strategy, <br/> & Results.
                 </h2>
                 <p className="text-gray-600 text-lg leading-relaxed">
                    Founded in {establishedYear}, LexSword Chambers is led by Advocate Azadur Rahman of the Supreme Court of Bangladesh. We combine deep legal knowledge with a modern, client-focused approach.
                 </p>
                 <p className="text-gray-500 leading-relaxed text-sm">
                    Whether facing complex civil litigation, criminal charges, or corporate legal challenges, our team ensures your voice is heard and your rights are protected under Bangladeshi law.
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <ul className="space-y-3">
                       {['Supreme Court Practice', 'Strategic Defense', 'Transparent Process'].map((item,i) => (
                          <li key={i} className="flex items-center gap-3 font-bold text-slate-900">
                             <CheckCircle size={20} className="text-[#c5a059] shadow-sm rounded-full"/> {item}
                          </li>
                       ))}
                    </ul>
                 </div>
                 
                 {/* Signature Placeholder */}
                 <div className="pt-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" alt="Signature" className="h-16 opacity-60 filter grayscale"/>
                 </div>
             </div>
         </div>
      </section>

      {/* --- 4. AREAS OF PRACTICE (Updated List) --- */}
      <section id="practice" className="py-24 bg-soft-blue-solid relative overflow-hidden">
         {/* Background Element */}
         <div className="absolute -top-24 -right-24 p-4 opacity-5 pointer-events-none text-white"><Scale size={500}/></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal-modern">
               <div>
                  <h4 className="text-[#c5a059] font-bold uppercase tracking-[0.2em] text-sm mb-2">Our Expertise</h4>
                  <h2 className="text-4xl font-serif font-bold text-white">Areas of Practice</h2>
                  <div className="w-20 h-1 bg-[#c5a059] mt-4"></div>
               </div>
               <p className="text-gray-300 max-w-md text-sm mt-4 md:mt-0">
                  Specialized legal services tailored to meet complex challenges in the Bangladeshi legal landscape.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-modern delay-100">
               {practiceAreas.map((item, i) => (
                  <div key={i} className="bg-[#2a3447] p-8 group hover:bg-[#c5a059] transition duration-500 cursor-pointer border-b-4 border-transparent hover:border-white shadow-lg rounded-sm hover:-translate-y-1">
                     <div className="text-[#c5a059] group-hover:text-white transition mb-6">
                        <item.icon size={40}/>
                     </div>
                     <h3 className="text-xl font-serif font-bold text-white mb-3">{item.title}</h3>
                     <p className="text-gray-400 group-hover:text-white/90 transition text-sm leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- 5. FUN FACTS (Realistic BD Law Firm Metrics) --- */}
      <section className="py-24 bg-fixed bg-cover bg-center relative" style={{backgroundImage: "url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"}}>
         <div className="absolute inset-0 bg-soft-blue-solid/90"></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white reveal-modern">
                 <div className="space-y-3">
                    <div className="text-[#c5a059] font-serif text-5xl font-bold flex justify-center"><Users size={48} className="mb-2"/></div>
                    <div className="text-4xl font-bold">850+</div>
                    <p className="uppercase tracking-widest text-xs font-bold text-gray-300">Clients Served</p>
                 </div>
                 <div className="space-y-3">
                    <div className="text-[#c5a059] font-serif text-5xl font-bold flex justify-center"><CheckSquare size={48} className="mb-2"/></div>
                    <div className="text-4xl font-bold">1200+</div>
                    <p className="uppercase tracking-widest text-xs font-bold text-gray-300">Cases Solved</p>
                 </div>
                 <div className="space-y-3">
                    <div className="text-[#c5a059] font-serif text-5xl font-bold flex justify-center"><Award size={48} className="mb-2"/></div>
                    <div className="text-4xl font-bold">96%</div>
                    <p className="uppercase tracking-widest text-xs font-bold text-gray-300">Success Rate</p>
                 </div>
                 <div className="space-y-3">
                    <div className="text-[#c5a059] font-serif text-5xl font-bold flex justify-center"><CalIcon size={48} className="mb-2"/></div>
                    <div className="text-4xl font-bold">{yearsOfService}+</div>
                    <p className="uppercase tracking-widest text-xs font-bold text-gray-300">Years of Service</p>
                 </div>
             </div>
         </div>
      </section>

      {/* --- 6. TEAM SECTION (Exactly 4 Members) --- */}
      <section id="team" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6 text-center mb-16 reveal-modern">
            <h4 className="text-[#c5a059] font-bold uppercase tracking-[0.2em] text-sm mb-2">The Team</h4>
            <h2 className="text-4xl font-serif font-bold text-slate-900">Our Legal Experts</h2>
            <div className="w-16 h-1 bg-[#c5a059] mx-auto mt-4"></div>
         </div>

         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6 reveal-modern delay-200">
             {/* Lawyer 1 (Head) */}
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
             
             {/* Lawyer 2 */}
             <div className="group relative bg-white shadow-xl rounded-sm overflow-hidden hover:-translate-y-2 transition duration-300">
                 <div className="overflow-hidden h-[350px]">
                    <img src="/team1.jpg" alt="Senior Associate" className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 bg-gray-200"/>
                 </div>
                 <div className="bg-white text-slate-900 p-6 text-center relative z-10 border-b-4 border-[#c5a059] group-hover:bg-soft-blue-solid group-hover:text-white transition">
                    <h3 className="text-lg font-serif font-bold truncate">Adv. Anisur Rahman</h3>
                    <p className="text-[#c5a059] text-xs uppercase tracking-wider mt-1 font-bold">Senior Associate</p>
                    <p className="text-gray-500 group-hover:text-gray-300 text-[10px] mt-1">High Court Division</p>
                 </div>
             </div>

             {/* Lawyer 3 */}
             <div className="group relative bg-white shadow-xl rounded-sm overflow-hidden hover:-translate-y-2 transition duration-300">
                 <div className="overflow-hidden h-[350px]">
                    <img src="/team2.jpg" alt="Associate" className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 bg-gray-200"/>
                 </div>
                 <div className="bg-white text-slate-900 p-6 text-center relative z-10 border-b-4 border-[#c5a059] group-hover:bg-soft-blue-solid group-hover:text-white transition">
                    <h3 className="text-lg font-serif font-bold truncate">Adv. Abdur Razzak</h3>
                    <p className="text-[#c5a059] text-xs uppercase tracking-wider mt-1 font-bold">Associate Lawyer</p>
                    <p className="text-gray-500 group-hover:text-gray-300 text-[10px] mt-1">Judge Court</p>
                 </div>
             </div>

              {/* Lawyer 4 */}
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

      {/* --- 7. EXPERIENCE BANNER (Soft Blue) --- */}
      <section className="bg-soft-blue-gradient py-20 px-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 reveal-modern relative z-10">
            <div className="relative shrink-0">
                <div className="border-4 border-[#c5a059] p-8 text-center rounded-full w-48 h-48 flex flex-col justify-center items-center text-white bg-soft-blue-solid shadow-2xl">
                   <span className="text-5xl font-bold">{yearsOfService}</span>
                   <span className="text-xs uppercase font-bold mt-1">Years of<br/>Experience</span>
                </div>
            </div>
            <div className="flex-1 text-center md:text-left">
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
                  LexSword Chambers: Your Trusted Partner for <span className="text-[#c5a059]">Legal Solutions</span> in Bangladesh.
               </h2>
               <p className="text-gray-300 max-w-2xl text-lg">
                  Since {establishedYear}, we have been dedicated to providing strategic, result-oriented legal counsel. We take pride in our track record of success and our commitment to client satisfaction.
               </p>
            </div>
         </div>
      </section>

      {/* --- 8. TESTIMONIALS --- */}
      <section className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-6 text-center mb-12 reveal-modern">
             <h4 className="text-[#c5a059] font-bold uppercase tracking-[0.2em] text-sm mb-2">Testimonials</h4>
             <h2 className="text-4xl font-serif font-bold text-slate-900">What Clients Say</h2>
             <div className="w-16 h-1 bg-[#c5a059] mx-auto mt-4"></div>
         </div>

         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 reveal-modern delay-100">
             {[
               { title: "Strategic & Effective", text: "Advocate Rahman's strategic approach in my complex land dispute in the High Court was impressive. Highly recommended for civil matters." },
               { title: "Professional Bail Support", text: "The team provided excellent support during a critical criminal matter. Their swift action secured bail when it seemed difficult." },
               { title: "Trusted Corporate Advisor", text: "LexSword handles our company's legal vetting and contracts with utmost professionalism. A reliable partner for businesses." }
             ].map((item, i) => (
                <div key={i} className="bg-white p-10 shadow-xl border-b-4 border-[#c5a059] relative rounded-sm hover:-translate-y-2 transition duration-300">
                   <div className="absolute top-6 right-6 text-gray-200"><Quote size={40}/></div>
                   <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                   <p className="text-gray-600 italic leading-relaxed">"{item.text}"</p>
                   <div className="mt-6 flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400"><User/></div>
                      <div>
                         <p className="font-bold text-sm text-slate-900">Verified Client</p>
                         <p className="text-xs text-[#c5a059] font-bold">Bangladesh</p>
                      </div>
                   </div>
                </div>
             ))}
         </div>
      </section>

       {/* --- Contact / Consultation Form --- */}
       <section id="contact" className="py-24 bg-white relative">
         <div className="max-w-7xl mx-auto px-6 reveal-modern">
            <div className="bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row">
               {/* Info Side - Soft Blue */}
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
                              <p className="text-lg font-bold truncate">bdkanoon@gmail.com</p>
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
               
               {/* Form Side */}
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

      {/* --- 9. FOOTER (Soft Blue Dark) --- */}
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
                     <a href="mailto:bdkanoon@gmail.com" className="hover:text-[#c5a059] transition">bdkanoon@gmail.com</a>
                  </li>
               </ul>
            </div>
         </div>
         
         <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; {currentYear} <span className="text-[#c5a059] font-bold">LexSword Chambers</span>. All Rights Reserved.</p>
         </div>
      </footer>

      {/* --- Success Modal --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-sm shadow-2xl w-full max-w-md border-t-4 border-[#c5a059] text-center animate-[bounce-in_0.5s]">
             <div className="mb-4 flex justify-center">
                <CheckCircle size={64} className="text-green-500"/>
             </div>
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
// 2. DASHBOARD & MODULES (UNCHANGED)
// ==============================================================================

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
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg no-print">
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

// --- Admin Dashboard (UNCHANGED) ---
const AdminDashboard = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refresh, setRefresh] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data States
  const [cases, setCases] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [tasks, setTasks] = useState([]); 
  const [historyLog, setHistoryLog] = useState([]);
  const [documents, setDocuments] = useState([]); 
   
  // Filters
  const [searchTerm, setSearchTerm] = useState(''); 
  const [mainCaseTab, setMainCaseTab] = useState('judge'); 
  const [caseFilter, setCaseFilter] = useState('all'); 
  const [taskFilter, setTaskFilter] = useState('pending');
   
  // NEW: Accounts Filters
  const [accountSearch, setAccountSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
   
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
    const { data: tData } = await supabase.from('tasks').select('*').order('due_date', { ascending: true });
    setTasks(tData || []);
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

  // WhatsApp
  const handleWhatsApp = (c) => {
      const msg = `আসসালামু আলাইকুম।\nআপনার মামলার তথ্য:\nমামলা নং: ${c.case_no}\nকোর্ট: ${c.court_name}\nআগামী তারিখ: ${c.next_date}\nপদক্ষেপ: ${c.current_step}\n\nধন্যবাদান্তে,\nঅ্যাডভোকেট আজাদুর রহমান\nহেড অফ চেম্বার, লেক্সসোর্ড ল ফার্ম।`;
      const url = `https://wa.me/${c.client_mobile}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
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

  // --- NEW: Account Filtering & Calculations ---
  const getFilteredAccounts = () => {
    return accounts.filter(a => {
        const matchSearch = accountSearch === '' || 
            (a.client_name?.toLowerCase().includes(accountSearch.toLowerCase()) || 
             a.description?.toLowerCase().includes(accountSearch.toLowerCase()) ||
             a.category?.toLowerCase().includes(accountSearch.toLowerCase()));
        
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
   
  const calcTotal = (type, status = 'Paid') => 
    filteredTxns.filter(a => a.txn_type === type && a.payment_status === status).reduce((sum, a) => sum + Number(a.amount), 0);

  const accStats = {
      income: calcTotal('Income'),
      expense: calcTotal('Expense'),
      dueIncome: calcTotal('Income', 'Due'),
      dueExpense: calcTotal('Expense', 'Due'),
  };
  const cashInHand = accStats.income - accStats.expense;

  const handlePrint = () => {
      window.print();
  };

  const setMonthFilter = () => {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
      setStartDate(firstDay);
      setEndDate(lastDay);
  };

  const setYearFilter = () => {
      const now = new Date();
      setStartDate(`${now.getFullYear()}-01-01`);
      setEndDate(`${now.getFullYear()}-12-31`);
  };

  // Task Stats
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

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden text-slate-900">
      
      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          aside, nav { display: none !important; }
          body { background: white; }
          .print-container { padding: 20px; width: 100%; }
        }
      `}</style>

      {mobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden no-print" onClick={() => setMobileMenuOpen(false)}></div>}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static no-print`}>
        <div className="p-6 text-2xl font-bold font-serif text-[#c5a059] border-b border-slate-800 tracking-wider flex justify-between items-center">
          CHAMBERS <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(false)}><X size={24}/></button>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button onClick={() => {setActiveTab('dashboard'); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'dashboard' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <Gavel size={20}/> Case Dashboard
          </button>
          <button onClick={() => {setActiveTab('tasks'); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'tasks' ? 'bg-[#c5a059] text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-800'}`}>
            <ClipboardList size={20}/> Task Manager
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
        <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md shrink-0 no-print">
           <span className="font-bold font-serif text-[#c5a059]">LEXSWORD</span>
           <button onClick={() => setMobileMenuOpen(true)}><Menu size={24}/></button>
        </div>

        <main className="flex-1 overflow-y-auto relative p-4 md:p-6 print-container">
          
          {activeTab === 'dashboard' && (
            <div className="no-print">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Case Dashboard</h2>
                <div className="flex gap-2 w-full md:w-auto">
                    <button onClick={() => { setFormData({ court_type: 'Judge Court', case_nature: 'Civil Suit', status: 'Ongoing' }); setModalMode('addCase'); }} className="flex-1 items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded shadow hover:bg-[#c5a059] font-bold flex justify-center">
                    <Plus size={18}/> NEW CASE
                    </button>
                </div>
              </div>

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
                  <input type="text" placeholder="Search by Case No or Party Name..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded focus:border-[#c5a059] outline-none text-slate-900" onChange={(e) => setSearchTerm(e.target.value)}/>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {mainCaseTab === 'judge' ? (
                    <>
                        <button onClick={() => setCaseFilter('all')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'all' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>All ({currentCounts.all})</button>
                        <button onClick={() => setCaseFilter('pending')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'pending' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Pending ({currentCounts.pending})</button>
                        <button onClick={() => setCaseFilter('disposed')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'disposed' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Disposed ({currentCounts.disposed})</button>
                        <button onClick={() => setCaseFilter('today')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'today' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Today ({currentCounts.today})</button>
                        <button onClick={() => setCaseFilter('tomorrow')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'tomorrow' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Tomorrow ({currentCounts.tomorrow})</button>
                        <button onClick={() => setCaseFilter('week')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'week' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>This Week ({currentCounts.week})</button>
                        <button onClick={() => setCaseFilter('update')} className={`px-3 py-1 rounded-full text-sm font-bold border transition ${currentCounts.update > 0 ? 'bg-red-600 text-white border-red-600 animate-pulse' : 'bg-white text-slate-600'}`}>Needs Update ({currentCounts.update})</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setCaseFilter('all')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'all' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>All ({currentCounts.all})</button>
                        <button onClick={() => setCaseFilter('pending')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'pending' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Pending ({currentCounts.pending})</button>
                        <button onClick={() => setCaseFilter('disposed')} className={`px-3 py-1 rounded-full text-sm font-bold border ${caseFilter === 'disposed' ? 'bg-[#c5a059] text-slate-900' : 'bg-white'}`}>Disposed ({currentCounts.disposed})</button>
                        <button onClick={() => setCaseFilter('update')} className={`px-3 py-1 rounded-full text-sm font-bold border transition ${currentCounts.update > 0 ? 'bg-red-600 text-white border-red-600 animate-pulse' : 'bg-white text-slate-600'}`}>Needs Update ({currentCounts.update})</button>
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
                      <button onClick={() => handleWhatsApp(c)} className="p-2 bg-green-100 text-green-800 rounded hover:bg-green-200"><MessageCircle size={18}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
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
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wide
                            ${t.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 
                              t.priority === 'High' ? 'bg-orange-100 text-orange-700' : 
                              t.priority === 'Normal' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
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
            <div className="bg-white p-4 md:p-6 rounded shadow h-full flex flex-col text-slate-900 no-print">
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
                   const hasTask = tasks.filter(t => t.due_date === dateStr && t.status !== 'Done');
                   
                   return (
                     <div key={i} onClick={() => isCurrentMonth && setSelectedDateCases(hasCase)} 
                       className={`border p-1 md:p-2 h-16 md:h-24 rounded cursor-pointer transition ${!isCurrentMonth ? 'bg-slate-100 opacity-50' : hasCase.length > 0 ? 'bg-red-50 border-red-300 hover:bg-red-100' : 'bg-white hover:bg-blue-50 border-slate-300'}`}>
                       <div className="flex justify-between items-start">
                         <span className={`text-[10px] md:text-xs font-bold ${isCurrentMonth ? 'text-slate-900' : 'text-slate-400'}`}>{d.getDate()}</span>
                         <div className="flex gap-1">
                           {isCurrentMonth && hasTask.length > 0 && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                           {isCurrentMonth && hasCase.length > 0 && <span className="text-[10px] md:text-xs bg-red-600 text-white px-1 rounded-full">{hasCase.length}</span>}
                         </div>
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
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
                <h2 className="text-3xl font-bold text-slate-900">Financial Management</h2>
                <div className="flex gap-2 w-full md:w-auto">
                    <button onClick={handlePrint} className="bg-slate-200 text-slate-900 px-4 py-2 rounded font-bold hover:bg-slate-300 flex items-center gap-2">
                        <Printer size={18}/> Print / PDF
                    </button>
                    <button onClick={() => { setFormData({txn_type: 'Income', category: 'Office', payment_status: 'Paid'}); setModalMode('addTxn'); }} className="bg-slate-900 text-white px-6 py-2 rounded font-bold hover:bg-[#c5a059] flex items-center gap-2">
                        <Plus size={18}/> Add Entry
                    </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded shadow border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 no-print">
                  <div className="col-span-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Search</label>
                      <div className="relative">
                          <Search className="absolute left-2 top-2.5 text-gray-400" size={16}/>
                          <input placeholder="Client, Category..." value={accountSearch} onChange={e => setAccountSearch(e.target.value)} 
                            className="w-full pl-8 p-2 border rounded text-sm text-slate-900"/>
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

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                       <p className="text-xs font-bold text-[#c5a059] uppercase flex items-center gap-2"><PieChart size={14}/> Balance / Profit</p>
                       <p className="text-3xl font-bold mt-1">৳{cashInHand}</p>
                   </div>
                   <p className="text-[10px] text-gray-400 mt-2">Cash In Hand</p>
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

              <div className="bg-white rounded shadow overflow-x-auto">
                 <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="p-3 text-slate-900 font-bold text-xs uppercase">Date</th>
                        <th className="p-3 text-slate-900 font-bold text-xs uppercase">Client / Name</th>
                        <th className="p-3 text-slate-900 font-bold text-xs uppercase">Description</th>
                        <th className="p-3 text-slate-900 font-bold text-xs uppercase">Category</th>
                        <th className="p-3 text-slate-900 font-bold text-xs uppercase text-center">Status</th>
                        <th className="p-3 text-right text-slate-900 font-bold text-xs uppercase">Amount</th>
                        <th className="p-3 text-center text-slate-900 font-bold text-xs uppercase no-print">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTxns.length === 0 && <tr><td colSpan="7" className="p-4 text-center text-slate-500 italic">No records found for this period.</td></tr>}
                      {filteredTxns.map(a => (
                        <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="p-3 text-sm text-slate-700">{a.date}</td>
                          <td className="p-3 font-bold text-slate-900 text-sm">{a.client_name || '-'}</td>
                          <td className="p-3 text-sm text-slate-700">{a.description}</td>
                          <td className="p-3"><span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{a.category}</span></td>
                          <td className="p-3 text-center">
                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${a.payment_status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>{a.payment_status}</span>
                          </td>
                          <td className={`p-3 text-right font-bold text-sm ${a.txn_type === 'Income' ? 'text-green-700' : 'text-red-700'}`}>{a.txn_type === 'Income' ? '+' : '-'} {a.amount}</td>
                          <td className="p-3 flex justify-center gap-2 no-print">
                             <button onClick={() => { setFormData(a); setModalMode('addTxn'); }} className="text-blue-600 hover:bg-blue-100 p-1 rounded"><Edit3 size={16}/></button>
                             <button onClick={() => handleDeleteTxn(a.id)} className="text-red-600 hover:bg-red-100 p-1 rounded"><Trash2 size={16}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-300">
                        <tr>
                            <td colSpan="5" className="p-3 text-right">NET TOTAL (Cash):</td>
                            <td className="p-3 text-right">৳{cashInHand}</td>
                            <td className="no-print"></td>
                        </tr>
                    </tfoot>
                 </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {modalMode === 'addTxn' && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print">
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
                  <div className="flex gap-2">
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-1/2 border p-2 rounded text-slate-900 bg-white">
                        <option>Office</option><option>Personal</option><option>Client</option><option>Court Fee</option><option>Salary</option><option>Misc</option>
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

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
  Quote, Shield, Users, Award, BookOpen
} from 'lucide-react';

// ==============================================================================
// 1. LEXSWORD PUBLIC HOMEPAGE (REDESIGNED - JUSTICA THEME)
// ==============================================================================

const PublicHome = ({ onLoginClick, loading }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="font-sans text-slate-800 bg-white selection:bg-[#c5a059] selection:text-white overflow-x-hidden">
      
      {/* Custom Animations & Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Outfit:wght@300;400;500;700&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Outfit', sans-serif; }
        
        .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; transform: translateY(20px); }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
        
        .gold-gradient { background: linear-gradient(135deg, #c5a059 0%, #e6c888 50%, #c5a059 100%); }
        .text-gold-gradient { background: linear-gradient(135deg, #c5a059 0%, #e6c888 50%, #c5a059 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>

      {/* --- Top Bar (Justica Style) --- */}
      <div className="bg-[#111827] text-gray-400 py-3 px-6 text-xs border-b border-gray-800 hidden md:flex justify-between items-center z-50 relative">
         <div className="flex gap-6">
            <span className="flex items-center gap-2 hover:text-[#c5a059] transition"><Mail size={14} className="text-[#c5a059]"/> bdkanoon@gmail.com</span>
            <span className="flex items-center gap-2 hover:text-[#c5a059] transition"><MapPin size={14} className="text-[#c5a059]"/> Supreme Court Bar Association, Dhaka</span>
         </div>
         <div className="flex gap-4">
            <span>Open: Sun - Thu (9:00 AM - 6:00 PM)</span>
         </div>
      </div>

      {/* --- Navbar --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-sm ${scrolled ? 'bg-[#111827] text-[#c5a059]' : 'bg-[#c5a059] text-slate-900'}`}>
              <Scale size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className={`text-2xl font-serif font-bold tracking-tight leading-none ${scrolled ? 'text-[#111827]' : 'text-white'}`}>JUSTICA</h1>
              <p className={`text-[9px] font-bold tracking-[0.4em] uppercase ${scrolled ? 'text-[#c5a059]' : 'text-gray-300'}`}>LexSword Chambers</p>
            </div>
          </div>

          <div className={`hidden md:flex items-center gap-8 text-sm font-bold tracking-wider ${scrolled ? 'text-slate-600' : 'text-gray-200'}`}>
            <a href="#home" className="hover:text-[#c5a059] transition">HOME</a>
            <a href="#about" className="hover:text-[#c5a059] transition">ABOUT</a>
            <a href="#practice" className="hover:text-[#c5a059] transition">PRACTICE AREAS</a>
            <a href="#team" className="hover:text-[#c5a059] transition">ATTORNEYS</a>
            <a href="#contact" className="hover:text-[#c5a059] transition">CONTACT</a>
          </div>

          <div className="flex items-center gap-4">
             <a href="tel:+8801911008518" className={`hidden md:flex items-center gap-2 font-bold ${scrolled ? 'text-[#111827]' : 'text-white'}`}>
                <div className="w-8 h-8 rounded-full border border-[#c5a059] flex items-center justify-center text-[#c5a059] animate-pulse">
                   <Phone size={14}/>
                </div>
                <div>
                   <p className="text-[10px] opacity-70 uppercase">Call Us Now</p>
                   <p className="leading-none text-sm">+880 1911 008 518</p>
                </div>
             </a>
             <button onClick={onLoginClick} className="hidden md:flex bg-[#c5a059] text-white px-5 py-2.5 rounded-sm font-bold text-xs tracking-wide hover:bg-white hover:text-[#c5a059] transition shadow-lg">
                {loading ? <span className="loading loading-spinner loading-xs"></span> : "LOGIN"}
             </button>
             <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden ${scrolled ? 'text-slate-900' : 'text-white'}`}>
               {menuOpen ? <X/> : <Menu/>}
             </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#111827] border-t border-gray-800 p-6 flex flex-col gap-4 font-bold text-center text-gray-300">
             <a href="#home" onClick={()=>setMenuOpen(false)}>Home</a>
             <a href="#practice" onClick={()=>setMenuOpen(false)}>Practice Areas</a>
             <a href="#contact" onClick={()=>setMenuOpen(false)}>Contact</a>
             <button onClick={onLoginClick} className="text-[#c5a059]">{loading ? 'Loading...' : 'Member Login'}</button>
          </div>
        )}
      </nav>

      {/* --- Hero Section (Dark & Gold) --- */}
      <header id="home" className="relative min-h-screen flex items-center bg-[#111827] overflow-hidden">
         {/* Background Image with Overlay */}
         <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Law Background" className="w-full h-full object-cover opacity-30"/>
             <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/90 to-transparent"></div>
         </div>

         <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-20">
            <div className="max-w-3xl space-y-6 fade-in-up">
               <div className="flex items-center gap-3">
                  <div className="h-[2px] w-12 bg-[#c5a059]"></div>
                  <span className="text-[#c5a059] font-bold tracking-[0.2em] uppercase text-sm">Trusted Legal Partner</span>
               </div>
               
               <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1]">
                  We Fight For Your <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-[#e6c888]">Justice & Right</span>
               </h1>
               
               <p className="text-lg text-gray-400 leading-relaxed max-w-xl border-l-2 border-[#c5a059] pl-6 py-2">
                  Advocate Supreme Court of Bangladesh. We provide expert legal solutions in Civil, Criminal, Writ, and Corporate matters with uncompromised integrity.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a href="#contact" className="bg-[#c5a059] text-white px-8 py-4 rounded-sm font-bold tracking-widest hover:bg-white hover:text-[#111827] transition shadow-xl text-center flex items-center justify-center gap-2">
                     FREE CONSULTATION <ArrowRight size={18}/>
                  </a>
                  <a href="#practice" className="border border-gray-600 text-white px-8 py-4 rounded-sm font-bold tracking-widest hover:border-[#c5a059] hover:bg-[#c5a059] transition text-center">
                     OUR SERVICES
                  </a>
               </div>
            </div>
         </div>
      </header>

      {/* --- Overlapping Feature Cards --- */}
      <section className="relative -mt-24 z-20 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-0 shadow-2xl">
             <div className="bg-[#c5a059] p-10 text-white group hover:bg-[#1f2937] transition duration-500">
                <Shield size={48} className="mb-6 opacity-90"/>
                <h3 className="text-2xl font-serif font-bold mb-4">Supreme Court Practice</h3>
                <p className="text-white/80 mb-6 leading-relaxed">Expert handling of Writ Petitions, Civil Revisions, and Criminal Appeals in the High Court Division.</p>
                <a href="#contact" className="inline-flex items-center gap-2 font-bold uppercase text-xs tracking-wider border-b border-white/50 pb-1 group-hover:text-[#c5a059] transition">Read More <ArrowRight size={14}/></a>
             </div>
             <div className="bg-[#1f2937] p-10 text-white group hover:bg-[#c5a059] transition duration-500">
                <Gavel size={48} className="mb-6 text-[#c5a059] group-hover:text-white transition"/>
                <h3 className="text-2xl font-serif font-bold mb-4">Civil Litigation</h3>
                <p className="text-gray-400 group-hover:text-white/90 mb-6 leading-relaxed transition">Dedicated representation in Title Suits, Family matters, and Land disputes across all Judge Courts.</p>
                <a href="#contact" className="inline-flex items-center gap-2 font-bold uppercase text-xs tracking-wider border-b border-white/50 pb-1 transition">Read More <ArrowRight size={14}/></a>
             </div>
             <div className="bg-[#111827] p-10 text-white group hover:bg-[#1f2937] transition duration-500">
                <Users size={48} className="mb-6 text-[#c5a059]"/>
                <h3 className="text-2xl font-serif font-bold mb-4">Corporate Law</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">Legal support for Company formation, Artha Rin Suits, Vetting, and Contractual agreements.</p>
                <a href="#contact" className="inline-flex items-center gap-2 font-bold uppercase text-xs tracking-wider border-b border-white/50 pb-1 hover:text-[#c5a059] transition">Read More <ArrowRight size={14}/></a>
             </div>
          </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="py-24 bg-white relative">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
             <div className="relative">
                 <div className="absolute top-0 right-0 w-2/3 h-full bg-gray-100 -z-10 rounded-r-3xl"></div>
                 <img src="/head.jpg" alt="Advocate Azadur Rahman" className="w-full max-w-md mx-auto rounded-lg shadow-2xl relative z-10"/>
                 <div className="absolute -bottom-6 -right-6 bg-[#c5a059] p-8 rounded-sm shadow-xl hidden md:block text-white text-center min-w-[200px]">
                     <span className="block text-5xl font-serif font-bold">25+</span>
                     <span className="block text-sm uppercase tracking-wider font-bold mt-1">Years Experience</span>
                 </div>
             </div>
             <div className="space-y-6">
                 <h4 className="text-[#c5a059] font-bold uppercase tracking-[0.2em] text-sm">About LexSword</h4>
                 <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#111827] leading-tight">
                    Respect. Response. <br/> Results.
                 </h2>
                 <p className="text-gray-600 text-lg leading-relaxed">
                    Led by <strong>Advocate Azadur Rahman</strong>, LexSword Chambers is a premier law firm in Bangladesh. We combine deep knowledge of the Bangladeshi legal system with a modern approach to client service. 
                 </p>
                 <p className="text-gray-600 leading-relaxed">
                    Whether you are facing a complex criminal trial or a sensitive family dispute, our team ensures that your voice is heard and your rights are protected under the Constitution of Bangladesh.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="flex items-start gap-4">
                       <div className="bg-gray-100 p-3 rounded-full text-[#c5a059]"><Award/></div>
                       <div>
                          <h5 className="font-bold text-[#111827] text-lg">Best Strategy</h5>
                          <p className="text-sm text-gray-500">Tailored legal solutions.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="bg-gray-100 p-3 rounded-full text-[#c5a059]"><BookOpen/></div>
                       <div>
                          <h5 className="font-bold text-[#111827] text-lg">Legal Insight</h5>
                          <p className="text-sm text-gray-500">In-depth case analysis.</p>
                       </div>
                    </div>
                 </div>
                 
                 <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_sample.svg" alt="Signature" className="h-12 opacity-50 mt-6"/>
             </div>
         </div>
      </section>

      {/* --- Fun Facts (Dark Section) --- */}
      <section className="py-20 bg-[#111827] text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
             <div className="space-y-2 border-r border-gray-800 last:border-0">
                <span className="text-4xl md:text-5xl font-serif font-bold text-[#c5a059]">1500+</span>
                <p className="text-sm uppercase tracking-widest text-gray-400 font-bold">Cases Solved</p>
             </div>
             <div className="space-y-2 border-r border-gray-800 last:border-0">
                <span className="text-4xl md:text-5xl font-serif font-bold text-[#c5a059]">98%</span>
                <p className="text-sm uppercase tracking-widest text-gray-400 font-bold">Success Rate</p>
             </div>
             <div className="space-y-2 border-r border-gray-800 last:border-0">
                <span className="text-4xl md:text-5xl font-serif font-bold text-[#c5a059]">200+</span>
                <p className="text-sm uppercase tracking-widest text-gray-400 font-bold">Happy Clients</p>
             </div>
             <div className="space-y-2">
                <span className="text-4xl md:text-5xl font-serif font-bold text-[#c5a059]">25</span>
                <p className="text-sm uppercase tracking-widest text-gray-400 font-bold">Years Experience</p>
             </div>
         </div>
      </section>

      {/* --- Practice Areas (Grid) --- */}
      <section id="practice" className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h4 className="text-[#c5a059] font-bold uppercase tracking-[0.2em] text-sm mb-3">Our Expertise</h4>
               <h2 className="text-4xl font-serif font-bold text-[#111827]">Areas of Practice</h2>
               <div className="w-20 h-1 bg-[#c5a059] mx-auto mt-6"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { icon: Scale, title: "Criminal Defense", desc: "Expert bail, trial defense, and appeals in Magistrate & Sessions Courts." },
                 { icon: Users, title: "Family & Divorce", desc: "Compassionate handling of divorce, dower, custody & inheritance matters." },
                 { icon: DollarSign, title: "Banking & Finance", desc: "Specialized in Artha Rin Adalat suits and NI Act (Cheque Dishonour) cases." },
                 { icon: Folder, title: "Writ Jurisdiction", desc: "Challenging illegal government actions in the High Court Division." },
                 { icon: Gavel, title: "Civil Litigation", desc: "Resolving property disputes, land issues, and contract enforcement." },
                 { icon: ClipboardList, title: "Documentation", desc: "Drafting deeds, wills, contracts and legal notices with precision." }
               ].map((item, i) => (
                  <div key={i} className="bg-white p-8 shadow-sm hover:shadow-2xl transition duration-300 group border-b-4 border-transparent hover:border-[#c5a059]">
                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-[#111827] group-hover:bg-[#c5a059] group-hover:text-white transition">
                        <item.icon size={30}/>
                     </div>
                     <h3 className="text-2xl font-serif font-bold text-[#111827] mb-4 group-hover:text-[#c5a059] transition">{item.title}</h3>
                     <p className="text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                     <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111827] group-hover:translate-x-2 transition">
                        Details <ArrowRight size={12}/>
                     </span>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Team Section --- */}
      <section id="team" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
               <div className="max-w-2xl">
                  <h4 className="text-[#c5a059] font-bold uppercase tracking-[0.2em] text-sm mb-3">The Team</h4>
                  <h2 className="text-4xl font-serif font-bold text-[#111827]">Meet Our Attorneys</h2>
               </div>
               <a href="#contact" className="hidden md:flex items-center gap-2 font-bold text-[#111827] hover:text-[#c5a059] transition border-b border-[#111827] pb-1 hover:border-[#c5a059]">
                  Join Our Team <ArrowRight size={16}/>
               </a>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
               {/* Head of Chamber */}
               <div className="group relative overflow-hidden rounded-lg md:col-span-1">
                  <img src="/head.jpg" alt="Adv. Azadur Rahman" className="w-full h-[400px] object-cover object-top transition duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                     <h3 className="text-white text-xl font-serif font-bold">Adv. Azadur Rahman</h3>
                     <p className="text-[#c5a059] text-xs uppercase font-bold tracking-wider">Head of Chamber</p>
                  </div>
               </div>
               {/* Other Team Members (Mock) */}
               {[1, 2, 3].map((n) => (
                  <div key={n} className="group relative overflow-hidden rounded-lg">
                     <img src={`/team${n}.jpg`} alt="Associate" className="w-full h-[400px] object-cover object-top transition duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 bg-gray-200"/>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition">
                        <h3 className="text-white text-xl font-serif font-bold">Associate Lawyer</h3>
                        <p className="text-[#c5a059] text-xs uppercase font-bold tracking-wider">Supreme Court</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="py-24 bg-[#111827] text-white relative">
         <div className="absolute top-0 right-0 p-12 opacity-10"><Quote size={120}/></div>
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h4 className="text-[#c5a059] font-bold uppercase tracking-[0.2em] text-sm mb-8">Client Testimonials</h4>
            <div className="space-y-8">
               <p className="text-2xl md:text-3xl font-serif leading-relaxed italic text-gray-300">
                  "I was facing a critical land dispute that seemed impossible to win. Advocate Azadur Rahman's strategic approach and deep knowledge of civil law turned the tide in my favor. I am forever grateful."
               </p>
               <div>
                  <h5 className="text-xl font-bold text-white">Md. Rafiqul Islam</h5>
                  <p className="text-[#c5a059] text-sm">Businessman, Dhaka</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- Contact / Consultation Form --- */}
      <section id="contact" className="py-24 bg-gray-50 relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row">
               {/* Info Side */}
               <div className="bg-[#111827] p-12 md:w-2/5 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 opacity-10 text-[#c5a059]"><Scale size={200}/></div>
                  <div className="relative z-10">
                     <h3 className="text-3xl font-serif font-bold mb-2">Get In Touch</h3>
                     <p className="text-gray-400 mb-8">Contact us for a free initial case evaluation.</p>
                     
                     <div className="space-y-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded bg-[#c5a059] flex items-center justify-center text-[#111827]"><Phone size={20}/></div>
                           <div>
                              <p className="text-xs text-gray-400 uppercase font-bold">Phone</p>
                              <p className="text-lg font-bold">+88 01911 008 518</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded bg-[#c5a059] flex items-center justify-center text-[#111827]"><Mail size={20}/></div>
                           <div>
                              <p className="text-xs text-gray-400 uppercase font-bold">Email</p>
                              <p className="text-lg font-bold truncate w-48">bdkanoon@gmail.com</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded bg-[#c5a059] flex items-center justify-center text-[#111827]"><MapPin size={20}/></div>
                           <div>
                              <p className="text-xs text-gray-400 uppercase font-bold">Location</p>
                              <p className="text-lg font-bold leading-tight">Supreme Court Bar<br/>Association, Dhaka</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Form Side */}
               <div className="p-12 md:w-3/5 bg-white">
                  <h3 className="text-2xl font-serif font-bold text-[#111827] mb-6">Request A Quote</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid md:grid-cols-2 gap-6">
                        <input name="name" type="text" placeholder="Your Name" className="w-full bg-gray-50 border border-gray-200 p-4 outline-none focus:border-[#c5a059] text-sm rounded-sm" required/>
                        <input name="phone" type="tel" placeholder="Phone Number" className="w-full bg-gray-50 border border-gray-200 p-4 outline-none focus:border-[#c5a059] text-sm rounded-sm" required/>
                     </div>
                     <div className="grid md:grid-cols-2 gap-6">
                        <input name="email" type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-gray-200 p-4 outline-none focus:border-[#c5a059] text-sm rounded-sm"/>
                        <select name="service" className="w-full bg-gray-50 border border-gray-200 p-4 outline-none focus:border-[#c5a059] text-sm rounded-sm text-gray-500">
                           <option>Select Practice Area</option>
                           <option>Civil Litigation</option>
                           <option>Criminal Defense</option>
                           <option>Writ Petition</option>
                           <option>Family Law</option>
                        </select>
                     </div>
                     <textarea name="message" rows="4" placeholder="Describe your case briefly..." className="w-full bg-gray-50 border border-gray-200 p-4 outline-none focus:border-[#c5a059] text-sm rounded-sm"></textarea>
                     <button type="submit" disabled={isSubmitting} className="bg-[#111827] text-white px-10 py-4 rounded-sm font-bold tracking-widest hover:bg-[#c5a059] transition uppercase w-full md:w-auto">
                        {isSubmitting ? "Sending..." : "Submit Request"}
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#0b0f19] text-gray-500 py-16 border-t border-gray-900">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-white mb-4">
                  <Scale size={24} className="text-[#c5a059]"/>
                  <span className="text-2xl font-serif font-bold">JUSTICA</span>
               </div>
               <p className="text-sm leading-relaxed">Providing top-tier legal services in Bangladesh with a commitment to justice and professional excellence.</p>
            </div>
            
            <div>
               <h4 className="text-white font-serif font-bold text-lg mb-6">Practice Areas</h4>
               <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-[#c5a059] transition">Civil Law</a></li>
                  <li><a href="#" className="hover:text-[#c5a059] transition">Family Law</a></li>
                  <li><a href="#" className="hover:text-[#c5a059] transition">Criminal Law</a></li>
                  <li><a href="#" className="hover:text-[#c5a059] transition">Cyber Crime</a></li>
               </ul>
            </div>
            
            <div>
               <h4 className="text-white font-serif font-bold text-lg mb-6">Quick Links</h4>
               <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-[#c5a059] transition">About Us</a></li>
                  <li><a href="#" className="hover:text-[#c5a059] transition">Attorneys</a></li>
                  <li><a href="#" className="hover:text-[#c5a059] transition">Blog / News</a></li>
                  <li><a href="#" className="hover:text-[#c5a059] transition">Contact</a></li>
               </ul>
            </div>
            
            <div>
               <h4 className="text-white font-serif font-bold text-lg mb-6">Newsletter</h4>
               <p className="text-sm mb-4">Subscribe for legal updates.</p>
               <div className="flex">
                  <input type="email" placeholder="Email" className="bg-gray-800 border-none outline-none px-4 py-2 text-sm w-full"/>
                  <button className="bg-[#c5a059] text-[#111827] px-4"><ArrowRight size={18}/></button>
               </div>
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-900 text-center text-xs">
            &copy; {new Date().getFullYear()} LexSword Chambers. All Rights Reserved.
         </div>
      </footer>

      {/* --- Success Modal --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-sm shadow-2xl w-full max-w-md border-t-4 border-[#c5a059] text-center animate-bounce-in">
             <div className="mb-4 flex justify-center">
                <CheckCircle size={64} className="text-green-500"/>
             </div>
             <h3 className="text-2xl font-serif font-bold text-[#111827] mb-2">Submission Received</h3>
             <p className="text-gray-600 mb-6">We will contact you shortly.</p>
             <button onClick={() => setShowSuccessModal(false)} className="bg-[#111827] text-white px-8 py-3 rounded-sm font-bold hover:bg-[#c5a059] transition uppercase tracking-wider w-full">Close</button>
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

// --- Admin Dashboard (UPDATED: New Accounts Module with Print & Filters) ---
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

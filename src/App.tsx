import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

// --- Interfaces ---

interface CoursePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MyAccountProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}

interface LayoutProps {
  children: React.ReactNode;
}

interface FAQItem {
  q: string;
  a: string;
}

interface EventItem {
  date: string;
  title: string;
  type: string;
  time: string;
}

// --- Components ---

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const CoursePopup: React.FC<CoursePopupProps> = ({ isOpen, onClose }) => {
  const [courseRegistered, setCourseRegistered] = useState<boolean>(false);
  if (!isOpen) return null;

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCourseRegistered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-2xl bg-brand-dark/40 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-2xl border border-white/50 relative my-auto">
        <button 
          onClick={() => { onClose(); setCourseRegistered(false); }}
          className="absolute top-6 right-6 md:top-8 md:right-8 text-2xl md:text-3xl opacity-20 hover:opacity-100 transition-all"
        >✕</button>
        
        {!courseRegistered ? (
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 md:10 italic">Join Online Course</h3>
            <form onSubmit={handleRegistrationSubmit} className="space-y-6 md:space-y-8 text-left">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest opacity-40 font-bold">Name</label>
                <input required type="text" className="w-full border-b-2 border-brand-dark/10 py-3 md:py-4 focus:outline-none focus:border-brand-magenta transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest opacity-40 font-bold">Email</label>
                <input required type="email" className="w-full border-b-2 border-brand-dark/10 py-3 md:py-4 focus:outline-none focus:border-brand-magenta transition-all font-medium" />
              </div>
              <button type="submit" className="w-full bg-brand-dark text-white py-4 md:py-6 rounded-full font-bold uppercase tracking-[0.3em] hover:bg-brand-magenta transition-all shadow-xl">Start Course →</button>
            </form>
          </div>
        ) : (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-green/20 rounded-full mx-auto mb-8 md:mb-10 flex items-center justify-center">
              <span className="text-3xl md:text-4xl">🎉</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 italic leading-tight">Congratulations! You now have 3 days access to SOURCE.</h3>
            <p className="text-base md:text-lg opacity-60 mb-8 md:mb-10 leading-relaxed font-medium">You will receive instructions in your inbox in a few minutes.</p>
            <div className="p-6 md:p-8 bg-[#F9FBF2] rounded-2xl mb-8">
              <p className="text-sm font-bold uppercase tracking-widest opacity-40 mb-4 italic">But first, please watch this personal message from Sascha →</p>
              <div className="aspect-video bg-brand-dark/5 rounded-xl flex items-center justify-center relative">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80" alt="Video Placeholder" className="w-full h-full object-cover opacity-60 rounded-xl" />
                <div className="absolute w-12 h-12 md:w-16 md:h-16 bg-white/80 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[8px] md:border-t-[10px] border-t-transparent border-l-[14px] md:border-l-[18px] border-l-brand-dark border-b-[8px] md:border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
            <button 
              onClick={() => { onClose(); setCourseRegistered(false); }}
              className="text-brand-magenta font-bold uppercase tracking-widest border-b-2 border-brand-magenta/30 hover:border-brand-magenta text-sm md:text-base"
            >Close Window</button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Pages ---

const Home: React.FC = () => {
  const [showCoursePopup, setShowCoursePopup] = useState<boolean>(false);
  const faqs: FAQItem[] = [
    { q: "What is the price?", a: "The pricing for the community memberships is found here." },
    { q: "When does the community start?", a: "The community has already begun. You can join today!" },
    { q: "I haven't done anything like this before. Is it suitable for complete beginners?", a: "Yes, this community brings a unique take on shadow work, merging somatics, non-dualism and various other modalities..." },
    { q: "I've been doing shadow work for a long time. Will this be too basic for me?", a: "No, this community brings a unique take on shadow work, merging somatics, non-dualism and various other modalities..." }
  ];

  return (
    <>
      <CoursePopup isOpen={showCoursePopup} onClose={() => setShowCoursePopup(false)} />
      
      {/* 1. Welcome Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 py-24 md:py-32 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-brand-lime/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-brand-green/20 rounded-full blur-3xl -z-10"></div>
        <h1 className="text-5xl md:text-8xl font-medium mb-12 md:mb-20 opacity-80 text-center tracking-tight leading-tight">Welcome to source</h1>
        
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          <div className="space-y-8 md:space-y-10">
            <div>
              <h2 className="text-xl md:text-2xl mb-4 font-medium opacity-70 italic">Introduction and what is this about</h2>
              <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">3 Signature Topics text</p>
              <ul className="space-y-3 list-disc list-inside text-lg md:text-xl font-medium">
                <li>From Survival to Thriving</li>
                <li>Clarity Beneath the Surface</li>
                <li>Female Agency in Systems</li>
              </ul>
              <a href="#about" className="group inline-flex items-center gap-4 mt-8 md:mt-10 text-lg font-medium">
                <span className="border-b border-brand-dark/20 group-hover:border-brand-magenta transition-colors">About me</span>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-lime group-hover:bg-brand-green transition-all duration-300 group-hover:translate-x-1 shadow-sm">
                  <span className="text-brand-dark">→</span>
                </div>
              </a>
            </div>
          </div>
          <div className="space-y-8 md:space-y-12">
            <div className="relative p-8 md:p-10 rounded-2xl md:rounded-3xl bg-white/40 backdrop-blur-md border border-white/30 shadow-sm">
              <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-8 h-8 md:w-10 md:h-10 bg-brand-magenta rounded-full shadow-lg"></div>
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">For individuals:</h3>
              <ul className="space-y-3 text-sm md:text-base opacity-90 list-inside font-medium">
                <li><a href="#online-course" className="hover:text-brand-magenta transition-colors">• Online course → next page with online recorded course</a></li>
                <li><a href="#coaching" className="hover:text-brand-magenta transition-colors">• 1:1 coaching → next page with contracting & link to contact</a></li>
                <li><a href="#agency" className="hover:text-brand-magenta transition-colors">• Agency Cycle → next page with details & link to contact</a></li>
                <li><a href="#money" className="hover:text-brand-magenta transition-colors">• Money Money course → next page with details & link to contact</a></li>
                <li><Link to="/calendar" className="hover:text-brand-magenta transition-colors">• Community → next page</Link></li>
              </ul>
            </div>
            <div className="relative p-8 md:p-10 rounded-2xl md:rounded-3xl bg-white/40 backdrop-blur-md border border-white/30 shadow-sm">
              <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-8 h-8 md:w-10 md:h-10 bg-brand-green rounded-full shadow-lg"></div>
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">For groups / organisations:</h3>
              <ul className="space-y-3 text-sm md:text-base opacity-90 list-inside font-medium">
                <li><a href="#dei" className="hover:text-brand-magenta transition-colors">• DEI activities / simulations / workshops → next page</a></li>
                <li><a href="#team" className="hover:text-brand-magenta transition-colors">• Team change / growth / transformation work → next page</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Me Section */}
      <section id="about" className="pt-12 pb-24 md:py-32 px-6 md:px-10 bg-white scroll-mt-[110px] md:scroll-mt-[100px]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="space-y-8 md:space-y-10">
            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-lime/20 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-green/40 rounded-full blur-md"></div>
              </div>
              <h2 className="text-4xl md:text-6xl font-medium italic">About me</h2>
            </div>
            <p className="text-xl md:text-2xl leading-relaxed opacity-80 italic">What is my background and methodologies / references at work</p>
            <div className="space-y-4 md:space-y-6 pt-4 md:pt-6 font-bold uppercase tracking-widest text-xs md:text-sm">
              <a href="#" className="block border-b border-brand-dark/10 w-fit pb-2 hover:border-brand-magenta transition-colors">link to linked in</a>
              <a href="#" className="block border-b border-brand-dark/10 w-fit pb-2 hover:border-brand-magenta transition-colors">link to insta</a>
            </div>
          </div>
          <div className="relative group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl md:rounded-2xl shadow-2xl">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80" alt="Sascha" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEI / Team Change Sections */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-10 space-y-16 md:space-y-24 bg-[#F5F5F5] scroll-mt-[140px] md:scroll-mt-[100px]">
        <div id="dei" className="max-w-5xl mx-auto p-8 md:p-16 bg-white rounded-2xl md:rounded-[3rem] shadow-sm border border-brand-dark/5 hover:shadow-xl transition-all scroll-mt-[140px] md:scroll-mt-[100px]">
           <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8 md:mb-10">
             <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-green/30 rounded-full flex-shrink-0"></div>
             <h3 className="text-3xl md:text-6xl font-bold leading-tight">DEI activities / simulations / workshops</h3>
           </div>
           <div className="md:ml-24 space-y-6">
              <ul className="space-y-3 md:space-y-4 text-lg md:text-2xl opacity-70 list-disc list-inside leading-relaxed italic">
                <li>Description of the process and the goals</li>
                <li>Who can participate</li>
              </ul>
              <button className="mt-8 md:mt-10 w-full md:w-auto px-8 md:px-10 py-3 md:py-4 bg-brand-dark text-white rounded-full font-bold uppercase tracking-widest hover:bg-brand-green transition-all shadow-lg text-sm md:text-base">Learn More & Contact</button>
           </div>
        </div>
        <div id="team" className="max-w-5xl mx-auto p-8 md:p-16 bg-white rounded-2xl md:rounded-[3rem] shadow-sm border border-brand-dark/5 hover:shadow-xl transition-all scroll-mt-[140px] md:scroll-mt-[100px]">
           <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8 md:mb-10">
             <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-green/30 rounded-full flex-shrink-0"></div>
             <h3 className="text-3xl md:text-6xl font-bold leading-tight">Team change / growth / transformation work</h3>
           </div>
           <div className="md:ml-24 space-y-6">
              <ul className="space-y-3 md:space-y-4 text-lg md:text-2xl opacity-70 list-disc list-inside leading-relaxed italic">
                <li>Description of the process and the goals</li>
                <li>Who can participate</li>
              </ul>
              <button className="mt-8 md:mt-10 w-full md:w-auto px-8 md:px-10 py-3 md:py-4 bg-brand-dark text-white rounded-full font-bold uppercase tracking-widest hover:bg-brand-green transition-all shadow-lg text-sm md:text-base">Learn More & Contact</button>
           </div>
        </div>
      </section>

      {/* 4. Online Course Section */}
      <section id="online-course" className="relative pt-12 pb-32 md:py-40 px-6 md:px-10 text-center overflow-hidden scroll-mt-[110px] md:scroll-mt-[100px]">
        <div className="absolute inset-0 -z-10 bg-brand-green/5">
          <img src="https://images.unsplash.com/photo-1516528387618-afa90b13e000?auto=format&fit=crop&q=80" alt="Palm" className="w-full h-full object-cover opacity-10 mix-blend-overlay" />
        </div>
        <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl p-10 md:p-20 rounded-2xl md:rounded-[4rem] border border-white/50 shadow-2xl">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-green/40 rounded-full mx-auto mb-8 md:mb-10 shadow-inner"></div>
          <h2 className="text-4xl md:text-7xl font-bold mb-8 md:mb-12 italic tracking-tight leading-tight">Online course</h2>
          <ul className="space-y-4 md:space-y-6 text-lg md:text-2xl opacity-80 mb-10 md:mb-16 leading-relaxed">
            <li>Description of the process and the goals</li>
            <li>Who can participate</li>
            <li className="text-brand-magenta font-bold">Start your course <span className="opacity-40 italic">→ click below to register</span></li>
          </ul>
          <button 
            onClick={() => setShowCoursePopup(true)}
            className="bg-brand-dark text-white px-10 md:px-16 py-4 md:py-6 rounded-full text-lg md:text-xl font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-brand-magenta transition-all shadow-2xl hover:-translate-y-2 active:scale-95"
          >
            Register Now
          </button>
        </div>
      </section>

      {/* 5. 1:1 Coaching, Agency, Money */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div id="coaching" className="bg-white p-10 md:p-16 rounded-2xl md:rounded-[3rem] border border-brand-dark/5 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all scroll-mt-[140px] md:scroll-mt-[100px]">
          <div>
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-green/30 rounded-full shadow-inner"></div>
              <h3 className="text-3xl md:text-5xl font-bold">1:1 coaching</h3>
            </div>
            <p className="text-lg md:text-xl opacity-70 mb-8 italic leading-relaxed">contracting (text with roles, responsibilities, logistics)</p>
          </div>
          <a href="#" className="text-base md:text-lg font-bold border-b-2 border-brand-magenta/30 w-fit pb-2 hover:border-brand-magenta hover:text-brand-magenta transition-all">Contact me for chemistry chat → email / WhatsApp</a>
        </div>
        <div id="agency" className="relative p-10 md:p-16 rounded-2xl md:rounded-[3rem] overflow-hidden text-brand-dark shadow-sm hover:shadow-2xl transition-all bg-white border border-brand-dark/5 scroll-mt-[140px] md:scroll-mt-[100px]">
          <div className="absolute inset-0 -z-10">
             <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80" alt="Shiny" className="w-full h-full object-cover opacity-20" />
          </div>
          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-green/30 rounded-full shadow-inner"></div>
            <h3 className="text-4xl md:text-5xl font-bold">Agency Cycle</h3>
          </div>
          <ul className="space-y-3 text-lg md:text-xl opacity-80 mb-10 md:mb-12 font-medium">
            <li>Description of the process and the goals</li>
            <li>Who can participate</li>
            <li className="text-brand-magenta">Dates in English</li>
            <li className="text-brand-magenta">Dates in Russian</li>
          </ul>
          <a href="#" className="text-base md:text-lg font-bold border-b-2 border-brand-dark/40 hover:border-brand-magenta hover:text-brand-magenta transition-all">Join introduction session → click to join</a>
        </div>
      </section>

      <section id="money" className="py-24 md:py-32 px-6 md:px-10 max-w-5xl mx-auto text-center scroll-mt-[140px] md:scroll-mt-[100px]">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-magenta/20 rounded-full mx-auto mb-8 md:mb-10"></div>
        <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-10 italic tracking-tight leading-tight">Money Money course</h2>
        <ul className="space-y-3 md:space-y-4 text-xl md:text-2xl opacity-80 mb-10 md:mb-12 italic">
          <li>Description of the process and the goals</li>
          <li>Who can participate</li>
        </ul>
        <button className="w-full md:w-auto px-10 md:px-12 py-4 md:py-5 bg-brand-dark text-white rounded-full font-bold uppercase tracking-widest hover:bg-brand-magenta transition-all shadow-xl text-sm md:text-base">Contact for Details</button>
      </section>

      {/* 6. FAQ & Contacts */}
      <section className="py-32 md:py-40 px-6 md:px-10 bg-[#F5F5F5]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 md:mb-24 italic tracking-tight leading-tight">Frequently asked questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24 md:mb-40">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-8 md:p-10 rounded-2xl border border-brand-dark/5 group hover:shadow-2xl transition-all cursor-pointer">
                <div className="flex justify-between items-start gap-4 md:gap-6">
                  <h4 className="text-lg md:text-xl font-bold leading-snug italic">{faq.q}</h4>
                  <span className="text-2xl md:text-3xl opacity-20 group-hover:text-brand-magenta group-hover:opacity-100 transition-all font-light">+</span>
                </div>
                <p className="mt-4 md:mt-6 text-sm md:text-base opacity-60 hidden group-hover:block leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="bg-white p-10 md:p-20 rounded-2xl md:rounded-[4rem] shadow-2xl text-center max-w-4xl mx-auto border border-brand-dark/5">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 md:mb-20 italic leading-tight">Contact Us Here For Queries, Concerns, Feedback & Requests</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 text-left">
              <div className="space-y-3 md:space-y-4">
                <label className="text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] opacity-40 font-bold">First Name *</label>
                <input type="text" placeholder="Enter your name" className="w-full bg-transparent border-b-2 border-brand-dark/10 py-3 md:py-4 focus:outline-none focus:border-brand-magenta transition-all text-base md:text-lg font-medium" />
              </div>
              <div className="space-y-3 md:space-y-4">
                <label className="text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] opacity-40 font-bold">Email *</label>
                <input type="email" placeholder="Enter your email" className="w-full bg-transparent border-b-2 border-brand-dark/10 py-3 md:py-4 focus:outline-none focus:border-brand-magenta transition-all text-base md:text-lg font-medium" />
              </div>
              <div className="md:col-span-2 space-y-3 md:space-y-4 mt-6 md:mt-8">
                <label className="text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] opacity-40 font-bold">Enter Your Message Here *</label>
                <textarea rows={4} placeholder="Type your message here..." className="w-full bg-transparent border-b-2 border-brand-dark/10 py-3 md:py-4 focus:outline-none focus:border-brand-magenta transition-all resize-none text-base md:text-lg font-medium"></textarea>
              </div>
              <div className="md:col-span-2 text-center pt-8 md:pt-12">
                <button className="w-full md:w-auto bg-brand-dark text-white px-12 md:px-20 py-4 md:py-6 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-brand-magenta transition-all shadow-2xl hover:scale-105 active:scale-95">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

const MyAccount: React.FC<MyAccountProps> = ({ isLoggedIn, onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'source' && password === '123') {
      onLogin();
      setError('');
    } else {
      setError('Invalid username or password. Hint: source / 123');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen py-24 md:py-40 px-6 md:px-10 bg-[#EBE7E4] text-brand-dark">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="w-full md:w-64 space-y-4">
              <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-brand-dark/5 text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-lime rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👤</div>
                <h2 className="text-xl font-bold">source</h2>
                <p className="text-xs opacity-40 font-bold uppercase tracking-widest mt-1">Member since 2026</p>
              </div>
              <nav className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-brand-dark/5 space-y-2">
                <button className="w-full text-left px-4 py-2 bg-brand-lime/20 rounded-lg font-bold text-sm">Dashboard</button>
                <button className="w-full text-left px-4 py-2 hover:bg-brand-dark/5 rounded-lg font-bold text-sm transition-colors">My Courses</button>
                <button className="w-full text-left px-4 py-2 hover:bg-brand-dark/5 rounded-lg font-bold text-sm transition-colors text-red-500" onClick={() => window.location.reload()}>Logout</button>
              </nav>
            </div>
            <div className="flex-grow w-full space-y-6 md:space-y-8">
              <div className="bg-white p-8 md:p-12 rounded-2xl md:rounded-[3rem] shadow-sm border border-brand-dark/5">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 italic underline decoration-brand-lime decoration-4 underline-offset-8 leading-tight">Welcome back!</h1>
                <p className="text-base md:text-lg opacity-60 font-medium leading-relaxed">Here you can find all your active sessions, courses and upcoming events.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-10 md:mt-12">
                  <div className="p-6 md:p-8 bg-brand-green/10 rounded-2xl border border-brand-green/20">
                    <h3 className="font-bold text-xl mb-2">SOURCE Online</h3>
                    <p className="text-xs md:text-sm opacity-60 mb-4 font-medium">Active • 3 days left</p>
                    <button className="text-brand-magenta font-bold text-sm border-b border-brand-magenta/30 hover:border-brand-magenta transition-all">Continue →</button>
                  </div>
                  <div className="p-6 md:p-8 bg-brand-magenta/10 rounded-2xl border border-brand-magenta/20">
                    <h3 className="font-bold text-xl mb-2">Next Workshop</h3>
                    <p className="text-xs md:text-sm opacity-60 mb-4 font-medium">MAR 28 • 18:00 GMT</p>
                    <Link to="/calendar" className="text-brand-dark font-bold text-sm border-b border-brand-dark/30 hover:border-brand-dark transition-all">View Details →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 md:py-40 px-6 md:px-10 bg-brand-dark text-white text-center flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 md:p-14 rounded-2xl md:rounded-[3rem] text-brand-dark shadow-2xl border border-white/20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 italic underline decoration-brand-magenta decoration-4 underline-offset-8">My Account</h2>
        <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 italic">Log In</h3>
        {error && (
          <div className="bg-red-50 text-red-500 text-[11px] md:text-[12px] p-4 md:p-5 rounded-xl md:rounded-2xl mb-8 md:mb-10 border border-red-100 font-bold uppercase tracking-wider text-left">
            {error}
          </div>
        )}
        {!error && (
          <div className="bg-blue-50 text-blue-500 text-[10px] md:text-[11px] p-3 md:p-4 rounded-xl md:rounded-2xl mb-8 md:mb-10 border border-blue-100 font-medium text-left">
            Hint: source / 123
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6 md:space-y-8 text-left">
          <div className="space-y-2 md:space-y-3">
            <label className="text-xs opacity-40 font-bold uppercase tracking-widest">Username</label>
            <input 
              required
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-brand-dark/5 p-4 md:p-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-brand-magenta transition-all font-medium text-base md:text-lg" 
            />
          </div>
          <div className="space-y-2 md:space-y-3">
            <label className="text-xs opacity-40 font-bold uppercase tracking-widest">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-brand-dark/5 p-4 md:p-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-brand-magenta transition-all font-medium text-base md:text-lg" 
            />
          </div>
          <button type="submit" className="w-full bg-brand-magenta text-white py-4 md:py-6 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl hover:-translate-y-1">Submit</button>
        </form>
      </div>
    </div>
  );
};

const CalendarEvents: React.FC = () => {
  const events: EventItem[] = [
    { date: "MAR 28", title: "Live Somatic Workshop", type: "Zoom Session", time: "18:00 GMT" },
    { date: "APR 05", title: "Agency Cycle Kickoff", type: "English Group", time: "19:30 GMT" },
    { date: "APR 12", title: "Money Money Masterclass", type: "Workshop", time: "17:00 GMT" }
  ];

  return (
    <div className="min-h-screen py-24 md:py-40 px-6 md:px-10 bg-[#EBE7E4]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-12 md:mb-20 italic underline decoration-brand-lime decoration-8 underline-offset-8 leading-tight">Calendar / Events</h1>
        <div className="space-y-6 md:space-y-8">
          {events.map((event, i) => (
            <div key={i} className="bg-white p-8 md:p-12 rounded-xl md:rounded-[2rem] shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-center md:text-left">
              <div className="w-full md:w-auto">
                <span className="text-brand-magenta font-bold tracking-widest text-xs md:text-sm uppercase">{event.date}</span>
                <h3 className="text-2xl md:text-3xl font-bold mt-2">{event.title}</h3>
                <p className="opacity-60 font-medium italic mt-1 text-sm md:text-base">{event.type} • {event.time}</p>
              </div>
              <button className="w-full md:w-auto bg-brand-dark text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-green transition-all text-sm md:text-base">Book Spot</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Feedback: React.FC = () => {
  return (
    <div className="min-h-screen py-24 md:py-40 px-6 md:px-10 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 md:mb-10 italic underline decoration-brand-magenta decoration-8 underline-offset-8 leading-tight">Feedback</h1>
        <p className="text-xl md:text-2xl opacity-60 mb-12 md:mb-20 italic font-medium leading-relaxed">We value your insights on individual product pages and sessions.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 text-left">
           {[1,2,3,4].map((i) => (
             <div key={i} className="p-8 md:p-10 bg-[#F5F5F5] rounded-xl md:rounded-[2rem] border border-brand-dark/5">
                <div className="flex gap-1 mb-4 text-brand-lime text-xl md:text-2xl">★★★★★</div>
                <p className="text-base md:text-lg italic opacity-80 mb-6 leading-relaxed">"This session completely changed my perspective on agency and systems. Highly recommended!"</p>
                <p className="font-bold uppercase tracking-widest text-[10px] md:text-xs opacity-40">— Anonymous Client</p>
             </div>
           ))}
        </div>
        <div className="mt-20 md:mt-32 p-10 md:p-16 bg-brand-dark text-white rounded-2xl md:rounded-[3rem]">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 italic">Leave your feedback</h2>
          <form className="space-y-4 md:space-y-6 text-left">
            <textarea placeholder="Tell us about your experience..." className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 focus:outline-none focus:border-brand-lime transition-all resize-none text-base md:text-lg"></textarea>
            <button className="w-full md:w-auto bg-brand-lime text-brand-dark px-10 md:px-12 py-3 md:py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all text-sm md:text-base">Submit Feedback</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 w-full z-50 px-4 md:px-10 py-4 md:py-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#EBE7E4]/90 backdrop-blur-md border-b border-brand-dark/5">
        <Link to="/" onClick={handleLogoClick} className="text-2xl md:text-3xl font-bold italic tracking-tighter hover:text-brand-magenta transition-colors">SOURCE</Link>
        
        {/* Navigation Links - Always visible, smaller on mobile */}
        <div className="flex justify-between items-center w-full sm:w-auto gap-2 md:gap-6 font-bold uppercase tracking-widest text-[9px] md:text-xs">
          <div className="flex gap-2">
            <Link to="/calendar" className="bg-white/40 backdrop-blur-md border border-white/30 text-brand-dark px-3 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-brand-green hover:text-white transition-all shadow-sm">Calendar</Link>
            <Link to="/feedback" className="bg-white/40 backdrop-blur-md border border-white/30 text-brand-dark px-3 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-brand-green hover:text-white transition-all shadow-sm">Feedback</Link>
          </div>
          <Link to="/account" className="bg-brand-magenta/40 backdrop-blur-md border border-white/30 text-brand-dark px-3 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-brand-dark hover:text-white transition-all shadow-sm">My Account</Link>
        </div>
      </nav>
      
      <main className="flex-grow pt-32 md:pt-40">{children}</main>
      
      <footer className="py-24 md:py-32 px-6 md:px-10 border-t border-brand-dark/5 opacity-80 bg-white">
        <div className="max-w-5xl mx-auto">
          <Link to="/" onClick={handleLogoClick} className="text-3xl md:text-4xl font-bold italic tracking-tighter hover:text-brand-magenta transition-colors mb-10 md:mb-12 block">SOURCE</Link>
          <h4 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 italic underline decoration-brand-lime decoration-4 underline-offset-8">Other possible pages</h4>
          <ul className="space-y-6 md:space-y-8 text-xl md:text-3xl font-medium">
            <li><Link to="/calendar" className="hover:text-brand-magenta transition-all group flex items-center gap-4"><span className="w-2 md:w-3 h-2 md:h-3 bg-brand-green rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>Calendar / events</Link></li>
            <li><Link to="/feedback" className="hover:text-brand-magenta transition-all group flex items-center gap-4"><span className="w-2 md:w-3 h-2 md:h-3 bg-brand-green rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>Feedback on individual product pages</Link></li>
            <li><Link to="/account" className="hover:text-brand-magenta transition-all group flex items-center gap-4"><span className="w-2 md:w-3 h-2 md:h-3 bg-brand-green rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>My Account / Log In</Link></li>
          </ul>
          <div className="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-brand-dark/5 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] opacity-40 flex flex-wrap gap-6 md:gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<MyAccount isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/calendar" element={<CalendarEvents />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

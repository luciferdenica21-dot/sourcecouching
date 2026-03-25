import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const CoursePopup = ({ isOpen, onClose }) => {
  const [courseRegistered, setCourseRegistered] = useState(false);
  if (!isOpen) return null;

  const handleRegistrationSubmit = (e) => {
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
            <h3 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 italic">Join Online Course</h3>
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

const Home = () => {
  const [showCoursePopup, setShowCoursePopup] = useState(false);
  const faqs = [
    { q: "What is the price?", a: "The pricing for the community memberships is found here." },
    { q: "When does the community start?", a: "The community has already begun. You can join today!" }
  ];

  return (
    <>
      <CoursePopup isOpen={showCoursePopup} onClose={() => setShowCoursePopup(false)} />
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 py-24 md:py-32 overflow-hidden">
        <h1 className="text-5xl md:text-8xl font-medium mb-12 md:mb-20 opacity-80 text-center tracking-tight leading-tight">Welcome to source</h1>
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl mb-4 font-medium opacity-70 italic">Introduction</h2>
            <p className="text-lg opacity-80">Explore our signature programs and community events below.</p>
          </div>
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-white/40 backdrop-blur-md border border-white/30 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Quick Links:</h3>
              <ul className="space-y-3">
                <li><Link to="/calendar" className="hover:text-brand-magenta transition-colors">• Community Calendar</Link></li>
                <li><Link to="/account" className="hover:text-brand-magenta transition-colors">• My Account</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setShowCoursePopup(true)}
          className="mt-12 bg-brand-dark text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-magenta transition-all"
        >
          Register for Online Course
        </button>
      </section>
    </>
  );
};

const MyAccount = ({ isLoggedIn, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'source' && password === '123') {
      onLogin();
      setError('');
    } else {
      setError('Invalid credentials. Hint: source / 123');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen py-40 px-10 bg-[#EBE7E4] text-center">
        <h1 className="text-4xl font-bold italic">Welcome back, Member!</h1>
        <p className="mt-4 opacity-60">You have access to all your courses and materials.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-40 px-10 bg-brand-dark flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-10 rounded-[3rem] text-brand-dark shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 italic text-center underline decoration-brand-magenta underline-offset-8">Login</h2>
        {error && <p className="text-red-500 text-xs font-bold mb-4 text-center uppercase">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <input required type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border-b-2 p-4 focus:outline-none focus:border-brand-magenta" />
          <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-b-2 p-4 focus:outline-none focus:border-brand-magenta" />
          <button type="submit" className="w-full bg-brand-magenta text-white py-4 rounded-full font-bold uppercase tracking-widest">Enter</button>
        </form>
      </div>
    </div>
  );
};

const CalendarEvents = () => {
  const events = [
    { date: "MAR 28", title: "Live Somatic Workshop", type: "Zoom Session", time: "18:00 GMT" },
    { date: "APR 05", title: "Agency Cycle Kickoff", type: "English Group", time: "19:30 GMT" }
  ];

  return (
    <div className="min-h-screen py-40 px-10 bg-[#EBE7E4]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-12 italic underline decoration-brand-lime decoration-8 underline-offset-8">Events</h1>
        <div className="space-y-6">
          {events.map((event, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <span className="text-brand-magenta font-bold uppercase text-xs">{event.date}</span>
                <h3 className="text-2xl font-bold">{event.title}</h3>
                <p className="opacity-60 italic text-sm">{event.type} • {event.time}</p>
              </div>
              <button className="bg-brand-dark text-white px-8 py-3 rounded-full font-bold uppercase text-sm">Book Spot</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Feedback = () => {
  return (
    <div className="min-h-screen py-40 px-10 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-10 italic underline decoration-brand-magenta underline-offset-8">Feedback</h1>
        <div className="mt-20 p-16 bg-brand-dark text-white rounded-[3rem]">
          <h2 className="text-2xl font-bold mb-8 italic">Leave your feedback</h2>
          <form className="space-y-6 text-left">
            <textarea placeholder="Tell us about your experience..." className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-brand-magenta transition-all resize-none h-32"></textarea>
            <button type="submit" className="w-full bg-brand-magenta text-white py-4 rounded-full font-bold uppercase tracking-widest">Send Feedback</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Layout & Main App ---

const Layout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-dark">
      <header className="fixed top-0 left-0 right-0 z-40 p-10 flex justify-between items-center bg-white/10 backdrop-blur-md">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="text-2xl font-bold italic">SOURCE</a>
        <nav className="flex gap-10">
          <Link to="/account" className="text-xs font-bold uppercase tracking-widest hover:text-brand-magenta transition-colors">Account</Link>
          <Link to="/calendar" className="text-xs font-bold uppercase tracking-widest hover:text-brand-magenta transition-colors">Calendar</Link>
          <Link to="/feedback" className="text-xs font-bold uppercase tracking-widest hover:text-brand-magenta transition-colors">Feedback</Link>
        </nav>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
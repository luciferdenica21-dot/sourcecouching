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
    { q: "I haven't done anything like this before. Is it suitable for complete beginners?", a: "Yes, this community brings a unique take on shadow work..." },
    { q: "I've been doing shadow work for a long time. Will this be too basic for me?", a: "No, this community brings a unique take on shadow work..." }
  ];

  return (
    <>
      <CoursePopup isOpen={showCoursePopup} onClose={() => setShowCoursePopup(false)} />
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 py-24 md:py-32 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-brand-lime/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-brand-green/20 rounded-full blur-3xl -z-10"></div>
        <h1 className="text-5xl md:text-8xl font-medium mb-12 md:mb-20 opacity-80 text-center tracking-tight leading-tight">Welcome to source</h1>
        
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          <div className="space-y-8 md:space-y-10">
            <div>
              <h2 className="text-xl md:text-2xl mb-4 font-medium opacity-70 italic">Introduction and what is this about</h2>
              <ul className="space-y-3 list-disc list-inside text-lg md:text-xl font-medium">
                <li>From Survival to Thriving</li>
                <li>Clarity Beneath the Surface</li>
                <li>Female Agency in Systems</li>
              </ul>
            </div>
          </div>
          <div className="space-y-8 md:space-y-12">
            <div className="relative p-8 md:p-10 rounded-2xl bg-white/40 backdrop-blur-md border border-white/30 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold mb-4">For individuals:</h3>
              <ul className="space-y-3 text-sm md:text-base opacity-90 font-medium">
                <li><a href="#online-course" className="hover:text-brand-magenta transition-colors">• Online course</a></li>
                <li><Link to="/calendar" className="hover:text-brand-magenta transition-colors">• Community</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setShowCoursePopup(true)}
          className="mt-12 bg-brand-dark text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-magenta transition-all"
        >
          Register for Course
        </button>
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
      setError('Invalid username or password.');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen py-24 md:py-40 px-6 md:px-10 bg-[#EBE7E4]">
        <h1 className="text-4xl font-bold text-center">Dashboard</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 md:py-40 px-6 md:px-10 bg-brand-dark flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl text-brand-dark shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 italic text-center">My Account</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <input required type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border p-4 rounded-xl" />
          <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-4 rounded-xl" />
          <button type="submit" className="w-full bg-brand-magenta text-white py-4 rounded-xl font-bold uppercase">Submit</button>
        </form>
      </div>
    </div>
  );
};

const CalendarEvents: React.FC = () => {
  const events: EventItem[] = [
    { date: "MAR 28", title: "Live Somatic Workshop", type: "Zoom Session", time: "18:00 GMT" }
  ];

  return (
    <div className="min-h-screen py-24 md:py-40 px-6 md:px-10 bg-[#EBE7E4]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 italic underline decoration-brand-lime">Calendar / Events</h1>
        {events.map((event, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl mb-4 flex justify-between items-center shadow-sm">
            <div>
              <span className="text-brand-magenta font-bold">{event.date}</span>
              <h3 className="text-2xl font-bold">{event.title}</h3>
            </div>
            <button className="bg-brand-dark text-white px-8 py-3 rounded-full font-bold">Book Spot</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Feedback: React.FC = () => {
  return (
    <div className="min-h-screen py-24 md:py-40 px-6 md:px-10 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-10 italic underline decoration-brand-magenta">Feedback</h1>
        <div className="mt-20 p-10 md:p-16 bg-brand-dark text-white rounded-[3rem]">
          <h2 className="text-2xl font-bold mb-8 italic">Leave your feedback</h2>
          <form className="space-y-6 text-left">
            <textarea 
              placeholder="Tell us about your experience..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-brand-magenta transition-all resize-none h-32"
            ></textarea>
            <button type="submit" className="w-full bg-brand-magenta text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all">
              Send Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Layout & Main App ---

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-dark bg-[#EBE7E4]">
      <header className="fixed top-0 left-0 right-0 z-40 p-6 md:p-10 flex justify-between items-center bg-brand-dark/10 backdrop-blur-sm">
        <a href="/" onClick={handleLogoClick} className="text-2xl font-bold italic text-brand-dark">SOURCE</a>
        <nav className="flex gap-6">
          <Link to="/account" className="text-xs font-bold uppercase tracking-widest">Account</Link>
          <Link to="/calendar" className="text-xs font-bold uppercase tracking-widest">Calendar</Link>
          <Link to="/feedback" className="text-xs font-bold uppercase tracking-widest">Feedback</Link>
        </nav>
      </header>
      <main className="flex-grow">{children}</main>
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
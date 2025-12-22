import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Globe, MessageCircle, Instagram, Facebook, ChevronUp } from 'lucide-react';
import Navbar from './Navbar';
import Home from './Home';
import ServicesPage from './Services';
import ProductsPage from './Products';
import ContactPage from './ContactPage';
import { TRANSLATIONS } from './constants';
import { Language } from './types';
import { AuthProvider } from './src/contexts/AuthContext';
import Login from './src/pages/Admin/Login';
import Dashboard from './src/pages/Admin/Dashboard';
import PrivateRoute from './src/components/PrivateRoute';

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// BackToTop Button Component
const BackToTopButton: React.FC<{ isRtl: boolean }> = ({ isRtl }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-28 ${isRtl ? 'left-8' : 'right-8'} z-40 w-12 h-12 bg-brand-primary text-white flex items-center justify-center shadow-xl hover:bg-brand-primary/80 transition-all rounded-full animate-scaleIn`}
      aria-label="Back to top"
    >
      <ChevronUp size={24} />
    </button>
  );
};

// AppContent handles routing-aware layout
const AppContent: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const location = useLocation();
  const isAdminRequest = location.pathname.startsWith('/admin');

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={`min-h-screen font-sans selection:bg-blue-100`}>
      <ScrollToTop />

      {!isAdminRequest && (
        <Navbar
          lang={lang}
          setLang={setLang}
          isScrolledOrAlwaysOpaque={false}
        />
      )}

      <Routes>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/services" element={<ServicesPage lang={lang} />} />
        <Route path="/products" element={<ProductsPage lang={lang} />} />
        <Route path="/contact" element={<ContactPage lang={lang} />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>

      {/* Footer - Always Visible except on Admin */}
      {!isAdminRequest && (
        <footer className="bg-brand-text text-white pt-16 pb-2">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-brand-border/30">
              <div className="relative flex items-center justify-center w-32 h-32">
                <img
                  src="/logo.png"
                  alt="Nirvana IOT Logo"
                  className="absolute w-56 h-56 max-w-none object-contain drop-shadow-lg"
                  style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                />
              </div>

              {/* Quick Links */}
              <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
                <h4 className="font-bold text-brand-primary text-lg">{t.quickLinks}</h4>
                <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm font-medium text-gray-300">
                  <Link to="/" className="hover:text-brand-primary transition-colors">{t.navHome}</Link>
                  <Link to="/services" className="hover:text-brand-primary transition-colors">{t.navServices}</Link>
                  <Link to="/products" className="hover:text-brand-primary transition-colors">{t.navProducts}</Link>
                  <Link to="/contact" className="hover:text-brand-primary transition-colors">{t.navContact}</Link>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <a href="https://www.instagram.com/nirvanaiot/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-primary transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="https://www.facebook.com/NirvanaIOT/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-primary transition-colors">
                  <Facebook size={24} />
                </a>
                <button onClick={toggleLang} className="flex items-center gap-2 bg-white/10 px-6 py-3 hover:bg-white/20 transition-all font-bold rounded-lg backdrop-blur-sm">
                  <Globe size={18} />
                  {lang === 'en' ? 'العربية' : 'English'}
                </button>
              </div>
            </div>
            <div className="pt-2 flex flex-col md:flex-row justify-between items-center gap-2 text-brand-border text-[10px] font-medium opacity-60">
              <p>{t.footerCopyright}</p>
              <div className="flex gap-4">
                <span>{t.privacyPolicy}</span>
                <span>{t.terms}</span>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* WhatsApp Floating */}
      {!isAdminRequest && (
        <>
          <a
            href="https://wa.me/966533461133"
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-50 w-16 h-16 bg-[#25D366] flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform active:scale-95 rounded-full`}
          >
            <MessageCircle size={32} />
          </a>

          {/* Back to Top Button */}
          <BackToTopButton isRtl={isRtl} />
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;

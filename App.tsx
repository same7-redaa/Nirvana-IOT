import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Globe, MessageCircle, Instagram, Facebook } from 'lucide-react';
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
        <footer className="bg-brand-text text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-12 border-b border-brand-border/30">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Nirvana IOT Logo" className="w-32 h-32 object-contain" />
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
            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-border text-sm font-medium">
              <p>{t.footerCopyright}</p>
              <div className="flex gap-8">
                <span>{t.privacyPolicy}</span>
                <span>{t.terms}</span>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* WhatsApp Floating */}
      {!isAdminRequest && (
        <a
          href="https://wa.me/966533461133"
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-50 w-16 h-16 bg-[#25D366] flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform active:scale-95 rounded-full`}
        >
          <MessageCircle size={32} />
        </a>
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

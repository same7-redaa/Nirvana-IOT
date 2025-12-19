import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Globe, MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import Home from './Home';
import ServicesPage from './Services';
import ProductsPage from './Products';
import ContactPage from './ContactPage';
import { TRANSLATIONS } from './constants';
import { Language } from './types';

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <Router>
      <div dir={isRtl ? 'rtl' : 'ltr'} className={`min-h-screen font-sans selection:bg-blue-100`}>
        <ScrollToTop />
        <Navbar
          lang={lang}
          setLang={setLang}
          // We can determine opacity based on location if needed, but Navbar handles scroll/hover.
          // For specific pages like Services/Products which have white bg, defaults work.
          // Home has transparent hero.
          isScrolledOrAlwaysOpaque={false}
        />

        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/services" element={<ServicesPage lang={lang} />} />
          <Route path="/products" element={<ProductsPage lang={lang} />} />
          <Route path="/contact" element={<ContactPage lang={lang} />} />
        </Routes>

        {/* Footer - Always Visible */}
        <footer className="bg-slate-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-12 border-b border-slate-900">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Nirvana IOT Logo" className="w-10 h-10 object-contain" />
                <span className="text-2xl font-extrabold tracking-tight uppercase">Nirvana<span className="text-blue-500">IOT</span></span>
              </div>
              <button onClick={toggleLang} className="flex items-center gap-2 bg-slate-800 px-6 py-3 hover:bg-slate-700 transition-all font-bold">
                <Globe size={18} />
                {lang === 'en' ? 'العربية' : 'English'}
              </button>
            </div>
            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-medium">
              <p>{t.footerCopyright}</p>
              <div className="flex gap-8">
                <span>{t.privacyPolicy}</span>
                <span>{t.terms}</span>
              </div>
            </div>
          </div>
        </footer>

        {/* WhatsApp Floating */}
        <a
          href="https://wa.me/966533461133"
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-50 w-16 h-16 bg-green-500 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform active:scale-95`}
        >
          <MessageCircle size={32} />
        </a>
      </div>
    </Router>
  );
};

export default App;

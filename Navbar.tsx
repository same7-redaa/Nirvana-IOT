import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Menu, Globe, ChevronRight, Home, Briefcase, Factory,
    Cctv, Network, Building2, Calculator
} from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { Language } from './types';

interface NavbarProps {
    lang: Language;
    setLang: (lang: Language) => void;
    isScrolledOrAlwaysOpaque?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, isScrolledOrAlwaysOpaque = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<'services' | 'products' | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const t = TRANSLATIONS[lang];
    const isRtl = lang === 'ar';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLang = () => {
        setLang(lang === 'en' ? 'ar' : 'en');
    };

    const solutionGroups = [
        { id: 1, title: t.catSmartHome.title, icon: <Home />, cat: t.catSmartHome },
        { id: 2, title: t.catSmartOffice.title, icon: <Briefcase />, cat: t.catSmartOffice },
        { id: 3, title: t.catSmartFactory.title, icon: <Factory />, cat: t.catSmartFactory },
        { id: 4, title: t.catSecurity.title, icon: <Cctv />, cat: t.catSecurity },
        { id: 5, title: t.catNetworks.title, icon: <Network />, cat: t.catNetworks },
        { id: 6, title: t.catBms.title, icon: <Building2 />, cat: t.catBms },
        { id: 7, title: t.catAccounting.title, icon: <Calculator />, cat: t.catAccounting },
    ];

    const productCategories = [
        { id: 1, name: isRtl ? 'كاميرات داخلية' : 'Indoor Cameras', img: '/products/indoor-cameras.png' },
        { id: 2, name: isRtl ? 'كاميرات خارجية' : 'Outdoor Cameras', img: '/products/outdoor-cameras.png' },
        { id: 3, name: isRtl ? 'مستشعرات ذكية' : 'Smart Sensors', img: '/products/smart-sensors.png' },
        { id: 4, name: isRtl ? 'الدخول الذكي' : 'Smart Access', img: '/products/smart-access.png' }
    ];

    // Check if current page is Home. If not, always opaque.
    const isHomePage = location.pathname === '/';
    const effectiveIsOpaque = scrolled || isScrolledOrAlwaysOpaque || activeMenu !== null || isMenuOpen || !isHomePage;

    const textColorClass = effectiveIsOpaque ? 'text-slate-700 hover:text-blue-600' : 'text-white hover:text-blue-200 drop-shadow-md';
    const logoColorClass = effectiveIsOpaque ? 'text-slate-900' : 'text-white drop-shadow-md';
    const buttonBgClass = effectiveIsOpaque ? 'bg-slate-100 text-slate-800 hover:bg-slate-200' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm';

    const handleMouseLeaveNav = () => {
        setActiveMenu(null);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${effectiveIsOpaque ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}
            dir={isRtl ? 'rtl' : 'ltr'}
            onMouseLeave={handleMouseLeaveNav}
        >
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center relative z-20">
                {/* Logo */}
                <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <img src="/logo.png" alt="Nirvana IOT Logo" className="w-14 h-14 object-contain" />
                    <span className={`text-2xl font-extrabold tracking-tight transition-colors ${logoColorClass}`}>
                        Nirvana <span className={effectiveIsOpaque ? 'text-blue-600' : 'text-blue-400'}>IOT</span>
                    </span>
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <button onClick={() => navigate('/')} className={`transition-colors font-medium ${textColorClass}`}>
                        {t.navHome}
                    </button>

                    <button
                        onClick={() => navigate('/services')}
                        onMouseEnter={() => setActiveMenu('services')}
                        className={`transition-colors font-medium cursor-pointer py-4 block ${activeMenu === 'services' ? 'text-blue-600' : textColorClass}`}
                    >
                        {isRtl ? 'خدماتنا' : 'Services'}
                    </button>

                    <button
                        onClick={() => navigate('/products')}
                        onMouseEnter={() => setActiveMenu('products')}
                        className={`transition-colors font-medium cursor-pointer py-4 block ${activeMenu === 'products' ? 'text-blue-600' : textColorClass}`}
                    >
                        {isRtl ? 'منتجاتنا' : 'Products'}
                    </button>

                    <button onClick={() => navigate('/contact')} className={`transition-colors font-medium ${textColorClass}`}>{t.navContact}</button>

                    <button
                        onClick={toggleLang}
                        className={`flex items-center gap-2 px-4 py-2 transition-all font-bold text-sm rounded-lg ${buttonBgClass}`}
                    >
                        <Globe size={18} />
                        {lang === 'en' ? 'العربية' : 'English'}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={toggleLang} className={`p-2 rounded-lg ${buttonBgClass}`}><Globe size={20} /></button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-lg ${buttonBgClass}`}><Menu /></button>
                </div>
            </div>

            {/* Services Mega Menu - Full Width, Absolute to Nav */}
            <div
                className={`absolute top-full left-0 w-full bg-white shadow-xl border-t-2 border-blue-600 py-8 transition-all duration-200 origin-top
          ${activeMenu === 'services' ? 'opacity-100 visible scale-y-100' : 'opacity-0 invisible scale-y-95 pointer-events-none'}`}
                style={{ zIndex: 10 }}
                onMouseEnter={() => setActiveMenu('services')}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {solutionGroups.map((group) => (
                            <button
                                key={group.id}
                                onClick={() => {
                                    navigate('/services', { state: { scrollToId: group.id } });
                                    setActiveMenu(null);
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group/item border border-transparent hover:border-blue-200 w-full text-left rounded-xl"
                            >
                                <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center shrink-0 group-hover/item:bg-blue-700 transition-colors rounded-lg shadow-md">
                                    {React.cloneElement(group.icon, { size: 24 })}
                                </div>
                                <span className="font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors text-base">
                                    {group.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Mega Menu - Full Width, Absolute to Nav */}
            <div
                className={`absolute top-full left-0 w-full bg-white shadow-xl border-t-2 border-blue-600 py-8 transition-all duration-200 origin-top
          ${activeMenu === 'products' ? 'opacity-100 visible scale-y-100' : 'opacity-0 invisible scale-y-95 pointer-events-none'}`}
                style={{ zIndex: 10 }}
                onMouseEnter={() => setActiveMenu('products')}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {productCategories.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => {
                                    navigate('/products', { state: { scrollToId: product.id } });
                                    setActiveMenu(null);
                                }}
                                className="group overflow-hidden rounded-xl border-2 border-slate-100 hover:border-blue-500 transition-all hover:shadow-lg"
                            >
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left" dir={isRtl ? 'rtl' : 'ltr'}>
                                        <span className="font-bold text-white text-lg">
                                            {product.name}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t shadow-lg absolute top-full left-0 right-0 z-50 max-h-[80vh] overflow-y-auto">
                    <div className="p-4 space-y-4">
                        <button onClick={() => { navigate('/'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-blue-600 font-bold bg-blue-50 px-3 rounded-lg">
                            {t.navHome}
                        </button>

                        <div className="border-t border-slate-100 pt-4">
                            <button
                                onClick={() => { navigate('/services'); setIsMenuOpen(false); }}
                                className="block w-full text-left py-2 font-bold hover:text-blue-600 mb-2 px-3"
                            >
                                {isRtl ? 'خدماتنا' : 'Services'}
                            </button>
                            <div className="grid grid-cols-1 gap-1 pl-4 rtl:pl-0 rtl:pr-4">
                                {solutionGroups.map(g => (
                                    <button
                                        key={g.id}
                                        onClick={() => { navigate('/services', { state: { scrollToId: g.id } }); setIsMenuOpen(false); }}
                                        className="text-left text-sm text-slate-600 py-2 px-3 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                                    >
                                        {React.cloneElement(g.icon, { size: 16 })}
                                        {g.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-4">
                            <button
                                onClick={() => { navigate('/products'); setIsMenuOpen(false); }}
                                className="block w-full text-left py-2 font-bold hover:text-blue-600 mb-2 px-3"
                            >
                                {isRtl ? 'منتجاتنا' : 'Products'}
                            </button>
                            <div className="grid grid-cols-1 gap-1 pl-4 rtl:pl-0 rtl:pr-4">
                                {productCategories.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => { navigate('/products', { state: { scrollToId: p.id } }); setIsMenuOpen(false); }}
                                        className="text-left text-sm text-slate-600 py-2 px-3 hover:bg-slate-50 rounded-lg"
                                    >
                                        {p.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => { navigate('/contact'); setIsMenuOpen(false); }} className="block w-full text-left py-2 hover:text-blue-600 font-medium border-t border-slate-100 pt-4 px-3">
                            {t.navContact}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

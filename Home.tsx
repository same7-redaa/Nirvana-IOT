import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Home as HomeIcon, Briefcase, Factory, Cctv, Network, Building2, Calculator,
    ChevronRight, Shield, Eye
} from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { Language } from './types';

interface HomeProps {
    lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
    const t = TRANSLATIONS[lang];
    const isRtl = lang === 'ar';
    const navigate = useNavigate();
    const [currentBg, setCurrentBg] = useState(0);

    const backgroundImages = [
        '/hero-camera.webp',
        '/hero-lock.jpg',
        '/hero-sensors.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const solutionGroups = [
        { id: 1, cat: t.catSmartHome, icon: <HomeIcon />, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop" },
        { id: 2, cat: t.catSmartOffice, icon: <Briefcase />, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" },
        { id: 3, cat: t.catSmartFactory, icon: <Factory />, img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2071&auto=format&fit=crop" },
        { id: 4, cat: t.catSecurity, icon: <Cctv />, img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop" },
        { id: 5, cat: t.catNetworks, icon: <Network />, img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop" },
        { id: 6, cat: t.catBms, icon: <Building2 />, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" },
        { id: 7, cat: t.catAccounting, icon: <Calculator />, img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop" },
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                {/* Background Images with Slider */}
                {backgroundImages.map((img, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 -z-10 bg-cover bg-center transition-opacity duration-1000 ${idx === currentBg ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url("${img}")` }}
                    >
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                ))}

                <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`max-w-2xl space-y-6 ${isRtl ? 'text-left mr-auto' : 'text-left'}`}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] drop-shadow-2xl">
                            {t.heroHeadline}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-lg">
                            {t.heroSubheadline}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Solutions Portfolio Section - Solid Blue Theme */}
            <section id="solutions" className="py-24 bg-blue-600 relative overflow-hidden">
                {/* Background Pattern - Subtle */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                    }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="text-center max-w-3xl mx-auto mb-16 space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            <span className="text-white text-sm font-bold uppercase tracking-wider">
                                {isRtl ? 'خدماتنا' : 'Our Services'}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">{isRtl ? 'حلول ذكية متكاملة' : 'Complete Smart Solutions'}</h2>
                        <p className="text-blue-100 text-lg md:text-xl leading-relaxed font-light opacity-90">
                            {isRtl ? 'نقدّم مجموعة واسعة من خدمات إنترنت الأشياء والأنظمة الذكية للأفراد والمؤسسات لتمكين المستقبل الرقمي.' : 'Providing a comprehensive range of IoT services and smart systems for individuals and enterprises to empower the digital future.'}
                        </p>
                    </motion.div>

                    {/* Services Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
                    >
                        {solutionGroups.map((group, idx) => (
                            <motion.button
                                key={idx}
                                variants={fadeInUp}
                                onClick={() => navigate('/services', { state: { scrollToId: group.id } })}
                                className={`group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 text-left h-full shadow-lg
                  ${idx === 0 || idx === 6
                                        ? 'md:col-span-2 bg-slate-900 text-white hover:bg-slate-800 border border-slate-700'
                                        : 'bg-white text-slate-900 hover:bg-blue-50 border border-transparent'}
                `}
                            >
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0 transition-transform duration-300 group-hover:scale-110
                    ${idx === 0 || idx === 6 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}
                  `}>
                                        {React.cloneElement(group.icon, { size: 28 })}
                                    </div>

                                    <div className="mt-auto">
                                        <h3 className={`text-xl font-bold mb-2 transition-colors ${idx === 0 || idx === 6 ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'}`}>
                                            {group.cat.title}
                                        </h3>
                                        <p className={`text-sm ${idx === 0 || idx === 6 ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {group.cat.items.length} {isRtl ? 'خدمات متوفرة' : 'services available'}
                                        </p>
                                    </div>

                                    <div className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0`}>
                                        <ChevronRight size={24} className={`${isRtl ? 'rotate-180' : ''} ${idx === 0 || idx === 6 ? 'text-white' : 'text-blue-600'}`} />
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* View All Services Button */}
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/services')}
                            className="group relative inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg transition-all hover:bg-blue-50 hover:shadow-xl hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                {isRtl ? 'اكتشف جميع الخدمات' : 'Discover All Services'}
                                <ChevronRight size={20} className={`transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center max-w-3xl mx-auto mb-16 space-y-4"
                    >
                        <h2 className="text-4xl font-extrabold text-slate-900">{isRtl ? 'منتجاتنا' : 'Our Products'}</h2>
                        <p className="text-slate-600 text-lg">
                            {isRtl ? 'اكتشف مجموعتنا المتنوعة من المنتجات الذكية' : 'Discover our diverse range of smart products'}
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {[
                            {
                                id: 1,
                                name: isRtl ? 'كاميرات داخلية' : 'Indoor Cameras',
                                img: '/products/indoor-cameras.png'
                            },
                            {
                                id: 2,
                                name: isRtl ? 'كاميرات خارجية' : 'Outdoor Cameras',
                                img: '/products/outdoor-cameras.png'
                            },
                            {
                                id: 3,
                                name: isRtl ? 'المستشعرات الذكية' : 'Smart Sensors',
                                img: '/products/smart-sensors.png'
                            },
                            {
                                id: 4,
                                name: isRtl ? 'الدخول الذكي' : 'Smart Access',
                                img: '/products/smart-access.png'
                            }
                        ].map((product, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="group bg-white border-2 border-blue-600 overflow-hidden flex flex-col"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 flex flex-col items-center gap-4 flex-grow">
                                    <h3 className="text-xl font-extrabold text-slate-900 text-center">
                                        {product.name}
                                    </h3>
                                    <button
                                        onClick={() => navigate('/products', { state: { scrollToId: product.id } })}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 font-bold hover:bg-blue-700 transition-all mt-auto"
                                    >
                                        {isRtl ? 'عرض المزيد' : 'View More'}
                                        <ChevronRight size={18} className={isRtl ? 'rotate-180' : ''} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* View All Products Button */}
                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigate('/products')}
                            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-2xl hover:scale-105"
                        >
                            {isRtl ? 'عرض جميع المنتجات' : 'View All Products'}
                            <ChevronRight size={24} className={isRtl ? 'rotate-180' : ''} />
                        </button>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-24 bg-slate-900 text-white relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="space-y-8"
                        >
                            <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full">
                                <span className="text-blue-400 font-bold tracking-wider uppercase text-sm">
                                    {isRtl ? 'من نحن' : 'Who We Are'}
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                                {t.aboutTitle}
                            </h2>
                            <p className="text-slate-300 text-lg leading-relaxed border-l-4 border-blue-600 pl-6 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-6">
                                {t.aboutDesc}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-8 pt-4">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                                        <Shield size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{t.aboutMissionTitle}</h3>
                                    <p className="text-slate-400 text-sm">{t.aboutMissionDesc}</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                                        <Eye size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{t.aboutVisionTitle}</h3>
                                    <p className="text-slate-400 text-sm">{t.aboutVisionDesc}</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative rounded-3xl overflow-hidden aspect-square border border-white/10 shadow-2xl"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
                                    alt="About Nirvana"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-slate-900/20"></div>
                            </motion.div>
                            {/* Floating Stats Card */}
                            <motion.div
                                initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className={`absolute -bottom-8 ${isRtl ? '-right-8' : '-left-8'} bg-white text-slate-900 p-8 rounded-2xl shadow-xl max-w-xs hidden md:block`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                                        5+
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">{isRtl ? 'سنوات من الخبرة' : 'Years of Experience'}</p>
                                        <p className="text-slate-500 text-sm">{isRtl ? 'في مجال الحلول الذكية' : 'In Smart Solutions'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-xl">
                                        100+
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">{isRtl ? 'مشروع ناجح' : 'Successful Projects'}</p>
                                        <p className="text-slate-500 text-sm">{isRtl ? 'في المملكة' : 'Across KSA'}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;

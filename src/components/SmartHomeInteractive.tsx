import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cctv, Thermometer, Lightbulb, Lock, Wifi, Tv, Zap, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../../constants';
import { Language } from '../../types';

interface SmartHomeInteractiveProps {
    lang: Language;
}

const SmartHomeInteractive: React.FC<SmartHomeInteractiveProps> = ({ lang }) => {
    const isRtl = lang === 'ar';
    const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

    const hotspots = [
        {
            id: 1,
            top: '20%',
            left: '35%',
            icon: <Cctv className="w-6 h-6" />,
            title: isRtl ? 'مراقبة ذكية' : 'Smart Surveillance',
            description: isRtl ? 'كاميرات مراقبة متطورة تعمل بالذكاء الاصطناعي لحماية منزلك 24/7.' : 'AI-powered advanced surveillance cameras to protect your home 24/7.',
            color: 'bg-red-500'
        },
        {
            id: 2,
            top: '45%',
            left: '60%',
            icon: <Lightbulb className="w-6 h-6" />,
            title: isRtl ? 'إضاءة ذكية' : 'Smart Lighting',
            description: isRtl ? 'تحكم في إضاءة منزلك عن بعد، واضبط الأجواء المناسبة لكل لحظة.' : 'Control your home lighting remotely and set the perfect ambiance for every moment.',
            color: 'bg-yellow-400'
        },
        {
            id: 3,
            top: '60%',
            left: '25%',
            icon: <Thermometer className="w-6 h-6" />,
            title: isRtl ? 'تحكم بالمناخ' : 'Climate Control',
            description: isRtl ? 'ضبط تلقائي لدرجة الحرارة لتوفير الطاقة وضمان راحتك الدائمة.' : 'Automatic temperature adjustment to save energy and ensure your constant comfort.',
            color: 'bg-blue-500'
        },
        {
            id: 4,
            top: '50%',
            left: '80%',
            icon: <Lock className="w-6 h-6" />,
            title: isRtl ? 'أقفال ذكية' : 'Smart Locks',
            description: isRtl ? 'وداعاً للمفاتيح التقليدية. تحكم في أبواب منزلك عبر هاتفك ومن أي مكان.' : 'Goodbye traditional keys. Control your doors via your phone from anywhere.',
            color: 'bg-green-500'
        },
        {
            id: 5,
            top: '80%',
            left: '45%',
            icon: <Wifi className="w-6 h-6" />,
            title: isRtl ? 'تغطية واي فاي' : 'WiFi Coverage',
            description: isRtl ? 'شبكة منزلية قوية ومستقرة تغطي كل ركن في منزلك.' : 'Strong and stable home network covering every corner of your house.',
            color: 'bg-purple-500'
        }
    ];

    return (
        <section className="py-24 bg-brand-bg overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-extrabold text-brand-text mb-4">
                            {isRtl ? 'عيش تجربة المنزل الذكي' : 'Experience the Smart Home'}
                        </h2>
                        <p className="text-brand-muted text-lg">
                            {isRtl ? 'تخيل منزلك يتفاعل معك. اضغط على النقاط التفاعلية لاكتشاف الميزات.' : 'Imagine your home reacting to you. Click the hotspots to discover features.'}
                        </p>
                    </motion.div>
                </div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-[16/9] lg:aspect-[21/9] group">
                    {/* Background Image - Modern Living Room */}
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                        alt="Smart Home Interior"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                    />

                    {/* Interactive Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* Hotspots */}
                    {hotspots.map((spot) => (
                        <motion.button
                            key={spot.id}
                            className={`absolute w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 backdrop-blur-md transition-transform hover:scale-110 z-10 ${activeHotspot === spot.id ? 'bg-white text-brand-primary scale-110 ring-4 ring-white/30' : 'bg-black/40 text-white hover:bg-white hover:text-brand-primary'}`}
                            style={{ top: spot.top, left: spot.left }}
                            onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: spot.id * 0.1, type: 'spring' }}
                        >
                            {spot.icon}
                            {/* Pulse Effect */}
                            {activeHotspot !== spot.id && (
                                <span className={`absolute inset-0 rounded-full animate-ping opacity-75 ${spot.color}`}></span>
                            )}
                        </motion.button>
                    ))}

                    {/* Info Card - Shows when a hotspot is active */}
                    <AnimatePresence>
                        {activeHotspot && (() => {
                            const spot = hotspots.find(s => s.id === activeHotspot);
                            if (!spot) return null;
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                    className={`absolute bottom-8 ${isRtl ? 'right-4 md:right-8' : 'left-4 md:left-8'} max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl z-20 text-white`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl ${spot.color} bg-opacity-20 text-${spot.color.split('-')[1]}-300`}>
                                            {React.cloneElement(spot.icon, { size: 28 })}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{spot.title}</h3>
                                            <p className="text-gray-200 text-sm leading-relaxed">{spot.description}</p>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                                            className="absolute top-4 right-4 text-white/50 hover:text-white"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })()}
                    </AnimatePresence>


                </div>
            </div>
        </section>
    );
};

export default SmartHomeInteractive;

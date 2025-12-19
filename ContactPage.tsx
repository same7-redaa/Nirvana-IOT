import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { Language } from './types';

interface ContactPageProps {
    lang: Language;
}

const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
    const t = TRANSLATIONS[lang];
    const isRtl = lang === 'ar';

    return (
        <div className={`min-h-screen pt-20 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            <section id="contact" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-10">
                            <h2 className="text-4xl font-extrabold text-slate-900">{t.contactTitle}</h2>
                            <div className="space-y-6">
                                <div className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-100">
                                    <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-500 uppercase">{t.directCall}</p>
                                        <p className="text-xl font-bold text-slate-900" dir="ltr">+966 533 46 1133</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-100">
                                    <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-500 uppercase">{t.emailAddress}</p>
                                        <p className="text-xl font-bold text-slate-900">info@nirvanaiot.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100">
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input placeholder={t.contactName} type="text" className="w-full bg-slate-50 border border-slate-200 px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                    <input placeholder={t.contactEmail} type="email" className="w-full bg-slate-50 border border-slate-200 px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                </div>
                                <textarea placeholder={t.contactMessage} rows={4} className="w-full bg-slate-50 border border-slate-200 px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"></textarea>
                                <button type="button" className="w-full bg-blue-600 text-white font-extrabold py-5 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 uppercase tracking-wide">
                                    {t.contactSubmit}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;

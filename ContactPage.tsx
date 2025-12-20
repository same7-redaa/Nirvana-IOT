import React, { useRef, useState, useEffect } from 'react';
import { Phone, Mail } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { TRANSLATIONS } from './constants';
import { Language } from './types';
import { EMAILJS_CONFIG } from './src/lib/emailjs-config';

interface ContactPageProps {
    lang: Language;
}

const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
    const t = TRANSLATIONS[lang];
    const isRtl = lang === 'ar';
    const location = useLocation();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    const [defaultMessage, setDefaultMessage] = useState('');

    useEffect(() => {
        if (location.state?.inquiryType && location.state?.name) {
            const { inquiryType, name } = location.state;
            const msg = isRtl
                ? `مرحباً، أود الاستفسار بخصوص ${inquiryType === 'Product' ? 'المنتج' : 'الخدمة'}: ${name}`
                : `Hello, I would like to inquire about the ${inquiryType}: ${name}`;
            setDefaultMessage(msg);
        }
    }, [location.state, isRtl]);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: '' });

        if (!formRef.current) return;

        emailjs.sendForm(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            formRef.current,
            EMAILJS_CONFIG.PUBLIC_KEY
        ).then((result) => {
            console.log(result.text);
            setStatus({
                type: 'success',
                message: isRtl ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Message sent successfully! We will contact you soon.'
            });
            formRef.current?.reset();
        }, (error) => {
            console.log(error.text);
            setStatus({
                type: 'error',
                message: isRtl ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.' : 'Failed to send message. Please try again or contact us directly.'
            });
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className={`min-h-screen pt-20 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            <section id="contact" className="py-20 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-10">
                            <h2 className="text-4xl font-extrabold text-brand-text">{t.contactTitle}</h2>
                            <div className="space-y-6">
                                <div className="flex items-center gap-6 p-6 bg-brand-card border border-brand-border/20 rounded-xl">
                                    <div className="w-12 h-12 bg-brand-primary text-white flex items-center justify-center shrink-0 rounded-lg">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-brand-muted uppercase">{t.directCall}</p>
                                        <p className="text-xl font-bold text-brand-text" dir="ltr">+966 533 46 1133</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 p-6 bg-brand-card border border-brand-border/20 rounded-xl">
                                    <div className="w-12 h-12 bg-brand-primary text-white flex items-center justify-center shrink-0 rounded-lg">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-brand-muted uppercase">{t.emailAddress}</p>
                                        <a href="mailto:info@nirvanaiot.com" className="text-xl font-bold text-brand-text hover:text-brand-primary transition-colors">info@nirvanaiot.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-card p-8 md:p-12 shadow-2xl shadow-brand-border/10 border border-brand-primary/10 rounded-2xl">
                            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input
                                        name="user_name"
                                        placeholder={t.contactName}
                                        type="text"
                                        required
                                        className="w-full bg-brand-bg border border-brand-border px-4 py-4 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none transition-all text-brand-text placeholder-brand-muted/50"
                                    />
                                    <input
                                        name="user_email"
                                        placeholder={t.contactEmail}
                                        type="email"
                                        required
                                        className="w-full bg-brand-bg border border-brand-border px-4 py-4 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none transition-all text-brand-text placeholder-brand-muted/50"
                                    />
                                </div>
                                <textarea
                                    name="message"
                                    placeholder={t.contactMessage}
                                    rows={4}
                                    required
                                    defaultValue={defaultMessage}
                                    className="w-full bg-brand-bg border border-brand-border px-4 py-4 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none transition-all text-brand-text placeholder-brand-muted/50"
                                ></textarea>

                                {status.message && (
                                    <div className={`p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {status.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-brand-primary text-white font-extrabold py-5 rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            {isRtl ? 'جاري الإرسال...' : 'Sending...'}
                                        </>
                                    ) : t.contactSubmit}
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

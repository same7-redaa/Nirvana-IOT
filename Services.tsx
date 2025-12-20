import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Briefcase, Factory, Cctv, Network, Building2, Calculator, ChevronRight, Phone, Mail, Shield, Zap, Wifi, Lock, Eye, Thermometer, Lightbulb, DoorOpen, Car, Users, Flame, Wind, Gauge, Warehouse, Server, Settings, GraduationCap, Link, Package } from 'lucide-react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './src/firebase';

type Language = 'en' | 'ar';

interface ServiceCategory {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ReactNode;
  image: string;
  features: { name: string; nameAr: string; icon: React.ReactNode }[];
}

interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: string;
  image: string;

}

const ServicesPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const isRtl = lang === 'ar';
  const location = useLocation();
  const navigate = useNavigate();
  const scrollToCategoryId = location.state?.scrollToId;

  // State for dynamic products
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [serviceLinks, setServiceLinks] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch All Products (via Categories)
        const catSnap = await getDocs(collection(db, 'categories'));
        let products: Product[] = [];
        catSnap.forEach(doc => {
          const data = doc.data();
          if (data.products) {
            products = [...products, ...data.products];
          }
        });
        setAllProducts(products);

        // 2. Fetch Service Links
        const linkSnap = await getDocs(collection(db, 'service_products'));
        const links: Record<string, string[]> = {};
        linkSnap.forEach(doc => {
          // doc.id is like "service_1"
          const serviceId = doc.id.replace('service_', '');
          links[serviceId] = doc.data().productIds || [];
        });
        setServiceLinks(links);

      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // ... scroll logic ...
  // Scroll to top when component mounts OR scroll to specific category
  useEffect(() => {
    if (scrollToCategoryId) {
      // Scroll to specific category
      setTimeout(() => {
        scrollToCategory(scrollToCategoryId);
      }, 100);
    } else {
      // Scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [scrollToCategoryId]);

  // Function to scroll to specific category
  const scrollToCategory = (categoryId: number) => {
    const element = document.getElementById(`service-category-${categoryId}`);
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // ... categories definition ...
  const categories: ServiceCategory[] = [
    {
      id: 1,
      name: 'Smart Home Solutions',
      nameAr: 'حلول المنازل الذكية',
      description: 'Integrated systems for security, energy efficiency, and automated comfort control in residential spaces.',
      descriptionAr: 'أنظمة متكاملة للأمان وكفاءة الطاقة والتحكم التلقائي بالراحة في المساحات السكنية.',
      icon: <Home size={32} />,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
      features: [
        { name: 'Smart Cameras', nameAr: 'الكاميرات الذكية', icon: <Cctv size={18} /> },
        { name: 'Smart Locks', nameAr: 'الأقفال الذكية', icon: <Lock size={18} /> },
        { name: 'Smart Sensors', nameAr: 'الحساسات الذكية', icon: <Eye size={18} /> },
        { name: 'Smart Lighting', nameAr: 'الإضاءة الذكية', icon: <Lightbulb size={18} /> },
        { name: 'Automated Curtains & Shades', nameAr: 'الستائر والظلال الآلية', icon: <DoorOpen size={18} /> },
        { name: 'AC Control', nameAr: 'التحكم بالتكييف', icon: <Thermometer size={18} /> },
        { name: 'Full Automation Scenarios', nameAr: 'سيناريوهات متكاملة (Full Automation)', icon: <Settings size={18} /> },
        { name: 'Compatibility', nameAr: 'التوافق', icon: <Link size={18} /> },
      ]
    },
    {
      id: 2,
      name: 'Smart Office Solutions',
      nameAr: 'حلول المكاتب الذكية',
      description: 'Optimized workspace management, smart climate control, and advanced collaboration tools.',
      descriptionAr: 'إدارة محسنة لمساحات العمل، تحكم ذكي بالمناخ، وأدوات تعاون متقدمة.',
      icon: <Briefcase size={32} />,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
      features: [
        { name: 'Access Control Systems', nameAr: 'أنظمة الدخول (Access Control)', icon: <Lock size={18} /> },
        { name: 'Attendance Systems', nameAr: 'أنظمة الحضور (Attendance Systems)', icon: <Users size={18} /> },
        { name: 'Office Cameras', nameAr: 'كاميرات المكاتب', icon: <Cctv size={18} /> },
        { name: 'Smart Meeting Rooms', nameAr: 'غرف الاجتماعات الذكية', icon: <Briefcase size={18} /> },
        { name: 'Smart Lighting', nameAr: 'الإضاءة الذكية', icon: <Lightbulb size={18} /> },
        { name: 'AC Control', nameAr: 'التحكم بالتكييف', icon: <Thermometer size={18} /> },
        { name: 'Parking Automation', nameAr: 'بوابات المواقف (Parking Automation)', icon: <Car size={18} /> },
        { name: 'Door Automation', nameAr: 'أتمتة الأبواب', icon: <DoorOpen size={18} /> },
        { name: 'Visitor Management', nameAr: 'إدارة الزوار (Visitor Management)', icon: <Users size={18} /> },
      ]
    },
    {
      id: 3,
      name: 'Smart Factory Solutions',
      nameAr: 'حلول المصانع الذكية',
      description: 'Predictive maintenance, real-time monitoring, and process automation for efficient manufacturing.',
      descriptionAr: 'صيانة تنبؤية، مراقبة فورية، وأتمتة العمليات للتصنيع الفعال.',
      icon: <Factory size={32} />,
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2071&auto=format&fit=crop',
      features: [
        { name: 'Industrial Cameras', nameAr: 'كاميرات صناعية', icon: <Cctv size={18} /> },
        { name: 'Gas Detection', nameAr: 'كشف الغازات', icon: <Wind size={18} /> },
        { name: 'Fire Alarm Systems', nameAr: 'أنظمة الإنذار من الحريق', icon: <Flame size={18} /> },
        { name: 'Environmental Sensors', nameAr: 'حساسات بيئية', icon: <Thermometer size={18} /> },
        { name: 'Energy Monitoring', nameAr: 'مراقبة الطاقة', icon: <Gauge size={18} /> },
        { name: 'Production Safety', nameAr: 'سلامة الإنتاج', icon: <Shield size={18} /> },
        { name: 'Warehouse Automation', nameAr: 'أتمتة المستودعات', icon: <Warehouse size={18} /> },
        { name: 'Industrial Access Control', nameAr: 'التحكم بالدخول الصناعي', icon: <Lock size={18} /> },
      ]
    },
    {
      id: 4,
      name: 'Security & Surveillance Systems',
      nameAr: 'أنظمة الأمن والمراقبة',
      description: 'Comprehensive and advanced security solutions to protect properties and assets with the latest technologies.',
      descriptionAr: 'حلول أمنية شاملة ومتطورة لحماية الممتلكات والأصول بأحدث التقنيات.',
      icon: <Cctv size={32} />,
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop',
      features: [
        { name: 'Camera Types', nameAr: 'أنواع الكاميرات', icon: <Cctv size={18} /> },
        { name: 'Features', nameAr: 'المميزات', icon: <Settings size={18} /> },
        { name: 'Gas Sensors', nameAr: 'حساسات الغاز', icon: <Wind size={18} /> },
        { name: 'Smoke Sensors', nameAr: 'حساسات الدخان', icon: <Flame size={18} /> },
        { name: 'Motion Detectors', nameAr: 'كاشفات الحركة', icon: <Eye size={18} /> },
        { name: 'Alerts', nameAr: 'التنبيهات', icon: <Shield size={18} /> },
      ]
    },
    {
      id: 5,
      name: 'Networks & Infrastructure',
      nameAr: 'الشبكات والأنظمة',
      description: 'Establishing a robust digital infrastructure ensuring stable and fast connectivity for all systems.',
      descriptionAr: 'تأسيس بنية تحتية رقمية قوية تضمن اتصالاً مستقراً وسريعاً لجميع الأنظمة.',
      icon: <Network size={32} />,
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop',
      features: [
        { name: 'Wi-Fi Mesh Network', nameAr: 'شبكة Wi-Fi Mesh', icon: <Wifi size={18} /> },
        { name: 'Routers & Switches', nameAr: 'موجهات ومحولات (Routers & Switches)', icon: <Server size={18} /> },
        { name: 'System Integration', nameAr: 'تكامل الأنظمة (System Integration)', icon: <Link size={18} /> },
        { name: 'Infrastructure', nameAr: 'البنية التحتية', icon: <Building2 size={18} /> },
        { name: 'Network Security', nameAr: 'أمن الشبكات', icon: <Shield size={18} /> },
      ]
    },
    {
      id: 6,
      name: 'Building Management System',
      nameAr: 'نظام إدارة المباني (BMS)',
      description: 'We provide smart building management solutions that enable you to fully control HVAC, lighting, energy, and safety systems through a single centralized platform. Our solutions help reduce energy consumption, improve operational efficiency, and enhance security in residential and commercial buildings.',
      descriptionAr: 'نقدّم حلول إدارة مباني ذكية تُمكّنك من التحكم الكامل في التكييف، الإضاءة، الطاقة، وأنظمة السلامة من خلال منصة مركزية واحدة. حلولنا تساعد على تقليل استهلاك الطاقة، تحسين كفاءة التشغيل، ورفع مستوى الأمان في المباني السكنية والتجارية.',
      icon: <Building2 size={32} />,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
      features: [
        { name: 'HVAC & Ventilation', nameAr: 'التكييف والتهوية', icon: <Thermometer size={18} /> },
        { name: 'Smart Lighting', nameAr: 'الإضاءة الذكية', icon: <Lightbulb size={18} /> },
        { name: 'Energy Management', nameAr: 'إدارة الطاقة', icon: <Zap size={18} /> },
        { name: 'Security & Safety Systems', nameAr: 'أنظمة الأمن والسلامة', icon: <Shield size={18} /> },
      ]
    },
    {
      id: 7,
      name: 'Business & Accounting Systems',
      nameAr: 'تنفيذ وتكامل الأنظمة المحاسبية',
      description: 'At NirvanaIOT, we provide comprehensive implementation services for accounting systems to help you manage your business more efficiently and connect financial operations with modern technology. An integrated solution from system to hardware... to run your business smoothly and professionally.',
      descriptionAr: 'نقدّم في NirvanaIOT خدمات تنفيذ متكاملة للأنظمة المحاسبية لمساعدتك على إدارة أعمالك بكفاءة أعلى وربط العمليات المالية بالتقنية الحديثة. حل متكامل من النظام إلى الأجهزة… لتشغيل أعمالك بسلاسة واحترافية.',
      icon: <Calculator size={32} />,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop',
      features: [
        { name: 'Odoo ERP', nameAr: 'Odoo ERP', icon: <Server size={18} /> },
        { name: 'Al-Amin Accounting Software', nameAr: 'برنامج الأمين المحاسبي', icon: <Calculator size={18} /> },
        { name: 'Full System Setup', nameAr: 'إعداد النظام الكامل', icon: <Settings size={18} /> },
        { name: 'System Customization', nameAr: 'تخصيص النظام', icon: <Settings size={18} /> },
        { name: 'Employee Training', nameAr: 'تدريب الموظفين', icon: <GraduationCap size={18} /> },
        { name: 'System Integration', nameAr: 'ربط الأنظمة', icon: <Link size={18} /> },
        { name: 'Hardware Supply', nameAr: 'توريد الأجهزة', icon: <Package size={18} /> },
      ]
    },
  ];

  return (
    <div className={`min-h-screen bg-brand-bg`}>
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 bg-gradient-to-br from-brand-text via-slate-900 to-brand-text overflow-hidden">
        {/* ... (keep hero content) ... */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fadeIn">
            {isRtl ? 'خدماتنا المتكاملة' : 'Our Complete Services'}
          </h1>
          <p className="text-white/90 text-xl max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            {isRtl ? 'حلول تقنية متطورة لتحويل أعمالك إلى بيئة ذكية ومتصلة' : 'Advanced technology solutions to transform your business into a smart, connected environment'}
          </p>
        </div>
      </div>

      <div className="py-12">
        {/* Categories with Full Width Display */}
        {categories.map((category, index) => {
          // Get linked products for this service
          const linkedIds = serviceLinks[category.id.toString()] || [];
          const linkedProducts = allProducts.filter(p => linkedIds.includes(p.id));

          return (
            <section
              key={category.id}
              id={`service-category-${category.id}`}
              className={`py-16 ${index % 2 === 0 ? 'bg-brand-bg' : 'bg-brand-bg/50'}`}
            >
              <div className="max-w-7xl mx-auto px-4">
                {/* Category Card */}
                <div className="bg-brand-card rounded-3xl shadow-2xl overflow-hidden border border-brand-primary/20 animate-fadeIn">
                  {/* Header with Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={category.image}
                      alt={isRtl ? category.nameAr : category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>

                    {/* Title Overlay */}
                    <div className="absolute inset-0 flex items-end">
                      <div className="p-8 w-full">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-brand-primary text-white flex items-center justify-center rounded-2xl shadow-lg">
                            {category.icon}
                          </div>
                          <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                              {isRtl ? category.nameAr : category.name}
                            </h2>
                            <p className="text-white/80 text-lg mt-1">
                              {isRtl ? category.name : category.nameAr}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Description */}
                    <p className="text-brand-text text-lg leading-relaxed mb-8 max-w-4xl">
                      {isRtl ? category.descriptionAr : category.description}
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                      {category.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="group flex items-center gap-3 p-4 bg-brand-bg hover:bg-brand-primary rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-brand-primary/50 hover:shadow-lg"
                        >
                          <div className="w-10 h-10 bg-brand-primary/20 group-hover:bg-white/20 text-brand-primary group-hover:text-white flex items-center justify-center rounded-lg transition-all shrink-0">
                            {feature.icon}
                          </div>
                          <span className="font-medium text-brand-text group-hover:text-white transition-colors text-sm">
                            {isRtl ? feature.nameAr : feature.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Linked Products Carousel/Grid */}
                    {linkedProducts.length > 0 && (
                      <div className="mt-10 pt-10 border-t border-brand-border/30">
                        <h3 className="text-xl font-bold text-brand-text mb-6 flex items-center gap-2">
                          <Package className="text-brand-primary" />
                          {isRtl ? 'منتجات ذات صلة بهذه الخدمة' : 'Products Used in This Service'}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          {linkedProducts.map(product => (
                            <div key={product.id} className="bg-brand-bg rounded-xl p-3 border border-brand-border/20 hover:border-brand-primary hover:shadow-lg transition-all group">
                              <div className="h-40 overflow-hidden rounded-lg mb-3 bg-white">
                                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <div
                                onClick={() => navigate('/contact', { state: { inquiryType: 'Product', name: isRtl ? product.nameAr : product.name } })}
                                className="font-bold text-brand-text text-sm mb-1 line-clamp-2 hover:text-brand-primary block cursor-pointer"
                              >
                                {isRtl ? product.nameAr : product.name}
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-brand-primary font-bold text-xs">{product.price}</span>
                                <span className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-1 rounded-full">
                                  {isRtl ? 'اطلب' : 'Order'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => navigate('/contact', { state: { inquiryType: 'Service', name: isRtl ? category.nameAr : category.name } })}
                        className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl flex items-center gap-3"
                      >
                        {isRtl ? 'اطلب هذه الخدمة' : 'Request This Service'}
                        <ChevronRight size={20} className={isRtl ? 'rotate-180' : ''} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA Section */}
        <section className="py-20 bg-brand-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-6">
              {isRtl ? 'هل تحتاج إلى حل مخصص؟' : 'Need a Custom Solution?'}
            </h2>
            <p className="text-white/90 text-xl mb-8">
              {isRtl ? 'تواصل معنا لنصمم لك الحل الأمثل لاحتياجاتك' : 'Contact us to design the perfect solution for your needs'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+966533461133" className="bg-white text-brand-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-bg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                <Phone size={20} />
                {isRtl ? 'اتصل بنا' : 'Call Us'}
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="bg-brand-text text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Mail size={20} />
                {isRtl ? 'راسلنا' : 'Email Us'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;

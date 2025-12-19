import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Camera, Lock, Radio, Camera as CameraIcon } from 'lucide-react';

type Language = 'en' | 'ar';

interface Product {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: string;
  image: string;
  features: string[];
  featuresAr: string[];
}

interface Category {
  id: number;
  name: string;
  nameAr: string;
  icon: React.ReactNode;
  image: string;
  products: Product[];
}

const ProductsPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const isRtl = lang === 'ar';
  const location = useLocation();
  const scrollToCategoryId = location.state?.scrollToId;

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
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const offset = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const categories: Category[] = [
    {
      id: 1,
      name: 'Indoor Cameras',
      nameAr: 'كاميرات داخلية',
      icon: <Camera size={32} />,
      image: '/products/indoor-cameras.png',
      products: [
        {
          id: 101,
          name: 'HD Indoor Camera 1080p',
          nameAr: 'كاميرا داخلية عالية الدقة 1080p',
          description: 'High-definition indoor camera with night vision and motion detection',
          descriptionAr: 'كاميرا داخلية عالية الدقة مع رؤية ليلية وكشف الحركة',
          price: '299 SAR',
          image: '/products/indoor-cameras.png',
          features: ['1080p HD Resolution', 'Night Vision', 'Motion Detection', 'Two-way Audio', 'Mobile App'],
          featuresAr: ['دقة 1080p عالية الوضوح', 'رؤية ليلية', 'كشف الحركة', 'صوت ثنائي الاتجاه', 'تطبيق جوال']
        },
        {
          id: 102,
          name: '360° Indoor Camera',
          nameAr: 'كاميرا داخلية 360 درجة',
          description: 'Pan-tilt-zoom camera with 360° coverage',
          descriptionAr: 'كاميرا متحركة بتغطية 360 درجة',
          price: '449 SAR',
          image: '/products/indoor-cameras.png',
          features: ['360° Coverage', '2K Resolution', 'Smart Tracking', 'Cloud Storage', 'AI Detection'],
          featuresAr: ['تغطية 360 درجة', 'دقة 2K', 'تتبع ذكي', 'تخزين سحابي', 'كشف بالذكاء الاصطناعي']
        },
        {
          id: 103,
          name: 'Mini Indoor Camera',
          nameAr: 'كاميرا داخلية صغيرة',
          description: 'Compact camera perfect for small spaces',
          descriptionAr: 'كاميرا مدمجة مثالية للمساحات الصغيرة',
          price: '199 SAR',
          image: '/products/indoor-cameras.png',
          features: ['720p HD', 'Night Vision', 'Motion Alerts', 'Easy Setup', 'Affordable'],
          featuresAr: ['دقة 720p', 'رؤية ليلية', 'تنبيهات الحركة', 'سهل التركيب', 'سعر مناسب']
        }
      ]
    },
    {
      id: 2,
      name: 'Outdoor Cameras',
      nameAr: 'كاميرات خارجية',
      icon: <CameraIcon size={32} />,
      image: '/products/outdoor-cameras.png',
      products: [
        {
          id: 201,
          name: 'Weatherproof 4K Camera',
          nameAr: 'كاميرا خارجية 4K مقاومة للطقس',
          description: 'Premium outdoor camera with 4K resolution and weather resistance',
          descriptionAr: 'كاميرا خارجية فاخرة بدقة 4K ومقاومة للعوامل الجوية',
          price: '699 SAR',
          image: '/products/outdoor-cameras.png',
          features: ['4K Ultra HD', 'IP67 Waterproof', 'Color Night Vision', 'Smart Alerts', 'Wide Angle'],
          featuresAr: ['دقة 4K فائقة', 'مقاومة للماء IP67', 'رؤية ليلية ملونة', 'تنبيهات ذكية', 'زاوية واسعة']
        },
        {
          id: 202,
          name: 'Solar Powered Camera',
          nameAr: 'كاميرا بالطاقة الشمسية',
          description: 'Eco-friendly solar powered outdoor camera',
          descriptionAr: 'كاميرا خارجية صديقة للبيئة بالطاقة الشمسية',
          price: '849 SAR',
          image: '/products/outdoor-cameras.png',
          features: ['Solar Panel', '1080p HD', 'No Wiring', 'Long Battery Life', 'Weather Resistant'],
          featuresAr: ['لوح شمسي', 'دقة 1080p', 'بدون أسلاك', 'بطارية طويلة الأمد', 'مقاومة للطقس']
        },
        {
          id: 203,
          name: 'PTZ Outdoor Camera',
          nameAr: 'كاميرا خارجية متحركة PTZ',
          description: 'Pan-tilt-zoom outdoor surveillance camera',
          descriptionAr: 'كاميرا مراقبة خارجية قابلة للتحريك والتقريب',
          price: '999 SAR',
          image: '/products/outdoor-cameras.png',
          features: ['360° Rotation', '5X Optical Zoom', 'Auto Tracking', '2K Resolution', 'Weatherproof'],
          featuresAr: ['دوران 360 درجة', 'تقريب بصري 5X', 'تتبع تلقائي', 'دقة 2K', 'مقاومة للعوامل الجوية']
        }
      ]
    },
    {
      id: 3,
      name: 'Smart Sensors',
      nameAr: 'مستشعرات ذكية',
      icon: <Radio size={32} />,
      image: '/products/smart-sensors.png',
      products: [
        {
          id: 301,
          name: 'Motion Sensor Pro',
          nameAr: 'مستشعر حركة احترافي',
          description: 'Advanced PIR motion sensor with smart detection',
          descriptionAr: 'مستشعر حركة متقدم مع كشف ذكي',
          price: '149 SAR',
          image: '/products/smart-sensors.png',
          features: ['PIR Technology', 'Adjustable Sensitivity', 'Wide Coverage', 'Battery Powered', 'Instant Alerts'],
          featuresAr: ['تقنية PIR', 'حساسية قابلة للتعديل', 'تغطية واسعة', 'يعمل بالبطارية', 'تنبيهات فورية']
        },
        {
          id: 302,
          name: 'Door/Window Sensor',
          nameAr: 'مستشعر الأبواب والنوافذ',
          description: 'Magnetic sensor for doors and windows',
          descriptionAr: 'مستشعر مغناطيسي للأبواب والنوافذ',
          price: '99 SAR',
          image: '/products/smart-sensors.png',
          features: ['Magnetic Contact', 'Wireless', 'Low Battery Alert', 'Easy Install', 'Compact Design'],
          featuresAr: ['اتصال مغناطيسي', 'لاسلكي', 'تنبيه البطارية المنخفضة', 'سهل التركيب', 'تصميم مدمج']
        },
        {
          id: 303,
          name: 'Smoke & Fire Detector',
          nameAr: 'كاشف الدخان والحريق',
          description: 'Smart smoke and fire detection system',
          descriptionAr: 'نظام ذكي لكشف الدخان والحريق',
          price: '199 SAR',
          image: '/products/smart-sensors.png',
          features: ['Photoelectric Sensor', 'Loud Alarm', 'Self-Test', 'Mobile Alerts', '10-Year Battery'],
          featuresAr: ['مستشعر ضوئي', 'إنذار عالي', 'اختبار ذاتي', 'تنبيهات الجوال', 'بطارية 10 سنوات']
        },
        {
          id: 304,
          name: 'Water Leak Sensor',
          nameAr: 'مستشعر تسرب المياه',
          description: 'Prevent water damage with instant detection',
          descriptionAr: 'منع أضرار المياه مع الكشف الفوري',
          price: '129 SAR',
          image: '/products/smart-sensors.png',
          features: ['Water Detection', 'Loud Siren', 'Mobile Alerts', 'Battery Powered', 'Compact'],
          featuresAr: ['كشف المياه', 'صفارة عالية', 'تنبيهات الجوال', 'يعمل بالبطارية', 'صغير الحجم']
        }
      ]
    },
    {
      id: 4,
      name: 'Smart Access Control',
      nameAr: 'الدخول الذكي',
      icon: <Lock size={32} />,
      image: '/products/smart-access.png',
      products: [
        {
          id: 401,
          name: 'Fingerprint Smart Lock',
          nameAr: 'قفل ذكي ببصمة الإصبع',
          description: 'Advanced biometric door lock with fingerprint access',
          descriptionAr: 'قفل باب بيومتري متقدم بالبصمة',
          price: '899 SAR',
          image: '/products/smart-access.png',
          features: ['Fingerprint Recognition', 'PIN Code', 'RFID Card', 'Mobile App', 'Auto Lock'],
          featuresAr: ['التعرف على البصمة', 'رمز PIN', 'بطاقة RFID', 'تطبيق جوال', 'قفل تلقائي']
        },
        {
          id: 402,
          name: 'Smart Deadbolt Lock',
          nameAr: 'قفل ذكي محكم',
          description: 'Keyless entry with multiple access methods',
          descriptionAr: 'دخول بدون مفتاح مع طرق وصول متعددة',
          price: '749 SAR',
          image: '/products/smart-access.png',
          features: ['Keyless Entry', 'Bluetooth', 'PIN Codes', 'Remote Access', 'Battery Backup'],
          featuresAr: ['دخول بدون مفتاح', 'بلوتوث', 'رموز PIN', 'وصول عن بعد', 'بطارية احتياطية']
        },
        {
          id: 403,
          name: 'Video Doorbell Pro',
          nameAr: 'جرس الباب الذكي احترافي',
          description: 'Smart doorbell with HD video and two-way audio',
          descriptionAr: 'جرس باب ذكي مع فيديو HD وصوت ثنائي',
          price: '599 SAR',
          image: '/products/smart-access.png',
          features: ['1080p Video', 'Two-way Talk', 'Motion Detection', 'Night Vision', 'Cloud Storage'],
          featuresAr: ['فيديو 1080p', 'محادثة ثنائية', 'كشف الحركة', 'رؤية ليلية', 'تخزين سحابي']
        },
        {
          id: 404,
          name: 'Keypad Door Lock',
          nameAr: 'قفل باب بلوحة مفاتيح',
          description: 'Simple and secure keypad entry system',
          descriptionAr: 'نظام دخول بسيط وآمن بلوحة المفاتيح',
          price: '499 SAR',
          image: '/products/smart-access.png',
          features: ['PIN Entry', 'Multiple Codes', 'Auto Lock', 'Low Battery Alert', 'Easy Install'],
          featuresAr: ['إدخال PIN', 'رموز متعددة', 'قفل تلقائي', 'تنبيه بطارية منخفضة', 'تركيب سهل']
        }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 pb-20 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20 pt-32 -mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fadeIn">
            {isRtl ? 'منتجاتنا' : 'Our Products'}
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            {isRtl ? 'اكتشف مجموعتنا الكاملة من المنتجات الذكية' : 'Discover our complete range of smart products'}
          </p>
        </div>
      </div>

      <div className="py-12">
        {/* Categories with Full Width Display */}
        {categories.map((category, index) => (
          <section
            key={category.id}
            id={`category-${category.id}`}
            className={`mb-20 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
          >
            {/* Category Header with Image */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={category.image}
                alt={isRtl ? category.nameAr : category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>

              {/* Category Title Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white animate-fadeIn">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6 animate-scaleIn">
                    {category.icon}
                  </div>
                  <h2 className="text-5xl font-extrabold mb-4 tracking-tight">
                    {isRtl ? category.nameAr : category.name}
                  </h2>
                  <p className="text-xl text-blue-200">
                    {category.products.length} {isRtl ? 'منتج متاح' : 'products available'}
                  </p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products.map((product, prodIndex) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 overflow-hidden animate-slideUp"
                    style={{ animationDelay: `${prodIndex * 0.1}s` }}
                  >
                    {/* Product Image */}
                    <div className="aspect-square overflow-hidden bg-slate-100">
                      <img
                        src={product.image}
                        alt={isRtl ? product.nameAr : product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {isRtl ? product.nameAr : product.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                        {isRtl ? product.descriptionAr : product.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {(isRtl ? product.featuresAr : product.features).slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="text-2xl font-extrabold text-blue-600">
                          {product.price}
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-all hover:shadow-lg">
                          {isRtl ? 'اطلب الآن' : 'Order Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

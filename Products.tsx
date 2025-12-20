import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './src/firebase';

type Language = 'en' | 'ar';

interface Product {
  id: string;
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
  id: string;
  displayId?: number;
  name: string;
  nameAr: string;
  iconName?: string;
  icon?: React.ReactNode;
  image: string;
  products: Product[];
}

const ProductsPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const isRtl = lang === 'ar';
  const location = useLocation();
  const navigate = useNavigate();
  const scrollToCategoryId = location.state?.scrollToId;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const cats: any[] = [];
        querySnapshot.forEach((doc) => {
          cats.push({ id: doc.id, ...doc.data() });
        });
        // Sort by displayId if available, or name
        cats.sort((a, b) => (a.displayId || 0) - (b.displayId || 0));

        // Map icon strings to actual components
        const mappedCats = cats.map(cat => {
          const IconComponent = cat.iconName && (Icons as any)[cat.iconName]
            ? (Icons as any)[cat.iconName]
            : Icons.Box;
          return {
            ...cat,
            icon: React.createElement(IconComponent, { size: 32 })
          };
        });

        setCategories(mappedCats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Scroll logic
  useEffect(() => {
    if (scrollToCategoryId) {
      setTimeout(() => {
        scrollToCategory(scrollToCategoryId);
      }, 500); // Increased timeout to ensure rendering
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [scrollToCategoryId, loading]); // Added loading dependency



  // Let me just look at line 35. 
  // Line 35: const location = useLocation();
  // I will add navigate there.

  // And then I will add the handleOrder function.

  const scrollToCategory = (categoryId: string) => { // ID is string now
    // Actually our passed ID might be number from Services page, but we store string/number in DB
    // We'll try to find by string match
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="animate-spin text-brand-primary">
          <Icons.Loader2 size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-bg pb-20 pt-20">
      {/* Header */}
      <div className="bg-brand-text text-white py-20 pt-32 -mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary/10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fadeIn">
            {isRtl ? 'منتجاتنا' : 'Our Products'}
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            {isRtl ? 'اكتشف مجموعتنا الكاملة من المنتجات الذكية' : 'Discover our complete range of smart products'}
          </p>
        </div>
      </div>

      <div className="py-12">
        {categories.length === 0 && (
          <div className="text-center text-brand-muted py-12">No products found.</div>
        )}

        {categories.map((category, index) => (
          <section
            key={category.id} // use Firestore ID
            id={`category-${category.displayId || category.id}`} // Try to match what Services page sends (displayId)
            className={`mb-20 ${index % 2 === 0 ? 'bg-brand-bg' : 'bg-brand-bg relative'}`}
          >
            {/* Category Header */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={category.image}
                alt={isRtl ? category.nameAr : category.name}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/1200x400?text=Category+Image' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white animate-fadeIn">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary rounded-2xl mb-6 animate-scaleIn">
                    {category.icon}
                  </div>
                  <h2 className="text-5xl font-extrabold mb-4 tracking-tight">
                    {isRtl ? category.nameAr : category.name}
                  </h2>
                  <p className="text-xl text-brand-card">
                    {category.products?.length || 0} {isRtl ? 'منتج متاح' : 'products available'}
                  </p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products && category.products.map((product, prodIndex) => (
                  <div
                    key={product.id}
                    className="group bg-brand-card rounded-2xl border-2 border-brand-primary/20 hover:border-brand-primary hover:shadow-2xl transition-all duration-300 overflow-hidden animate-slideUp"
                    style={{ animationDelay: `${prodIndex * 0.1}s` }}
                  >
                    <div className="aspect-square overflow-hidden bg-white">
                      <img
                        src={product.image}
                        alt={isRtl ? product.nameAr : product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400?text=Product' }}
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-brand-text mb-2 group-hover:text-brand-primary transition-colors">
                        {isRtl ? product.nameAr : product.name}
                      </h3>
                      <p className="text-brand-text/80 text-sm mb-4 leading-relaxed line-clamp-3">
                        {isRtl ? product.descriptionAr : product.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {(isRtl ? product.featuresAr : product.features)?.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-brand-muted">
                            <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between pt-4 border-t border-brand-border/30">
                        <div className="text-2xl font-extrabold text-brand-primary">
                          {product.price}
                        </div>
                        <button
                          onClick={() => navigate('/contact', {
                            state: {
                              inquiryType: 'Product',
                              name: isRtl ? product.nameAr : product.name
                            }
                          })}
                          className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2 rounded-lg font-bold transition-all hover:shadow-lg inline-block cursor-pointer"
                        >
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

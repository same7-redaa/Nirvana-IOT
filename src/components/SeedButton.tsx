import React from 'react';
import { db } from '../firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';

const SeedButton: React.FC = () => {

    const seedData = async () => {
        if (!confirm("Start seeding?")) return;

        // Hardcoded Categories from original file
        const categories = [
            {
                id: 1,
                displayId: 1,
                name: 'Indoor Cameras',
                nameAr: 'كاميرات داخلية',
                iconName: 'Camera',
                image: '/products/indoor-cameras.png',
                products: [
                    {
                        id: '101',
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
                        id: '102',
                        name: '360° Indoor Camera',
                        nameAr: 'كاميرا داخلية 360 درجة',
                        description: 'Pan-tilt-zoom camera with 360° coverage',
                        descriptionAr: 'كاميرا متحركة بتغطية 360 درجة',
                        price: '449 SAR',
                        image: '/products/indoor-cameras.png',
                        features: ['360° Coverage', '2K Resolution', 'Smart Tracking', 'Cloud Storage', 'AI Detection'],
                        featuresAr: ['تغطية 360 درجة', 'دقة 2K', 'تتبع ذكي', 'تخزين سحابي', 'كشف بالذكاء الاصطناعي']
                    },
                ]
            },
            {
                id: 2,
                displayId: 2,
                name: 'Outdoor Cameras',
                nameAr: 'كاميرات خارجية',
                iconName: 'Camera',
                image: '/products/outdoor-cameras.png',
                products: [
                    {
                        id: '201',
                        name: 'Weatherproof 4K Camera',
                        nameAr: 'كاميرا خارجية 4K مقاومة للطقس',
                        description: 'Premium outdoor camera with 4K resolution and weather resistance',
                        descriptionAr: 'كاميرا خارجية فاخرة بدقة 4K ومقاومة للعوامل الجوية',
                        price: '699 SAR',
                        image: '/products/outdoor-cameras.png',
                        features: ['4K Ultra HD', 'IP67 Waterproof', 'Color Night Vision', 'Smart Alerts', 'Wide Angle'],
                        featuresAr: ['دقة 4K فائقة', 'مقاومة للماء IP67', 'رؤية ليلية ملونة', 'تنبيهات ذكية', 'زاوية واسعة']
                    }
                ]
            },
            {
                id: 3,
                displayId: 3,
                name: 'Smart Sensors',
                nameAr: 'مستشعرات ذكية',
                iconName: 'Radio',
                image: '/products/smart-sensors.png',
                products: []
            },
            {
                id: 4,
                displayId: 4,
                name: 'Smart Access Control',
                nameAr: 'الدخول الذكي',
                iconName: 'Lock',
                image: '/products/smart-access.png',
                products: []
            }
        ];

        const batch = writeBatch(db);

        categories.forEach((cat) => {
            const docRef = doc(collection(db, 'categories')); // Auto ID
            batch.set(docRef, {
                displayId: cat.displayId,
                name: cat.name,
                nameAr: cat.nameAr,
                iconName: cat.iconName,
                image: cat.image,
                products: cat.products
            });
        });

        await batch.commit();
        alert("Seeding complete!");
    };

    return (
        <button onClick={seedData} className="fixed bottom-4 left-4 bg-gray-800 text-white text-xs p-2 rounded opacity-50 hover:opacity-100">
            Seed DB
        </button>
    );
};

export default SeedButton;

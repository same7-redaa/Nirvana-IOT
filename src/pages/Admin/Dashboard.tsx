import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, writeBatch, setDoc, getDoc } from 'firebase/firestore';
import { Plus, Trash2, Edit2, X, Image as ImageIcon, Loader, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

// Matching Services.tsx IDs
const SERVICE_LIST = [
    { id: 1, name: 'Smart Home Solutions', nameAr: 'حلول المنازل الذكية' },
    { id: 2, name: 'Smart Office Solutions', nameAr: 'حلول المكاتب الذكية' },
    { id: 3, name: 'Smart Factory Solutions', nameAr: 'حلول المصانع الذكية' },
    { id: 4, name: 'Security & Surveillance', nameAr: 'أنظمة الأمن والمراقبة' },
    { id: 5, name: 'Networks & Infrastructure', nameAr: 'الشبكات والأنظمة' },
    { id: 6, name: 'Building Management (BMS)', nameAr: 'نظام إدارة المباني' },
    { id: 7, name: 'Business & Accounting', nameAr: 'الأنظمة المحاسبية' },
];

interface Product {
    id?: string;
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
    price: string;
    image: string;

    // link removed
    features: string[];
    featuresAr: string[];
}

interface Category {
    id: string; // Firestore ID
    displayId: number; // For ordering
    name: string;
    nameAr: string;
    image: string;
    products: Product[];
    iconName?: string; // We'll store icon name instead of component for DB
}

const Dashboard: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editingProduct, setEditingProduct] = useState<{ catId: string, product: Product } | null>(null);
    const [isAddingProduct, setIsAddingProduct] = useState<string | null>(null); // Category ID

    // Service Linking State
    const [selectedServiceId, setSelectedServiceId] = useState<string>('');
    const [linkedProductIds, setLinkedProductIds] = useState<string[]>([]);

    const navigate = useNavigate();

    // Initial Seed Data (from existing Products.tsx) - Simplified for brevity
    // This function can be called manually to populate DB first time
    const seedDatabase = async () => {
        if (!confirm("This will overwrite/duplicate data in Firestore. Continue?")) return;
        const batch = writeBatch(db);

        // Example seed logic - meaningful implementation requires mapping existing hardcoded data
        // For now, let's just fetch existing.
    };

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'categories'));
            const cats: Category[] = [];
            querySnapshot.forEach((doc) => {
                cats.push({ id: doc.id, ...doc.data() } as Category);
            });
            // Sort by displayId
            cats.sort((a, b) => a.displayId - b.displayId);
            setCategories(cats);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleLogout = () => {
        signOut(getAuth()).then(() => navigate('/admin/login'));
    };

    // --- Category Handlers ---

    const handleSaveCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;

        try {
            if (editingCategory.id) {
                // Update
                const catRef = doc(db, 'categories', editingCategory.id);
                await updateDoc(catRef, {
                    name: editingCategory.name,
                    nameAr: editingCategory.nameAr,
                    image: editingCategory.image
                });
            } else {
                // Create New
                await addDoc(collection(db, 'categories'), {
                    name: editingCategory.name,
                    nameAr: editingCategory.nameAr,
                    image: editingCategory.image,
                    displayId: editingCategory.displayId,
                    products: [],
                    iconName: 'Box' // Default icon
                });
            }
            setEditingCategory(null);
            fetchCategories();
        } catch (error) {
            console.error("Error saving category: ", error);
        }
    };

    const handleDeleteProduct = async (categoryId: string, product: Product) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            // We need to find the category, remove the product from the array, and update
            const category = categories.find(c => c.id === categoryId);
            if (!category) return;

            const updatedProducts = category.products.filter(p => p.id !== product.id);

            const catRef = doc(db, 'categories', categoryId);
            await updateDoc(catRef, { products: updatedProducts });
            fetchCategories();
        } catch (error) {
            console.error("Error deleting product: ", error);
        }
    };

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const targetProduct = editingProduct?.product;
        const catId = editingProduct?.catId || isAddingProduct;

        if (!targetProduct || !catId) return;

        try {
            const category = categories.find(c => c.id === catId);
            if (!category) return;

            let updatedProducts = [...(category.products || [])];

            if (targetProduct.id) {
                // Update existing product
                updatedProducts = updatedProducts.map(p => p.id === targetProduct.id ? targetProduct : p);
            } else {
                // Add new product
                const newProd = { ...targetProduct, id: Date.now().toString() };
                updatedProducts.push(newProd);
            }

            const catRef = doc(db, 'categories', catId);
            await updateDoc(catRef, { products: updatedProducts });

            setEditingProduct(null);
            setIsAddingProduct(null);
            fetchCategories();
        } catch (error) {
            console.error("Error saving product: ", error);
        }
    };

    return (
        <div className="min-h-screen bg-brand-bg/50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-brand-text">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                        Logout
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12"><Loader className="animate-spin text-brand-primary" size={48} /></div>
                ) : (
                    <div className="space-y-12">

                        {/* Add Category Button */}
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => {
                                    const newCat: Category = {
                                        id: '',
                                        displayId: categories.length > 0 ? Math.max(...categories.map(c => c.displayId)) + 1 : 1,
                                        name: '',
                                        nameAr: '',
                                        image: '',
                                        products: []
                                    };
                                    setEditingCategory(newCat);
                                }}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2"
                            >
                                <Plus size={20} />
                                Add Category
                            </button>
                        </div>

                        {/* Categories List */}
                        {categories.map((category) => (
                            <div key={category.id} className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
                                <div className="p-6 border-b border-brand-border flex justify-between items-start bg-brand-bg/50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-lg border border-brand-border bg-brand-bg overflow-hidden">
                                            {category.image ? (
                                                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400"><ImageIcon size={24} /></div>
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-brand-text">{category.name || 'New Category'} <span className="text-slate-400">/</span> {category.nameAr}</h2>
                                            <p className="text-sm text-slate-500">{category.products?.length || 0} Products</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingCategory(category)}
                                            className="p-2 text-brand-primary hover:bg-blue-50 rounded-lg"
                                            title="Edit Category"
                                        >
                                            <Edit2 size={20} />
                                        </button>
                                        <button
                                            onClick={async () => {
                                                if (!confirm("Delete this category and all its products?")) return;
                                                try {
                                                    await deleteDoc(doc(db, 'categories', category.id));
                                                    fetchCategories();
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                            }}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            title="Delete Category"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Products Grid */}
                                <div className="p-6">
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {category.products?.map(product => (
                                            <div key={product.id} className="border border-brand-border rounded-lg p-4 relative group hover:border-blue-300 transition-colors">
                                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => setEditingProduct({ catId: category.id, product })}
                                                        className="p-1.5 bg-blue-100 text-brand-primary rounded"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProduct(category.id, product)}
                                                        className="p-1.5 bg-red-100 text-red-600 rounded"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>

                                                <div className="flex gap-4">
                                                    <img src={product.image} className="w-20 h-20 object-cover rounded bg-brand-bg" />
                                                    <div>
                                                        <h3 className="font-bold text-brand-text text-sm line-clamp-1">{product.name}</h3>
                                                        <h3 className="text-slate-600 text-xs mb-1 line-clamp-1">{product.nameAr}</h3>
                                                        <div className="text-brand-primary font-bold text-sm">{product.price}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add Product Button */}
                                        <button
                                            onClick={() => {
                                                const emptyProduct: Product = {
                                                    id: '', name: '', nameAr: '', description: '', descriptionAr: '',
                                                    price: '', image: '', features: [], featuresAr: []
                                                };
                                                setEditingProduct({ catId: category.id, product: emptyProduct });
                                            }}
                                            className="border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center p-6 text-slate-400 hover:border-blue-400 hover:text-brand-primary cursor-pointer transition-colors h-32"
                                        >
                                            <Plus size={24} />
                                            <span className="text-sm font-medium mt-2">Add Product</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Category Edit/Create Modal */}
                {editingCategory && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-brand-card w-full max-w-lg rounded-xl shadow-2xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-brand-text">{editingCategory.id ? 'Edit Category' : 'New Category'}</h3>
                                <button onClick={() => setEditingCategory(null)} className="text-slate-400 hover:text-slate-600"><X /></button>
                            </div>
                            <form onSubmit={handleSaveCategory} className="space-y-4">
                                <input
                                    value={editingCategory.name}
                                    onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                    className="w-full p-3 rounded border text-sm" placeholder="Name (EN)" required
                                />
                                <input
                                    value={editingCategory.nameAr}
                                    onChange={e => setEditingCategory({ ...editingCategory, nameAr: e.target.value })}
                                    className="w-full p-3 rounded border text-sm text-right" placeholder="الاسم (عربي)" required
                                />
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Image URL</label>
                                    <input
                                        value={editingCategory.image}
                                        onChange={e => setEditingCategory({ ...editingCategory, image: e.target.value })}
                                        className="w-full p-3 rounded border text-sm" placeholder="Image URL" required
                                    />
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <button type="button" onClick={() => setEditingCategory(null)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 font-bold">Save Category</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Edit/Add Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-brand-card w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8">
                        <div className="p-6 border-b border-brand-border flex justify-between items-center bg-brand-bg/50">
                            <h3 className="text-xl font-bold text-brand-text">{editingProduct.product.id ? 'Edit Product' : 'Add New Product'}</h3>
                            <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-600"><X /></button>
                        </div>

                        <form onSubmit={handleSaveProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Name (English)</label>
                                    <input
                                        className="w-full p-2 border rounded"
                                        value={editingProduct.product.name}
                                        onChange={e => setEditingProduct({ ...editingProduct, product: { ...editingProduct.product, name: e.target.value } })}
                                        required
                                    />
                                </div>
                                <div className="text-right">
                                    <label className="block text-xs font-bold text-slate-500 mb-1">الاسم (عربي)</label>
                                    <input
                                        className="w-full p-2 border rounded text-right"
                                        value={editingProduct.product.nameAr}
                                        onChange={e => setEditingProduct({ ...editingProduct, product: { ...editingProduct.product, nameAr: e.target.value } })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Price</label>
                                    <input
                                        className="w-full p-2 border rounded"
                                        value={editingProduct.product.price}
                                        onChange={e => setEditingProduct({ ...editingProduct, product: { ...editingProduct.product, price: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Image URL</label>
                                    <input
                                        className="w-full p-2 border rounded font-mono text-xs"
                                        value={editingProduct.product.image}
                                        onChange={e => setEditingProduct({ ...editingProduct, product: { ...editingProduct.product, image: e.target.value } })}
                                        required
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Paste an image URL. In a future update, we can enable file uploads.</p>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Description (En)</label>
                                    <textarea
                                        className="w-full p-2 border rounded text-sm h-24"
                                        value={editingProduct.product.description}
                                        onChange={e => setEditingProduct({ ...editingProduct, product: { ...editingProduct.product, description: e.target.value } })}
                                    />
                                </div>
                                <div className="text-right">
                                    <label className="block text-xs font-bold text-slate-500 mb-1">الوصف (عربي)</label>
                                    <textarea
                                        className="w-full p-2 border rounded text-sm h-24 text-right"
                                        value={editingProduct.product.descriptionAr}
                                        onChange={e => setEditingProduct({ ...editingProduct, product: { ...editingProduct.product, descriptionAr: e.target.value } })}
                                    />
                                </div>
                            </div>

                            {/* Features Input */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Features (En) - One per line</label>
                                    <textarea
                                        className="w-full p-2 border rounded text-sm h-24"
                                        value={editingProduct.product.features?.join('\n') || ''}
                                        onChange={e => setEditingProduct({
                                            ...editingProduct,
                                            product: { ...editingProduct.product, features: e.target.value.split('\n') }
                                        })}
                                        placeholder="Feature 1\nFeature 2"
                                    />
                                </div>
                                <div className="text-right">
                                    <label className="block text-xs font-bold text-slate-500 mb-1">المميزات (عربي) - ميزة في كل سطر</label>
                                    <textarea
                                        className="w-full p-2 border rounded text-sm h-24 text-right"
                                        value={editingProduct.product.featuresAr?.join('\n') || ''}
                                        onChange={e => setEditingProduct({
                                            ...editingProduct,
                                            product: { ...editingProduct.product, featuresAr: e.target.value.split('\n') }
                                        })}
                                        placeholder="ميزة 1\nميزة 2"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-brand-border flex justify-end gap-3">
                                <button type="button" onClick={() => setEditingProduct(null)} className="px-6 py-2 text-slate-600 font-medium hover:bg-brand-bg rounded-lg">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/30">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Service Product Linking Section */}
            <div className="mt-12 bg-brand-card rounded-xl shadow-sm border border-brand-border p-8">
                <h2 className="text-2xl font-bold text-brand-text mb-6 border-b pb-4">Link Products to Services</h2>
                {/* ... existing linking code ... */}
                <div className="flex gap-4 mb-6">
                    <select
                        className="p-3 border rounded-lg w-full md:w-1/3"
                        onChange={async (e) => {
                            const sId = e.target.value;
                            setSelectedServiceId(sId);
                            if (sId) {
                                try {
                                    const docRef = doc(db, 'service_products', `service_${sId}`);
                                    const snap = await getDoc(docRef);
                                    if (snap.exists()) {
                                        setLinkedProductIds(snap.data().productIds || []);
                                    } else {
                                        setLinkedProductIds([]);
                                    }
                                } catch (err) {
                                    console.error(err);
                                }
                            }
                        }}
                    >
                        <option value="">Select a Service...</option>
                        {SERVICE_LIST.map(s => (
                            <option key={s.id} value={s.id}>{s.name} / {s.nameAr}</option>
                        ))}
                    </select>

                    {selectedServiceId && (
                        <button
                            onClick={async () => {
                                try {
                                    await setDoc(doc(db, 'service_products', `service_${selectedServiceId}`), {
                                        productIds: linkedProductIds
                                    });
                                    alert('Saved successfully!');
                                } catch (err) {
                                    console.error(err);
                                    alert('Error saving');
                                }
                            }}
                            className="bg-brand-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-primary/90 flex items-center gap-2"
                        >
                            <Save size={20} /> Save Changes
                        </button>
                    )}
                </div>

                {selectedServiceId && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto p-4 bg-brand-bg/50 rounded-lg">
                        {categories.flatMap(c => c.products || []).map(product => (
                            <label key={product.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${linkedProductIds.includes(product.id || '') ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-brand-card border-brand-border hover:border-blue-300'}`}>
                                <input
                                    type="checkbox"
                                    className="mt-1 w-4 h-4 text-brand-primary"
                                    checked={linkedProductIds.includes(product.id || '')}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setLinkedProductIds(prev => [...prev, product.id || '']);
                                        } else {
                                            setLinkedProductIds(prev => prev.filter(id => id !== product.id));
                                        }
                                    }}
                                />
                                <div className="flex gap-2 w-full overflow-hidden">
                                    <img src={product.image} className="w-10 h-10 object-cover rounded bg-slate-200" />
                                    <div className="min-w-0">
                                        <div className="text-sm font-bold text-brand-text truncate">{product.name}</div>
                                        <div className="text-xs text-slate-500 truncate">{product.nameAr}</div>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Featured Categories Section */}
            <FeaturedCategoriesManager categories={categories} />
        </div>
    );
};

// Sub-component for Featured Categories
const FeaturedCategoriesManager: React.FC<{ categories: Category[] }> = ({ categories }) => {
    const [featuredIds, setFeaturedIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, 'settings', 'featured_categories');
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    setFeaturedIds(snap.data().categoryIds || []);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            await setDoc(doc(db, 'settings', 'featured_categories'), {
                categoryIds: featuredIds
            });
            alert('Updated featured categories on Homepage!');
        } catch (err) {
            console.error(err);
            alert('Error saving settings');
        }
        setLoading(false);
    };

    return (
        <div className="mt-12 bg-category-card rounded-xl shadow-sm border border-brand-border p-8 mb-20">
            <h2 className="text-2xl font-bold text-brand-text mb-2">Homepage Featured Categories</h2>
            <p className="text-slate-500 mb-6">Select which product categories appear in the "Our Products" section on the Homepage.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {categories.map(cat => (
                    <label key={cat.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${featuredIds.includes(cat.id) ? 'bg-green-50 border-green-500 shadow-md transform scale-105' : 'bg-brand-card border-brand-border hover:border-green-300'}`}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${featuredIds.includes(cat.id) ? 'border-green-500 bg-green-500 text-white' : 'border-slate-300'}`}>
                            {featuredIds.includes(cat.id) && <Plus size={14} className="rotate-45" />}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={featuredIds.includes(cat.id)}
                            onChange={e => {
                                if (e.target.checked) setFeaturedIds([...featuredIds, cat.id]);
                                else setFeaturedIds(featuredIds.filter(id => id !== cat.id));
                            }}
                        />
                        <div className="flex items-center gap-3">
                            <img src={cat.image} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                            <div>
                                <div className="font-bold text-brand-text">{cat.name}</div>
                                <div className="text-xs text-slate-500">{cat.nameAr}</div>
                            </div>
                        </div>
                    </label>
                ))}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-primary/90 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                    {loading ? <Loader className="animate-spin" /> : <Save size={20} />}
                    Save Homepage Settings
                </button>
            </div>
        </div>
    );
};


export default Dashboard;

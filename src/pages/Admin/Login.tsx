import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import SeedButton from '../../components/SeedButton';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Failed to log in. Please checks your credentials.');
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
            <div className="bg-brand-card p-8 rounded-2xl shadow-xl w-full max-w-md border border-brand-primary/10">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mb-4">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-brand-text">Admin Login</h2>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-2">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all bg-white/50 text-brand-text placeholder-brand-muted"
                            placeholder="admin@nirvana.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all bg-white/50 text-brand-text placeholder-brand-muted"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-3 rounded-lg font-bold shadow-lg shadow-brand-primary/30 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
            <SeedButton />
        </div>
    );
};

export default Login;

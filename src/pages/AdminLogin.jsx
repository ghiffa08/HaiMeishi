import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { LogIn, Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
    const { loginAdmin } = usePortfolio();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await loginAdmin(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials or unauthorized.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-5 bg-washi relative">
            <div className="w-full max-w-[400px] relative z-10">
                <div className="text-center mb-10 animate-fade-up">
                    <div className="font-mincho text-2xl tracking-[0.2em] text-ink">
                        管理画面
                    </div>
                    <div className="font-mono text-[10px] text-ink-faded mt-2 uppercase tracking-wide">
                        Admin Authentication
                    </div>
                </div>

                <form 
                    onSubmit={handleSubmit} 
                    className="animate-fade-up bg-white/30 p-8 border border-washi-border shadow-sm" 
                    style={{ animationDelay: '0.2s' }}
                >
                    {error && (
                        <div className="font-mono text-accent-error text-[11px] mb-5 text-center bg-accent-error/5 py-2">
                            {error}
                        </div>
                    )}

                    <div className="mb-5">
                        <label className="font-mono text-[10px] block mb-2 text-ink-faded uppercase">Email Address</label>
                        <div className="relative">
                            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faded" />
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3 py-3 bg-washi-border/20 border border-washi-border text-sm font-mono focus:outline-none focus:border-ink/30 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="font-mono text-[10px] block mb-2 text-ink-faded uppercase">Password</label>
                        <div className="relative">
                            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faded" />
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-3 py-3 bg-washi-border/20 border border-washi-border text-sm font-mono focus:outline-none focus:border-ink/30 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3.5 bg-ink text-washi font-mono text-xs flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : (
                            <>
                                <LogIn size={16} /> Enter Dashboard
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center mt-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                    <button 
                        onClick={() => navigate('/')} 
                        className="font-mono text-[10px] text-ink-faded underline hover:text-ink transition-colors"
                    >
                        Back to Portfolio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

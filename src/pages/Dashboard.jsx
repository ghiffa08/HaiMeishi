import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import CMSForm from '../components/organisms/CMSForm';
import { 
    User, 
    Briefcase, 
    Award, 
    Layers, 
    LogOut, 
    Eye,
    LayoutDashboard,
    Image as ImageIcon
} from 'lucide-react';

const Dashboard = () => {
    const { portfolio, logoutAdmin } = usePortfolio();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    if (!portfolio) return (
        <div className="min-h-screen bg-washi flex items-center justify-center font-mono text-xs text-ink-faded animate-pulse">
            Loading configuration...
        </div>
    );

    const tabs = [
        { id: 'profile', label: 'Identity', icon: User },
        { id: 'branding', label: 'Branding', icon: ImageIcon },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'education', label: 'Education', icon: LayoutDashboard },
        { id: 'awards', label: 'Awards', icon: Award },
        { id: 'works', label: 'Works Archives', icon: Layers },
    ];

    const handleLogout = async () => {
        await logoutAdmin();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-washi flex font-mono">
            {/* Sidebar */}
            <aside className="w-[260px] border-r border-washi-border py-8 flex flex-col shrink-0">
                <div className="px-8 mb-12">
                    <div className="font-mincho text-lg text-accent-red tracking-wider">CMS Panel</div>
                    <div className="text-[9px] text-ink-faded uppercase tracking-widest mt-1">Portfolio v1.0</div>
                </div>

                <nav className="flex-1">
                    {tabs.map((tab) => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-8 py-4 text-left transition-all duration-200 border-l-4 ${
                                activeTab === tab.id 
                                    ? 'bg-accent-red/5 text-accent-red border-accent-red' 
                                    : 'text-ink border-transparent hover:bg-ink/5'
                            }`}
                        >
                            <tab.icon size={18} />
                            <span className="text-[12px] uppercase tracking-wide">{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-8 space-y-3 border-t border-washi-border pt-8">
                    <button 
                        onClick={() => navigate('/')} 
                        className="w-full flex items-center justify-center gap-2 py-3 bg-white/50 border border-washi-border text-[11px] text-ink hover:bg-white transition-colors"
                    >
                        <Eye size={14} /> View Site
                    </button>
                    <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center justify-center gap-2 py-3 text-[11px] text-accent-error hover:bg-accent-error/5 transition-colors"
                    >
                        <LogOut size={14} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-16 overflow-y-auto max-h-screen">
                <div className="max-w-[800px] mx-auto animate-fade-in">
                    <CMSForm 
                        key={activeTab} // Reset form when tab changes
                        section={activeTab} 
                        initialData={portfolio[activeTab]} 
                    />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

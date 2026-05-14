import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import LanguageSwitcher from '../molecules/LanguageSwitcher';
import Hero from '../organisms/Hero';
import AboutSection from '../organisms/AboutSection';
import ExperienceSection from '../organisms/ExperienceSection';
import WorksSection from '../organisms/WorksSection';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowLeft } from 'lucide-react';

const MainPortfolioTemplate = ({ onBackToBio, onWorkSelect }) => {
    const { lang, t } = usePortfolio();

    return (
        <div className="relative z-10 max-w-[680px] mx-auto px-5 sm:px-8 pb-24" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <nav className="flex justify-between items-center py-10 sm:py-16 mb-6 animate-fade-in">
                <button 
                    onClick={onBackToBio}
                    className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-wide uppercase text-ink-faded hover:text-ink transition-colors group"
                >
                    <ArrowLeft 
                        size={16} 
                        className={`transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} 
                    />
                    {t.navBack || "Back to Bio"}
                </button>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-ink-faded uppercase opacity-50 hidden sm:inline">
                        {t.navVol || "VOL. 01"}
                    </span>
                    <LanguageSwitcher />
                </div>
            </nav>

            <Header />
            <Hero />
            <AboutSection />
            <ExperienceSection />
            <WorksSection onWorkSelect={onWorkSelect} />
            <Footer />
        </div>
    );
};

export default MainPortfolioTemplate;

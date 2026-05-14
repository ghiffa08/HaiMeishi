import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const Header = () => {
    const { t, portfolio } = usePortfolio();
    if (!portfolio) return null;

    return (
        <header className="flex justify-between items-start border-b border-washi-border pb-8 mb-12 sm:mb-20 animate-fade-up">
            <div className="flex gap-4 items-start">
                <div className="w-10 h-10 border border-ink flex items-center justify-center shrink-0 overflow-hidden bg-white/30">
                    {portfolio.branding?.logo ? (
                        <img src={portfolio.branding.logo} alt="Logo" className="w-full h-full object-contain p-1" />
                    ) : (
                        <span className="font-mincho text-xl font-bold text-ink">{portfolio.branding?.logoText || 'H'}</span>
                    )}
                </div>
                <div>
                    <div className="font-mincho text-[9px] tracking-[0.4em] text-ink-faded uppercase mb-1">
                        {t.portfolio || 'PORTOFOLIO'}
                    </div>
                    <div className="font-mincho text-[11px] tracking-jp-wide text-ink">
                        ポートフォリオ
                    </div>
                </div>
            </div>
            <div className="font-mono text-right">
                <div className="text-[10px] text-accent-red font-medium tracking-jp-wide">
                    {t.est}
                </div>
            </div>
        </header>
    );
};

export default Header;

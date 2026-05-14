import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const Hero = () => {
    const { t, portfolio } = usePortfolio();
    if (!portfolio) return null;

    const PROFILE = portfolio.profile;

    return (
        <section className="flex gap-6 sm:gap-10 mb-16 sm:mb-24 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-[1.5px] bg-ink/30 h-24 sm:h-[140px] mt-2 shrink-0" />
            <div className="flex-1">
                <h1 className="font-mincho text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-jp-normal leading-[1.1] mb-3 text-ink">
                    {PROFILE.nameEn}
                </h1>
                <p className="font-mincho text-base sm:text-xl text-ink-faded mb-6 opacity-60">
                    {PROFILE.nameKo}
                </p>
                <div className="flex flex-col gap-4">
                    <div className="font-mono text-[9px] sm:text-[10px] tracking-jp-wide uppercase text-ink-faded border-b border-washi-border pb-2 inline-block self-start">
                        {t.role}
                    </div>
                    <p className="font-serif text-[15px] sm:text-[17px] leading-relaxed text-[#4a443e] max-w-xl italic">
                        {t.tagline}
                    </p>
                </div>
            </div>
        </section>
    );
};


export default Hero;


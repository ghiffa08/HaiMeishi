import React from 'react';
import SectionTitle from '../atoms/SectionTitle';
import { usePortfolio } from '../../context/PortfolioContext';

const AboutSection = () => {
    const { t, portfolio } = usePortfolio();

    return (
        <section className="mb-10 sm:mb-20 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <SectionTitle title={t.secIntroTitle} jpTitle={t.secIntroJp} delay="0.3s" />
            
            <div className="pl-6 sm:pl-12 relative group mt-8">
                {/* The Japanese Bracket 「 */}
                <div className="absolute left-0 -top-2.5 font-mincho text-[32px] sm:text-[40px] text-washi-border pointer-events-none">
                    「
                </div>
                
                <div className="space-y-5">
                    <p className="text-base sm:text-[19px] leading-[1.8] text-[#3b3631] text-justify">
                        {portfolio?.profile?.bio1}
                    </p>
                    <p className="text-base sm:text-[19px] leading-[1.8] text-[#3b3631] text-justify">
                        {portfolio?.profile?.bio2}
                    </p>
                </div>

                <div className="text-[12px] sm:text-[13px] leading-[2.2] tracking-wider text-ink-faded/80 mt-8 border-t border-dashed border-washi-border pt-6 text-justify">
                    {portfolio?.profile?.bioJp}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;


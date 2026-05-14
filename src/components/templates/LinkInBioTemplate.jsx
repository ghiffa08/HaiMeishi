import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Share2, Briefcase, ChevronRight } from 'lucide-react';
import SocialLinks from '../molecules/SocialLinks';
import IconWrapper from '../atoms/IconWrapper';
import Skeleton from '../atoms/Skeleton';

const ThreeDCard = lazy(() => import('../organisms/ThreeDCard'));

const LinkInBioTemplate = ({ profile, links, onViewPortfolio, onShare }) => {
    return (
        <div className="min-h-screen flex flex-col items-center relative font-mono overflow-x-hidden">
            {/* Topbar */}
            <header className="w-full max-w-[560px] flex justify-between items-center px-6 pt-6 relative z-10">
                <div className="border-l-2 border-accent-red pl-3">
                    <h1 className="font-mincho text-lg font-bold text-ink">{profile.brand}</h1>
                    <p className="text-[8px] tracking-[0.3em] text-ink-faded uppercase">Digital Connect</p>
                </div>
                <button 
                    className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center transition-all hover:bg-ink/5 active:scale-90" 
                    onClick={onShare} 
                    aria-label="Share portfolio"
                >
                    <IconWrapper icon={Share2} size={16} className="text-ink" />
                </button>
            </header>

            <main className="w-full flex flex-col items-center">
                {/* 3D Card Stage */}
                <Suspense fallback={
                    <div className="w-full max-w-[560px] flex items-center justify-center py-8 px-4 relative z-10 shrink-0">
                        <Skeleton width="min(480px, calc(100vw - 32px))" height="250px" borderRadius="4px" />
                    </div>
                }>
                    <ThreeDCard profile={profile} />
                </Suspense>

                {/* Bio Links */}
                <section className="w-full max-w-[460px] px-5 pb-16 flex flex-col gap-3 relative z-10">
                    <button 
                        className="flex items-center gap-4 p-[18px_24px] bg-ink text-washi rounded-none min-h-[56px] transition-all hover:bg-ink-dark hover:shadow-xl group" 
                        onClick={onViewPortfolio} 
                        aria-label="View full portfolio"
                    >
                        <IconWrapper icon={Briefcase} size={18} className="opacity-100" />
                        <span className="text-[13px] font-medium">View Full Portfolio</span>
                        <IconWrapper icon={ChevronRight} size={16} className="ml-auto opacity-50 transition-transform group-hover:translate-x-1" />
                    </button>
                    <SocialLinks links={links} />
                </section>
            </main>
        </div>
    );
};

LinkInBioTemplate.propTypes = {
    profile: PropTypes.object.isRequired,
    links: PropTypes.array.isRequired,
    onViewPortfolio: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
};

export default LinkInBioTemplate;

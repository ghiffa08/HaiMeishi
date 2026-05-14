import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, Globe, Github } from 'lucide-react';
import IconWrapper from '../atoms/IconWrapper';
import { usePortfolio } from '../../context/PortfolioContext';

const WorkDetailTemplate = ({ work, onBack }) => {
    const { lang, t, portfolio } = usePortfolio();
    const PROFILE = portfolio?.profile || {};

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="relative z-10 max-w-[680px] mx-auto px-5 sm:px-8 pb-24" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <nav className="flex justify-between items-center py-10 sm:py-16 mb-6 animate-fade-in">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-wide uppercase text-ink-faded hover:text-ink transition-colors group"
                >
                    <ArrowLeft 
                        size={16} 
                        className={`transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} 
                    />
                    {t.navDetailBack || "Back"}
                </button>
                <span className="font-mono text-[10px] tracking-[0.3em] text-ink-faded uppercase opacity-50">
                    {t.detailSubtitle || "PROJECT DETAIL"}
                </span>
            </nav>

            <main className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <article>
                    <header className="text-center mb-12 border-b border-washi-border pb-12">
                        <h1 className="font-mincho text-[32px] leading-tight mb-4 text-ink">{work.title}</h1>
                        <div className="font-mincho text-sm tracking-[0.3em] text-ink-faded mb-8">{work.titleJp}</div>
                        <div className="flex justify-center flex-wrap gap-3">
                            <span className="font-mono text-[10px] tracking-jp-tight uppercase px-4 py-1.5 bg-ink text-washi">
                                {work.year}
                            </span>
                            <span className="font-mono text-[10px] tracking-jp-tight uppercase px-4 py-1.5 border border-dashed border-ink/30 text-ink">
                                {work.role}
                            </span>
                        </div>
                    </header>

                    <div className="text-[19px] leading-[1.8] text-[#3b3631] mb-10 text-justify">
                        <p>{work.fullDesc}</p>
                    </div>

                    <div className="font-mincho text-sm leading-[2.2] tracking-wider text-ink-faded p-8 bg-washi-border/15 border border-washi-border mb-12 text-justify">
                        <p>{work.fullDescJp}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-12 pb-8 border-b border-washi-border">
                        {work.tags?.map(tag => (
                            <span key={tag} className="font-mono text-[9px] tracking-jp-tight uppercase px-3 py-1 border border-washi-border text-[#6d635a]">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-6 justify-center mb-20 flex-wrap">
                        {work.link && work.link !== '#' && (
                            <a 
                                href={work.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-mono text-[11px] tracking-jp-normal uppercase no-underline text-ink border border-ink px-8 py-3.5 flex items-center gap-3 transition-all hover:bg-ink hover:text-washi"
                            >
                                <IconWrapper icon={Globe} size={16} /> {t.btnDemo || "Launch Demo"}
                            </a>
                        )}
                        {work.repo && (
                            <a 
                                href={work.repo} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-mono text-[11px] tracking-jp-normal uppercase no-underline text-ink border border-ink px-8 py-3.5 flex items-center gap-3 transition-all hover:bg-ink hover:text-washi"
                            >
                                <IconWrapper icon={Github} size={16} /> {t.btnSource || "View Source"}
                            </a>
                        )}
                    </div>
                </article>
            </main>

            <footer className="flex justify-between items-end border-t border-washi-border pt-10 pb-20">
                <div>
                    <h3 className="font-mincho text-xl font-semibold text-ink mb-2">{PROFILE.brand}</h3>
                    <p className="font-mono text-[9px] tracking-jp-tight text-ink-faded uppercase">
                        &copy; {new Date().getFullYear()} {PROFILE.nameEn} · {t.footerCopy}
                    </p>
                </div>
            </footer>
        </div>
    );
};

WorkDetailTemplate.propTypes = {
    work: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default WorkDetailTemplate;

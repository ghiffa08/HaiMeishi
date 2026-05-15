import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Github, Link2, Briefcase, Cpu, ShieldCheck, Mail, Instagram, Globe } from 'lucide-react';
import Skeleton from '../atoms/Skeleton';
import Sider from '../organisms/Sider';

const ThreeDCard = lazy(() => import('../organisms/ThreeDCard'));

const LinkInBioTemplate = ({ profile, links, onViewPortfolio, onShare }) => {
    return (
        <div className="min-h-screen flex flex-col relative bg-washi-paper">
            {/* Horizontal Header */}
            <header className="w-full h-20 flex justify-between items-center px-6 lg:px-10 border-b border-ancient-tan/30 relative z-50 bg-washi-paper/90 backdrop-blur-sm">
                <div className="font-mincho text-2xl font-bold tracking-tight">ghiffa.dev</div>
                
                <nav className="hidden md:flex items-center gap-10 font-mincho text-xl opacity-60">
                    <button className="hover:opacity-100 transition-opacity">Archive</button>
                    <button className="hover:opacity-100 transition-opacity">Specs</button>
                    <button className="hover:opacity-100 transition-opacity">Hardware</button>
                    <button className="hover:opacity-100 transition-opacity">Research</button>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="px-2 py-1 border border-sumi-ink/20 text-[10px] font-mono tracking-widest">
                        JP / EN
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
                <div className="max-w-[1200px] w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-14 lg:gap-24">
                    
                    {/* Left: 3D Card */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end pt-4 sm:pt-8">
                        <Suspense fallback={<Skeleton width="480px" height="280px" />}>
                            <ThreeDCard profile={profile} />
                        </Suspense>
                    </div>

                    {/* Right: Connections & Info */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-8 sm:gap-10 pt-4 sm:pt-8 lg:pt-[52px] max-w-md">
                        <div className="flex flex-col gap-4 sm:gap-5">
                            <h3 className="font-mono text-[10px] tracking-[0.4em] text-ancient-tan uppercase font-medium">Connections</h3>
                            <div className="w-full h-px bg-ancient-tan/30" />
                            <div className="flex flex-col gap-5 sm:gap-6 mt-2">
                                {links && links.map((link, idx) => {
                                    const platform = link.name || link.platform || "";
                                    const isGithub = platform.toLowerCase().includes('github');
                                    const isLinkedIn = platform.toLowerCase().includes('linkedin');
                                    const isInstagram = platform.toLowerCase().includes('instagram');
                                    const isPortfolio = platform.toLowerCase().includes('portfolio') || platform.toLowerCase().includes('website') || platform.toLowerCase().includes('web');
                                    const linkTitle = link.name || link.title || "";
                                    const linkUrl = link.href || link.url || "#";
                                    if (isPortfolio) {
                                        return (
                                            <button
                                                key={idx}
                                                onClick={(e) => { e.preventDefault(); if (onViewPortfolio) onViewPortfolio(); }}
                                                className="flex items-center gap-3 sm:gap-4 hover:text-circuit-blue transition-colors group font-mincho text-[17px] sm:text-lg text-left"
                                            >
                                                <span className="w-5 shrink-0 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity text-sumi-ink/70">
                                                    <Globe size={16} />
                                                </span>
                                                <span className="tracking-wide">{linkTitle}</span>
                                            </button>
                                        );
                                    }

                                    return (
                                        <a 
                                            key={idx} href={linkUrl} target="_blank" rel="noopener noreferrer" 
                                            className="flex items-center gap-3 sm:gap-4 hover:text-circuit-blue transition-colors group font-mincho text-[17px] sm:text-lg"
                                        >
                                            <span className="w-5 shrink-0 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity text-sumi-ink/70">
                                                {isGithub ? <Github size={16} /> : (isLinkedIn ? <Link2 size={16} /> : (isInstagram ? <Instagram size={16} /> : <span className="font-mono text-[10px]">{idx + 1}</span>))}
                                            </span>
                                            <span className="tracking-wide">{linkTitle}</span>
                                        </a>
                                    );
                                })}
                            </div>
                            <div className="w-full h-px bg-ancient-tan/30 mt-1 sm:mt-2" />
                        </div>

                        <p className="font-serif italic text-[17px] sm:text-lg leading-relaxed text-sumi-ink/80 max-w-[34rem]">
                            "​Building the bridge between bits and atoms."
                        </p>
                    </div>
                </div>

                <Sider />
            </main>

            {/* Global Footer */}
            <footer className="w-full h-20 flex justify-between items-center px-6 lg:px-10 border-t border-ancient-tan/10 font-mono text-[10px] tracking-widest opacity-40">
                <div className="hanko-red-text">ghiffa.dev</div>
                <div className="hidden sm:block">© {new Date().getFullYear()} PRECISION & TRADITION.</div>
                <div className="flex gap-6 font-mono">
                    <button className="hidden sm:block">Schematics</button>
                    <button>GitHub</button>
                    <button>LinkedIn</button>
                </div>
            </footer>
        </div>
    );
};

LinkInBioTemplate.propTypes = {
    profile: PropTypes.object.isRequired,
    links: PropTypes.array.isRequired,
    onViewPortfolio: PropTypes.func,
    onShare: PropTypes.func,
};

export default LinkInBioTemplate;

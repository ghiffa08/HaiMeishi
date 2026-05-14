import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import SectionTitle from '../atoms/SectionTitle';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
    const { t, portfolio } = usePortfolio();
    if (!portfolio) return null;

    const PROFILE = portfolio.profile;

    return (
        <footer className="mt-20">
            {/* Awards Section */}
            <SectionTitle title={t.secRecordsTitle} jpTitle={t.secRecordsJp} delay="0.6s" />
            <ul className="border-t border-washi-border divide-y divide-washi-border mb-20 animate-fade-up">
                {(portfolio.awards || []).map((award, idx) => (
                    <li key={idx} className="py-6 flex flex-col">
                        <h4 className="font-mincho text-[17px] text-ink font-semibold mb-1.5">{award.title}</h4>
                        <p className="text-sm italic text-ink-faded/80">{award.org}</p>
                        <span className="font-mono text-[10px] text-ink-faded mt-3">{award.year}</span>
                    </li>
                ))}
            </ul>

            {/* Contact Grid */}
            <SectionTitle title={t.secEpiTitle} jpTitle={t.secEpiJp} delay="0.7s" />
            <div className="grid grid-cols-1 sm:grid-cols-2 border border-washi-border mb-20 animate-fade-up">
                <a href={`mailto:${PROFILE.mail}`} className="p-6 border-r border-b border-washi-border group hover:bg-washi-border/20 transition-colors">
                    <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-ink-faded flex items-center gap-2 mb-2">
                        <Mail size={12} /> {t.ctcLetter}
                    </div>
                    <div className="text-[15px] text-ink break-all">{PROFILE.mail}</div>
                </a>
                <a href={`tel:${PROFILE.tel}`} className="p-6 border-b border-washi-border group hover:bg-washi-border/20 transition-colors">
                    <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-ink-faded flex items-center gap-2 mb-2">
                        <Phone size={12} /> {t.ctcVoice}
                    </div>
                    <div className="text-[15px] text-ink break-all">{PROFILE.tel}</div>
                </a>
                <div className="p-6 border-r border-washi-border">
                    <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-ink-faded flex items-center gap-2 mb-2">
                        <MapPin size={12} /> {t.ctcLoc}
                    </div>
                    <div className="text-[15px] text-ink">{PROFILE.adr}</div>
                </div>
                <div className="p-6">
                    <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-ink-faded flex items-center gap-2 mb-2">
                        <Globe size={12} /> {t.ctcFocus}
                    </div>
                    <div className="text-[15px] text-ink">{t.focusVal}</div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="flex justify-between items-end border-t border-washi-border pt-10 pb-20">
                <div>
                    <h3 className="font-mincho text-xl font-semibold text-ink mb-2">{PROFILE.brand}</h3>
                    <p className="font-mono text-[9px] tracking-jp-tight text-ink-faded uppercase">
                        &copy; {new Date().getFullYear()} {t.footerCopy}
                    </p>
                </div>
                <div className="w-12 h-12 border-2 border-accent-red text-accent-red flex items-center justify-center font-mincho text-[22px] font-bold -rotate-6 rounded opacity-80 select-none">
                    印
                </div>
            </div>
        </footer>
    );
};

export default Footer;

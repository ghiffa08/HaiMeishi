import React, { useEffect, useState } from 'react';
import { Briefcase, Cpu, ShieldCheck, Mail } from 'lucide-react';

const items = [
    { icon: <Briefcase size={18} />, jp: '序', en: 'Prologue', href: '#prologue' },
    { icon: <Cpu size={18} />, jp: '其の一', en: 'Journey', href: '#journey' },
    { icon: <ShieldCheck size={18} />, jp: '其の二', en: 'Archives', href: '#archives' },
    { icon: <Mail size={18} />, jp: '其の三', en: 'Records', href: '#records' },
    { icon: <Mail size={18} />, jp: '其の四', en: 'Contact', href: '#contact' },
];

const Sider = () => {
    const [activeSection, setActiveSection] = useState('prologue');

    useEffect(() => {
        const sectionIds = items.map((item) => item.href.replace('#', ''));
        const headerOffset = 160;

        const syncFromHash = () => {
            const hash = window.location.hash.replace('#', '');
            if (sectionIds.includes(hash)) {
                setActiveSection(hash);
            }
        };

        const syncFromScroll = () => {
            const scrollPosition = window.scrollY + headerOffset;
            const activeId = [...sectionIds].reverse().find((id) => {
                const section = document.getElementById(id);
                return section && section.offsetTop <= scrollPosition;
            }) || sectionIds[0];

            setActiveSection(activeId);
        };

        syncFromHash();
        syncFromScroll();

        window.addEventListener('hashchange', syncFromHash);
        window.addEventListener('scroll', syncFromScroll, { passive: true });

        return () => {
            window.removeEventListener('hashchange', syncFromHash);
            window.removeEventListener('scroll', syncFromScroll);
        };
    }, []);

    const handleNavClick = (href) => {
        const target = href.replace('#', '');
        setActiveSection(target);
    };

    return (
        <aside className="hidden md:flex fixed right-5 lg:right-7 top-1/2 -translate-y-1/2 flex-col items-center gap-4 lg:gap-5 z-40">
            {items.map((it, i) => (
                <a
                    key={i}
                    href={it.href}
                    aria-current={activeSection === it.href.replace('#', '') ? 'page' : undefined}
                    onClick={() => handleNavClick(it.href)}
                    className={`group flex flex-col items-center gap-1.5 transition-transform duration-300 hover:-translate-x-0.5 ${activeSection === it.href.replace('#', '') ? 'text-hanko-red' : 'text-ancient-tan hover:text-sumi-ink'}`}
                >
                    <span className={`${activeSection === it.href.replace('#', '') ? 'text-hanko-red' : 'text-ancient-tan group-hover:text-sumi-ink'} transition-colors`}>
                        {React.cloneElement(it.icon, { size: 17 })}
                    </span>
                    <span className="flex flex-col items-center gap-1">
                        <span className="writing-vertical text-[11px] font-mono tracking-[0.18em] select-none leading-none text-center whitespace-nowrap">
                            {it.jp}
                        </span>
                        <span className={`writing-vertical text-[11px] font-mono tracking-[0.18em] select-none leading-none text-center whitespace-nowrap ${activeSection === it.href.replace('#', '') ? 'text-hanko-red' : ''}`}>
                            {it.en}
                        </span>
                    </span>
                </a>
            ))}
        </aside>
    );
};

export default Sider;

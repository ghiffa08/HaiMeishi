import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const Footer = () => {
    const { portfolio } = usePortfolio();
    if (!portfolio) return null;

    return (
        <footer className="w-full py-stack-lg px-margin-page flex flex-col md:flex-row justify-between items-center gap-stack-md bg-washi-paper border-t border-ancient-tan relative z-20">
            <div className="flex items-center gap-4">
                <div className="font-headline-lg text-headline-lg text-hanko-red border-2 border-hanko-red p-1 leading-none transform -rotate-6 select-none shadow-[2px_2px_0px_rgba(26,21,16,0.2)]">
                    了
                </div>
                <span className="font-data-value text-data-value text-on-surface">© {new Date().getFullYear()} PRECISION &amp; TRADITION. ALL RIGHTS RESERVED.</span>
            </div>
            <div className="flex gap-stack-lg">
                <a className="font-data-value text-data-value text-on-surface-variant hover:text-hanko-red hover:underline decoration-hanko-red decoration-2 hover:tracking-widest transition-all duration-500" href="#">Schematics</a>
                <a className="font-data-value text-data-value text-on-surface-variant hover:text-hanko-red hover:underline decoration-hanko-red decoration-2 hover:tracking-widest transition-all duration-500" href="#">GitHub</a>
                <a className="font-data-value text-data-value text-on-surface-variant hover:text-hanko-red hover:underline decoration-hanko-red decoration-2 hover:tracking-widest transition-all duration-500" href="#">LinkedIn</a>
            </div>
        </footer>
    );
};

export default Footer;
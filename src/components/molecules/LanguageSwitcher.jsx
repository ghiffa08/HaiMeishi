import React, { memo } from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { LANGUAGES } from '../../constants/languages';
import { usePortfolio } from '../../context/PortfolioContext';

/**
 * LanguageSwitcher - Robust Native Implementation
 * Uses an invisible native <select> overlay for 100% stability.
 */
const LanguageSwitcher = () => {
    const { lang: currentLang, changeLang } = usePortfolio();

    return (
        <div className="relative inline-flex items-center h-9 px-3 gap-2 group transition-all duration-200 hover:bg-ink/5 rounded">
            {/* Visual Display Layer (Purely Decorative) */}
            <div className="flex items-center gap-2 pointer-events-none z-10">
                <Languages
                    size={14}
                    strokeWidth={1.5}
                    className="text-ink-faded"
                />
                <span className="text-[10px] tracking-jp-normal uppercase text-ink font-mono truncate max-w-[70px] sm:max-w-[100px] leading-none">
                    {LANGUAGES[currentLang]?.langName || "Select"}
                </span>
                <ChevronDown
                    size={12}
                    className="text-ink-faded opacity-60"
                />
            </div>

            {/* The Brain: Hidden Native Select (The Overlay) */}
            <select
                value={currentLang}
                onChange={(e) => changeLang(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none z-20"
                aria-label="Select language"
            >
                {Object.keys(LANGUAGES).map((langKey) => (
                    <option key={langKey} value={langKey} className="bg-washi text-ink font-mono text-sm">
                        {LANGUAGES[langKey].langName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default memo(LanguageSwitcher);



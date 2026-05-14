import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../atoms/SectionTitle';
import { usePortfolio } from '../../context/PortfolioContext';

const WorkRow = ({ work, onSelect }) => (
    <button
        onClick={() => onSelect(work)}
        className="w-full text-left flex flex-col sm:flex-row gap-4 sm:gap-8 py-8 border-b border-washi-border group transition-colors duration-500 hover:bg-washi-border/15 animate-fade-up"
    >
        <div className="font-mono text-[11px] text-ink-faded shrink-0 w-[60px] pt-1">
            {work.year}
        </div>
        <div className="flex-1 min-w-0">
            <div className="font-mincho text-xl font-semibold mb-2 flex justify-between items-start sm:items-center text-ink gap-4">
                <span className="break-words min-w-0 pr-4">{work.title}</span>
                <ArrowRight
                    size={18}
                    className="shrink-0 opacity-30 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100 mt-1 sm:mt-0"
                />
            </div>
            <p className="text-base leading-relaxed text-[#4a443e] mb-4 text-justify">
                {work.shortDesc}
            </p>
            <div className="flex flex-wrap gap-2">
                {work.tags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="font-mono text-[9px] tracking-jp-tight uppercase px-2.5 py-1 border border-washi-border text-ink-faded"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </button>
);

const WorksSection = ({ onWorkSelect }) => {
    const { t, portfolio } = usePortfolio();
    if (!portfolio) return null;

    return (
        <section className="mb-20">
            <SectionTitle title={t.secWorksTitle} jpTitle={t.secWorksJp} delay="0.5s" />

            <div className="flex flex-col border-t border-washi-border mt-10">
                {(portfolio.works || []).map((work) => (
                    <WorkRow 
                        key={work.id} 
                        work={work} 
                        onSelect={onWorkSelect} 
                    />
                ))}
            </div>
        </section>
    );
};

export default WorksSection;

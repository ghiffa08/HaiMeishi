import React from 'react';
import SectionTitle from '../atoms/SectionTitle';
import { usePortfolio } from '../../context/PortfolioContext';

const TimelineItem = ({ year, title, org, desc, note }) => (
    <div className="relative group animate-fade-up">
        {/* The Diamond Indicator */}
        <div className="absolute -left-[28px] top-1.5 w-[7px] h-[7px] bg-washi border border-ink rotate-45 z-10 transition-transform group-hover:scale-125" />
        
        <div className="mb-2">
            <div className="font-mono text-[10px] text-ink-faded tracking-wide mb-2">
                {year}
            </div>
            <h4 className="font-mincho text-[17px] font-semibold text-ink leading-tight mb-1">
                {title}
            </h4>
            <p className="text-sm italic text-ink-faded/80 mb-2">
                {org}
            </p>
            {(desc || note) && (
                <p className="text-[15px] leading-relaxed text-[#4a443e] text-justify mt-2">
                    {desc || note}
                </p>
            )}
        </div>
    </div>
);

const ExperienceSection = () => {
    const { t, portfolio } = usePortfolio();
    if (!portfolio) return null;

    return (
        <section className="mb-20">
            {/* Journey Section */}
            <SectionTitle title={t.secJourneyTitle} jpTitle={t.secJourneyJp} delay="0.4s" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 sm:gap-10 mt-10 mb-20">
                {/* Experience Column */}
                <div className="space-y-8">
                    <h5 className="font-mono text-[10px] tracking-jp-wide text-ink-faded uppercase mb-6 opacity-50">
                        {t.subExp}
                    </h5>
                    <div className="border-l border-washi-border ml-2 pl-6 space-y-10">
                        {(portfolio.experience || []).map((item, index) => (
                            <TimelineItem key={index} {...item} title={item.role || item.title} />
                        ))}
                    </div>
                </div>

                {/* Education & Certs Column */}
                <div className="space-y-12">
                    {/* Education */}
                    <div className="space-y-8">
                        <h5 className="font-mono text-[10px] tracking-jp-wide text-ink-faded uppercase mb-6 opacity-50">
                            {t.subEdu}
                        </h5>
                        <div className="border-l border-washi-border ml-2 pl-6 space-y-10">
                            {(portfolio.education || []).map((item, index) => (
                                <TimelineItem key={index} {...item} title={item.degree} />
                            ))}
                        </div>
                    </div>

                    {/* Organizations / Certifications */}
                    <div className="space-y-8">
                        <h5 className="font-mono text-[10px] tracking-jp-wide text-ink-faded uppercase mb-6 opacity-50">
                            {t.subAffil || t.subCert || "Organizations"}
                        </h5>
                        <div className="border-l border-washi-border ml-2 pl-6 space-y-10">
                            {(portfolio.organizations || portfolio.certifications || []).map((item, index) => (
                                <TimelineItem key={index} {...item} title={item.role || item.title} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Records Section */}
            <SectionTitle title={t.secPubTitle} jpTitle={t.secPubJp} delay="0.7s" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 sm:gap-10 mt-10">
                <div className="space-y-8">
                    <h5 className="font-mono text-[10px] tracking-jp-wide text-ink-faded uppercase mb-6 opacity-50">
                        {t.subPub}
                    </h5>
                    <div className="border-l border-washi-border ml-2 pl-6 space-y-10">
                        {(portfolio.publications || []).map((item, index) => (
                            <TimelineItem key={index} {...item} />
                        ))}
                    </div>
                </div>
                <div className="space-y-8">
                    <h5 className="font-mono text-[10px] tracking-jp-wide text-ink-faded uppercase mb-6 opacity-50">
                        {t.subIP}
                    </h5>
                    <div className="border-l border-washi-border ml-2 pl-6 space-y-10">
                        {(portfolio.intellectual_property || []).map((item, index) => (
                            <TimelineItem key={index} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;

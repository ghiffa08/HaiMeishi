import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const RecordsSection = () => {
  const { portfolio } = usePortfolio();

  const achievements = portfolio?.achievements || [
    { date: '2023.11', status: '1st Place', title: 'National IoT Protocol Design Competition', desc: 'Developed an ultra-low power mesh networking protocol for agricultural sensors, reducing energy consumption by 40% compared to standard Zigbee implementations.', tags: ['Embedded C','Mesh Networking'] },
    { date: '2022.08', status: 'Finalist', title: 'Pilmapres (National Outstanding Student Selection)', desc: 'Recognized for academic excellence and the prototype development of a non-invasive biometric monitoring wearable utilizing flexible PCB substrates.', tags: ['Hardware Design','Biometrics'] }
  ];

  const orgSource = portfolio?.organizations || [
    { title: 'Robotics Engineering Society', period: '2021 - 2023', role: 'Technical Lead', desc: 'Managed a team of 15 engineers developing autonomous navigation algorithms for warehouse logistics robots.' },
    { title: 'IEEE Student Branch', period: '2020 - 2022', role: 'Events Coordinator', desc: 'Organized hardware hackathons and industry seminars.' }
  ];

  const orgs = orgSource.map((item) => ({
    title: item.title || item.org || item.name || 'Organization',
    period: item.period || item.year || item.date || item.range || '',
    role: item.role || item.position || item.title || '',
    desc: item.desc || item.description || item.note || ''
  }));

  return (
    <section id="records" className="relative z-10 w-full">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-margin-page py-24 md:py-32 md:flex md:gap-gutter">
        <div className="md:w-32 md:flex-shrink-0 flex justify-start md:justify-end md:border-r border-ancient-tan/30 pr-gutter relative">
          <h1 className="font-headline-xl text-headline-xl text-sumi-ink writing-vertical leading-none tracking-[-0.03em] hidden md:block">其の三 ・ Records</h1>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-sumi-ink writing-vertical leading-none tracking-[-0.03em] md:hidden">其の三 ・ Records</h1>
        </div>

        <div className="flex-1 flex flex-col gap-grid-unit md:pl-gutter mt-8 md:mt-0">
          <div className="space-y-stack-lg relative">
            <div className="absolute left-[-40px] top-0 bottom-0 w-px bg-ancient-tan/20 hidden md:block" />
            {achievements.map((a, idx) => (
              <article key={idx} className="group relative flex flex-col md:flex-row gap-stack-md items-start p-6 md:p-7 border border-ancient-tan/20 bg-washi-paper/50 hover:bg-surface-container transition-colors duration-300">
                <div className="font-data-value text-data-value text-ancient-tan md:w-32 flex-shrink-0 pt-1 border-b md:border-b-0 md:border-r border-ancient-tan/30 pb-2 md:pb-0 md:pr-4 leading-tight">
                  <div>{a.date}</div>
                  <div className={`${a.status.toLowerCase().includes('place') ? 'text-hanko-red' : 'text-circuit-blue'}`}>{a.status}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-body-lg text-body-lg text-sumi-ink mb-2 group-hover:text-circuit-blue transition-colors">{a.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-[58rem]">{a.desc}</p>
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {a.tags.map((t, i) => (
                      <span key={i} className="px-2 py-1 border border-ancient-tan text-[10px] font-data-label text-sumi-ink uppercase">{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-grid-unit">
            <h2 className="font-headline-lg text-headline-lg text-sumi-ink mb-10 flex items-center gap-4">
              <span className="w-8 h-px bg-ancient-tan block"></span>
              Organizations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {orgs.map((o, i) => (
                <div
                  key={i}
                  className="relative h-64 border border-ancient-tan/50 bg-washi-paper p-6 flex flex-col justify-between group overflow-hidden"
                  style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s', boxShadow: '4px 4px 0px rgba(26, 21, 16, 0.1)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-surface-container/0 to-ancient-tan/5 pointer-events-none" />
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <h3 className="font-body-lg text-body-lg text-sumi-ink font-bold w-2/3">{o.title}</h3>
                    <span className="font-data-value text-data-value text-ancient-tan text-right whitespace-pre-line">
                      {(o.period || '—').replace(/\s*-\s*/g, '\n-')}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <p className={`font-data-label text-data-label ${i % 2 === 0 ? 'text-circuit-blue' : 'text-hanko-red'} uppercase mb-1`}>{o.role}</p>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm border-0 leading-normal max-w-none">
                      {o.desc}
                    </p>
                  </div>
                  
                  {/* Decorative stamp */}
                  <div className="absolute -right-4 -bottom-4 text-ancient-tan/10 font-headline-xl text-9xl pointer-events-none transform rotate-12 select-none">
                    {i === 0 ? '機' : '電'}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-32 flex justify-center md:justify-end w-full border-t border-ancient-tan/30 pt-16 relative">
            <div className="absolute left-1/2 -top-[1px] -translate-x-1/2 w-4 h-[2px] bg-ancient-tan" />
            <div className="flex flex-col items-center gap-4 group cursor-pointer">
              <span className="font-accent-italic text-accent-italic text-ancient-tan">Epilogue</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RecordsSection;

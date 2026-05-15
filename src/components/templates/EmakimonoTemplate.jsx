import React from 'react';
import Sider from '../organisms/Sider';
import Footer from '../organisms/Footer';
import { usePortfolio } from '../../context/PortfolioContext';
import RecordsSection from '../organisms/RecordsSection';

const EmakimonoTemplate = ({ onBackToBio, onWorkSelect }) => {
  const { portfolio } = usePortfolio();
  const PROFILE = portfolio?.profile || {};

  return (
    <div className="min-h-screen relative bg-surface selection:bg-hanko-red selection:text-washi-paper">
      {/* Top App Bar */}
      <header className="docked full-width top-0 sticky z-50 bg-washi-paper/90 border-b border-ancient-tan backdrop-blur-sm flex justify-between items-center w-full px-6 md:px-margin-page py-4">
        <div className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-sumi-ink tracking-tighter">ghiffa.dev</div>
        <nav className="hidden md:flex gap-stack-lg">
          <a className="font-data-label text-data-label text-on-surface-variant hover:text-primary px-2 py-1" href="#">Archive</a>
          <a className="font-data-label text-data-label text-hanko-red border-b-2 border-hanko-red pb-1 px-2 py-1 opacity-80" href="#">Specs</a>
          <a className="font-data-label text-data-label text-on-surface-variant hover:text-primary px-2 py-1" href="#">Hardware</a>
          <a className="font-data-label text-data-label text-on-surface-variant hover:text-primary px-2 py-1" href="#">Research</a>
        </nav>
        <div className="flex items-center gap-stack-md text-primary">
          <span className="font-data-label text-data-label cursor-pointer">JP/EN</span>
          <button className="md:hidden">
            <span className="material-symbols-outlined font-headline-lg">menu</span>
          </button>
        </div>
      </header>

      <Sider />

      <main className="bg-grid w-full h-full relative">
        <div className="max-w-[1180px] mx-auto px-6 md:px-margin-page md:pr-[140px] lg:pr-[160px] pb-32">
          {/* Prologue */}
          <section className="min-h-screen flex flex-col justify-center py-stack-lg border-b border-ancient-tan relative" id="prologue">
            <div className="absolute right-0 top-1/4 text-ancient-tan opacity-20 text-[120px] font-headline-xl leading-none select-none z-0">序</div>
            <div className="relative z-10 grid md:grid-cols-2 gap-stack-lg items-center">
              <div>
                <h1 className="font-headline-xl text-headline-xl text-sumi-ink mb-stack-md">{PROFILE.name || 'Haikal Jibran Al-Ghiffarry'}</h1>
                <p className="font-data-label text-data-label text-ancient-tan mb-stack-lg tracking-widest">[ IoT Engineer / Fullstack Developer ]</p>
                <p className="font-body-lg text-body-lg text-sumi-ink mb-stack-lg max-w-lg leading-relaxed">{PROFILE.bio || 'Forging connections between the physical and digital realms. Specializing in robust IoT architectures and elegant software solutions.'}</p>
                <button className="border border-sumi-ink px-6 py-3 font-headline-lg-mobile text-body-md hover:bg-sumi-ink hover:text-washi-paper transition-colors duration-300">Explore Archives</button>
              </div>
              <div className="relative">
                <div className="w-full aspect-[3/4] bg-washi-paper border border-ancient-tan stipple-shadow p-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-sumi-ink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                  <img alt="Abstract" className="w-full h-full object-cover filter grayscale contrast-125" src={PROFILE.heroImage || ''} />
                  <div className="absolute bottom-4 right-4 bg-washi-paper px-2 py-1 border border-ancient-tan font-data-value text-data-value text-xs z-20">FIG. 01</div>
                </div>
              </div>
            </div>
          </section>

          {/* Journey */}
          <section className="py-32 border-b border-ancient-tan relative" id="journey">
            <div className="absolute right-0 top-16 text-ancient-tan opacity-20 text-[120px] font-headline-xl leading-none select-none z-0">旅</div>
            <div className="flex flex-col md:flex-row gap-stack-lg relative z-10">
              <div className="md:w-1/4">
                <h2 className="font-headline-lg text-headline-lg text-sumi-ink [writing-mode:vertical-rl] h-48 border-l-2 border-hanko-red pl-4">其の一・Journey</h2>
              </div>
              <div className="md:w-3/4 space-y-16 border-l border-ancient-tan pl-stack-lg relative">
                <div className="relative">
                  <div className="absolute -left-[49px] top-1 w-4 h-4 bg-hanko-red rotate-45 border border-washi-paper" />
                  <div className="font-data-value text-data-value text-ancient-tan mb-2">2021 — PRESENT</div>
                  <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-sumi-ink mb-2">B.Sc. Informatics Engineering</h3>
                  <p className="font-body-md text-body-md text-surface-tint mb-4">University of Technology</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="border border-ancient-tan px-2 py-1 font-data-label text-data-label text-[10px] text-sumi-ink">GPA: 3.92</span>
                    <span className="border border-ancient-tan px-2 py-1 font-data-label text-data-label text-[10px] text-sumi-ink">IoT FOCUS</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[49px] top-1 w-4 h-4 bg-surface-dim border border-ancient-tan rotate-45" />
                  <div className="font-data-value text-data-value text-ancient-tan mb-2">2023</div>
                  <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-sumi-ink mb-2">IoT Systems Developer Intern</h3>
                  <p className="font-body-md text-body-md text-surface-tint mb-4">TechCorp Solutions</p>
                  <p className="font-body-md text-body-md text-sumi-ink max-w-2xl">Developed firmware for ESP32-based environmental monitoring systems. Implemented MQTT protocols for real-time data transmission to a custom dashboard.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Archives */}
          <section className="py-32 border-b border-ancient-tan relative" id="archives">
            <div className="absolute right-0 top-16 text-ancient-tan opacity-20 text-[120px] font-headline-xl leading-none select-none z-0">庫</div>
            <div className="relative z-10 mb-stack-lg flex items-end justify-between">
              <h2 className="font-headline-lg text-headline-lg text-sumi-ink border-b-2 border-hanko-red pb-2 inline-block">其の二・Archives</h2>
              <span className="font-data-value text-data-value text-ancient-tan hidden md:block">SELECT PROJECTS</span>
            </div>
            <div className="grid md:grid-cols-2 gap-grid-unit">
              {/* Project cards: reuse portfolio.projects if available */}
              {(portfolio?.projects || [{title: 'Smart Home Hub Architecture', tech: 'ESP32 / MQTT / React', desc: 'A localized smart home hub prioritizing privacy.'},{title: 'Distributed Sensor Network', tech: 'C++ / LoRaWAN / InfluxDB', desc: 'Agricultural monitoring system.'}]).map((p, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="border border-ancient-tan bg-washi-paper p-2 stipple-shadow transition-transform duration-300 group-hover:-translate-y-2 relative">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-surface-dim border-b border-l border-ancient-tan flex items-center justify-center">
                      <span className="font-data-label text-data-label text-[10px]">0{i+1}</span>
                    </div>
                    <div className="aspect-video bg-surface-dim overflow-hidden relative border border-ancient-tan mb-4">
                      <img alt={p.title} className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500" src={p.image || ''} />
                    </div>
                    <div className="px-2 pb-2">
                      <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-sumi-ink mb-1 group-hover:text-circuit-blue transition-colors">{p.title}</h3>
                      <p className="font-data-value text-data-value text-ancient-tan mb-4">{p.tech}</p>
                      <p className="font-body-md text-body-md text-surface-tint">{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Records Section */}
          <RecordsSection />

          {/* Contact */}
          <section className="py-32 border-b border-ancient-tan relative" id="contact">
            <div className="absolute left-0 top-16 text-ancient-tan opacity-20 text-[120px] font-headline-xl leading-none select-none z-0">結</div>
            <div className="relative z-10 flex flex-col lg:flex-row gap-stack-lg">
              <div className="lg:w-24 flex-shrink-0 hidden lg:block">
                <h2 className="font-headline-lg text-headline-lg text-sumi-ink [writing-mode:vertical-rl] border-l-2 border-hanko-red pl-4 h-[420px]">結び・Contact</h2>
              </div>

              <div className="flex-1 grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-gutter items-start">
                <div className="lg:hidden mb-4 border-l-4 border-hanko-red pl-4">
                  <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-sumi-ink">結び・Contact</h2>
                </div>

                <div className="border border-ancient-tan bg-washi-paper p-6 md:p-8 stipple-shadow">
                  <div className="flex items-center justify-between gap-4 border-b border-ancient-tan pb-3 mb-8">
                    <span className="font-data-label text-data-label text-hanko-red tracking-[0.2em] uppercase">Transmission Protocol</span>
                    <span className="font-data-value text-data-value text-hanko-red">01</span>
                  </div>

                  <form className="flex flex-col gap-8">
                    <label className="flex flex-col gap-2">
                      <span className="font-data-label text-data-label text-ancient-tan">Identifier / Name</span>
                      <input className="bg-transparent border-0 border-b border-ancient-tan px-0 py-2 font-body-md text-body-md text-sumi-ink placeholder:text-ancient-tan/60 focus:ring-0 focus:border-sumi-ink" type="text" placeholder="e.g. John Doe" />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="font-data-label text-data-label text-ancient-tan">Signal Route / Email</span>
                      <input className="bg-transparent border-0 border-b border-ancient-tan px-0 py-2 font-body-md text-body-md text-sumi-ink placeholder:text-ancient-tan/60 focus:ring-0 focus:border-sumi-ink" type="email" placeholder="route@network.com" />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="font-data-label text-data-label text-ancient-tan">Payload / Message</span>
                      <textarea className="min-h-[160px] resize-none bg-transparent border border-ancient-tan px-4 py-4 font-body-md text-body-lg text-sumi-ink placeholder:text-ancient-tan/60 focus:ring-0 focus:border-sumi-ink" rows="5" placeholder="Begin transmission..." />
                    </label>

                    <button type="button" className="self-start border border-sumi-ink px-6 py-3 font-body-md text-body-md text-sumi-ink transition-colors hover:bg-sumi-ink hover:text-washi-paper">
                      Dispatch ➜
                    </button>
                  </form>
                </div>

                <div className="flex flex-col gap-stack-lg">
                  <div className="border-b border-ancient-tan pb-3">
                    <span className="font-data-label text-data-label text-ancient-tan tracking-[0.2em] uppercase">Network Nodes</span>
                  </div>

                  <div className="space-y-4">
                    <a className="flex items-center justify-between border-b border-ancient-tan/30 pb-4 group" href="#">
                      <span className="font-headline-lg-mobile text-headline-lg-mobile text-sumi-ink group-hover:text-circuit-blue transition-colors">GitHub</span>
                      <span className="font-data-value text-data-value text-ancient-tan group-hover:text-circuit-blue transition-colors">/ktng-sys</span>
                    </a>
                    <a className="flex items-center justify-between border-b border-ancient-tan/30 pb-4 group" href="#">
                      <span className="font-headline-lg-mobile text-headline-lg-mobile text-sumi-ink group-hover:text-circuit-blue transition-colors">LinkedIn</span>
                      <span className="font-data-value text-data-value text-ancient-tan group-hover:text-circuit-blue transition-colors">/in/ktanaka</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EmakimonoTemplate;

import React from 'react';
import './landing.css';
import PROFILE from './profile.json';

// =====================
// LINK ITEMS DATA
// =====================
const LINKS = [
    { name: 'Portfolio', sub: 'ghiffa.dev', type: 'Web', arrow: '→', href: 'https://ghiffa.dev' },
    { name: 'GitHub', sub: '@ghiffa', type: 'Code', arrow: '→', href: 'https://github.com/ghiffa' },
    { name: 'LinkedIn', sub: 'Professional Network', type: 'Profile', arrow: '→', href: 'https://linkedin.com/in/haikal-jibran' },
    { name: 'Instagram', sub: '@haikaljibrn__', type: 'Social', arrow: '→', href: 'https://www.instagram.com/haikaljibrn__' },
    { name: 'Email', sub: PROFILE.mail, type: 'Mail', arrow: '→', href: `mailto:${PROFILE.mail}` },
];

// =====================
// LANDING PAGE
// =====================
export default function Landing() {
    return (
        <div className="landing-body">
            <div className="l-page">


                {/* Header */}
                <header className="l-header">
                    <div>
                        <div className="l-header-brand">{PROFILE.brand}</div>
                        <div className="l-header-jp">{PROFILE.brandKanji} &nbsp;·&nbsp; 開 発 ラ ボ</div>
                    </div>
                    <div className="l-header-right">
                        <div className="l-header-tag">名刺 · Meishi · Digital Card</div>
                        <div className="l-header-tag" style={{ marginTop: 4, fontSize: 8, opacity: 0.5 }}>
                            Est. {PROFILE.est} · {PROFILE.city}
                        </div>
                    </div>
                </header>

                {/* Hero */}
                <section className="l-hero">
                    <div className="l-hero-line" />
                    <div>
                        <div className="l-hero-name-jp">{PROFILE.nameKo}</div>
                        <div className="l-hero-name-en">{PROFILE.nameEn}</div>
                        <div className="l-hero-title">
                            Fullstack Developer
                            <em>フルスタック開発者</em>
                        </div>
                        <div className="l-avail-row">
                            <div className="l-avail-dot" />
                            Available for collaboration · 協業・相談受付中
                        </div>
                    </div>
                </section>

                {/* About */}
                <div className="l-section-header" style={{ animationDelay: '0.15s' }}>
                    <span className="l-section-num">01</span>
                    <span className="l-section-title">About</span>
                    <div className="l-section-rule" />
                </div>
                <div className="l-bio">
                    <p className="l-bio-text">
                        Fullstack developer based in {PROFILE.city}, building clean and functional web
                        applications under the {PROFILE.brand} umbrella. Focused on crafting systems that
                        are both technically sound and visually refined — from backend APIs to
                        pixel-perfect interfaces.
                    </p>
                    <p className="l-bio-jp">
                        フルスタック開発者 &nbsp;·&nbsp; バックエンドからフロントエンドまで<br />
                        クリーンで機能的なウェブシステムを構築
                    </p>
                </div>

                {/* Links */}
                <div className="l-section-header" style={{ animationDelay: '0.25s', marginBottom: 0 }}>
                    <span className="l-section-num">02</span>
                    <span className="l-section-title">Links</span>
                    <div className="l-section-rule" />
                </div>
                <div className="l-links">
                    <div className="l-link-list">
                        {LINKS.map(link => (
                            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="l-link-item">
                                <div className="l-link-left">
                                    <div className="l-link-name">{link.name}</div>
                                    <div className="l-link-sub">{link.sub}</div>
                                </div>
                                <div className="l-link-right">
                                    <span className="l-link-type">{link.type}</span>
                                    <span className="l-link-arrow">{link.arrow}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div className="l-section-header" style={{ animationDelay: '0.7s' }}>
                    <span className="l-section-num">03</span>
                    <span className="l-section-title">Contact</span>
                    <div className="l-section-rule" />
                </div>
                <div className="l-contact-grid">
                    <a href={`tel:${PROFILE.tel.replace(/\D/g, '')}`} className="l-contact-cell">
                        <div className="l-cc-label">Tel</div>
                        <div className="l-cc-value">{PROFILE.tel}</div>
                    </a>
                    <a href={`mailto:${PROFILE.mail}`} className="l-contact-cell">
                        <div className="l-cc-label">Mail</div>
                        <div className="l-cc-value">{PROFILE.mail}</div>
                    </a>
                    <div className="l-contact-cell">
                        <div className="l-cc-label">Location</div>
                        <div className="l-cc-value">{PROFILE.city}, Jawa Barat, Indonesia</div>
                    </div>
                    <div className="l-contact-cell">
                        <div className="l-cc-label">Office Hours</div>
                        <div className="l-cc-value">Mon–Fri 09:00–17:00 WIB</div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="l-footer">
                    <div>
                        <div className="l-footer-brand">{PROFILE.brand}</div>
                        <div className="l-footer-copy">
                            © 2026 {PROFILE.nameEn} · All rights reserved
                            <span>創造 · 革新 · 誠実</span>
                        </div>
                    </div>
                    <div className="l-hanko"><span>印</span></div>
                </footer>

            </div>
        </div>
    );
}

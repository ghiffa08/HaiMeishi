import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { usePortfolio } from '../../context/PortfolioContext';

const SEO = ({ title, description, lang = 'en', url = 'https://ghiffa.dev' }) => {
    const { portfolio } = usePortfolio();
    const favicon = portfolio?.branding?.favicon || '/favicon.svg';
    
    const siteTitle = title ? `${title} | Haikal Jibran` : "Haikal Jibran | Portfolio";
    const siteDescription = description || "Portfolio of Haikal Jibran Al-Ghiffarry, an Informatics Student, Full Stack Developer, and IoT Engineer based in Kuningan, West Java.";
    
    // Supported languages for hreflang
    const languages = ['en', 'id', 'ja', 'zh', 'ar'];
    
    // Structured Data (JSON-LD)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": portfolio?.profile?.nameEn || "Haikal Jibran",
        "jobTitle": portfolio?.profile?.role || "Full Stack Developer",
        "description": siteDescription,
        "url": url,
        "image": "https://ghiffa.dev/assets/hero.png",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": portfolio?.profile?.city || "Kuningan",
            "addressRegion": "West Java",
            "addressCountry": "Indonesia"
        },
        "sameAs": portfolio?.links ? portfolio.links.map(l => l.href) : [],
        "knowsAbout": portfolio?.works ? portfolio.works.flatMap(w => w.tags) : [],
        "hasCredential": portfolio?.certifications ? portfolio.certifications.map(c => ({
            "@type": "EducationalOccupationalCredential",
            "name": c.title
        })) : [],
        "alumniOf": portfolio?.education ? portfolio.education.map(e => ({
            "@type": "EducationalOrganization",
            "name": e.org
        })) : []
    };

    return (
        <Helmet>
            {/* Favicon & Branding */}
            <link rel="icon" type="image/png" href={favicon} />
            <link rel="apple-touch-icon" href={favicon} />
            
            {/* Dynamic HTML Lang */}
            <html lang={lang} />
            
            {/* Standard Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
            
            {/* Geo SEO */}
            <meta name="geo.region" content="ID-JB" />
            <meta name="geo.placename" content="Kuningan" />
            <meta name="geo.position" content="-6.9764;108.4832" />
            <meta name="ICBM" content="-6.9764, 108.4832" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="profile" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content="https://ghiffa.dev/assets/hero.png" />
            <meta property="og:locale" content={lang === 'en' ? 'en_US' : lang === 'id' ? 'id_ID' : lang === 'ja' ? 'ja_JP' : lang === 'zh' ? 'zh_CN' : 'ar_AR'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={siteDescription} />
            <meta name="twitter:image" content="https://ghiffa.dev/assets/hero.png" />

            {/* Multilingual hreflang */}
            <link rel="alternate" hrefLang="x-default" href="https://ghiffa.dev" />
            {languages.map((l) => (
                <link 
                    key={l} 
                    rel="alternate" 
                    hrefLang={l} 
                    href={`https://ghiffa.dev?lang=${l}`} 
                />
            ))}

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    );
};

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    lang: PropTypes.string,
    url: PropTypes.string,
};

export default SEO;

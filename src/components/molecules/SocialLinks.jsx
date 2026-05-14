import React from 'react';
import PropTypes from 'prop-types';
import { Github, Linkedin, Instagram, Globe } from 'lucide-react';

const iconMap = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
    globe: Globe
};

const SocialLinks = ({ links }) => {
    return (
        <div className="flex flex-col gap-3">
            {links.map((link, idx) => {
                const Icon = iconMap[link.name.toLowerCase()] || Globe;
                return (
                    <a 
                        key={idx}
                        className="flex items-center gap-4 px-6 py-[18px] bg-white/50 border border-ink/10 text-ink text-[13px] font-medium transition-all duration-300 relative overflow-hidden group min-h-[52px] hover:translate-y-[-2px] hover:bg-white hover:border-ink/20 hover:pl-7" 
                        href={link.href} 
                        target="_blank" 
                        rel="noreferrer"
                    >
                        {/* Hover Left Indicator */}
                        <div className="absolute left-0 top-0 bottom-0 w-0 bg-ink transition-all duration-300 group-hover:w-1" />
                        
                        <Icon size={18} className="opacity-70" />
                        <span>{link.name}</span>
                        <span className="ml-auto text-[10px] text-ink-faded font-normal tracking-tight">{link.sub}</span>
                    </a>
                );
            })}
        </div>
    );
};

SocialLinks.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        sub: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
    })).isRequired,
};

export default SocialLinks;

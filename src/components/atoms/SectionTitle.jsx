import React from 'react';
import PropTypes from 'prop-types';

const SectionTitle = ({ title, jpTitle, delay = "0.5s" }) => {
    return (
        <div className="flex items-center gap-6 mb-10 animate-fade-up" style={{ animationDelay: delay }}>
            <div className="[writing-mode:vertical-rl] [text-orientation:upright] text-sm tracking-[0.3em] text-accent-red font-semibold h-20 border-l border-washi-border pl-4">
                {jpTitle}
            </div>
            <h3 className="font-mono text-[11px] tracking-[0.4em] uppercase text-ink">
                {title}
            </h3>
            <div className="flex-1 h-[1px] bg-washi-border" />
        </div>
    );
};

SectionTitle.propTypes = {
    title: PropTypes.string.isRequired,
    jpTitle: PropTypes.string.isRequired,
    delay: PropTypes.string,
};

export default SectionTitle;

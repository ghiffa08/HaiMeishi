import React from 'react';
import PropTypes from 'prop-types';

const SplashScreen = ({ greeting, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
            <div className="absolute inset-0 bg-washi animate-splash-bg before:content-[''] before:absolute before:inset-0 before:bg-[url('/assets/noise.svg')] before:pointer-events-none before:z-1 before:mix-blend-multiply" />
            <div className="relative z-[2] overflow-hidden">
                <h1 className="text-[clamp(48px,10vw,84px)] text-ink tracking-[0.2em] font-medium opacity-0 translate-y-5 animate-splash-text font-mincho">
                    {greeting}
                </h1>
            </div>
        </div>
    );

};

SplashScreen.propTypes = {
    greeting: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
};

export default SplashScreen;

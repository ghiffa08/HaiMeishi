import React from 'react';
import PropTypes from 'prop-types';
import LinkInBioTemplate from '../components/templates/LinkInBioTemplate';
import SEO from '../components/atoms/SEO';
import { usePortfolio } from '../context/PortfolioContext';

const Bio = ({ onViewPortfolio }) => {
    const { portfolio } = usePortfolio();
    const PROFILE = portfolio?.profile || {};
    const LINKS = portfolio?.links || [];

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ title: PROFILE.brand, url: window.location.href });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link disalin!');
            }
        } catch (e) { console.log(e); }
    };

    return (
        <>
            <SEO title="Digital Connect" lang="en" />
            <LinkInBioTemplate 
                profile={PROFILE} 
                links={LINKS} 
                onViewPortfolio={onViewPortfolio} 
                onShare={handleShare}
            />
        </>
    );
};

Bio.propTypes = {
    onViewPortfolio: PropTypes.func.isRequired,
};

export default Bio;


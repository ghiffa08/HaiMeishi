import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MainPortfolioTemplate from '../components/templates/MainPortfolioTemplate';
import WorkDetailTemplate from '../components/templates/WorkDetailTemplate';
import SEO from '../components/atoms/SEO';
import { usePortfolio } from '../context/PortfolioContext';

const Home = ({ onBackToBio }) => {
    const { lang, t, portfolio } = usePortfolio();
    const [activeWork, setActiveWork] = useState(null);
    
    // If portfolio is not yet loaded, return null (handled by SplashScreen)
    if (!portfolio || !t) return null;

    if (activeWork) {
        return (
            <>
                <SEO title={activeWork.title} description={activeWork.shortDesc} lang={lang} />
                <WorkDetailTemplate 
                    work={activeWork} 
                    onBack={() => setActiveWork(null)} 
                    t={t} 
                    lang={lang} 
                />
            </>
        );
    }

    return (
        <>
            <SEO 
                title={t.heroTitle} 
                description={t.bioContent1} 
                lang={lang} 
            />
            <MainPortfolioTemplate 
                onBackToBio={onBackToBio} 
                onWorkSelect={setActiveWork} 
            />
        </>
    );
};

Home.propTypes = {
    onBackToBio: PropTypes.func.isRequired,
};

export default Home;


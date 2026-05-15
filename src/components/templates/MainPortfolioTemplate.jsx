import React from 'react';
import EmakimonoTemplate from './EmakimonoTemplate';
import LanguageSwitcher from '../molecules/LanguageSwitcher';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowLeft } from 'lucide-react';

const MainPortfolioTemplate = ({ onBackToBio, onWorkSelect }) => {
    const { lang, t } = usePortfolio();

    return (
        <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <EmakimonoTemplate onBackToBio={onBackToBio} onWorkSelect={onWorkSelect} />
        </div>
    );
};

export default MainPortfolioTemplate;

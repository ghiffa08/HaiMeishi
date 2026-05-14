import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
    fetchTranslation, 
    fetchPortfolio, 
    loginAdmin as firebaseLogin, 
    logoutAdmin as firebaseLogout,
    updateCmsContent,
    uploadImage,
    initAuth
} from '../services/firebaseService';
import { DEFAULT_LANG } from '../constants/languages';
import { LOCAL_TRANSLATIONS } from '../data/translations';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
    const [lang, setLang] = useState(DEFAULT_LANG);
    const [targetLang, setTargetLang] = useState(null);
    const [translations, setTranslations] = useState({
        [DEFAULT_LANG]: LOCAL_TRANSLATIONS[DEFAULT_LANG]
    });
    const [portfolioData, setPortfolioData] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial Load
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // 1. Wait for Auth to resolve
                const user = await initAuth();
                if (user && !user.isAnonymous) {
                    setIsAdmin(true);
                }
                setIsAuthLoading(false);

                // 2. Fetch critical data
                const [pData, tData] = await Promise.all([
                    fetchPortfolio().catch(err => {
                        console.warn("Portfolio fetch failed, using null", err);
                        return null;
                    }),
                    fetchTranslation(DEFAULT_LANG).catch(err => {
                        console.warn("Translation fetch failed, using local fallback", err);
                        return LOCAL_TRANSLATIONS[DEFAULT_LANG];
                    })
                ]);

                // 3. Update state
                setPortfolioData(pData);
                if (tData) {
                    setTranslations(prev => ({ ...prev, [DEFAULT_LANG]: tData }));
                }

                // 4. Finally end transition
                setTimeout(() => setIsTransitioning(false), 1200);
            } catch (err) {
                console.error("Critical Load Error:", err);
                setTranslations(prev => ({ ...prev, [DEFAULT_LANG]: LOCAL_TRANSLATIONS[DEFAULT_LANG] }));
                setIsTransitioning(false);
            }
        };
        loadInitialData();
    }, []);

    const handleLangChange = useCallback(async (newLang) => {
        if (newLang === lang || isTransitioning) return;
        
        setTargetLang(newLang);
        setIsTransitioning(true);
        setError(null);
        
        try {
            // Fetch if not in cache
            let tData = translations[newLang];
            if (!tData) {
                try {
                    tData = await fetchTranslation(newLang);
                    setTranslations(prev => ({ ...prev, [newLang]: tData }));
                } catch (fetchErr) {
                    console.warn(`Firestore translation for ${newLang} failed, using local fallback.`);
                    tData = LOCAL_TRANSLATIONS[newLang];
                    if (tData) {
                        setTranslations(prev => ({ ...prev, [newLang]: tData }));
                    } else {
                        throw fetchErr;
                    }
                }
            }
            
            // Allow a full delay for the splash/transition CSS animation to finish
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            setLang(newLang);
            setTargetLang(null);
            setIsTransitioning(false);
        } catch (err) {
            console.error("Language Switch Error:", err);
            setError("Language not available yet.");
            setTargetLang(null);
            setIsTransitioning(false);
        }
    }, [lang, translations, isTransitioning]);

    const loginAdmin = async (email, password) => {
        const user = await firebaseLogin(email, password);
        setIsAdmin(true);
        return user;
    };

    const logoutAdmin = async () => {
        await firebaseLogout();
        setIsAdmin(false);
    };

    const updateData = async (partialData) => {
        const fullData = { ...portfolioData, ...partialData };
        const updated = await updateCmsContent(fullData);
        setPortfolioData(updated);
        return updated;
    };


    const value = {
        lang,
        targetLang,
        t: translations[lang] || {},
        targetT: translations[targetLang] || LOCAL_TRANSLATIONS[targetLang] || {},
        portfolio: portfolioData,
        isTransitioning,
        setIsTransitioning,
        isAdmin,
        isAuthLoading,
        error,
        changeLang: handleLangChange,
        loginAdmin,
        logoutAdmin,
        updateData,
        uploadImage
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};


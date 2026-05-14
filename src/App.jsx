import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/atoms/SplashScreen';
import Skeleton from './components/atoms/Skeleton';
import { usePortfolio } from './context/PortfolioContext';
import ProtectedRoute from './components/ProtectedRoute';

const Bio = lazy(() => import('./pages/Bio'));
const Home = lazy(() => import('./pages/Home'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function PortfolioLayout() {
    const { 
    t, 
    targetT,
    isTransitioning, 
    setIsTransitioning, 
    error 
  } = usePortfolio();

  const [view, setView] = useState('bio');
  const [nextView, setNextView] = useState(null);

  const handleViewChange = (target) => {
    if (isTransitioning) return;
    setNextView(target);
    setIsTransitioning(true);
  };

  useEffect(() => {
    if (isTransitioning && nextView) {
      const timer = setTimeout(() => {
        setView(nextView);
        setNextView(null);
        setTimeout(() => setIsTransitioning(false), 800);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextView, setIsTransitioning]);

  // Determine which greeting to show
  const activeGreeting = (targetT && targetT.greeting) || t.greeting || "Halo";

  return (
    <>
      <SplashScreen greeting={activeGreeting} isVisible={isTransitioning} />
      
      {error && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-washi border border-accent-error px-5 py-3 text-accent-error font-mono text-[11px] tracking-wide z-[1000] shadow-md animate-fade-in">
          {error}
        </div>
      )}

      <div className="relative w-full min-h-screen">
        <Suspense fallback={null}>
          <div key={view} className={`transition-opacity duration-700 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {view === 'bio' ? (
              <Bio onViewPortfolio={() => handleViewChange('portfolio')} />
            ) : (
              <Home onBackToBio={() => handleViewChange('bio')} /> 
            )}
          </div>
        </Suspense>
      </div>
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioLayout />} />
        <Route path="/admin/login" element={<Suspense fallback={null}><AdminLogin /></Suspense>} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Suspense fallback={null}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



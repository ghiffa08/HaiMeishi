import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const ProtectedRoute = ({ children }) => {
    const { isAdmin, isAuthLoading } = usePortfolio();

    if (isAuthLoading) {
        return (
            <div className="min-h-screen bg-washi flex items-center justify-center font-mono text-xs text-ink-faded animate-pulse">
                Verifying session...
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

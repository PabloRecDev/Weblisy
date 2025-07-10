import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCVMasterAuth } from '../contexts/CVMasterAuthContext';

const CVMasterProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, loading } = useCVMasterAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/assets/cv.png" 
              alt="CV Master"
              className="w-12 h-12 rounded-lg object-cover"
              style={{
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
              }}
            />
            <span 
              className="text-white text-xl"
              style={{ 
                fontFamily: 'Circular, "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: '24px',
                letterSpacing: '-0.01em'
              }}
            >
              cv master
            </span>
          </div>
          <div className="w-8 h-8 border-2 border-[#5e17eb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/cvmaster-login" state={{ from: location }} replace />;
  }

  return children;
};

export default CVMasterProtectedRoute; 

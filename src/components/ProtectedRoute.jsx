import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
    }

    if (!user) {
        return <Navigate to="/admin/login" />;
    }

    return children;
};

export default ProtectedRoute;

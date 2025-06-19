import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TEMPORAL: Permitir acceso sin autenticación para pruebas
        // Comentar las siguientes líneas cuando quieras activar la autenticación
        
        // Verificar si hay un usuario en localStorage
        const storedUser = localStorage.getItem('user');
        const storedSession = localStorage.getItem('session');

        if (storedUser && storedSession) {
            try {
                const userData = JSON.parse(storedUser);
                const sessionData = JSON.parse(storedSession);
                
                // Verificar si la sesión no ha expirado
                if (sessionData.expires_at && new Date(sessionData.expires_at * 1000) > new Date()) {
                    setUser(userData);
                } else {
                    // Sesión expirada, limpiar localStorage
                    localStorage.removeItem('user');
                    localStorage.removeItem('session');
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('session');
            }
        }
        
        // TEMPORAL: Simular usuario autenticado para pruebas
        setUser({ id: 'demo', email: 'demo@weblisy.com' });
        
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Verificando autenticación...</p>
                </div>
            </div>
        );
    }

    // TEMPORAL: Comentar esta línea para permitir acceso sin autenticación
    // if (!user) {
    //     return <Navigate to="/login" replace />;
    // }

    return children;
};

export default ProtectedRoute;

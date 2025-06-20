import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session && data.session.user) {
                setUser(data.session.user);
            } else {
                setUser(null);
            }
            setLoading(false);
        };
        checkSession();
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

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

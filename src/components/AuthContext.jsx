import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) console.error('Error al obtener sesión', error);
            setUser(session?.user || null);
            setIsLoading(false);
        };

        loadSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const value = {
        user,
        isLoading,
        signIn: async (email, password) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            // Esperamos el cambio de estado para que onAuthStateChange actualice el user
            return data.user;
        },
        signOut: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

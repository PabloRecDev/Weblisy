import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const CVMasterAuthContext = createContext({});

export const useCVMasterAuth = () => {
  const context = useContext(CVMasterAuthContext);
  if (!context) {
    throw new Error('useCVMasterAuth debe usarse dentro de CVMasterAuthProvider');
  }
  return context;
};

export const CVMasterAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener perfil del usuario desde la base de datos
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('cv_master_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Registro de usuario
  const signUp = async (email, password, firstName, lastName) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) {
        setError(error.message);
        return { error };
      }

      return { data };
    } catch (error) {
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Inicio de sesión
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return { error };
      }

      return { data };
    } catch (error) {
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Cerrar sesión
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        setError(error.message);
        return { error };
      }

      setUser(null);
      setProfile(null);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Iniciar sesión con Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/cvmasterApp`
        }
      });

      if (error) {
        setError(error.message);
        return { error };
      }

      return { data };
    } catch (error) {
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Iniciar sesión con GitHub
  const signInWithGitHub = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/cvmasterApp`
        }
      });

      if (error) {
        setError(error.message);
        return { error };
      }

      return { data };
    } catch (error) {
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Restablecer contraseña
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/cvmaster-reset-password`
      });

      if (error) {
        setError(error.message);
        return { error };
      }

      return { data };
    } catch (error) {
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar perfil de usuario
  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      const { data, error } = await supabase
        .from('cv_master_profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        setError(error.message);
        return { error };
      }

      setProfile(data);
      return { data };
    } catch (error) {
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Obtener estadísticas del usuario
  const getUserStats = async () => {
    try {
      if (!user) return null;

      const { data: cvs, error: cvsError } = await supabase
        .from('cvs')
        .select('id, status, downloads_count, views_count')
        .eq('user_id', user.id);

      if (cvsError) {
        console.error('Error fetching user stats:', cvsError);
        return null;
      }

      const stats = {
        totalCvs: cvs.length,
        completedCvs: cvs.filter(cv => cv.status === 'completed').length,
        inProgressCvs: cvs.filter(cv => cv.status === 'in_progress').length,
        draftCvs: cvs.filter(cv => cv.status === 'draft').length,
        totalDownloads: cvs.reduce((sum, cv) => sum + (cv.downloads_count || 0), 0),
        totalViews: cvs.reduce((sum, cv) => sum + (cv.views_count || 0), 0),
      };

      return stats;
    } catch (error) {
      console.error('Error getting user stats:', error);
      return null;
    }
  };

  // Verificar si el usuario tiene CVs
  const hasExistingCVs = async () => {
    try {
      if (!user) return false;

      const { count, error } = await supabase
        .from('cvs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error checking existing CVs:', error);
        return false;
      }

      return count > 0;
    } catch (error) {
      console.error('Error checking existing CVs:', error);
      return false;
    }
  };

  useEffect(() => {
    // Obtener sesión inicial
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setError(error.message);
          return;
        }

        if (session?.user) {
          setUser(session.user);
          const userProfile = await fetchUserProfile(session.user.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (session?.user) {
          setUser(session.user);
          const userProfile = await fetchUserProfile(session.user.id);
          setProfile(userProfile);
        } else {
          setUser(null);
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    profile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    signInWithGitHub,
    resetPassword,
    updateProfile,
    getUserStats,
    hasExistingCVs,
    isAuthenticated: !!user,
  };

  return (
    <CVMasterAuthContext.Provider value={value}>
      {children}
    </CVMasterAuthContext.Provider>
  );
}; 
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export const useCVData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener CV completo con todas las secciones
  const getCompleteCV = async (cvId) => {
    try {
      setLoading(true);
      setError(null);

      // Obtener datos del CV principal
      const { data: cvData, error: cvError } = await supabase
        .from('cvs')
        .select('*')
        .eq('id', cvId)
        .single();

      if (cvError) {
        setError(cvError.message);
        return null;
      }

      // Obtener información personal
      const { data: personalInfo, error: personalError } = await supabase
        .from('cv_personal_info')
        .select('*')
        .eq('cv_id', cvId)
        .single();

      // Obtener experiencia laboral
      const { data: workExperience, error: workError } = await supabase
        .from('cv_work_experience')
        .select('*')
        .eq('cv_id', cvId)
        .order('display_order', { ascending: true });

      // Obtener educación
      const { data: education, error: educationError } = await supabase
        .from('cv_education')
        .select('*')
        .eq('cv_id', cvId)
        .order('display_order', { ascending: true });

      // Obtener habilidades
      const { data: skills, error: skillsError } = await supabase
        .from('cv_skills')
        .select('*')
        .eq('cv_id', cvId)
        .order('display_order', { ascending: true });

      // Obtener proyectos
      const { data: projects, error: projectsError } = await supabase
        .from('cv_projects')
        .select('*')
        .eq('cv_id', cvId)
        .order('display_order', { ascending: true });

      // Obtener idiomas
      const { data: languages, error: languagesError } = await supabase
        .from('cv_languages')
        .select('*')
        .eq('cv_id', cvId)
        .order('display_order', { ascending: true });

      // Obtener certificaciones
      const { data: certifications, error: certificationsError } = await supabase
        .from('cv_certifications')
        .select('*')
        .eq('cv_id', cvId)
        .order('display_order', { ascending: true });

      // Obtener referencias
      const { data: references, error: referencesError } = await supabase
        .from('cv_references')
        .select('*')
        .eq('cv_id', cvId)
        .order('display_order', { ascending: true });

      // Compilar todos los datos
      const completeCV = {
        cv: cvData,
        personal_info: personalInfo,
        work_experience: workExperience || [],
        education: education || [],
        skills: skills || [],
        projects: projects || [],
        languages: languages || [],
        certifications: certifications || [],
        references: references || []
      };

      return completeCV;

    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Obtener múltiples CVs con información básica
  const getCVsWithBasicInfo = async (userId) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('cvs')
        .select(`
          *,
          cv_personal_info(first_name, last_name, email)
        `)
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) {
        setError(error.message);
        return [];
      }

      return data || [];

    } catch (error) {
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Incrementar contador de vistas
  const incrementViewCount = async (cvId) => {
    try {
      const { error } = await supabase.rpc('increment_view_count', { cv_id: cvId });
      if (error) {
        console.error('Error incrementing view count:', error);
      }
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  return {
    loading,
    error,
    getCompleteCV,
    getCVsWithBasicInfo,
    incrementViewCount
  };
}; 
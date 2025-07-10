import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useCVTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las plantillas activas
  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('cv_templates')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) {
        setError(error.message);
        return;
      }

      setTemplates(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener plantillas por categoría
  const getTemplatesByCategory = async (category) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('cv_templates')
        .select('*')
        .eq('is_active', true)
        .eq('category', category)
        .order('name');

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      return { data: data || [] };
    } catch (error) {
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Obtener una plantilla específica
  const getTemplate = async (templateId) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('cv_templates')
        .select('*')
        .eq('id', templateId)
        .eq('is_active', true)
        .single();

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      return { data };
    } catch (error) {
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Obtener plantillas gratuitas
  const getFreeTemplates = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('cv_templates')
        .select('*')
        .eq('is_active', true)
        .eq('is_premium', false)
        .order('name');

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      return { data: data || [] };
    } catch (error) {
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Obtener plantillas premium
  const getPremiumTemplates = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('cv_templates')
        .select('*')
        .eq('is_active', true)
        .eq('is_premium', true)
        .order('name');

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      return { data: data || [] };
    } catch (error) {
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Cargar plantillas automáticamente
  useEffect(() => {
    fetchTemplates();
  }, []);

  return {
    templates,
    loading,
    error,
    fetchTemplates,
    getTemplatesByCategory,
    getTemplate,
    getFreeTemplates,
    getPremiumTemplates
  };
}; 
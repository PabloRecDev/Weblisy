import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useCVMasterAuth } from '../contexts/CVMasterAuthContext';

export const useCVs = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useCVMasterAuth();

  // Obtener todos los CVs del usuario
  const fetchCVs = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      console.log('Fetching CVs for user:', user.id);

      const { data, error } = await supabase
        .from('cvs')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      console.log('Fetch CVs result:', { data, error });

      if (error) {
        console.error('Error fetching CVs:', error);
        setError(error.message);
        return;
      }

      setCvs(data || []);
    } catch (error) {
      console.error('Error in fetchCVs:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear un nuevo CV
  const createCV = async (cvData) => {
    if (!user) {
      setError('Usuario no autenticado');
      return { error: 'Usuario no autenticado' };
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Creating CV with data:', cvData);

      // Crear el CV principal
      const cvInsertData = {
        user_id: user.id,
        title: cvData.title,
        status: 'draft'
      };

      // Solo añadir template_id si se proporciona
      if (cvData.template_id) {
        cvInsertData.template_id = cvData.template_id;
      }

      console.log('CV insert data:', cvInsertData);

      const { data: cvResult, error: cvError } = await supabase
        .from('cvs')
        .insert([cvInsertData])
        .select()
        .single();

      console.log('CV creation result:', { cvResult, cvError });

      if (cvError) {
        console.error('Error creating CV:', cvError);
        console.error('Error details:', {
          message: cvError.message,
          details: cvError.details,
          hint: cvError.hint,
          code: cvError.code
        });
        
        let errorMessage = cvError.message;
        
        // Mensajes de error más amigables
        if (cvError.message.includes('policy')) {
          errorMessage = 'Error de permisos. Verifica que tu perfil esté configurado correctamente.';
        } else if (cvError.message.includes('foreign key')) {
          errorMessage = 'Error de relación de datos. Verifica que tu perfil de usuario existe.';
        } else if (cvError.message.includes('null value')) {
          errorMessage = 'Faltan datos requeridos. Verifica que todos los campos obligatorios estén completos.';
        }
        
        setError(errorMessage);
        return { error: errorMessage };
      }

      // Crear información personal si se proporciona
      if (cvData.personalInfo && cvResult) {
        console.log('Creating personal info:', cvData.personalInfo);
        
        const personalInfoData = {
          cv_id: cvResult.id,
          first_name: cvData.personalInfo.first_name || '',
          last_name: cvData.personalInfo.last_name || '',
          email: cvData.personalInfo.email || '',
          phone: cvData.personalInfo.phone || '',
          address: cvData.personalInfo.address || '',
          linkedin_url: cvData.personalInfo.linkedin_url || '',
          github_url: cvData.personalInfo.github_url || '',
          photo_url: cvData.personalInfo.photo_url || null
        };

        const { error: personalInfoError } = await supabase
          .from('cv_personal_info')
          .insert([personalInfoData]);

        if (personalInfoError) {
          console.error('Error creating personal info:', personalInfoError);
          setError(personalInfoError.message);
          return { error: personalInfoError.message };
        }
      }

      // Actualizar la lista local sin hacer consulta compleja
      setCvs(prev => [cvResult, ...prev]);

      return { data: cvResult };
    } catch (error) {
      console.error('Error in createCV:', error);
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Obtener un CV específico con toda su información
  const getCV = async (cvId) => {
    if (!user) {
      setError('Usuario no autenticado');
      return { error: 'Usuario no autenticado' };
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Getting CV:', cvId);

      // Obtener CV básico primero
      const { data: cvData, error: cvError } = await supabase
        .from('cvs')
        .select('*')
        .eq('id', cvId)
        .eq('user_id', user.id)
        .single();

      if (cvError) {
        console.error('Error getting CV:', cvError);
        setError(cvError.message);
        return { error: cvError.message };
      }

      // Obtener información personal
      const { data: personalInfo } = await supabase
        .from('cv_personal_info')
        .select('*')
        .eq('cv_id', cvId);

      // Combinar datos
      const combinedData = {
        ...cvData,
        cv_personal_info: personalInfo || [],
        cv_work_experience: [],
        cv_education: [],
        cv_skills: [],
        cv_projects: [],
        cv_languages: [],
        cv_certifications: [],
        cv_references: []
      };

      console.log('CV data retrieved:', combinedData);

      return { data: combinedData };
    } catch (error) {
      console.error('Error in getCV:', error);
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un CV
  const updateCV = async (cvId, updates) => {
    if (!user) {
      setError('Usuario no autenticado');
      return { error: 'Usuario no autenticado' };
    }

    try {
      setLoading(true);
      setError(null);

      // Separar actualizaciones del CV principal y de información personal
      const { personalInfo, ...cvUpdates } = updates;

      // Actualizar CV principal
      const { data, error } = await supabase
        .from('cvs')
        .update(cvUpdates)
        .eq('id', cvId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      // Actualizar información personal si se proporciona
      if (personalInfo) {
        console.log('Updating personal info:', personalInfo);
        
        const personalInfoData = {
          first_name: personalInfo.first_name || '',
          last_name: personalInfo.last_name || '',
          email: personalInfo.email || '',
          phone: personalInfo.phone || '',
          address: personalInfo.address || '',
          linkedin_url: personalInfo.linkedin_url || '',
          github_url: personalInfo.github_url || '',
          photo_url: personalInfo.photo_url || null
        };

        const { error: personalInfoError } = await supabase
          .from('cv_personal_info')
          .upsert([{
            cv_id: cvId,
            ...personalInfoData
          }], {
            onConflict: 'cv_id'
          });

        if (personalInfoError) {
          console.error('Error updating personal info:', personalInfoError);
          setError(personalInfoError.message);
          return { error: personalInfoError.message };
        }
      }

      // Actualizar la lista local de CVs
      await fetchCVs();

      return { data };
    } catch (error) {
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un CV
  const deleteCV = async (cvId) => {
    if (!user) {
      setError('Usuario no autenticado');
      return { error: 'Usuario no autenticado' };
    }

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('cvs')
        .delete()
        .eq('id', cvId)
        .eq('user_id', user.id);

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      // Actualizar la lista local de CVs
      await fetchCVs();

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Duplicar un CV
  const duplicateCV = async (cvId) => {
    if (!user) {
      setError('Usuario no autenticado');
      return { error: 'Usuario no autenticado' };
    }

    try {
      setLoading(true);
      setError(null);

      // Obtener el CV original con toda su información
      const { data: originalCV, error: fetchError } = await getCV(cvId);
      
      if (fetchError) {
        return { error: fetchError };
      }

      // Crear una copia del CV
      const { data: newCV, error: createError } = await supabase
        .from('cvs')
        .insert({
          user_id: user.id,
          title: `${originalCV.title} (Copia)`,
          status: 'draft',
          template_id: originalCV.template_id
        })
        .select()
        .single();

      if (createError) {
        setError(createError.message);
        return { error: createError.message };
      }

      // Copiar información personal
      if (originalCV.cv_personal_info && originalCV.cv_personal_info.length > 0) {
        const personalInfo = originalCV.cv_personal_info[0];
        const { error: personalError } = await supabase
          .from('cv_personal_info')
          .insert({
            cv_id: newCV.id,
            first_name: personalInfo.first_name,
            last_name: personalInfo.last_name,
            email: personalInfo.email,
            phone: personalInfo.phone,
            address: personalInfo.address,
            city: personalInfo.city,
            country: personalInfo.country,
            postal_code: personalInfo.postal_code,
            linkedin_url: personalInfo.linkedin_url,
            github_url: personalInfo.github_url,
            website_url: personalInfo.website_url,
            portfolio_url: personalInfo.portfolio_url,
            photo_url: personalInfo.photo_url,
            professional_summary: personalInfo.professional_summary
          });

        if (personalError) {
          console.error('Error copying personal info:', personalError);
        }
      }

      // Copiar experiencia laboral
      if (originalCV.cv_work_experience && originalCV.cv_work_experience.length > 0) {
        const workExperiences = originalCV.cv_work_experience.map(exp => ({
          cv_id: newCV.id,
          company_name: exp.company_name,
          position: exp.position,
          location: exp.location,
          start_date: exp.start_date,
          end_date: exp.end_date,
          is_current: exp.is_current,
          description: exp.description,
          achievements: exp.achievements,
          technologies: exp.technologies,
          display_order: exp.display_order
        }));

        const { error: workError } = await supabase
          .from('cv_work_experience')
          .insert(workExperiences);

        if (workError) {
          console.error('Error copying work experience:', workError);
        }
      }

      // Copiar educación
      if (originalCV.cv_education && originalCV.cv_education.length > 0) {
        const educations = originalCV.cv_education.map(edu => ({
          cv_id: newCV.id,
          institution: edu.institution,
          degree: edu.degree,
          field_of_study: edu.field_of_study,
          location: edu.location,
          start_date: edu.start_date,
          end_date: edu.end_date,
          is_current: edu.is_current,
          gpa: edu.gpa,
          description: edu.description,
          achievements: edu.achievements,
          display_order: edu.display_order
        }));

        const { error: educationError } = await supabase
          .from('cv_education')
          .insert(educations);

        if (educationError) {
          console.error('Error copying education:', educationError);
        }
      }

      // Copiar habilidades
      if (originalCV.cv_skills && originalCV.cv_skills.length > 0) {
        const skills = originalCV.cv_skills.map(skill => ({
          cv_id: newCV.id,
          category: skill.category,
          skill_name: skill.skill_name,
          level: skill.level,
          years_experience: skill.years_experience,
          display_order: skill.display_order
        }));

        const { error: skillsError } = await supabase
          .from('cv_skills')
          .insert(skills);

        if (skillsError) {
          console.error('Error copying skills:', skillsError);
        }
      }

      // Actualizar la lista local de CVs
      await fetchCVs();

      return { data: newCV };
    } catch (error) {
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Cargar CVs automáticamente cuando el usuario cambie
  useEffect(() => {
    if (user) {
      fetchCVs();
    } else {
      setCvs([]);
    }
  }, [user]);

  return {
    cvs,
    loading,
    error,
    fetchCVs,
    createCV,
    getCV,
    updateCV,
    deleteCV,
    duplicateCV
  };
};

// Hook para manejar información personal de CV
export const useCVPersonalInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useCVMasterAuth();

  const updatePersonalInfo = async (cvId, personalInfo) => {
    if (!user) {
      setError('Usuario no autenticado');
      return { error: 'Usuario no autenticado' };
    }

    try {
      setLoading(true);
      setError(null);

      // Verificar si ya existe información personal para este CV
      const { data: existing, error: checkError } = await supabase
        .from('cv_personal_info')
        .select('id')
        .eq('cv_id', cvId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        setError(checkError.message);
        return { error: checkError.message };
      }

      let result;
      if (existing) {
        // Actualizar información existente
        const { data, error } = await supabase
          .from('cv_personal_info')
          .update(personalInfo)
          .eq('cv_id', cvId)
          .select()
          .single();

        if (error) {
          setError(error.message);
          return { error: error.message };
        }
        result = data;
      } else {
        // Crear nueva información personal
        const { data, error } = await supabase
          .from('cv_personal_info')
          .insert({
            cv_id: cvId,
            ...personalInfo
          })
          .select()
          .single();

        if (error) {
          setError(error.message);
          return { error: error.message };
        }
        result = data;
      }

      return { data: result };
    } catch (error) {
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updatePersonalInfo
  };
};

// Hook para manejar experiencia laboral
export const useCVWorkExperience = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useCVMasterAuth();

  const addWorkExperience = async (cvId, experience) => {
    if (!user) {
      setError('Usuario no autenticado');
      return { error: 'Usuario no autenticado' };
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('cv_work_experience')
        .insert({
          cv_id: cvId,
          ...experience
        })
        .select()
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

  const updateWorkExperience = async (experienceId, updates) => {
    if (!user) {
      setError('Usuario no autenticado');
      return { error: 'Usuario no autenticado' };
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('cv_work_experience')
        .update(updates)
        .eq('id', experienceId)
        .select()
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

  const deleteWorkExperience = async (experienceId) => {
    if (!user) {
      setError('Usuario no autenticado');
      return { error: 'Usuario no autenticado' };
    }

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('cv_work_experience')
        .delete()
        .eq('id', experienceId);

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    addWorkExperience,
    updateWorkExperience,
    deleteWorkExperience
  };
}; 
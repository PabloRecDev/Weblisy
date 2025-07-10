-- Función para incrementar contador de descargas
CREATE OR REPLACE FUNCTION increment_download_count(cv_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE cvs 
  SET downloads_count = COALESCE(downloads_count, 0) + 1,
      last_exported_at = NOW()
  WHERE id = cv_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para incrementar contador de vistas
CREATE OR REPLACE FUNCTION increment_view_count(cv_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE cvs 
  SET views_count = COALESCE(views_count, 0) + 1
  WHERE id = cv_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener CV completo con todas las secciones
CREATE OR REPLACE FUNCTION get_complete_cv(cv_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'cv', cv_data,
    'personal_info', personal_info,
    'work_experience', work_experience,
    'education', education,
    'skills', skills,
    'projects', projects,
    'languages', languages,
    'certifications', certifications,
    'references', cv_references
  ) INTO result
  FROM (
    SELECT 
      to_json(c.*) as cv_data,
      to_json(pi.*) as personal_info,
      COALESCE(json_agg(DISTINCT we.*) FILTER (WHERE we.id IS NOT NULL), '[]'::json) as work_experience,
      COALESCE(json_agg(DISTINCT ed.*) FILTER (WHERE ed.id IS NOT NULL), '[]'::json) as education,
      COALESCE(json_agg(DISTINCT sk.*) FILTER (WHERE sk.id IS NOT NULL), '[]'::json) as skills,
      COALESCE(json_agg(DISTINCT pr.*) FILTER (WHERE pr.id IS NOT NULL), '[]'::json) as projects,
      COALESCE(json_agg(DISTINCT ln.*) FILTER (WHERE ln.id IS NOT NULL), '[]'::json) as languages,
      COALESCE(json_agg(DISTINCT cert.*) FILTER (WHERE cert.id IS NOT NULL), '[]'::json) as certifications,
      COALESCE(json_agg(DISTINCT ref.*) FILTER (WHERE ref.id IS NOT NULL), '[]'::json) as cv_references
    FROM cvs c
    LEFT JOIN cv_personal_info pi ON c.id = pi.cv_id
    LEFT JOIN cv_work_experience we ON c.id = we.cv_id
    LEFT JOIN cv_education ed ON c.id = ed.cv_id
    LEFT JOIN cv_skills sk ON c.id = sk.cv_id
    LEFT JOIN cv_projects pr ON c.id = pr.cv_id
    LEFT JOIN cv_languages ln ON c.id = ln.cv_id
    LEFT JOIN cv_certifications cert ON c.id = cert.cv_id
    LEFT JOIN cv_references ref ON c.id = ref.cv_id
    WHERE c.id = cv_id
    GROUP BY c.id, pi.id
  ) AS subquery;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
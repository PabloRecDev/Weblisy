-- Funciones SQL para exportación PDF - Versión simplificada

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
-- Añadir campo photo_url a la tabla cv_personal_info
ALTER TABLE cv_personal_info 
ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Comentario sobre el campo
COMMENT ON COLUMN cv_personal_info.photo_url IS 'URL de la foto de perfil del CV (base64 o URL externa)'; 
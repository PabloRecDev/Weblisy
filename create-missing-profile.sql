-- Crear perfil para el usuario existente que no tiene perfil
-- ID del usuario problemático: 913ba13b-6555-4560-9ed9-4af6e0c71439

-- Verificar si el usuario existe en auth.users
SELECT id, email, raw_user_meta_data FROM auth.users 
WHERE id = '913ba13b-6555-4560-9ed9-4af6e0c71439';

-- Insertar perfil si no existe
INSERT INTO cv_master_profiles (
    id,
    first_name,
    last_name,
    email
)
SELECT 
    u.id,
    COALESCE(u.raw_user_meta_data->>'first_name', 'Usuario'),
    COALESCE(u.raw_user_meta_data->>'last_name', ''),
    u.email
FROM auth.users u
WHERE u.id = '913ba13b-6555-4560-9ed9-4af6e0c71439'
  AND NOT EXISTS (
    SELECT 1 FROM cv_master_profiles p WHERE p.id = u.id
  );

-- Verificar que se creó correctamente
SELECT * FROM cv_master_profiles 
WHERE id = '913ba13b-6555-4560-9ed9-4af6e0c71439'; 
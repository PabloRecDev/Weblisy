-- Script para crear un usuario de prueba con perfil

-- Nota: Este script debe ejecutarse después de que el usuario se haya registrado manualmente
-- en la aplicación usando el email de prueba: test@weblisy.com

-- 1. Verificar el usuario actual
SELECT 
    auth.uid() as current_user_id,
    auth.email() as current_user_email;

-- 2. Crear perfil para el usuario actual (modificar según sea necesario)
INSERT INTO cv_master_profiles (
    id, 
    first_name, 
    last_name, 
    email, 
    phone, 
    profession, 
    location, 
    bio,
    linkedin_url,
    github_url,
    website_url
)
VALUES (
    auth.uid(),
    'Usuario',
    'Prueba',
    auth.email(),
    '+34 123 456 789',
    'Desarrollador Full Stack',
    'Madrid, España',
    'Desarrollador con experiencia en React, Node.js y bases de datos.',
    'https://linkedin.com/in/usuario-prueba',
    'https://github.com/usuario-prueba',
    'https://weblisy.com'
)
ON CONFLICT (id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    profession = EXCLUDED.profession,
    location = EXCLUDED.location,
    bio = EXCLUDED.bio,
    linkedin_url = EXCLUDED.linkedin_url,
    github_url = EXCLUDED.github_url,
    website_url = EXCLUDED.website_url,
    updated_at = CURRENT_TIMESTAMP;

-- 3. Verificar que el perfil fue creado
SELECT 
    id, 
    first_name, 
    last_name, 
    email, 
    phone, 
    profession, 
    location, 
    bio,
    created_at,
    updated_at
FROM cv_master_profiles 
WHERE id = auth.uid();

-- 4. Crear un CV de prueba
INSERT INTO cvs (
    user_id,
    title,
    status,
    template_id
)
VALUES (
    auth.uid(),
    'Desarrollador Full Stack - CV Principal',
    'draft',
    1
);

-- 5. Obtener el ID del CV creado
SELECT 
    id,
    title,
    status,
    created_at
FROM cvs
WHERE user_id = auth.uid()
ORDER BY created_at DESC
LIMIT 1; 
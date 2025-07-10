-- Script para configurar un usuario específico manualmente
-- IMPORTANTE: Reemplaza 'USER_ID_AQUI' con el ID real del usuario

-- 1. Verificar usuarios disponibles
SELECT 
    'USUARIOS DISPONIBLES' as tipo,
    id,
    email,
    created_at,
    last_sign_in_at
FROM auth.users 
ORDER BY created_at DESC
LIMIT 10;

-- 2. Configurar usuario específico (REEMPLAZA 'USER_ID_AQUI' con el ID real)
-- Ejemplo: '913ba13b-6555-4560-9ed9-4af6e0c71439'

-- Crear perfil para usuario específico
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
SELECT 
    'USER_ID_AQUI', -- REEMPLAZA CON EL ID REAL
    'Usuario',
    'CV Master',
    (SELECT email FROM auth.users WHERE id = 'USER_ID_AQUI'),
    '+34 000 000 000',
    'Profesional',
    'España',
    'Perfil creado manualmente para CV Master',
    'https://linkedin.com/in/usuario',
    'https://github.com/usuario',
    'https://weblisy.com'
WHERE NOT EXISTS (
    SELECT 1 FROM cv_master_profiles WHERE id = 'USER_ID_AQUI'
)
ON CONFLICT (id) DO UPDATE SET
    updated_at = CURRENT_TIMESTAMP;

-- 3. Verificar que se creó el perfil
SELECT 
    'PERFIL CREADO' as tipo,
    id,
    first_name,
    last_name,
    email,
    phone,
    profession,
    location,
    created_at
FROM cv_master_profiles 
WHERE id = 'USER_ID_AQUI';

-- 4. Crear CV de prueba para el usuario
INSERT INTO cvs (user_id, title, status)
VALUES (
    'USER_ID_AQUI', -- REEMPLAZA CON EL ID REAL
    'CV de Prueba - ' || to_char(now(), 'DD/MM/YYYY HH24:MI:SS'), 
    'draft'
)
RETURNING id, title, status, user_id, created_at;

-- 5. Verificar CVs del usuario
SELECT 
    'CVS DEL USUARIO' as tipo,
    id,
    title,
    status,
    views_count,
    downloads_count,
    created_at
FROM cvs 
WHERE user_id = 'USER_ID_AQUI'
ORDER BY created_at DESC;

-- 6. Verificación final
SELECT 
    'VERIFICACIÓN FINAL' as tipo,
    'Usuario configurado manualmente' as mensaje,
    'USER_ID_AQUI' as user_id,
    (SELECT email FROM auth.users WHERE id = 'USER_ID_AQUI') as user_email,
    (SELECT count(*) FROM cv_master_profiles WHERE id = 'USER_ID_AQUI') as tiene_perfil,
    (SELECT count(*) FROM cvs WHERE user_id = 'USER_ID_AQUI') as total_cvs; 
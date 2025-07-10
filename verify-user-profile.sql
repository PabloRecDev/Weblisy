-- Script para verificar y crear perfil de usuario

-- 1. Verificar si el usuario autenticado tiene perfil
SELECT 
    auth.uid() as user_id,
    CASE 
        WHEN EXISTS (SELECT 1 FROM cv_master_profiles WHERE id = auth.uid()) 
        THEN 'Perfil existe' 
        ELSE 'Perfil NO existe' 
    END as profile_status;

-- 2. Ver detalles del perfil si existe
SELECT id, first_name, last_name, email, phone, profession, location, created_at
FROM cv_master_profiles 
WHERE id = auth.uid();

-- 3. Crear perfil si no existe (modificar datos según sea necesario)
INSERT INTO cv_master_profiles (
    id, 
    first_name, 
    last_name, 
    email, 
    phone, 
    profession, 
    location, 
    bio
)
SELECT 
    auth.uid(),
    'Usuario',
    'Prueba',
    auth.email(),
    '',
    'Desarrollador',
    'Madrid',
    'Perfil de prueba'
WHERE NOT EXISTS (
    SELECT 1 FROM cv_master_profiles WHERE id = auth.uid()
);

-- 4. Verificar que la inserción fue exitosa
SELECT 
    auth.uid() as user_id,
    CASE 
        WHEN EXISTS (SELECT 1 FROM cv_master_profiles WHERE id = auth.uid()) 
        THEN 'Perfil creado/existe' 
        ELSE 'Error: Perfil NO existe' 
    END as profile_status;

-- 5. Verificar políticas RLS para cv_master_profiles
SELECT policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'cv_master_profiles';

-- 6. Verificar políticas RLS para cvs
SELECT policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'cvs'; 
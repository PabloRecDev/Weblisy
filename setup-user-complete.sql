-- Script completo para configurar el usuario y resolver el problema de CV creation

-- PASO 1: Verificar usuario actual y estado
SELECT 
    auth.uid() as user_id,
    auth.email() as user_email,
    'Verificando usuario autenticado' as status;

-- PASO 2: Crear perfil si no existe
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
    'CV Master',
    auth.email(),
    '+34 000 000 000',
    'Profesional',
    'España',
    'Perfil creado automáticamente'
WHERE NOT EXISTS (
    SELECT 1 FROM cv_master_profiles WHERE id = auth.uid()
)
RETURNING id, first_name, last_name, email, created_at;

-- PASO 3: Verificar que el perfil existe
SELECT 
    id,
    first_name,
    last_name,
    email,
    phone,
    profession,
    location,
    created_at
FROM cv_master_profiles 
WHERE id = auth.uid();

-- PASO 4: Verificar políticas RLS
SELECT 
    'cvs' as tabla,
    policyname,
    cmd,
    roles
FROM pg_policies 
WHERE tablename = 'cvs'
UNION ALL
SELECT 
    'cv_master_profiles' as tabla,
    policyname,
    cmd,
    roles
FROM pg_policies 
WHERE tablename = 'cv_master_profiles'
ORDER BY tabla, policyname;

-- PASO 5: Probar creación de CV de prueba
INSERT INTO cvs (user_id, title, status)
VALUES (
    auth.uid(), 
    'CV de Prueba - ' || to_char(now(), 'DD/MM/YYYY HH24:MI'), 
    'draft'
)
RETURNING id, title, status, user_id, created_at;

-- PASO 6: Verificar CVs existentes
SELECT 
    id,
    title,
    status,
    views_count,
    downloads_count,
    created_at,
    updated_at
FROM cvs 
WHERE user_id = auth.uid()
ORDER BY created_at DESC;

-- PASO 7: Limpiar CVs de prueba (ejecutar solo si quieres limpiar)
-- DELETE FROM cvs WHERE user_id = auth.uid() AND title LIKE 'CV de Prueba -%';

-- PASO 8: Verificación final
SELECT 
    'OK' as status,
    'Usuario configurado correctamente' as mensaje,
    auth.uid() as user_id,
    (SELECT count(*) FROM cv_master_profiles WHERE id = auth.uid()) as tiene_perfil,
    (SELECT count(*) FROM cvs WHERE user_id = auth.uid()) as total_cvs; 
-- Script para verificar la configuración de Supabase

-- 1. Verificar que las tablas existen
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('cv_master_profiles', 'cvs', 'cv_personal_info');

-- 2. Verificar que el usuario actual existe en cv_master_profiles
SELECT id, first_name, last_name, email 
FROM cv_master_profiles 
WHERE id = auth.uid();

-- 3. Verificar políticas RLS en la tabla cvs
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'cvs';

-- 4. Verificar que RLS está habilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('cvs', 'cv_personal_info', 'cv_master_profiles');

-- 5. Probar inserción simple en cvs (ejecutar solo si tienes perfil)
-- INSERT INTO cvs (user_id, title, status) 
-- VALUES (auth.uid(), 'Test CV', 'draft');

-- 6. Verificar estructura de la tabla cvs
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'cvs' 
ORDER BY ordinal_position; 
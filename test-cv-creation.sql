-- Script de prueba para verificar la creación de CVs

-- 1. Verificar usuario actual
SELECT 
    auth.uid() as user_id,
    auth.email() as user_email,
    'Usuario actual' as description;

-- 2. Verificar que existe el perfil
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM cv_master_profiles WHERE id = auth.uid()) 
        THEN 'SÍ' 
        ELSE 'NO' 
    END as "Tiene perfil",
    CASE 
        WHEN EXISTS (SELECT 1 FROM cv_master_profiles WHERE id = auth.uid()) 
        THEN (SELECT first_name || ' ' || last_name FROM cv_master_profiles WHERE id = auth.uid())
        ELSE 'Sin perfil'
    END as "Nombre completo";

-- 3. Verificar políticas RLS activas
SELECT 
    tablename,
    policyname,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'cvs' 
  AND policyname LIKE '%create%';

-- 4. Probar creación de CV simple
-- IMPORTANTE: Ejecutar este bloque solo si los pasos anteriores son exitosos
INSERT INTO cvs (user_id, title, status)
VALUES (auth.uid(), 'Test CV - ' || to_char(now(), 'YYYY-MM-DD HH24:MI:SS'), 'draft')
RETURNING id, title, status, user_id, created_at;

-- 5. Verificar que se creó correctamente
SELECT 
    id,
    title,
    status,
    user_id,
    created_at
FROM cvs 
WHERE user_id = auth.uid()
ORDER BY created_at DESC
LIMIT 1;

-- 6. Limpiar datos de prueba (opcional)
-- DELETE FROM cvs WHERE user_id = auth.uid() AND title LIKE 'Test CV -%'; 
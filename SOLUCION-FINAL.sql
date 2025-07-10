-- ===================================================================
-- SOLUCIÓN FINAL PARA CV MASTER
-- ===================================================================
-- Usuario: contacto@weblisy.es
-- ID: 913ba13b-6555-4560-9ed9-4af6e0c71439
-- ===================================================================

-- PASO 1: Configurar políticas RLS
ALTER TABLE cv_master_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_personal_info ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Users can view own profile" ON cv_master_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON cv_master_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON cv_master_profiles;

DROP POLICY IF EXISTS "Users can view own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can create own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can update own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can delete own CVs" ON cvs;

DROP POLICY IF EXISTS "Users can view own personal info" ON cv_personal_info;
DROP POLICY IF EXISTS "Users can create own personal info" ON cv_personal_info;
DROP POLICY IF EXISTS "Users can update own personal info" ON cv_personal_info;
DROP POLICY IF EXISTS "Users can delete own personal info" ON cv_personal_info;

-- Crear políticas para cv_master_profiles
CREATE POLICY "Users can view own profile" ON cv_master_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON cv_master_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON cv_master_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Crear políticas para cvs
CREATE POLICY "Users can view own CVs" ON cvs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own CVs" ON cvs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs" ON cvs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own CVs" ON cvs
    FOR DELETE USING (auth.uid() = user_id);

-- Crear políticas para cv_personal_info
CREATE POLICY "Users can view own personal info" ON cv_personal_info
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM cvs 
            WHERE cvs.id = cv_personal_info.cv_id 
            AND cvs.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create own personal info" ON cv_personal_info
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM cvs 
            WHERE cvs.id = cv_personal_info.cv_id 
            AND cvs.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own personal info" ON cv_personal_info
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM cvs 
            WHERE cvs.id = cv_personal_info.cv_id 
            AND cvs.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own personal info" ON cv_personal_info
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM cvs 
            WHERE cvs.id = cv_personal_info.cv_id 
            AND cvs.user_id = auth.uid()
        )
    );

SELECT 'PASO 1 COMPLETADO: Políticas RLS configuradas' as status;

-- PASO 2: Crear perfil para el usuario específico
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
    '913ba13b-6555-4560-9ed9-4af6e0c71439',
    'Usuario',
    'CV Master',
    'contacto@weblisy.es',
    '+34 000 000 000',
    'Profesional',
    'España',
    'Perfil creado automáticamente para CV Master',
    'https://linkedin.com/in/weblisy',
    'https://github.com/weblisy',
    'https://weblisy.com'
WHERE NOT EXISTS (
    SELECT 1 FROM cv_master_profiles WHERE id = '913ba13b-6555-4560-9ed9-4af6e0c71439'
)
ON CONFLICT (id) DO UPDATE SET
    updated_at = CURRENT_TIMESTAMP;

SELECT 'PASO 2 COMPLETADO: Perfil de usuario creado' as status;

-- PASO 3: Verificar perfil creado
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
WHERE id = '913ba13b-6555-4560-9ed9-4af6e0c71439';

-- PASO 4: Crear CV de prueba
INSERT INTO cvs (user_id, title, status)
VALUES (
    '913ba13b-6555-4560-9ed9-4af6e0c71439',
    'CV de Prueba - ' || to_char(now(), 'DD/MM/YYYY HH24:MI:SS'), 
    'draft'
)
RETURNING id, title, status, user_id, created_at;

-- PASO 5: Verificar CVs existentes
SELECT 
    'CVS EXISTENTES' as tipo,
    id,
    title,
    status,
    views_count,
    downloads_count,
    created_at
FROM cvs 
WHERE user_id = '913ba13b-6555-4560-9ed9-4af6e0c71439'
ORDER BY created_at DESC;

-- PASO 6: Verificación final
SELECT 
    'VERIFICACIÓN FINAL' as tipo,
    'Configuración completada exitosamente' as mensaje,
    '913ba13b-6555-4560-9ed9-4af6e0c71439' as user_id,
    'contacto@weblisy.es' as user_email,
    (SELECT count(*) FROM cv_master_profiles WHERE id = '913ba13b-6555-4560-9ed9-4af6e0c71439') as tiene_perfil,
    (SELECT count(*) FROM cvs WHERE user_id = '913ba13b-6555-4560-9ed9-4af6e0c71439') as total_cvs,
    now() as fecha_configuracion;

SELECT '¡CONFIGURACIÓN COMPLETADA! Ahora puedes probar la aplicación.' as resultado_final; 
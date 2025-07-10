-- ===================================================================
-- SOLUCIÓN COMPLETA PARA ERROR 400 EN CV MASTER
-- ===================================================================
-- Ejecutar este script completo en Supabase SQL Editor
-- ===================================================================

-- VERIFICACIÓN INICIAL
SELECT 
    'INICIO - Verificación de usuario' as paso,
    auth.uid() as user_id,
    auth.email() as user_email,
    CASE 
        WHEN auth.uid() IS NULL THEN 'ERROR: Usuario no autenticado'
        ELSE 'OK: Usuario autenticado'
    END as status;

-- ===================================================================
-- PASO 1: CONFIGURAR ROW LEVEL SECURITY
-- ===================================================================

-- Habilitar RLS en todas las tablas
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

-- ===================================================================
-- PASO 2: CREAR PERFIL DE USUARIO
-- ===================================================================

-- Crear perfil si no existe
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
    auth.uid(),
    'Usuario',
    'CV Master',
    auth.email(),
    '+34 000 000 000',
    'Profesional',
    'España',
    'Perfil creado automáticamente para CV Master',
    'https://linkedin.com/in/usuario',
    'https://github.com/usuario',
    'https://weblisy.com'
WHERE NOT EXISTS (
    SELECT 1 FROM cv_master_profiles WHERE id = auth.uid()
)
ON CONFLICT (id) DO UPDATE SET
    updated_at = CURRENT_TIMESTAMP;

SELECT 'PASO 2 COMPLETADO: Perfil de usuario verificado/creado' as status;

-- ===================================================================
-- PASO 3: VERIFICAR CONFIGURACIÓN
-- ===================================================================

-- Verificar perfil
SELECT 
    'PERFIL' as tipo,
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

-- Verificar políticas activas
SELECT 
    'POLÍTICAS' as tipo,
    tablename,
    policyname,
    cmd,
    roles
FROM pg_policies 
WHERE tablename IN ('cv_master_profiles', 'cvs', 'cv_personal_info')
ORDER BY tablename, policyname;

-- ===================================================================
-- PASO 4: PRUEBA DE FUNCIONAMIENTO
-- ===================================================================

-- Probar creación de CV
INSERT INTO cvs (user_id, title, status)
VALUES (
    auth.uid(), 
    'CV de Prueba - ' || to_char(now(), 'DD/MM/YYYY HH24:MI:SS'), 
    'draft'
)
RETURNING id, title, status, user_id, created_at;

-- Verificar CVs existentes
SELECT 
    'CVS EXISTENTES' as tipo,
    id,
    title,
    status,
    views_count,
    downloads_count,
    created_at
FROM cvs 
WHERE user_id = auth.uid()
ORDER BY created_at DESC;

-- ===================================================================
-- PASO 5: VERIFICACIÓN FINAL
-- ===================================================================

SELECT 
    'VERIFICACIÓN FINAL' as tipo,
    'OK - Configuración completada exitosamente' as mensaje,
    auth.uid() as user_id,
    auth.email() as user_email,
    (SELECT count(*) FROM cv_master_profiles WHERE id = auth.uid()) as tiene_perfil,
    (SELECT count(*) FROM cvs WHERE user_id = auth.uid()) as total_cvs,
    now() as fecha_configuracion;

-- ===================================================================
-- LIMPIEZA (OPCIONAL)
-- ===================================================================
-- Si quieres eliminar los CVs de prueba, descomenta la siguiente línea:
-- DELETE FROM cvs WHERE user_id = auth.uid() AND title LIKE 'CV de Prueba -%';

SELECT 'SCRIPT COMPLETADO - Verifica que todo funcione correctamente' as resultado_final; 
-- ===================================================================
-- SOLUCIÓN PARA ERROR: null value in column "id" 
-- ===================================================================
-- Este error ocurre porque auth.uid() devuelve NULL
-- ===================================================================

-- PASO 1: Verificar usuarios disponibles
SELECT 
    'USUARIOS DISPONIBLES' as tipo,
    id,
    email,
    created_at,
    last_sign_in_at
FROM auth.users 
ORDER BY created_at DESC
LIMIT 5;

-- PASO 2: Configurar políticas RLS (sin depender de auth.uid())
-- Habilitar RLS
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

SELECT 'PASO 2 COMPLETADO: Políticas RLS configuradas' as status;

-- PASO 3: Crear perfil para el usuario específico
-- REEMPLAZA 'USER_ID_AQUI' con el ID real del usuario de la lista anterior

-- Ejemplo: Si el usuario es '913ba13b-6555-4560-9ed9-4af6e0c71439'
-- Cambia 'USER_ID_AQUI' por '913ba13b-6555-4560-9ed9-4af6e0c71439'

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
    'USER_ID_AQUI', -- REEMPLAZA CON EL ID REAL DEL USUARIO
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

-- PASO 4: Verificar perfil creado
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

-- PASO 5: Crear CV de prueba
INSERT INTO cvs (user_id, title, status)
VALUES (
    'USER_ID_AQUI', -- REEMPLAZA CON EL ID REAL
    'CV de Prueba - ' || to_char(now(), 'DD/MM/YYYY HH24:MI:SS'), 
    'draft'
)
RETURNING id, title, status, user_id, created_at;

-- PASO 6: Verificación final
SELECT 
    'VERIFICACIÓN FINAL' as tipo,
    'Usuario configurado correctamente' as mensaje,
    'USER_ID_AQUI' as user_id,
    (SELECT email FROM auth.users WHERE id = 'USER_ID_AQUI') as user_email,
    (SELECT count(*) FROM cv_master_profiles WHERE id = 'USER_ID_AQUI') as tiene_perfil,
    (SELECT count(*) FROM cvs WHERE user_id = 'USER_ID_AQUI') as total_cvs;

SELECT 'SCRIPT COMPLETADO - Reemplaza USER_ID_AQUI con el ID real del usuario' as instruccion_final; 
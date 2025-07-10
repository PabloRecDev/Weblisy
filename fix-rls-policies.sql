-- Script para configurar las políticas RLS correctamente

-- 1. Habilitar RLS en todas las tablas
ALTER TABLE cv_master_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_personal_info ENABLE ROW LEVEL SECURITY;

-- 2. Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Users can view own profile" ON cv_master_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON cv_master_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON cv_master_profiles;

DROP POLICY IF EXISTS "Users can view own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can create own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can update own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can delete own CVs" ON cvs;

DROP POLICY IF EXISTS "Users can view own personal info" ON cv_personal_info;
DROP POLICY IF EXISTS "Users can create own personal info" ON cv_personal_info;
DROP POLICY IF EXISTS "Users can update own personal info" ON cv_personal_info;
DROP POLICY IF EXISTS "Users can delete own personal info" ON cv_personal_info;

-- 3. Crear políticas para cv_master_profiles
CREATE POLICY "Users can view own profile" ON cv_master_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON cv_master_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON cv_master_profiles
    FOR UPDATE USING (auth.uid() = id);

-- 4. Crear políticas para cvs
CREATE POLICY "Users can view own CVs" ON cvs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own CVs" ON cvs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs" ON cvs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own CVs" ON cvs
    FOR DELETE USING (auth.uid() = user_id);

-- 5. Crear políticas para cv_personal_info
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

-- 6. Verificar que las políticas están creadas
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual 
FROM pg_policies 
WHERE tablename IN ('cv_master_profiles', 'cvs', 'cv_personal_info')
ORDER BY tablename, policyname; 
-- ===================================================================
-- SOLUCIÓN ÚLTIMA FINAL PARA CV MASTER
-- ===================================================================
-- Incluye: Configuración RLS + Usuario + Fix de Triggers con CASCADE
-- ===================================================================

-- PASO 1: Verificar usuario
SELECT 
    'USUARIO CONFIGURADO' as tipo,
    'contacto@weblisy.es' as email,
    '913ba13b-6555-4560-9ed9-4af6e0c71439' as user_id;

-- PASO 2: Configurar políticas RLS
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

-- PASO 3: Eliminar triggers y funciones con CASCADE
DROP TRIGGER IF EXISTS set_cv_slug ON cvs CASCADE;
DROP TRIGGER IF EXISTS update_cv_slug ON cvs CASCADE;
DROP TRIGGER IF EXISTS set_cv_slug_trigger ON cvs CASCADE;
DROP TRIGGER IF EXISTS trigger_set_cv_slug ON cvs CASCADE;

-- Eliminar funciones (CASCADE eliminará dependencias)
DROP FUNCTION IF EXISTS generate_unique_slug(text, uuid) CASCADE;
DROP FUNCTION IF EXISTS set_cv_slug() CASCADE;

SELECT 'PASO 3 COMPLETADO: Triggers y funciones eliminadas con CASCADE' as status;

-- PASO 4: Crear función corregida para generar slugs únicos
CREATE OR REPLACE FUNCTION generate_unique_slug(title_text text, user_uuid uuid)
RETURNS text AS $$
DECLARE
    base_slug text;
    final_slug text;
    counter integer := 1;
BEGIN
    -- Generar slug base
    base_slug := lower(regexp_replace(title_text, '[^a-zA-Z0-9\s]', '', 'g'));
    base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
    base_slug := trim(both '-' from base_slug);
    
    -- Si el slug está vacío, usar un valor por defecto
    IF base_slug = '' THEN
        base_slug := 'cv';
    END IF;
    
    final_slug := base_slug;
    
    -- Verificar si el slug ya existe para este usuario
    WHILE EXISTS (
        SELECT 1 FROM cvs 
        WHERE slug = final_slug 
        AND cvs.user_id = user_uuid
    ) LOOP
        final_slug := base_slug || '-' || counter;
        counter := counter + 1;
    END LOOP;
    
    RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- PASO 5: Crear trigger corregido
CREATE OR REPLACE FUNCTION set_cv_slug()
RETURNS trigger AS $$
BEGIN
    -- Solo generar slug si no se proporciona uno
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := generate_unique_slug(NEW.title, NEW.user_id);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- PASO 6: Crear trigger
CREATE TRIGGER set_cv_slug_trigger
    BEFORE INSERT OR UPDATE ON cvs
    FOR EACH ROW
    EXECUTE FUNCTION set_cv_slug();

SELECT 'PASO 6 COMPLETADO: Triggers corregidos' as status;

-- PASO 7: Crear perfil para el usuario específico
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

SELECT 'PASO 7 COMPLETADO: Perfil de usuario creado' as status;

-- PASO 8: Verificar perfil creado
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

-- PASO 9: Crear CV de prueba
INSERT INTO cvs (user_id, title, status)
VALUES (
    '913ba13b-6555-4560-9ed9-4af6e0c71439',
    'CV de Prueba - ' || to_char(now(), 'DD/MM/YYYY HH24:MI:SS'), 
    'draft'
)
RETURNING id, title, status, user_id, slug, created_at;

-- PASO 10: Verificar CVs existentes
SELECT 
    'CVS EXISTENTES' as tipo,
    id,
    title,
    slug,
    status,
    views_count,
    downloads_count,
    created_at
FROM cvs 
WHERE user_id = '913ba13b-6555-4560-9ed9-4af6e0c71439'
ORDER BY created_at DESC;

-- PASO 11: Verificación final
SELECT 
    'VERIFICACIÓN FINAL' as tipo,
    'Configuración completada exitosamente' as mensaje,
    '913ba13b-6555-4560-9ed9-4af6e0c71439' as user_id,
    'contacto@weblisy.es' as user_email,
    (SELECT count(*) FROM cv_master_profiles WHERE id = '913ba13b-6555-4560-9ed9-4af6e0c71439') as tiene_perfil,
    (SELECT count(*) FROM cvs WHERE user_id = '913ba13b-6555-4560-9ed9-4af6e0c71439') as total_cvs,
    (SELECT count(*) FROM information_schema.triggers WHERE event_object_table = 'cvs') as total_triggers,
    now() as fecha_configuracion;

SELECT '¡CONFIGURACIÓN ÚLTIMA FINALIZADA! Ahora puedes probar la aplicación.' as resultado_final; 
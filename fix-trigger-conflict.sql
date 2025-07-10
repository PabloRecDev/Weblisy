-- ===================================================================
-- SOLUCIÓN PARA ERROR: column reference "user_id" is ambiguous
-- ===================================================================
-- Este error ocurre por conflictos en triggers y funciones
-- ===================================================================

-- PASO 1: Verificar triggers existentes
SELECT 
    'TRIGGERS EXISTENTES' as tipo,
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'cvs'
ORDER BY trigger_name;

-- PASO 2: Verificar funciones existentes
SELECT 
    'FUNCIONES EXISTENTES' as tipo,
    routine_name,
    routine_type,
    routine_definition
FROM information_schema.routines 
WHERE routine_name LIKE '%slug%' OR routine_name LIKE '%cv%'
ORDER BY routine_name;

-- PASO 3: Eliminar triggers problemáticos
DROP TRIGGER IF EXISTS set_cv_slug ON cvs;
DROP TRIGGER IF EXISTS update_cv_slug ON cvs;

-- PASO 4: Eliminar funciones problemáticas
DROP FUNCTION IF EXISTS generate_unique_slug(text, uuid);
DROP FUNCTION IF EXISTS set_cv_slug();

-- PASO 5: Crear función corregida para generar slugs únicos
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

-- PASO 6: Crear trigger corregido
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

-- PASO 7: Crear trigger
CREATE TRIGGER set_cv_slug_trigger
    BEFORE INSERT OR UPDATE ON cvs
    FOR EACH ROW
    EXECUTE FUNCTION set_cv_slug();

-- PASO 8: Verificar que se crearon correctamente
SELECT 
    'TRIGGER CREADO' as tipo,
    trigger_name,
    event_manipulation,
    event_object_table
FROM information_schema.triggers 
WHERE trigger_name = 'set_cv_slug_trigger';

SELECT 
    'FUNCIÓN CREADA' as tipo,
    routine_name,
    routine_type
FROM information_schema.routines 
WHERE routine_name IN ('generate_unique_slug', 'set_cv_slug');

-- PASO 9: Probar la función
SELECT 
    'PRUEBA FUNCIÓN' as tipo,
    generate_unique_slug('Mi CV de Prueba', '913ba13b-6555-4560-9ed9-4af6e0c71439') as slug_generado;

-- PASO 10: Verificación final
SELECT 
    'VERIFICACIÓN FINAL' as tipo,
    'Triggers y funciones corregidas' as mensaje,
    (SELECT count(*) FROM information_schema.triggers WHERE event_object_table = 'cvs') as total_triggers,
    (SELECT count(*) FROM information_schema.routines WHERE routine_name IN ('generate_unique_slug', 'set_cv_slug')) as total_funciones;

SELECT '¡CONFLICTO DE TRIGGERS RESUELTO!' as resultado_final; 
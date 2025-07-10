# Solución para Error: null value in column "id"

## Problema
```
ERROR: 23502: null value in column "id" of relation "cv_master_profiles" violates not-null constraint
```

## Causa
El error ocurre porque `auth.uid()` devuelve `NULL` cuando ejecutas el script SQL sin estar autenticado en Supabase.

## Solución Paso a Paso

### Paso 1: Verificar usuarios disponibles
Ejecuta este script en Supabase SQL Editor:

```sql
-- Ver usuarios disponibles
SELECT 
    id,
    email,
    created_at,
    last_sign_in_at
FROM auth.users 
ORDER BY created_at DESC
LIMIT 5;
```

### Paso 2: Copiar el ID del usuario
De la lista anterior, copia el ID del usuario que quieres configurar.
Ejemplo: `913ba13b-6555-4560-9ed9-4af6e0c71439`

### Paso 3: Ejecutar script de configuración
Copia y pega el contenido de `SOLUCION-ERROR-NULL.sql` en Supabase SQL Editor.

**IMPORTANTE**: Reemplaza `'USER_ID_AQUI'` con el ID real del usuario.

**Ejemplo:**
```sql
-- Cambiar esto:
'USER_ID_AQUI'

-- Por esto:
'913ba13b-6555-4560-9ed9-4af6e0c71439'
```

### Paso 4: Verificar configuración
Después de ejecutar el script, deberías ver:
- ✅ Políticas RLS configuradas
- ✅ Perfil de usuario creado
- ✅ CV de prueba creado
- ✅ Verificación final exitosa

### Paso 5: Probar en la aplicación
1. Ve a http://localhost:5174/
2. Inicia sesión con el usuario configurado
3. Ve a CV Master
4. Intenta crear un CV

## Script Completo (con ejemplo)

```sql
-- ===================================================================
-- SOLUCIÓN PARA ERROR: null value in column "id" 
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

-- PASO 3: Crear perfil para usuario específico
-- REEMPLAZA '913ba13b-6555-4560-9ed9-4af6e0c71439' con el ID real
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
    '913ba13b-6555-4560-9ed9-4af6e0c71439', -- REEMPLAZA CON EL ID REAL
    'Usuario',
    'CV Master',
    (SELECT email FROM auth.users WHERE id = '913ba13b-6555-4560-9ed9-4af6e0c71439'),
    '+34 000 000 000',
    'Profesional',
    'España',
    'Perfil creado manualmente para CV Master',
    'https://linkedin.com/in/usuario',
    'https://github.com/usuario',
    'https://weblisy.com'
WHERE NOT EXISTS (
    SELECT 1 FROM cv_master_profiles WHERE id = '913ba13b-6555-4560-9ed9-4af6e0c71439'
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
WHERE id = '913ba13b-6555-4560-9ed9-4af6e0c71439';

-- PASO 5: Crear CV de prueba
INSERT INTO cvs (user_id, title, status)
VALUES (
    '913ba13b-6555-4560-9ed9-4af6e0c71439', -- REEMPLAZA CON EL ID REAL
    'CV de Prueba - ' || to_char(now(), 'DD/MM/YYYY HH24:MI:SS'), 
    'draft'
)
RETURNING id, title, status, user_id, created_at;

-- PASO 6: Verificación final
SELECT 
    'VERIFICACIÓN FINAL' as tipo,
    'Usuario configurado correctamente' as mensaje,
    '913ba13b-6555-4560-9ed9-4af6e0c71439' as user_id,
    (SELECT email FROM auth.users WHERE id = '913ba13b-6555-4560-9ed9-4af6e0c71439') as user_email,
    (SELECT count(*) FROM cv_master_profiles WHERE id = '913ba13b-6555-4560-9ed9-4af6e0c71439') as tiene_perfil,
    (SELECT count(*) FROM cvs WHERE user_id = '913ba13b-6555-4560-9ed9-4af6e0c71439') as total_cvs;
```

## Verificación

Después de ejecutar el script, verifica en Supabase Dashboard:

1. **Authentication > Users**: Debe aparecer el usuario
2. **Table Editor > cv_master_profiles**: Debe tener el perfil
3. **Table Editor > cvs**: Debe tener el CV de prueba

## Próximos Pasos

1. Ejecuta el script con el ID correcto
2. Prueba la aplicación
3. Si funciona, elimina los archivos de debug
4. ¡Listo!

## Nota Importante

Este error ocurre porque `auth.uid()` solo funciona cuando hay un usuario autenticado en el contexto de Supabase. Para scripts de configuración, necesitas especificar el ID del usuario manualmente. 
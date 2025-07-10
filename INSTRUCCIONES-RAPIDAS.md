# Instrucciones Rápidas - Error 400 CV Master

## Problema
Error 400 al crear CVs en la aplicación.

## Solución Rápida

### 1. Ejecutar en Supabase (SQL Editor)
Copia y pega este código en el SQL Editor de Supabase:

```sql
-- === CONFIGURACIÓN COMPLETA CV MASTER ===

-- 1. Habilitar RLS
ALTER TABLE cv_master_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_personal_info ENABLE ROW LEVEL SECURITY;

-- 2. Crear perfil si no existe
INSERT INTO cv_master_profiles (
    id, first_name, last_name, email, phone, profession, location, bio
)
SELECT 
    auth.uid(), 'Usuario', 'CV Master', auth.email(), '+34 000 000 000', 'Profesional', 'España', 'Perfil automático'
WHERE NOT EXISTS (SELECT 1 FROM cv_master_profiles WHERE id = auth.uid());

-- 3. Crear políticas RLS para cvs
DROP POLICY IF EXISTS "Users can view own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can create own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can update own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can delete own CVs" ON cvs;

CREATE POLICY "Users can view own CVs" ON cvs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own CVs" ON cvs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own CVs" ON cvs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own CVs" ON cvs FOR DELETE USING (auth.uid() = user_id);

-- 4. Crear políticas RLS para cv_master_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON cv_master_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON cv_master_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON cv_master_profiles;

CREATE POLICY "Users can view own profile" ON cv_master_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON cv_master_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON cv_master_profiles FOR UPDATE USING (auth.uid() = id);

-- 5. Crear políticas RLS para cv_personal_info
DROP POLICY IF EXISTS "Users can view own personal info" ON cv_personal_info;
DROP POLICY IF EXISTS "Users can create own personal info" ON cv_personal_info;
DROP POLICY IF EXISTS "Users can update own personal info" ON cv_personal_info;
DROP POLICY IF EXISTS "Users can delete own personal info" ON cv_personal_info;

CREATE POLICY "Users can view own personal info" ON cv_personal_info FOR SELECT USING (
    EXISTS (SELECT 1 FROM cvs WHERE cvs.id = cv_personal_info.cv_id AND cvs.user_id = auth.uid())
);
CREATE POLICY "Users can create own personal info" ON cv_personal_info FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM cvs WHERE cvs.id = cv_personal_info.cv_id AND cvs.user_id = auth.uid())
);
CREATE POLICY "Users can update own personal info" ON cv_personal_info FOR UPDATE USING (
    EXISTS (SELECT 1 FROM cvs WHERE cvs.id = cv_personal_info.cv_id AND cvs.user_id = auth.uid())
);
CREATE POLICY "Users can delete own personal info" ON cv_personal_info FOR DELETE USING (
    EXISTS (SELECT 1 FROM cvs WHERE cvs.id = cv_personal_info.cv_id AND cvs.user_id = auth.uid())
);

-- 6. Verificar configuración
SELECT 'OK - Configuración completada' as status;
```

### 2. Probar en la Aplicación
1. Ir a http://localhost:5174/
2. Iniciar sesión en CV Master
3. Ir a "Crear CV"
4. Completar:
   - Título: "Mi Primer CV"
   - Nombre y apellidos
   - Email
5. Hacer clic en "Guardar"

### 3. Si sigue el error:
1. Abrir herramientas de desarrollador (F12)
2. Ver la consola
3. Intentar crear CV y copiar todos los logs que aparecen
4. Ir a Supabase Dashboard > Logs para ver errores del servidor

## Archivos Modificados
- ✅ `src/hooks/useCVs.js` - Mejores consultas y logging
- ✅ `src/app/cvmasteApp/crear.jsx` - Validación mejorada
- ✅ Scripts SQL para configurar Supabase

## Verificación Final
En Supabase Dashboard:
- **Authentication > Users**: Debe aparecer tu usuario
- **Table Editor > cv_master_profiles**: Debe tener tu perfil
- **Table Editor > cvs**: Debe aparecer el CV creado

¡Listo! El problema debería estar resuelto. 
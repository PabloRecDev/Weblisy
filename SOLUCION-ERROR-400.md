# Solución para Error 400 en CV Master

## Problema
Al intentar crear un CV aparece el error: 
```
hpmuqtttuvrneehhaevi.supabase.co/rest/v1/cvs?select=*:1 Failed to load resource: the server responded with a status of 400 ()
```

## Causas Posibles
1. **Políticas RLS (Row Level Security) mal configuradas**
2. **Usuario sin perfil en cv_master_profiles**
3. **Consultas SQL mal formadas**
4. **Permisos de tabla incorrectos**

## Pasos para Solucionar

### 1. Verificar el Error en el Navegador
1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Console"
3. Intenta crear un CV y revisa los logs que aparecen

### 2. Ejecutar Scripts de Verificación en Supabase

#### A. Verificar configuración básica
```sql
-- Ejecutar en SQL Editor de Supabase
-- Copiar y pegar el contenido de debug-supabase.sql
```

#### B. Verificar y crear perfil de usuario
```sql
-- Ejecutar en SQL Editor de Supabase
-- Copiar y pegar el contenido de verify-user-profile.sql
```

#### C. Configurar políticas RLS
```sql
-- Ejecutar en SQL Editor de Supabase
-- Copiar y pegar el contenido de fix-rls-policies.sql
```

#### D. Crear datos de prueba
```sql
-- Ejecutar en SQL Editor de Supabase
-- Copiar y pegar el contenido de create-test-user.sql
```

### 3. Verificar en la Aplicación

1. **Abre la aplicación** en http://localhost:5174/
2. **Inicia sesión** en CV Master
3. **Ve a la página de crear CV**
4. **Revisa el Debug Info** que aparece en la parte superior
5. **Intenta crear un CV** con título "Test CV"

### 4. Información de Debug

En la página de crear CV ahora aparece un panel "Debug Info" que muestra:
- **user**: Información del usuario autenticado
- **profile**: Perfil del usuario
- **connectionTest**: Estado de conexión a Supabase
- **testCV**: Resultado de prueba de creación de CV

### 5. Soluciones Específicas

#### Si el error persiste:

1. **Verificar variables de entorno**:
   - `VITE_SUPABASE_URL` debe ser tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY` debe ser tu clave anónima

2. **Verificar en Supabase Dashboard**:
   - Authentication > Users: Verifica que el usuario existe
   - Table Editor > cv_master_profiles: Verifica que el perfil existe
   - SQL Editor: Ejecuta los scripts de verificación

3. **Logs de Supabase**:
   - Ve a Logs en Supabase Dashboard
   - Revisa errores en tiempo real

### 6. Limpieza

Una vez que funcione correctamente, puedes:
1. Eliminar el componente `DebugInfo` del archivo `src/app/cvmasteApp/crear.jsx`
2. Eliminar los console.log añadidos en `src/hooks/useCVs.js`
3. Eliminar los archivos de debug: `debug-supabase.sql`, `verify-user-profile.sql`, etc.

## Archivos Modificados

- `src/hooks/useCVs.js`: Mejorado manejo de errores y consultas simplificadas
- `src/app/cvmasteApp/crear.jsx`: Añadido debugging y mejor manejo de errores
- `src/components/DebugInfo.jsx`: Componente temporal para debugging

## Contacto

Si el problema persiste, proporciona:
1. Los logs de la consola del navegador
2. El contenido del "Debug Info"
3. Cualquier mensaje de error específico de Supabase 
# Sistema de Seguridad - Separación CV Master y Admin CRM (Supabase + Vercel)

## 🔒 Problema Resuelto

**Antes**: Los usuarios de CV Master podían acceder al CRM de administración porque ambos usaban la misma autenticación de Supabase.

**Ahora**: Sistema de roles implementado en Supabase que separa usuarios normales de administradores.

## 🏗️ Arquitectura de Seguridad

### **1. CV Master (Sistema Público)**
- **Autenticación**: Supabase Auth
- **Rutas**: `/cvmasterApp/*`
- **Contexto**: `CVMasterAuthProvider`
- **Protección**: `CVMasterProtectedRoute`
- **Base de datos**: Tabla `cv_master_profiles`

### **2. Admin CRM (Sistema Privado)**
- **Autenticación**: Supabase Auth + Verificación de rol
- **Rutas**: `/admin/*`
- **Contexto**: Sistema propio con verificación de admin
- **Protección**: `ProtectedRoute` + Verificación de `admin_profiles`
- **Base de datos**: Tabla `admin_profiles`

## 🔧 Configuración en Supabase

### **1. Crear Tabla admin_profiles**

Ejecuta el script `create-admin-supabase.sql` en el SQL Editor de Supabase:

```sql
-- Crear tabla admin_profiles
CREATE TABLE IF NOT EXISTS admin_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **2. Configurar RLS (Row Level Security)**

```sql
-- Habilitar RLS
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Admin profiles are viewable by admin users" ON admin_profiles
    FOR SELECT USING (
        auth.uid() = user_id AND role = 'admin'
    );
```

### **3. Crear Usuario Administrador**

1. **Ve a Supabase Dashboard > Authentication > Users**
2. **Crea un usuario** con email: `contacto@weblisy.es`
3. **Copia el ID del usuario** creado
4. **Ejecuta en SQL Editor**:

```sql
INSERT INTO admin_profiles (user_id, nombre, email, role) 
VALUES (
    'TU_USER_ID_AQUI', -- Reemplazar con el ID real
    'Administrador',
    'contacto@weblisy.es',
    'admin'
);
```

## 🛡️ Características de Seguridad

### **Separación por Roles**
- **CV Master**: Usuarios normales con `cv_master_profiles`
- **Admin CRM**: Solo usuarios con `admin_profiles`

### **Verificación Doble**
```javascript
// En SimpleLogin.jsx
const { data: profile, error: profileError } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('user_id', data.user.id)
    .single();

if (profileError || !profile) {
    // No es administrador, acceso denegado
    throw new Error('Acceso denegado. Solo administradores pueden acceder.');
}
```

### **Protección de Rutas**
```javascript
// CV Master - Solo usuarios de CV Master
<CVMasterProtectedRoute>
  <CvmasteAppHome />
</CVMasterProtectedRoute>

// Admin - Solo administradores verificados
<ProtectedRoute>
  <AdminLayout />
</ProtectedRoute>
```

## 🚀 Uso

### **Acceso al Admin CRM**
1. Ir a `/login`
2. Usar credenciales de administrador: `contacto@weblisy.es`
3. Sistema verifica si existe en `admin_profiles`
4. Si es admin, redirigir a `/admin/dashboard`
5. **Nota**: El registro está desactivado por seguridad

### **Acceso a CV Master**
1. Ir a `/cv-master-landing`
2. Registrarse o iniciar sesión
3. Sistema verifica en `cv_master_profiles`
4. Redirigir a `/cvmasterApp`

## 🔍 Verificación de Seguridad

### **Test 1: Usuario CV Master intenta acceder al Admin**
```javascript
// Un usuario de CV Master NO puede acceder a:
// - /admin/dashboard
// - /admin/clientes
// - /admin/facturas
// etc.
// Porque no existe en admin_profiles
```

### **Test 2: Admin intenta acceder a CV Master**
```javascript
// Un administrador SÍ puede acceder a CV Master
// pero necesitaría una cuenta separada en cv_master_profiles
```

## 📝 Estructura de Base de Datos

### **Tabla cv_master_profiles**
```sql
- user_id (UUID) - Referencia a auth.users
- nombre (VARCHAR)
- email (VARCHAR)
- created_at (TIMESTAMP)
```

### **Tabla admin_profiles**
```sql
- user_id (UUID) - Referencia a auth.users
- nombre (VARCHAR)
- email (VARCHAR)
- role (VARCHAR) - 'admin', 'super_admin', etc.
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🔧 Mantenimiento

### **Crear nuevo administrador**
1. Crear usuario en Supabase Auth
2. Insertar registro en `admin_profiles`
3. Asignar rol apropiado

### **Desactivar administrador**
```sql
UPDATE admin_profiles 
SET is_active = false 
WHERE email = 'admin@example.com';
```

### **Verificar administradores activos**
```sql
SELECT * FROM admin_profiles WHERE is_active = true;
```

## ✅ Beneficios

1. **Seguridad total**: Usuarios de CV Master NO pueden acceder al admin
2. **Escalabilidad**: Sistema de roles flexible
3. **Mantenimiento**: Todo en Supabase, sin servidor adicional
4. **Auditoría**: Logs de Supabase para ambos sistemas
5. **Flexibilidad**: Fácil agregar nuevos roles (super_admin, moderator, etc.)

## 🚨 Notas Importantes

1. **RLS habilitado**: Las políticas de seguridad protegen los datos
2. **Verificación doble**: Login + verificación de perfil
3. **Separación clara**: Tablas diferentes para cada sistema
4. **Sin servidor**: Todo funciona con Supabase + Vercel
5. **Escalable**: Fácil agregar más roles y permisos 
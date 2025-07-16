-- Script para crear un administrador en Supabase
-- Ejecutar este script en el SQL Editor de Supabase

-- 1. Primero, crear la tabla admin_profiles si no existe
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

-- 2. Crear índices
CREATE INDEX IF NOT EXISTS idx_admin_profiles_user_id ON admin_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_email ON admin_profiles(email);

-- 3. Habilitar RLS
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- 4. Crear políticas de seguridad
DROP POLICY IF EXISTS "Admin profiles are viewable by admin users" ON admin_profiles;
CREATE POLICY "Admin profiles are viewable by admin users" ON admin_profiles
    FOR SELECT USING (
        auth.uid() = user_id AND role = 'admin'
    );

DROP POLICY IF EXISTS "Admin profiles are insertable by admin users" ON admin_profiles;
CREATE POLICY "Admin profiles are insertable by admin users" ON admin_profiles
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND role = 'admin'
    );

DROP POLICY IF EXISTS "Admin profiles are updatable by admin users" ON admin_profiles;
CREATE POLICY "Admin profiles are updatable by admin users" ON admin_profiles
    FOR UPDATE USING (
        auth.uid() = user_id AND role = 'admin'
    );

DROP POLICY IF EXISTS "Admin profiles are deletable by admin users" ON admin_profiles;
CREATE POLICY "Admin profiles are deletable by admin users" ON admin_profiles
    FOR DELETE USING (
        auth.uid() = user_id AND role = 'admin'
    );

-- 5. Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Trigger para updated_at
DROP TRIGGER IF EXISTS update_admin_profiles_updated_at ON admin_profiles;
CREATE TRIGGER update_admin_profiles_updated_at 
    BEFORE UPDATE ON admin_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 7. Para crear un administrador, sigue estos pasos:
-- 
-- a) Ve a Authentication > Users en Supabase Dashboard
-- b) Crea un usuario con email: admin@weblisy.com
-- c) Copia el ID del usuario creado
-- d) Reemplaza 'TU_USER_ID_AQUI' con el ID real y ejecuta:

-- INSERT INTO admin_profiles (user_id, nombre, email, role) 
-- VALUES (
--     'TU_USER_ID_AQUI', -- Reemplazar con el ID real del usuario
--     'Administrador',
--     'admin@weblisy.com',
--     'admin'
-- ) ON CONFLICT (user_id) DO NOTHING;

-- 8. Verificar que se creó correctamente
SELECT * FROM admin_profiles WHERE email = 'admin@weblisy.com'; 
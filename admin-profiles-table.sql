-- Crear tabla admin_profiles en Supabase
-- Esta tabla almacena los perfiles de administradores

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

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_admin_profiles_user_id ON admin_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_email ON admin_profiles(email);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_role ON admin_profiles(role);

-- Habilitar RLS (Row Level Security)
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
-- Solo los administradores pueden ver sus propios perfiles
CREATE POLICY "Admin profiles are viewable by admin users" ON admin_profiles
    FOR SELECT USING (
        auth.uid() = user_id AND role = 'admin'
    );

-- Solo los administradores pueden insertar sus propios perfiles
CREATE POLICY "Admin profiles are insertable by admin users" ON admin_profiles
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND role = 'admin'
    );

-- Solo los administradores pueden actualizar sus propios perfiles
CREATE POLICY "Admin profiles are updatable by admin users" ON admin_profiles
    FOR UPDATE USING (
        auth.uid() = user_id AND role = 'admin'
    );

-- Solo los administradores pueden eliminar sus propios perfiles
CREATE POLICY "Admin profiles are deletable by admin users" ON admin_profiles
    FOR DELETE USING (
        auth.uid() = user_id AND role = 'admin'
    );

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_admin_profiles_updated_at 
    BEFORE UPDATE ON admin_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar administrador de prueba
-- NOTA: Reemplaza 'TU_USER_ID_AQUI' con el ID real del usuario de Supabase
INSERT INTO admin_profiles (user_id, nombre, email, role) 
VALUES (
    'TU_USER_ID_AQUI', -- Reemplazar con el ID real
    'Administrador',
    'admin@weblisy.com',
    'admin'
) ON CONFLICT (user_id) DO NOTHING;

-- Comentarios sobre el uso
COMMENT ON TABLE admin_profiles IS 'Tabla para almacenar perfiles de administradores';
COMMENT ON COLUMN admin_profiles.user_id IS 'ID del usuario de Supabase Auth';
COMMENT ON COLUMN admin_profiles.role IS 'Rol del usuario (admin, super_admin, etc.)';
COMMENT ON COLUMN admin_profiles.is_active IS 'Si el administrador está activo'; 
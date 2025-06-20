-- =====================================================
-- TABLA DE CLIENTES PARA WEBLISY CRM
-- =====================================================

-- Crear tabla de clientes
CREATE TABLE IF NOT EXISTS clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    company VARCHAR(255),
    notes TEXT, -- Para anotaciones internas
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);

-- Función para actualizar 'updated_at' (reutiliza la existente si ya está)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
        CREATE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $func$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $func$ LANGUAGE 'plpgsql';
    END IF;
END
$$;

-- Trigger para actualizar updated_at automáticamente en la tabla de clientes
DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at 
    BEFORE UPDATE ON clients 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para la tabla de clientes
-- Permitir a los usuarios autenticados (admin) realizar todas las operaciones
CREATE POLICY "Permitir todo a usuarios autenticados" ON clients
    FOR ALL USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Comentarios para documentar la tabla
COMMENT ON TABLE clients IS 'Tabla para almacenar información de los clientes del CRM.';
COMMENT ON COLUMN clients.id IS 'Identificador único del cliente';
COMMENT ON COLUMN clients.name IS 'Nombre completo del cliente';
COMMENT ON COLUMN clients.email IS 'Email único del cliente';
COMMENT ON COLUMN clients.phone IS 'Teléfono de contacto del cliente';
COMMENT ON COLUMN clients.company IS 'Empresa del cliente';
COMMENT ON COLUMN clients.notes IS 'Anotaciones internas sobre el cliente';
COMMENT ON COLUMN clients.created_at IS 'Fecha de creación del registro del cliente';
COMMENT ON COLUMN clients.updated_at IS 'Fecha de última actualización del registro'; 
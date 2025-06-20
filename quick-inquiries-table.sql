-- =====================================================
-- TABLA DE DUDAS RÁPIDAS (QUICK INQUIRIES)
-- =====================================================

-- Crear tabla para dudas rápidas
CREATE TABLE IF NOT EXISTS quick_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_quick_inquiries_email ON quick_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_quick_inquiries_status ON quick_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_quick_inquiries_created_at ON quick_inquiries(created_at);

-- Función para actualizar 'updated_at' que podemos reutilizar si ya existe
-- Si no estás seguro si ya existe, este bloque la creará de forma segura.
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

-- Trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS update_quick_inquiries_updated_at ON quick_inquiries;
CREATE TRIGGER update_quick_inquiries_updated_at 
    BEFORE UPDATE ON quick_inquiries 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security
ALTER TABLE quick_inquiries ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
-- Permitir inserción pública desde el formulario
CREATE POLICY "Permitir inserción pública" ON quick_inquiries
    FOR INSERT WITH CHECK (true);

-- Permitir lectura, actualización y eliminación a usuarios autenticados (admin)
CREATE POLICY "Permitir todo a usuarios autenticados" ON quick_inquiries
    FOR ALL USING (auth.role() = 'authenticated');

-- Comentarios para documentar la tabla
COMMENT ON TABLE quick_inquiries IS 'Tabla para almacenar dudas rápidas del formulario de contacto principal.';
COMMENT ON COLUMN quick_inquiries.id IS 'Identificador único de la consulta';
COMMENT ON COLUMN quick_inquiries.name IS 'Nombre del remitente';
COMMENT ON COLUMN quick_inquiries.email IS 'Email del remitente';
COMMENT ON COLUMN quick_inquiries.message IS 'Mensaje de la consulta';
COMMENT ON COLUMN quick_inquiries.status IS 'Estado: new, read, archived';
COMMENT ON COLUMN quick_inquiries.created_at IS 'Fecha de creación';
COMMENT ON COLUMN quick_inquiries.updated_at IS 'Fecha de última actualización'; 
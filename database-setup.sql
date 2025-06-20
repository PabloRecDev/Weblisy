-- Crear tabla de reuniones para el CRM de WebLisy
CREATE TABLE IF NOT EXISTS meetings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    message TEXT,
    meeting_date DATE NOT NULL,
    meeting_time TIME NOT NULL,
    meeting_type VARCHAR(50) NOT NULL,
    meeting_type_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);
CREATE INDEX IF NOT EXISTS idx_meetings_date ON meetings(meeting_date);
CREATE INDEX IF NOT EXISTS idx_meetings_created_at ON meetings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_meetings_email ON meetings(email);

-- Crear función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_meetings_updated_at 
    BEFORE UPDATE ON meetings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Configurar RLS (Row Level Security) - opcional para seguridad adicional
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción desde el formulario público
CREATE POLICY "Permitir inserción de reuniones públicas" ON meetings
    FOR INSERT WITH CHECK (true);

-- Política para permitir lectura a usuarios autenticados (para el admin)
CREATE POLICY "Permitir lectura de reuniones a usuarios autenticados" ON meetings
    FOR SELECT USING (auth.role() = 'authenticated');

-- Política para permitir actualización a usuarios autenticados
CREATE POLICY "Permitir actualización de reuniones a usuarios autenticados" ON meetings
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Política para permitir eliminación a usuarios autenticados
CREATE POLICY "Permitir eliminación de reuniones a usuarios autenticados" ON meetings
    FOR DELETE USING (auth.role() = 'authenticated');

-- Comentarios para documentar la tabla
COMMENT ON TABLE meetings IS 'Tabla para almacenar las reuniones agendadas desde el formulario de contacto';
COMMENT ON COLUMN meetings.id IS 'Identificador único de la reunión';
COMMENT ON COLUMN meetings.name IS 'Nombre completo del cliente';
COMMENT ON COLUMN meetings.email IS 'Email del cliente';
COMMENT ON COLUMN meetings.company IS 'Empresa del cliente (opcional)';
COMMENT ON COLUMN meetings.message IS 'Mensaje adicional del cliente (opcional)';
COMMENT ON COLUMN meetings.meeting_date IS 'Fecha de la reunión';
COMMENT ON COLUMN meetings.meeting_time IS 'Hora de la reunión';
COMMENT ON COLUMN meetings.meeting_type IS 'Tipo de reunión (video, phone, chat)';
COMMENT ON COLUMN meetings.meeting_type_name IS 'Nombre descriptivo del tipo de reunión';
COMMENT ON COLUMN meetings.status IS 'Estado de la reunión (pending, confirmed, completed, cancelled)';
COMMENT ON COLUMN meetings.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN meetings.updated_at IS 'Fecha y hora de última actualización'; 
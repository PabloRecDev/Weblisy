-- =====================================================
-- TABLA DE REUNIONES PARA WEBLISY CRM
-- =====================================================

-- Crear tabla de reuniones
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
CREATE INDEX IF NOT EXISTS idx_meetings_date ON meetings(meeting_date);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);
CREATE INDEX IF NOT EXISTS idx_meetings_email ON meetings(email);

-- Función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS update_meetings_updated_at ON meetings;
CREATE TRIGGER update_meetings_updated_at 
    BEFORE UPDATE ON meetings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si las hay
DROP POLICY IF EXISTS "Permitir inserción de reuniones públicas" ON meetings;
DROP POLICY IF EXISTS "Permitir lectura de reuniones a usuarios autenticados" ON meetings;
DROP POLICY IF EXISTS "Permitir actualización de reuniones a usuarios autenticados" ON meetings;
DROP POLICY IF EXISTS "Permitir eliminación de reuniones a usuarios autenticados" ON meetings;

-- Crear políticas de seguridad
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

-- Insertar datos de ejemplo (opcional)
INSERT INTO meetings (name, email, company, message, meeting_date, meeting_time, meeting_type, meeting_type_name, status) VALUES
('Juan Pérez', 'juan@empresa.com', 'Empresa ABC', 'Necesito información sobre desarrollo web', '2024-01-15', '10:00:00', 'video', 'Videollamada', 'confirmed'),
('María García', 'maria@startup.com', 'Startup XYZ', 'Consulta sobre aplicación móvil', '2024-01-16', '14:30:00', 'phone', 'Llamada telefónica', 'pending'),
('Carlos López', 'carlos@consultora.com', 'Consultora 123', 'Proyecto de e-commerce', '2024-01-17', '11:00:00', 'chat', 'Chat en vivo', 'pending')
ON CONFLICT DO NOTHING;

-- Comentarios para documentar la tabla
COMMENT ON TABLE meetings IS 'Tabla para almacenar las reuniones programadas desde el formulario público';
COMMENT ON COLUMN meetings.id IS 'Identificador único de la reunión';
COMMENT ON COLUMN meetings.name IS 'Nombre completo del solicitante';
COMMENT ON COLUMN meetings.email IS 'Email del solicitante';
COMMENT ON COLUMN meetings.company IS 'Empresa del solicitante (opcional)';
COMMENT ON COLUMN meetings.message IS 'Mensaje o descripción de la consulta';
COMMENT ON COLUMN meetings.meeting_date IS 'Fecha de la reunión';
COMMENT ON COLUMN meetings.meeting_time IS 'Hora de la reunión';
COMMENT ON COLUMN meetings.meeting_type IS 'Tipo de reunión: video, phone, chat';
COMMENT ON COLUMN meetings.meeting_type_name IS 'Nombre descriptivo del tipo de reunión';
COMMENT ON COLUMN meetings.status IS 'Estado: pending, confirmed, completed, cancelled';
COMMENT ON COLUMN meetings.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN meetings.updated_at IS 'Fecha de última actualización'; 
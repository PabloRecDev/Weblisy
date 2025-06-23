-- =====================================================
-- TABLA DE SOLICITUDES DE PRESUPUESTO PARA WEBLISY CRM
-- =====================================================

-- Crear tabla de solicitudes de presupuesto
CREATE TABLE IF NOT EXISTS presupuesto_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    
    -- Detalles del proyecto
    project_type VARCHAR(100) NOT NULL, -- 'web-corporativa', 'e-commerce', 'aplicacion-web', etc.
    features TEXT, -- Funcionalidades requeridas
    inspiration TEXT, -- Referencias o inspiración
    budget VARCHAR(50), -- Rango de presupuesto
    timeline VARCHAR(100), -- Plazo de entrega
    
    -- Estado y seguimiento
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'quoted', 'converted', 'archived')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    
    -- Información adicional
    source VARCHAR(50) DEFAULT 'web' CHECK (source IN ('web', 'contact', 'referral')),
    notes TEXT, -- Notas internas del equipo
    
    -- Relación con presupuesto formal (cuando se convierte)
    presupuesto_id UUID, -- Referencia al presupuesto formal cuando se convierte
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_presupuesto_requests_email ON presupuesto_requests(email);
CREATE INDEX IF NOT EXISTS idx_presupuesto_requests_status ON presupuesto_requests(status);
CREATE INDEX IF NOT EXISTS idx_presupuesto_requests_priority ON presupuesto_requests(priority);
CREATE INDEX IF NOT EXISTS idx_presupuesto_requests_project_type ON presupuesto_requests(project_type);
CREATE INDEX IF NOT EXISTS idx_presupuesto_requests_created_at ON presupuesto_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_presupuesto_requests_presupuesto_id ON presupuesto_requests(presupuesto_id);

-- Función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS update_presupuesto_requests_updated_at ON presupuesto_requests;
CREATE TRIGGER update_presupuesto_requests_updated_at 
    BEFORE UPDATE ON presupuesto_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security
ALTER TABLE presupuesto_requests ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si las hay
DROP POLICY IF EXISTS "Permitir inserción pública" ON presupuesto_requests;
DROP POLICY IF EXISTS "Permitir lectura a usuarios autenticados" ON presupuesto_requests;
DROP POLICY IF EXISTS "Permitir actualización a usuarios autenticados" ON presupuesto_requests;
DROP POLICY IF EXISTS "Permitir eliminación a usuarios autenticados" ON presupuesto_requests;

-- Crear políticas de seguridad
-- Política para permitir inserción desde el formulario público
CREATE POLICY "Permitir inserción pública" ON presupuesto_requests
    FOR INSERT WITH CHECK (true);

-- Política para permitir lectura a usuarios autenticados (para el admin)
CREATE POLICY "Permitir lectura a usuarios autenticados" ON presupuesto_requests
    FOR SELECT USING (auth.role() = 'authenticated');

-- Política para permitir actualización a usuarios autenticados
CREATE POLICY "Permitir actualización a usuarios autenticados" ON presupuesto_requests
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Política para permitir eliminación a usuarios autenticados
CREATE POLICY "Permitir eliminación a usuarios autenticados" ON presupuesto_requests
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insertar datos de ejemplo (opcional)
INSERT INTO presupuesto_requests (name, email, company, project_type, features, budget, timeline, status, priority) VALUES
('Ana López', 'ana@empresa.com', 'TechCorp Solutions', 'e-commerce', 'Necesito una tienda online con pasarela de pago, gestión de inventario y panel de administración', '5000-10000', '2-3 meses', 'new', 'high'),
('Carlos Rodríguez', 'carlos@startup.com', 'StartupXYZ', 'aplicacion-web', 'Sistema de gestión de inventarios con lectores de códigos de barras', '3000-5000', '1-2 meses', 'new', 'medium')
ON CONFLICT DO NOTHING;

-- Comentarios para documentar la tabla
COMMENT ON TABLE presupuesto_requests IS 'Tabla para almacenar solicitudes de presupuesto desde la web';
COMMENT ON COLUMN presupuesto_requests.id IS 'Identificador único de la solicitud';
COMMENT ON COLUMN presupuesto_requests.name IS 'Nombre completo del solicitante';
COMMENT ON COLUMN presupuesto_requests.email IS 'Email del solicitante';
COMMENT ON COLUMN presupuesto_requests.company IS 'Empresa del solicitante';
COMMENT ON COLUMN presupuesto_requests.phone IS 'Teléfono del solicitante';
COMMENT ON COLUMN presupuesto_requests.project_type IS 'Tipo de proyecto solicitado';
COMMENT ON COLUMN presupuesto_requests.features IS 'Funcionalidades requeridas';
COMMENT ON COLUMN presupuesto_requests.inspiration IS 'Referencias o inspiración del proyecto';
COMMENT ON COLUMN presupuesto_requests.budget IS 'Rango de presupuesto estimado';
COMMENT ON COLUMN presupuesto_requests.timeline IS 'Plazo de entrega deseado';
COMMENT ON COLUMN presupuesto_requests.status IS 'Estado: new, reviewing, quoted, converted, archived';
COMMENT ON COLUMN presupuesto_requests.priority IS 'Prioridad: low, medium, high, urgent';
COMMENT ON COLUMN presupuesto_requests.source IS 'Origen de la solicitud';
COMMENT ON COLUMN presupuesto_requests.notes IS 'Notas internas del equipo';
COMMENT ON COLUMN presupuesto_requests.presupuesto_id IS 'ID del presupuesto formal cuando se convierte';
COMMENT ON COLUMN presupuesto_requests.created_at IS 'Fecha de creación de la solicitud';
COMMENT ON COLUMN presupuesto_requests.updated_at IS 'Fecha de última actualización'; 
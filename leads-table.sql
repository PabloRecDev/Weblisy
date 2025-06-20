-- =====================================================
-- TABLA DE LEADS/MENSAJES PARA WEBLISY CRM
-- =====================================================

-- Crear tabla de leads
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    message TEXT,
    budget VARCHAR(50), -- Para el formulario de presupuesto
    project_type VARCHAR(100), -- Para el formulario de presupuesto
    timeline VARCHAR(100), -- Para el formulario de presupuesto
    source VARCHAR(50) NOT NULL, -- 'contact' o 'budget' para identificar de qué formulario viene
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'converted', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si las hay
DROP POLICY IF EXISTS "Permitir inserción pública" ON leads;
DROP POLICY IF EXISTS "Permitir lectura a usuarios autenticados" ON leads;
DROP POLICY IF EXISTS "Permitir actualización a usuarios autenticados" ON leads;
DROP POLICY IF EXISTS "Permitir eliminación a usuarios autenticados" ON leads;

-- Crear políticas de seguridad
-- Política para permitir inserción desde el formulario público
CREATE POLICY "Permitir inserción pública" ON leads
    FOR INSERT WITH CHECK (true);

-- Política para permitir lectura a usuarios autenticados (para el admin)
CREATE POLICY "Permitir lectura a usuarios autenticados" ON leads
    FOR SELECT USING (auth.role() = 'authenticated');

-- Política para permitir actualización a usuarios autenticados
CREATE POLICY "Permitir actualización a usuarios autenticados" ON leads
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Política para permitir eliminación a usuarios autenticados
CREATE POLICY "Permitir eliminación a usuarios autenticados" ON leads
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insertar datos de ejemplo (opcional)
INSERT INTO leads (name, email, phone, company, message, source, status) VALUES
('Juan Pérez', 'juan@empresa.com', '+34612345678', 'Empresa ABC', 'Me gustaría información sobre servicios web', 'contact', 'new'),
('María García', 'maria@startup.com', '+34698765432', 'Startup XYZ', 'Necesito un presupuesto para e-commerce', 'budget', 'new')
ON CONFLICT DO NOTHING;

-- Comentarios para documentar la tabla
COMMENT ON TABLE leads IS 'Tabla para almacenar leads y mensajes de los formularios de contacto y presupuesto';
COMMENT ON COLUMN leads.id IS 'Identificador único del lead';
COMMENT ON COLUMN leads.name IS 'Nombre completo del contacto';
COMMENT ON COLUMN leads.email IS 'Email del contacto';
COMMENT ON COLUMN leads.phone IS 'Teléfono del contacto';
COMMENT ON COLUMN leads.company IS 'Empresa del contacto';
COMMENT ON COLUMN leads.message IS 'Mensaje o consulta';
COMMENT ON COLUMN leads.budget IS 'Presupuesto estimado (formulario de presupuesto)';
COMMENT ON COLUMN leads.project_type IS 'Tipo de proyecto (formulario de presupuesto)';
COMMENT ON COLUMN leads.timeline IS 'Plazo del proyecto (formulario de presupuesto)';
COMMENT ON COLUMN leads.source IS 'Origen del lead: contact o budget';
COMMENT ON COLUMN leads.status IS 'Estado: new, contacted, in_progress, converted, archived';
COMMENT ON COLUMN leads.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN leads.updated_at IS 'Fecha de última actualización'; 
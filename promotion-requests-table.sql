-- =====================================================
-- TABLA DE SOLICITUDES DE PROMOCIONES PARA WEBLISY CRM
-- =====================================================

-- Crear tabla de solicitudes de promociones
CREATE TABLE IF NOT EXISTS promotion_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    
    -- Identificador de la promoción
    promotion_name VARCHAR(255) NOT NULL, -- Ej: 'Plan Sitio Web 990€'
    
    -- Estado y seguimiento
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'archived')),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_promotion_requests_email ON promotion_requests(email);
CREATE INDEX IF NOT EXISTS idx_promotion_requests_status ON promotion_requests(status);
CREATE INDEX IF NOT EXISTS idx_promotion_requests_promotion_name ON promotion_requests(promotion_name);
CREATE INDEX IF NOT EXISTS idx_promotion_requests_created_at ON promotion_requests(created_at DESC);

-- (Asegúrate de que la función update_updated_at_column ya existe en tu DB, si no, descomenta la siguiente sección)
/*
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';
*/

-- Trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS update_promotion_requests_updated_at ON promotion_requests;
CREATE TRIGGER update_promotion_requests_updated_at 
    BEFORE UPDATE ON promotion_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security
ALTER TABLE promotion_requests ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si las hay (para evitar errores en re-ejecución)
DROP POLICY IF EXISTS "Permitir inserción pública para promociones" ON promotion_requests;
DROP POLICY IF EXISTS "Permitir acceso a usuarios autenticados para promociones" ON promotion_requests;

-- Crear políticas de seguridad
-- Política para permitir inserción desde el formulario público
CREATE POLICY "Permitir inserción pública para promociones" ON promotion_requests
    FOR INSERT WITH CHECK (true);

-- Política para permitir acceso total a usuarios autenticados (admin)
CREATE POLICY "Permitir acceso a usuarios autenticados para promociones" ON promotion_requests
    FOR ALL USING (auth.role() = 'authenticated');

-- Comentarios para documentar la tabla
COMMENT ON TABLE promotion_requests IS 'Tabla para almacenar leads de páginas de promociones específicas';
COMMENT ON COLUMN promotion_requests.id IS 'Identificador único de la solicitud';
COMMENT ON COLUMN promotion_requests.promotion_name IS 'Nombre de la promoción u oferta solicitada';
COMMENT ON COLUMN promotion_requests.status IS 'Estado: new, contacted, converted, archived'; 
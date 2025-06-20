-- =====================================================
-- TABLA DE FACTURAS PARA WEBLISY CRM
-- =====================================================

-- Crear tabla de facturas
CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, sent, paid, overdue, cancelled
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    tax_rate DECIMAL(5,2) NOT NULL DEFAULT 21.00, -- IVA por defecto 21%
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
    notes TEXT,
    payment_terms TEXT DEFAULT 'Pago a 30 días',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de líneas de factura
CREATE TABLE IF NOT EXISTS invoice_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_issue_date ON invoices(issue_date);
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON invoice_items(invoice_id);

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

-- Trigger para actualizar updated_at automáticamente en la tabla de facturas
DROP TRIGGER IF EXISTS update_invoices_updated_at ON invoices;
CREATE TRIGGER update_invoices_updated_at 
    BEFORE UPDATE ON invoices 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Función para generar automáticamente el número de factura
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
DECLARE
    next_number INTEGER;
    year_str VARCHAR(4);
BEGIN
    -- Obtener el año actual
    year_str := EXTRACT(YEAR FROM CURRENT_DATE)::VARCHAR;
    
    -- Obtener el siguiente número para este año
    SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 6) AS INTEGER)), 0) + 1
    INTO next_number
    FROM invoices
    WHERE invoice_number LIKE 'INV-' || year_str || '-%';
    
    -- Generar el número de factura
    NEW.invoice_number := 'INV-' || year_str || '-' || LPAD(next_number::VARCHAR, 4, '0');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para generar automáticamente el número de factura
DROP TRIGGER IF EXISTS generate_invoice_number_trigger ON invoices;
CREATE TRIGGER generate_invoice_number_trigger
    BEFORE INSERT ON invoices
    FOR EACH ROW
    WHEN (NEW.invoice_number IS NULL OR NEW.invoice_number = '')
    EXECUTE FUNCTION generate_invoice_number();

-- Función para calcular automáticamente los totales
CREATE OR REPLACE FUNCTION calculate_invoice_totals()
RETURNS TRIGGER AS $$
BEGIN
    -- Calcular subtotal
    SELECT COALESCE(SUM(total), 0)
    INTO NEW.subtotal
    FROM invoice_items
    WHERE invoice_id = NEW.id;
    
    -- Calcular impuestos
    NEW.tax_amount := NEW.subtotal * (NEW.tax_rate / 100);
    
    -- Calcular total
    NEW.total := NEW.subtotal + NEW.tax_amount;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para calcular totales automáticamente
DROP TRIGGER IF EXISTS calculate_invoice_totals_trigger ON invoices;
CREATE TRIGGER calculate_invoice_totals_trigger
    BEFORE UPDATE ON invoices
    FOR EACH ROW
    EXECUTE FUNCTION calculate_invoice_totals();

-- Habilitar Row Level Security
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para la tabla de facturas
CREATE POLICY "Permitir todo a usuarios autenticados" ON invoices
    FOR ALL USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Políticas de seguridad para la tabla de líneas de factura
CREATE POLICY "Permitir todo a usuarios autenticados" ON invoice_items
    FOR ALL USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Comentarios para documentar las tablas
COMMENT ON TABLE invoices IS 'Tabla para almacenar las facturas del CRM.';
COMMENT ON COLUMN invoices.id IS 'Identificador único de la factura';
COMMENT ON COLUMN invoices.invoice_number IS 'Número único de factura (generado automáticamente)';
COMMENT ON COLUMN invoices.client_id IS 'Referencia al cliente';
COMMENT ON COLUMN invoices.issue_date IS 'Fecha de emisión de la factura';
COMMENT ON COLUMN invoices.due_date IS 'Fecha de vencimiento de la factura';
COMMENT ON COLUMN invoices.status IS 'Estado de la factura: draft, sent, paid, overdue, cancelled';
COMMENT ON COLUMN invoices.subtotal IS 'Subtotal sin impuestos';
COMMENT ON COLUMN invoices.tax_rate IS 'Porcentaje de impuestos aplicado';
COMMENT ON COLUMN invoices.tax_amount IS 'Cantidad de impuestos';
COMMENT ON COLUMN invoices.total IS 'Total de la factura (subtotal + impuestos)';

COMMENT ON TABLE invoice_items IS 'Tabla para almacenar las líneas de las facturas.';
COMMENT ON COLUMN invoice_items.id IS 'Identificador único de la línea de factura';
COMMENT ON COLUMN invoice_items.invoice_id IS 'Referencia a la factura';
COMMENT ON COLUMN invoice_items.description IS 'Descripción del servicio/producto';
COMMENT ON COLUMN invoice_items.quantity IS 'Cantidad';
COMMENT ON COLUMN invoice_items.unit_price IS 'Precio unitario';
COMMENT ON COLUMN invoice_items.total IS 'Total de la línea (cantidad * precio unitario)'; 
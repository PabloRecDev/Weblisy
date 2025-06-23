-- =====================================================
-- TABLA DE NOTIFICACIONES PARA WEBLISY CRM
-- =====================================================

CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(30) NOT NULL, -- reunion, presupuesto, mensaje, promocion, etc.
    title VARCHAR(255) NOT NULL,
    message TEXT,
    link VARCHAR(255), -- Enlace directo a la sección relacionada
    is_read BOOLEAN DEFAULT FALSE,
    user_id UUID, -- Opcional, para multiusuario
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Habilitar RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Políticas básicas
DROP POLICY IF EXISTS "Permitir inserción pública notificaciones" ON notifications;
DROP POLICY IF EXISTS "Permitir acceso a usuarios autenticados notificaciones" ON notifications;

CREATE POLICY "Permitir acceso a usuarios autenticados notificaciones" ON notifications
    FOR ALL USING (auth.role() = 'authenticated');

-- Comentarios
COMMENT ON TABLE notifications IS 'Tabla para centralizar todas las notificaciones del CRM';
COMMENT ON COLUMN notifications.type IS 'Tipo de notificación: reunion, presupuesto, mensaje, promocion, etc.';
COMMENT ON COLUMN notifications.is_read IS 'Indica si la notificación ha sido leída';
COMMENT ON COLUMN notifications.link IS 'Enlace directo a la sección relacionada'; 
-- =====================================================
-- CORRECCIÓN DE POLÍTICAS PARA TABLA MEETINGS
-- =====================================================

-- Primero, verificar que la tabla existe
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'meetings'
);

-- Eliminar todas las políticas existentes
DROP POLICY IF EXISTS "Permitir inserción de reuniones públicas" ON meetings;
DROP POLICY IF EXISTS "Permitir lectura de reuniones a usuarios autenticados" ON meetings;
DROP POLICY IF EXISTS "Permitir actualización de reuniones a usuarios autenticados" ON meetings;
DROP POLICY IF EXISTS "Permitir eliminación de reuniones a usuarios autenticados" ON meetings;

-- Crear políticas corregidas
-- 1. Permitir inserción pública (sin autenticación requerida)
CREATE POLICY "Permitir inserción pública" ON meetings
    FOR INSERT WITH CHECK (true);

-- 2. Permitir lectura a usuarios autenticados (para el admin)
CREATE POLICY "Permitir lectura a usuarios autenticados" ON meetings
    FOR SELECT USING (auth.role() = 'authenticated');

-- 3. Permitir actualización a usuarios autenticados
CREATE POLICY "Permitir actualización a usuarios autenticados" ON meetings
    FOR UPDATE USING (auth.role() = 'authenticated');

-- 4. Permitir eliminación a usuarios autenticados
CREATE POLICY "Permitir eliminación a usuarios autenticados" ON meetings
    FOR DELETE USING (auth.role() = 'authenticated');

-- Verificar que las políticas se crearon correctamente
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'meetings'; 
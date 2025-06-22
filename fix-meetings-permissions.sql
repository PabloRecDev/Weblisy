-- ==========================================================
-- CONCEDER PERMISOS DE INSERCIÓN PÚBLICA EN TABLA MEETINGS
-- ==========================================================

-- Descripción:
-- Este script concede el permiso de INSERT en la tabla "meetings"
-- al rol "anon". Esto es necesario para que los usuarios públicos
-- (no autenticados) puedan enviar el formulario de agendar reunión.
-- La política de Row Level Security (RLS) existente permitirá la
-- operación una vez que el rol "anon" tenga este permiso base.

GRANT INSERT ON TABLE public.meetings TO anon;

-- Opcionalmente, puedes verificar los permisos concedidos:
-- SELECT grantee, privilege_type
-- FROM information_schema.role_table_grants
-- WHERE table_name = 'meetings' AND grantee = 'anon'; 
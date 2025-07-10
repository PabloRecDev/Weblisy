-- Script para verificar el estado de autenticación del usuario

-- 1. Verificar si hay usuario autenticado
SELECT 
    'ESTADO DE AUTENTICACIÓN' as tipo,
    auth.uid() as user_id,
    auth.email() as user_email,
    CASE 
        WHEN auth.uid() IS NULL THEN 'ERROR: No hay usuario autenticado'
        ELSE 'OK: Usuario autenticado'
    END as status;

-- 2. Si no hay usuario autenticado, mostrar instrucciones
SELECT 
    'INSTRUCCIONES' as tipo,
    CASE 
        WHEN auth.uid() IS NULL THEN 
            'Para ejecutar este script, debes estar autenticado en Supabase. ' ||
            'Ve a Authentication > Users y copia el ID del usuario que quieres configurar.'
        ELSE 
            'Usuario autenticado correctamente. Puedes continuar con la configuración.'
    END as mensaje;

-- 3. Mostrar usuarios disponibles (solo si no hay usuario autenticado)
SELECT 
    'USUARIOS DISPONIBLES' as tipo,
    id,
    email,
    created_at,
    last_sign_in_at
FROM auth.users 
WHERE auth.uid() IS NULL
ORDER BY created_at DESC
LIMIT 10; 
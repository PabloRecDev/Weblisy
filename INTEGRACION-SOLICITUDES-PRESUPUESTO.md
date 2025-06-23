# Integración de Solicitudes de Presupuesto - Weblisy CRM

## Resumen
Este documento describe la implementación de la integración entre las solicitudes de presupuesto de la web y el sistema CRM de Weblisy.

## Funcionalidad Implementada

### 1. Nueva Tabla de Base de Datos
- **Archivo**: `presupuesto-requests-table.sql`
- **Tabla**: `presupuesto_requests`
- **Propósito**: Almacenar las solicitudes de presupuesto que llegan desde la web

### 2. Componentes Creados
- **AdminSolicitudesPresupuesto.jsx**: Componente principal para gestionar solicitudes
- **SolicitudesPresupuesto.jsx**: Página admin para las solicitudes
- **Rutas actualizadas**: Agregada nueva ruta `/admin/solicitudes-presupuesto`

### 3. Formulario de Presupuesto Actualizado
- **PresupuestoSection.jsx**: Modificado para guardar en la nueva tabla
- **Datos capturados**: Nombre, email, empresa, tipo de proyecto, funcionalidades, presupuesto, plazo

## Flujo de Trabajo

### 1. Solicitud desde la Web
1. Usuario completa el formulario de presupuesto en `/presupuesto`
2. Los datos se guardan en la tabla `presupuesto_requests`
3. Estado inicial: `new`

### 2. Gestión en el CRM
1. Admin accede a `/admin/solicitudes-presupuesto`
2. Ve todas las solicitudes con filtros por estado y prioridad
3. Puede cambiar estado y prioridad
4. Puede ver detalles completos de cada solicitud

### 3. Conversión a Presupuesto
1. Admin selecciona "Convertir a Presupuesto"
2. Se redirige al formulario de presupuestos con datos pre-rellenados
3. Se crea el presupuesto formal
4. La solicitud se marca como `converted`

## Estados de las Solicitudes

- **new**: Nueva solicitud recibida
- **reviewing**: En revisión por el equipo
- **quoted**: Presupuesto enviado al cliente
- **converted**: Convertida en presupuesto formal
- **archived**: Archivada

## Prioridades

- **urgent**: Urgente (rojo)
- **high**: Alta (naranja)
- **medium**: Media (amarillo)
- **low**: Baja (verde)

## Instalación

### 1. Ejecutar Script SQL
```sql
-- Ejecutar el contenido de presupuesto-requests-table.sql en Supabase
```

### 2. Verificar Componentes
- ✅ `src/components/AdminSolicitudesPresupuesto.jsx`
- ✅ `src/pages/admin/SolicitudesPresupuesto.jsx`
- ✅ `src/components/PresupuestoSection.jsx` (actualizado)
- ✅ `src/App.jsx` (rutas actualizadas)
- ✅ `src/components/AdminLayout.jsx` (menú actualizado)

### 3. Probar Funcionalidad
1. Ir a `/presupuesto` y enviar una solicitud
2. Verificar que aparece en `/admin/solicitudes-presupuesto`
3. Probar filtros y cambios de estado
4. Probar conversión a presupuesto

## Características del Sistema

### Dashboard de Solicitudes
- **Estadísticas**: Total, nuevas, en revisión, presupuestadas, convertidas, archivadas
- **Filtros**: Por estado, prioridad y búsqueda de texto
- **Tabla responsive**: Con información clave de cada solicitud
- **Acciones rápidas**: Cambiar estado y prioridad directamente

### Modal de Detalles
- **Información completa**: Todos los datos de la solicitud
- **Edición inline**: Cambiar estado y prioridad
- **Botón de conversión**: Convertir directamente a presupuesto

### Integración con Presupuestos
- **Datos pre-rellenados**: Al convertir, los datos se pasan al formulario de presupuestos
- **Trazabilidad**: Se mantiene la relación entre solicitud y presupuesto
- **Flujo optimizado**: Reducción de tiempo en la creación de presupuestos

## Beneficios

1. **Centralización**: Todas las solicitudes en un solo lugar
2. **Seguimiento**: Control completo del estado de cada solicitud
3. **Eficiencia**: Conversión rápida de solicitudes a presupuestos
4. **Análisis**: Estadísticas para mejorar el proceso de ventas
5. **Organización**: Filtros y prioridades para gestionar mejor el trabajo

## Próximos Pasos (Opcionales)

1. **Notificaciones**: Alertas cuando llegan nuevas solicitudes
2. **Email automático**: Confirmación automática al cliente
3. **Plantillas**: Plantillas de presupuesto basadas en el tipo de proyecto
4. **Reportes**: Análisis de conversión y tiempos de respuesta
5. **Integración con calendario**: Agendar reuniones directamente desde la solicitud

## Notas Técnicas

- **Base de datos**: Supabase con RLS habilitado
- **Frontend**: React con Framer Motion para animaciones
- **Estado**: Datos mock por ahora, listo para conectar con Supabase
- **Responsive**: Diseño adaptado para móvil y desktop
- **Accesibilidad**: ARIA labels y navegación por teclado

## Soporte

Para dudas o problemas con la implementación, revisar:
1. Logs de la consola del navegador
2. Logs de Supabase
3. Configuración de RLS en la base de datos
4. Rutas y componentes en React 
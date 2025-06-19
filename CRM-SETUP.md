# Configuración del Sistema CRM - WebLisy

## Descripción
Este sistema CRM permite gestionar las reuniones agendadas desde el formulario de contacto de la web. Los datos se almacenan en Supabase y se pueden administrar desde un panel de administración.

## Características del CRM

### 📊 Dashboard Principal
- **Estadísticas en tiempo real**: Total de reuniones, pendientes, confirmadas, completadas y canceladas
- **Filtros avanzados**: Por estado, búsqueda por nombre, email o empresa
- **Tabla interactiva**: Con acciones para ver detalles, cambiar estado y eliminar reuniones

### 🔍 Funcionalidades
- **Búsqueda en tiempo real**: Filtra reuniones por cliente o empresa
- **Gestión de estados**: Cambia el estado de las reuniones (pendiente, confirmada, completada, cancelada)
- **Vista detallada**: Modal con toda la información de cada reunión
- **Eliminación segura**: Confirmación antes de eliminar registros
- **Actualización automática**: Los datos se actualizan en tiempo real

### 📱 Diseño Responsive
- Interfaz moderna con tema oscuro
- Compatible con móviles, tablets y desktop
- Animaciones suaves con Framer Motion

## Configuración de la Base de Datos

### 1. Crear la tabla en Supabase

1. Ve a tu proyecto de Supabase
2. Abre el **SQL Editor**
3. Copia y ejecuta el contenido del archivo `database-setup.sql`

### 2. Verificar la configuración

Asegúrate de que las credenciales en `src/config.js` sean correctas:

```javascript
export const supabaseUrl = 'TU_URL_DE_SUPABASE';
export const supabaseAnonKey = 'TU_ANON_KEY';
```

## Estructura de la Base de Datos

### Tabla: `meetings`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Identificador único |
| `name` | VARCHAR(255) | Nombre del cliente |
| `email` | VARCHAR(255) | Email del cliente |
| `company` | VARCHAR(255) | Empresa (opcional) |
| `message` | TEXT | Mensaje adicional (opcional) |
| `meeting_date` | DATE | Fecha de la reunión |
| `meeting_time` | VARCHAR(10) | Hora de la reunión |
| `meeting_type` | VARCHAR(50) | Tipo (video, phone, chat) |
| `meeting_type_name` | VARCHAR(100) | Nombre del tipo |
| `status` | VARCHAR(20) | Estado (pending, confirmed, completed, cancelled) |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Fecha de última actualización |

## Estados de las Reuniones

- **Pendiente**: Reunión recién agendada
- **Confirmada**: Reunión confirmada por el administrador
- **Completada**: Reunión ya realizada
- **Cancelada**: Reunión cancelada

## Acceso al Panel de Administración

### URL del CRM
```
https://tu-dominio.com/admin/dashboard
```

### Autenticación
El panel está protegido con el sistema de autenticación existente. Necesitas:
1. Tener una cuenta de administrador
2. Iniciar sesión en `/login`
3. Ser redirigido al dashboard

## Flujo de Trabajo

### 1. Cliente agenda reunión
- Completa el formulario en `/agendar`
- Los datos se guardan automáticamente en Supabase
- Estado inicial: "Pendiente"

### 2. Administrador gestiona
- Accede al panel en `/admin/dashboard`
- Ve todas las reuniones pendientes
- Cambia estados según corresponda
- Puede ver detalles completos de cada reunión

### 3. Seguimiento
- Filtra por estado para ver reuniones confirmadas
- Marca como completadas las reuniones realizadas
- Mantiene un historial completo

## Personalización

### Colores de estados
Los colores se pueden personalizar en `src/components/AdminDashboard.jsx`:

```javascript
const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'confirmed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};
```

### Horarios disponibles
Los horarios se pueden modificar en `src/components/MeetingScheduler.jsx`:

```javascript
const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];
```

## Seguridad

### Row Level Security (RLS)
La tabla tiene RLS habilitado con políticas que permiten:
- Inserción desde la aplicación web
- Lectura, actualización y eliminación desde el panel de administración

### Validaciones
- Fechas pasadas no se pueden seleccionar
- Domingos están deshabilitados
- Campos obligatorios validados en frontend y backend

## Mantenimiento

### Backup
- Supabase realiza backups automáticos
- Puedes exportar datos desde el panel de Supabase

### Monitoreo
- Revisa regularmente las reuniones pendientes
- Actualiza estados de reuniones completadas
- Limpia reuniones canceladas antiguas si es necesario

## Soporte

Si tienes problemas con el CRM:
1. Verifica la conexión a Supabase
2. Revisa los logs de la consola del navegador
3. Confirma que la tabla `meetings` existe y tiene la estructura correcta
4. Verifica que las políticas RLS estén configuradas correctamente

## Próximas Mejoras

- [ ] Notificaciones por email automáticas
- [ ] Exportación de datos a Excel/CSV
- [ ] Calendario integrado con Google Calendar
- [ ] Dashboard con gráficos y estadísticas avanzadas
- [ ] Sistema de recordatorios automáticos 
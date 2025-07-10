import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Download, 
  Trash2, 
  Save,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  Mail,
  Phone,
  MapPin,
  Link
} from 'lucide-react';
import CvmasteAppLayout from './layout';

export default function Configuracion() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false
  });

  const [profileData, setProfileData] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@email.com',
    telefono: '+34 123 456 789',
    ubicacion: 'Madrid, España',
    linkedin: 'https://linkedin.com/in/juan-perez',
    github: 'https://github.com/juan-perez',
    sitioWeb: 'https://juanperez.dev'
  });

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: '#2a2a2a',
    border: '1px solid #444',
    borderRadius: 8,
    color: '#fff',
    fontSize: 14
  };

  const buttonStyle = {
    padding: '12px 24px',
    borderRadius: 8,
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.3s ease'
  };

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: <User size={20} /> },
    { id: 'notificaciones', label: 'Notificaciones', icon: <Bell size={20} /> },
    { id: 'privacidad', label: 'Privacidad', icon: <Shield size={20} /> },
    { id: 'apariencia', label: 'Apariencia', icon: <Palette size={20} /> },
    { id: 'cuenta', label: 'Cuenta', icon: <Globe size={20} /> }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'perfil':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ 
              background: '#171717', 
              borderRadius: 12, 
              padding: 24, 
              border: '1px solid #333' 
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
                Información Personal
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={profileData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    style={inputStyle}
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    style={inputStyle}
                    value={profileData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Ubicación
                  </label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={profileData.ubicacion}
                    onChange={(e) => handleInputChange('ubicacion', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#171717', 
              borderRadius: 12, 
              padding: 24, 
              border: '1px solid #333' 
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
                Redes Sociales y Enlaces
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    style={inputStyle}
                    value={profileData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    GitHub
                  </label>
                  <input
                    type="url"
                    style={inputStyle}
                    value={profileData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Sitio Web Personal
                  </label>
                  <input
                    type="url"
                    style={inputStyle}
                    value={profileData.sitioWeb}
                    onChange={(e) => handleInputChange('sitioWeb', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button style={{ 
                ...buttonStyle, 
                background: '#5e17eb', 
                color: '#fff' 
              }}>
                <Save size={20} />
                Guardar Cambios
              </button>
            </div>
          </div>
        );

      case 'notificaciones':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ 
              background: '#171717', 
              borderRadius: 12, 
              padding: 24, 
              border: '1px solid #333' 
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
                Preferencias de Notificaciones
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>
                      Notificaciones por Email
                    </div>
                    <div style={{ color: '#b0b0b0', fontSize: 14 }}>
                      Recibe actualizaciones sobre tus CVs por correo electrónico
                    </div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('email')}
                    style={{
                      background: notifications.email ? '#5e17eb' : '#444',
                      border: 'none',
                      borderRadius: 12,
                      width: 48,
                      height: 24,
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      width: 20,
                      height: 20,
                      background: '#fff',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: 2,
                      left: notifications.email ? 26 : 2,
                      transition: 'all 0.3s ease'
                    }} />
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>
                      Notificaciones Push
                    </div>
                    <div style={{ color: '#b0b0b0', fontSize: 14 }}>
                      Recibe notificaciones en tiempo real en tu navegador
                    </div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('push')}
                    style={{
                      background: notifications.push ? '#5e17eb' : '#444',
                      border: 'none',
                      borderRadius: 12,
                      width: 48,
                      height: 24,
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      width: 20,
                      height: 20,
                      background: '#fff',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: 2,
                      left: notifications.push ? 26 : 2,
                      transition: 'all 0.3s ease'
                    }} />
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>
                      Marketing y Promociones
                    </div>
                    <div style={{ color: '#b0b0b0', fontSize: 14 }}>
                      Recibe ofertas especiales y noticias sobre nuevas funciones
                    </div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('marketing')}
                    style={{
                      background: notifications.marketing ? '#5e17eb' : '#444',
                      border: 'none',
                      borderRadius: 12,
                      width: 48,
                      height: 24,
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      width: 20,
                      height: 20,
                      background: '#fff',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: 2,
                      left: notifications.marketing ? 26 : 2,
                      transition: 'all 0.3s ease'
                    }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacidad':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ 
              background: '#171717', 
              borderRadius: 12, 
              padding: 24, 
              border: '1px solid #333' 
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
                Configuración de Privacidad
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ padding: 16, background: '#2a2a2a', borderRadius: 8, border: '1px solid #444' }}>
                  <h4 style={{ color: '#fff', fontWeight: 500, marginBottom: 8 }}>
                    Visibilidad del Perfil
                  </h4>
                  <p style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 12 }}>
                    Controla quién puede ver tu información de perfil
                  </p>
                  <select style={inputStyle}>
                    <option value="public">Público</option>
                    <option value="private">Privado</option>
                    <option value="contacts">Solo contactos</option>
                  </select>
                </div>
                <div style={{ padding: 16, background: '#2a2a2a', borderRadius: 8, border: '1px solid #444' }}>
                  <h4 style={{ color: '#fff', fontWeight: 500, marginBottom: 8 }}>
                    Compartir CVs
                  </h4>
                  <p style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 12 }}>
                    Configuración predeterminada para compartir nuevos CVs
                  </p>
                  <select style={inputStyle}>
                    <option value="link">Solo con enlace</option>
                    <option value="public">Público</option>
                    <option value="private">Privado</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#171717', 
              borderRadius: 12, 
              padding: 24, 
              border: '1px solid #333' 
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
                Cambiar Contraseña
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Contraseña Actual
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      style={inputStyle}
                      placeholder="Ingresa tu contraseña actual"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#b0b0b0',
                        cursor: 'pointer'
                      }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    style={inputStyle}
                    placeholder="Ingresa tu nueva contraseña"
                  />
                </div>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    style={inputStyle}
                    placeholder="Confirma tu nueva contraseña"
                  />
                </div>
                <button style={{ 
                  ...buttonStyle, 
                  background: '#5e17eb', 
                  color: '#fff',
                  alignSelf: 'flex-start'
                }}>
                  <Shield size={20} />
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>
        );

      case 'apariencia':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ 
              background: '#171717', 
              borderRadius: 12, 
              padding: 24, 
              border: '1px solid #333' 
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
                Tema de la Aplicación
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <div 
                  onClick={() => setTheme('dark')}
                  style={{ 
                    padding: 20, 
                    background: theme === 'dark' ? '#5e17eb' : '#2a2a2a', 
                    borderRadius: 8, 
                    border: `1px solid ${theme === 'dark' ? '#5e17eb' : '#444'}`,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Moon size={32} color={theme === 'dark' ? '#fff' : '#b0b0b0'} style={{ marginBottom: 12 }} />
                  <div style={{ color: theme === 'dark' ? '#fff' : '#b0b0b0', fontWeight: 500 }}>
                    Modo Oscuro
                  </div>
                </div>
                <div 
                  onClick={() => setTheme('light')}
                  style={{ 
                    padding: 20, 
                    background: theme === 'light' ? '#5e17eb' : '#2a2a2a', 
                    borderRadius: 8, 
                    border: `1px solid ${theme === 'light' ? '#5e17eb' : '#444'}`,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Sun size={32} color={theme === 'light' ? '#fff' : '#b0b0b0'} style={{ marginBottom: 12 }} />
                  <div style={{ color: theme === 'light' ? '#fff' : '#b0b0b0', fontWeight: 500 }}>
                    Modo Claro
                  </div>
                </div>
                <div 
                  onClick={() => setTheme('system')}
                  style={{ 
                    padding: 20, 
                    background: theme === 'system' ? '#5e17eb' : '#2a2a2a', 
                    borderRadius: 8, 
                    border: `1px solid ${theme === 'system' ? '#5e17eb' : '#444'}`,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Monitor size={32} color={theme === 'system' ? '#fff' : '#b0b0b0'} style={{ marginBottom: 12 }} />
                  <div style={{ color: theme === 'system' ? '#fff' : '#b0b0b0', fontWeight: 500 }}>
                    Sistema
                  </div>
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#171717', 
              borderRadius: 12, 
              padding: 24, 
              border: '1px solid #333' 
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
                Configuración de Visualización
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Tamaño de Fuente
                  </label>
                  <select style={inputStyle}>
                    <option value="small">Pequeño</option>
                    <option value="medium">Mediano</option>
                    <option value="large">Grande</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Idioma de la Interfaz
                  </label>
                  <select style={inputStyle}>
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cuenta':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ 
              background: '#171717', 
              borderRadius: 12, 
              padding: 24, 
              border: '1px solid #333' 
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
                Información de la Cuenta
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 500 }}>Plan Actual</div>
                    <div style={{ color: '#b0b0b0', fontSize: 14 }}>Plan Gratuito</div>
                  </div>
                  <button style={{ 
                    ...buttonStyle, 
                    background: '#5e17eb', 
                    color: '#fff',
                    padding: '8px 16px'
                  }}>
                    Actualizar Plan
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 500 }}>Miembro desde</div>
                    <div style={{ color: '#b0b0b0', fontSize: 14 }}>15 de Mayo, 2024</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 500 }}>CVs Creados</div>
                    <div style={{ color: '#b0b0b0', fontSize: 14 }}>4 de 10 (Plan Gratuito)</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#171717', 
              borderRadius: 12, 
              padding: 24, 
              border: '1px solid #333' 
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
                Exportar Datos
              </h3>
              <p style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 16 }}>
                Descarga una copia de todos tus datos almacenados en CV Master
              </p>
              <button style={{ 
                ...buttonStyle, 
                background: '#2e7d32', 
                color: '#fff' 
              }}>
                <Download size={20} />
                Descargar Datos
              </button>
            </div>

            <div style={{ 
              background: '#171717', 
              borderRadius: 12, 
              padding: 24, 
              border: '1px solid #d32f2f' 
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#d32f2f', marginBottom: 20 }}>
                Zona de Peligro
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <h4 style={{ color: '#fff', fontWeight: 500, marginBottom: 8 }}>
                    Eliminar Cuenta
                  </h4>
                  <p style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 12 }}>
                    Esta acción eliminará permanentemente tu cuenta y todos los datos asociados. Esta acción no se puede deshacer.
                  </p>
                  <button style={{ 
                    ...buttonStyle, 
                    background: '#d32f2f', 
                    color: '#fff' 
                  }}>
                    <Trash2 size={20} />
                    Eliminar Cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <CvmasteAppLayout>
      <div style={{ width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
            Configuración
          </h1>
          <p style={{ color: '#b0b0b0', fontSize: 'clamp(14px, 2vw, 16px)' }}>
            Personaliza tu experiencia en CV Master
          </p>
        </div>

        {/* Tabs */}
        <div style={{ 
          background: '#171717', 
          borderRadius: 12, 
          padding: 4, 
          border: '1px solid #333',
          marginBottom: 24
        }}>
          <div style={{ 
            display: 'flex', 
            gap: 4,
            overflowX: 'auto',
            paddingBottom: 4
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? '#5e17eb' : 'transparent',
                  color: activeTab === tab.id ? '#fff' : '#b0b0b0',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {renderTabContent()}
        </div>
      </div>
    </CvmasteAppLayout>
  );
} 

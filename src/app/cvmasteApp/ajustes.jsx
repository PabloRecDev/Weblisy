import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Lock, 
  Palette, 
  Globe, 
  Download, 
  Trash2,
  Save,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Calendar,
  Shield,
  Clock
} from 'lucide-react';
import CvmasteAppLayout from './layout';
import { useCVMasterAuth } from '../../contexts/CVMasterAuthContext';

export default function Ajustes() {
  const { user, profile, updateProfile, loading } = useCVMasterAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [settings, setSettings] = useState({
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      profession: '',
      location: '',
      bio: '',
      linkedin_url: '',
      github_url: '',
      website_url: ''
    },
    notifications: {
      email: true,
      push: false,
      updates: true,
      marketing: false
    },
    privacy: {
      profilePublic: false,
      showEmail: true,
      showPhone: false
    },
    appearance: {
      theme: 'dark',
      language: 'es',
      fontSize: 'medium'
    },
    account: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    if (user && profile) {
      setSettings(prev => ({
        ...prev,
        profile: {
          firstName: profile.first_name || '',
          lastName: profile.last_name || '',
          email: user.email || '',
          phone: profile.phone || '',
          profession: profile.profession || '',
          location: profile.location || '',
          bio: profile.bio || '',
          linkedin_url: profile.linkedin_url || '',
          github_url: profile.github_url || '',
          website_url: profile.website_url || ''
        }
      }));
    }
  }, [user, profile]);

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSaveProfile = async () => {
    setSaveLoading(true);
    setMessage('');
    
    try {
      const profileData = {
        first_name: settings.profile.firstName,
        last_name: settings.profile.lastName,
        phone: settings.profile.phone,
        profession: settings.profile.profession,
        location: settings.profile.location,
        bio: settings.profile.bio,
        linkedin_url: settings.profile.linkedin_url,
        github_url: settings.profile.github_url,
        website_url: settings.profile.website_url
      };

      const { error } = await updateProfile(profileData);
      
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Perfil actualizado correctamente');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setSaveLoading(false);
    }
  };

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

  return (
    <CvmasteAppLayout>
      <div style={{ 
        width: '100%', 
        padding: '0 20px',
        minHeight: '100vh',
        background: '#121212'
      }}>
        {/* Header */}
        <div style={{ marginBottom: 32, textAlign: 'center', paddingTop: 20 }}>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
            Configuración
          </h1>
          <p style={{ color: '#b0b0b0', fontSize: 'clamp(14px, 2vw, 16px)' }}>
            Personaliza tu experiencia y gestiona tu cuenta
          </p>
        </div>

        {/* Settings Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 24,
          maxWidth: '1200px',
          margin: '0 auto',
          paddingBottom: 40
        }}>
          {/* Perfil */}
          <div style={{ 
            background: 'linear-gradient(135deg, #1a1a1a 0%, #232323 100%)', 
            borderRadius: 12, 
            padding: 24, 
            border: '1px solid #333' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <User size={24} color="#5e17eb" />
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>
                Perfil Personal
              </h2>
            </div>
            
            {/* Mensaje de estado */}
            {message && (
              <div style={{ 
                padding: '12px 16px', 
                borderRadius: 8, 
                marginBottom: 16,
                background: message.includes('Error') ? '#dc2626' : '#10b981',
                color: '#fff',
                fontSize: 14
              }}>
                {message}
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={settings.profile.firstName}
                    onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Apellidos
                  </label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={settings.profile.lastName}
                    onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
                    placeholder="Tus apellidos"
                  />
                </div>
              </div>
              
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  <Mail size={16} style={{ display: 'inline', marginRight: 8 }} />
                  Email
                </label>
                <input
                  type="email"
                  style={{ ...inputStyle, background: '#1a1a1a', cursor: 'not-allowed' }}
                  value={settings.profile.email}
                  disabled
                  placeholder="tu@email.com"
                />
                <p style={{ color: '#888', fontSize: 12, marginTop: 4 }}>
                  El email no se puede cambiar
                </p>
              </div>
              
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  <Phone size={16} style={{ display: 'inline', marginRight: 8 }} />
                  Teléfono
                </label>
                <input
                  type="tel"
                  style={inputStyle}
                  value={settings.profile.phone}
                  onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                  placeholder="+34 123 456 789"
                />
              </div>
              
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  Profesión
                </label>
                <input
                  type="text"
                  style={inputStyle}
                  value={settings.profile.profession}
                  onChange={(e) => handleInputChange('profile', 'profession', e.target.value)}
                  placeholder="Desarrollador Full Stack"
                />
              </div>
              
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  Ubicación
                </label>
                <input
                  type="text"
                  style={inputStyle}
                  value={settings.profile.location}
                  onChange={(e) => handleInputChange('profile', 'location', e.target.value)}
                  placeholder="Madrid, España"
                />
              </div>
              
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  Biografía
                </label>
                <textarea
                  style={{ ...inputStyle, height: 80, resize: 'vertical' }}
                  value={settings.profile.bio}
                  onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
                  placeholder="Cuéntanos sobre ti..."
                />
              </div>
              
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  LinkedIn
                </label>
                <input
                  type="url"
                  style={inputStyle}
                  value={settings.profile.linkedin_url}
                  onChange={(e) => handleInputChange('profile', 'linkedin_url', e.target.value)}
                  placeholder="https://linkedin.com/in/tu-perfil"
                />
              </div>
              
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  GitHub
                </label>
                <input
                  type="url"
                  style={inputStyle}
                  value={settings.profile.github_url}
                  onChange={(e) => handleInputChange('profile', 'github_url', e.target.value)}
                  placeholder="https://github.com/tu-usuario"
                />
              </div>
              
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  Sitio Web
                </label>
                <input
                  type="url"
                  style={inputStyle}
                  value={settings.profile.website_url}
                  onChange={(e) => handleInputChange('profile', 'website_url', e.target.value)}
                  placeholder="https://tu-sitio-web.com"
                />
              </div>
              
              <button 
                onClick={handleSaveProfile}
                disabled={saveLoading}
                style={{ 
                  ...buttonStyle, 
                  background: saveLoading ? '#666' : 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)', 
                  color: '#fff',
                  cursor: saveLoading ? 'not-allowed' : 'pointer'
                }}
              >
                <Save size={16} />
                {saveLoading ? 'Guardando...' : 'Guardar Perfil'}
              </button>
            </div>
          </div>

          {/* Información de la Cuenta */}
          <div style={{ 
            background: 'linear-gradient(135deg, #1a1a1a 0%, #232323 100%)', 
            borderRadius: 12, 
            padding: 24, 
            border: '1px solid #333' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Shield size={24} color="#5e17eb" />
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>
                Información de la Cuenta
              </h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: 16 
              }}>
                <div style={{ 
                  background: '#2a2a2a', 
                  padding: '16px', 
                  borderRadius: 8, 
                  border: '1px solid #444' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <User size={16} color="#5e17eb" />
                    <span style={{ color: '#b0b0b0', fontSize: 12 }}>ID de Usuario</span>
                  </div>
                  <div style={{ 
                    color: '#fff', 
                    fontSize: 14, 
                    fontFamily: 'monospace',
                    wordBreak: 'break-all'
                  }}>
                    {user?.id || 'N/A'}
                  </div>
                </div>
                
                <div style={{ 
                  background: '#2a2a2a', 
                  padding: '16px', 
                  borderRadius: 8, 
                  border: '1px solid #444' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Mail size={16} color="#5e17eb" />
                    <span style={{ color: '#b0b0b0', fontSize: 12 }}>Email</span>
                  </div>
                  <div style={{ color: '#fff', fontSize: 14 }}>
                    {user?.email || 'N/A'}
                  </div>
                </div>
                
                <div style={{ 
                  background: '#2a2a2a', 
                  padding: '16px', 
                  borderRadius: 8, 
                  border: '1px solid #444' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Calendar size={16} color="#5e17eb" />
                    <span style={{ color: '#b0b0b0', fontSize: 12 }}>Cuenta Creada</span>
                  </div>
                  <div style={{ color: '#fff', fontSize: 14 }}>
                    {user?.created_at 
                      ? new Date(user.created_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'N/A'
                    }
                  </div>
                </div>
                
                <div style={{ 
                  background: '#2a2a2a', 
                  padding: '16px', 
                  borderRadius: 8, 
                  border: '1px solid #444' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Clock size={16} color="#5e17eb" />
                    <span style={{ color: '#b0b0b0', fontSize: 12 }}>Último Acceso</span>
                  </div>
                  <div style={{ color: '#fff', fontSize: 14 }}>
                    {user?.last_sign_in_at 
                      ? new Date(user.last_sign_in_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'N/A'
                    }
                  </div>
                </div>
                
                <div style={{ 
                  background: '#2a2a2a', 
                  padding: '16px', 
                  borderRadius: 8, 
                  border: '1px solid #444' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Shield size={16} color="#5e17eb" />
                    <span style={{ color: '#b0b0b0', fontSize: 12 }}>Estado</span>
                  </div>
                  <div style={{ 
                    color: user?.email_confirmed_at ? '#10b981' : '#f59e0b', 
                    fontSize: 14 
                  }}>
                    {user?.email_confirmed_at ? 'Verificado' : 'Pendiente verificación'}
                  </div>
                </div>
                
                <div style={{ 
                  background: '#2a2a2a', 
                  padding: '16px', 
                  borderRadius: 8, 
                  border: '1px solid #444' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Globe size={16} color="#5e17eb" />
                    <span style={{ color: '#b0b0b0', fontSize: 12 }}>Proveedor</span>
                  </div>
                  <div style={{ color: '#fff', fontSize: 14 }}>
                    {user?.app_metadata?.provider || 'Email'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div style={{ 
            background: 'linear-gradient(135deg, #1a1a1a 0%, #232323 100%)', 
            borderRadius: 12, 
            padding: 24, 
            border: '1px solid #333' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Bell size={24} color="#5e17eb" />
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>
                Notificaciones
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>
                    Notificaciones por email
                  </div>
                  <div style={{ color: '#888', fontSize: 12 }}>
                    Recibe actualizaciones importantes por correo
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: 50, height: 24 }}>
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) => handleInputChange('notifications', 'email', e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: settings.notifications.email ? '#5e17eb' : '#444',
                    borderRadius: 24,
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: 18,
                      width: 18,
                      left: settings.notifications.email ? 28 : 3,
                      bottom: 3,
                      background: '#fff',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease'
                    }} />
                  </span>
                </label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>
                    Notificaciones push
                  </div>
                  <div style={{ color: '#888', fontSize: 12 }}>
                    Recibe notificaciones en el navegador
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: 50, height: 24 }}>
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) => handleInputChange('notifications', 'push', e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: settings.notifications.push ? '#5e17eb' : '#444',
                    borderRadius: 24,
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: 18,
                      width: 18,
                      left: settings.notifications.push ? 28 : 3,
                      bottom: 3,
                      background: '#fff',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease'
                    }} />
                  </span>
                </label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>
                    Actualizaciones de producto
                  </div>
                  <div style={{ color: '#888', fontSize: 12 }}>
                    Novedades y mejoras de la aplicación
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: 50, height: 24 }}>
                  <input
                    type="checkbox"
                    checked={settings.notifications.updates}
                    onChange={(e) => handleInputChange('notifications', 'updates', e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: settings.notifications.updates ? '#5e17eb' : '#444',
                    borderRadius: 24,
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: 18,
                      width: 18,
                      left: settings.notifications.updates ? 28 : 3,
                      bottom: 3,
                      background: '#fff',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease'
                    }} />
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Privacidad */}
          <div style={{ 
            background: 'linear-gradient(135deg, #1a1a1a 0%, #232323 100%)', 
            borderRadius: 12, 
            padding: 24, 
            border: '1px solid #333' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Lock size={24} color="#5e17eb" />
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>
                Privacidad
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>
                    Perfil público
                  </div>
                  <div style={{ color: '#888', fontSize: 12 }}>
                    Permite que otros vean tu perfil
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: 50, height: 24 }}>
                  <input
                    type="checkbox"
                    checked={settings.privacy.profilePublic}
                    onChange={(e) => handleInputChange('privacy', 'profilePublic', e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: settings.privacy.profilePublic ? '#5e17eb' : '#444',
                    borderRadius: 24,
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: 18,
                      width: 18,
                      left: settings.privacy.profilePublic ? 28 : 3,
                      bottom: 3,
                      background: '#fff',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease'
                    }} />
                  </span>
                </label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>
                    Mostrar email
                  </div>
                  <div style={{ color: '#888', fontSize: 12 }}>
                    Incluir email en perfil público
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: 50, height: 24 }}>
                  <input
                    type="checkbox"
                    checked={settings.privacy.showEmail}
                    onChange={(e) => handleInputChange('privacy', 'showEmail', e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: settings.privacy.showEmail ? '#5e17eb' : '#444',
                    borderRadius: 24,
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: 18,
                      width: 18,
                      left: settings.privacy.showEmail ? 28 : 3,
                      bottom: 3,
                      background: '#fff',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease'
                    }} />
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Apariencia */}
          <div style={{ 
            background: 'linear-gradient(135deg, #1a1a1a 0%, #232323 100%)', 
            borderRadius: 12, 
            padding: 24, 
            border: '1px solid #333' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Palette size={24} color="#5e17eb" />
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>
                Apariencia
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  Tema
                </label>
                <select
                  style={inputStyle}
                  value={settings.appearance.theme}
                  onChange={(e) => handleInputChange('appearance', 'theme', e.target.value)}
                >
                  <option value="dark">Oscuro</option>
                  <option value="light">Claro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  Idioma
                </label>
                <select
                  style={inputStyle}
                  value={settings.appearance.language}
                  onChange={(e) => handleInputChange('appearance', 'language', e.target.value)}
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  Tamaño de fuente
                </label>
                <select
                  style={inputStyle}
                  value={settings.appearance.fontSize}
                  onChange={(e) => handleInputChange('appearance', 'fontSize', e.target.value)}
                >
                  <option value="small">Pequeño</option>
                  <option value="medium">Mediano</option>
                  <option value="large">Grande</option>
                </select>
              </div>
            </div>
          </div>

          {/* Seguridad */}
          <div style={{ 
            background: 'linear-gradient(135deg, #1a1a1a 0%, #232323 100%)', 
            borderRadius: 12, 
            padding: 24, 
            border: '1px solid #333' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Lock size={24} color="#5e17eb" />
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>
                Cambiar Contraseña
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  Contraseña actual
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    style={inputStyle}
                    value={settings.account.currentPassword}
                    onChange={(e) => handleInputChange('account', 'currentPassword', e.target.value)}
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
                      color: '#666',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  style={inputStyle}
                  value={settings.account.newPassword}
                  onChange={(e) => handleInputChange('account', 'newPassword', e.target.value)}
                  placeholder="Ingresa tu nueva contraseña"
                />
              </div>
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  style={inputStyle}
                  value={settings.account.confirmPassword}
                  onChange={(e) => handleInputChange('account', 'confirmPassword', e.target.value)}
                  placeholder="Confirma tu nueva contraseña"
                />
              </div>
              <button style={{ 
                ...buttonStyle, 
                background: 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)', 
                color: '#fff' 
              }}>
                <Save size={16} />
                Actualizar Contraseña
              </button>
            </div>
          </div>

          {/* Datos y Exportación */}
          <div style={{ 
            background: 'linear-gradient(135deg, #1a1a1a 0%, #232323 100%)', 
            borderRadius: 12, 
            padding: 24, 
            border: '1px solid #333' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Download size={24} color="#5e17eb" />
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>
                Datos y Exportación
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                  Exportar datos
                </h3>
                <p style={{ color: '#888', fontSize: 14, marginBottom: 16 }}>
                  Descarga una copia de todos tus datos personales y CVs
                </p>
                <button style={{ 
                  ...buttonStyle, 
                  background: '#2e7d32', 
                  color: '#fff' 
                }}>
                  <Download size={16} />
                  Descargar Datos
                </button>
              </div>
              <div style={{ borderTop: '1px solid #333', paddingTop: 16 }}>
                <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                  Eliminar cuenta
                </h3>
                <p style={{ color: '#888', fontSize: 14, marginBottom: 16 }}>
                  Esta acción eliminará permanentemente tu cuenta y todos tus datos
                </p>
                <button style={{ 
                  ...buttonStyle, 
                  background: '#d32f2f', 
                  color: '#fff' 
                }}>
                  <Trash2 size={16} />
                  Eliminar Cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CvmasteAppLayout>
  );
} 

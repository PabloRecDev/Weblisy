import React, { useState, useEffect } from 'react';
import { Home, FileText, Settings, HelpCircle, Menu, X, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCVMasterAuth } from '../../contexts/CVMasterAuthContext';

// Estilos CSS personalizados para el scroll del sidebar
const sidebarScrollStyles = `
  .sidebar-scroll::-webkit-scrollbar {
    width: 6px;
  }
  
  .sidebar-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .sidebar-scroll::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 3px;
  }
  
  .sidebar-scroll::-webkit-scrollbar-thumb:hover {
    background: #666;
  }
`;

export default function CvmasteAppLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut, user, profile } = useCVMasterAuth();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Añadir estilos CSS al head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = sidebarScrollStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const isActive = (path) => {
    return window.location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      // Usar la función signOut del contexto
      await signOut();
      
      // Redirigir al login
      navigate('/cvmaster-login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Fallback: limpiar datos locales y redirigir
      localStorage.removeItem('cvmaster_token');
      localStorage.removeItem('cvmaster_user');
      navigate('/cvmaster-login');
    }
  };

  const navItems = [
    { 
      label: 'Dashboard', 
      href: '/cvmasterApp', 
      icon: <Home size={18} />,
      category: 'PRINCIPAL'
    },
    { 
      label: 'Crear CV', 
      href: '/cvmasterApp/crear', 
      icon: <FileText size={18} />,
      category: 'PRINCIPAL'
    },
    { 
      label: 'Mis CVs', 
      href: '/cvmasterApp/mis-cvs', 
      icon: <FileText size={18} />,
      category: 'PRINCIPAL'
    },
    { 
      label: 'Configuración', 
      href: '/cvmasterApp/ajustes', 
      icon: <Settings size={18} />,
      category: 'CONFIGURACIÓN'
    },
    { 
      label: 'Ayuda', 
      href: '/cvmasterApp/ayuda', 
      icon: <HelpCircle size={18} />,
      category: 'CONFIGURACIÓN'
    }
  ];

  const groupedNavItems = navItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const sidebarContent = (
    <div style={{ 
      height: '100vh', 
      background: '#171717', 
      width: '280px',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #333',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '20px 24px',
        borderBottom: '1px solid #333',
        flexShrink: 0
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 12 
        }}>
          <img
            src="/assets/cv.png"
            alt="CV Master"
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'
            }}
          />
          <div>
            <div style={{ 
              color: '#fff',
              fontFamily: 'Circular, "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '24px',
              letterSpacing: '-0.01em'
            }}>
              cv master
            </div>
            <div style={{ 
              color: '#b0b0b0', 
              fontSize: 12 
            }}>
              Crea CVs profesionales
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <div style={{ 
        flex: 1, 
        padding: '24px 0',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
      className="sidebar-scroll"
      >
        {Object.entries(groupedNavItems).map(([category, items]) => (
          <div key={category} style={{ marginBottom: 32 }}>
            <div style={{ 
              padding: '0 24px',
              marginBottom: 8,
              color: '#666',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}>
              {category}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '6px 12px',
                    margin: '0 16px',
                    borderRadius: isActive(item.href) ? '0.5rem' : '0.5rem',
                    color: isActive(item.href) ? '#fff' : '#b0b0b0',
                    background: isActive(item.href) ? '#5e17eb' : 'transparent',
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.background = '#383434';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#b0b0b0';
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer - Fixed at bottom */}
      <div style={{ 
        padding: '20px 24px',
        borderTop: '1px solid #333',
        flexShrink: 0
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 12,
          padding: '12px 16px',
          background: '#2a2a2a',
          borderRadius: 8,
          border: '1px solid #444',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          marginBottom: 12
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#383434';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#2a2a2a';
        }}
        >
          <div style={{ 
            width: 32, 
            height: 32, 
            background: '#5e17eb',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600
          }}>
            <User size={16} />
          </div>
          <div>
            <div style={{ 
              color: '#fff', 
              fontWeight: 500, 
              fontSize: 14,
              lineHeight: 1.2
            }}>
              {profile?.first_name || user?.email?.split('@')[0] || 'Usuario'}
            </div>
            <div style={{ 
              color: '#b0b0b0', 
              fontSize: 12 
            }}>
              Plan Gratuito
            </div>
          </div>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 16px',
            background: 'transparent',
            border: '1px solid #444',
            borderRadius: 8,
            color: '#b0b0b0',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: 14,
            fontWeight: 500
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#dc2626';
            e.currentTarget.style.borderColor = '#dc2626';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = '#444';
            e.currentTarget.style.color = '#b0b0b0';
          }}
        >
          <LogOut size={16} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: '#121212' 
    }}>
      {/* Desktop Sidebar - Fixed */}
      {!isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 30,
          overflowY: 'auto'
        }}>
          {sidebarContent}
        </div>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          {/* Overlay */}
          {sidebarOpen && (
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 40
              }}
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Sidebar */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: sidebarOpen ? 0 : '-280px',
            zIndex: 50,
            transition: 'left 0.3s ease'
          }}>
            {sidebarContent}
          </div>
        </>
      )}

      {/* Main Content - Scrollable */}
      <div style={{ 
        flex: 1,
        marginLeft: isMobile ? 0 : '280px',
        width: isMobile ? '100%' : 'calc(100% - 280px)',
        minHeight: '100vh',
        overflowY: 'auto'
      }}>
        {/* Mobile Header */}
        {isMobile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            background: '#171717',
            borderBottom: '1px solid #333',
            position: 'sticky',
            top: 0,
            zIndex: 20
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 12 
            }}>
              <div style={{ 
                width: 32, 
                height: 32, 
                background: 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 900,
                fontSize: 13,
                fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: '-0.3px',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative'
              }}>
                <span style={{ 
                  position: 'relative', 
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0px'
                }}>
                  <span style={{ 
                    fontWeight: 900,
                    position: 'relative'
                  }}>C</span>
                  <span style={{ 
                    fontWeight: 900,
                    fontSize: '13px',
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    <span style={{ position: 'relative' }}>
                      V
                      <div style={{
                        position: 'absolute',
                        top: '20%',
                        left: '45%',
                        width: '1.5px',
                        height: '60%',
                        background: '#fff',
                        transform: 'rotate(20deg)',
                        borderRadius: '1px'
                      }}></div>
                      <div style={{
                        position: 'absolute',
                        top: '20%',
                        right: '45%',
                        width: '1.5px',
                        height: '60%',
                        background: '#fff',
                        transform: 'rotate(-20deg)',
                        borderRadius: '1px'
                      }}></div>
                    </span>
                  </span>
                </span>
              </div>
              <div style={{ 
                color: '#fff',
                fontFamily: 'Circular, "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: '24px',
                letterSpacing: '-0.01em'
              }}>
                cv master
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                padding: 8,
                borderRadius: 4,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#383434';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
              }}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}

        {/* Page Content */}
        <div style={{ 
          padding: isMobile ? '20px' : '40px',
          maxWidth: '1200px',
          margin: '0 auto',
          minHeight: 'calc(100vh - 80px)',
          paddingBottom: '60px'
        }}>
          {children}
        </div>
      </div>
    </div>
  );
} 
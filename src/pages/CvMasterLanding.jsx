import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Palette, 
  Eye, 
  Plus, 
  Upload, 
  Bot, 
  FileDown,
  CheckCircle,
  Clock,
  ArrowRight,
  Zap,
  Shield,
  Target,
  Users,
  Star,
  Play,
  Menu,
  X,
  LogIn,
  PlusCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function CvMasterLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Bot size={32} />,
      title: "IA Avanzada",
      description: "Genera CVs y cartas de presentación optimizadas con inteligencia artificial que se adapta a tu perfil profesional.",
      color: "#5e17eb"
    },
    {
      icon: <Palette size={32} />,
      title: "Plantillas Profesionales", 
      description: "Más de 20 plantillas diseñadas por expertos en recursos humanos para diferentes industrias y niveles.",
      color: "#2e7d32"
    },
    {
      icon: <Zap size={32} />,
      title: "Creación Rápida",
      description: "Crea tu CV profesional en menos de 10 minutos con nuestro editor intuitivo y guiado paso a paso.",
      color: "#ed6c02"
    },
    {
      icon: <Shield size={32} />,
      title: "Optimizado para ATS",
      description: "Nuestras plantillas están optimizadas para pasar los filtros de los sistemas de seguimiento de candidatos.",
      color: "#9c27b0"
    },
    {
      icon: <Target size={32} />,
      title: "Resultados Garantizados",
      description: "Usuarios que usan CV Master tienen 3x más probabilidades de conseguir entrevistas de trabajo.",
      color: "#d32f2f"
    },
    {
      icon: <FileDown size={32} />,
      title: "Exportación Universal",
      description: "Descarga en PDF, Word o comparte directamente en LinkedIn y otras plataformas profesionales.",
      color: "#7b1fa2"
    }
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Desarrolladora Frontend",
      company: "TechCorp",
      content: "CV Master me ayudó a crear un CV que destacó mis habilidades técnicas. Conseguí mi trabajo soñado en 2 semanas.",
      rating: 5
    },
    {
      name: "Carlos Rodríguez", 
      role: "Gerente de Marketing",
      company: "Digital Solutions",
      content: "La generación de cartas de presentación con IA es increíble. Ahorré horas de trabajo y los resultados fueron excelentes.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      role: "Diseñadora UX/UI", 
      company: "Creative Studio",
      content: "Las plantillas son hermosas y profesionales. Mi CV ahora se ve como si lo hubiera hecho un diseñador profesional.",
      rating: 5
    }
  ];

  const stats = [
    { number: "50,000+", label: "CVs Creados" },
    { number: "95%", label: "Tasa de Éxito" },
    { number: "20+", label: "Plantillas" },
    { number: "24/7", label: "Soporte" }
  ];

  const pricingPlans = [
    {
      name: "Gratis",
      price: "€0",
      period: "/mes",
      description: "Perfecto para empezar",
      features: [
        "3 CVs por mes",
        "5 plantillas básicas", 
        "Exportación PDF",
        "Soporte básico"
      ],
      color: "#666",
      popular: false
    },
    {
      name: "Pro",
      price: "€9.99",
      period: "/mes",
      description: "Para profesionales",
      features: [
        "CVs ilimitados",
        "20+ plantillas premium",
        "IA avanzada",
        "Exportación múltiple",
        "Soporte prioritario",
        "Cartas de presentación"
      ],
      color: "#5e17eb",
      popular: true
    },
    {
      name: "Empresas",
      price: "€29.99",
      period: "/mes",
      description: "Para equipos y empresas",
      features: [
        "Todo lo de Pro",
        "Gestión de equipos",
        "Plantillas personalizadas",
        "Análisis avanzado",
        "API de integración",
        "Soporte 24/7"
      ],
      color: "#2e7d32",
      popular: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>CV Master - Crea CVs Profesionales con IA | Weblisy</title>
        <meta name="description" content="Crea CVs profesionales con inteligencia artificial. Plantillas optimizadas para ATS, generación automática y más. ¡Consigue tu trabajo soñado!" />
        <meta name="keywords" content="CV, currículum, carta de presentación, IA, inteligencia artificial, trabajo, empleo, plantillas CV, ATS" />
        <meta property="og:title" content="CV Master - Crea CVs Profesionales con IA" />
        <meta property="og:description" content="Genera CVs y cartas de presentación optimizadas para ATS con inteligencia artificial avanzada." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CV Master - Crea CVs Profesionales con IA" />
        <meta name="twitter:description" content="Genera CVs y cartas de presentación optimizadas para ATS con inteligencia artificial avanzada." />
        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .floating-element {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(45deg, rgba(94, 23, 235, 0.3), rgba(76, 20, 199, 0.3));
            animation: float 6s ease-in-out infinite;
          }
          .pulse-element {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(94, 23, 235, 0.2), transparent);
            animation: pulse 4s ease-in-out infinite;
          }
          .rotating-element {
            position: absolute;
            background: linear-gradient(45deg, transparent, rgba(94, 23, 235, 0.1), transparent);
            animation: rotate 20s linear infinite;
          }
        `}</style>
      </Helmet>
      
      <div style={{ 
        minHeight: '100vh', 
        background: '#121212',
        color: 'rgb(250, 250, 250)',
        fontFamily: 'Circular, custom-font, "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: '18px',
        lineHeight: '28px',
        fontWeight: 400
      }}>
      {/* Navigation */}
      <nav style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(18, 18, 18, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #292929'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img 
              src="/assets/cv.png" 
              alt="CV Master"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                objectFit: 'cover',
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
              }}
            />
            <span style={{ 
              fontFamily: 'Circular, "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '24px',
              color: 'rgb(250, 250, 250)',
              letterSpacing: '-0.01em'
            }}>cv master</span>
          </div>

          {/* Desktop Menu */}
          <div style={{ 
            display: window.innerWidth < 768 ? 'none' : 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <Link 
              to="/cvmaster-login"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'rgb(250, 250, 250)', 
                textDecoration: 'none', 
                fontWeight: 400,
                fontSize: '12px',
                padding: '4px 20px',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                height: '28px'
              }}
            >
              Iniciar sesión
            </Link>
            <Link
              to="/cvmaster-register"
              style={{ 
                background: 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)',
                color: 'rgb(250, 250, 250)',
                padding: '4px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 400,
                fontSize: '12px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                height: '28px'
              }}
            >
              Empezar CV
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ 
              display: window.innerWidth >= 768 ? 'none' : 'flex',
              background: 'transparent',
              border: 'none',
              color: 'rgb(250, 250, 250)',
              cursor: 'pointer'
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{ 
            background: '#171717',
            borderTop: '1px solid #292929',
            padding: 20
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link 
                to="/cvmaster-login" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgb(250, 250, 250)', 
                  textDecoration: 'none', 
                  fontWeight: 400,
                  fontSize: '12px',
                  padding: '4px 20px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '28px',
                  transition: 'all 0.3s ease'
                }}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/cvmaster-register"
                style={{ 
                  background: 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)',
                  color: 'rgb(250, 250, 250)',
                  padding: '4px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 400,
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '28px',
                  transition: 'all 0.3s ease'
                }}
              >
                Empezar CV
                </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section style={{ 
        paddingTop: 120,
        paddingBottom: 80,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(-45deg, #121212, #1a1a1a, #0f1419, #1c1c1c)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite'
      }}>
        {/* Elementos decorativos animados */}
        <div className="floating-element" style={{ 
          width: '80px', 
          height: '80px', 
          top: '20%', 
          left: '10%',
          animationDelay: '0s'
        }}></div>
        <div className="floating-element" style={{ 
          width: '50px', 
          height: '50px', 
          top: '70%', 
          right: '15%',
          animationDelay: '2s'
        }}></div>
        <div className="floating-element" style={{ 
          width: '65px', 
          height: '65px', 
          top: '30%', 
          right: '20%',
          animationDelay: '4s'
        }}></div>
        
        <div className="pulse-element" style={{ 
          width: '160px', 
          height: '160px', 
          top: '10%', 
          left: '60%',
          animationDelay: '1s'
        }}></div>
        <div className="pulse-element" style={{ 
          width: '120px', 
          height: '120px', 
          bottom: '20%', 
          left: '5%',
          animationDelay: '3s'
        }}></div>
        
        <div className="rotating-element" style={{ 
          width: '250px', 
          height: '250px', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%'
        }}></div>
        
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(18, 18, 18, 0.3) 70%)',
          pointerEvents: 'none'
        }}></div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 style={{ 
              fontFamily: 'Circular, custom-font, "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 'clamp(48px, 8vw, 72px)',
              fontWeight: 400,
              color: 'rgb(250, 250, 250)',
              lineHeight: 'clamp(48px, 8vw, 72px)',
              marginBottom: 24,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Crea CVs Profesionales con{' '}
              <span style={{ 
                background: 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'pulse 3s ease-in-out infinite'
              }}>
                Inteligencia Artificial
              </span>
            </h1>
            
            <p style={{ 
              fontFamily: 'Circular, custom-font, "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '18px',
              fontWeight: 400,
              color: 'rgb(250, 250, 250)',
              lineHeight: '28px',
              marginBottom: 40,
              maxWidth: '600px',
              margin: '0 auto 40px auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>
              Genera CVs y cartas de presentación optimizadas para ATS con IA avanzada. 
              Consigue más entrevistas y tu trabajo soñado en minutos.
            </p>

            <div style={{ 
              display: 'flex',
              flexDirection: window.innerWidth < 640 ? 'column' : 'row',
              gap: 16,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 60
            }}>
              <Link
                to="/cvmaster-register"
                style={{ 
                  background: 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)',
                  color: 'rgb(250, 250, 250)',
                  padding: '10px 20px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontWeight: 400,
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)',
                  ':hover': { transform: 'scale(1.05)' }
                }}
              >
                <Plus size={16} />
                Crear mi CV Gratis
              </Link>
              
              <button style={{ 
                background: '#242424',
                color: 'rgb(250, 250, 250)',
                border: '1px solid #292929',
                padding: '10px 20px',
                borderRadius: 8,
                fontWeight: 400,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: 'scale(1)',
                ':hover': { transform: 'scale(1.05)' }
              }}>
                <Play size={16} />
                Ver Demo
              </button>
            </div>

            {/* Stats */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: 40,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {stats.map((stat, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: 'clamp(24px, 4vw, 32px)',
                    fontWeight: 900,
                    color: '#5e17eb',
                    marginBottom: 8
                  }}>
                    {stat.number}
                  </div>
                  <div style={{ 
                    fontSize: 14,
                    color: '#a2a2a2',
                    fontWeight: 500,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ 
        padding: '80px 24px',
        background: '#171717'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ 
              fontSize: 'clamp(28px, 6vw, 48px)',
              fontWeight: 900,
              marginBottom: 16
            }}>
              Características Poderosas
            </h2>
            <p style={{ 
              fontSize: 18,
              color: '#a2a2a2',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Todo lo que necesitas para crear CVs profesionales que destaquen entre la competencia
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 32
          }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ 
                  background: '#242424',
                  border: '1px solid #292929',
                  borderRadius: 16,
                  padding: 32,
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ 
                  color: feature.color,
                  marginBottom: 20
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 12,
                  color: '#e2e8f0'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: '#a2a2a2',
                  lineHeight: 1.6,
                  fontSize: 16
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ 
        padding: '80px 24px',
        background: '#121212'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ 
              fontSize: 'clamp(28px, 6vw, 48px)',
              fontWeight: 900,
              marginBottom: 16
            }}>
              Planes que se Adaptan a Ti
            </h2>
            <p style={{ 
              fontSize: 18,
              color: '#a2a2a2',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Desde gratis hasta planes empresariales. Encuentra el plan perfecto para tus necesidades.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 32,
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ 
                  background: plan.popular ? 'linear-gradient(135deg, rgba(94, 23, 235, 0.1) 0%, rgba(76, 20, 199, 0.1) 100%)' : '#171717',
                  border: plan.popular ? '2px solid #5e17eb' : '1px solid #292929',
                  borderRadius: 16,
                  padding: 32,
                  textAlign: 'center',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
              >
                {plan.popular && (
                  <div style={{ 
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)',
                    color: '#e2e8f0',
                    padding: '6px 20px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700
                  }}>
                    MÁS POPULAR
                  </div>
                )}
                
                <h3 style={{ 
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 8,
                  color: plan.color
                }}>
                  {plan.name}
                </h3>
                
                <p style={{ 
                  color: '#a2a2a2',
                  marginBottom: 20,
                  fontSize: 14
                }}>
                  {plan.description}
                </p>
                
                <div style={{ marginBottom: 32 }}>
                  <span style={{ 
                    fontSize: 'clamp(32px, 6vw, 48px)',
                    fontWeight: 900,
                    color: '#e2e8f0'
                  }}>
                    {plan.price}
                  </span>
                  <span style={{ 
                    color: '#a2a2a2',
                    fontSize: 16
                  }}>
                    {plan.period}
                  </span>
                </div>
                
                <div style={{ 
                  marginBottom: 32,
                  textAlign: 'left'
                }}>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 12
                    }}>
                      <CheckCircle size={16} style={{ color: '#2e7d32' }} />
                      <span style={{ color: '#a2a2a2', fontSize: 14 }}>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link
                  to="/cvmaster-register"
                  style={{ 
                    display: 'block',
                    background: plan.popular ? 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)' : '#242424',
                    color: plan.popular ? '#e2e8f0' : '#e2e8f0',
                    border: plan.popular ? 'none' : '1px solid #5e17eb',
                    padding: '8px 16px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: 14,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {plan.name === 'Gratis' ? 'Empezar Gratis' : 'Elegir Plan'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{ 
        padding: '80px 24px',
        background: '#171717'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ 
              fontSize: 'clamp(28px, 6vw, 48px)',
              fontWeight: 900,
              marginBottom: 16
            }}>
              Lo que Dicen Nuestros Usuarios
            </h2>
            <p style={{ 
              fontSize: 18,
              color: '#a2a2a2',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Miles de profesionales han conseguido sus trabajos soñados con CV Master
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 32
          }}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ 
                  background: '#242424',
                  border: '1px solid #292929',
                  borderRadius: 16,
                  padding: 32
                }}
              >
                <div style={{ 
                  display: 'flex',
                  gap: 4,
                  marginBottom: 16
                }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} style={{ color: '#ffa726', fill: '#ffa726' }} />
                  ))}
                </div>
                
                <p style={{ 
                  color: '#a2a2a2',
                  lineHeight: 1.6,
                  marginBottom: 20,
                  fontSize: 16
                }}>
                  "{testimonial.content}"
                </p>
                
                <div>
                  <div style={{ 
                    fontWeight: 600,
                    color: '#e2e8f0',
                    marginBottom: 4
                  }}>
                    {testimonial.name}
                  </div>
                  <div style={{ 
                    fontSize: 14,
                    color: '#a2a2a2'
                  }}>
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '80px 24px',
        background: 'linear-gradient(135deg, rgba(94, 23, 235, 0.1) 0%, rgba(76, 20, 199, 0.1) 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontWeight: 900,
            marginBottom: 16
          }}>
            ¿Listo para Conseguir tu Trabajo Soñado?
          </h2>
          <p style={{ 
            fontSize: 18,
            color: '#a2a2a2',
            marginBottom: 40,
            lineHeight: 1.6
          }}>
            Únete a miles de profesionales que ya han transformado sus carreras con CV Master. 
            Empieza gratis y ve la diferencia en minutos.
          </p>
          
          <div style={{ 
            display: 'flex',
            flexDirection: window.innerWidth < 640 ? 'column' : 'row',
            gap: 16,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Link
              to="/cvmaster-register"
              style={{ 
                background: 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)',
                color: '#e2e8f0',
                padding: '8px 16px',
                borderRadius: 6,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.3s ease'
              }}
            >
              <ArrowRight size={16} />
              Empezar Ahora Gratis
            </Link>
            
            <Link
              to="/cvmaster-login"
              style={{ 
                color: '#5e17eb',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 16
              }}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: '#121212',
        borderTop: '1px solid #292929',
        padding: '40px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 24
          }}>
            <img 
              src="/assets/cv.png" 
              alt="CV Master"
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                objectFit: 'cover'
              }}
            />
            <span style={{ 
              fontFamily: 'Circular, "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '24px',
              color: '#e2e8f0',
              letterSpacing: '-0.01em'
            }}>cv master</span>
          </div>
          
          <p style={{ 
            color: '#a2a2a2',
            marginBottom: 24,
            fontSize: 14
          }}>
            Creado con ❤️ por Weblisy. Todos los derechos reservados © 2024
          </p>
          
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            fontSize: 14
          }}>
            <a href="/privacidad" style={{ color: '#a2a2a2', textDecoration: 'none' }}>Privacidad</a>
            <a href="/terminos" style={{ color: '#a2a2a2', textDecoration: 'none' }}>Términos</a>
            <a href="/contacto" style={{ color: '#a2a2a2', textDecoration: 'none' }}>Contacto</a>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
} 
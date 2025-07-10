import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useCVMasterAuth } from '../contexts/CVMasterAuthContext';

const CVMasterLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signInWithGoogle, signInWithGitHub, loading, error, isAuthenticated } = useCVMasterAuth();

  useEffect(() => {
    // Mostrar mensaje de éxito si viene del registro
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      if (location.state.email) {
        setFormData(prev => ({ ...prev, email: location.state.email }));
      }
      // Limpiar el mensaje después de 5 segundos
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { error } = await signIn(formData.email, formData.password);
    
    if (!error) {
      // Redirigir al dashboard después del login exitoso
      const redirectTo = location.state?.from?.pathname || '/cvmasterApp';
      navigate(redirectTo);
    }
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  const handleGitHubLogin = async () => {
    await signInWithGitHub();
  };

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.from?.pathname || '/cvmasterApp';
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, location]);

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img 
              src="/assets/cv.png" 
              alt="CV Master"
              className="w-12 h-12 rounded-lg object-cover"
              style={{
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
              }}
            />
            <h1 
              className="text-white"
              style={{ 
                fontFamily: 'Circular, "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: '24px',
                letterSpacing: '-0.01em'
              }}
            >
              cv master
            </h1>
          </div>
          <p className="text-slate-400">Crea tu CV profesional con IA</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center text-slate-300">
              Ingresa a tu cuenta para continuar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {successMessage && (
              <div className="bg-[#5e17eb]/20 border border-[#5e17eb]/30 rounded-lg p-3 mb-4">
                <p className="text-[#5e17eb] text-sm text-center">{successMessage}</p>
              </div>
            )}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-[#5e17eb] focus:ring-[#5e17eb]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-[#5e17eb] focus:ring-[#5e17eb]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-white/10 bg-white/5 text-[#5e17eb] focus:ring-[#5e17eb]"
                  />
                  <Label htmlFor="remember" className="text-sm text-slate-300">
                    Recordarme
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#5e17eb] hover:text-[#5e17eb]/80 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5e17eb] hover:bg-[#5e17eb]/90 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Iniciar Sesión</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-transparent px-2 text-slate-400">O continúa con</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                onClick={handleGitHubLogin}
                disabled={loading}
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </Button>
            </div>

            <div className="text-center">
              <p className="text-slate-400 text-sm">
                ¿No tienes una cuenta?{' '}
                <Link
                  to="/cvmaster-register"
                  className="text-[#5e17eb] hover:text-[#5e17eb]/80 font-medium transition-colors"
                >
                  Regístrate
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-400 text-sm">
          <p>© 2024 CV Master. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default CVMasterLogin; 
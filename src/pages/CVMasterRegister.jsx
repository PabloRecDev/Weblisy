import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { useCVMasterAuth } from '../contexts/CVMasterAuthContext';

const CVMasterRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, signInWithGitHub, loading, error } = useCVMasterAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    
    const { error } = await signUp(
      formData.email, 
      formData.password, 
      formData.firstName, 
      formData.lastName
    );
    
    if (!error) {
      // Redirigir al login con mensaje de éxito
      navigate('/cvmaster-login', { 
        state: { 
          message: 'Cuenta creada exitosamente. Revisa tu email para confirmar tu cuenta.',
          email: formData.email 
        } 
      });
    }
  };

  const handleGoogleSignUp = async () => {
    if (!acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    await signInWithGoogle();
  };

  const handleGitHubSignUp = async () => {
    if (!acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    await signInWithGitHub();
  };

  const passwordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
            if (strength <= 4) return 'bg-[#5e17eb]';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength <= 2) return 'Débil';
    if (strength <= 3) return 'Media';
    if (strength <= 4) return 'Fuerte';
    return 'Muy fuerte';
  };

  const currentPasswordStrength = passwordStrength(formData.password);

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

        {/* Register Card */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">
              Crear Cuenta
            </CardTitle>
            <CardDescription className="text-center text-slate-300">
              Únete a CV Master y crea tu CV profesional
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    Nombre
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Juan"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-[#5e17eb] focus:ring-[#5e17eb]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Apellido
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Pérez"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-[#5e17eb] focus:ring-[#5e17eb]"
                      required
                    />
                  </div>
                </div>
              </div>

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
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-white/5 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(currentPasswordStrength)}`}
                          style={{ width: `${(currentPasswordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs ${getPasswordStrengthColor(currentPasswordStrength).replace('bg-', 'text-').replace('text-[#5e17eb]', 'text-[#5e17eb]')}`}>
                        {getPasswordStrengthText(currentPasswordStrength)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirmar Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-[#5e17eb] focus:ring-[#5e17eb]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-400 text-xs">Las contraseñas no coinciden</p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-green-400 text-xs flex items-center">
                    <Check className="w-3 h-3 mr-1" />
                    Las contraseñas coinciden
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="rounded border-white/10 bg-white/5 text-[#5e17eb] focus:ring-[#5e17eb]"
                />
                <Label htmlFor="terms" className="text-sm text-slate-300">
                  Acepto los{' '}
                  <Link to="/terms" className="text-[#5e17eb] hover:text-[#5e17eb]/80 underline">
                    términos y condiciones
                  </Link>{' '}
                  y la{' '}
                  <Link to="/privacy" className="text-[#5e17eb] hover:text-[#5e17eb]/80 underline">
                    política de privacidad
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={loading || !acceptTerms || formData.password !== formData.confirmPassword}
                className="w-full bg-[#5e17eb] hover:bg-[#5e17eb]/90 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creando cuenta...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Crear Cuenta</span>
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
                <span className="bg-transparent px-2 text-slate-400">O regístrate con</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={handleGoogleSignUp}
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
                onClick={handleGitHubSignUp}
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
                ¿Ya tienes una cuenta?{' '}
                <Link
                  to="/cvmaster-login"
                  className="text-[#5e17eb] hover:text-[#5e17eb]/80 font-medium transition-colors"
                >
                  Iniciar sesión
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

export default CVMasterRegister; 

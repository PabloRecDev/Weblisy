import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function SimpleLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                throw new Error(error.message);
            }

            if (data.user) {
                // Guardar información del usuario
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('session', JSON.stringify(data.session));
                
                // Redirigir al dashboard
                navigate('/admin/dashboard');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });

            if (error) {
                throw new Error(error.message);
            }

            if (data.user) {
                alert('Cuenta creada exitosamente. Revisa tu email para confirmar.');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md bg-black border border-white/10 rounded-2xl px-8 py-10 flex flex-col items-center">
                <img src="/assets/weblisy-logo.png" alt="Weblisy Logo" className="h-12 mb-6 mt-2" />
                <h2 className="text-2xl font-bold text-white mb-2 text-center">Panel de Administración</h2>
                <p className="text-gray-400 text-base mb-8 text-center">Accede a tu CRM de WebLisy</p>
                
                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="off">
                    {error && (
                        <div className="bg-red-800/70 border border-red-400 text-red-100 px-3 py-2 rounded-md text-base text-center mb-2">
                            {error}
                        </div>
                    )}
                    
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full bg-black border border-white/20 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="w-full bg-black border border-white/20 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-2 bg-white text-black text-base font-semibold rounded-md border border-white/20 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>

                <div className="w-full mt-4">
                    <button
                        onClick={handleSignUp}
                        disabled={loading}
                        className="w-full py-2 bg-transparent text-white text-sm border border-white/20 rounded-md hover:bg-white/10 transition-all duration-200 disabled:opacity-50"
                    >
                        Crear cuenta nueva
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Credenciales de prueba:
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        admin@weblisy.com / admin123
                    </p>
                </div>
            </div>
        </div>
    );
} 
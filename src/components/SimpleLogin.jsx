import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function SimpleLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showReset, setShowReset] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetLoading, setResetLoading] = useState(false);
    const [resetMsg, setResetMsg] = useState('');
    const navigate = useNavigate();

    // Redirigir si ya hay sesión activa
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                navigate('/admin/dashboard');
            }
        };
        checkSession();
    }, [navigate]);

    // Validación simple
    const validate = () => {
        if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
            setError('Introduce un email válido.');
            return false;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!validate()) return;
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw new Error(error.message);
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('session', JSON.stringify(data.session));
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
        setError('');
        setSuccess('');
        if (!validate()) return;
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) throw new Error(error.message);
            if (data.user) {
                setSuccess('Cuenta creada exitosamente. Revisa tu email para confirmar.');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setResetMsg('');
        setResetLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
            if (error) throw new Error(error.message);
            setResetMsg('Si el email existe, recibirás un enlace para restablecer tu contraseña.');
        } catch (error) {
            setResetMsg(error.message);
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md bg-black border border-white/10 rounded-2xl px-8 py-10 flex flex-col items-center">
                <img src="/assets/weblisy-logo.png" alt="Weblisy Logo" className="h-12 mb-6 mt-2" />
                <h2 className="text-2xl font-bold text-white mb-2 text-center">Panel de Administración</h2>
                <p className="text-gray-400 text-base mb-8 text-center">Accede a tu CRM de WebLisy</p>
                {!showReset ? (
                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="off">
                    {error && (
                        <div className="bg-red-800/70 border border-red-400 text-red-100 px-3 py-2 rounded-md text-base text-center mb-2">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-800/70 border border-green-400 text-green-100 px-3 py-2 rounded-md text-base text-center mb-2">
                            {success}
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
                        disabled={loading}
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
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-2 bg-white text-black text-base font-semibold rounded-md border border-white/20 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading && <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin inline-block"></span>}
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>
                ) : (
                <form className="w-full flex flex-col gap-4" onSubmit={handleResetPassword} autoComplete="off">
                    <input
                        id="resetEmail"
                        name="resetEmail"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full bg-black border border-white/20 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition"
                        placeholder="Correo electrónico"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        disabled={resetLoading}
                    />
                    <button
                        type="submit"
                        disabled={resetLoading}
                        className="w-full py-3 mt-2 bg-white text-black text-base font-semibold rounded-md border border-white/20 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {resetLoading && <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin inline-block"></span>}
                        {resetLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                    </button>
                    {resetMsg && (
                        <div className="text-center text-sm mt-2 text-white/80">{resetMsg}</div>
                    )}
                    <button
                        type="button"
                        className="text-xs text-gray-400 hover:underline mt-2"
                        onClick={() => setShowReset(false)}
                    >
                        Volver al login
                    </button>
                </form>
                )}
                <div className="w-full mt-4 flex flex-col gap-2">
                    <button
                        onClick={handleSignUp}
                        disabled={loading}
                        className="w-full py-2 bg-transparent text-white text-sm border border-white/20 rounded-md hover:bg-white/10 transition-all duration-200 disabled:opacity-50"
                    >
                        Crear cuenta nueva
                    </button>
                    <button
                        type="button"
                        className="text-xs text-gray-400 hover:underline"
                        onClick={() => setShowReset(true)}
                    >
                        ¿Olvidaste tu contraseña?
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
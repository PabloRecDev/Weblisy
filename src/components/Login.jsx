import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en el login');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/admin/dashboard');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md bg-black border border-white/10 rounded-2xl px-8 py-10 flex flex-col items-center">
                <img src="/assets/weblisy-logo.png" alt="Weblisy Logo" className="h-12 mb-6 mt-2" />
                <h2 className="text-2xl font-bold text-white mb-2 text-center">Iniciar sesión</h2>
                <p className="text-gray-400 text-base mb-8 text-center">Accede a tu panel de administración</p>
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
                        className="w-full py-3 mt-2 bg-white text-black text-base font-semibold rounded-md border border-white/20 hover:bg-gray-200 transition-all duration-200"
                    >
                        Iniciar sesión
                    </button>
                </form>
                <p className="text-xs text-gray-500 text-center mt-8">
                    Al continuar, aceptas nuestros <a href="#" className="underline hover:text-white">Términos de servicio</a> y <a href="#" className="underline hover:text-white">Política de privacidad</a>.
                </p>
            </div>
        </div>
    );
} 
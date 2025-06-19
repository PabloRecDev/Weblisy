import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error || !data.user) throw error || new Error('Usuario no encontrado');

            setSuccess('Inicio de sesión exitoso');

            // Pequeña espera para que el usuario vea el mensaje
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 1000);

        } catch (error) {
            console.error(error);
            setError('Correo o contraseña incorrectos');
        }
    };

    return (
        <div className="min-h-screen bg-black/90">
            <div className="flex flex-col sm:flex-row h-screen">
                {/* Columna izquierda con fondo */}
                <div className="hidden sm:block w-full sm:w-1/2 relative h-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-90"></div>
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center h-full w-full">
                        <div className="text-white text-center">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">Bienvenido</h2>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90">Gestiona tu sitio web de manera eficiente</p>
                        </div>
                    </div>
                </div>
                
                {/* Columna derecha con el formulario */}
                <div className="w-full sm:w-1/2 h-full bg-black p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    <div className="text-center">
                        <img src="/assets/weblisy-logo.png" alt="Logo Weblisy" className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto" />
                        <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mt-[-40px]">Bienvenido de vuelta</h1>
                        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300">Inicia sesión para continuar con tu gestión</h3>
                    </div>
                    <div className=" w-full h-full max-w-sm sm:max-w-md lg:max-w-lg bg-transparent rounded p-3 sm:p-4 md:p-5 lg:p-6">   
                        <form className="space-y-4 sm:space-y-5 md:space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="text-red-500 text-sm text-center">{error}</div>
                            )}
                            {success && (
                                <div className="text-green-500 text-sm text-center">{success}</div>
                            )}
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="text-white">Correo electrónico</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="appearance-none relative mt-2 block w-full px-3 py-2 bg-transparent border border-white border-opacity-10 placeholder-gray-500 text-white rounded  focus:outline-none focus:ring-2 focus:ring-white focus:border-white focus:z-10 sm:text-sm transition duration-200"
                                        placeholder="Correo electrónico"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="text-white">Contraseña</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="appearance-none rounded mt-2 relative block w-full px-3 py-2 bg-transparent border border-white border-opacity-10 placeholder-gray-500 text-white rounded  md  focus:outline-none focus:ring-2 focus:ring-white focus:border-white focus:z-10 sm:text-sm transition duration-200 focus:z-10 sm:text-sm"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Iniciar sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;

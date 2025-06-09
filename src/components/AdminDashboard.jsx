import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el usuario está autenticado
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!storedUser || !token) {
            navigate('/login');
            return;
        }

        setUser(JSON.parse(storedUser));

        // Obtener datos del dashboard
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/admin/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener datos del dashboard');
                }

                const data = await response.json();
                setDashboardData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">Panel de Administración</h1>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-4">Bienvenido, {user.nombre}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
                        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                        {dashboardData ? (
                            <div>
                                <p>Mensaje: {dashboardData.message}</p>
                                <p>Usuario ID: {dashboardData.user.id}</p>
                                <p>Email: {dashboardData.user.email}</p>
                            </div>
                        ) : (
                            <p>Cargando datos...</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
} 
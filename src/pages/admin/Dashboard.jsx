import React from 'react';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-8">Dashboard</h2>
          <nav className="space-y-4">
            <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Inicio</a>
            <a href="#" className="block text-gray-700 hover:text-indigo-600">Usuarios</a>
            <a href="#" className="block text-gray-700 hover:text-indigo-600">Estadísticas</a>
            <a href="#" className="block text-gray-700 hover:text-indigo-600">Configuración</a>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Bienvenido, {user?.email}</h1>

        {/* Sección de tarjetas/resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Usuarios registrados</h2>
            <p className="text-2xl font-bold text-indigo-600">123</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Ventas este mes</h2>
            <p className="text-2xl font-bold text-indigo-600">$4,560</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Soporte pendiente</h2>
            <p className="text-2xl font-bold text-indigo-600">7 tickets</p>
          </div>
        </div>

        {/* Acciones rápidas u otro contenido */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Acciones rápidas</h2>
          <div className="space-x-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">Agregar usuario</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Ver reportes</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

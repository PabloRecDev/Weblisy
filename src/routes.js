import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                {/* Rutas adicionales para otras secciones del admin */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;

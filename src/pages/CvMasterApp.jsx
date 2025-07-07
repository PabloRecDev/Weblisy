import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CvMasterLayout from '../components/CvMasterLayout';
import CvMasterDashboard from './CvMasterDashboard';
import CvMasterPlantillas from './CvMasterPlantillas';
import CvMasterEditor from './CvMasterEditor';
import CvMasterCartas from './CvMasterCartas';
import CvMasterSettings from './CvMasterSettings';
import CvMasterCalendar from './CvMasterCalendar';
import CvMasterTareas from './CvMasterTareas';
// Importar las demás páginas cuando se creen

export default function CvMasterApp() {
  return (
    <CvMasterLayout>
      <Routes>
        <Route path="/cv-master/app/dashboard" element={<CvMasterDashboard />} />
        <Route path="/cv-master/app/plantillas" element={<CvMasterPlantillas />} />
        <Route path="/cv-master/app/editor" element={<CvMasterEditor />} />
        <Route path="/cv-master/app/cartas" element={<CvMasterCartas />} />
        <Route path="/cv-master/app/configuracion" element={<CvMasterSettings />} />
        <Route path="/cv-master/app/calendario" element={<CvMasterCalendar />} />
        <Route path="/cv-master/app/tareas" element={<CvMasterTareas />} />
        <Route path="*" element={<Navigate to="/cv-master/app/dashboard" replace />} />
      </Routes>
    </CvMasterLayout>
  );
} 
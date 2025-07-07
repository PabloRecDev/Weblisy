import React from 'react';
import { UserCircleIcon, DocumentTextIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function CvMasterDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">¡Bienvenido de nuevo, Brenda! 👋</h1>
        <p className="text-muted-foreground">Vamos a crear un CV profesional con IA</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-card text-card-foreground border border-border rounded-lg p-6 shadow">
          <UserCircleIcon className="w-8 h-8 text-primary mb-2" />
          <div className="text-lg font-semibold mb-1">CVs creados</div>
          <div className="text-3xl font-bold text-primary mb-2">4</div>
          <div className="w-full h-2 bg-muted rounded-full mb-1">
            <div className="h-2 bg-primary rounded-full" style={{ width: '65%' }}></div>
          </div>
          <span className="text-xs text-muted-foreground">65% completado</span>
        </div>
        {/* Card 2 */}
        <div className="bg-card text-card-foreground border border-border rounded-lg p-6 shadow">
          <DocumentTextIcon className="w-8 h-8 text-accent mb-2" />
          <div className="text-lg font-semibold mb-1">Plantillas disponibles</div>
          <div className="text-3xl font-bold text-accent mb-2">12</div>
          <div className="w-full h-2 bg-muted rounded-full mb-1">
            <div className="h-2 bg-accent rounded-full" style={{ width: '80%' }}></div>
          </div>
          <span className="text-xs text-muted-foreground">80% premium</span>
        </div>
        {/* Card 3 */}
        <div className="bg-card text-card-foreground border border-border rounded-lg p-6 shadow">
          <ChartBarIcon className="w-8 h-8 text-ring mb-2" />
          <div className="text-lg font-semibold mb-1">Exportaciones</div>
          <div className="text-3xl font-bold text-ring mb-2">7</div>
          <div className="w-full h-2 bg-muted rounded-full mb-1">
            <div className="h-2 bg-ring rounded-full" style={{ width: '50%' }}></div>
          </div>
          <span className="text-xs text-muted-foreground">PDF, Word, LinkedIn</span>
        </div>
      </div>
      {/* Aquí puedes añadir más secciones: gráfica, calendario, tareas, etc. */}
    </div>
  );
} 
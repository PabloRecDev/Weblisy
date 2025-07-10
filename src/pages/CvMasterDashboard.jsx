import React from 'react';
import { 
  FileText, 
  Download, 
  Settings, 
  Eye, 
  Plus, 
  Upload, 
  Bot,
  Brain,
  FileDown,
  Layers
} from 'lucide-react';

export default function CvMasterDashboard() {
  const statsData = [
    {
      title: 'CVs Creados',
      value: '12',
      icon: <FileText className="w-6 h-6" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Descargas',
      value: '8',
      icon: <Download className="w-6 h-6" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Plantillas',
      value: '5',
      icon: <Settings className="w-6 h-6" />,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    {
      title: 'Vistas',
      value: '24',
      icon: <Eye className="w-6 h-6" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    }
  ];

  const quickActions = [
    {
      title: 'Crear nuevo CV',
      description: 'Comienza desde cero',
      icon: <Plus className="w-5 h-5" />,
      primary: true
    },
    {
      title: 'Importar CV existente',
      description: 'Sube tu CV actual',
      icon: <Upload className="w-5 h-5" />,
      primary: false
    },
    {
      title: 'Generar con IA',
      description: 'Asistencia automática',
      icon: <Bot className="w-5 h-5" />,
      primary: false
    }
  ];

  const recentCVs = [
    { name: 'Juan Pérez', date: '2024-06-01', status: 'Completado' },
    { name: 'Ana García', date: '2024-05-28', status: 'En progreso' },
    { name: 'Carlos López', date: '2024-05-25', status: 'Completado' }
  ];

  const features = [
    {
      title: 'IA Integrada',
      description: 'Sugerencias inteligentes para mejorar tu CV',
      icon: <Brain className="w-8 h-8 text-blue-400" />
    },
    {
      title: 'Exportación PDF',
      description: 'Genera CVs profesionales en formato PDF',
      icon: <FileDown className="w-8 h-8 text-green-400" />
    },
    {
      title: 'Plantillas Profesionales',
      description: 'Múltiples diseños para diferentes industrias',
      icon: <Layers className="w-8 h-8 text-purple-400" />
    }
  ];

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-xl text-gray-300">Gestiona tus currículums profesionales de forma eficiente</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
            <div className={`${stat.bgColor} ${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Acciones Rápidas</h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`w-full p-4 rounded-lg border transition-all duration-300 text-left flex items-center gap-4 ${
                  action.primary
                    ? 'bg-[#5e17eb] border-[#5e17eb] hover:bg-[#4c14c7] text-white'
                    : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 hover:border-gray-500 text-gray-300'
                }`}
              >
                <div className={`p-2 rounded-lg ${action.primary ? 'bg-white/20' : 'bg-gray-600'}`}>
                  {action.icon}
                </div>
                <div>
                  <div className="font-medium">{action.title}</div>
                  <div className={`text-sm ${action.primary ? 'text-blue-100' : 'text-gray-400'}`}>
                    {action.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent CVs */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">CVs Recientes</h2>
          <div className="space-y-4">
            {recentCVs.map((cv, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                <div>
                  <div className="font-medium text-white">{cv.name}</div>
                  <div className="text-sm text-gray-400">{cv.date}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  cv.status === 'Completado' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                }`}>
                  {cv.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-8 text-center">Características Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
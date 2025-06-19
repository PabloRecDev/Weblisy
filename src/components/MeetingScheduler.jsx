import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isPast, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { supabase } from '../lib/supabase';
import { 
  CalendarIcon, 
  ClockIcon, 
  CheckIcon, 
  Cross2Icon,
  VideoIcon,
  ChatBubbleIcon,
  MobileIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@radix-ui/react-icons';

export default function MeetingScheduler() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !time || !meetingType) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setStatus("loading");

    try {
      // Preparar los datos para guardar en Supabase
      const meetingData = {
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        message: formData.message || null,
        meeting_date: format(selectedDate, 'yyyy-MM-dd'),
        meeting_time: time,
        meeting_type: meetingType,
        meeting_type_name: meetingTypes.find(t => t.id === meetingType)?.name,
        status: 'pending', // pending, confirmed, completed, cancelled
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Insertar en Supabase
      const { data, error } = await supabase
        .from('meetings')
        .insert([meetingData])
        .select();

      if (error) {
        console.error('Error al guardar la reunión:', error);
        throw new Error('Error al guardar la reunión. Por favor, intenta de nuevo.');
      }

      // Éxito
      setStatus("success");
      
      // Limpiar formulario
      setSelectedDate(null);
      setTime('');
      setMeetingType('');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });

      // Resetear estado después de 4 segundos
      setTimeout(() => {
        setStatus("idle");
      }, 4000);

    } catch (error) {
      console.error('Error:', error);
      setStatus("error");
      
      // Resetear estado de error después de 4 segundos
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const meetingTypes = [
    {
      id: 'video',
      name: 'Videollamada',
      description: 'Reunión por Zoom o Google Meet',
      icon: <VideoIcon className="w-5 h-5" />,
      duration: '30 min'
    },
    {
      id: 'phone',
      name: 'Llamada telefónica',
      description: 'Conversación por teléfono',
      icon: <MobileIcon className="w-5 h-5" />,
      duration: '20 min'
    },
    {
      id: 'chat',
      name: 'Chat en vivo',
      description: 'Conversación por chat',
      icon: <ChatBubbleIcon className="w-5 h-5" />,
      duration: '15 min'
    }
  ];

  // Generar días del mes
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Días de la semana
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Navegación del calendario
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Verificar si una fecha está disponible (no domingo, no pasado)
  const isDateAvailable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !isPast(date) && getDay(date) !== 0; // 0 = domingo
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={ref}
      id="agendar" 
      className="py-20 px-4 md:py-32 md:px-8 bg-black relative overflow-hidden"
    >
      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]"></div>
      
      {/* Partículas flotantes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="flex justify-center mb-4"
            variants={itemVariants}
          >
            <motion.span 
              className="text-white text-4xl md:text-5xl"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <CalendarIcon className="w-12 h-12" />
            </motion.span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            variants={itemVariants}
          >
            Agenda una Reunión
          </motion.h2>
          
          <motion.p 
            className="text-white/80 max-w-2xl mx-auto text-lg"
            variants={itemVariants}
          >
            Reserva un tiempo para hablar sobre tu proyecto. Consultoría gratuita y sin compromiso.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Calendario y selección de tiempo */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Calendario personalizado */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Selecciona una fecha
              </h3>
              
              {/* Header del calendario */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <h4 className="text-white font-semibold">
                  {format(currentMonth, 'MMMM yyyy', { locale: es })}
                </h4>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Días de la semana */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-white/60 text-sm font-medium py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Días del mes */}
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day) => {
                  const isAvailable = isDateAvailable(day);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isCurrentDay = isToday(day);
                  
                  return (
                    <button
                      key={day.toString()}
                      onClick={() => isAvailable && setSelectedDate(day)}
                      disabled={!isAvailable}
                      className={`
                        p-2 text-sm font-medium rounded-lg transition-all duration-200
                        ${isSelected 
                          ? 'bg-[#038e42] text-white' 
                          : isCurrentDay 
                            ? 'bg-white/20 text-white border border-white/30' 
                            : isAvailable 
                              ? 'bg-white/5 text-white hover:bg-white/10 border border-transparent hover:border-white/20' 
                              : 'bg-transparent text-white/30 cursor-not-allowed'
                        }
                      `}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Selección de hora */}
            {selectedDate && (
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl"
              >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <ClockIcon className="w-5 h-5" />
                  Selecciona una hora
                </h3>
                
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        time === slot
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tipo de reunión */}
            {selectedDate && time && (
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Tipo de reunión
                </h3>
                
                <div className="space-y-3">
                  {meetingTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setMeetingType(type.id)}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                        meetingType === type.id
                          ? 'bg-white/20 border border-white/30'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-white">
                            {type.icon}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{type.name}</h4>
                            <p className="text-white/70 text-sm">{type.description}</p>
                          </div>
                        </div>
                        <span className="text-white/70 text-sm">{type.duration}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Información de contacto</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white font-medium">Nombre *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-black/50 border-white/10 text-white placeholder-white/50 focus:border-white/20 focus:ring-white/20 transition-all duration-300"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white font-medium">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-black/50 border-white/10 text-white placeholder-white/50 focus:border-white/20 focus:ring-white/20 transition-all duration-300"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company" className="text-white font-medium">Empresa</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/10 text-white placeholder-white/50 focus:border-white/20 focus:ring-white/20 transition-all duration-300"
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white font-medium">Mensaje</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="bg-black/50 border-white/10 text-white placeholder-white/50 focus:border-white/20 focus:ring-white/20 transition-all duration-300 resize-none"
                    placeholder="Cuéntanos brevemente sobre tu proyecto..."
                  />
                </div>

                {/* Resumen de la cita */}
                {(selectedDate || time || meetingType) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <StarIcon className="w-4 h-4" />
                      Resumen de tu cita
                    </h4>
                    <div className="space-y-2 text-white/80 text-sm">
                      {selectedDate && (
                        <p><strong>Fecha:</strong> {format(selectedDate, 'EEEE, d \'de\' MMMM \'de\' yyyy', { locale: es })}</p>
                      )}
                      {time && (
                        <p><strong>Hora:</strong> {time}</p>
                      )}
                      {meetingType && (
                        <p><strong>Tipo:</strong> {meetingTypes.find(t => t.id === meetingType)?.name}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading" || !selectedDate || !time || !meetingType}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                >
                  {status === "loading" ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Agendando...
                    </div>
                  ) : (
                    'Agendar Reunión'
                  )}
                </motion.button>

                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center p-4 bg-white/10 border border-white/20 rounded-lg"
                    >
                      <div className="flex items-center justify-center text-white">
                        <CheckIcon className="w-5 h-5 mr-2" />
                        ¡Reunión agendada correctamente! Te contactaremos pronto.
                      </div>
                    </motion.div>
                  )}
                  
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                      <div className="flex items-center justify-center text-red-400">
                        <Cross2Icon className="w-5 h-5 mr-2" />
                        Error al agendar la reunión. Por favor, intenta de nuevo.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Información adicional */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Consultoría Gratuita</h4>
              <p className="text-white/70 text-sm">Primera reunión sin costo para evaluar tu proyecto</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <VideoIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Múltiples Formatos</h4>
              <p className="text-white/70 text-sm">Videollamada, llamada telefónica o chat en vivo</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Sin Compromiso</h4>
              <p className="text-white/70 text-sm">No hay obligación de contratar después de la consulta</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
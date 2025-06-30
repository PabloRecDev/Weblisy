import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_KEY = "cookie_consent";

const defaultPrefs = {
  essential: true,
  analytics: false,
  marketing: false,
};

const CookieConsent = () => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setPrefs] = useState(defaultPrefs);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setShow(true);
    else {
      try {
        const parsed = JSON.parse(consent);
        setPrefs({ ...defaultPrefs, ...parsed });
      } catch {
        setPrefs(defaultPrefs);
      }
    }
  }, []);

  const handleConsent = (accepted) => {
    const newPrefs = accepted
      ? { essential: true, analytics: true, marketing: true }
      : { essential: true, analytics: false, marketing: false };
    setPrefs(newPrefs);
    localStorage.setItem(COOKIE_KEY, JSON.stringify(newPrefs));
    setShow(false);
  };

  const handleSavePrefs = () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
    setShow(false);
    setShowModal(false);
  };

  const handleSwitch = (type) => {
    if (type === "essential") return; // esenciales siempre activas
    setPrefs((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-end"
          >
            <div
              className="backdrop-blur-xl bg-white/60 border border-green-600 shadow-xl rounded-t-2xl max-w-xl w-full mx-4 mb-4 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)", border: "1.5px solid #038e42" }}
            >
              <div className="flex-1">
                <h4 className="font-bold text-green-700 mb-1 text-lg flex items-center gap-2">
                  <span role="img" aria-label="cookie">🍪</span> Uso de cookies
                </h4>
                <p className="text-gray-700 text-sm">
                  Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. Puedes aceptar todas las cookies, rechazar las no esenciales o personalizar tu selección.
                  Consulta nuestra <a href="/PrivacyPolicy" className="text-green-700 underline font-medium" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>.
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-2 md:mt-0 md:flex-row">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 rounded-lg border border-green-600 bg-white/70 text-green-700 font-medium hover:bg-green-50 transition"
                >
                  Personalizar
                </button>
                <button
                  onClick={() => handleConsent(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
                >
                  Rechazar
                </button>
                <button
                  onClick={() => handleConsent(true)}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de personalización */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-2xl bg-white/80 border border-green-600 shadow-2xl rounded-2xl max-w-md w-full p-8 relative"
              style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)", border: "1.5px solid #038e42" }}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-green-700 text-2xl font-bold"
                onClick={() => setShowModal(false)}
                aria-label="Cerrar"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <span role="img" aria-label="cookie">🍪</span> Preferencias de cookies
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <div>
                    <span className="font-semibold text-green-700">Esenciales</span>
                    <p className="text-xs text-gray-600">Necesarias para el funcionamiento del sitio (siempre activas)</p>
                  </div>
                  <input type="checkbox" checked disabled className="accent-green-600 w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                  <div>
                    <span className="font-semibold text-blue-700">Analíticas</span>
                    <p className="text-xs text-gray-600">Nos ayudan a mejorar el sitio mediante estadísticas anónimas</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={() => handleSwitch("analytics")}
                    className="accent-blue-600 w-5 h-5"
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-pink-50">
                  <div>
                    <span className="font-semibold text-pink-700">Marketing</span>
                    <p className="text-xs text-gray-600">Personalización de anuncios y remarketing</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={() => handleSwitch("marketing")}
                    className="accent-pink-600 w-5 h-5"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSavePrefs}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
                >
                  Guardar preferencias
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent; 
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/globals.css'
import App from './App.jsx'
import CookieConsent from './components/CookieConsent.jsx'

// Verificar que React esté disponible
if (!React) {
  console.error('React no está disponible');
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Elemento root no encontrado');
} else {
  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <App />
      <CookieConsent />
    </StrictMode>,
  );
}

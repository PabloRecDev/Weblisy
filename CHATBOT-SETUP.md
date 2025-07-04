# 🤖 Chatbot Weblisy - Guía de Configuración

## 📋 Descripción

Este chatbot está diseñado para funcionar perfectamente en Vercel sin necesidad de backend. Ofrece dos modos de operación:

1. **Modo Básico**: Respuestas predefinidas (funciona sin configuración adicional)
2. **Modo IA**: Integración con APIs de IA (requiere configuración)

## 🚀 Instalación Rápida

### 1. Chatbot Básico (Recomendado para empezar)

El chatbot básico ya está integrado y funcionando. Incluye:

- ✅ Respuestas predefinidas para preguntas comunes
- ✅ Interfaz moderna y responsive
- ✅ Animaciones suaves
- ✅ Funciona inmediatamente sin configuración

### 2. Chatbot Avanzado con IA

Para habilitar el modo IA, sigue estos pasos:

#### Opción A: OpenAI (Recomendado)

1. Ve a [OpenAI API](https://platform.openai.com/api-keys)
2. Crea una cuenta y obtén tu API key
3. Crea un archivo `.env.local` en la raíz del proyecto:

```bash
VITE_OPENAI_API_KEY=tu_api_key_aqui
```

4. Cambia el import en `App.jsx`:

```jsx
// Cambia esta línea:
import Chatbot from './components/Chatbot';

// Por esta:
import Chatbot from './components/ChatbotAdvanced';
```

#### Opción B: APIs Alternativas Gratuitas

Puedes integrar otras APIs gratuitas modificando el archivo `ChatbotAdvanced.jsx`:

- **Hugging Face**: Para modelos de IA gratuitos
- **Cohere**: Ofrece créditos gratuitos
- **Anthropic Claude**: Alternativa a OpenAI

## 🎨 Personalización

### Cambiar Respuestas Predefinidas

Edita el objeto `predefinedResponses` en `Chatbot.jsx`:

```javascript
const predefinedResponses = {
  'palabra_clave': 'Tu respuesta personalizada aquí',
  'precio': 'Información sobre precios personalizada',
  // ... más respuestas
};
```

### Personalizar Apariencia

Modifica los estilos en el componente:

```jsx
// Cambiar colores del gradiente
className="bg-gradient-to-r from-blue-600 to-purple-600"

// Cambiar posición
className="fixed bottom-6 right-6 z-50"
```

### Agregar Nuevas Funcionalidades

El chatbot es completamente modular. Puedes agregar:

- Botones de acción rápida
- Integración con formularios
- Envío de emails automático
- Integración con CRM

## 🔧 Configuración en Vercel

### Variables de Entorno

1. Ve a tu proyecto en Vercel Dashboard
2. Navega a Settings > Environment Variables
3. Agrega tu API key:

```
Name: VITE_OPENAI_API_KEY
Value: tu_api_key_aqui
Environment: Production, Preview, Development
```

### Configuración de Dominio

El chatbot funciona automáticamente en todos los dominios de Vercel.

## 📱 Características

### ✅ Funcionalidades Incluidas

- **Interfaz moderna** con animaciones suaves
- **Responsive design** que funciona en móviles
- **Modo minimizado** para no molestar
- **Historial de mensajes** con timestamps
- **Indicador de escritura** para mejor UX
- **Configuración integrada** para cambiar modos
- **Fallback automático** si falla la IA

### 🎯 Respuestas Predefinidas

El chatbot responde automáticamente a:

- Precios y presupuestos
- Servicios ofrecidos
- Información de contacto
- Tiempos de desarrollo
- Tecnologías utilizadas
- Mantenimiento y soporte
- Hosting y dominios
- SEO y optimización
- Diseño responsive
- Garantías y soporte

## 🛠️ Solución de Problemas

### El chatbot no aparece

1. Verifica que el componente esté importado en `App.jsx`
2. Revisa la consola del navegador para errores
3. Asegúrate de que Framer Motion esté instalado

### La IA no funciona

1. Verifica que tu API key esté configurada correctamente
2. Revisa que la variable de entorno esté en Vercel
3. Comprueba los logs de la consola para errores de API

### Errores de CORS

Si usas APIs externas, asegúrate de que:
1. La API permita requests desde tu dominio
2. Las credenciales estén configuradas correctamente
3. Uses HTTPS en producción

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. ¡Listo! El chatbot funcionará automáticamente

### Otros Proveedores

El chatbot funciona en cualquier proveedor que soporte React:
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS Amplify

## 📈 Analytics y Monitoreo

Para monitorear el uso del chatbot:

1. **Google Analytics**: Agrega eventos personalizados
2. **Vercel Analytics**: Monitoreo automático de performance
3. **Logs personalizados**: Guarda conversaciones importantes

## 🔒 Privacidad y Seguridad

- ✅ No se almacenan conversaciones en servidor
- ✅ Las API keys están seguras en variables de entorno
- ✅ Cumple con GDPR (no tracking personal)
- ✅ Funciona completamente en el cliente

## 🎨 Temas y Estilos

El chatbot usa Tailwind CSS y se adapta automáticamente al tema de tu sitio web.

## 📞 Soporte

Si necesitas ayuda:

1. Revisa esta documentación
2. Verifica la consola del navegador
3. Comprueba las variables de entorno
4. Contacta al equipo de desarrollo

---

**¡Tu chatbot está listo para mejorar la experiencia de tus visitantes! 🎉** 
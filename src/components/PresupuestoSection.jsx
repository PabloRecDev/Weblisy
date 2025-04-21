import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function PresupuestoSection() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.target;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/xkgjpokg", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setStatus("success");
      form.reset();

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } else {
      setStatus("error");
    }
  };

  return (
    <section id="presupuesto" className="py-20 px-4 md:py-32 md:px-8 bg-customBlack relative overflow-hidden">
      {/* Fondo decorativo con gradientes y blur */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-purple-500/10 via-green-500/10 to-transparent rounded-full blur-2xl animate-float-slower"></div>
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        {/* Beneficios clave */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12 animate-fade-in">
          <div className="flex flex-col items-center">
            <span className="text-green-400 text-3xl mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </span>
            <span className="text-white font-semibold">Propuesta en 24h</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-purple-400 text-3xl mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V7a2 2 0 012-2h12a2 2 0 012 2v7c0 2.21-3.582 4-8 4z" /></svg>
            </span>
            <span className="text-white font-semibold">Trato confidencial</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-green-400 text-3xl mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 118 0v2" /></svg>
            </span>
            <span className="text-white font-semibold">Acompañamiento experto</span>
          </div>
        </div>
        {/* Título y subtítulo animados */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Solicita tu presupuesto</h2>
          <p className="text-white opacity-90 max-w-xl mx-auto">
            Cuéntanos qué necesitas y te enviaremos una propuesta personalizada lo antes posible.
          </p>
          <div className="mt-6">
            <span className="inline-block bg-green-700/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
              Respuesta rápida y sin compromiso
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-customBlack p-8 rounded-xl shadow-xl animate-fade-in-up">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Nombre</Label>
            <Input
              id="name"
              name="name"
              placeholder="Tu nombre"
              required
              className="bg-customBlack border-white border-opacity-5 text-white placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tunombre@email.com"
              required
              className="bg-customBlack border-white border-opacity-5 text-white placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Tipo de proyecto</Label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="proyecto"
                  value="Sitio web profesional"
                  required
                  className="accent-black"
                />
                <span className="text-white">Sitio web profesional</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="proyecto"
                  value="Aplicación web a medida"
                  required
                  className="accent-black"
                />
                <span className="text-white">Aplicación web a medida</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">Detalles o necesidades</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Cuéntanos sobre tu proyecto, funcionalidades, plazos, etc."
              required
              className="bg-customBlack border-white border-opacity-5 text-white placeholder-gray-400 min-h-[150px]"
            />
          </div>

          <Button type="submit" className="w-full bg-white text-black border border-white/10 transition-colors duration-300">
            {status === "loading" ? "Enviando..." : "Solicitar presupuesto"}
          </Button>

          {/* Mensaje de éxito */}
          {status === "success" && (
            <p className="text-green-600 text-center mt-4">
              ✅ ¡Solicitud enviada correctamente!
            </p>
          )}

          {/* Mensaje de error */}
          {status === "error" && (
            <p className="text-red-500 text-center mt-4">
              ❌ Hubo un error al enviar la solicitud. Intenta nuevamente.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

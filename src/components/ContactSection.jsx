'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ContactSection() {
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
    <section id="contacto" className="py-20 px-4 md:py-32 md:px-8 bg-gradient-to-br from-customBlack via-black to-black relative overflow-hidden">
      <div className="container mx-auto max-w-xl relative z-10">
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="flex justify-center mb-2">
            <span className="text-green-400 text-4xl md:text-5xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">¡Contáctanos!</h2>
          <p className="text-white/80 max-w-md mx-auto text-lg">
            ¿Tienes una duda rápida o quieres saludar? Completa el formulario y te responderemos pronto.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-black/70 p-6 rounded-xl border border-white/10 shadow-lg animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Nombre</Label>
            <Input
              id="name"
              name="name"
              placeholder="Tu nombre"
              required
              className="bg-black/70 border-white/10 text-white placeholder-white/50"
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
              className="bg-black/70 border-white/10 text-white placeholder-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">Mensaje</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="¿En qué podemos ayudarte?"
              required
              className="bg-black/70 border-white/10 text-white placeholder-white/50 min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition-all duration-300 shadow-md">
            {status === "loading" ? "Enviando..." : "Enviar mensaje"}
          </Button>

          {/* Mensaje de éxito */}
          {status === "success" && (
            <p className="text-green-400 text-center mt-4">
              ✅ ¡Mensaje enviado correctamente!
            </p>
          )}

          {/* Mensaje de error */}
          {status === "error" && (
            <p className="text-red-400 text-center mt-4">
              ❌ Hubo un error al enviar el mensaje. Intenta nuevamente.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

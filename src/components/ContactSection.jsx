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
    <section id="contacto" className="py-20 px-4 md:py-32 md:px-8  bg-gradient-to-b from-black/95 to-black relative overflow-hidden">
      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Contáctanos</h2>
          <p className="text-white opacity-80 max-w-xl mx-auto">
            ¿Tienes un proyecto en mente? Completa el formulario y me pondré en contacto contigo lo antes posible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur p-8 rounded-xl border border-white/10 shadow-lg">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Nombre</Label>
            <Input
              id="name"
              name="name"
              placeholder="Tu nombre"
              required
              className="bg-black/40 border-white/10 text-white placeholder-white/60"
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
              className="bg-black/40 border-white/10 text-white placeholder-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">Mensaje</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Contame sobre tu proyecto..."
              required
              className="bg-black/40 border-white/10 text-white placeholder-white/60 min-h-[150px]"
            />
          </div>

          <Button type="submit" className="w-full bg-white text-black hover:bg-transparent hover:text-white border border-white transition-colors duration-300">
            {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
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

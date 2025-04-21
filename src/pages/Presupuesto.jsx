import React from "react";
import PresupuestoSection from "@/components/PresupuestoSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PresupuestoPage() {
  return (
    <div className="min-h-screen absolute -z-10 inset-0 h-full w-full bg-black">
      <Navbar brandName="WebApps Pro" />
      <main className="pt-16">
        <PresupuestoSection />
      </main>
      <Footer />
    </div>
  );
}

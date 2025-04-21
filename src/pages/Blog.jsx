import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogList from "../components/BlogList";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-customBlack text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 md:px-0">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Blog de Desarrollo Web</h1>
          <BlogList />
        </div>
      </main>
      <Footer />
    </div>
  );
}

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogList from "../components/BlogList";

import { Helmet } from 'react-helmet-async';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-customBlack text-white flex flex-col">
      <Helmet>
        <title>Blog | Weblisy - Artículos de Desarrollo Web y SEO</title>
        <meta name="description" content="Lee los mejores artículos sobre desarrollo web, SEO, diseño y tendencias digitales en el blog de Weblisy." />
      </Helmet>
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

#!/usr/bin/env node

/**
 * Generador automático de Sitemap para Weblisy
 * Ejecutar: node scripts/generate-sitemap.mjs
 */

import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://weblisy.es';
const OUTPUT_FILE = 'public/sitemap.xml';

// Configuración de páginas
const pages = [
  {
    path: '/',
    priority: '1.00',
    changefreq: 'daily',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/servicios',
    priority: '0.95',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/servicios/desarrollo-web',
    priority: '0.90',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/servicios/ecommerce',
    priority: '0.90',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/servicios/diseño-web',
    priority: '0.85',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/servicios/seo',
    priority: '0.85',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/servicios/mantenimiento-web',
    priority: '0.80',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/aplicaciones-web',
    priority: '0.90',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/proyectos',
    priority: '0.90',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/proyectos/sitio-web-corporativo',
    priority: '0.80',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/proyectos/sistema-de-reservas-online',
    priority: '0.80',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/blog',
    priority: '0.90',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/blog/seo-para-webs-modernas',
    priority: '0.75',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/blog/diferencia-sitio-web-aplicacion-web',
    priority: '0.75',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/blog/tendencias-diseno-web-2025',
    priority: '0.75',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/blog/ventajas-desarrollo-medida',
    priority: '0.75',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/blog/como-elegir-agencia-desarrollo',
    priority: '0.75',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/blog/wordpress-vs-desarrollo-medida',
    priority: '0.75',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/blog/optimizacion-velocidad-web',
    priority: '0.75',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/blog/ecommerce-tendencias-2025',
    priority: '0.75',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/presupuesto',
    priority: '0.85',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/agendar',
    priority: '0.85',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/contacto',
    priority: '0.85',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/nosotros',
    priority: '0.80',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/faq',
    priority: '0.70',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/privacidad',
    priority: '0.60',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/tecnologias/react',
    priority: '0.75',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/tecnologias/nodejs',
    priority: '0.75',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/tecnologias/wordpress',
    priority: '0.75',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

function generateSitemap() {
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
         http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

`;

  const xmlFooter = `
</urlset>`;

  let xmlContent = xmlHeader;

  pages.forEach(page => {
    xmlContent += `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>
`;
  });

  xmlContent += xmlFooter;

  // Escribir el archivo
  fs.writeFileSync(OUTPUT_FILE, xmlContent, 'utf8');
  
  console.log(`✅ Sitemap generado exitosamente: ${OUTPUT_FILE}`);
  console.log(`📊 Total de páginas incluidas: ${pages.length}`);
  console.log(`🔗 URL del sitemap: ${BASE_URL}/sitemap.xml`);
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap }; 
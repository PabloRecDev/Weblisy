import fs from 'fs';
import path from 'path';

// URL base de tu sitio web
const baseUrl = 'https://weblisy.com';

// Proyectos (copiados desde ProyectoDetalle.jsx)
const projects = [
    {
      id: 1,
      title: "Sistema de Gestión de Inventarios",
    },
    {
      id: 2,
      title: "Plataforma de Reservas Online",
    },
    {
      id: 3,
      title: "CRM Empresarial",
    },
    {
      id: 4,
      title: "Red Social Corporativa",
    },
    {
      id: 5,
      title: "App de Delivery",
    },
    {
      id: 6,
      title: "Marketplace Educativo",
    }
];

// Páginas estáticas
const staticPages = [
  { url: '/', priority: '1.00', changefreq: 'daily' },
  { url: '/aplicaciones-web', priority: '0.90', changefreq: 'weekly' },
  { url: '/proyectos', priority: '0.80', changefreq: 'weekly' },
  { url: '/presupuesto', priority: '0.80', changefreq: 'monthly' },
  { url: '/agendar', priority: '0.80', changefreq: 'monthly' },
  { url: '/nosotros', priority: '0.70', changefreq: 'monthly' },
  { url: '/blog', priority: '0.70', changefreq: 'weekly' },
  { url: '/contacto', priority: '0.60', changefreq: 'yearly' },
  { url: '/privacidad', priority: '0.50', changefreq: 'yearly' },
];

function generateSitemap() {
  console.log('Starting sitemap generation...');

  const today = new Date().toISOString();
  
  let urls = staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today.split('T')[0]}</lastmod>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>`).join('');

  console.log('Generating project URLs...');
  const projectUrls = projects.map(p => `/proyecto/${p.id}`);

  projectUrls.forEach(url => {
    urls += `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${today.split('T')[0]}</lastmod>
    <priority>0.75</priority>
    <changefreq>weekly</changefreq>
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);

  console.log(`Sitemap generated successfully at ${sitemapPath}`);
  console.log(`${projectUrls.length} project URLs added.`);
}

generateSitemap(); 
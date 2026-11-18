/**
 * robots.txt generado al compilar (RF-15). La URL del sitemap sale de `site` (astro.config.mjs),
 * así que se actualiza sola cuando haya dominio (decisión A3).
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site);
  const cuerpo = [
    'User-agent: *',
    'Allow: /',
    // Páginas internas: no se indexan (también llevan noindex).
    'Disallow: /dev/',
    '',
    `Sitemap: ${sitemap.href}`,
    '',
  ].join('\n');

  return new Response(cuerpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

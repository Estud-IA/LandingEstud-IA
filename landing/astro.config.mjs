// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { sitio } from './src/content/site.ts';

// https://astro.build/config
export default defineConfig({
  // URL provisional: se cambia por el dominio real en la fase 08 (decisión A3).
  site: sitio.url,
  output: 'static',
  integrations: [
    sitemap({
      // No van al sitemap: las páginas internas (/dev/…) ni /descargar (redirección, noindex).
      filter: (pagina) => !pagina.includes('/dev/') && !pagina.includes('/descargar'),
    }),
  ],
});

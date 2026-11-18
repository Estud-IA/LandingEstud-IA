/**
 * Datos generales del sitio. Los textos salen de docs/01-producto/mensajes-y-tono.md.
 */
export const sitio = {
  nombre: 'Estud-IA',
  titulo: 'Estud-IA · Aprende en vivo. Sube de nivel.',
  descripcion:
    'Clases en directo, chat al instante y XP por participar. Todo desde tu teléfono. Descarga Estud-IA para Android.',
  // Provisional hasta tener dominio (docs/03-arquitectura/riesgos.md, decisión A3).
  url: 'https://estudia.example',
  idioma: 'es',
  /** Idioma y país para Open Graph (público principal: Perú). */
  locale: 'es_PE',
  colorTema: '#f9f9f9',
  /** Correo de contacto (pie, privacidad y términos). */
  contacto: 'estudia425@gmail.com',
} as const;

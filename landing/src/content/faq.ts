/**
 * Preguntas frecuentes de la landing (RF-12). Fuente de verdad de la FAQ: los textos salieron de
 * docs/01-producto/mensajes-y-tono.md y se editan aquí.
 */
import { release } from './release';

export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

export const preguntas: Pregunta[] = [
  {
    pregunta: '¿Es gratis?',
    respuesta: 'Sí. Descargar la app y ver clases gratuitas no cuesta nada.',
  },
  {
    pregunta: '¿Es seguro instalar un APK?',
    respuesta:
      'Sí, si lo descargas desde esta página. Publicamos su huella SHA-256 para que puedas verificar que el archivo es el original. Android te pedirá permiso para instalar apps de esta fuente una sola vez.',
  },
  {
    pregunta: '¿Por qué no está en Google Play?',
    respuesta:
      'Está en camino. Mientras tanto, la versión que descargas aquí tiene todas las funciones.',
  },
  {
    pregunta: '¿Hay versión para iPhone?',
    respuesta:
      'Todavía no. Déjanos tu correo en la sección de descarga y te avisamos cuando llegue.',
  },
  {
    pregunta: '¿Qué son las Vcoins?',
    respuesta:
      'Puntos que ganas gratis al participar en las clases y que canjeas dentro de la app, por ejemplo para destacar tu pregunta en el chat.',
  },
  {
    pregunta: '¿Puedo dar clases?',
    respuesta:
      'Sí. Cualquier persona puede abrir su estudio desde la app y transmitir. Pronto también podrás cobrar entradas y regalos con Yape.',
  },
  {
    pregunta: '¿Qué necesito para usarla?',
    respuesta: `Un teléfono con Android ${release.androidMinimo} o superior y conexión a internet.`,
  },
];

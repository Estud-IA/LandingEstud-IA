# Visión de la landing

## Para qué existe

La landing es la **puerta de entrada a la app Estud-IA**. Tiene un objetivo principal y dos
secundarios:

1. **Principal: que la gente descargue e instale la app.** Al 2026-11-17 eso significa el APK
   directo para Android. iOS y Google Play llegarán después.
2. Que se entienda **qué se siente usar la app**: clases en vivo, chat, trivias, XP y ranking.
3. **Captar creadores** (profesores, tutores, divulgadores) antes del lanzamiento de la
   monetización, con una lista de espera.

## Públicos

| Público | Qué busca | Qué le ofrece la landing | Dónde |
|---|---|---|---|
| **Estudiante** (principal) | Aprender de forma más entretenida que un curso grabado | Ver cómo se vive una clase en vivo, ganar XP y niveles, descargar | Hero, "Así se vive una clase", gamificación, descarga |
| **Creador** | Un lugar para dar clases en vivo y, más adelante, cobrar | El estudio, la Academia propia y "Próximamente: cobra con Yape" con lista de espera | Sección "Para creadores" |
| **Visitante con iPhone** | Saber si puede usarla | Aviso honesto ("Próximamente en iOS") y lista de espera | CTA adaptado al dispositivo |
| **Visitante en escritorio** | Llevar la app a su teléfono | Código QR | Hero y descarga |

## Qué NO es la landing

- No es la app web: no se incrusta Flutter.
- No es un blog ni un centro de ayuda. Las preguntas frecuentes cubren las dudas de instalación.
- No promete funciones que no existen. Academia y el cobro con Yape aparecen como "Próximamente" o
  no aparecen. Ver [`app-estudia.md`](app-estudia.md).

## Cómo medimos el éxito

| Métrica | Cómo se mide |
|---|---|
| **Clics en descargar** (métrica principal) | Evento `download_click`, con el origen (hero, botón fijo, sección de descarga, QR) |
| Tasa de descarga | `download_click` / visitas únicas |
| Escaneos del QR | Visitas a `/descargar` con `?origen=qr` |
| Registros en las listas de espera | Formularios de iOS y de creadores |
| Profundidad de scroll | Porcentaje de visitas que llega a la sección de descarga |
| Calidad técnica | Lighthouse en móvil ≥ 90 (ver [RNF](../02-requerimientos/requerimientos-no-funcionales.md)) |

Las cifras objetivo se fijan cuando haya una semana de datos reales.

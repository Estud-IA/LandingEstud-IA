# La app que promocionamos: Estud-IA

**Fuente de verdad:** el repo `streaming-estudia` (`README.md`, `docs/01-producto/vision.md`,
`docs/04-roadmap/README.md`). Este resumen se consultó el **2026-11-17**. Si la app cambia, se
actualiza este archivo y se anota en el
[registro de cambios](../05-roadmap/registro-de-cambios.md).

## Qué es

> Plataforma móvil de streaming educativo en vivo con gamificación: la interactividad de Twitch con
> la estructura de un LMS.

Cualquier usuario puede dar clases en vivo con su propia "Academia". Los espectadores ganan XP,
rachas e insignias por asistir y participar.

**Stack de la app:** Flutter (Android primero), FastAPI + PostgreSQL, LiveKit para el video en vivo
y WebSocket + Redis para el chat.

## Qué se puede mostrar en la landing

| Función | Estado en la app (2026-11-17) | En la landing |
|---|---|---|
| Directos en vivo (LiveKit), modo inmersivo | Implementado (fases 1, 13 y 20) | ✅ Protagonista: hero y "Así se vive una clase" |
| Chat superpuesto al video (< 2 s; p95 de 43,6 ms con 200 clientes) | Implementado (fase 2) | ✅ |
| Trivias y encuestas en vivo | Implementado (fase 4) | ✅ |
| XP, niveles, rachas, insignias | Implementado (fase 3) | ✅ Sección de gamificación |
| Ranking (leaderboard) en tiempo real | Implementado (fase 5) | ✅ |
| Shorts: grabar, publicar y feed | Implementado (fase 12) | ✅ |
| Grabaciones (VODs) | Implementado (fase 6) | ✅ |
| Compartir material durante el directo | Frontend listo; falta el backend (fase 17) | ⚠️ Solo como mención secundaria |
| Fotos de perfil, seguir canales, buscar cuentas | Implementado | ✅ Como detalle |
| Estudio del creador: voltear cámara, micrófono, moderación | Implementado (fases 12 y 18) | ✅ Sección de creadores |
| Billetera de Vcoins (gratis, por XP) | Implementado (fase 5) | ✅ |
| Monedas, regalos, clases pagadas | Interfaz lista; en curso (fase 9) | 🔜 "Próximamente" |
| Cobro de los creadores por Yape | Pendiente: contrato con el procesador (fase 9-B) | 🔜 "Próximamente" + lista de espera |
| Academia: cursos y módulos | **Congelada**: "en desarrollo" dentro de la app | ❌ No se muestra, o una línea en "Próximamente" |
| iOS | No publicada | 🔜 "Próximamente en iOS" |
| Google Play | Planificado como flavor `play` (fase 9-C) | 🔜 "Próximamente en Google Play" |

## Distribución

- **Al 2026-11-17: APK directo para Android.** Es la "versión directa" del plan de monetización de la app.
  Ver [`../03-arquitectura/descarga-y-versiones.md`](../03-arquitectura/descarga-y-versiones.md).
- **Después:** Google Play (con Google Play Billing) e iOS.
- **Nombre visible de la app:** "Estud-IA". El logo está en
  `streaming-estudia/Frontend/assets/branding/logo.svg`.

## Argumentos de venta

1. **Aprender en vivo, no frente a un video grabado.** Preguntas en el chat y respuestas en el
   momento.
2. **Aprender suma.** XP, niveles, rachas, insignias y ranking.
3. **Cualquiera puede enseñar.** Abres tu estudio y transmites desde el teléfono.
4. **Hecha para el teléfono.** Directos y Shorts en vertical, como las redes que ya usas.
5. **Pronto, también para ganar** (creadores): entradas y regalos que se cobran por Yape.

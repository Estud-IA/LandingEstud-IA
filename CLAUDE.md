# CLAUDE.md — Landing de Estud-IA

Enrutador para Claude Code. **No registra avances ni estado**: eso va en `docs/05-roadmap/`.

## Reglas

- Commits, push, PR, merges y cambios de rama **solo si quien dirige la sesión lo pide en ese
  momento**. Ver `docs/06-estandares/flujo-git.md`.
- Al terminar una tarea, aplicar la matriz de `docs/06-estandares/documentacion.md` y pasar
  `docs/06-estandares/verificacion.md`.
- Textos de la landing en español, con **tuteo**. No anunciar como disponible lo que la app no tiene
  (ver `docs/01-producto/app-estudia.md`).
- Colores solo desde `src/styles/tokens.css`; datos de versión solo desde `src/content/release.json`.
- Cada animación va en su módulo de `src/motion/` y respeta `prefers-reduced-motion`.
- Nada de datos personales en capturas, videos ni ejemplos.

## Si vas a…

| Si vas a… | Lee primero |
|---|---|
| Empezar o retomar una tarea | `docs/05-roadmap/README.md` y el archivo de la fase |
| Crear o mover un archivo de código | `docs/03-arquitectura/estructura-del-proyecto.md` |
| Animar algo | `docs/03-arquitectura/animaciones.md` |
| Tocar colores, tipografía o componentes | `docs/04-diseno/design-system.md` |
| Construir o cambiar una sección | `docs/04-diseno/secciones.md` y `docs/01-producto/mensajes-y-tono.md` |
| Tocar la descarga o publicar un APK | `docs/03-arquitectura/descarga-y-versiones.md` |
| Revisar qué falta decidir | `docs/03-arquitectura/riesgos.md` |
| Revisar la landing en el navegador | Usar el MCP de Chrome DevTools (ver `docs/06-estandares/verificacion.md`) |
| Tocar la maqueta o exportar imágenes | `maqueta/README.md` (sin JS; colores solo desde `maqueta/css/tokens.css`) |

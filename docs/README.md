# Documentación de la landing de Estud-IA

Índice único de la documentación de la landing. Si buscas algo, empieza por tu pregunta:

| Pregunta | Documento |
|---|---|
| ¿Para qué existe la landing, a quién le habla y cómo medimos el éxito? | [`01-producto/vision.md`](01-producto/vision.md) |
| ¿Qué hace la app Estud-IA y qué se puede mostrar? | [`01-producto/app-estudia.md`](01-producto/app-estudia.md) |
| ¿Qué dice la landing y con qué tono? | [`01-producto/mensajes-y-tono.md`](01-producto/mensajes-y-tono.md) |
| ¿Qué tiene que hacer la landing? Cómo se escriben los requerimientos y su trazabilidad | [`02-requerimientos/README.md`](02-requerimientos/README.md) |
| ¿Qué necesita cada visitante? (historias de usuario) | [`02-requerimientos/historias-de-usuario.md`](02-requerimientos/historias-de-usuario.md) |
| ¿Qué debe hacer la landing? (requerimientos funcionales) | [`02-requerimientos/requerimientos-funcionales.md`](02-requerimientos/requerimientos-funcionales.md) |
| ¿Cómo debe comportarse? (requerimientos no funcionales) | [`02-requerimientos/requerimientos-no-funcionales.md`](02-requerimientos/requerimientos-no-funcionales.md) |
| ¿Cómo está construida y por qué? | [`03-arquitectura/README.md`](03-arquitectura/README.md) |
| ¿Qué hace cada carpeta y cada archivo del proyecto? | [`03-arquitectura/estructura-del-proyecto.md`](03-arquitectura/estructura-del-proyecto.md) |
| ¿Cómo funcionan las animaciones y el scroll? | [`03-arquitectura/animaciones.md`](03-arquitectura/animaciones.md) |
| ¿Cómo se publica una versión nueva del APK? | [`03-arquitectura/descarga-y-versiones.md`](03-arquitectura/descarga-y-versiones.md) |
| ¿Qué riesgos y decisiones abiertas hay? | [`03-arquitectura/riesgos.md`](03-arquitectura/riesgos.md) |
| ¿Qué colores, tipografías y componentes usa? | [`04-diseno/design-system.md`](04-diseno/design-system.md) |
| ¿Qué secciones tiene la landing y cómo se ve cada una? | [`04-diseno/secciones.md`](04-diseno/secciones.md) |
| ¿En qué estado está cada fase y qué falta? | [`05-roadmap/README.md`](05-roadmap/README.md) |
| ¿Qué cambió y cuándo? | [`05-roadmap/registro-de-cambios.md`](05-roadmap/registro-de-cambios.md) |
| ¿Qué documento actualizo al terminar una tarea? | [`06-estandares/documentacion.md`](06-estandares/documentacion.md) |
| ¿Cómo trabajo con git (ramas, commits, PR)? | [`06-estandares/flujo-git.md`](06-estandares/flujo-git.md) |
| ¿Cuándo una tarea está terminada? | [`06-estandares/verificacion.md`](06-estandares/verificacion.md) |
| ¿Qué se aprendió de la landing de referencia (Bulletproof)? | [`07-referencias/estudio-bulletproof.md`](07-referencias/estudio-bulletproof.md) |
| ¿Qué se vio al recorrer la app en local? | [`07-referencias/estudio-app-2026-11-17.md`](07-referencias/estudio-app-2026-11-17.md) |
| ¿Cómo abro la maqueta o exporto sus imágenes? | [`../maqueta/README.md`](../maqueta/README.md) |

## Estructura

```
docs/
├── README.md              ← este índice
├── 01-producto/           visión, la app que promocionamos, mensajes y tono
├── 02-requerimientos/     historias de usuario (HU), requerimientos funcionales (RF) y no funcionales (RNF)
├── 03-arquitectura/       cómo está construida, qué hace cada archivo, animaciones, descarga, riesgos
├── 04-diseno/             design system y secciones de la landing
│   └── img/               prototipos de la app (Stitch)
├── 05-roadmap/            un archivo por fase + README con el estado + registro de cambios
├── 06-estandares/         cómo se trabaja: documentación, git, verificación
├── 07-referencias/        estudios previos: Bulletproof y la app en local
│   └── img/               capturas tomadas con el MCP de DevTools
└── archivo/               documentos históricos que ya no describen el proyecto
```

Fuera de `docs/` quedan:

- `README.md` (raíz): portada del repo.
- `CLAUDE.md` (raíz): enrutador que Claude Code lee al iniciar.
- `maqueta/README.md`: cómo usar la maqueta HTML y exportar sus imágenes (fase 01).

## Repo relacionado

La app vive en otro repo: `streaming-estudia` (Flutter + FastAPI). Su documentación sigue la misma
organización. Cuando un dato de la app cambia (paleta, funciones, estado de una fase), la fuente de
verdad es ese repo; aquí solo se resume lo que la landing necesita, con la fecha en que se consultó.

## Nombres anteriores

Todavía no se ha movido ningún documento. Cuando se mueva uno, se anota aquí la ruta vieja y la nueva.

| Nombre anterior | Ubicación actual |
|---|---|
| — | — |

# Estándares de documentación

Mismas reglas que el repo de la app (`streaming-estudia/docs/03-estandares/documentacion.md`), para
que el equipo trabaje igual en los dos repos.

## Dónde va cada cosa

```
CLAUDE.md                 enrutador para Claude Code: reglas y "si vas a… lee…". No registra avances.
README.md                 portada que enlaza a docs/
docs/
├── 01-producto/          por qué existe la landing, la app que promociona, mensajes
├── 02-requerimientos/    HU, RF, RNF y la matriz de trazabilidad
├── 03-arquitectura/      cómo está construida, qué hace cada archivo, decisiones, riesgos
├── 04-diseno/            design system y secciones
├── 05-roadmap/           estado y secuencia: un archivo por fase + registro de cambios
├── 06-estandares/        cómo se trabaja
├── 07-referencias/       estudios y análisis de referencia (con fecha)
└── archivo/              documentos históricos, con la fecha en el nombre
```

## Matriz de actualización: qué documento tocar al terminar una implementación

Este paso es obligatorio para dar una tarea por terminada (ver [`verificacion.md`](verificacion.md)).
Cada tipo de información tiene **un solo lugar**:

| Si la implementación… | Actualizar |
|---|---|
| Cierra o avanza una tarea o fase | `05-roadmap/fase-NN-*.md` (marcar `[x]`, fecha y una línea de qué se hizo) + la tabla de estado de `05-roadmap/README.md` |
| Cambia algo visible para el usuario o del sistema | Una entrada en `05-roadmap/registro-de-cambios.md` |
| Crea, borra o cambia la función de un archivo o carpeta | `03-arquitectura/estructura-del-proyecto.md` (fila del archivo y su estado) |
| Toma una decisión de arquitectura | `03-arquitectura/README.md` → "Decisiones", con fecha y motivo |
| Cambia cómo funciona una animación o se agrega un módulo de movimiento | `03-arquitectura/animaciones.md` |
| Cambia el flujo de descarga o de versiones del APK | `03-arquitectura/descarga-y-versiones.md` |
| Descubre un riesgo, un bug de fondo o una deuda, o resuelve uno | `03-arquitectura/riesgos.md` |
| Cumple, cambia o agrega un requerimiento | `02-requerimientos/` (HU, RF o RNF) + la matriz de trazabilidad de su README |
| Cambia colores, tipografía o componentes | `04-diseno/design-system.md` |
| Cambia el contenido o el orden de una sección | `04-diseno/secciones.md` y, si cambia el texto, `01-producto/mensajes-y-tono.md` |
| Cambia el criterio de "terminado" | [`verificacion.md`](verificacion.md) |
| Trabajo nuevo que no entra en ninguna fase | Crear `05-roadmap/fase-NN-tema.md` y sumarlo a la tabla |

**CLAUDE.md no registra avances, estado ni patrones nuevos.** Solo se toca si cambia una regla de
trabajo o la ruta de un documento.

## Convenciones

- **Nombres:** kebab-case, en minúscula y en español (`descarga-y-versiones.md`).
- **Carpetas numeradas**, para que el orden del listado sea el de lectura.
- **Una fuente de verdad por tema.** Si dos documentos dicen lo mismo, uno enlaza al otro.
- **Enlaces relativos** (`../05-roadmap/README.md`), para que funcionen en GitHub
  y en el editor.
- **Imágenes** junto al documento que las usa, en una subcarpeta `img/`.
- **Sin datos personales en las capturas**: nada de fotos, nombres ni correos de cuentas reales. Las
  capturas de la app se toman con datos de demo.
- **Fechas absolutas** (`2026-11-17`), nunca "ayer" ni "la semana pasada".
- **Requerimientos con ID estable** (`HU-01`, `RF-03`, `RNF-02`). Un ID no se reutiliza: si un
  requerimiento se descarta, se marca como descartado y se deja.
- **Histórico:** un documento que ya no aplica se mueve a `archivo/` con la fecha en el nombre y un
  aviso al inicio. No se borra.
- **Mover un documento:** usar `git mv` y sumar la ruta vieja a la tabla "Nombres anteriores" de
  [`../README.md`](../README.md).

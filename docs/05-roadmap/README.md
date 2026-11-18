# Roadmap de la landing

Documento vivo de secuencia de trabajo, con un archivo por fase. Los riesgos y las decisiones
abiertas están en [`../03-arquitectura/riesgos.md`](../03-arquitectura/riesgos.md); este roadmap los
convierte en tareas. Los cambios ya hechos se anotan en
[`registro-de-cambios.md`](registro-de-cambios.md).

**Estado al 2026-11-17:** el proyecto **no ha comenzado**. Hay estudio y documentación, pero ninguna
fase abierta. Las fases se crean cuando empieza el trabajo real.

## Estado de las fases

| Fase | Tema | Requerimientos | Depende de | Estado |
|---|---|---|---|---|
| — | — | — | — | — |

**Leyenda:** ⏳ pendiente · 🔵 en curso · 🟡 implementada, falta verificación · ✅ cerrada.

## Cómo usar este roadmap

1. **Crear una fase:** un archivo `fase-NN-tema.md` (kebab-case, numerado desde `01`) con el formato
   de abajo, y una fila en la tabla. En "Requerimientos" se enlazan las HU, RF y RNF que cubre (ver
   [`../02-requerimientos/`](../02-requerimientos/README.md)), y se completa la columna **Fase(s)** de
   la matriz de trazabilidad.
2. **Antes de empezar una fase:** releer su "Criterio de aceptación", que es la definición de
   terminado.
3. **Tomar una tarea:** anotarse en el archivo de la fase (`(en curso: @usuario-github)`). Ver
   [`../06-estandares/flujo-git.md`](../06-estandares/flujo-git.md).
4. **Al cerrar una tarea:** marcar `[x]` con la fecha y una línea de qué se hizo, y aplicar la matriz
   de [`../06-estandares/documentacion.md`](../06-estandares/documentacion.md).
5. **Al cerrar una fase:** poner la fecha en su título y en la tabla, pasar la
   [verificación](../06-estandares/verificacion.md) y sumar una entrada al
   [registro de cambios](registro-de-cambios.md).

## Formato de un archivo de fase

```
# Fase NN — Tema (estado)

**Objetivo:** …
**Requerimientos:** HU-…, RF-…, RNF-…
**Punto de partida:** qué existe antes de empezar
**Decisiones:** (fecha) …
**Criterio de aceptación:** lista verificable

---

- [ ] **NN-1. Tarea** — detalle
- [x] **NN-2. Tarea (2026-MM-DD):** qué se hizo

## Prueba manual
- [ ] …

---

[← Volver al roadmap](README.md)
```

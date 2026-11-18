# Verificación: cuándo una tarea está terminada

Una tarea está **terminada** cuando cumple todo lo siguiente. "Funciona en mi navegador" no basta.

## 1. Build y calidad de código

Todos los comandos se ejecutan **dentro de `landing/`**, con Node 22.23.4 o superior.

- `npm run build` termina sin errores ni avisos nuevos.
- `npm run check` (tipos de Astro y TypeScript) y `npm run lint` (ESLint) pasan.
- `npm run format:check` no encuentra archivos sin formatear.

## 2. Revisión visual con el MCP de DevTools

Se abre la vista previa (`npm run dev` o `npm run preview` en `landing/`) y se revisa con el MCP de
Chrome DevTools. El catálogo `/dev/estilos` sirve para comparar los componentes con
`maqueta/componentes.html`:

- **Tamaños:** móvil de 390 × 844, tablet de 768 × 1024 y escritorio de 1440 × 900. Ninguno tiene
  scroll horizontal.
- **Consola:** sin errores ni avisos.
- **Red:** no se cargan recursos innecesarios y los videos solo se descargan al acercarse a la vista.
- **Movimiento reducido:** con `prefers-reduced-motion: reduce` emulado, todo el contenido se ve sin
  animaciones y sin huecos.
- **Teclado:** se puede recorrer con Tab, el foco se ve y no hay trampas de foco.

## 3. Métricas (obligatorias en cada PR que toque una sección)

Auditoría de Lighthouse en móvil con el MCP de DevTools:

| Métrica | Mínimo |
|---|---|
| Rendimiento | 90 |
| Accesibilidad | 95 |
| Buenas prácticas | 95 |
| SEO | 95 |
| LCP | < 2,5 s |
| CLS | < 0,1 |

La auditoría de Lighthouse del MCP **no incluye la categoría de rendimiento**. El rendimiento se mide
con trazas (`performance_start_trace`) en las mismas condiciones de la fase 07:

- **Carga en móvil:** 412 × 915, DPR 2,625, CPU 4× y 4G rápida, sin caché. LCP < 2,5 s y CLS < 0,1.
- **Scroll completo en escritorio:** 1440 × 900, CPU 4×, con eventos de rueda (`WheelEvent`) para
  que Lenis los procese. CLS < 0,1 y sin tareas largas de código propio. Los pines nuevos se miden
  con un `PerformanceObserver` de `layout-shift`.

Ver [`../02-requerimientos/requerimientos-no-funcionales.md`](../02-requerimientos/requerimientos-no-funcionales.md).

## 4. Documentación

Se actualizó lo que pide la matriz de [`documentacion.md`](documentacion.md): como mínimo, la fase en
el roadmap, el registro de cambios y la fila del archivo en
[`../03-arquitectura/estructura-del-proyecto.md`](../03-arquitectura/estructura-del-proyecto.md).

## 5. Prueba manual en un teléfono real

Para el trabajo que toca la descarga: abrir la landing en un Android real, descargar el
APK, instalarlo siguiendo la guía de la propia landing y abrir la app.

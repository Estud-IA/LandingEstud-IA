# Requerimientos

| Documento | Qué contiene |
|---|---|
| [`historias-de-usuario.md`](historias-de-usuario.md) | **HU**: qué necesita cada tipo de visitante y del equipo, con criterios de aceptación |
| [`requerimientos-funcionales.md`](requerimientos-funcionales.md) | **RF**: qué debe hacer la landing |
| [`requerimientos-no-funcionales.md`](requerimientos-no-funcionales.md) | **RNF**: cómo debe comportarse (rendimiento, accesibilidad, seguridad…) con criterios medibles |

## Cómo se escriben

- **IDs estables:** `HU-NN`, `RF-NN`, `RNF-NN`. Nunca se reutilizan; un requerimiento descartado se
  marca ❌ y se deja.
- **HU:** "Como… quiero… para…" + criterios de aceptación con casillas `[ ]`.
- **RF:** una fila por requerimiento, con prioridad (M/D/F) y las HU que cumple.
- **RNF:** siempre con un **criterio medible** y la **forma de verificarlo**.
- **Al cumplir un requerimiento:** marcar su estado ✅ y las casillas de la HU, y anotarlo en la fase
  correspondiente del [roadmap](../05-roadmap/README.md), cuando exista.

## Matriz de trazabilidad

Qué RF cumple cada HU y en qué fase se implementa (ver el [roadmap](../05-roadmap/README.md)). La
fase 08 (despliegue) todavía no tiene archivo. Los RNF aplican a todo el proyecto y se verifican de
forma completa en la [fase 07](../05-roadmap/fase-07-rendimiento-accesibilidad-seo.md).

| HU | Descripción breve | RF | Fase(s) |
|---|---|---|---|
| HU-01 | Descargar en Android | RF-01, RF-02, RF-04, RF-05, RF-14, RF-19 (futuro) | [03](../05-roadmap/fase-03-navegacion-y-hero.md), [06](../05-roadmap/fase-06-descarga-faq-legal.md), 08 |
| HU-02 | De la computadora al teléfono (QR) | RF-01, RF-03, RF-04 | [03](../05-roadmap/fase-03-navegacion-y-hero.md), [06](../05-roadmap/fase-06-descarga-faq-legal.md) |
| HU-03 | Visitante con iPhone | RF-01, RF-07, RF-19 (futuro) | [03](../05-roadmap/fase-03-navegacion-y-hero.md), [06](../05-roadmap/fase-06-descarga-faq-legal.md) |
| HU-04 | Instalar con confianza | RF-05, RF-06, RF-12 | [01](../05-roadmap/fase-01-maqueta-html.md) (material), [06](../05-roadmap/fase-06-descarga-faq-legal.md) |
| HU-05 | Ver cómo se vive una clase | RF-08, RF-16, RF-17 | [01](../05-roadmap/fase-01-maqueta-html.md) (material), [03](../05-roadmap/fase-03-navegacion-y-hero.md), [04](../05-roadmap/fase-04-clase-en-vivo.md) |
| HU-06 | Qué gano por participar | RF-09 | [01](../05-roadmap/fase-01-maqueta-html.md) (material), [05](../05-roadmap/fase-05-gamificacion-shorts-creadores.md) |
| HU-07 | Shorts y grabaciones | RF-10 | [01](../05-roadmap/fase-01-maqueta-html.md) (material), [05](../05-roadmap/fase-05-gamificacion-shorts-creadores.md) |
| HU-08 | Estudio del creador | RF-11 | [01](../05-roadmap/fase-01-maqueta-html.md) (material), [05](../05-roadmap/fase-05-gamificacion-shorts-creadores.md) |
| HU-09 | Lista de espera para cobrar | RF-07, RF-11 | [01](../05-roadmap/fase-01-maqueta-html.md) (material), [05](../05-roadmap/fase-05-gamificacion-shorts-creadores.md), [06](../05-roadmap/fase-06-descarga-faq-legal.md) |
| HU-10 | Resolver dudas | RF-12, RF-16 | [06](../05-roadmap/fase-06-descarga-faq-legal.md) |
| HU-11 | Privacidad de mis datos | RF-07, RF-13 | [06](../05-roadmap/fase-06-descarga-faq-legal.md) |
| HU-12 | Navegar sin animaciones | RNF-04 | [02](../05-roadmap/fase-02-base-astro.md) → todas |
| HU-13 | Compartir la landing | RF-15 | [01](../05-roadmap/fase-01-maqueta-html.md) (og-image), [07](../05-roadmap/fase-07-rendimiento-accesibilidad-seo.md) |
| HU-14 | Publicar una versión nueva | RF-04, RF-05, RF-18 | [06](../05-roadmap/fase-06-descarga-faq-legal.md), 08 |
| HU-15 | Medir las descargas | RF-14 | 08 |

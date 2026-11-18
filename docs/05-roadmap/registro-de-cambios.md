# Registro de cambios

Qué cambió en la landing y cuándo, **de lo más nuevo a lo más viejo**. Una entrada por cambio visible
o por decisión importante. El detalle está en la fase enlazada.

**Formato:**

```
## AAAA-MM-DD — Título corto
- **Tipo:** Añadido | Cambiado | Corregido | Eliminado | Decisión | Versión del APK
- **Fase:** enlace
- Qué cambió y por qué, en 1 a 3 líneas.
```

---

## 2026-11-17 — Maqueta HTML de la landing
- **Tipo:** Añadido
- **Fase:** [01](fase-01-maqueta-html.md)
- Se crea `maqueta/`: landing completa en HTML y CSS sin JS, catálogo de componentes, 9 pantallas de
  la app recreadas, 4 piezas y 42 imágenes exportadas en `maqueta/exportes/`.

## 2026-11-17 — Navegación en isla táctil
- **Tipo:** Decisión
- **Fase:** [01](fase-01-maqueta-html.md)
- La navegación usa una "isla" blanca con borde y sombra dura en vez de `mix-blend-mode: difference`,
  que invertía los colores del logo. Ver D11 en [`../03-arquitectura/README.md`](../03-arquitectura/README.md).

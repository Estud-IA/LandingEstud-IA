# Descarga y versiones del APK

Cómo llega el APK al visitante y cómo se publica una versión nueva.

**Estado:** 📝 planificado (2026-11-17). El alojamiento del APK está por decidir (ver
[`riesgos.md`](riesgos.md)).

## Contexto

Al 2026-11-17, la app se distribuye como **APK directo** (la "versión directa" del plan de monetización de la
app). Google Play e iOS llegarán después (ver
[`../01-producto/app-estudia.md`](../01-producto/app-estudia.md)). Instalar un APK pide un permiso y
genera desconfianza, así que la landing tiene que **guiar y dar pruebas** (HU-04).

## `src/content/release.json`: la única fuente de la versión

**Estado al 2026-11-18 (fase 06):** tiene la forma completa y se valida al compilar con el `zod` de
Astro, en `src/content/release.ts`.

- Con `"provisional": true`, `url`, `sha256` y `fecha` pueden ser `null`. Así está hoy: A2 y A8
  siguen abiertas.
- Con `"provisional": false` son obligatorios:
  - `url` con https;
  - `sha256` de 64 caracteres hexadecimales;
  - `fecha` en formato AAAA-MM-DD.
- Si algo no cumple, el build se detiene con un mensaje como
  `release.json no es válido: - sha256: sha256 es obligatorio cuando provisional es false`.
- `release.ts` exporta:
  - `release`;
  - `disponible` (`true` solo con APK publicado);
  - `textoVersion()`;
  - `rutaDescarga(origen)`;
  - `datosFicha()`: lo que falta aparece como "Se publica con la versión final".

Al publicar una versión solo se cambia este archivo (HU-14). Forma propuesta:

```json
{
  "version": "1.0.0",
  "build": 1,
  "fecha": "2026-12-01",
  "pesoMB": 48.2,
  "androidMinimo": "8.0",
  "sha256": "…64 caracteres hexadecimales…",
  "url": "https://…/estud-ia-1.0.0.apk",
  "notas": "Primera versión pública."
}
```

Quién usa cada dato:

| Consumidor | Usa |
|---|---|
| `DownloadCta` (hero, barra fija, CTA final) | `version`, `pesoMB`, `url` vía `/descargar` |
| `ComoDescargar` | Todos los campos |
| `/descargar` | `url` |
| Datos estructurados `SoftwareApplication` | `version`, `fecha`, `pesoMB`, `androidMinimo` |
| `/novedades` (futuro, RF-18) | El historial de `release.json` en git |

Al compilar se valida que todos los campos existan, que `sha256` tenga 64 caracteres hexadecimales y
que `url` use `https`. Si algo falla, **el build se detiene**.

## Ruta `/descargar`

- Todos los botones y el QR apuntan a `/descargar?origen=<hero|barra|seccion|final|qr>`, **nunca
  directo al APK**. Así:
  - el QR impreso sigue sirviendo con cada versión nueva;
  - la analítica registra el origen (RF-14);
  - cambiar de alojamiento no rompe enlaces.
- **Implementación (fase 06, `src/pages/descargar.astro`):**
  - **Con `disponible`:** redirige con `location.replace(url)` y muestra el enlace "Si la descarga
    no empieza, toca aquí".
  - **Con datos provisionales:** no redirige y muestra "La descarga estará disponible muy pronto",
    con un botón para volver a `/#descargar`.
  - Guarda `?origen` en `data-origen` para la analítica (fase 08).
  - Lleva `noindex` y no está en el sitemap.
  - Si el hosting lo permite, más adelante puede ser una redirección del servidor con analítica del
    lado del servidor.

## Detección del dispositivo (script en línea en `BaseLayout.astro`)

Implementado en la fase 03. Un script en línea en el `<head>` pone
`<html data-dispositivo="android|ios|escritorio">` **antes del primer pintado**, y `DownloadCta`
muestra la variante que corresponde solo con CSS, sin saltos visuales.

| Caso | Cómo se detecta | Qué muestra el CTA |
|---|---|---|
| Android | `navigator.userAgentData?.platform === 'Android'` o `/Android/i` en el UA | DESCARGAR PARA ANDROID · `v1.0.0 · 48 MB` |
| iOS / iPadOS | `/iPhone|iPad|iPod/` en el UA, o `MacIntel` con pantalla táctil | Próximamente en iOS + lista de espera |
| Escritorio | El resto | Botón de descarga + QR "Escanea con tu Android" |
| Sin JS | — | El HTML base: el botón de Android con el QR |

## QR

- Se genera **al compilar** como SVG con la librería `qrcode`, apuntando a
  `https://<dominio>/descargar?origen=qr`.
- Corrección de errores M y margen de 4 módulos.
- El logo en el centro es opcional; si se pone, hay que verificar que se pueda escanear.

## Publicar una versión nueva (procedimiento)

1. El equipo de la app compila el APK de release **firmado** (repo `streaming-estudia`).
2. Calcula el SHA-256: `sha256sum estud-ia-X.Y.Z.apk` (o `Get-FileHash -Algorithm SHA256` en
   Windows).
3. Sube el APK al alojamiento elegido, con la versión en el nombre del archivo.
4. Actualiza `src/content/release.json` en una rama `chore/release-X.Y.Z` y abre un PR.
5. Al desplegar, comprueba que `/descargar` baje el archivo nuevo y que su SHA-256 coincida.
6. Anota la versión en [`../05-roadmap/registro-de-cambios.md`](../05-roadmap/registro-de-cambios.md).

**Más adelante:** el CI del repo de la app puede publicar el APK y abrir el PR de `release.json`
automáticamente.

## Alojamiento del APK (por decidir, decisión A2)

| Opción | A favor | En contra |
|---|---|---|
| **GitHub Releases** | Gratis, versionado, SHA visible, fácil de automatizar desde el CI | Si el repo es privado, la descarga necesita un repo público aparte |
| **Cloudflare R2** + dominio propio | Sin coste de salida, URL con nuestro dominio, rápido | Hay que configurarlo; el versionado es manual |
| Dentro del sitio (`public/`) | Lo más simple | Infla cada deploy; descartado (decisión D6) |

Cabeceras necesarias para el APK: `Content-Type: application/vnd.android.package-archive` y
`Content-Disposition: attachment`.

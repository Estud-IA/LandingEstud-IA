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
- **Implementación:** una página estática que registra el evento y redirige con
  `location.replace(url)`. Lleva un enlace visible por si el JS falla. Si el hosting lo permite,
  puede ser una redirección del servidor con analítica del lado del servidor.

## Detección del dispositivo (`src/scripts/device.ts`)

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

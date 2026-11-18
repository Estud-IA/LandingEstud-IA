# Historias de usuario (HU)

**Formato:** *Como [quién], quiero [qué], para [para qué].* Cada HU tiene criterios de aceptación
verificables. Los RF que la cumplen y la fase que la implementa están en la
[matriz de trazabilidad](README.md#matriz-de-trazabilidad).

**Estados:** ⏳ pendiente · 🔵 en curso · ✅ cumplida · ❌ descartada (el ID no se reutiliza).

---

## Épica A: Descargar la app

### HU-01: Descargar en Android ⏳
**Como** estudiante que entra desde su Android, **quiero** descargar la app con un toque, **para**
empezar a usarla sin buscarla en una tienda.

- [ ] En Android, el botón principal dice "DESCARGAR PARA ANDROID" y muestra la versión y el peso.
- [ ] El botón descarga el APK de la última versión.
- [ ] En móvil, el botón de descarga está siempre visible (barra fija abajo).
- [ ] Cada clic registra el evento `download_click` con su origen.

### HU-02: Pasar de la computadora al teléfono ⏳
**Como** visitante que llega desde una computadora, **quiero** escanear un código, **para** abrir la
descarga directamente en mi teléfono.

- [ ] En escritorio se ve un QR en el hero y en la sección de descarga.
- [ ] El QR abre `/descargar?origen=qr`, que lleva a la última versión.

### HU-03: Saber si hay versión para iPhone ⏳
**Como** visitante con iPhone, **quiero** saber si puedo usar la app, **para** no perder tiempo.

- [ ] En iOS, el CTA dice "Próximamente en iOS" y no ofrece el APK.
- [ ] Puedo dejar mi correo para que me avisen, y recibo una confirmación en pantalla.

### HU-04: Instalar con confianza ⏳
**Como** estudiante que nunca instaló un APK, **quiero** una guía clara y una forma de verificar el
archivo, **para** instalarlo sin miedo.

- [ ] Hay una guía de 3 pasos con capturas de Android.
- [ ] Se ven la versión, el peso, la fecha, el Android mínimo y el SHA-256.
- [ ] La FAQ explica por qué Android pide permiso y por qué es seguro.

## Épica B: Entender la app

### HU-05: Ver cómo se vive una clase ⏳
**Como** estudiante curioso, **quiero** ver qué pasa dentro de una clase en vivo, **para** decidir
si vale la pena descargarla.

- [ ] Al bajar por la página veo, en el teléfono, cómo se entra al directo, se chatea, se responde
      una trivia, se gana XP y se sube en el ranking.
- [ ] En móvil veo los mismos 5 pasos como tarjetas.

### HU-06: Entender qué gano por participar ⏳
**Como** estudiante, **quiero** ver qué recompensas da la app, **para** motivarme a usarla.

- [ ] Se muestran nivel, racha, insignias, ranking y Vcoins con el estilo de la app.

### HU-07: Descubrir los Shorts y las grabaciones ⏳
**Como** estudiante que no siempre llega a tiempo, **quiero** saber que puedo ver las grabaciones y
los Shorts, **para** no perderme el contenido.

- [ ] Un carrusel muestra tarjetas de video con las etiquetas SHORT, EN VIVO y GRABACIÓN.

## Épica C: Creadores

### HU-08: Conocer el estudio del creador ⏳
**Como** profesor o tutor, **quiero** ver qué herramientas tengo para dar clases, **para** decidir
si enseño en Estud-IA.

- [ ] La sección de creadores muestra el estudio: transmitir, voltear la cámara, micrófono,
      moderación y espectadores.

### HU-09: Anotarme para cobrar ⏳
**Como** creador, **quiero** saber cuándo podré cobrar mis clases, **para** prepararme.

- [ ] Se ve "PRÓXIMAMENTE: cobra con Yape", sin prometer fechas.
- [ ] Puedo dejar mi correo (y opcionalmente el tema que enseño) en una lista de espera.

## Épica D: Confianza y dudas

### HU-10: Resolver dudas ⏳
**Como** visitante, **quiero** respuestas rápidas a las dudas comunes, **para** no tener que
preguntar.

- [ ] Hay una FAQ con al menos 6 preguntas, navegable con teclado.

### HU-11: Conocer cómo se usan mis datos ⏳
**Como** visitante que deja su correo, **quiero** leer la política de privacidad, **para** saber qué
se hace con mis datos.

- [ ] Existen `/privacidad` y `/terminos`, enlazadas desde el footer y desde cada formulario.

## Épica E: Accesibilidad y difusión

### HU-12: Navegar sin animaciones ⏳
**Como** visitante sensible al movimiento, **quiero** que la página respete mi preferencia del
sistema, **para** leerla sin mareos.

- [ ] Con `prefers-reduced-motion: reduce` no hay scroll suave, ni desplazamientos, ni secciones
      fijas, y todo el contenido sigue visible.

### HU-13: Compartir la landing ⏳
**Como** estudiante, **quiero** compartir el enlace por WhatsApp o redes, **para** invitar a mis
compañeros.

- [ ] Al compartir el enlace aparecen la imagen, el título y la descripción correctos.

## Épica F: Operación (equipo)

### HU-14: Publicar una versión nueva ⏳
**Como** integrante del equipo, **quiero** publicar una versión nueva del APK cambiando un solo
archivo, **para** no tocar código en cada versión.

- [ ] Al editar `src/content/release.json` y desplegar, se actualizan el botón, la sección de
      descarga, `/descargar` y el QR.

### HU-15: Medir las descargas ⏳
**Como** equipo, **quiero** saber cuántas personas hacen clic en descargar y desde dónde, **para**
mejorar la landing.

- [ ] Hay un panel de analítica con `download_click` por origen, visitas y registros en las listas de
      espera.

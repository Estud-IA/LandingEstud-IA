# Secciones de la landing

Orden, contenido, layout, fondo y animación de cada sección. Los textos están en
[`../01-producto/mensajes-y-tono.md`](../01-producto/mensajes-y-tono.md); los componentes en
[`design-system.md`](design-system.md); los módulos de animación en
[`../03-arquitectura/animaciones.md`](../03-arquitectura/animaciones.md).

| # | Sección | Fondo |
|---|---|---|
| 1 | Navegación | Transparente (`difference`) |
| 2 | Hero | Claro |
| 3 | Franja de prueba | Claro |
| 4 | Así se vive una clase | **Negro** |
| 5 | Gamificación | Claro |
| 6 | Shorts y grabaciones | Claro |
| 7 | Para creadores | **Negro** |
| 8 | Cómo descargar | Claro |
| 9 | Preguntas frecuentes | Claro |
| 10 | CTA final + footer | Claro |

## 1. Navegación

- **Contenido:** logo de Estud-IA, anclas (Cómo funciona · Para creadores · FAQ) y el botón
  **Descargar**.
- **Comportamiento:** fija arriba, con `mix-blend-mode: difference`. Se oculta al bajar y reaparece
  al subir. En móvil, las anclas van a un menú y el botón Descargar pasa a una barra fija abajo
  (RF-02).

## 2. Hero

- **Layout:** en escritorio, el titular gigante a la izquierda y el **mockup del teléfono con video
  real de un directo** a la derecha. En móvil, el titular arriba y el teléfono debajo.
- **CTA según el dispositivo** (RF-01):
  - **Android:** DESCARGAR PARA ANDROID, con la versión y el peso.
  - **iPhone:** "Próximamente en iOS" y lista de espera.
  - **Escritorio:** el botón y además el **QR**.
- **Animación:**
  - El titular entra letra a letra (SplitText).
  - El teléfono sube con un leve giro.
  - Al hacer scroll, las líneas del titular se desplazan en horizontal en sentidos opuestos.
  - Elementos flotantes alrededor del teléfono: la etiqueta EN VIVO, una burbuja de chat, "+10 XP".

## 3. Franja de prueba

- Una cinta en movimiento continuo con datos reales: "chat en menos de 2 s", "200+ en una misma
  clase", "Trivias en vivo", "Shorts", "XP y rachas".
- Se detiene con `prefers-reduced-motion`.

## 4. Así se vive una clase (sección estrella)

- **Fondo:** pasa de claro a negro al entrar.
- **Layout:** el **teléfono queda fijo** en el centro. A los lados, 5 pasos que entran y salen con el
  scroll.
- **Pasos:**
  1. Entra al directo.
  2. Pregunta en el chat.
  3. Responde la trivia.
  4. Gana XP.
  5. Sube en el ranking.
- **Pantalla del teléfono:** recreada en HTML con los tokens de la app (decisión D5). Cada paso
  anima su propia escena: los mensajes del chat suben, aparece la encuesta, la barra de XP se llena
  y la posición del ranking sube.
- **En móvil:** sin fijar. Cada paso es una tarjeta con su miniescena.

## 5. Gamificación

- **Layout:** cuadrícula irregular de tarjetas táctiles (*bento grid*):
  - Nivel, con la insignia amarilla.
  - Racha de días.
  - Insignias.
  - Ranking.
  - Vcoins.
- **Animación:** las tarjetas entran escalonadas, los contadores suben de 0 al valor y la barra de
  XP se llena.

## 6. Shorts y grabaciones

- **Layout:** un carrusel de tarjetas de video con el estilo de `VideoThumbnailCard` de la app:
  - Borde de 2,5 px, esquinas de 18 px y sombra dura.
  - Etiqueta SHORT, EN VIVO o GRABACIÓN.
  - El avatar flota sobre el borde.
- **Animación:** el scroll vertical mueve el carrusel en horizontal (sección fija). En móvil, se
  desliza con el dedo.

## 7. Para creadores

- **Fondo:** negro, como el estudio de la app.
- **Contenido:**
  - Una recreación del estudio con los controles laterales y el botón amarillo de transmitir.
  - Puntos clave: transmite desde el teléfono, modera tu chat, comparte material, mira quién está
    conectado.
  - Un bloque **PRÓXIMAMENTE: cobra con Yape**, con la tarjeta amarilla de Monedas.
  - Formulario de lista de espera para creadores (RF-07).
- **Animación:** el botón de transmitir late como el "EN VIVO" y los controles entran de lado.

## 8. Cómo descargar

- **Contenido:**
  - Los 3 pasos, con capturas del proceso en Android.
  - El botón principal.
  - Versión, peso, fecha, Android mínimo y SHA-256 (RF-05).
  - El QR en escritorio.
  - "Próximamente en Google Play y App Store".
- **Datos:** salen de `src/content/release.json` (ver
  [`../03-arquitectura/descarga-y-versiones.md`](../03-arquitectura/descarga-y-versiones.md)).

## 9. Preguntas frecuentes

- Un acordeón accesible (`<details>`/`<summary>`) con el contenido de `src/content/faq.md`.
- Se marca con datos estructurados `FAQPage` (RF-10).

## 10. CTA final + footer

- **CTA:** el titular gigante otra vez ("Tu próxima clase empieza en vivo") y el botón de descarga.
- **Footer:** logo, enlaces a privacidad y términos, contacto y año.

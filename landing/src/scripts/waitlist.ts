/**
 * Formularios de lista de espera (RF-07): form[data-waitlist].
 *
 * - Valida con el navegador (required, type="email") y muestra los errores con :user-invalid.
 * - Mantiene aria-invalid y aria-describedby al día: el mensaje de error solo se enlaza mientras el
 *   campo es inválido (guía "validate-input-after-interaction" de modern-web-guidance).
 * - `enviar()` es el ÚNICO punto que se conecta al servicio de correos cuando se decida (A5). Hasta
 *   entonces no se envía nada y el mensaje lo dice. No publicar la landing así (riesgo R10).
 */

export interface DatosListaEspera {
  tipo: string;
  correo: string;
  tema?: string;
  origen: string;
}

/** Pendiente de la decisión A5. Hoy no guarda nada. Devuelve si los datos quedaron guardados. */
async function enviar(datos: DatosListaEspera): Promise<boolean> {
  // Aquí irá la llamada al servicio elegido en A5 (fase 08). Mientras tanto no se envía nada.
  void datos;
  return false;
}

const MENSAJES = {
  guardado: '¡Listo! Te avisaremos por correo.',
  pendiente: 'Gracias. La lista de espera abrirá pronto; todavía no guardamos tu correo.',
  error: 'No pudimos registrarte. Inténtalo de nuevo en unos minutos.',
};

type Control = HTMLInputElement;

function actualizarAria(control: Control): void {
  const idError = control.dataset.error;
  if (!idError) return;
  const ids = (control.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean);
  const sinError = ids.filter((id) => id !== idError);

  if (control.validity.valid) {
    control.removeAttribute('aria-invalid');
    if (sinError.length) control.setAttribute('aria-describedby', sinError.join(' '));
    else control.removeAttribute('aria-describedby');
  } else {
    control.setAttribute('aria-invalid', 'true');
    control.setAttribute('aria-describedby', [...sinError, idError].join(' '));
  }
}

function prepararFormulario(form: HTMLFormElement): void {
  const controles = Array.from(form.querySelectorAll<Control>('input[data-error]'));
  const mensaje = form.querySelector<HTMLElement>('[data-mensaje]');
  const boton = form.querySelector<HTMLButtonElement>('button[type="submit"]');

  // Como :user-invalid: el error se marca cuando el usuario deja un campo que modificó, o después de
  // intentar enviar; no mientras escribe ni al pasar con Tab por un campo vacío.
  const tocado = (control: Control) =>
    form.dataset.intentado === 'si' || control.value !== '' || control.checked;

  for (const control of controles) {
    control.addEventListener('blur', () => {
      if (tocado(control)) actualizarAria(control);
    });
    control.addEventListener('change', () => actualizarAria(control));
    // El navegador lanza "invalid" al intentar enviar con campos inválidos (validación nativa).
    control.addEventListener('invalid', () => {
      form.dataset.intentado = 'si';
      actualizarAria(control);
    });
    control.addEventListener('input', () => {
      if (control.hasAttribute('aria-invalid')) actualizarAria(control);
    });
  }

  // El evento submit solo llega si el formulario es válido (validación nativa).
  form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    controles.forEach(actualizarAria);

    const datos = new FormData(form);
    const tema = String(datos.get('tema') ?? '').trim();
    if (boton) boton.disabled = true;

    try {
      const guardado = await enviar({
        tipo: form.dataset.tipo ?? '',
        correo: String(datos.get('correo') ?? '').trim(),
        tema: tema || undefined,
        origen: location.pathname,
      });
      if (mensaje) mensaje.textContent = guardado ? MENSAJES.guardado : MENSAJES.pendiente;
      if (guardado) form.reset();
    } catch {
      if (mensaje) mensaje.textContent = MENSAJES.error;
    } finally {
      if (boton) boton.disabled = false;
    }
  });
}

document.querySelectorAll<HTMLFormElement>('form[data-waitlist]').forEach(prepararFormulario);

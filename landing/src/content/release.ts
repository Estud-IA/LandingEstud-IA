/**
 * Datos de la versión del APK. Única fuente: release.json (docs/03-arquitectura/descarga-y-versiones.md).
 *
 * Se validan al compilar: si algo no cumple, el build se detiene con un mensaje claro.
 * - provisional: true  → aún no hay APK firmado (decisiones A2 y A8): url, sha256 y fecha pueden ser null.
 * - provisional: false → url https, sha256 de 64 caracteres hexadecimales y fecha AAAA-MM-DD obligatorios.
 */
import { z } from 'astro/zod';
import datos from './release.json';

const esquema = z
  .object({
    provisional: z.boolean(),
    version: z.string().regex(/^\d+\.\d+\.\d+$/, 'version debe tener la forma 1.2.3'),
    build: z.number().int().positive(),
    fecha: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'fecha debe tener la forma AAAA-MM-DD')
      .nullable(),
    pesoMB: z.number().positive(),
    androidMinimo: z.string().min(1),
    sha256: z
      .string()
      .regex(/^[a-f0-9]{64}$/i, 'sha256 debe tener 64 caracteres hexadecimales')
      .nullable(),
    url: z
      .url()
      .refine((u) => u.startsWith('https://'), 'url debe usar https')
      .nullable(),
    notas: z.string().optional(),
  })
  .superRefine((r, ctx) => {
    if (r.provisional) return;
    for (const campo of ['url', 'sha256', 'fecha'] as const) {
      if (r[campo] === null) {
        ctx.addIssue({
          code: 'custom',
          path: [campo],
          message: `${campo} es obligatorio cuando provisional es false`,
        });
      }
    }
  });

const resultado = esquema.safeParse(datos);
if (!resultado.success) {
  const detalle = resultado.error.issues
    .map((i) => `  - ${i.path.join('.') || '(raíz)'}: ${i.message}`)
    .join('\n');
  throw new Error(`release.json no es válido:\n${detalle}`);
}

export const release = resultado.data;

/** true cuando hay un APK real publicado (no provisional). */
export const disponible = !release.provisional && release.url !== null;

/** "v1.0.0 · 48 MB", para el detalle del botón de descarga. */
export function textoVersion(): string {
  return `v${release.version} · ${release.pesoMB} MB`;
}

/** Ruta interna de descarga; todos los CTA pasan por aquí (RF-04). */
export function rutaDescarga(origen: string): string {
  return `/descargar?origen=${encodeURIComponent(origen)}`;
}

const PENDIENTE = 'Se publica con la versión final';

/** Filas de la ficha de la versión; lo que aún no existe se muestra como pendiente. */
export function datosFicha(): { nombre: string; valor: string; codigo?: boolean }[] {
  const fecha = release.fecha
    ? new Intl.DateTimeFormat('es-PE', { dateStyle: 'long', timeZone: 'UTC' }).format(
        new Date(`${release.fecha}T00:00:00Z`),
      )
    : PENDIENTE;

  return [
    { nombre: 'Versión', valor: `${release.version} (build ${release.build})` },
    { nombre: 'Peso', valor: `${release.pesoMB} MB` },
    { nombre: 'Fecha', valor: fecha },
    { nombre: 'Android', valor: `${release.androidMinimo} o superior` },
    { nombre: 'SHA-256', valor: release.sha256 ?? PENDIENTE, codigo: Boolean(release.sha256) },
  ];
}

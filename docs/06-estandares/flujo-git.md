# Flujo de Git

Alineado con el flujo del repo de la app (`streaming-estudia/docs/03-estandares/flujo-git.md`).

## Regla para agentes (Claude Code)

**El agente hace commits, push, PR y merges, y crea o cambia de rama, solo cuando quien dirige la
sesión se lo pide explícitamente, en ese momento.**

- Un plan aprobado no cuenta como pedido de commit.
- Una aprobación vale para esa vez, no para las siguientes.
- Al terminar una tarea, el agente reporta los archivos cambiados y los deja en el working tree.

## Ramas

```
main       ← producción: lo que está publicado en el dominio (protegida)
└─ develop ← integración y vista previa (protegida)
   ├─ feature/*    sección o funcionalidad nueva
   ├─ bugfix/*     corrección
   ├─ hotfix/*     arreglo urgente en producción
   ├─ docs/*       documentación
   └─ refactor/*   refactorización
```

- Nombres en kebab-case: `feature/hero-titular-animado`, `docs/estructura-inicial`.
- Las ramas salen de `develop` y vuelven a `develop` por PR.
- Cada persona trabaja en su propia rama. Antes de tomar una tarea, revisar en
  [`../05-roadmap/README.md`](../05-roadmap/README.md) que no la tenga otra persona, y anotarse en el
  archivo de la fase: `(en curso: @usuario-github)`.

## Commits

Formato: `type(scope): descripción breve`, en español y en presente.

| Tipo | Uso |
|---|---|
| `feat` | Sección o funcionalidad nueva |
| `fix` | Corrección |
| `docs` | Documentación |
| `style` | Solo estilos visuales, sin cambiar comportamiento |
| `refactor` | Reorganizar código sin cambiar el resultado |
| `perf` | Rendimiento (peso, carga, animaciones) |
| `chore` | Dependencias, configuración, scripts |

Scopes habituales: `hero`, `clase`, `gamificacion`, `shorts`, `creadores`, `descarga`, `faq`,
`legal`, `motion`, `tokens`, `seo`, `docs`.

Ejemplo: `feat(hero): titular gigante con revelado por letras`.

## Pull requests

- **Para mergear:** una aprobación, verificación en verde (ver [`verificacion.md`](verificacion.md)) y
  la rama actualizada con `develop`.
- **Código y docs viajan juntos:** el PR incluye la actualización de docs que pide la matriz de
  [`documentacion.md`](documentacion.md).
- **Cambios visuales:** el PR lleva capturas de antes y después, en móvil y en escritorio.
- Nada de `push --force` sobre ramas compartidas; en la rama propia, solo `--force-with-lease`.

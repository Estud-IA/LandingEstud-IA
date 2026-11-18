# Flujo de Git

Este estándar es para todo el equipo. Cada integrante trabaja en su propia rama y puede apoyarse en un
agente (Claude Code). En estos documentos, **"quien dirige la sesión"** es la persona del equipo que
está trabajando con el agente en ese momento.

## Regla para agentes (Claude Code)

**El agente hace commits, push, PR, merges y crea o cambia de rama solo cuando quien dirige la sesión
se lo pide explícitamente, en ese momento.**

- Un plan aprobado que diga "un commit por tarea" **no** cuenta como pedido.
- Una aprobación vale para esa vez, no para las siguientes.
- Al terminar una tarea, el agente reporta los archivos cambiados y los deja en el working tree para
  que quien dirige la sesión los revise y decida.
- El agente trabaja en la rama que ya está en checkout. No cambia de rama; si es `main` o `develop`,
  o no parece la correcta para la tarea, avisa antes de tocar nada.

## Trabajo en equipo

- **Cada persona trabaja en su propia rama.** Nadie trabaja directo sobre `main` ni `develop`, ni sobre
  la rama de otra persona sin acordarlo.
- **Antes de empezar:** actualizar la rama con `develop` y revisar en
  [`../05-roadmap/README.md`](../05-roadmap/README.md) que la tarea no la tenga otra persona.
- **Al tomar una tarea de una fase**, anotar quién la lleva en el archivo de la fase (por ejemplo,
  `- [ ] **02-3. …** (en curso: @usuario-github)`), para no duplicar trabajo.
- **Código y docs viajan juntos:** el PR que cambia código incluye la actualización de docs que pide
  la matriz de [`documentacion.md`](documentacion.md). Así el estado documentado no se adelanta ni se
  atrasa respecto de `develop`.
- **No reescribir historia compartida:** nada de `push --force` sobre ramas que otros usan. En la rama
  propia, solo `--force-with-lease`.
- **Conflictos en docs compartidos** (`05-roadmap/README.md`,
  `03-arquitectura/estructura-del-proyecto.md`): se resuelven conservando los cambios de ambos;
  ninguna fila de estado se pisa sin hablarlo.

## Ramas

```
main       ← producción (protegida)
└─ develop ← integración (protegida)
   ├─ feature/*    nueva funcionalidad
   ├─ bugfix/*     corrección de bug
   ├─ hotfix/*     arreglo urgente para producción
   ├─ docs/*       documentación
   └─ refactor/*   refactorización
```

Nombres en kebab-case y descriptivos: `feature/hero-titular-animado`, `bugfix/qr-url-descarga`.
Las ramas salen de `develop` y vuelven a `develop` por PR. Una rama personal de largo plazo (por
ejemplo, la que usa alguien para una fase entera) también se integra a `develop` por PR, con las mismas
reglas.

## Commits

Formato: `type(scope): descripción breve`, en español y en presente.

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Documentación |
| `style` | Formato, sin cambios lógicos |
| `refactor` | Refactorización |
| `test` | Tests |
| `chore` | Dependencias, configuración |

Ejemplos: `feat(hero): anima el titular letra a letra`,
`docs(roadmap): cierra la fase 02`.

- Commits chicos y de un solo tema.
- Nada de mensajes como "fix" o "update".
- Referenciar issues cuando aplique: `fix #123`.

## Pull Requests

- Título con el mismo formato que los commits.
- La descripción incluye: qué hace, con qué se relaciona, cambios principales, cómo probarlo y un
  checklist (convenciones, docs actualizadas según
  [`documentacion.md`](documentacion.md), tests nuevos, tests existentes en verde).
- Para mergear: 1 aprobación, CI en verde (ver [`verificacion.md`](verificacion.md)) y rama
  actualizada con la de destino.
- **Squash and merge** para feature branches. **Merge commit** para hotfixes y releases.

## Protección de `main` y `develop`

1 aprobación obligatoria, checks de CI en verde, rama actualizada, sin force push y sin borrar la rama.

# design.md — MurciaGram · Sistema de registro y autenticación

Este documento es la **fuente de verdad visual** del proyecto. Debe leerse antes de
modificar cualquier HTML o CSS. Se ha extraído de la web anterior (`murciagram`)
para que el login y el registro parezcan parte de la misma aplicación.

## 1. Principios

- **Mobile first.** Se diseña primero para 320–599 px y se añaden reglas con
  `@media (width >= …)`. Se usan rangos modernos, no `max-width` heredado.
- **Coherencia, no invención.** Los formularios solo usan los tokens de la
  galería. Las pocas extensiones necesarias están marcadas como *EXTENSIÓN*.
- **CSS externo y en cascada.** Orden de carga: `reset.css` → `styles.css` →
  `auth.css`. Nada de estilos inline salvo clase dinámica desde JavaScript.
- **Accesibilidad.** Etiquetas visibles, foco visible, mensajes con `role="alert"`
  y `aria-describedby`, iconos decorativos con `alt=""`.

## 2. Paleta de colores

### Principal (ya existente en `styles.css`)

| Token | Valor | Uso |
|---|---|---|
| `--color-fondo` | `#f4f1ec` | Fondo general de todas las páginas |
| `--color-superficie` | `#fffdf9` | Tarjetas, cabecera, nav y panel del formulario |
| `--color-tinta` | `#2a1f1b` | Texto principal y títulos |
| `--color-primario` | `#b23a2f` | Terracota: marca, botón principal, enlaces activos, error |
| `--color-acento` | `#e0a33e` | Mostaza: foco, selección, detalles |
| `--color-crema` | `#f7f0e7` | Texto sobre fondos oscuros/terracota |
| `--color-tinta-suave` | `#6b5b53` | Textos secundarios, ayudas, placeholders |
| `--color-borde` | `rgba(42, 31, 27, .12)` | Bordes de tarjetas y divisores |

### Secundaria / EXTENSIÓN (definida en `auth.css`)

| Token | Valor | Uso |
|---|---|---|
| `--color-error` | `#b23a2f` | Mismo terracota; no se inventa un rojo nuevo |
| `--color-exito` | `#2f6b4f` | Único mensaje "verde", apagado y legible |
| `--color-fondo-campo` | `#fffdf9` | Fondo del input (idéntico a superficie) |
| `--color-borde-fuerte` | `rgba(42, 31, 27, .28)` | Borde de campos en reposo |

> Regla: el error usa el primario para no romper la paleta. El verde solo
> aparece en el aviso de correo enviado / registro correcto.

## 3. Tipografía y jerarquía

- Familia única: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.
- No se cargan fuentes externas. Pesos usados: 400 (cuerpo), 600 (etiquetas y nav), 700 (títulos).
- `line-height` base: `1.6`; títulos: `1.25`.

| Nivel | Tamaño | Peso | Uso |
|---|---|---|---|
| H1 galería | 2 rem → 3 rem (>800 px) | 700 | Titular de `index.html` |
| H1 auth / H2 | 1.65–2 rem | 700 | Titular de los formularios |
| H3 | 1.2 rem | 700 | Título de tarjeta o bloque |
| Cuerpo | 1 rem | 400 | Texto y campos |
| Ayuda / error | 0.8 rem | 400–600 | Bajo cada campo |
| Eyebrow | 0.72 rem, `letter-spacing:.16em`, mayúsculas | 600 | `.header__tag`, `.sidebar__title` |

`em` dentro del título de la galería: color primario y cursiva.

## 4. Tamaños, márgenes y espaciados

Escala (múltiplos de 0.25 rem): `0.25 · 0.5 · 0.75 · 1 · 1.5 · 2 · 2.5 · 3 · 4 rem`.

| Elemento | Medida |
|---|---|
| Padding de página móvil | `1.25 rem` (`1.75 rem` en tableta) |
| Padding de página escritorio | `2.5 rem`, contenido máximo `90 rem` |
| Separación entre campos | `1 rem` |
| Altura de campo — **EXTENSIÓN** | `3 rem` (48 px) |
| Ancho máximo del formulario — **EXTENSIÓN** | `26 rem` |
| Separación entre label y campo | `0.4 rem` |
| Separación tarjeta auth | `1.5 rem` internal, `2 rem` exterior |

## 5. Bordes, radios y sombras

- Radio tarjeta: `18px` (`--radio-tarjeta`).
- Radio pastilla: `999px` (`--radio-pastilla`) para nav y botones pequeños.
- Radio de campos — **EXTENSIÓN**: `12px`.
- Sombra suave: `0 1px 2px rgba(42,31,27,.06), 0 18px 36px -24px rgba(42,31,27,.45)`.
- Sombra alta: `0 2px 4px rgba(42,31,27,.08), 0 28px 48px -22px rgba(42,31,27,.5)`.
- Transición: `0.25s cubic-bezier(.22,.85,.28,1)` (`--curva`). En hover de tarjetas, `0.45s`.

## 6. Botones y campos

### Botón principal

Fondo `--color-primario`, texto `--color-crema`, radio `999px`, padding `0.8rem 1.4rem`,
peso 700, tamaño `0.85rem`, `letter-spacing:.06em`, mayúsculas. Hover: fondo más
oscuro (`#9b3027`) y `translateY(-1px)`. Ocupa todo el ancho en móvil.

### Botón secundario / enlace

Fondo transparente, borde `1px` `--color-borde-fuerte`, texto `--color-tinta`.
Hover: fondo `rgba(178,58,47,.08)` y color primario. Es el estilo de "Volver" y
"¿Olvidaste tu contraseña?".

### Campo

Label encima, visible, `0.82rem`, peso 600. Input con borde `1px`, fondo
`--color-superficie`, padding-inline `2.6rem` cuando lleva icono a la izquierda,
radio `12px`. Placeholder en `--color-tinta-suave`, nunca como sustituto del label.
Texto de ayuda debajo, `0.8rem`, tinta suave.

### Casilla de consentimiento RGPD

`input[type="checkbox"]` con `accent-color: var(--color-primario)`; texto a su
derecha, `0.82rem`, con enlace a `privacidad.html` en primario y subrayado.

## 7. Estados de los elementos

| Estado | Regla visual |
|---|---|
| Normal | Borde `--color-borde-fuerte`, fondo superficie |
| Foco | `outline: 3px solid var(--color-acento); outline-offset: 3px` (igual que la galería) |
| Activo / seleccionado | Borde primario y fondo `rgba(178,58,47,.05)` |
| Error | Borde `--color-error`, fondo `rgba(178,58,47,.04)`, mensaje `0.8rem` en primario con `role="alert"` |
| Deshabilitado | `opacity:.55`, `cursor:not-allowed`, sin hover |
| Cargando | Botón con texto "Enviando…" y `disabled` |
| Éxito | Aviso con borde izquierdo `4px` de `--color-exito` y fondo claro |

El foco **nunca** se elimina con `outline: none` sin reemplazo.

## 8. Adaptación a tamaños de pantalla

| Rango | Comportamiento |
|---|---|
| `< 600px` | Una columna. Formulario a ancho completo, cabecera compacta, icono de usuario dentro de la cabecera. Sin panel lateral fotográfico. |
| `600–800px` | Formulario centrado con `26rem` de ancho; galería a 2 columnas. |
| `> 800px` | Galería con sidebar. Formulario en layout **split**: panel de imagen a la izquierda (foto de Murcia con velo terracota) y tarjeta a la derecha. Icono de usuario arriba a la derecha. |
| `>= 1024px` / `>= 1280px` | Solo afecta al número de columnas de la galería (3 y 4). |

El panel con imagen se oculta en móvil para no recargar la vista ni distraer.

## 9. Iconos y elementos gráficos

- SVG locales en `assets/icons/`, `24×24`, `fill="none"`, `stroke="currentColor"`,
  `stroke-width="1.8"`, puntas redondas. Tamaño en pantalla: 20 px.
- Iconos nuevos: `user`, `mail`, `lock`, `eye`, `eye-off`, `calendar`, `pin`, `phone`.
- Todos los iconos son decorativos: `alt=""` o `aria-hidden="true"`.
- El icono del ojo cambia con la clase `.is-visible` del botón (nunca con estilo inline).
- Favicon corporativo reutilizado: `assets/icons/favicon.svg`.

## 10. Uso de este archivo con IA

Cualquier prompt que pida cambio visual debe incluir: *"Sigue `design.md`; no
introduzcas colores, fuentes ni radios nuevos; si hace falta un token, añádelo
como EXTENSIÓN y documenta por qué"*. Tras cada cambio, revisar que `auth.css`
siga leyendo las variables de `styles.css`.

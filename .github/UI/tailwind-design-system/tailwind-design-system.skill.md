---
name: tailwind-design-system
description: Build and maintain a scalable design system with Tailwind CSS v3 in this Angular project, aligned with PrimeNG Aura and project color/typography constants.
---

# Tailwind Design System (v3)

Este proyecto usa **Tailwind CSS v3** con Angular + PrimeNG (`Aura`) mediante `tailwindcss-primeui`.

## When to Use This Skill

Usa esta skill cuando necesites:

- Construir layouts consistentes (header/sidebar/content, dashboards, cards, formularios).
- Definir patrones reutilizables de spacing, jerarquía visual y estados.
- Resolver dudas de estilo entre Tailwind utility classes y componentes PrimeNG.
- Revisar calidad visual (responsive, foco, contraste, dark mode) antes de merge.

## Project Context (Source of Truth)

- Tailwind: **v3** (`tailwind.config.ts`)
- Integración UI: `tailwindcss-primeui` (oficial)
- Theme global UI: PrimeNG `Aura` (`src/app/app.config.ts`)
- Dark mode: clase `.dark` en `documentElement` (gestionada por `ThemeService`)
- Tipografía central: `src/app/core/constants/typography.constants.ts`
- Colores programáticos (solo casos específicos por ahora): `src/app/core/constants/colors.constants.ts` vía `ThemeColorsService` (charts/TS)

## Architecture Mental Model

```text
PrimeNG Aura (theme tokens --p-*)
	+
Tailwind v3 utilities (+ tailwindcss-primeui)
	+
Component-level minimal overrides (solo cuando hace falta)
```

Regla práctica:

1. Primero usa PrimeNG + Aura tal cual.
2. Después aplica utilidades Tailwind para layout/spacing/composición.
3. Solo al final añade override puntual si hay gap real de negocio/diseño.

## Core Principles

1. **Consistency first**: reutiliza patrones antes de inventar nuevas clases.
2. **Utility over custom CSS**: usa Tailwind para estructura y ritmo visual.
3. **Theme-driven UI**: evita pelear contra Aura con overrides masivos.
4. **Accessibility default**: foco visible, contraste y semántica correctos.
5. **Minimal change surface**: cambios acotados por feature, sin side effects.

## Layout Patterns

### Shell base

- Usa contenedores con `min-h-screen`, `flex`, `grid`, `gap-*`, `p-*`.
- Define jerarquía clara por zonas: navegación, contexto, contenido.
- En desktop prioriza estabilidad visual; en mobile prioriza legibilidad y toque.

Ejemplo de estructura:

```html
<div class="min-h-screen flex flex-col">
  <header class="sticky top-0 z-50"></header>
  <div class="flex flex-1 min-h-0">
    <aside class="hidden lg:block w-64"></aside>
    <main class="flex-1 min-w-0 p-4 md:p-6"></main>
  </div>
</div>
```

### Spacing rhythm

- Usa escala consistente (`gap-2/3/4/6`, `p-3/4/6`, `mb-2/4/6`).
- Evita mezclar muchos valores arbitrarios (`[13px]`, `[27px]`) sin motivo.

### Responsive

- Mobile first: base sin prefijo + `sm/md/lg/xl` para ampliar.
- Evita romper layout con anchos fijos cuando `min-w-0` resuelve truncado/overflow.

## Typography & Visual Hierarchy

- La familia tipográfica sale de `typography.constants.ts` a través de `font-sans`.
- Patrón sugerido:
  - Título sección: `text-xl md:text-2xl font-semibold`
  - Subtítulo: `text-sm md:text-base opacity-80`
  - Meta/auxiliar: `text-xs opacity-70`

No hardcodear `font-family` en componentes.

## Color & Theming Rules

### Global UI

- El color de texto base hereda desde `body { color: var(--p-text-color) }`.
- Evita `text-surface-*` en texto general; usa opacidad para jerarquía.
- Usa tokens del theme/Aura y utilidades alineadas por `tailwindcss-primeui`.

### Programmatic colors (important)

- `colors.constants.ts` **no** es la fuente global de theming UI.
- Se usa **por ahora** solo para casos específicos programáticos (charts/TS) vía `ThemeColorsService`.

### Icon colors

- Sí usar color explícito en iconos con intención semántica (`success`, `warning`, etc.).

## PrimeNG + Tailwind Collaboration

### Recommended flow for any new UI piece

1. Implementa con componente PrimeNG estándar.
2. Aplica utilidades Tailwind para layout/spacing/container.
3. Valida light/dark + responsive + foco.
4. Si hay gap real, añade override mínimo (local y documentado).

### Avoid

- Sistemas paralelos de theming.
- Override global agresivo para corregir un caso puntual.
- Hardcodes de color por componente sin razón funcional.

## State & Interaction Styling (Angular)

### Conditional classes

- Usa bindings de clase (`[class.xxx]`) en lugar de `ngClass`.

```html
<button
  class="px-3 py-2 rounded-md transition-colors"
  [class.opacity-60]="disabled()"
  [class.pointer-events-none]="disabled()"
>
  Acción
</button>
```

### Focus visible

- Todo control interactivo custom debe mostrar foco claro con teclado.

```html
<button class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
  Open
</button>
```

## Accessibility Checklist (WCAG AA)

- [ ] Contraste suficiente texto/fondo en light y dark.
- [ ] Foco visible en botones, links, inputs y elementos custom.
- [ ] `aria-*` traducible (sin hardcodes) cuando aplique.
- [ ] Objetivos táctiles razonables en mobile.
- [ ] No depender solo del color para comunicar estado.

## Performance & Maintainability

- Prefiere utilidades composables sobre CSS largo específico.
- Evita reglas globales que impacten todo el árbol DOM sin necesidad.
- Mantén transiciones en propiedades concretas (`color`, `background-color`, `border-color`).

## Common Pitfalls

1. **Forzar colores de texto** en todos los nodos → rompe herencia y dark mode.
2. **Sobre-escribir PrimeNG de forma global** para resolver un único componente.
3. **Usar clases arbitrarias en exceso** y perder consistencia visual.
4. **Olvidar `min-w-0`** en layouts flex y romper truncado/overflow.
5. **Confundir `colors.constants.ts` con theming global** (no aplica por ahora).

## Quick Recipes

### Card container

```html
<section
  class="rounded-xl border border-surface-200/70 p-4 md:p-6 bg-surface-0/80 backdrop-blur-sm"
>
  <h2 class="text-lg font-semibold">Resumen</h2>
  <p class="opacity-80 mt-1">Descripción breve</p>
</section>
```

### Responsive two-column block

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
  <article class="rounded-lg p-4 border border-surface-200/70"></article>
  <article class="rounded-lg p-4 border border-surface-200/70"></article>
</div>
```

## Tailwind v3 Docs (Reference Map)

> Importante: para esta skill toma como referencia **Tailwind v3**.

### Base y configuración

- Tailwind v3 docs home: https://v3.tailwindcss.com/docs
- Installation (v3): https://v3.tailwindcss.com/docs/installation
- Configuration (tailwind.config): https://v3.tailwindcss.com/docs/configuration
- Content config: https://v3.tailwindcss.com/docs/content-configuration
- Dark mode: https://v3.tailwindcss.com/docs/dark-mode
- Theme extension: https://v3.tailwindcss.com/docs/theme

### Layout y spacing

- Display: https://v3.tailwindcss.com/docs/display
- Flexbox: https://v3.tailwindcss.com/docs/flex
- Grid: https://v3.tailwindcss.com/docs/grid-template-columns
- Gap: https://v3.tailwindcss.com/docs/gap
- Width/Height: https://v3.tailwindcss.com/docs/width
- Max width: https://v3.tailwindcss.com/docs/max-width
- Spacing (padding/margin): https://v3.tailwindcss.com/docs/padding

### Tipografía y color

- Font family: https://v3.tailwindcss.com/docs/font-family
- Font size: https://v3.tailwindcss.com/docs/font-size
- Font weight: https://v3.tailwindcss.com/docs/font-weight
- Text color: https://v3.tailwindcss.com/docs/text-color
- Opacity: https://v3.tailwindcss.com/docs/opacity
- Background color: https://v3.tailwindcss.com/docs/background-color
- Border color: https://v3.tailwindcss.com/docs/border-color

### Interacción y accesibilidad

- Hover/focus states: https://v3.tailwindcss.com/docs/hover-focus-and-other-states
- Ring/focus ring: https://v3.tailwindcss.com/docs/ring-width
- Transition: https://v3.tailwindcss.com/docs/transition-property
- Screen readers: https://v3.tailwindcss.com/docs/screen-readers

### Responsive y variantes

- Breakpoints: https://v3.tailwindcss.com/docs/responsive-design
- Pseudo-class variants: https://v3.tailwindcss.com/docs/hover-focus-and-other-states
- Arbitrary values: https://v3.tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values

### Ecosistema del proyecto

- PrimeNG: https://primeng.org
- tailwindcss-primeui (plugin): https://www.npmjs.com/package/tailwindcss-primeui

## Usage Examples (Angular + Tailwind v3)

### 1) Page container with max width

```html
<main class="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
  <section class="space-y-4 md:space-y-6">
    <h1 class="text-xl md:text-2xl font-semibold">Dashboard</h1>
    <p class="opacity-80">Resumen operativo del día</p>
  </section>
</main>
```

### 2) KPI cards grid

```html
<section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
  <article class="rounded-xl border border-surface-200/70 p-4">
    <p class="text-sm opacity-80">Ventas</p>
    <p class="text-2xl font-semibold mt-1">€124k</p>
  </article>
  <article class="rounded-xl border border-surface-200/70 p-4"></article>
  <article class="rounded-xl border border-surface-200/70 p-4"></article>
  <article class="rounded-xl border border-surface-200/70 p-4"></article>
</section>
```

### 3) Sticky header + scrollable content

```html
<div class="min-h-screen flex flex-col">
  <header class="sticky top-0 z-40 border-b border-surface-200/70 bg-surface-0/90 backdrop-blur-sm">
    <div class="px-4 md:px-6 py-3">Header</div>
  </header>
  <div class="flex-1 min-h-0 overflow-y-auto p-4 md:p-6">Contenido</div>
</div>
```

### 4) Form row with responsive layout

```html
<form class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="space-y-2">
    <label class="text-sm font-medium">Nombre</label>
    <input
      class="w-full rounded-md border border-surface-300 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    />
  </div>
  <div class="space-y-2">
    <label class="text-sm font-medium">Email</label>
    <input class="w-full rounded-md border border-surface-300 px-3 py-2" />
  </div>
</form>
```

### 5) Action bar with wrap

```html
<div class="flex flex-wrap items-center gap-2 md:gap-3">
  <button
    class="px-3 py-2 rounded-md border border-surface-300 hover:bg-surface-50 transition-colors"
  >
    Cancelar
  </button>
  <button
    class="px-3 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors"
  >
    Guardar
  </button>
</div>
```

### 6) Angular conditional classes (sin ngClass)

```html
<button
  class="px-3 py-2 rounded-md transition-colors"
  [class.bg-primary-500]="isActive()"
  [class.text-white]="isActive()"
  [class.border]="!isActive()"
  [class.border-surface-300]="!isActive()"
>
  Estado
</button>
```

### 7) Empty state pattern

```html
<section class="rounded-xl border border-dashed border-surface-300 p-8 text-center">
  <h2 class="text-lg font-semibold">Sin resultados</h2>
  <p class="opacity-80 mt-1">Ajusta filtros y vuelve a intentar.</p>
  <button class="mt-4 px-3 py-2 rounded-md border border-surface-300">Limpiar filtros</button>
</section>
```

### 8) Table wrapper with safe overflow

```html
<div class="rounded-xl border border-surface-200/70 overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full min-w-[640px]">
      <thead class="bg-surface-50">
        <tr>
          <th class="text-left px-4 py-3 text-sm font-semibold">Nombre</th>
          <th class="text-left px-4 py-3 text-sm font-semibold">Estado</th>
        </tr>
      </thead>
    </table>
  </div>
</div>
```

### 9) Sidebar item pattern

```html
<a
  class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
  [class.bg-surface-100]="isCurrent()"
  [class.font-medium]="isCurrent()"
  href="#"
>
  <span class="size-5"></span>
  <span class="truncate">Analytics</span>
</a>
```

### 10) Dark-mode-safe text hierarchy

```html
<article class="p-4 rounded-lg border border-surface-200/70">
  <h3 class="font-semibold">Título</h3>
  <p class="opacity-80 mt-1">Texto secundario</p>
  <p class="opacity-70 mt-2 text-sm">Texto terciario</p>
</article>
```

### 11) Glass-style container (compatible with current theme)

```html
<section
  class="rounded-xl border border-surface-200/60 bg-surface-0/80 dark:bg-surface-900/50 backdrop-blur-md p-4 md:p-6"
>
  <h2 class="text-lg font-semibold">Contexto</h2>
  <p class="opacity-80">Selecciona compañía y proyecto</p>
</section>
```

### 12) Focus ring for icon-only button

```html
<button
  [attr.aria-label]="'layout.header.actions.chat' | translate"
  class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
>
  <lucide-icon [img]="MessageSquare" [size]="18" />
</button>
```

## Example Validation Checklist

- [ ] Se ve correcto en `sm`, `md`, `lg`.
- [ ] No usa `ngClass` / `ngStyle`.
- [ ] Respeta herencia de color en texto.
- [ ] Tiene `focus-visible` en elementos interactivos custom.
- [ ] Funciona en dark mode sin hardcodes conflictivos.

## PR Review Checklist

- [ ] ¿Usa componentes PrimeNG primero y overrides mínimos?
- [ ] ¿Mantiene consistencia de spacing/typography?
- [ ] ¿Evita hardcodes de color/tema innecesarios?
- [ ] ¿Se valida en light/dark y en breakpoints clave?
- [ ] ¿Respeta accesibilidad (focus + contraste + aria)?

## Internal References

- `tailwind.config.ts`
- `src/app/app.config.ts`
- `src/styles.css`
- `src/app/core/constants/typography.constants.ts`
- `src/app/core/constants/colors.constants.ts`
- `src/app/core/services/theme-colors.service.ts`
- `.github/UI/tailwind-primeng-integration.skill.md`
- `.github/UI/primeng-theming-guide.md`
- `.github/UI/echarts-theme-colors.skill.md`

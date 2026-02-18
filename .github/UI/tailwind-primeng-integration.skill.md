# Tailwind CSS + PrimeNG Integration Skill

## Overview

This project uses the official integration path:

- PrimeNG with official `Aura` preset
- Tailwind CSS with `tailwindcss-primeui`
- `colors.constants.ts` only for programmatic colors in specific TS/charts cases for now (via `ThemeColorsService`)

Use this skill when you need to style UI with Tailwind while keeping PrimeNG behavior consistent in light/dark mode.

## Current Architecture

```text
ThemeService (.dark class on <html>)
  ↓
PrimeNG Aura (theme tokens --p-*)
  ↓
Tailwind utilities + tailwindcss-primeui
  ↓
Component UI (PrimeNG + custom wrappers)

colors.constants.ts
  └─ ThemeColorsService (only charts/TS specific use cases for now)

app.config.ts
  └─ providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.dark' } } })
```

## Why This Integration Works

- PrimeNG provides semantic theme tokens (`--p-*`) for components.
- `tailwindcss-primeui` aligns Tailwind utilities with Prime tokens.
- Tailwind handles layout/composition quickly without replacing PrimeNG theming.
- Dark mode is deterministic (`.dark` class), no duplicated theme engines.

## Rules

1. Edit color values in `colors.constants.ts` only when needed for specific charts/TS cases
2. Rebuild app (`pnpm start` / `pnpm build`)
3. Prefer official PrimeNG theming behavior before adding overrides
4. Keep overrides minimal and justified

## PrimeNG Configuration (Reference)

```typescript
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

providePrimeNG({
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
    },
  },
  ripple: false,
});
```

## Tailwind Configuration (Reference)

```typescript
import type { Config } from 'tailwindcss';
import PrimeUI from 'tailwindcss-primeui';

export default {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  plugins: [PrimeUI],
} satisfies Config;
```

## Styling Strategy

### 1) PrimeNG first

- Use PrimeNG component with Aura defaults.
- Validate visual result in light and dark.

### 2) Tailwind for composition

- Use Tailwind for spacing, layout, responsive behavior and wrappers.
- Avoid replacing Prime internal styles unless necessary.

### 3) Minimal overrides

- Add local override only for real design/business gap.
- Document reason and scope.

## Usage Patterns

### Text colors: use inheritance

```html
<!-- ✅ CORRECT -->
<p>Texto principal</p>
<p class="opacity-80">Texto secundario</p>

<!-- ❌ AVOID -->
<p class="text-surface-900 dark:text-surface-100">Texto</p>
```

### PrimeNG inside Tailwind containers

```html
<section class="rounded-xl border border-surface-200/70 p-4 md:p-6">
  <div class="flex items-center justify-between gap-3">
    <h2 class="text-lg font-semibold">Filtros</h2>
    <p-button label="Aplicar" severity="primary" />
  </div>
</section>
```

### Responsive layout with PrimeNG blocks

```html
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
  <p-card class="lg:col-span-2"></p-card>
  <p-card></p-card>
</div>
```

### Accessible icon button pattern

```html
<button
  [attr.aria-label]="'layout.header.actions.chat' | translate"
  class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
>
  <lucide-icon [img]="MessageSquare" [size]="18" />
</button>
```

## Working with Colors

### Global UI colors

- Driven by PrimeNG Aura tokens + Tailwind utilities.
- Do not assume `colors.constants.ts` controls full UI theming.

### Programmatic colors (charts/TS)

- Use `ThemeColorsService`.
- `colors.constants.ts` is currently scoped to those programmatic use cases.

## When a New PrimeNG Component is Added

1. Add component with default Aura styles.
2. Validate light/dark + responsive + focus.
3. If visual gap exists, add minimal local override.
4. Keep override near component and document intent.

## Troubleshooting

### Issue: text is hard to read in dark mode

Cause:

- Explicit text classes are overriding inheritance.

Fix:

- Remove forced text color classes and use inherited text + opacity hierarchy.

### Issue: component looks different than expected

Cause:

- Custom override is fighting Aura defaults.

Fix:

- Remove broad override, keep only targeted selectors.

### Issue: styles seem stale after config changes

Cause:

- Dev server needs rebuild or cache refresh.

Fix:

- Restart `pnpm start` and verify final compiled CSS in browser devtools.

### Issue: flicker on theme toggle

Cause:

- Transitions applied while toggling `.dark`.

Fix:

- Keep `.theme-transitioning` strategy from `ThemeService`/`styles.css`.

## Debugging Checklist

```javascript
// 1) Verify dark class
document.documentElement.classList.contains('dark');

// 2) Verify token values
getComputedStyle(document.documentElement).getPropertyValue('--p-text-color');

// 3) Verify body colors are token-driven
getComputedStyle(document.body).getPropertyValue('color');
```

## Do / Don’t

### Do

- Use official PrimeNG + Tailwind integration.
- Keep Tailwind for layout/composition and Aura for component theming.
- Validate accessibility and dark mode in every UI PR.
- Use `ThemeColorsService` for chart/TS programmatic colors.

### Don’t

- Reintroduce custom plugins to generate large token sets.
- Build parallel theming systems.
- Hardcode many colors in templates.
- Add global overrides to solve one local issue.

## Official Docs

- Tailwind v3 docs: https://v3.tailwindcss.com/docs
- Tailwind dark mode: https://v3.tailwindcss.com/docs/dark-mode
- PrimeNG docs: https://primeng.org
- PrimeNG theming: https://primeng.org/theming
- tailwindcss-primeui: https://www.npmjs.com/package/tailwindcss-primeui

## Internal References

- `tailwind.config.ts`
- `src/app/app.config.ts`
- `src/styles.css`
- `src/app/core/services/theme.service.ts`
- `src/app/core/constants/colors.constants.ts`
- `src/app/core/services/theme-colors.service.ts`
- `.github/UI/primeng-theming-guide.md`
- `.github/UI/echarts-theme-colors.skill.md`

## When a new PrimeNG component is added

1. Use it with default Aura theme first
2. Verify light/dark behavior
3. If needed, add a focused override in component/global styles
4. Document the override reason and scope

## Do / Don't

### Do

- Use official PrimeNG + Tailwind integration
- Keep color values centralized
- Keep accessibility and contrast checks

### Don't

- Reintroduce custom plugins to generate large token sets
- Hardcode many colors in templates
- Duplicate theme logic across multiple files

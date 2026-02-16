# Project Instructions

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Project Stack (Current Versions)

- **Angular**: 21.1.0 (Standalone components, Signals API)
- **TypeScript**: Latest (strict mode)
- **Tailwind CSS**: 3.x (Custom plugin system)
- **PrimeNG**: 21.1.1 (Aura theme preset)
- **Lucide Angular**: 0.563.0 (User-facing icons)
- **PrimeIcons**: 7.0.0 (PrimeNG internal components)
- **ECharts**: 6.x (Data visualization)
- **ngx-translate**: 17.x (i18n support)
- **pnpm**: 9.15.0 (Package manager)

## Skill Creation Workflow

- When asked to create or update a new skill, use the project skill creator at `.github/skill-creator/skill-creator/skill-creator.skill.md`.
- Follow that skill's structure, metadata format, and examples to keep consistency across all skills in `.github/`.

## Color System & Theming

### Single Source of Truth: colors.constants.ts

**CRITICAL:** All color values are defined in `src/app/core/constants/colors.constants.ts`. This file is imported by:

1. **tailwind.config.ts** - For CSS class generation (bg-_, text-_, border-\*, etc.)
2. **tailwind-css-variables.mjs** - Tailwind plugin that auto-generates CSS variables (--p-\*)
3. **theme-colors.service.ts** - For programmatic access in TypeScript/ECharts

**Color Palette (Konecta)** from `colors.constants.ts`:

```typescript
primary: { 500: '#2A01CD' }      // Konecta Blue
surface: { 0: '#ffffff', 50: '#F2F3F7', 900: '#262626', 950: '#0F0F0F' }
success: { 500: '#0E9F6E' }      // Green
danger: { 500: '#F05252' }       // Red
warning: { 500: '#F0FA00' }      // Yellow
info: { 500: '#3b82f6' }         // Blue
```

### Automated Workflow

**To edit colors:**

1. Edit `src/app/core/constants/colors.constants.ts` (single file)
2. Rebuild app: `pnpm start` or `pnpm build`
3. All files automatically updated:
   - ✅ Tailwind CSS classes (bg-primary-500, text-surface-900, etc.)
   - ✅ CSS Variables (--p-primary-500, --p-text-color, etc.) via plugin
   - ✅ ThemeColorsService reactive signals

**How it works:**
The Tailwind plugin (`tailwind-css-variables.mjs`) uses `theme('colors')` to access
colors (Tailwind processes the TypeScript config correctly) and generates CSS variables
during build time. No manual scripts needed!

### CSS Variables System

**Generated during build by Tailwind plugin**

The plugin (`tailwind-css-variables.mjs`) reads `colors.constants.ts` and generates
CSS variables automatically during Tailwind compilation.

**Generated CSS structure:**

```css
/* Variables for light mode */
:root {
  --p-primary-500: #2a01cd;
  --p-surface-0: #ffffff;
  --p-text-color: #262626;
  /* ... all component-specific variables */
}

/* Variables for dark mode */
:root.dark {
  --p-surface-0: #0f0f0f;
  --p-text-color: #f2f3f7;
  /* ... all component-specific variables */
}
```

**DO NOT**:

- Hardcode color values anywhere
- Define colors in multiple places

**DO**:

- Edit color VALUES only in colors.constants.ts
- Rebuild app after editing colors
- Use ThemeColorsService for programmatic access

### Theme Toggle

- Managed by `ThemeService` (signals-based)
- Applies `.dark` class on `documentElement`
- Uses `.theme-transitioning` class to prevent flickering during toggle
- Persists preference to `localStorage`
- Supports `prefers-color-scheme` detection

### Theme Colors Service

**For ECharts and components that need programmatic color access:**

- Use `ThemeColorsService` instead of hardcoding hex values
- Provides reactive signals that auto-update with theme changes
- Example: `this.colors.textColor()`, `this.colors.primaryColor`
- All values come from colors.constants.ts (single source of truth)
- See `.github/UI/echarts-theme-colors.skill.md` for full documentation

## Icon System (Dual Strategy)

### Lucide Icons (User-facing)

- Use for custom UI elements, feature illustrations
- Import: `import { IconName } from 'lucide-angular'`
- Usage: `<lucide-icon [img]="IconName" [size]="24" />`
- Keep colorful semantic colors: `class="text-primary-500 dark:text-primary-300"`

### PrimeIcons (PrimeNG internal)

- Required for PrimeNG component internals (dropdowns, sorting, toggles)
- Auto-loaded by PrimeNG components
- DO NOT use for custom UI

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components (<30 lines)
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- DO NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Text Color Inheritance

**DO NOT** add explicit text color classes (`text-surface-900`, `dark:text-surface-100`) to elements.

- Let text inherit color from `body { color: var(--p-text-color) }`
- Use `opacity-80`, `opacity-70` for secondary/muted text
- Only icons should have explicit color classes for semantic meaning

## PrimeNG Configuration

- Import from `primeng/config` with `providePrimeNG()`
- Theme preset: `Aura` from `@primeuix/themes/aura`
- Dark mode selector: `.dark` (class-based on `:root`)
- Ripple effect: disabled (`ripple: false`)
- Components use CSS variables (`--p-*`) generated by Tailwind plugin
- All component variables (button, card, input, tree, etc.) auto-generated
- See `.github/UI/primeng-theming-guide.md` for adding new components

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Internationalization (i18n)

- Use `ngx-translate` for text translations
- Translation files: `src/assets/i18n/{lang}/common.json`
- Default language: Spanish (`es`)
- Access translations: `{{ 'key.path' | translate }}`
- Language switcher managed by service
- All user-visible text must be translatable: labels, headings, button text, helper text, empty states, messages, and any text rendered by PrimeNG or custom components must come from i18n keys
- Do not hardcode visible UI strings in templates/components; use `translate` pipe or resolved translated values in component code
- Accessibility text must also be translated: `aria-label`, `aria-describedby`, `title`, `alt` must use i18n keys from `common.json`
- Do not hardcode accessibility strings in templates; use `translate` pipe or resolved translated values in component code

## Performance Optimization

- The plugin system generates CSS variables at build time (eliminates runtime overhead)
- Use `OnPush` change detection strategy
- Lazy load feature modules with dynamic imports
- Avoid universal selectors with transitions (causes flickering)
- Apply transitions only to specific properties on specific elements

## Build & Development

- Dev server: `pnpm start` (uses `ng serve`)
- Production build: `pnpm build`
- Package manager: pnpm 9.15.0 (configured via `.bashrc` function in Git Bash)

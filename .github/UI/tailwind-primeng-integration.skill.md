# Tailwind CSS + PrimeNG Integration Skill

## Overview

This project uses a custom Tailwind CSS plugin that automatically generates CSS variables for PrimeNG v21 components at build time. The plugin reads color definitions from TypeScript constants and generates component-specific variables for seamless light/dark theming.

## Architecture

```
colors.constants.ts (Single source of truth - TS values)
    ↓ imported by
    ├── tailwind.config.ts (exposes via theme('colors'))
    │       ↓ used by
    │       tailwind-css-variables.mjs (Tailwind plugin)
    │           ↓ generates at build time
    │           CSS Variables (--p-*) for :root and :root.dark
    │               ↓ consumed by
    │               PrimeNG Aura theme components
    │
    └── theme-colors.service.ts (TypeScript/ECharts reactive signals)
```

**Current Status:**

- ✅ Configured: Button, Card, InputText, Tree
- ⚠️ Pending: 111 components (see `.github/UI/PRIMENG-COMPONENTS-STATUS.md`)

## Critical Learnings

**Why Tailwind Plugin with Auto-Generated CSS Variables?**

- PrimeNG Aura theme expects specific CSS variable names (`--p-card-background`, `--p-button-primary-color`, etc.)
- Plugin runs during Tailwind build process and generates all needed variables automatically
- Uses `theme('colors')` to access color definitions (Tailwind processes TypeScript internally)
- Ensures consistency between TS constants and CSS without manual duplication
- Complete dark mode support for all configured components
- Single source of truth: edit once in colors.constants.ts, rebuild, and all updates automatically
- No generated files to commit (variables created in memory during build)

## Color System

### Step 1: Define Color Values (colors.constants.ts)

**This is the ONLY place to edit color VALUES.**

```typescript
// src/app/core/constants/colors.constants.ts
export const COLORS = {
  primary: {
    50: '#f0f0ff',
    500: '#2A01CD', // Konecta Blue
    900: '#0F0F72', // Konecta Dark Blue
    // ... full scale 50-950
  },
  surface: {
    0: '#ffffff', // Konecta White
    50: '#F2F3F7', // Konecta Light
    900: '#262626', // Konecta Dark
    950: '#0F0F0F', // Konecta Black
    // ... full scale 0-950
  },
  success: { 500: '#0E9F6E' },
  danger: { 500: '#F05252' },
  warning: { 500: '#F0FA00' },
  info: { 500: '#3b82f6' },
} as const;
```

### Step 2: Import in Tailwind Config (tailwind.config.ts)

### Step 2: Import in Tailwind Config (tailwind.config.ts)

**Imports color objects from constants for automatic Tailwind class generation.**

```typescript
// tailwind.config.ts
import { COLORS } from './src/app/core/constants/colors.constants';

export default {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class', // CRITICAL: Use 'class', NOT ['class', 'dark']
  theme: {
    extend: {
      colors: {
        // Import complete color objects
        primary: COLORS.primary,
        surface: COLORS.surface,
        success: COLORS.success,
        danger: COLORS.danger,
        warning: COLORS.warning,
        info: COLORS.info,
      },
    },
  },
  plugins: [],
};
```

### Step 3: Plugin Generates CSS Variables Automatically

⚠️ **CSS variables are generated during build** - No file to edit manually

**Plugin location:** `tailwind-css-variables.mjs` (root of project)

**To regenerate after editing colors:**

```bash
pnpm start   # Development build with watch mode
pnpm build   # Production build
```

The plugin automatically generates PrimeNG CSS variables during the Tailwind build process:

**Light Mode (`:root`)**

```css
:root {
  /* Primary colors */
  --p-primary-50: #f0f0ff;
  --p-primary-500: #2a01cd;
  --p-primary-contrast: #ffffff;

  /* Surface colors */
  --p-surface-0: #ffffff;
  --p-surface-50: #f2f3f7;
  --p-surface-900: #262626;
  --p-surface-950: #0f0f0f;

  /* Text colors */
  --p-text-color: #262626;
  --p-text-hover-color: #0f0f0f;
  --p-text-muted-color: #757575;

  /* Component-specific */
  --p-card-background: #ffffff;
  --p-card-border-color: #e0e0e0;
  --p-card-color: #262626;

  --p-button-primary-background: #2a01cd;
  --p-button-primary-color: #ffffff;
  --p-button-primary-hover-background: #2400ad;

  /* ... all other component variables for 4 configured components */
}

/* === DARK MODE === */
:root.dark {
  /* Primary colors - lighter for contrast */
  --p-primary-500: #a6b7ff; /* Uses konecta.blue2 */
  --p-primary-contrast: #0f0f0f;

  /* Surface colors - inverted */
  --p-surface-0: #0f0f0f;
  --p-surface-50: #262626;
  --p-surface-900: #f2f3f7;
  --p-surface-950: #ffffff;

  /* Text colors - light for readability */
  --p-text-color: #f2f3f7;
  --p-text-hover-color: #ffffff;
  --p-text-muted-color: #bdbdbd;

  /* Component-specific */
  --p-card-background: #262626;
  --p-card-border-color: #424242;
  --p-card-color: #f2f3f7;

  --p-button-primary-background: #a6b7ff;
  --p-button-primary-color: #0f0f0f;
  --p-button-primary-hover-background: #b8c5ff;

  /* ... all other component variables */
}
```

**CRITICAL Variables Needed:**

- `--p-card-*` (background, border-color, color, shadow)
- `--p-button-primary-*` (background, color, hover states)
- `--p-button-secondary-*` (background, color, border)
- `--p-inputtext-*` (background, border, color, focus)
- Any other PrimeNG component you use

## Theme Management

### ThemeService

```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDarkMode = signal(false);

  toggleTheme(): void {
    this.isDarkMode.update((v) => !v);
  }

  private applyTheme(isDark: boolean): void {
    const html = document.documentElement;
    html.classList.add('theme-transitioning');
    html.classList.toggle('dark', isDark);
    html.style.colorScheme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    void html.offsetHeight; // Force reflow
    setTimeout(() => html.classList.remove('theme-transitioning'), 50);
  }
}
```

### Preventing Flickering

```css
/* styles.css */
.theme-transitioning,
.theme-transitioning * {
  transition: none !important;
}

body {
  background-color: var(--p-surface-0);
  color: var(--p-text-color);
  transition:
    background-color 200ms ease-in-out,
    color 200ms ease-in-out;
}
```

## PrimeNG Configuration

### app.config.ts

```typescript
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        },
      },
      ripple: false,
    }),
    // ... other providers
  ],
};
```

### Theme Files Structure

**src/styles/primeng-theme.css** (CSS Variables Definition)

```css
/* Import PrimeIcons */
@import 'primeicons/primeicons.css';

/* Light mode variables */
:root {
  --p-primary-500: #2a01cd;
  --p-surface-0: #ffffff;
  --p-text-color: #262626;
  --p-card-background: #ffffff;
  --p-button-primary-background: #2a01cd;
  /* ... all component variables */
}

/* Dark mode variables */
:root.dark {
  --p-primary-500: #a6b7ff;
  --p-surface-0: #0f0f0f;
  --p-text-color: #f2f3f7;
  --p-card-background: #262626;
  --p-button-primary-background: #a6b7ff;
  /* ... all component variables */
}
```

**src/styles.css** (Main stylesheet)

```css
/* Import PrimeNG theme first */
@import './styles/primeng-theme.css';

/* Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: light;
  }
  :root.dark {
    color-scheme: dark;
  }

  /* Prevent flickering during theme toggle */
  .theme-transitioning,
  .theme-transitioning * {
    transition: none !important;
  }

  body {
    background-color: var(--p-surface-0);
    color: var(--p-text-color);
    transition:
      background-color 200ms ease-in-out,
      color 200ms ease-in-out;
  }

  /* Ensure text inherits color */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  div,
  li {
    color: inherit;
  }

  /* Smooth transitions for PrimeNG components */
  .p-card,
  .p-button {
    transition:
      background-color 200ms ease-in-out,
      border-color 200ms ease-in-out,
      color 200ms ease-in-out;
  }
}
```

## Usage Patterns

### Text Colors - Use Inheritance

**DO NOT** use explicit text color classes:

```html
<!-- ❌ WRONG -->
<p class="text-surface-900 dark:text-surface-100">Text</p>

<!-- ✅ CORRECT -->
<p>Text</p>
<p class="opacity-80">Secondary text</p>
```

### PrimeNG Components

PrimeNG components automatically use CSS variables:

```html
<p-button label="Click me" severity="primary" />
<!-- Uses --p-primary-500 automatically -->

<p-card>
  <p>Content inherits text color</p>
</p-card>
```

### Tailwind Utilities

Use Tailwind classes with the Konecta palette:

```html
<div class="bg-primary-500 text-white">
  <!-- Tailwind classes -->
</div>

<button class="bg-success-500 hover:bg-success-600">Save</button>
```

## Modifying Colors

### To Change a Color Value

**CRITICAL: Use this automated process**

**1. Edit value in `src/app/core/constants/colors.constants.ts`:**

```typescript
export const COLORS = {
  primary: {
    500: '#NEW_COLOR', // Step 1: Change value here ONLY
  },
  // ...
} as const;
```

**2. Rebuild the application:**

```bash
pnpm start   # Development with watch mode
# or
pnpm build   # Production build
```

The Tailwind plugin automatically generates CSS variables during build.

Everything updates automatically:

- ✅ Tailwind CSS classes (bg-primary-500, etc.)
- ✅ ThemeColorsService reactive signals
- ✅ PrimeNG component CSS variables (--p-primary-500, etc.)

### Adding a New Color Scale

### Adding a New Color Scale

**1. Add to colors.constants.ts:**

```typescript
export const COLORS = {
  // Existing colors...
  accent: {
    50: '#...',
    500: '#...',
    900: '#...',
  },
} as const;
```

**2. Import in tailwind.config.ts:**

```typescript
colors: {
  // Existing imports...
  accent: COLORS.accent,
}
```

**3. Rebuild:**

````bash
pnpm start  # Plugin generates variables automatically

## Common Issues & Solutions

### Issue: Dark mode colors not working

**Cause:** Missing CSS variables for dark mode in plugin

**Solution:** Add `:root.dark` variables in `tailwind-css-variables.mjs` for the components you're using (see `primeng-theming-guide.md`)

### Issue: Text invisible in dark mode

**Cause:** Explicit `text-surface-*` classes override inheritance

**Solution:** Remove explicit text color classes, let text inherit from `body`

### Issue: Cards have wrong background in dark mode

**Cause:** Missing `--p-card-background` variable for dark mode

**Solution:**
```css
:root.dark {
  --p-card-background: #262626;
  --p-card-border-color: #424242;
  --p-card-color: #F2F3F7;
}
````

### Issue: Build takes 60+ seconds

**Cause:** Using `theme()` calls in CSS

**Solution:** Use CSS variables (`var(--p-*)`) instead of `theme()` calls

### Issue: Theme flickering during toggle

**Cause:** Transitions applying during programmatic class change

**Solution:** Already handled by `.theme-transitioning` class in ThemeService

### DO NOT

- ❌ Define colors in multiple places
- ❌ Use `theme()` calls in CSS files
- ❌ Hardcode colors in components
- ❌ Edit plugin file unless adding new PrimeNG components

## Debugging Theme Issues

### Check Variable Application

```javascript
// In browser console
getComputedStyle(document.documentElement).getPropertyValue('--p-text-color');
// Light: #262626 (dark text)
// Dark: #F2F3F7 (light text)
```

### Verify Class Toggle

```javascript
document.documentElement.classList.contains('dark');
// true in dark mode, false in light mode
```

### Build Output

Variables are in the compiled `styles.css`:

```css
:root {
  --p-primary-500: #2a01cd;
}
:root.dark {
  --p-primary-500: #a6b7ff;
}
```

## Common Issues

### Issue: Text not visible in dark mode

**Cause**: Explicit text color classes override inheritance
**Fix**: Remove `text-*` classes, use `opacity-*` for secondary text

### Issue: Slow builds (60+ seconds)

**Cause**: Using `theme()` calls in CSS
**Fix**: Use CSS variables (`var(--p-*)`) instead

### Issue: Colors not updating after config change

**Cause**: Need to rebuild
**Fix**: Restart dev server (`pnpm start`)

### Issue: Flickering during theme toggle

**Cause**: Transitions on all elements
**Fix**: Use `.theme-transitioning` class to disable transitions temporarily

## Best Practices

1. **Single Source**: Only edit colors in `colors.constants.ts`
2. **Automated Plugin**: Tailwind plugin generates variables at build time
3. **Inheritance**: Let text inherit color from body
4. **CSS Variables**: Use `var(--p-*)` for dynamic theming
5. **Build Time**: Variables generated at build, not runtime
6. **Performance**: Specific transitions on specific elements only
7. **Consistency**: Same colors across Tailwind, PrimeNG, and TypeScript
8. **Component Addition**: Use `primeng-theming-guide.md` to add new PrimeNG components

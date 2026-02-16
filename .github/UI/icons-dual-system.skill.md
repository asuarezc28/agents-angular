# Icon System Skill - Dual Strategy (Lucide + PrimeIcons)

## Overview

This project uses a dual icon strategy:

- **Lucide Angular**: For all user-facing UI elements
- **PrimeIcons**: For PrimeNG component internals only

## Why Dual Icons?

PrimeNG components have hardcoded icon references in their internal templates that cannot be easily overridden. Rather than fighting the framework, we embrace a pragmatic dual strategy.

## Architecture

```
User-Facing UI
    ↓
Lucide Angular (1,400+ outline icons)
    ↓
Custom components, feature illustrations

PrimeNG Components
    ↓
PrimeIcons (internal use only)
    ↓
Dropdowns, sorting indicators, close buttons
```

## Lucide Icons (Primary)

### Installation

```bash
pnpm add lucide-angular
```

### Usage in Components

```typescript
import { Component } from '@angular/core';
import { LucideAngularModule, Home, User, Settings } from 'lucide-angular';

@Component({
  selector: 'app-example',
  imports: [LucideAngularModule],
  template: `
    <lucide-icon [img]="Home" [size]="24" />
    <lucide-icon [img]="User" [size]="20" class="text-primary-500" />
    <lucide-icon [img]="Settings" [size]="32" [strokeWidth]="1.5" />
  `,
})
export class ExampleComponent {
  protected readonly Home = Home;
  protected readonly User = User;
  protected readonly Settings = Settings;
}
```

### Icon Colors

**DO** use semantic colors for icons:

```html
<!-- ✅ CORRECT - Semantic colors for visual hierarchy -->
<lucide-icon [img]="CheckCircle" class="text-success-500 dark:text-success-300" />
<lucide-icon [img]="AlertTriangle" class="text-warning-600 dark:text-warning-400" />
<lucide-icon [img]="XCircle" class="text-danger-500 dark:text-danger-300" />
<lucide-icon [img]="Info" class="text-info-500 dark:text-info-300" />
```

**DO NOT** use surface colors (text inherits instead):

```html
<!-- ❌ WRONG - Text elements should inherit -->
<span class="text-surface-900 dark:text-surface-100">Text with icon</span>
<lucide-icon [img]="Home" />

<!-- ✅ CORRECT - Let text inherit, icon has semantic color -->
<span>Text with icon</span>
<lucide-icon [img]="Home" class="text-primary-500" />
```

### Common Lucide Icons

```typescript
// Navigation
(Home, Menu, ChevronRight, ChevronLeft, ChevronDown, ChevronUp);

// Actions
(Plus, Minus, Edit, Trash2, Save, X, Check);

// Status
(CheckCircle, XCircle, AlertTriangle, AlertCircle, Info);

// Data
(BarChart3, LineChart, PieChart, TrendingUp, TrendingDown);

// Files
(FileText, Download, Upload, File, Folder);

// Communication
(Mail, Phone, MessageSquare, Bell);

// User
(User, Users, UserPlus, Settings);

// Search & Filter
(Search, Filter, SlidersHorizontal);
```

### Icon Properties

```typescript
interface LucideIconProps {
  img: LucideIcon; // Icon component (required)
  size?: number; // Size in pixels (default: 24)
  strokeWidth?: number; // Stroke width (default: 2)
  color?: string; // Stroke color (use Tailwind classes instead)
  fill?: string; // Fill color (rarely needed)
  absoluteStrokeWidth?: boolean; // Scale stroke width with size
}
```

### Examples

**Navigation Bar**

```typescript
@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule],
  template: `
    <nav class="flex items-center gap-4">
      <button>
        <lucide-icon [img]="Home" class="text-primary-500" />
      </button>
      <button>
        <lucide-icon [img]="Settings" class="text-surface-600" />
      </button>
      <button>
        <lucide-icon [img]="User" class="text-surface-600" />
      </button>
    </nav>
  `,
})
export class NavbarComponent {
  protected readonly Home = Home;
  protected readonly Settings = Settings;
  protected readonly User = User;
}
```

**Status Indicators**

```typescript
@Component({
  template: `
    @if (status() === 'success') {
      <lucide-icon [img]="CheckCircle" class="text-success-500" [size]="20" />
    }
    @if (status() === 'error') {
      <lucide-icon [img]="XCircle" class="text-danger-500" [size]="20" />
    }
    @if (status() === 'warning') {
      <lucide-icon [img]="AlertTriangle" class="text-warning-500" [size]="20" />
    }
  `,
})
export class StatusComponent {
  status = signal<'success' | 'error' | 'warning'>('success');

  protected readonly CheckCircle = CheckCircle;
  protected readonly XCircle = XCircle;
  protected readonly AlertTriangle = AlertTriangle;
}
```

## PrimeIcons (PrimeNG Internal Only)

### Installation

```bash
pnpm add primeicons
```

### Auto-Loading

PrimeIcons are automatically loaded via `primeng-theme.css`:

```css
/* primeng-theme.css */
@import 'primeicons/primeicons.css';
```

### Where PrimeIcons Are Used

PrimeNG components use PrimeIcons internally for:

- **Dropdown arrows**: `pi-chevron-down`
- **Calendar icons**: `pi-calendar`
- **Table sorting**: `pi-sort-alt`, `pi-sort-amount-up-alt`, `pi-sort-amount-down`
- **Dialog close buttons**: `pi-times`
- **Password toggle**: `pi-eye`, `pi-eye-slash`
- **Paginator**: `pi-angle-left`, `pi-angle-right`
- **File upload**: `pi-upload`, `pi-times`

### DO NOT Use PrimeIcons in Custom UI

```html
<!-- ❌ WRONG - Don't use PrimeIcons for custom UI -->
<i class="pi pi-home"></i>

<!-- ✅ CORRECT - Use Lucide for custom UI -->
<lucide-icon [img]="Home" />
```

### PrimeNG Component Example

```html
<!-- PrimeIcons are used internally, you don't specify them -->
<p-dropdown [options]="items" placeholder="Select" />
<!-- The chevron-down icon is rendered by PrimeNG automatically -->

<p-table [value]="data">
  <ng-template pTemplate="header">
    <tr>
      <th pSortableColumn="name">
        Name <p-sortIcon field="name" />
        <!-- Sort icons are PrimeIcons, rendered by PrimeNG -->
      </th>
    </tr>
  </ng-template>
</p-table>
```

## Icon Sizing Guide

```typescript
// Size recommendations
[size] =
  '16'[size] = // Small icons in dense UI
  '20'[size] = // List items, table rows
  '24'[size] = // Default size, buttons, navigation
  '32'[size] = // Feature highlights, empty states
    '48'; // Hero sections, large CTAs
```

## Icon Color Classes (Tailwind)

```html
<!-- Primary actions -->
<lucide-icon class="text-primary-500 dark:text-primary-300" />

<!-- Success/positive -->
<lucide-icon class="text-success-500 dark:text-success-300" />

<!-- Danger/negative -->
<lucide-icon class="text-danger-500 dark:text-danger-300" />

<!-- Warning -->
<lucide-icon class="text-warning-600 dark:text-warning-400" />

<!-- Info -->
<lucide-icon class="text-info-500 dark:text-info-300" />

<!-- Muted/secondary -->
<lucide-icon class="text-surface-600 dark:text-surface-400" />
```

## Accessibility

### ARIA Labels

Always provide `aria-label` for icon-only buttons:

```html
<button [attr.aria-label]="'common.actions.close' | translate">
  <lucide-icon [img]="X" />
</button>

<button [attr.aria-label]="'profile.actions.edit' | translate">
  <lucide-icon [img]="Edit" />
</button>
```

Accessibility labels must come from i18n keys in `src/assets/i18n/{lang}/common.json` (or corresponding translation file), not hardcoded strings.

### Icon + Text Combination

```html
<!-- Icon decorates text -->
<button>
  <lucide-icon [img]="Save" [size]="20" />
  <span>Save changes</span>
</button>

<!-- Icon is the only label -->
<button [attr.aria-label]="'common.actions.settings' | translate">
  <lucide-icon [img]="Settings" [size]="24" />
</button>
```

## Performance Tips

1. **Import specific icons** (not the entire library):

```typescript
// ✅ Good
import { Home, User } from 'lucide-angular';

// ❌ Bad (imports everything)
import * as Icons from 'lucide-angular';
```

2. **Lazy load icons** for admin/rare features:

```typescript
const AdminIcon = await import('lucide-angular').then((m) => m.Shield);
```

3. **Cache icon imports** in component properties:

```typescript
// ✅ Good - import once, use many times
protected readonly Home = Home;

// ❌ Bad - imports in template (not cached)
template: `<lucide-icon [img]="getIcon()" />`
```

## Migration from Other Icon Libraries

### From FontAwesome

```typescript
// Before
<i class="fa fa-home"></i>

// After
<lucide-icon [img]="Home" />
```

### From Material Icons

```typescript
// Before
<mat-icon>home</mat-icon>

// After
<lucide-icon [img]="Home" />
```

### From PrimeIcons (custom UI)

```typescript
// Before
<i class="pi pi-home"></i>

// After
<lucide-icon [img]="Home" />
```

---

## 📚 Official Documentation

### Lucide Icons

**Main Documentation**:

- **Official Website**: https://lucide.dev/
- **Icons Gallery**: https://lucide.dev/icons/
  - Search 1,400+ icons
  - Filter by category
  - Copy icon names
  - Preview variants

**Angular Integration**:

- **NPM Package**: https://www.npmjs.com/package/lucide-angular
- **GitHub Repository**: https://github.com/lucide-icons/lucide
- **Angular Guide**: https://lucide.dev/guide/packages/lucide-angular

**Key Features**:

- Tree-shakeable imports (only bundle icons you use)
- Customizable size, color, stroke width
- TypeScript support
- Accessible by default

**Icon Categories**:
| Category | Examples | Count |
|----------|----------|-------|
| **Arrows & Navigation** | ChevronRight, ArrowLeft, Home | 100+ |
| **Files & Folders** | FileText, Folder, Download | 50+ |
| **Communication** | Mail, Phone, MessageSquare | 40+ |
| **Status & Alerts** | CheckCircle, AlertTriangle, Info | 30+ |
| **E-commerce** | ShoppingCart, CreditCard, Package | 25+ |
| **Media** | Play, Pause, Volume, Camera | 40+ |
| **Users** | User, Users, UserPlus, Settings | 20+ |
| **Development** | Code, Terminal, GitBranch | 30+ |

**Quick Reference**:

```typescript
import { Home, User, Settings } from 'lucide-angular';

// Usage in template
<lucide-icon
  [img]="Home"
  [size]="24"
  [strokeWidth]="2"
  class="text-primary-500"
/>
```

### PrimeIcons

**Main Documentation**:

- **Official Website**: https://primeng.org/icons
- **Icons Gallery**: https://primeng.org/icons
  - Complete icon list with names
  - Visual preview
  - CSS class names

**NPM Package**:

- **Package**: https://www.npmjs.com/package/primeicons
- **GitHub**: https://github.com/primefaces/primeicons

**Important Note for This Project**:

- ⚠️ **DO NOT use PrimeIcons for custom UI**
- ✅ PrimeIcons are **ONLY** for PrimeNG component internals
- ✅ Use Lucide for all custom icons

**Why PrimeIcons Are Included**:

- PrimeNG components (dropdown, table, dialog) have hardcoded icon class names
- These icons render automatically inside PrimeNG components
- We cannot easily override these internal icons

**PrimeIcons Used Internally by PrimeNG**:
| Component | Icons Used | Classes |
|-----------|------------|----------|
| **Dropdown** | Chevron | `pi-chevron-down` |
| **Table** | Sort indicators | `pi-sort-alt`, `pi-sort-amount-up-alt` |
| **Dialog** | Close button | `pi-times` |
| **Calendar** | Calendar icon | `pi-calendar` |
| **Password** | Toggle visibility | `pi-eye`, `pi-eye-slash` |
| **Paginator** | Navigation | `pi-angle-left`, `pi-angle-right` |

**Resources Summary**:
| Resource | Lucide | PrimeIcons |
|----------|--------|------------|
| **Website** | https://lucide.dev/ | https://primeng.org/icons |
| **Total Icons** | 1,400+ | ~250 |
| **Use In Project** | ✅ All custom UI | 🚫 PrimeNG internals only |
| **Tree-shakeable** | ✅ Yes | ❌ No (all loaded) |
| **Customizable** | ✅ Full control | ⚠️ Limited |

---

## Summary

| Aspect            | Lucide Angular               | PrimeIcons               |
| ----------------- | ---------------------------- | ------------------------ |
| **Purpose**       | User-facing UI               | PrimeNG internals        |
| **Usage**         | Explicit imports + component | Auto-rendered by PrimeNG |
| **Quantity**      | 1,400+ icons                 | Limited to PrimeNG needs |
| **Style**         | Outline, customizable        | Filled/outline mix       |
| **Control**       | Full control via props       | Controlled by PrimeNG    |
| **Accessibility** | Manual aria-labels           | PrimeNG handles          |
| **Performance**   | Tree-shakeable               | All loaded               |

**Rule of thumb**: If you're writing the markup, use Lucide. If PrimeNG is rendering it, it uses PrimeIcons automatically.

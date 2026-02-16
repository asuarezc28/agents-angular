# 🎨 Guía de Theming PrimeNG - Sistema Automatizado

## 📋 Resumen

Este proyecto usa un **sistema automatizado** donde todas las variables CSS para PrimeNG se generan desde `colors.constants.ts` mediante un plugin de Tailwind.

---

## 🏗️ Arquitectura del Sistema

```
colors.constants.ts (Single Source of Truth)
    ↓ importado por
tailwind.config.ts
    ↓ procesado por
tailwind-css-variables.mjs (Plugin)
    ↓ genera automáticamente en build
CSS Variables para:
    ├── Colores base (--p-primary-*, --p-surface-*)
    ├── Colores de componentes PrimeNG (--p-button-*, --p-card-*, etc.)
    ├── Variables semánticas (--p-text-color, --p-content-background, etc.)
    └── Modos light y dark (:root y :root.dark)
```

---

## ✅ Estado Actual

### Componentes con Soporte Completo

El plugin actualmente genera variables para:

- ✅ **Button** (`--p-button-primary-*`)
- ✅ **Card** (`--p-card-*`)
- ✅ **InputText** (`--p-inputtext-*`)
- ✅ **Tree** (`--p-tree-*`)
- ✅ **Colores base** (primary, surface, text, semantic)
- ✅ **Focus states** (`--p-focus-ring-*`)

### Variables Generadas

**Light Mode (`:root`)**:

```css
/* Componente Button */
--p-button-primary-background: #2a01cd;
--p-button-primary-hover-background: #2400ad;
--p-button-primary-active-background: #1e008e;
--p-button-primary-color: #ffffff;

/* Componente Card */
--p-card-background: #ffffff;
--p-card-border-color: #e0e0e0;
--p-card-color: #262626;

/* Componente InputText */
--p-inputtext-background: #ffffff;
--p-inputtext-border-color: #bdbdbd;
--p-inputtext-focus-border-color: #2a01cd;
--p-inputtext-color: #262626;
```

**Dark Mode (`:root.dark`)**:

```css
/* Componente Button */
--p-button-primary-background: #2a01cd;
--p-button-primary-hover-background: #7d6aff;
--p-button-primary-color: #0f0f0f;

/* Componente Card */
--p-card-background: #262626;
--p-card-border-color: #424242;
--p-card-color: #f2f3f7;

/* Componente InputText */
--p-inputtext-background: #262626;
--p-inputtext-border-color: #424242;
--p-inputtext-focus-border-color: #a6b7ff;
--p-inputtext-color: #f2f3f7;
```

---

## 🔧 Agregar Soporte para Nuevos Componentes

Cuando uses un nuevo componente de PrimeNG que necesite temas personalizados:

### Paso 1: Identificar Variables CSS del Componente

Inspecciona el componente en DevTools para ver qué variables CSS usa. Por ejemplo, si usas `<p-dialog>`:

```bash
# En DevTools, busca variables como:
--p-dialog-background
--p-dialog-border-color
--p-dialog-title-color
--p-dialog-content-color
```

### Paso 2: Agregar Variables al Plugin

Edita [tailwind-css-variables.mjs](../../tailwind-css-variables.mjs):

**En `rootVars` (light mode)**:

```javascript
// Dialog component (agregar al final de rootVars)
'--p-dialog-background': colors.surface[0],
'--p-dialog-border-color': colors.surface[300],
'--p-dialog-title-color': colors.surface[900],
'--p-dialog-content-color': colors.surface[900],
'--p-dialog-header-background': colors.surface[50],
'--p-dialog-header-border-color': colors.surface[200],
'--p-dialog-shadow': '0 11px 15px -7px rgba(0,0,0,0.2), 0 24px 38px 3px rgba(0,0,0,0.14)',
```

**En `darkVars` (dark mode)**:

```javascript
// Dialog component (agregar al final de darkVars)
'--p-dialog-background': colors.surface[900],
'--p-dialog-border-color': colors.surface[700],
'--p-dialog-title-color': colors.surface[50],
'--p-dialog-content-color': colors.surface[50],
'--p-dialog-header-background': colors.surface[800],
'--p-dialog-header-border-color': colors.surface[700],
'--p-dialog-shadow': '0 11px 15px -7px rgba(0,0,0,0.4), 0 24px 38px 3px rgba(0,0,0,0.28)',
```

### Paso 3: Rebuild

```bash
# Detener servidor (Ctrl+C)
pnpm start
```

¡Listo! El componente ahora soporta dark mode automáticamente.

---

## 📚 Nombres de Variables por Componente

### Convención de Nombres

PrimeNG usa una convención estándar:

```
--p-{component}-{property}-{state}
```

**Ejemplos**:

- `--p-button-primary-background` - Fondo del botón primario
- `--p-card-border-color` - Color de borde de card
- `--p-inputtext-focus-border-color` - Borde de input al hacer focus
- `--p-tree-node-hover-background` - Fondo de nodo de tree al hover

### Propiedades Comunes

| Propiedad            | Propósito           | Ejemplo                            |
| -------------------- | ------------------- | ---------------------------------- |
| `background`         | Color de fondo      | `--p-card-background`              |
| `border-color`       | Color de borde      | `--p-card-border-color`            |
| `color`              | Color de texto      | `--p-card-color`                   |
| `hover-background`   | Fondo al hover      | `--p-button-hover-background`      |
| `active-background`  | Fondo al hacer clic | `--p-button-active-background`     |
| `focus-border-color` | Borde al focus      | `--p-inputtext-focus-border-color` |
| `shadow`             | Sombra              | `--p-card-shadow`                  |

---

## 🎨 Patrones de Color Recomendados

### Light Mode

```javascript
// Fondos de componentes
'--p-{component}-background': colors.surface[0], // Blanco

// Fondos de hover
'--p-{component}-hover-background': colors.surface[50], // Gris muy claro

// Colores de texto
'--p-{component}-color': colors.surface[900], // Oscuro

// Bordes
'--p-{component}-border-color': colors.surface[300], // Gris medio
```

### Dark Mode

```javascript
// Fondos de componentes
'--p-{component}-background': colors.surface[900], // Oscuro #262626

// Fondos de hover
'--p-{component}-hover-background': colors.surface[800], // Más oscuro

// Colores de texto
'--p-{component}-color': colors.surface[50], // Claro

// Bordes
'--p-{component}-border-color': colors.surface[700], // Gris oscuro
```

### Estados de Componentes

```javascript
// Normal state
'--p-button-background': colors.primary[500],

// Hover state
'--p-button-hover-background': colors.primary[600], // Más oscuro

// Active/Pressed state
'--p-button-active-background': colors.primary[700], // Aún más oscuro

// Disabled state
'--p-button-disabled-background': colors.surface[300], // Gris
```

---

## 🔍 Debugging de Variables CSS

### Inspeccionar Variables Aplicadas

Abre DevTools y ejecuta en la consola:

```javascript
// Ver todas las variables en :root
getComputedStyle(document.documentElement).getPropertyValue('--p-card-background');

// Ver todas las variables en :root.dark
document.documentElement.classList.add('dark');
getComputedStyle(document.documentElement).getPropertyValue('--p-card-background');
```

### Forzar Valores Temporalmente

Para probar rápidamente colores:

```css
/* En styles.css o DevTools */
:root {
  --p-card-background: red !important; /* Test en light mode */
}

:root.dark {
  --p-card-background: blue !important; /* Test en dark mode */
}
```

---

## 📝 Componentes PrimeNG Comunes

### Tabla de Referencia

| Componente    | Variables Clave        | Estado         |
| ------------- | ---------------------- | -------------- |
| **Button**    | `--p-button-primary-*` | ✅ Configurado |
| **Card**      | `--p-card-*`           | ✅ Configurado |
| **InputText** | `--p-inputtext-*`      | ✅ Configurado |
| **Tree**      | `--p-tree-*`           | ✅ Configurado |

#### Form Components

| Componente       | Variables Clave      | Estado             |
| ---------------- | -------------------- | ------------------ |
| **AutoComplete** | `--p-autocomplete-*` | ⚠️ Agregar si usas |
| **Calendar**     | `--p-calendar-*`     | ⚠️ Agregar si usas |
| **Checkbox**     | `--p-checkbox-*`     | ⚠️ Agregar si usas |
| **Chips**        | `--p-chips-*`        | ⚠️ Agregar si usas |
| **ColorPicker**  | `--p-colorpicker-*`  | ⚠️ Agregar si usas |
| **Dropdown**     | `--p-dropdown-*`     | ⚠️ Agregar si usas |
| **Editor**       | `--p-editor-*`       | ⚠️ Agregar si usas |
| **InputMask**    | `--p-inputmask-*`    | ⚠️ Agregar si usas |
| **InputNumber**  | `--p-inputnumber-*`  | ⚠️ Agregar si usas |
| **InputSwitch**  | `--p-inputswitch-*`  | ⚠️ Agregar si usas |
| **Knob**         | `--p-knob-*`         | ⚠️ Agregar si usas |
| **Listbox**      | `--p-listbox-*`      | ⚠️ Agregar si usas |
| **MultiSelect**  | `--p-multiselect-*`  | ⚠️ Agregar si usas |
| **Password**     | `--p-password-*`     | ⚠️ Agregar si usas |
| **RadioButton**  | `--p-radiobutton-*`  | ⚠️ Agregar si usas |
| **Rating**       | `--p-rating-*`       | ⚠️ Agregar si usas |
| **SelectButton** | `--p-selectbutton-*` | ⚠️ Agregar si usas |
| **Slider**       | `--p-slider-*`       | ⚠️ Agregar si usas |
| **Textarea**     | `--p-textarea-*`     | ⚠️ Agregar si usas |
| **ToggleButton** | `--p-togglebutton-*` | ⚠️ Agregar si usas |
| **TreeSelect**   | `--p-treeselect-*`   | ⚠️ Agregar si usas |

#### Data Display

| Componente          | Variables Clave           | Estado             |
| ------------------- | ------------------------- | ------------------ |
| **DataTable**       | `--p-datatable-*`         | ⚠️ Agregar si usas |
| **DataView**        | `--p-dataview-*`          | ⚠️ Agregar si usas |
| **OrderList**       | `--p-orderlist-*`         | ⚠️ Agregar si usas |
| **OrgChart**        | `--p-organizationchart-*` | ⚠️ Agregar si usas |
| **Paginator**       | `--p-paginator-*`         | ⚠️ Agregar si usas |
| **PickList**        | `--p-picklist-*`          | ⚠️ Agregar si usas |
| **Timeline**        | `--p-timeline-*`          | ⚠️ Agregar si usas |
| **TreeTable**       | `--p-treetable-*`         | ⚠️ Agregar si usas |
| **VirtualScroller** | `--p-virtualscroller-*`   | ⚠️ Agregar si usas |

#### Panel Components

| Componente      | Variables Clave     | Estado             |
| --------------- | ------------------- | ------------------ |
| **Accordion**   | `--p-accordion-*`   | ⚠️ Agregar si usas |
| **Divider**     | `--p-divider-*`     | ⚠️ Agregar si usas |
| **Fieldset**    | `--p-fieldset-*`    | ⚠️ Agregar si usas |
| **Panel**       | `--p-panel-*`       | ⚠️ Agregar si usas |
| **ScrollPanel** | `--p-scrollpanel-*` | ⚠️ Agregar si usas |
| **Splitter**    | `--p-splitter-*`    | ⚠️ Agregar si usas |
| **Stepper**     | `--p-stepper-*`     | ⚠️ Agregar si usas |
| **TabView**     | `--p-tabview-*`     | ⚠️ Agregar si usas |
| **Toolbar**     | `--p-toolbar-*`     | ⚠️ Agregar si usas |

#### Overlay Components

| Componente        | Variables Clave       | Estado             |
| ----------------- | --------------------- | ------------------ |
| **ConfirmDialog** | `--p-confirmdialog-*` | ⚠️ Agregar si usas |
| **ConfirmPopup**  | `--p-confirmpopup-*`  | ⚠️ Agregar si usas |
| **Dialog**        | `--p-dialog-*`        | ⚠️ Agregar si usas |
| **Drawer**        | `--p-drawer-*`        | ⚠️ Agregar si usas |
| **DynamicDialog** | `--p-dynamicdialog-*` | ⚠️ Agregar si usas |
| **OverlayPanel**  | `--p-overlaypanel-*`  | ⚠️ Agregar si usas |
| **Popover**       | `--p-popover-*`       | ⚠️ Agregar si usas |
| **Sidebar**       | `--p-sidebar-*`       | ⚠️ Agregar si usas |
| **Tooltip**       | `--p-tooltip-*`       | ⚠️ Agregar si usas |

#### Menu Components

| Componente      | Variables Clave     | Estado             |
| --------------- | ------------------- | ------------------ |
| **Breadcrumb**  | `--p-breadcrumb-*`  | ⚠️ Agregar si usas |
| **ContextMenu** | `--p-contextmenu-*` | ⚠️ Agregar si usas |
| **Dock**        | `--p-dock-*`        | ⚠️ Agregar si usas |
| **Menu**        | `--p-menu-*`        | ⚠️ Agregar si usas |
| **Menubar**     | `--p-menubar-*`     | ⚠️ Agregar si usas |
| **MegaMenu**    | `--p-megamenu-*`    | ⚠️ Agregar si usas |
| **PanelMenu**   | `--p-panelmenu-*`   | ⚠️ Agregar si usas |
| **SpeedDial**   | `--p-speeddial-*`   | ⚠️ Agregar si usas |
| **Steps**       | `--p-steps-*`       | ⚠️ Agregar si usas |
| **TabMenu**     | `--p-tabmenu-*`     | ⚠️ Agregar si usas |
| **TieredMenu**  | `--p-tieredmenu-*`  | ⚠️ Agregar si usas |

#### Messages Components

| Componente        | Variables Clave       | Estado             |
| ----------------- | --------------------- | ------------------ |
| **Message**       | `--p-message-*`       | ⚠️ Agregar si usas |
| **InlineMessage** | `--p-inlinemessage-*` | ⚠️ Agregar si usas |
| **Toast**         | `--p-toast-*`         | ⚠️ Agregar si usas |

#### Media Components

| Componente   | Variables Clave  | Estado             |
| ------------ | ---------------- | ------------------ |
| **Carousel** | `--p-carousel-*` | ⚠️ Agregar si usas |
| **Galleria** | `--p-galleria-*` | ⚠️ Agregar si usas |
| **Image**    | `--p-image-*`    | ⚠️ Agregar si usas |

#### Misc Components

| Componente          | Variables Clave         | Estado             |
| ------------------- | ----------------------- | ------------------ |
| **Avatar**          | `--p-avatar-*`          | ⚠️ Agregar si usas |
| **Badge**           | `--p-badge-*`           | ⚠️ Agregar si usas |
| **BlockUI**         | `--p-blockui-*`         | ⚠️ Agregar si usas |
| **Chip**            | `--p-chip-*`            | ⚠️ Agregar si usas |
| **Inplace**         | `--p-inplace-*`         | ⚠️ Agregar si usas |
| **MeterGroup**      | `--p-metergroup-*`      | ⚠️ Agregar si usas |
| **ProgressBar**     | `--p-progressbar-*`     | ⚠️ Agregar si usas |
| **ProgressSpinner** | `--p-progressspinner-*` | ⚠️ Agregar si usas |
| **ScrollTop**       | `--p-scrolltop-*`       | ⚠️ Agregar si usas |
| **Skeleton**        | `--p-skeleton-*`        | ⚠️ Agregar si usas |
| **Tag**             | `--p-tag-*`             | ⚠️ Agregar si usas |
| **Terminal**        | `--p-terminal-*`        | ⚠️ Agregar si usas |
| **FileUpload**      | `--p-fileupload-*`      | ⚠️ Agregar si usas |

---

## 🚀 Workflow Completo

### Cuando Agregas un Componente Nuevo

1. **Agregar el componente** a tu template

   ```html
   <p-dropdown [options]="cities" [(ngModel)]="selectedCity" />
   ```

2. **Ver en el navegador** - Probablemente se vea blanco o sin colores

3. **Inspeccionar en DevTools** - Buscar qué variables CSS está esperando

   ```
   --p-dropdown-background
   --p-dropdown-border-color
   --p-dropdown-color
   --p-dropdown-hover-background
   --p-dropdown-focus-border-color
   ```

4. **Agregar variables al plugin** en [tailwind-css-variables.mjs](../../tailwind-css-variables.mjs)

5. **Rebuild**: `pnpm start`

6. **Verificar** - Light mode y dark mode deben funcionar

---

## 🎯 Ejemplo Completo: Agregar Dropdown

### 1. Identificar Variables Necesarias

```css
/* Variables que Dropdown espera */
--p-dropdown-background
--p-dropdown-border-color
--p-dropdown-color
--p-dropdown-hover-background
--p-dropdown-focus-border-color
--p-dropdown-panel-background
--p-dropdown-item-hover-background
--p-dropdown-item-color
```

### 2. Editar Plugin

```javascript
// En tailwind-css-variables.mjs

// Light mode (rootVars)
'--p-dropdown-background': colors.surface[0],
'--p-dropdown-border-color': colors.surface[400],
'--p-dropdown-color': colors.surface[900],
'--p-dropdown-hover-background': colors.surface[50],
'--p-dropdown-focus-border-color': colors.primary[500],
'--p-dropdown-panel-background': colors.surface[0],
'--p-dropdown-item-hover-background': colors.surface[50],
'--p-dropdown-item-color': colors.surface[900],

// Dark mode (darkVars)
'--p-dropdown-background': colors.surface[900],
'--p-dropdown-border-color': colors.surface[800],
'--p-dropdown-color': colors.surface[50],
'--p-dropdown-hover-background': colors.surface[800],
'--p-dropdown-focus-border-color': '#A6B7FF',
'--p-dropdown-panel-background': colors.surface[900],
'--p-dropdown-item-hover-background': colors.surface[800],
'--p-dropdown-item-color': colors.surface[50],
```

### 3. Rebuild y Verificar

```bash
pnpm start
```

---

## 💡 Tips y Mejores Prácticas

### 1. Consistencia de Colores

Usa siempre los mismos valores para propiedades similares:

```javascript
// ✅ Consistente
'--p-card-background': colors.surface[0],
'--p-dialog-background': colors.surface[0],
'--p-panel-background': colors.surface[0],

// ❌ Inconsistente
'--p-card-background': colors.surface[0],
'--p-dialog-background': colors.surface[50],
'--p-panel-background': '#fff',
```

### 2. Contraste en Dark Mode

Los fondos deben ser más oscuros que en light mode:

```javascript
// Light mode
'--p-card-background': colors.surface[0],      // #ffffff
'--p-background': colors.surface[0],           // #ffffff

// Dark mode
'--p-card-background': colors.surface[900],    // #262626 (más claro que fondo)
'--p-background': colors.surface[950],         // #0F0F0F (muy oscuro)
```

### 3. Estados Hover

Los estados hover deben ser visualmente distintos pero sutiles:

```javascript
// Light mode
'--p-button-background': colors.primary[500],
'--p-button-hover-background': colors.primary[600], // 1 escala más oscuro

// Dark mode
'--p-card-background': colors.surface[900],
'--p-card-hover-background': colors.surface[800], // 1 escala más oscuro
```

### 4. Focus States

Usa colores primary para focus:

```javascript
// Ambos modos
'--p-inputtext-focus-border-color': colors.primary[500], // Light
'--p-inputtext-focus-border-color': '#A6B7FF',          // Dark (más claro)
```

---

## 📖 Referencias

- [PrimeNG Theming Docs](https://primeng.org/theming)
- [Preset Aura](https://primeng.org/theming#aura)
- [colors.constants.ts](../../src/app/core/constants/colors.constants.ts)
- [tailwind-css-variables.mjs](../../tailwind-css-variables.mjs)

---

## ✅ Checklist de Theming

Cuando agregues un componente nuevo:

- [ ] Identificar qué variables CSS necesita
- [ ] Agregar variables a `rootVars` (light mode) en el plugin
- [ ] Agregar variables correspondientes a `darkVars` (dark mode)
- [ ] Rebuild (`pnpm start`)
- [ ] Verificar en light mode
- [ ] Verificar en dark mode (toggle con botón de tema)
- [ ] Verificar estados hover
- [ ] Verificar estados focus (si aplica)
- [ ] Verificar estados disabled (si aplica)
- [ ] Documentar en esta guía si es un componente complejo

---

## 📚 Documentación Oficial de PrimeNG (Componentes)

### Uso Básico de Componentes

**⚠️ IMPORTANTE**: Esta sección es SOLO para aprender el **uso básico de componentes** (props, eventos, templates). **NO sigas la documentación oficial de theming/styling** porque este proyecto usa un sistema de colores personalizado.

**Documentación Principal**:

- **Website Oficial**: https://primeng.org/
- **Getting Started**: https://primeng.org/installation
- **Components Gallery**: https://primeng.org/components

**Componentes Más Comunes**:

| Componente    | URL                           | Uso                           |
| ------------- | ----------------------------- | ----------------------------- |
| **Button**    | https://primeng.org/button    | Botones, clicks, iconos       |
| **Card**      | https://primeng.org/card      | Contenedores de contenido     |
| **InputText** | https://primeng.org/inputtext | Campos de texto               |
| **Dropdown**  | https://primeng.org/dropdown  | Selectores desplegables       |
| **Table**     | https://primeng.org/table     | Tablas con sorting, filtering |
| **Dialog**    | https://primeng.org/dialog    | Modales, diálogos             |
| **Tree**      | https://primeng.org/tree      | Estructuras jerárquicas       |
| **Menu**      | https://primeng.org/menu      | Menús de navegación           |
| **Calendar**  | https://primeng.org/calendar  | Selectores de fecha           |
| **Accordion** | https://primeng.org/accordion | Paneles colapsables           |

**API Reference**:

- Cada página de componente incluye:
  - Props (entradas): `[property]="value"`
  - Events (salidas): `(event)="handler($event)"`
  - Templates: `<ng-template pTemplate="nombre">`
  - Interfaces TypeScript
  - Ejemplos interactivos

**Ejemplo de Uso** (Button):

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-example',
  imports: [ButtonModule],
  template: ` <p-button label="Click me" icon="pi pi-check" (onClick)="handleClick()" /> `,
})
export class ExampleComponent {
  handleClick() {
    console.log('Button clicked');
  }
}
```

**Guías Útiles**:

- **Templates**: https://primeng.org/guides/templates
- **Reactive Forms**: https://primeng.org/forms
- **Accessibility**: https://primeng.org/guides/accessibility

**TypeScript Types**:

- PrimeNG proporciona interfaces TypeScript completas
- Importa desde el mismo módulo del componente:

```typescript
import { Table } from 'primeng/table';
import type { TableRowSelectEvent } from 'primeng/table';
```

### ⚠️ Qué NO Seguir de la Documentación Oficial

**NO uses la documentación de theming/styling**:

- ❌ **Theming Guide**: https://primeng.org/theming (NOT for this project)
- ❌ **Styled Mode**: https://primeng.org/colors (NOT for this project)
- ❌ **CSS Variables**: https://primeng.org/csslayer (NOT for this project)

**Razones**:

1. Este proyecto usa un **sistema de theming personalizado**
2. Los colores vienen de `colors.constants.ts` (single source of truth)
3. El plugin `tailwind-css-variables.mjs` genera las variables CSS automáticamente
4. Seguir la guía oficial de theming causará conflictos con nuestro sistema

**En su lugar**:

- ✅ Para colores: Usa `colors.constants.ts`
- ✅ Para theming: Sigue esta guía (`primeng-theming-guide.md`)
- ✅ Para añadir componentes: Sigue el proceso de esta guía

### GitHub y NPM

- **GitHub Repository**: https://github.com/primefaces/primeng
- **NPM Package**: https://www.npmjs.com/package/primeng
- **Issues & Discussions**: https://github.com/primefaces/primeng/issues
- **Examples Repository**: https://github.com/primefaces/primeng-examples

### Recursos Resumen

| Recurso                | URL                                   | Usar para                   |
| ---------------------- | ------------------------------------- | --------------------------- |
| **Components Gallery** | https://primeng.org/components        | Ver componentes disponibles |
| **API Docs**           | https://primeng.org/{component}       | Props, events, templates    |
| **Templates Guide**    | https://primeng.org/guides/templates  | ng-template patterns        |
| **Forms Guide**        | https://primeng.org/forms             | Reactive forms integration  |
| **GitHub**             | https://github.com/primefaces/primeng | Source code, issues         |
| **NPM**                | https://www.npmjs.com/package/primeng | Installation, versions      |

**⚠️ NO consultar**:
| ❌ NO Usar | Razón |
|-----------|-------|
| Theming Guide | Sistema personalizado en este proyecto |
| Styled Mode | CSS variables generadas por plugin |
| CSS Layer | Conflicto con Tailwind + plugin |

---

**Sistema**: Automatizado con plugin de Tailwind  
**Última actualización**: Febrero 14, 2026  
**Estado**: ✅ Producción

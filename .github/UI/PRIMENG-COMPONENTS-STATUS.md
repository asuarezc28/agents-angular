# 📋 PrimeNG Components - Status de Theming

**Sistema**: Plugin automático con CSS Variables  
**Última actualización**: Febrero 14, 2026

---

## 📊 Resumen

| Estado            | Cantidad | Descripción                          |
| ----------------- | -------- | ------------------------------------ |
| ✅ Configurados   | 4        | Con variables completas light + dark |
| ⚠️ Por configurar | 110+     | Cuando se usen en el proyecto        |

---

## ✅ Componentes Configurados

Estos componentes ya tienen todas sus variables CSS definidas en [tailwind-css-variables.mjs](../../tailwind-css-variables.mjs)

| Componente    | Variables              | Light Mode | Dark Mode |
| ------------- | ---------------------- | ---------- | --------- |
| **Button**    | `--p-button-primary-*` | ✅         | ✅        |
| **Card**      | `--p-card-*`           | ✅         | ✅        |
| **InputText** | `--p-inputtext-*`      | ✅         | ✅        |
| **Tree**      | `--p-tree-*`           | ✅         | ✅        |

---

## ⚠️ Componentes Por Configurar

Cuando uses alguno de estos componentes en tu app, necesitarás agregar sus variables CSS al plugin.

### 📝 Form Components (23)

| Componente       | Variables                | Prioridad |
| ---------------- | ------------------------ | --------- |
| AutoComplete     | `--p-autocomplete-*`     | Media     |
| Calendar         | `--p-calendar-*`         | Alta      |
| CascadeSelect    | `--p-cascadeselect-*`    | Baja      |
| Checkbox         | `--p-checkbox-*`         | Alta      |
| Chips            | `--p-chips-*`            | Media     |
| ColorPicker      | `--p-colorpicker-*`      | Baja      |
| Dropdown         | `--p-dropdown-*`         | Alta      |
| Editor           | `--p-editor-*`           | Media     |
| FloatLabel       | `--p-floatlabel-*`       | Media     |
| IconField        | `--p-iconfield-*`        | Media     |
| InputGroup       | `--p-inputgroup-*`       | Media     |
| InputMask        | `--p-inputmask-*`        | Media     |
| InputNumber      | `--p-inputnumber-*`      | Alta      |
| InputOTP         | `--p-inputotp-*`         | Baja      |
| InputSwitch      | `--p-inputswitch-*`      | Media     |
| Knob             | `--p-knob-*`             | Baja      |
| Listbox          | `--p-listbox-*`          | Media     |
| MultiSelect      | `--p-multiselect-*`      | Media     |
| Password         | `--p-password-*`         | Alta      |
| RadioButton      | `--p-radiobutton-*`      | Alta      |
| Rating           | `--p-rating-*`           | Baja      |
| SelectButton     | `--p-selectbutton-*`     | Media     |
| Slider           | `--p-slider-*`           | Media     |
| Textarea         | `--p-textarea-*`         | Alta      |
| ToggleButton     | `--p-togglebutton-*`     | Media     |
| TreeSelect       | `--p-treeselect-*`       | Media     |
| TriStateCheckbox | `--p-tristatecheckbox-*` | Baja      |

### 📊 Data Display (9)

| Componente      | Variables                 | Prioridad |
| --------------- | ------------------------- | --------- |
| DataTable       | `--p-datatable-*`         | Alta      |
| DataView        | `--p-dataview-*`          | Media     |
| OrderList       | `--p-orderlist-*`         | Baja      |
| OrgChart        | `--p-organizationchart-*` | Baja      |
| Paginator       | `--p-paginator-*`         | Alta      |
| PickList        | `--p-picklist-*`          | Baja      |
| Timeline        | `--p-timeline-*`          | Media     |
| TreeTable       | `--p-treetable-*`         | Media     |
| VirtualScroller | `--p-virtualscroller-*`   | Media     |

### 🗂️ Panel Components (9)

| Componente  | Variables           | Prioridad |
| ----------- | ------------------- | --------- |
| Accordion   | `--p-accordion-*`   | Alta      |
| Divider     | `--p-divider-*`     | Media     |
| Fieldset    | `--p-fieldset-*`    | Media     |
| Panel       | `--p-panel-*`       | Alta      |
| ScrollPanel | `--p-scrollpanel-*` | Media     |
| Splitter    | `--p-splitter-*`    | Baja      |
| Stepper     | `--p-stepper-*`     | Media     |
| TabView     | `--p-tabview-*`     | Alta      |
| Toolbar     | `--p-toolbar-*`     | Alta      |

### 📦 Overlay Components (9)

| Componente    | Variables             | Prioridad |
| ------------- | --------------------- | --------- |
| ConfirmDialog | `--p-confirmdialog-*` | Alta      |
| ConfirmPopup  | `--p-confirmpopup-*`  | Media     |
| Dialog        | `--p-dialog-*`        | Alta      |
| Drawer        | `--p-drawer-*`        | Media     |
| DynamicDialog | `--p-dynamicdialog-*` | Media     |
| OverlayPanel  | `--p-overlaypanel-*`  | Media     |
| Popover       | `--p-popover-*`       | Media     |
| Sidebar       | `--p-sidebar-*`       | Media     |
| Tooltip       | `--p-tooltip-*`       | Alta      |

### 🍔 Menu Components (11)

| Componente  | Variables           | Prioridad |
| ----------- | ------------------- | --------- |
| Breadcrumb  | `--p-breadcrumb-*`  | Alta      |
| ContextMenu | `--p-contextmenu-*` | Media     |
| Dock        | `--p-dock-*`        | Baja      |
| Menu        | `--p-menu-*`        | Alta      |
| Menubar     | `--p-menubar-*`     | Alta      |
| MegaMenu    | `--p-megamenu-*`    | Media     |
| PanelMenu   | `--p-panelmenu-*`   | Media     |
| SpeedDial   | `--p-speeddial-*`   | Baja      |
| Steps       | `--p-steps-*`       | Media     |
| TabMenu     | `--p-tabmenu-*`     | Media     |
| TieredMenu  | `--p-tieredmenu-*`  | Media     |

### 💬 Messages Components (3)

| Componente    | Variables             | Prioridad |
| ------------- | --------------------- | --------- |
| Message       | `--p-message-*`       | Alta      |
| InlineMessage | `--p-inlinemessage-*` | Media     |
| Toast         | `--p-toast-*`         | Alta      |

### 🎬 Media Components (3)

| Componente | Variables        | Prioridad |
| ---------- | ---------------- | --------- |
| Carousel   | `--p-carousel-*` | Media     |
| Galleria   | `--p-galleria-*` | Media     |
| Image      | `--p-image-*`    | Media     |

### 🎨 Misc Components (15)

| Componente      | Variables               | Prioridad |
| --------------- | ----------------------- | --------- |
| Avatar          | `--p-avatar-*`          | Alta      |
| AvatarGroup     | `--p-avatargroup-*`     | Media     |
| Badge           | `--p-badge-*`           | Alta      |
| BlockUI         | `--p-blockui-*`         | Media     |
| Chip            | `--p-chip-*`            | Media     |
| FileUpload      | `--p-fileupload-*`      | Media     |
| Inplace         | `--p-inplace-*`         | Baja      |
| MeterGroup      | `--p-metergroup-*`      | Baja      |
| ProgressBar     | `--p-progressbar-*`     | Alta      |
| ProgressSpinner | `--p-progressspinner-*` | Alta      |
| ScrollTop       | `--p-scrolltop-*`       | Baja      |
| Skeleton        | `--p-skeleton-*`        | Media     |
| Tag             | `--p-tag-*`             | Alta      |
| Terminal        | `--p-terminal-*`        | Baja      |

---

## 🚀 Componentes Prioritarios para Configurar

Si vas a usar estos componentes pronto, configúralos primero:

### Alta Prioridad (Uso Común)

1. **DataTable** - Tablas de datos
2. **Dialog** - Modales/Diálogos
3. **Dropdown** - Selectores
4. **Calendar** - Date pickers
5. **Checkbox** - Checkboxes
6. **Password** - Inputs de contraseña
7. **RadioButton** - Radio buttons
8. **Textarea** - Text areas
9. **Accordion** - Paneles colapsables
10. **Panel** - Contenedores
11. **TabView** - Pestañas
12. **Toolbar** - Barras de herramientas
13. **Toast** - Notificaciones
14. **Message** - Mensajes
15. **Tooltip** - Tooltips
16. **Menu** - Menús
17. **Menubar** - Barras de menú
18. **Breadcrumb** - Breadcrumbs
19. **ProgressBar** - Barras de progreso
20. **ProgressSpinner** - Spinners de carga
21. **Avatar** - Avatares
22. **Badge** - Badges
23. **Tag** - Etiquetas
24. **Paginator** - Paginadores
25. **ConfirmDialog** - Diálogos de confirmación

---

## 📖 Cómo Configurar un Componente

Consulta [primeng-theming-guide.md](./primeng-theming-guide.md#agregar-soporte-para-nuevos-componentes) para el proceso paso a paso.

**Resumen rápido**:

1. **Identifica variables** - Inspecciona en DevTools
2. **Edita plugin** - Agrega variables en `tailwind-css-variables.mjs`
3. **Rebuild** - `pnpm start`
4. **Verifica** - Light + Dark mode
5. **Actualiza este documento** - Marca como ✅

---

## 🔍 Búsqueda de Variables

Para encontrar qué variables necesita un componente:

### Opción 1: DevTools

```javascript
// En la consola del navegador
getComputedStyle(document.querySelector('.p-{component}'))
  .cssText.split(';')
  .filter((line) => line.includes('--p-'));
```

### Opción 2: Documentación PrimeNG

- [PrimeNG Theming - Aura Preset](https://primeng.org/theming#aura)
- Busca el componente específico en la documentación

### Opción 3: GitHub PrimeNG

- [Aura Theme Source Code](https://github.com/primefaces/primeng/tree/master/src/assets/themes/aura)

---

## 📊 Estadísticas

- **Total componentes PrimeNG**: ~115
- **Configurados**: 4 (3.5%)
- **Pendientes**: 111 (96.5%)
- **Alta prioridad**: 25 componentes
- **Media prioridad**: 45 componentes
- **Baja prioridad**: 41 componentes

---

## ✅ Checklist de Configuración

Cuando configures un componente nuevo, márcalo aquí:

- [ ] AutoComplete
- [ ] Calendar
- [ ] Checkbox
- [ ] Dropdown
- [ ] Password
- [ ] RadioButton
- [ ] Textarea
- [ ] DataTable
- [ ] Paginator
- [ ] Accordion
- [ ] Panel
- [ ] TabView
- [ ] Toolbar
- [ ] Dialog
- [ ] ConfirmDialog
- [ ] Tooltip
- [ ] Menu
- [ ] Menubar
- [ ] Breadcrumb
- [ ] Message
- [ ] Toast
- [ ] Avatar
- [ ] Badge
- [ ] Tag
- [ ] ProgressBar
- [ ] ProgressSpinner

---

**Documentación relacionada**:

- [primeng-theming-guide.md](./primeng-theming-guide.md) - Guía completa de theming
- [tailwind-css-variables.mjs](../../tailwind-css-variables.mjs) - Plugin de generación de variables
- [colors.constants.ts](../../src/app/core/constants/colors.constants.ts) - Definición de colores

---

**Última revisión**: Febrero 14, 2026  
**Sistema**: ✅ Automático con plugin de Tailwind

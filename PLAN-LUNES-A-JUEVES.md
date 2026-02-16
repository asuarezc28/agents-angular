# 🎯 Plan de Trabajo: Lunes 16 - Jueves 19 Febrero

**Proyecto:** CYRA Analytics Layout  
**Objetivo:** Implementar mockup funcional (Dark + Light) para demo Product Owner  
**Deadline:** Jueves 19 Febrero - última hora  
**Situación:** NO tenemos paleta definitiva ni tipografía hasta el jueves

---

## 🚨 ESTRATEGIA: Usar Paleta Konecta Existente

**Decisión crítica:** Usaremos la **paleta de colores Konecta que ya tenemos** en `colors.constants.ts`. NO extraeremos colores del mockup. Nos aproximaremos visualmente lo mejor posible con los colores existentes.

**Posición del equipo:**

- ❌ NO usar colores arbitrarios del mockup como placeholders
- ✅ Usar paleta corporativa Konecta (ya definida y aprobada)
- ✅ Si quieren colores exactos → que proporcionen diseños finalizados, no mockups
- ✅ Aproximación visual razonable con herramientas actuales

**Ventaja de nuestro sistema:**

- ✅ Paleta Konecta ya centralizada en `colors.constants.ts`
- ✅ Sistema de theming dark/light ya funcional
- ✅ Si después nos dan paleta oficial → cambiar valores → rebuild → TODO actualizado

### 🧩 Principio de Implementación UI: PrimeNG First

**Regla de trabajo:** Siempre que exista componente PrimeNG para el caso de uso, usar PrimeNG primero y adaptar estilos vía plugin (`tailwind-css-variables.mjs`) con paleta Konecta.

**Aplicación por caso (layout demo):**

| Caso de uso                   | Componente recomendado             | Variables plugin a adaptar               | Colores Konecta clave                 |
| ----------------------------- | ---------------------------------- | ---------------------------------------- | ------------------------------------- |
| Selector de compañía/proyecto | `p-dropdown`                       | `--p-dropdown-*`                         | `surface-0/50/900/950`, `primary-500` |
| Menú principal del header     | `p-menubar`                        | `--p-menubar-*`                          | `surface-0/50/900/950`, `primary-500` |
| Perfil usuario                | `p-avatar` (+ `p-menu` si aplica)  | `--p-avatar-*`, `--p-menu-*`             | `surface-50/900`, `primary-500`       |
| Navegación lateral            | custom + Lucide (fase 1), migrable | estilos Tailwind + `SidebarIconsService` | `surface-50/900`, `primary-500`       |

**Nota:** Evitar hardcode de hex fuera de `colors.constants.ts`; en componentes usar clases Tailwind o variables `--p-*` generadas por plugin.

### 🌐 Regla i18n + Accesibilidad (obligatoria en ejemplos)

- Todos los textos visibles y no visibles (incluyendo `aria-label`, `aria-describedby`, `title`) deben salir de `src/assets/i18n/{lang}/common.json`.
- Evitar strings hardcodeadas en templates para accesibilidad.
- Para atributos ARIA en templates, usar `translate` pipe o claves resueltas desde componente.

**Ejemplo recomendado:**

```html
<button [attr.aria-label]="'layout.header.actions.chat' | translate">...</button>
```

---

## 📊 Análisis de Mockups Recibidos

### Mockup Dark (Captura 1)

**Estructura visual:**

- Header: Fondo oscuro con glassmorphism
- Context Selector: Glassmorphism con blur + opacity sobre fondo oscuro
- Sidebar: Fondo oscuro con iconos claros
- Main background: Gradient azul-púrpura oscuro
- Text: Claro sobre oscuro
- Dropdowns: Fondo semi-transparente con blur

### Mockup Light (Captura 2)

**Estructura visual:**

- Header: Fondo claro/blanco
- Context Selector: Glassmorphism sobre fondo claro
- Sidebar: Fondo claro con iconos oscuros
- Main background: Imagen de fondo con overlay claro
- Text: Oscuro sobre claro
- Dropdowns: Fondo claro con shadows sutiles

**⚠️ IMPORTANTE:**

- Usaremos **paleta Konecta existente** (Primary: #2A01CD)
- Aproximación visual al mockup, NO copia exacta
- Si quieren fidelidad exacta → diseños finalizados con paleta definida

**Tipografía observada:**

- Sans-serif moderna (Inter, Roboto, o similar)
- Logo "CYRA": Bold, sans-serif
- Labels: Regular weight
- No hay evidencia de fuentes custom → usaremos system fonts

---

## 📅 PLAN DÍA A DÍA

---

## 👥 Plan de Ejecución en Paralelo (2 Personas, Sin Bloqueos)

**Objetivo operativo:** Que Persona A y Persona B puedan avanzar en paralelo de lunes a jueves sin esperas críticas.

### Roles

- **Persona A (Infra + Servicios + Integración técnica):** configuración base, servicios core, optimización, testing técnico.
- **Persona B (UI + Layout + Experiencia demo):** componentes visuales, flujo de navegación, responsive, documentación demo.

### Reglas Anti-Bloqueo

- **Contrato primero:** definir interfaces compartidas al inicio de cada día (`Company`, `Project`, `SidebarItem`) para desacoplar implementación.
- **Fallback temporal:** si falta una dependencia (servicio/config), usar estado local temporal y reemplazar al integrar.
- **Integración en ventanas fijas:** 13:00 y 17:30 para merge/rebase y validación rápida.
- **Rama por persona:** `feature/persona-a-*` y `feature/persona-b-*` con PRs pequeñas.

### Distribución diaria por persona (formato operativo)

#### 🗓️ Lunes 16

**Persona A (Infra + Base técnica)**

- [ ] T1-T5: paleta, tipografía, estructura de carpetas, config Dropdown/Avatar
- [ ] Añadir configuración `Menubar` en plugin (`--p-menubar-*`)
- [ ] Crear base de `MockDataService`
- [ ] Añadir flag `environment.useMocks`
- [ ] Crear carpeta `src/app/core/mocks/` con estructura inicial

**Persona B (UI + Layout inicial)**

- [ ] T6: construir `HeaderComponent` usando `p-menubar` para menu-header
- [ ] T7: construir `ContextSelectorComponent` con estado local temporal
- [ ] T8: construir `SidebarComponent` estático inicial
- [ ] Añadir claves i18n para labels y aria-labels en `src/assets/i18n/es/common.json` y `src/assets/i18n/en/common.json`

**Sync del día (13:00 / 17:30)**

- [ ] A comparte contratos (`Company`, `Project`, `SidebarItem`)
- [ ] B valida que UI funciona sin esperar integración completa

**Entregable lunes:** Layout base visible + base de servicios preparada

---

#### 🗓️ Martes 17

**Persona A (Routing + Integración técnica)**

- [ ] T10: routing y lazy loading
- [ ] T12 técnico: limpiar `app.ts`, wiring de dependencias
- [ ] Validar tokens `--p-dropdown-*`, `--p-menubar-*`, `--p-avatar-*` en light/dark
- [ ] Validar estructura de módulos y navegación técnica

**Persona B (Layout principal + placeholders)**

- [ ] T9: `MainLayoutComponent`
- [ ] T11: placeholders de 5 módulos
- [ ] T12 visual: integración de layout y navegación visible (PrimeNG + Tailwind)

**Sync del día (13:00 / 17:30)**

- [ ] Validar rutas reales vs navegación UI
- [ ] Resolver desajustes de estructura/layout

**Entregable martes:** Layout completo navegable con 5 módulos placeholder

---

#### 🗓️ Miércoles 18

**Persona A (Servicios + datos mock)**

- [ ] T18: lazy load ECharts (si aplica)
- [ ] T18.1: completar `MockDataService`
- [ ] Crear mocks realistas e integrar con `ContextSelector`
- [ ] Ajustar variables plugin pendientes de overlay (`p-menu`) si se usa menú de avatar

**Persona B (Responsive + sidebar dinámico)**

- [ ] T16: responsive mobile/tablet
- [ ] T17: animaciones sutiles
- [ ] T18.2: `SidebarIconsService` + integración en `SidebarComponent`

**Sync del día (13:00 / 17:30)**

- [ ] B cambia de sidebar estático a dinámico sin rehacer UI
- [ ] A conecta ContextSelector a mocks sin romper UX

**Entregable miércoles:** Responsive funcional + contexto con mocks + sidebar dinámico

---

#### 🗓️ Jueves 19

**Persona A (Calidad técnica + estabilidad)**

- [ ] T21: testing técnico exhaustivo
- [ ] T22: fixes críticos funcionales
- [ ] Verificación final de build
- [ ] Verificación final de componentes PrimeNG (Dropdown, Menubar, Avatar)

**Persona B (Pulido + demo)**

- [ ] T23: pulido visual final
- [ ] T24: preparación de demo
- [ ] T25: ejecución demo y captura de feedback

**Sync del día (13:00 / 17:30)**

- [ ] Cierre de issues bloqueantes
- [ ] Ensayo final del flujo completo

**Entregable jueves:** Demo estable, ensayada y lista para presentar

### Dependencias Controladas (cero bloqueo)

- **ContextSelector** inicia con datos locales en Persona B y luego conecta a `MockDataService` cuando Persona A lo cierre.
- **Sidebar** inicia estático en Persona B y luego migra a `SidebarIconsService` sin rehacer UI.
- **Routing y MainLayout** avanzan en paralelo con contratos de rutas definidos al iniciar martes.
- **Testing** se divide: Persona A valida técnico/performance, Persona B valida UX/flujo demo.

---

## 🗓️ LUNES 16 DE FEBRERO - Setup & Estructura Base

**⏱️ Tiempo total:** 8-10 horas  
**🎯 Objetivo:** Estructura base, configuración UI y componentes principales

### Mañana (4-5 horas)

#### ✅ Tarea 1: Verificar Paleta Konecta Actual (10 min)

**Archivo:** `src/app/core/constants/colors.constants.ts`

**Acción:** Verificar que tenemos los valores actuales de Konecta

```typescript
// Paleta Konecta (ACTUAL - NO cambiar sin aprobación)
export const COLORS = {
  primary: { 500: '#2A01CD' }, // Konecta Blue
  surface: {
    0: '#ffffff',
    50: '#F2F3F7',
    900: '#262626',
    950: '#0F0F0F',
  },
  success: { 500: '#0E9F6E' },
  danger: { 500: '#F05252' },
  warning: { 500: '#F0FA00' },
  info: { 500: '#3b82f6' },
} as const;
```

**Mapeo de Colores Konecta → Elementos del Mockup:**

| Elemento del Mockup             | Dark Mode                                         | Light Mode                                 |
| ------------------------------- | ------------------------------------------------- | ------------------------------------------ |
| **Header Background**           | `surface-950` (#0F0F0F) con glassmorphism         | `surface-0` (#ffffff) con glassmorphism    |
| **Header Text/Icons**           | `surface-50` (#F2F3F7)                            | `surface-900` (#262626)                    |
| **Context Selector Background** | `surface-900/60` (semi-transparente)              | `surface-50/80` (semi-transparente)        |
| **Context Selector Text**       | `surface-50` (#F2F3F7)                            | `surface-900` (#262626)                    |
| **Sidebar Background**          | `surface-900` (#262626) con glassmorphism         | `surface-50` (#F2F3F7) con glassmorphism   |
| **Sidebar Icons**               | `surface-50` (#F2F3F7)                            | `surface-900` (#262626)                    |
| **Sidebar Active State**        | `primary-500` (#2A01CD) con texto blanco          | `primary-500` (#2A01CD) con texto blanco   |
| **Main Background Gradient**    | `surface-950` → `surface-900` (#0F0F0F → #262626) | `surface-50` → lighten (#F2F3F7 → #e8e9f0) |
| **Main Content Cards**          | `surface-900/40` (semi-transparente)              | `surface-0/60` (semi-transparente)         |
| **Text Primary**                | `surface-50` (#F2F3F7)                            | `surface-900` (#262626)                    |
| **Text Secondary**              | `surface-50` con `opacity-80`                     | `surface-900` con `opacity-70`             |
| **Borders**                     | `surface-900` o `surface-700`                     | `surface-50` o `surface-100`               |
| **Dropdown Focus**              | `primary-500` (#2A01CD)                           | `primary-500` (#2A01CD)                    |
| **Hover States**                | `surface-800` o `surface-950`                     | `surface-50` o `surface-100`               |

**Clases Tailwind que usaremos:**

```html
<!-- Ejemplos prácticos -->

<!-- Header -->
<header class="bg-surface-0/90 dark:bg-surface-950/90">
  <button class="text-surface-900 dark:text-surface-50">Icon</button>
</header>

<!-- Context Selector -->
<div class="bg-surface-50/80 dark:bg-surface-900/60">
  <label class="text-surface-900 dark:text-surface-50">Label</label>
</div>

<!-- Sidebar -->
<aside class="bg-surface-50 dark:bg-surface-900">
  <button
    class="hover:bg-surface-100 dark:hover:bg-surface-950
                 [&.active]:bg-primary-500 [&.active]:text-surface-0"
  >
    <lucide-icon class="text-surface-900 dark:text-surface-50" />
  </button>
</aside>

<!-- Main Content -->
<main
  class="bg-gradient-to-br from-surface-50 to-surface-100 
             dark:from-surface-950 dark:to-surface-900"
>
  <div class="bg-surface-0/60 dark:bg-surface-900/40 backdrop-blur-md">
    <h1 class="text-surface-900 dark:text-surface-50">Title</h1>
    <p class="text-surface-900/70 dark:text-surface-50/80">Text</p>
  </div>
</main>
```

**Acciones:**

- [ ] Leer `colors.constants.ts` y confirmar valores Konecta
- [ ] NO modificar colores
- [ ] Usar mapeo de colores arriba en todos los componentes
- [ ] Aproximación visual al mockup con paleta corporativa

---

#### ✅ Tarea 2: Configurar Tipografía System Font (30 min)

**Archivos:** `tailwind.config.ts`, `src/styles.css`

**Decisión:** Usar system fonts (no requiere carga, rápido, se ve bien)

```typescript
// tailwind.config.ts
fontFamily: {
  sans: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ],
}
```

**Ventaja:** Professional, rápido, sin carga. Si después nos dan fuente oficial, solo cambiamos este valor.

**Acciones:**

- [ ] Configurar system fonts en Tailwind
- [ ] Probar en navegadores (Chrome, Firefox, Edge)
- [ ] Documentar decisión

---

#### ✅ Tarea 3: Crear Estructura de Carpetas (30 min)

```bash
mkdir -p src/app/layout/{main-layout,header,context-selector,sidebar}
mkdir -p src/app/features/{dashboard,search,time-tracking,compliance,settings}
mkdir -p src/app/core/{models,services}
```

**Acciones:**

- [ ] Crear estructura completa de carpetas
- [ ] Preparar archivos `.gitkeep` si es necesario

---

#### ✅ Tarea 4: Configurar Dropdown en Plugin (45 min)

**Archivo:** `tailwind-css-variables.mjs`

**Necesario para Context Selector (2 dropdowns)**

Agregar al plugin (usando paleta Konecta):

```javascript
// Light mode (con paleta Konecta)
'--p-dropdown-background': colors.surface[0],        // #ffffff
'--p-dropdown-border-color': colors.surface[50],     // #F2F3F7
'--p-dropdown-hover-background': colors.surface[50], // #F2F3F7
'--p-dropdown-focus-border-color': colors.primary[500], // #2A01CD
'--p-dropdown-color': colors.surface[900],           // #262626
// Panel
'--p-dropdown-panel-background': colors.surface[0],
'--p-dropdown-panel-border-color': colors.surface[50],
'--p-dropdown-item-hover-background': colors.surface[50],
'--p-dropdown-item-selected-background': colors.primary[500],
'--p-dropdown-item-selected-color': colors.surface[0],

// Dark mode (con paleta Konecta)
'--p-dropdown-background': colors.surface[900],      // #262626
'--p-dropdown-border-color': colors.surface[900],
'--p-dropdown-hover-background': colors.surface[950], // #0F0F0F
'--p-dropdown-focus-border-color': colors.primary[500],
'--p-dropdown-color': colors.surface[50],            // #F2F3F7
// Panel dark
'--p-dropdown-panel-background': colors.surface[950],
'--p-dropdown-panel-border-color': colors.surface[900],
'--p-dropdown-item-hover-background': colors.surface[900],
'--p-dropdown-item-selected-background': colors.primary[500],
'--p-dropdown-item-selected-color': colors.surface[0],
```

**Acciones:**

- [ ] Agregar variables Dropdown al plugin
- [ ] Rebuild y verificar CSS generado
- [ ] Testing rápido con dropdown test

---

#### ✅ Tarea 5: Configurar Avatar en Plugin (20 min)

**Archivo:** `tailwind-css-variables.mjs`

```javascript
// Light mode (paleta Konecta)
'--p-avatar-background': colors.surface[50],   // #F2F3F7
'--p-avatar-color': colors.surface[900],       // #262626
'--p-avatar-border-color': colors.surface[50],

// Dark mode (paleta Konecta)
'--p-avatar-background': colors.surface[900],  // #262626
'--p-avatar-color': colors.surface[50],        // #F2F3F7
'--p-avatar-border-color': colors.surface[900],
```

**Acciones:**

- [ ] Agregar variables Avatar al plugin
- [ ] Rebuild y verificar

---

#### ✅ Tarea 5.1: Configurar Menubar en Plugin (40 min)

**Archivo:** `tailwind-css-variables.mjs`

**Necesario para menu-header (PrimeNG Menubar)**

```javascript
// Light mode (paleta Konecta)
'--p-menubar-background': colors.surface[0],
'--p-menubar-border-color': colors.surface[50],
'--p-menubar-color': colors.surface[900],
'--p-menubar-item-focus-background': colors.surface[50],
'--p-menubar-item-active-background': colors.primary[500],
'--p-menubar-item-active-color': colors.surface[0],

// Dark mode (paleta Konecta)
'--p-menubar-background': colors.surface[900],
'--p-menubar-border-color': colors.surface[900],
'--p-menubar-color': colors.surface[50],
'--p-menubar-item-focus-background': colors.surface[950],
'--p-menubar-item-active-background': colors.primary[500],
'--p-menubar-item-active-color': colors.surface[0],
```

**Acciones:**

- [ ] Agregar variables Menubar al plugin
- [ ] Rebuild y verificar CSS generado
- [ ] Testing visual del header menu en light/dark

---

### Tarde (4-5 horas)

#### ✅ Tarea 6: HeaderComponent (2.5 horas)

**Archivo:** `src/app/layout/header/header.component.ts`

**Template básico (PrimeNG-first):**

```html
<header
  class="sticky top-0 z-50 border-b backdrop-blur-md
               bg-surface-0/90 dark:bg-surface-950/90
               border-surface-100 dark:border-surface-700"
>
  <div class="max-w-full mx-auto px-6 py-3 flex items-center justify-between">
    <!-- Logo -->
    <h1 class="text-2xl font-bold">CYRA</h1>

    <div class="flex items-center gap-4">
      <!-- Menu header -->
      <p-menubar [model]="headerMenuItems" styleClass="border-0 bg-transparent" />

      <!-- Action icons complementarios (Lucide) -->
      <button
        [attr.aria-label]="'layout.header.actions.chat' | translate"
        class="p-2 hover:bg-surface-50 dark:hover:bg-surface-800 rounded-lg"
      >
        <lucide-icon name="message-square" [size]="20" />
      </button>

      <!-- Avatar PrimeNG -->
      <p-avatar image="/assets/avatars/user-placeholder.jpg" shape="circle" size="large" />
    </div>
  </div>
</header>
```

**Acciones:**

- [ ] Crear HeaderComponent (standalone)
- [ ] Importar PrimeNG Menubar para menu-header
- [ ] Importar Lucide icons específicos (no módulo completo)
- [ ] Importar PrimeNG Avatar
- [ ] Implementar template con estilos glassmorphism
- [ ] Validar colores del Menubar con tokens del plugin (light/dark)
- [ ] Testing visual en light/dark

---

#### ✅ Tarea 7: ContextSelectorComponent (1.5 horas)

**Archivo:** `src/app/layout/context-selector/context-selector.component.ts`

**Template:**

```html
<div
  class="sticky top-[64px] z-40 border-b backdrop-blur-md
            bg-surface-50/80 dark:bg-surface-900/60
            border-surface-100 dark:border-surface-700"
>
  <div class="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
    <div class="flex items-center gap-2">
      <label class="font-medium opacity-80">Compañía:</label>
      <p-dropdown
        [options]="companies()"
        [(ngModel)]="selectedCompany"
        optionLabel="name"
        placeholder="Seleccionar compañía"
        class="w-64"
      />
    </div>

    <div class="flex items-center gap-2">
      <label class="font-medium opacity-80">Proyecto:</label>
      <p-dropdown
        [options]="filteredProjects()"
        [(ngModel)]="selectedProject"
        optionLabel="name"
        placeholder="Seleccionar proyecto"
        [disabled]="!selectedCompany()"
        class="w-64"
      />
    </div>
  </div>
</div>
```

**Mock data:**

```typescript
companies = signal([
  { id: '1', name: 'Global Corp' },
  { id: '2', name: 'Tech Solutions' },
  { id: '3', name: 'Innovation Labs' },
]);

projects = signal([
  { id: '1', name: 'Piloto VoC 2026', companyId: '1' },
  { id: '2', name: 'Digital Transformation', companyId: '1' },
  { id: '3', name: 'AI Platform', companyId: '2' },
  { id: '4', name: 'Cloud Migration', companyId: '2' },
  { id: '5', name: 'Research Project', companyId: '3' },
]);
```

**Acciones:**

- [ ] Crear ContextSelectorComponent
- [ ] Implementar lógica de filtrado de proyectos por compañía
- [ ] Mock data de compañías y proyectos
- [ ] Testing de interacción (filtrado funciona)

---

#### ✅ Tarea 8: SidebarComponent con iconos Lucide (1 hora)

**Archivo:** `src/app/layout/sidebar/sidebar.component.ts`

**Template (con opción de ocultar/mostrar):**

```html
<aside
  class="border-r backdrop-blur-md transition-all duration-200
              bg-surface-0/95 dark:bg-surface-900/95
              border-surface-100 dark:border-surface-700"
  [class.w-20]="!isSidebarCollapsed()"
  [class.w-0]="isSidebarCollapsed()"
  [class.overflow-hidden]="isSidebarCollapsed()"
>
  <div class="p-2 flex justify-end">
    <button
      type="button"
      (click)="toggleSidebar()"
      class="w-8 h-8 flex items-center justify-center rounded-md
             hover:bg-surface-50 dark:hover:bg-surface-800"
      [attr.aria-label]="isSidebarCollapsed() ? ('layout.sidebar.toggleOpen' | translate) : ('layout.sidebar.toggleClose' | translate)"
    >
      <lucide-icon
        [name]="isSidebarCollapsed() ? 'panel-left-open' : 'panel-left-close'"
        [size]="18"
      />
    </button>
  </div>

  <nav class="flex flex-col items-center py-6 gap-4" [class.hidden]="isSidebarCollapsed()">
    <button
      class="w-12 h-12 flex items-center justify-center rounded-lg
             hover:bg-surface-50 dark:hover:bg-surface-800
             transition-colors duration-200"
      [class.bg-primary-500]="isActive('/dashboard')"
      [class.text-surface-0]="isActive('/dashboard')"
    >
      <lucide-icon name="layout-dashboard" [size]="24" />
    </button>

    <button
      class="w-12 h-12 flex items-center justify-center rounded-lg
                   hover:bg-surface-50 dark:hover:bg-surface-800"
    >
      <lucide-icon name="search" [size]="24" />
    </button>

    <button
      class="w-12 h-12 flex items-center justify-center rounded-lg
                   hover:bg-surface-50 dark:hover:bg-surface-800"
    >
      <lucide-icon name="clock" [size]="24" />
    </button>

    <button
      class="w-12 h-12 flex items-center justify-center rounded-lg
                   hover:bg-surface-50 dark:hover:bg-surface-800"
    >
      <lucide-icon name="scale" [size]="24" />
    </button>

    <button
      class="w-12 h-12 flex items-center justify-center rounded-lg
                   hover:bg-surface-50 dark:hover:bg-surface-800"
    >
      <lucide-icon name="settings" [size]="24" />
    </button>
  </nav>
</aside>
```

**Lógica mínima (signals):**

```typescript
isSidebarCollapsed = signal(false);

toggleSidebar(): void {
  this.isSidebarCollapsed.update((collapsed) => !collapsed);
}
```

**Comportamiento esperado en responsive (misma UX):**

- Desktop/Tablet: `toggleSidebar()` colapsa/expande el panel lateral.
- Mobile: el mismo patrón abrir/cerrar se aplica en formato drawer.
- La interacción del usuario es la misma en todos los breakpoints; solo cambia la presentación visual.

**Acciones:**

- [ ] Crear SidebarComponent
- [ ] Importar iconos Lucide específicos
- [ ] Implementar estados hover y active
- [ ] Añadir toggle para ocultar/mostrar sidebar
- [ ] Persistir preferencia de colapso (localStorage) si da tiempo
- [ ] Verificar mismo comportamiento funcional en desktop/tablet/mobile
- [ ] Testing visual

---

## 🗓️ MARTES 17 DE FEBRERO - Layout Principal & Routing

**⏱️ Tiempo total:** 8-10 horas  
**🎯 Objetivo:** MainLayout integrado, routing configurado, background gradient

### Mañana (4-5 horas)

#### ✅ Tarea 9: MainLayoutComponent (2 horas)

**Archivo:** `src/app/layout/main-layout/main-layout.component.ts`

**Template:**

```html
<div class="min-h-screen flex flex-col" [style.background]="backgroundGradient()">
  <!-- Overlay para legibilidad -->
  <div
    class="fixed inset-0 backdrop-blur-sm
              bg-surface-0/10 dark:bg-surface-950/20
              pointer-events-none z-0"
  ></div>

  <!-- Layout -->
  <div class="relative z-10 flex flex-col min-h-screen">
    <app-header />

    <app-context-selector />

    <div class="flex flex-1">
      <app-sidebar />

      <main class="flex-1 p-6">
        <!-- Content wrapper con glassmorphism -->
        <div
          class="rounded-xl backdrop-blur-md
                    bg-surface-0/60 dark:bg-surface-900/40
                    border border-surface-100/50 dark:border-surface-700/50
                    shadow-2xl p-8 min-h-full"
        >
          <router-outlet />
        </div>
      </main>
    </div>
  </div>
</div>
```

**Component TS:**

```typescript
backgroundGradient = computed(() => {
  const isDark = this.themeService.isDark();

  if (isDark) {
    // Gradient oscuro con paleta Konecta (aproximación al mockup)
    return 'linear-gradient(135deg, #0F0F0F 0%, #262626 50%, #1a1a2e 100%)';
  } else {
    // Gradient claro suave
    return 'linear-gradient(135deg, #F2F3F7 0%, #e8e9f0 50%, #d8d9e8 100%)';
  }
});
```

**Acciones:**

- [ ] Crear MainLayoutComponent
- [ ] Integrar Header, ContextSelector, Sidebar
- [ ] Implementar background gradient reactivo (dark/light)
- [ ] Glassmorphism effects con backdrop-blur
- [ ] Testing visual completo

---

#### ✅ Tarea 10: Routing Configuration (1.5 horas)

**Archivo:** `src/app/app.routes.ts`

```typescript
export const routes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./features/search/search.component').then((m) => m.SearchComponent),
      },
      {
        path: 'time',
        loadComponent: () =>
          import('./features/time-tracking/time.component').then((m) => m.TimeComponent),
      },
      {
        path: 'compliance',
        loadComponent: () =>
          import('./features/compliance/compliance.component').then((m) => m.ComplianceComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component').then((m) => m.SettingsComponent),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
```

**Acciones:**

- [ ] Configurar rutas con lazy loading
- [ ] Crear componentes placeholder para cada módulo
- [ ] Verificar lazy loading funciona (bundle splits)

---

#### ✅ Tarea 11: Componentes Placeholder para Módulos (1 hora)

**Archivos:** 5 componentes en `features/`

Template genérico para cada uno:

```typescript
@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="opacity-80">Módulo Dashboard - Contenido en desarrollo</p>
      <div class="grid grid-cols-3 gap-4 mt-8">
        <div class="p-6 rounded-lg bg-surface-50 dark:bg-surface-800">
          <h3 class="font-semibold mb-2">Card 1</h3>
          <p class="opacity-70">Placeholder content</p>
        </div>
        <!-- Más cards -->
      </div>
    </div>
  `,
})
export class DashboardComponent {}
```

**Acciones:**

- [ ] Crear 5 componentes placeholder
- [ ] Template simple con título y cards de ejemplo
- [ ] Verificar navegación funciona entre módulos

---

### Tarde (4-5 horas)

#### ✅ Tarea 12: Integración Completa (2 horas)

**Archivo:** `src/app/app.ts`

**Limpiar app.ts actual:**

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  providers: [MessageService],
  template: `<router-outlet />`,
})
export class App {
  constructor() {
    // Cargar traducciones
    const translate = inject(TranslateService);
    translate.setDefaultLang('es');
    translate.use('es');

    // Cargar tema guardado
    const theme = inject(ThemeService);
    theme.initialize();
  }
}
```

**Acciones:**

- [ ] Limpiar app.ts (remover demos)
- [ ] Mover ChartComponent demo a features si quieren mantenerlo
- [ ] Mover TreeDemo a features si quieren mantenerlo
- [ ] Verificar app carga con MainLayout

---

#### ✅ Tarea 13: Fix Lucide Icons (Bundle Optimization) (30 min)

**Ya que tocamos imports, aprovechar para optimizar**

Remover `LucideAngularModule`, importar solo componentes:

```typescript
// ANTES ❌
import { LucideAngularModule } from 'lucide-angular';

// DESPUÉS ✅
import {
  MessageSquare,
  CheckSquare,
  Users,
  Settings,
  LayoutDashboard,
  Search,
  Clock,
  Scale,
} from 'lucide-angular';

@Component({
  imports: [
    MessageSquare,
    CheckSquare,
    // ... cada icono individual
  ]
})
```

**Acciones:**

- [ ] Actualizar imports en todos los componentes
- [ ] Rebuild y verificar bundle size
- [ ] Target: Reducción de ~2.3 MB

---

#### ✅ Tarea 14: Testing Completo Light/Dark (1.5 horas)

**Checklist de testing:**

- [ ] Header se ve bien en light mode
- [ ] Header se ve bien en dark mode
- [ ] Context Selector funciona en ambos modos
- [ ] Menubar mantiene estados hover/active correctos en ambos modos
- [ ] Sidebar iconos visibles en ambos modos
- [ ] Highlight de ruta activa funciona
- [ ] Dropdowns se abren correctamente
- [ ] Avatar y overlays de menú respetan tokens de paleta Konecta
- [ ] Glassmorphism effects se ven bien
- [ ] Background gradient correcto en ambos modos
- [ ] Navegación entre módulos funciona
- [ ] Theme toggle funciona sin flickering
- [ ] Testing en Chrome, Firefox, Edge
- [ ] Testing responsive básico (desktop, tablet)
- [ ] Sidebar mantiene el mismo comportamiento de abrir/cerrar en desktop, tablet y mobile

**Acciones:**

- [ ] Testing sistemático de toda la UI
- [ ] Screenshots de ambos modos
- [ ] Documentar issues encontrados
- [ ] Fix de issues críticos

---

#### ✅ Tarea 15: Refinamiento Visual (1.5 horas)

**Focus en detalles del mockup:**

- [ ] Ajustar opacidades de glassmorphism
- [ ] Verificar border-radius match mockup
- [ ] Ajustar spacing (padding, gaps)
- [ ] Verificar shadows sutiles
- [ ] Ajustar hover states
- [ ] Smooth transitions en cambios de tema
- [ ] Verificar contraste de texto (accesibilidad)

---

## 🗓️ MIÉRCOLES 18 DE FEBRERO - Pulido & Responsive

**⏱️ Tiempo total:** 8-10 horas  
**🎯 Objetivo:** Responsive, animaciones, detalles finales

### Mañana (4-5 horas)

#### ✅ Tarea 16: Responsive Mobile/Tablet (3 horas)

**Mobile (<768px):**

- [ ] Header: Logo + hamburger menu
- [ ] Context Selector: Full width, stack vertical
- [ ] Sidebar: Hidden, mostrar en drawer/modal
- [ ] Main content: Full width, menos padding

**Template mobile sidebar:**

```html
<!-- Mobile menu button -->
@if (isMobile()) {
<button
  (click)="toggleSidebar()"
  [attr.aria-label]="'layout.sidebar.toggleOpen' | translate"
  class="md:hidden p-2"
>
  <lucide-icon name="menu" [size]="24" />
</button>
}

<!-- Mobile sidebar drawer -->
@if (isMobileSidebarOpen()) {
<div class="fixed inset-0 z-50 md:hidden">
  <!-- Overlay -->
  <div class="absolute inset-0 bg-surface-950/50" (click)="toggleSidebar()"></div>

  <!-- Drawer -->
  <aside
    class="absolute left-0 top-0 bottom-0 w-64
                  bg-surface-0 dark:bg-surface-900"
  >
    <!-- Sidebar content -->
  </aside>
</div>
}
```

**Nota de implementación:**

- Mantener API única de interacción (`toggleSidebar`) y resolver internamente si se colapsa panel (desktop/tablet) o drawer (mobile).
- Reutilizar labels accesibles y estados visuales equivalentes en todos los tamaños.

**Acciones:**

- [ ] Implementar breakpoints responsive
- [ ] Mobile sidebar como drawer (mismo patrón abrir/cerrar)
- [ ] Ajustar spacing para mobile
- [ ] Unificar handlers de sidebar entre desktop y mobile
- [ ] Validar traducciones de aria-labels en desktop/mobile (`es` y `en`)
- [ ] Testing en dispositivos reales/DevTools

---

#### ✅ Tarea 17: Animaciones Sutiles (1 hora)

**Transiciones suaves:**

```css
/* Layout transitions */
.theme-transitioning * {
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease !important;
}

/* Hover effects */
button,
a {
  transition: all 0.2s ease;
}

/* Sidebar active state */
.sidebar-item.active {
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}
```

**Acciones:**

- [ ] Agregar transitions a `styles.css`
- [ ] Hover effects en botones
- [ ] Theme toggle sin flickering
- [ ] Testing de performance

---

### Tarde (4-5 horas)

#### ✅ Tarea 18: Lazy Load ECharts (30 min)

**Si mantienen el ChartComponent demo:**

```typescript
// chart.component.ts
private chart?: any;

async ngAfterViewInit() {
  const echarts = await import('echarts');
  this.chart = echarts.init(this.container.nativeElement);
  // ...
}
```

**Acciones:**

- [ ] Lazy load ECharts si se usa
- [ ] Rebuild y verificar bundle
- [ ] Target: -3.5 MB adicionales

---

### 🔧 TAREAS OPCIONALES (Si hay tiempo - Trabajo en Paralelo)

**⚠️ IMPORTANTE:** Estas tareas NO son críticas para el demo del jueves. Solo implementar si hay tiempo disponible después de completar las tareas principales.

#### ✅ Tarea 18.1 (OPCIONAL): MockDataService para Desarrollo Sin Backend (1.5 horas)

**👤 Asignado:** Persona A  
**📋 Prioridad:** OPCIONAL - No bloquea demo

**Objetivo:** Sistema centralizado para servir datos mock en desarrollo

**1. Crear MockDataService (45 min)**

**Archivo:** `src/app/core/services/mock-data.service.ts`

```typescript
import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private useMocks = signal(environment.useMocks ?? true);

  // Simular latencia de red
  private randomDelay() {
    return Math.random() * 500 + 200; // 200-700ms
  }

  getCompanies(): Observable<Company[]> {
    return of(MOCK_COMPANIES).pipe(delay(this.randomDelay()));
  }

  getProjectsByCompany(companyId: string): Observable<Project[]> {
    return of(MOCK_PROJECTS.filter((p) => p.companyId === companyId)).pipe(
      delay(this.randomDelay()),
    );
  }

  getDashboardStats(): Observable<DashboardStats> {
    return of(MOCK_DASHBOARD_STATS).pipe(delay(this.randomDelay()));
  }

  getUsers(): Observable<User[]> {
    return of(MOCK_USERS).pipe(delay(this.randomDelay()));
  }
}
```

**2. Crear archivos de mock data (30 min)**

**Crear carpeta:** `src/app/core/mocks/`

**Archivo:** `src/app/core/mocks/companies.mock.ts`

```typescript
export interface Company {
  id: string;
  name: string;
  industry?: string;
}

export const MOCK_COMPANIES: Company[] = [
  { id: '1', name: 'Global Corp', industry: 'Technology' },
  { id: '2', name: 'Tech Solutions', industry: 'Software' },
  { id: '3', name: 'Innovation Labs', industry: 'Research' },
  { id: '4', name: 'Digital Systems', industry: 'IT Services' },
  { id: '5', name: 'Future Enterprises', industry: 'Consulting' },
];
```

**Archivo:** `src/app/core/mocks/projects.mock.ts`

```typescript
export interface Project {
  id: string;
  name: string;
  companyId: string;
  status: 'active' | 'paused' | 'completed';
}

export const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Piloto VoC 2026', companyId: '1', status: 'active' },
  { id: '2', name: 'Digital Transformation', companyId: '1', status: 'active' },
  { id: '3', name: 'AI Platform Development', companyId: '2', status: 'active' },
  { id: '4', name: 'Cloud Migration', companyId: '2', status: 'paused' },
  { id: '5', name: 'Mobile App Redesign', companyId: '2', status: 'active' },
  { id: '6', name: 'Research Initiative 2026', companyId: '3', status: 'active' },
  { id: '7', name: 'Data Analytics Platform', companyId: '3', status: 'completed' },
  { id: '8', name: 'Infrastructure Upgrade', companyId: '4', status: 'active' },
  { id: '9', name: 'Security Audit Project', companyId: '4', status: 'active' },
  { id: '10', name: 'Strategic Planning 2027', companyId: '5', status: 'active' },
];
```

**Archivo:** `src/app/core/mocks/users.mock.ts`

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Ana García', email: 'ana.garcia@example.com', role: 'Admin' },
  { id: '2', name: 'Carlos López', email: 'carlos.lopez@example.com', role: 'Manager' },
  { id: '3', name: 'María González', email: 'maria.gonzalez@example.com', role: 'User' },
  { id: '4', name: 'José Martínez', email: 'jose.martinez@example.com', role: 'User' },
  { id: '5', name: 'Laura Sánchez', email: 'laura.sanchez@example.com', role: 'Viewer' },
];
```

**Archivo:** `src/app/core/mocks/dashboard.mock.ts`

```typescript
export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedTasks: number;
  teamMembers: number;
}

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalProjects: 42,
  activeProjects: 18,
  completedTasks: 256,
  teamMembers: 127,
};
```

**3. Añadir flag de environment (10 min)**

**Archivo:** `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  useMocks: true, // Cambiar a false cuando haya backend real
};
```

**Archivo:** `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  useMocks: false,
};
```

**4. Integración con ContextSelectorComponent (15 min)**

**Actualizar:** `src/app/layout/context-selector/context-selector.component.ts`

```typescript
import { MockDataService } from '../../core/services/mock-data.service';

export class ContextSelectorComponent {
  private mockDataService = inject(MockDataService);

  companies = signal<Company[]>([]);
  projects = signal<Project[]>([]);

  ngOnInit() {
    // Cargar compañías desde mock service
    this.mockDataService.getCompanies().subscribe((companies) => {
      this.companies.set(companies);
    });
  }

  onCompanyChange(companyId: string) {
    // Cargar proyectos filtrados
    this.mockDataService.getProjectsByCompany(companyId).subscribe((projects) => {
      this.projects.set(projects);
    });
  }
}
```

**Acciones:**

- [ ] Crear MockDataService con métodos básicos
- [ ] Crear 4 archivos de mock data (companies, projects, users, dashboard)
- [ ] Añadir environment.useMocks flag
- [ ] Integrar con ContextSelectorComponent
- [ ] Testing: Verificar dropdowns usan mock data
- [ ] Testing: Verificar delay simulado funciona

**🎯 Resultado esperado:**

- ✅ Desarrollo frontend sin dependencia de backend
- ✅ Datos consistentes y realistas
- ✅ Fácil switch entre mock/real API cambiando flag
- ✅ Context Selector carga datos de mock service

---

#### ✅ Tarea 18.2 (OPCIONAL): SidebarIconsService para Iconos Dinámicos (1 hora)

**👤 Asignado:** Persona B  
**📋 Prioridad:** OPCIONAL - No bloquea demo

**Objetivo:** Gestionar iconos del sidebar dinámicamente según módulo activo

**1. Crear SidebarIconsService (30 min)**

**Archivo:** `src/app/core/services/sidebar-icons.service.ts`

```typescript
import { Injectable, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  LayoutDashboard,
  Search,
  Clock,
  Scale,
  Settings,
  BarChart3,
  FileText,
  Users,
  Filter,
  Bookmark,
  Calendar,
  CheckSquare,
  LucideIconData,
} from 'lucide-angular';

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIconData;
  route: string;
  badge?: string | number;
}

export interface SidebarConfig {
  moduleId: string;
  items: SidebarItem[];
}

@Injectable({ providedIn: 'root' })
export class SidebarIconsService {
  private router = inject(Router);

  // Detectar módulo activo desde URL
  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
  );

  // Configuración de iconos por módulo
  private sidebarConfigs: Record<string, SidebarConfig> = {
    dashboard: {
      moduleId: 'dashboard',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, route: '/dashboard/overview' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, route: '/dashboard/analytics' },
        { id: 'reports', label: 'Reports', icon: FileText, route: '/dashboard/reports' },
        { id: 'users', label: 'Users', icon: Users, route: '/dashboard/users' },
      ],
    },
    search: {
      moduleId: 'search',
      items: [
        { id: 'simple', label: 'Simple Search', icon: Search, route: '/search/simple' },
        { id: 'advanced', label: 'Advanced', icon: Filter, route: '/search/advanced' },
        { id: 'saved', label: 'Saved Searches', icon: Bookmark, route: '/search/saved' },
      ],
    },
    time: {
      moduleId: 'time',
      items: [
        { id: 'tracker', label: 'Time Tracker', icon: Clock, route: '/time/tracker' },
        { id: 'calendar', label: 'Calendar', icon: Calendar, route: '/time/calendar' },
        { id: 'reports', label: 'Reports', icon: FileText, route: '/time/reports' },
      ],
    },
    compliance: {
      moduleId: 'compliance',
      items: [
        { id: 'overview', label: 'Overview', icon: Scale, route: '/compliance/overview' },
        { id: 'tasks', label: 'Tasks', icon: CheckSquare, route: '/compliance/tasks' },
        { id: 'reports', label: 'Reports', icon: FileText, route: '/compliance/reports' },
      ],
    },
    settings: {
      moduleId: 'settings',
      items: [
        { id: 'general', label: 'General', icon: Settings, route: '/settings/general' },
        { id: 'users', label: 'Users', icon: Users, route: '/settings/users' },
      ],
    },
  };

  // Detectar módulo activo desde URL
  private activeModule = computed(() => {
    const url = this.currentUrl() || '';
    const module = url.split('/')[1]; // Extrae primer segmento
    return module || 'dashboard';
  });

  // Items del sidebar según módulo activo
  currentSidebarItems = computed(() => {
    const module = this.activeModule();
    return this.sidebarConfigs[module]?.items || [];
  });

  // Obtener config de un módulo específico
  getSidebarConfig(moduleId: string): SidebarConfig | undefined {
    return this.sidebarConfigs[moduleId];
  }

  // Actualizar badge dinámicamente (ej: notificaciones)
  updateBadge(moduleId: string, itemId: string, badge: string | number): void {
    const config = this.sidebarConfigs[moduleId];
    if (config) {
      const item = config.items.find((i) => i.id === itemId);
      if (item) {
        item.badge = badge;
      }
    }
  }
}
```

**2. Integrar con SidebarComponent (20 min)**

**Actualizar:** `src/app/layout/sidebar/sidebar.component.ts`

```typescript
import { SidebarIconsService } from '../../core/services/sidebar-icons.service';

export class SidebarComponent {
  private sidebarIconsService = inject(SidebarIconsService);
  private router = inject(Router);

  // Items reactivos del sidebar
  sidebarItems = this.sidebarIconsService.currentSidebarItems;

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}
```

**Template actualizado:**

```html
<aside
  class="w-20 border-r backdrop-blur-md
              bg-surface-0/95 dark:bg-surface-900/95
              border-surface-100 dark:border-surface-700"
>
  <nav class="flex flex-col items-center py-6 gap-4">
    @for (item of sidebarItems(); track item.id) {
    <button
      [routerLink]="item.route"
      [attr.aria-label]="item.label | translate"
      class="relative w-12 h-12 flex items-center justify-center rounded-lg
               hover:bg-surface-50 dark:hover:bg-surface-800
               transition-colors duration-200"
      [class.bg-primary-500]="isActive(item.route)"
      [class.text-surface-0]="isActive(item.route)"
    >
      <lucide-icon [img]="item.icon" [size]="24" />

      @if (item.badge) {
      <span
        class="absolute -top-1 -right-1 w-5 h-5 bg-danger-500 
                       text-surface-0 text-xs rounded-full 
                       flex items-center justify-center font-semibold"
      >
        {{ item.badge }}
      </span>
      }
    </button>
    }
  </nav>
</aside>
```

**Nota i18n:**

- En este ejemplo, `item.label` debe ser una clave de traducción (p.ej. `layout.sidebar.items.overview`).

**3. Testing (10 min)**

**Acciones de testing:**

- [ ] Navegar a /dashboard → Verificar iconos cambian
- [ ] Navegar a /search → Verificar iconos cambian
- [ ] Navegar a /time → Verificar iconos cambian
- [ ] Verificar active state se aplica correctamente
- [ ] Verificar aria-labels traducidos (`es` y `en`)
- [ ] Testing de badges (añadir badge manualmente para probar)

**Acciones:**

- [ ] Crear SidebarIconsService con configuraciones por módulo
- [ ] Implementar computed para items reactivos según URL
- [ ] Integrar con SidebarComponent
- [ ] Actualizar template para usar items dinámicos
- [ ] Agregar soporte para badges (notificaciones)
- [ ] Testing: Navegar entre módulos y verificar iconos cambian

**🎯 Resultado esperado:**

- ✅ Sidebar dinámico según módulo activo
- ✅ Configuración centralizada y mantenible
- ✅ Fácil agregar/modificar iconos por módulo
- ✅ Soporte para badges (notificaciones, contadores)
- ✅ UX mejorada con contexto visual por módulo

---

### 📋 Decisión sobre Tareas Opcionales

**Miércoles por la tarde (14:00-18:00):**

1. **Si van adelantados** (todas las tareas críticas completas):
   - ✅ Persona A: Tarea 18.1 MockDataService (1.5h)
   - ✅ Persona B: Tarea 18.2 SidebarIconsService (1h)
   - ✅ Ambos pueden ayudar luego con Tarea 19 y 20

2. **Si van justos de tiempo**:
   - ❌ Skip tareas opcionales
   - ✅ Seguir directo a Tarea 19 (Preparar respuestas PO)
   - ✅ Priorizar screenshots y testing para el jueves

3. **Si van muy atrasados**:
   - ❌ Skip tareas opcionales completamente
   - ⚠️ Considerar recortar animaciones o responsive mobile
   - ✅ Focus 100% en demo funcional desktop dark/light

**⚠️ REGLA DE ORO:** Estas tareas son mejoras de calidad de vida pero **NO bloquean el demo**. Solo implementar si hay tiempo sobrante.

---

#### ✅ Tarea 19: Preparar para Respuestas del PO (2 horas)

**Crear sistema de "easy update" para cuando reciban respuestas:**

**Documento:** `COMO-ACTUALIZAR-DESPUES-DEMO.md`

````markdown
# Cómo Actualizar Tipografía Post-Demo

## IMPORTANTE: Colores NO se cambiarán

**Decisión del equipo:**

- Usamos paleta corporativa Konecta (ya aprobada)
- NO extraer colores de mockups
- Si necesitan paleta diferente → diseño finalizado con paleta oficial

## Cuando nos dé la tipografía oficial:

1. Si es Google Font:
   - Agregar preconnect y link en `src/index.html`:
     ```html
     <link rel="preconnect" href="https://fonts.googleapis.com" />
     <link
       href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
       rel="stylesheet"
     />
     ```
   - Actualizar `tailwind.config.ts`:
     ```typescript
     fontFamily: {
       sans: ['Inter', 'sans-serif'],
     }
     ```
2. Si es custom:
   - Colocar archivos (.woff2/.woff) en `public/fonts/`
   - Definir @font-face en `src/styles.css`:
     ```css
     @font-face {
       font-family: 'CustomFont';
       src: url('/fonts/custom-font.woff2') format('woff2');
       font-weight: 400;
       font-style: normal;
     }
     ```
   - Preload en `src/index.html`
   - Actualizar `tailwind.config.ts`

3. `pnpm build`

## Testing post-update:

- [ ] Font carga correctamente
- [ ] Todos los pesos disponibles
- [ ] Cross-browser (Chrome, Firefox, Edge)
- [ ] Performance (sin FOUT/FOIT excesivo)
````

**Acciones:**

- [ ] Crear guía de actualización
- [ ] Documentar proceso
- [ ] Preparar "quick update checklist"

---

#### ✅ Tarea 20: Screenshots & Documentación Demo (2 horas)

**Para la presentación del jueves:**

**Screenshots necesarios:**

- [ ] Desktop Dark - Overview completo
- [ ] Desktop Dark - Cada módulo
- [ ] Desktop Light - Overview completo
- [ ] Desktop Light - Cada módulo
- [ ] Mobile Dark - Responsive
- [ ] Mobile Light - Responsive
- [ ] Dropdown abierto mostrando opciones
- [ ] Sidebar hover states
- [ ] Theme toggle animation

**Documento demo:**

```markdown
# Demo Layout CYRA - Jueves 19 Febrero

## Implementado ✅

- Layout completo con Header, Context Selector, Sidebar
- 5 módulos con lazy loading
- Dark/Light mode funcional
- Responsive (desktop, tablet, mobile)
- Glassmorphism effects
- Navegación entre módulos
- Dropdowns funcionales con mockdata
- **Paleta corporativa Konecta** (Primary: #2A01CD)

## Decisiones de diseño

- ✅ Colores: Paleta Konecta (corporativa, no cambiar)
- ⏳ Tipografía: System fonts (pendiente especificación oficial)
- 📋 Si necesitan cambios de color → diseño finalizado, no mockup

## Pendiente de confirmar ⏳

- Tipografía oficial (actualmente usando system fonts profesionales)
- Funcionalidades específicas de action buttons
- Content y features de cada módulo

## Próximos pasos tras demo

- Integrar tipografía custom si nos la proporcionan
- Implementar features de cada módulo
- Refinamiento basado en feedback
```

**Acciones:**

- [ ] Tomar screenshots de calidad
- [ ] Crear presentación/documento demo
- [ ] Preparar puntos de discusión con PO

---

## 🗓️ JUEVES 19 DE FEBRERO - Testing Final & Demo

**⏱️ Tiempo total:** 8 horas hasta demo  
**🎯 Objetivo:** Testing exhaustivo, fixes, demo perfecta

### Mañana (4 horas)

#### ✅ Tarea 21: Testing Exhaustivo (2.5 horas)

**Testing sistemático:**

**Funcionalidad:**

- [ ] Navegación entre 5 módulos
- [ ] Context Selector: filtrado de proyectos
- [ ] Theme toggle: dark ↔ light
- [ ] Lazy loading: verificar network tab
- [ ] Routing: URLs correctas
- [ ] Browser back/forward funciona
- [ ] Responsive: 3 breakpoints
- [ ] Mobile sidebar drawer
- [ ] Dropdowns: open/close/select

**Visual:**

- [ ] Glassmorphism effects
- [ ] Background gradients
- [ ] Borders y shadows
- [ ] Hover states
- [ ] Active states (sidebar)
- [ ] Text contrast (accesibilidad)
- [ ] Iconos visibles
- [ ] Avatar display

**Cross-browser:**

- [ ] Chrome
- [ ] Firefox
- [ ] Edge
- [ ] Safari (si disponible)

**Performance:**

- [ ] Bundle size ≤ 500KB inicial
- [ ] Lazy chunks se cargan
- [ ] No memory leaks
- [ ] Smooth animations

---

#### ✅ Tarea 22: Fix de Issues Críticos (1.5 horas)

**Priorizar:**

1. Issues que bloquean la demo
2. Issues visuales evidentes
3. Issues de usabilidad

**Acciones:**

- [ ] Lista de issues encontrados
- [ ] Priorización
- [ ] Fix de críticos
- [ ] Re-testing

---

### Tarde (4 horas hasta demo)

#### ✅ Tarea 23: Pulido Final (1.5 horas)

**Últimos ajustes:**

- [ ] Revisar spacing
- [ ] Revisar colores
- [ ] Revisar transitions
- [ ] Limpiar console.logs
- [ ] Verificar no hay warnings
- [ ] Build de producción limpia

---

#### ✅ Tarea 24: Preparación Demo (1 hora)

**Setup para presentación:**

- [ ] Build de producción: `pnpm build`
- [ ] Servir localmente o deploy temporal
- [ ] Testing en máquina de presentación
- [ ] Preparar navegadores limpios (sin extensions que alteren UI)
- [ ] Screenshots backup por si hay problemas técnicos
- [ ] Ensayar flujo de demo (2-3 veces)

**Flujo de demo sugerido (5-7 min):**

1. **Overview** (1 min)
   - Mostrar layout completo
   - Explicar 3 niveles de navegación
2. **Dark Mode** (1 min)
   - Navegar entre módulos
   - Mostrar Context Selector funcionando
   - Toggle a light mode
3. **Light Mode** (1 min)
   - Mismo recorrido
   - Mostrar glassmorphism effects
4. **Responsive** (1 min)
   - Resize a tablet
   - Resize a mobile
   - Mostrar sidebar drawer
5. **Detalles técnicos** (1 min)
   - Lazy loading
   - Bundle optimizado
   - Sistema de colores centralizado
6. **Q&A y próximos pasos** (2 min)
   - Pendiente: paleta y tipografía
   - Explicar facilidad de actualización

---

#### ✅ Tarea 25: Demo & Recepción de Feedback (1.5 horas)

**Durante la demo:**

- [ ] Presentar con confianza
- [ ] Destacar flexibilidad del sistema
- [ ] Tomar notas de feedback
- [ ] Recibir paleta de colores y tipografía del PO
- [ ] Aclarar dudas sobre las 12 preguntas

**Post-demo inmediato:**

- [ ] Documentar todo el feedback
- [ ] Priorizar cambios solicitados
- [ ] Planificar actualización con paleta oficial

---

## 📋 CHECKLIST GENERAL DE ÉXITO

### Antes de la Demo (Jueves tarde)

- [ ] Layout completo implementado
- [ ] Dark/Light mode funcionales
- [ ] 5 módulos navegables
- [ ] Context Selector operativo con mockdata
- [ ] Responsive en 3 breakpoints
- [ ] Bundle optimizado (≤500KB inicial)
- [ ] Glassmorphism effects del mockup
- [ ] Screenshots de calidad preparados
- [ ] Documento de demo listo
- [ ] Testing exhaustivo completado
- [ ] Build de producción sin warnings

### Durante la Demo

- [ ] Flujo ensayado y fluido
- [ ] Destacar puntos fuertes (lazy loading, centralización, responsive)
- [ ] Preguntar por paleta y tipografía
- [ ] Tomar notas de feedback
- [ ] Mantener calma ante bugs

### Post-Demo (Viernes+)

- [ ] Recibir paleta oficial
- [ ] Recibir tipografía oficial
- [ ] Actualizar `colors.constants.ts`
- [ ] Configurar tipografía
- [ ] Rebuild y testing
- [ ] Implementar feedback del PO

---

## ⚠️ GESTIÓN DE RIESGOS

### Riesgo 1: Colores Konecta no coinciden exactamente con mockup

**Mitigación:**

- Enfocarse en estructura y funcionalidad, no en match exacto de colores
- Ajustar opacidades y glassmorphism para aproximar visualmente
- Priorizar legibilidad y contraste WCAG sobre similitud al mockup
- **Argumento:** "Usamos paleta corporativa aprobada. Para colores exactos necesitamos diseño finalizado"

### Riesgo 2: No da tiempo a todo

**Prioridades absolutas:**

1. Layout visual matching mockup (aunque no sea 100% funcional)
2. Dark/Light toggle funcional
3. Responsive básico
4. Navegación entre módulos

**Pueden recortarse si es necesario:**

- Mobile drawer perfecto
- Animaciones complejas
- Features de módulos individuales
- Testing cross-browser exhaustivo

### Riesgo 3: Bugs de última hora

**Plan B:**

- Tener screenshots de calidad como backup
- Demo en desarrollo (ng serve) en lugar de build
- Enfocarse en la visión, no en perfección técnica

### Riesgo 4: Bundle muy grande

**Si Phase 1 (Lucide + ECharts) no es suficiente:**

- Remover features pesadas temporalmente
- Demo sin gráficos si es necesario
- Explicar optimización en progreso

---

## 📊 MÉTRICAS DE ÉXITO

**Técnicas:**

- ✅ Bundle inicial ≤ 500KB
- ✅ Lazy chunks creados (5 módulos)
- ✅ 0 errors en console
- ✅ 0 warnings en build
- ✅ Lighthouse score > 80 (si da tiempo)

**Visuales:**

- ✅ Match 90%+ con mockups light/dark
- ✅ Glassmorphism effects presentes
- ✅ Smooth theme transitions
- ✅ Responsive funcional en 3 breakpoints

**Funcionales:**

- ✅ Navegación entre módulos
- ✅ Context Selector con filtrado
- ✅ Theme toggle sin flickering
- ✅ Lazy loading verificable

---

## 💡 TIPS IMPORTANTES

1. **No perseguir match exacto con mockup:**
   - Es un MVP para demo, no producción
   - Focus: Estructura correcta + funcionalidad básica + paleta corporativa
   - Usamos colores aprobados (Konecta), no experimentales del mockup
2. **Commits frecuentes:**
   - Commit al final de cada tarea
   - Si algo sale mal, fácil rollback
3. **Testing continuo:**
   - No dejar testing para el final
   - Testing rápido después de cada componente
4. **Comunicación:**
   - Si algo se atasca, pedir ayuda
   - Better under-promise, over-deliver
5. **Backup plan:**
   - Siempre tener screenshots de respaldo
   - Demo en dev mode es válido si build falla

6. **Tareas opcionales (MockDataService y SidebarIconsService):**
   - Solo implementar si hay tiempo sobrante
   - NO bloquean el demo del jueves
   - Son mejoras de calidad de vida para desarrollo futuro
   - Pueden hacerse después del demo si es necesario

---

## 📞 RECURSOS Y DOCUMENTACIÓN

**Documentos clave:**

- [LAYOUT-MOCKUP-ANALISIS.md](./LAYOUT-MOCKUP-ANALISIS.md) - Análisis detallado del mockup
- [LAYOUT-PRINCIPAL.md](./LAYOUT-PRINCIPAL.md) - Arquitectura propuesta
- [BUNDLE-OPTIMIZATION.md](./BUNDLE-OPTIMIZATION.md) - Optimización bundle
- [ROADMAP-BASE-ESTABLE.md](./ROADMAP-BASE-ESTABLE.md) - Roadmap completo
- `.github/UI/` - Documentación del sistema de UI

**Referencias rápidas:**

- PrimeNG Dropdown: https://primeng.org/dropdown
- PrimeNG Menubar: https://primeng.org/menubar
- PrimeNG Menu: https://primeng.org/menu
- PrimeNG Avatar: https://primeng.org/avatar
- Lucide Icons: https://lucide.dev/icons/
- Tailwind Backdrop Blur: https://tailwindcss.com/docs/backdrop-blur

---

**Documento creado:** Febrero 15, 2026  
**Objetivo:** Implementación Lunes 16 - Demo Jueves 19  
**Estado:** 🟢 Plan listo para ejecución  
**Próximo paso:** Mañana lunes comenzar con Tarea 1

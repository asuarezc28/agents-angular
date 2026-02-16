# Layout Principal - Propuesta de Arquitectura

**Proyecto:** CYRA  
**Fecha:** Febrero 2026  
**Stack:** Angular 21 + PrimeNG 21 + Tailwind CSS 3

---

## 📋 Resumen Ejecutivo

Se propone una arquitectura de layout modular con 3 niveles de navegación:

1. **Header:** Módulos principales (cambia toda la vista)
2. **Sidebar:** Navegación secundaria (opcional, configurable)
3. **Submenu:** Funcionalidades específicas del módulo activo

**Características principales:**

- ✅ Fondo personalizable por usuario
- ✅ Context Selector (Compañía/Proyecto)
- ✅ Lazy loading por módulos
- ✅ Layout responsivo con Tailwind
- ✅ Integración con sistema de temas (light/dark)

---

## 🏗️ Propuesta de Arquitectura

### Estructura de Carpetas

```
src/app/
├── layout/                              # Módulo de Layout
│   ├── main-layout/                     # Container principal
│   │   ├── main-layout.component.ts
│   │   ├── main-layout.component.html
│   │   └── main-layout.component.css
│   │
│   ├── header/                          # Header superior
│   │   ├── header.component.ts
│   │   ├── header.component.html
│   │   └── header.component.css
│   │   # Contiene:
│   │   # - Logo "CYRA"
│   │   # - Navegación de módulos (tabs/pills)
│   │   # - Action buttons (chat, tasks, users, settings)
│   │   # - User profile avatar
│   │
│   ├── context-selector/               # Selector Compañía/Proyecto
│   │   ├── context-selector.component.ts
│   │   ├── context-selector.component.html
│   │   └── context-selector.service.ts
│   │   # Gestiona el contexto global
│   │   # (Compañía y Proyecto seleccionados)
│   │
│   ├── sidebar/                        # Sidebar vertical izquierdo
│   │   ├── sidebar.component.ts
│   │   ├── sidebar.component.html
│   │   └── sidebar.component.css
│   │   # Navegación secundaria con iconos
│   │
│   ├── submenu/                        # Submenu horizontal
│   │   ├── submenu.component.ts
│   │   └── submenu.component.html
│   │   # Dinámico según módulo activo
│   │
│   └── background/                     # Gestión de fondo
│       ├── background.service.ts       # Lógica de fondos
│       └── background.directive.ts     # Aplicar fondo
│
├── features/                           # Módulos funcionales
│   ├── dashboard/
│   │   ├── dashboard.routes.ts
│   │   ├── dashboard-layout.component.ts
│   │   ├── pages/
│   │   │   ├── overview/
│   │   │   ├── analytics/
│   │   │   └── reports/
│   │   └── data/
│   │       └── dashboard.submenu.ts    # Config de submenu
│   │
│   ├── search/
│   ├── time-tracking/
│   ├── compliance/
│   └── settings/
│
└── core/
    ├── models/
    │   ├── module.model.ts             # Modelo de Módulo
    │   ├── submenu-item.model.ts       # Items de submenu
    │   └── context.model.ts            # Compañía/Proyecto
    │
    └── services/
        ├── navigation.service.ts       # Gestión de navegación
        └── context.service.ts          # Contexto global
```

---

## 🎨 Layout Visual Propuesto

```
┌──────────────────────────────────────────────────────────────┐
│ 🔷 CYRA  | [Dashboard] [Search] [Time] [Compliance]  💬📋👥⚙️ 👤 │ ← Header Fijo
├──────────────────────────────────────────────────────────────┤
│ Compañía: [Global Corp ▼]    Proyecto: [Piloto VoC 2026 ▼] │ ← Context Selector
├─────┬────────────────────────────────────────────────────────┤
│  📰 │ [Overview] | [Analytics] | [Reports] | [Settings]     │ ← Submenu Dinámico
│  🔍 ├────────────────────────────────────────────────────────┤
│  🕐 │                                                        │
│  ⚖️ │                                                        │
│  ⚙️ │         CONTENIDO PRINCIPAL                            │
│     │         (router-outlet)                                │
│     │                                                        │
│     │                                                        │
│     │                                                        │
└─────┴────────────────────────────────────────────────────────┘
      ↑ Fondo personalizable con imagen/gradiente
```

---

## 🔧 Implementación HTML Propuesta

### main-layout.component.html

```html
<div
  class="app-container min-h-screen"
  [style.backgroundImage]="backgroundService.currentBg()"
  [style.backgroundSize]="'cover'"
  [style.backgroundPosition]="'center'"
  [style.backgroundAttachment]="'fixed'"
>
  <!-- Overlay para mejorar legibilidad (opcional) -->
  <div class="backdrop-overlay"></div>

  <!-- Header Principal Fijo -->
  <app-header
    [modules]="modules"
    [activeModule]="activeModule()"
    (moduleChange)="onModuleChange($event)"
  />

  <!-- Context Selector -->
  <app-context-selector
    class="sticky top-[var(--header-height)] z-40"
    [company]="selectedCompany()"
    [project]="selectedProject()"
    (companyChange)="onCompanyChange($event)"
    (projectChange)="onProjectChange($event)"
  />

  <div class="main-wrapper flex">
    <!-- Sidebar Vertical -->
    <app-sidebar
      class="sidebar-container"
      [items]="sidebarItems"
      [activeItem]="activeSidebarItem()"
      (itemClick)="onSidebarItemClick($event)"
    />

    <!-- Área de Contenido Principal -->
    <main class="content-area flex-1">
      <!-- Submenu Dinámico -->
      @if (currentSubmenu().length > 0) {
      <app-submenu
        [items]="currentSubmenu()"
        [activeItem]="activeSubmenuItem()"
        (itemClick)="onSubmenuItemClick($event)"
      />
      }

      <!-- Contenedor de Contenido -->
      <div class="content-container">
        <!-- Aquí se cargan las vistas de cada módulo -->
        <router-outlet />
      </div>
    </main>
  </div>
</div>
```

---

## 🚦 Sistema de Navegación (3 Niveles)

### Nivel 1: Módulos Principales (Header)

**Función:** Cambia completamente la aplicación a un módulo diferente

```typescript
// Ejemplo de configuración
export const MAIN_MODULES: Module[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'pi-chart-line',
    route: '/dashboard',
  },
  {
    id: 'search',
    label: 'Search',
    icon: 'pi-search',
    route: '/search',
  },
  {
    id: 'time',
    label: 'Time Tracking',
    icon: 'pi-clock',
    route: '/time',
  },
  {
    id: 'compliance',
    label: 'Compliance',
    icon: 'pi-shield',
    route: '/compliance',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'pi-cog',
    route: '/settings',
  },
];
```

### Nivel 2: Sidebar (Navegación Secundaria)

**Función:** Accesos rápidos o categorías dentro del módulo activo

```typescript
// Los items del sidebar pueden cambiar según el módulo activo
export const DASHBOARD_SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'overview', icon: 'pi-home', tooltip: 'Overview' },
  { id: 'charts', icon: 'pi-chart-bar', tooltip: 'Charts' },
  { id: 'data', icon: 'pi-database', tooltip: 'Data' },
  { id: 'export', icon: 'pi-download', tooltip: 'Export' },
];
```

### Nivel 3: Submenu (Funcionalidades del Módulo)

**Función:** Navega entre diferentes vistas del módulo sin cambiar el contexto global

```typescript
// dashboard/data/dashboard.submenu.ts
export const DASHBOARD_SUBMENU: SubmenuItem[] = [
  { id: 'overview', label: 'Overview', route: '/dashboard/overview' },
  { id: 'analytics', label: 'Analytics', route: '/dashboard/analytics' },
  { id: 'reports', label: 'Reports', route: '/dashboard/reports' },
  { id: 'settings', label: 'Settings', route: '/dashboard/settings' },
];
```

---

## 🎭 Context Selector - Opciones de Ubicación

### ⭐ OPCIÓN A: Barra Fija Debajo del Header (RECOMENDADA)

```html
<div class="context-bar sticky top-[64px] z-40 backdrop-blur-md bg-surface-0/80">
  <div class="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
    <label>Compañía:</label>
    <p-dropdown [options]="companies" [(ngModel)]="selectedCompany" />

    <label>Proyecto:</label>
    <p-dropdown [options]="projects" [(ngModel)]="selectedProject" />
  </div>
</div>
```

**✅ Ventajas:**

- Siempre visible sin saturar el header
- Separación clara entre navegación y contexto
- Puede hacerse sticky (se queda visible al hacer scroll)
- Más espacio para los selectores (pueden ser largos)

**❌ Desventajas:**

- Ocupa espacio vertical adicional (~48-56px)

---

### OPCIÓN B: Integrado en el Header (Derecha)

```html
<header class="flex items-center justify-between px-6 py-3">
  <div class="flex items-center gap-6">
    <h1>CYRA</h1>
    <nav><!-- Módulos --></nav>
  </div>

  <div class="flex items-center gap-4">
    <!-- Context Selector aquí -->
    <p-dropdown [options]="companies" [(ngModel)]="selectedCompany" />
    <p-dropdown [options]="projects" [(ngModel)]="selectedProject" />

    <!-- Actions e User -->
    <div><!-- Iconos --></div>
  </div>
</header>
```

**✅ Ventajas:**

- Ahorra espacio vertical
- Todo en un solo lugar

**❌ Desventajas:**

- Header puede quedar saturado
- Menos espacio para módulos si hay muchos
- Los selectores quedan más pequeños

---

### OPCIÓN C: En el Sidebar (Parte Superior)

```html
<aside class="sidebar">
  <!-- Context Selector arriba -->
  <div class="p-4 border-b">
    <p-dropdown [options]="companies" [(ngModel)]="selectedCompany" class="w-full mb-2" />
    <p-dropdown [options]="projects" [(ngModel)]="selectedProject" class="w-full" />
  </div>

  <!-- Navegación -->
  <nav><!-- Items --></nav>
</aside>
```

**✅ Ventajas:**

- Header limpio
- No ocupa espacio horizontal adicional

**❌ Desventajas:**

- Menos visible (puede pasarse por alto)
- Sidebar se ensancha o selectores quedan muy pequeños
- No funciona bien si sidebar es colapsable

---

## 🖼️ Background Personalizable

### Implementación del Servicio

```typescript
// layout/background/background.service.ts
import { Injectable, signal, computed } from '@angular/core';

export interface BackgroundConfig {
  type: 'image' | 'gradient' | 'solid';
  value: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

@Injectable({ providedIn: 'root' })
export class BackgroundService {
  private bgConfig = signal<BackgroundConfig>({
    type: 'gradient',
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    overlay: true,
    overlayOpacity: 0.3,
  });

  currentBg = computed(() => {
    const config = this.bgConfig();
    switch (config.type) {
      case 'image':
        return `url('/assets/backgrounds/${config.value}')`;
      case 'gradient':
        return config.value;
      case 'solid':
        return config.value;
      default:
        return 'var(--p-surface-0)';
    }
  });

  overlayStyle = computed(() => {
    const config = this.bgConfig();
    if (!config.overlay) return null;
    return {
      backgroundColor: `rgba(0, 0, 0, ${config.overlayOpacity || 0.3})`,
    };
  });

  setBackground(config: BackgroundConfig) {
    this.bgConfig.set(config);
    this.saveToLocalStorage(config);
  }

  loadUserPreference() {
    const saved = localStorage.getItem('user-background');
    if (saved) {
      this.bgConfig.set(JSON.parse(saved));
    }
  }

  private saveToLocalStorage(config: BackgroundConfig) {
    localStorage.setItem('user-background', JSON.stringify(config));
  }
}
```

### Catálogo de Fondos Predefinidos

```typescript
// core/constants/backgrounds.constants.ts
export const PREDEFINED_BACKGROUNDS = [
  {
    id: 'gradient-blue',
    name: 'Blue Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    preview: '/assets/previews/gradient-blue.jpg',
  },
  {
    id: 'gradient-sunset',
    name: 'Sunset',
    type: 'gradient',
    value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    preview: '/assets/previews/gradient-sunset.jpg',
  },
  {
    id: 'image-abstract-1',
    name: 'Abstract Pattern',
    type: 'image',
    value: 'abstract-pattern-1.jpg',
    preview: '/assets/previews/abstract-1.jpg',
  },
  // ... más opciones
];
```

---

## 📱 Consideraciones Responsive

### Breakpoints Propuestos

```css
/* Tailwind custom breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet portrait */
lg: 1024px  /* Tablet landscape / Desktop small */
xl: 1280px  /* Desktop */
2xl: 1536px /* Desktop large */
```

### Comportamiento por Tamaño

**Mobile (< 768px):**

- Header: Logo + Menu hamburger
- Context Selector: Colapsado en modal/drawer
- Sidebar: Oculto, accesible via bottom nav o drawer
- Submenu: Colapsado en dropdown

**Tablet (768px - 1024px):**

- Header: Completo, módulos en tabs scrollables
- Context Selector: Visible, puede comprimir labels
- Sidebar: Iconos sin labels
- Submenu: Horizontal scrollable

**Desktop (> 1024px):**

- Todo visible y expandido
- Layout completo como en el diseño

---

## 🎯 Rutas y Lazy Loading

### app.routes.ts

```typescript
export const routes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes'),
        data: {
          module: 'dashboard',
          submenu: 'dashboard-submenu', // Referencia al submenu
        },
      },
      {
        path: 'search',
        loadChildren: () => import('./features/search/search.routes'),
        data: { module: 'search' },
      },
      {
        path: 'time',
        loadChildren: () => import('./features/time-tracking/time.routes'),
        data: { module: 'time' },
      },
      {
        path: 'compliance',
        loadChildren: () => import('./features/compliance/compliance.routes'),
        data: { module: 'compliance' },
      },
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.routes'),
        data: { module: 'settings' },
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
```

### Ejemplo de Rutas de Módulo

```typescript
// features/dashboard/dashboard.routes.ts
import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./dashboard-layout.component'),
    children: [
      {
        path: 'overview',
        loadComponent: () => import('./pages/overview/overview.component'),
      },
      {
        path: 'analytics',
        loadComponent: () => import('./pages/analytics/analytics.component'),
      },
      {
        path: 'reports',
        loadComponent: () => import('./pages/reports/reports.component'),
      },
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
    ],
  },
] as Routes;
```

---

## ⚡ Estado Global y Comunicación

### Context Service

```typescript
// core/services/context.service.ts
import { Injectable, signal, computed } from '@angular/core';

export interface Company {
  id: string;
  name: string;
  logo?: string;
}

export interface Project {
  id: string;
  name: string;
  companyId: string;
  status: 'active' | 'archived';
}

@Injectable({ providedIn: 'root' })
export class ContextService {
  private selectedCompany = signal<Company | null>(null);
  private selectedProject = signal<Project | null>(null);

  // Computed values
  currentCompany = computed(() => this.selectedCompany());
  currentProject = computed(() => this.selectedProject());

  // Context válido solo si ambos están seleccionados
  isContextValid = computed(
    () => this.selectedCompany() !== null && this.selectedProject() !== null,
  );

  setCompany(company: Company) {
    this.selectedCompany.set(company);
    // Reset project si no pertenece a la compañía
    const currentProject = this.selectedProject();
    if (currentProject && currentProject.companyId !== company.id) {
      this.selectedProject.set(null);
    }
    this.saveToStorage();
  }

  setProject(project: Project) {
    this.selectedProject.set(project);
    this.saveToStorage();
  }

  private saveToStorage() {
    localStorage.setItem('selected-company', JSON.stringify(this.selectedCompany()));
    localStorage.setItem('selected-project', JSON.stringify(this.selectedProject()));
  }

  loadFromStorage() {
    const company = localStorage.getItem('selected-company');
    const project = localStorage.getItem('selected-project');

    if (company) this.selectedCompany.set(JSON.parse(company));
    if (project) this.selectedProject.set(JSON.parse(project));
  }
}
```

---

## 🎨 Estilos Globales Propuestos

```css
/* src/styles.css - Agregar después de las definiciones actuales */

/* Layout Container */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

/* Overlay para mejorar contraste sobre fondo personalizado */
.backdrop-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(var(--p-surface-0-rgb), 0.95) 0%,
    rgba(var(--p-surface-0-rgb), 0.85) 100%
  );
  pointer-events: none;
  z-index: 1;
}

/* Main wrapper con sidebar + content */
.main-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex: 1;
}

/* Sidebar container */
.sidebar-container {
  width: 80px;
  background: rgba(var(--p-surface-0-rgb), 0.95);
  backdrop-filter: blur(8px);
  border-right: 1px solid var(--p-surface-300);
  transition: width 0.3s ease;
}

.sidebar-container.expanded {
  width: 240px;
}

/* Content area */
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Content container with glass effect */
.content-container {
  flex: 1;
  padding: 2rem;
  background: rgba(var(--p-surface-0-rgb), 0.6);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  margin: 1rem;
  box-shadow: var(--p-card-shadow);
}

/* Header fijo con glass effect */
app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(var(--p-surface-0-rgb), 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--p-surface-200);
}

/* Context selector */
app-context-selector {
  background: rgba(var(--p-surface-50-rgb), 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--p-surface-200);
}

/* Submenu horizontal */
.submenu {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(var(--p-surface-0-rgb), 0.7);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid var(--p-surface-200);
  overflow-x: auto;
}

/* Dark mode adjustments */
:root.dark .backdrop-overlay {
  background: linear-gradient(
    to bottom,
    rgba(var(--p-surface-950-rgb), 0.95) 0%,
    rgba(var(--p-surface-950-rgb), 0.85) 100%
  );
}

:root.dark app-header,
:root.dark app-context-selector {
  border-bottom-color: var(--p-surface-700);
}
```

---

## ❓ PREGUNTAS PARA EL PRODUCT OWNER

### 1. Context Selector (Compañía/Proyecto)

**Pregunta:** ¿Dónde debería ubicarse el selector de Compañía/Proyecto?

**Opciones:**

- [ ] **Opción A:** Barra fija debajo del header (recomendada)
- [ ] **Opción B:** Integrado en el header (lado derecho)
- [ ] **Opción C:** En la parte superior del sidebar
- [ ] **Otra:** ******************\_\_******************

**Consideraciones:**

- ¿Los usuarios cambian frecuentemente de compañía/proyecto?
- ¿Los nombres son largos o cortos en promedio?
- ¿Hay límite de compañías/proyectos por usuario?

---

### 2. Sidebar Vertical

**Pregunta:** ¿Qué función debe tener el sidebar de iconos?

**Opciones:**

- [ ] **Opción A:** Iconos fijos para toda la app (como en las capturas)
- [ ] **Opción B:** Iconos dinámicos según el módulo activo
- [ ] **Opción C:** Solo accesos rápidos (favoritos, recientes)
- [ ] **Opción D:** Colapsable/expandable con labels

**Consideraciones:**

- ¿Los iconos actuales son definitivos?
- ¿Debe ser colapsable para ganar espacio?
- ¿Tooltip vs labels permanentes?

---

### 3. Submenu por Módulo

**Pregunta:** ¿Cómo debe verse el submenu de cada módulo?

**Opciones:**

- [ ] **Opción A:** Horizontal (tabs) como en navegación web tradicional
- [ ] **Opción B:** Vertical (lista) en el sidebar
- [ ] **Opción C:** Dropdown/select en mobile, tabs en desktop
- [ ] **Opción D:** Breadcrumbs dinámicos

**Consideraciones:**

- ¿Cuántos items de submenu en promedio? (3-5, 5-10, más de 10)
- ¿Debe indicar progreso o estado (completado, pendiente)?
- ¿Submenu siempre visible o colapsable?

---

### 4. Fondo Personalizable

**Pregunta:** ¿Qué tipos de fondos deben soportarse?

**Opciones:**

- [ ] Imágenes (fotos, ilustraciones)
- [ ] Gradientes predefinidos
- [ ] Colores sólidos
- [ ] Patrones/texturas
- [ ] Subir imagen personalizada
- [ ] Todos los anteriores

**Consideraciones:**

- ¿Los fondos son por usuario o por compañía/equipo?
- ¿Hay límite de tamaño para imágenes personalizadas?
- ¿Se requiere galería de fondos predefinidos?
- ¿Afecta al branding/identidad corporativa?

---

### 5. Módulos Principales

**Pregunta:** ¿Los módulos del header son definitivos?

**Módulos actuales identificados:**

1. Dashboard (Overview/Analytics)
2. Search (Búsqueda)
3. Time (Gestión de tiempo)
4. Compliance (Cumplimiento)
5. Settings (Configuración)

**Preguntas adicionales:**

- ¿Hay más módulos planificados?
- ¿Hay permisos/roles que ocultan módulos?
- ¿Orden de los módulos es configurable por usuario?
- ¿Iconos o solo texto en los módulos?

---

### 6. Actions del Header

**Pregunta:** ¿Qué hacen los iconos de acción en el header?

**Iconos identificados en capturas:**

1. 💬 Chat/Mensajes
2. 📋 Tareas/To-do
3. 👥 Usuarios/Team
4. ⚙️ Settings rápido

**Consideraciones:**

- ¿Todos los iconos son accesos directos o abren overlays/modales?
- ¿Hay notificaciones/badges en tiempo real?
- ¿Son configurables por usuario?

---

### 7. Responsive Behavior

**Pregunta:** ¿Prioridad de dispositivos?

**Desktop First (recomendado):**

- Diseñado para pantallas grandes
- Mobile es versión simplificada

**Mobile First:**

- Diseñado para móviles
- Desktop agrega más features

**Consideraciones:**

- ¿Usuarios principales usan desktop o mobile?
- ¿Necesitan todas las funciones en mobile?
- ¿Hay funciones exclusivas de desktop?

---

### 8. Animaciones y Transiciones

**Pregunta:** ¿Qué nivel de animaciones se desea?

**Opciones:**

- [ ] **Minimal:** Solo transiciones suaves básicas
- [ ] **Moderate:** Animaciones en hover, entrada/salida
- [ ] **Rich:** Animaciones complejas, microinteracciones
- [ ] **Configurable:** Usuario decide (performance/accesibilidad)

**Consideraciones:**

- Performance vs experiencia visual
- Accesibilidad (prefers-reduced-motion)
- Impacto en tiempo de carga

---

### 9. Estado de Carga (Loading States)

**Pregunta:** ¿Cómo manejar estados de carga entre vistas?

**Opciones:**

- [ ] Spinner global en center
- [ ] Skeleton screens (placeholders)
- [ ] Progress bar en top
- [ ] Nothing (instant transitions)

---

### 10. Prioridad de Implementación

**Pregunta:** ¿Qué debe implementarse primero?

**Ordenar por prioridad (1 = más prioritario):**

- [ ] \_\_\_\_ Layout base (header, sidebar, content)
- [ ] \_\_\_\_ Context selector (compañía/proyecto)
- [ ] \_\_\_\_ Fondo personalizable
- [ ] \_\_\_\_ Módulo Dashboard completo
- [ ] \_\_\_\_ Sistema de navegación (submenu)
- [ ] \_\_\_\_ Responsive (mobile/tablet)
- [ ] \_\_\_\_ Animaciones y micro-interacciones

---

### 11. Paleta de Colores Definitiva

**Pregunta:** ¿Cuál es la paleta de colores oficial/cerrada para CYRA?

**Información necesaria:**

- [ ] **Colores primarios:** Brand color principal, secundario
- [ ] **Colores de acción:** Success, Error, Warning, Info
- [ ] **Colores de superficie:** Fondos, cards, overlays (light/dark)
- [ ] **Colores de texto:** Primario, secundario, disabled (light/dark)
- [ ] **Colores de borde:** Divisores, outlines, focus states

**Formato esperado:**

```
Primary: #XXXXXX
Secondary: #XXXXXX
Success: #XXXXXX
Error: #XXXXXX
Warning: #XXXXXX
Info: #XXXXXX

Light Mode Surfaces:
- Background: #XXXXXX
- Card: #XXXXXX
- Text: #XXXXXX

Dark Mode Surfaces:
- Background: #XXXXXX
- Card: #XXXXXX
- Text: #XXXXXX
```

**Consideraciones:**

- ¿Existen guías de branding/identidad visual con colores definidos?
- ¿Los colores actuales del mockup (azul-púrpura) son definitivos?
- ¿Hay colores corporativos que debemos respetar?
- ¿Necesitan cumplir con estándares de accesibilidad WCAG AA/AAA?

**⚠️ IMPORTANTE:**
Actualmente usamos la paleta Konecta (Primary: #2A01CD). Si hay cambios, debemos actualizar `colors.constants.ts` y el sistema de theming completo.

---

### 12. Tipografía (Fuente de Letras)

**Pregunta:** ¿Cuál es la tipografía oficial para CYRA?

**Información necesaria:**

- [ ] **Fuente principal:** Nombre de la font family
- [ ] **Fuente secundaria/alternativa:** (Si aplica)
- [ ] **Tamaños de texto:**
  - Headings (H1, H2, H3, H4, H5, H6)
  - Body text (normal, small, large)
  - Labels, captions, code
- [ ] **Pesos disponibles:** Light (300), Regular (400), Medium (500), Semibold (600), Bold (700)
- [ ] **Altura de línea (line-height):** Por cada tamaño
- [ ] **Espaciado entre letras (letter-spacing):** Si aplica

**Opciones comunes:**

- [ ] **System Fonts:** -apple-system, Segoe UI (rápido, no requiere descarga)
- [ ] **Google Fonts:** Inter, Roboto, Poppins, Open Sans, Montserrat
- [ ] **Fuente corporativa personalizada:** (Proporcionar archivos .woff2, .woff, licencia)
- [ ] **Fuente del mockup:** (¿Cuál se usó en el diseño?)

**Formato esperado:**

```
Primary Font: "Inter", sans-serif
Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

Headings:
- H1: 2.5rem / 40px (Bold)
- H2: 2rem / 32px (Semibold)
- H3: 1.5rem / 24px (Semibold)
- H4: 1.25rem / 20px (Medium)

Body:
- Large: 1.125rem / 18px (Regular)
- Normal: 1rem / 16px (Regular)
- Small: 0.875rem / 14px (Regular)
- Caption: 0.75rem / 12px (Regular)
```

**Consideraciones:**

- ¿La fuente está disponible en Google Fonts o necesitamos licencia?
- ¿Hay variantes (italic, condensed) que debamos incluir?
- ¿Existe una escala tipográfica definida en las guías de diseño?
- ¿Performance: cuántos pesos/variantes cargar (afecta bundle size)?

**⚠️ IMPORTANTE:**
Si se usa fuente personalizada (no system font), agregar a:

1. `src/index.html` (preload/preconnect)
2. `tailwind.config.ts` (fontFamily)
3. `src/styles.css` (@font-face si es custom)

---

## 📊 Estimación de Esfuerzo

### Fase 1: Layout Base (1-2 semanas)

- [ ] Estructura de componentes
- [ ] Header con navegación de módulos
- [ ] Sidebar básico
- [ ] Routing setup
- [ ] Estilos base con Tailwind

### Fase 2: Features Core (1-2 semanas)

- [ ] Context Selector (Compañía/Proyecto)
- [ ] Background Service
- [ ] Submenu dinámico
- [ ] Integración con tema light/dark

### Fase 3: Responsive (1 semana)

- [ ] Breakpoints y adaptación
- [ ] Mobile navigation
- [ ] Touch interactions

### Fase 4: Polish (1 semana)

- [ ] Animaciones
- [ ] Loading states
- [ ] Error handling
- [ ] Accesibilidad (keyboard navigation, ARIA)

**Total estimado:** 4-6 semanas

---

## 🎯 Próximos Pasos

1. **Reunión con Product Owner**
   - Revisar este documento
   - Responder preguntas marcadas
   - Priorizar features

2. **Diseño Detallado**
   - Mockups de alta fidelidad
   - Definir paleta de colores específica
   - Iconografía completa

3. **Prototipo Técnico**
   - Crear estructura base
   - Implementar navegación
   - Validar con stakeholders

4. **Desarrollo Iterativo**
   - Implementar por fases
   - Reviews semanales
   - Ajustes según feedback

---

## 📎 Anexos

### Tecnologías Utilizadas

- Angular 21.1.0 (Standalone, Signals)
- PrimeNG 21.1.1 (UI Components)
- Tailwind CSS 3.x (Styling)
- Lucide Angular (Icons)
- ngx-translate (i18n)

### Referencias

- [Angular Best Practices](./.github/angular/)
- [UI System Documentation](./.github/UI/)
- [PrimeNG Theming Guide](./.github/UI/primeng-theming-guide.md)
- [Color System](./.github/UI/konecta-theme-system.skill.md)

### Contacto Técnico

- **Tech Lead:** [Nombre]
- **Repositorio:** [URL]
- **Documentación:** `.github/` folder

---

**Documento creado:** Febrero 14, 2026  
**Última actualización:** Febrero 14, 2026  
**Estado:** 🟡 Pendiente de aprobación Product Owner

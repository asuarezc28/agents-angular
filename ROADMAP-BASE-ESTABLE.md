# 🚀 Roadmap - Base Estable para Desarrollo

**Proyecto:** CYRA Analytics  
**Objetivo:** Tener la base lista para empezar a desarrollar features  
**Deadline Layout:** Jueves 19 Febrero 2026 (4 días desde hoy domingo)  
**Fecha:** Febrero 15, 2026

---

## 📊 Estado Actual

✅ **Completado:**

- Stack tecnológico configurado (Angular 21 + PrimeNG 21 + Tailwind 3)
- Sistema de temas light/dark con ThemeService
- Color system con single source of truth (colors.constants.ts)
- Plugin Tailwind para CSS variables automáticas
- 4 componentes PrimeNG configurados (Button, Card, InputText, Tree)
- Documentación UI completa (.github/UI/)
- i18n básico con ngx-translate (es/en)

⚠️ **Pendiente:**

- Layout principal base (REQUERIDO para jueves)
- Optimización de bundle (1.8MB → ~450KB)
- 111 componentes PrimeNG sin configurar
- Servicios core (guards, interceptors)
- Testing setup completo

---

## 🎯 PRIORIDAD CRÍTICA (Para el Jueves 19 Feb)

### 1. ✅ Respuestas Product Owner - 12 Preguntas Layout

**📋 Ubicación:** [LAYOUT-PRINCIPAL.md](./LAYOUT-PRINCIPAL.md) (líneas 730-900)  
**⏱️ Tiempo:** 1.5 horas (reunión + decisiones)  
**👤 Responsable:** Product Owner + Tech Lead

**Preguntas a responder:**

- [ ] **P1:** Ubicación del Context Selector (3 opciones: Header inline, Header dropdown, Sidebar top)
- [ ] **P2:** Comportamiento de iconos en Sidebar (Solo iconos, Iconos + labels, Expandible)
- [ ] **P3:** Estilo de submenu (Tabs, Pills, Breadcrumbs + tabs)
- [ ] **P4:** Tipos de fondos permitidos (Colores sólidos, Gradientes, Imágenes, Patrones, Todos)
- [ ] **P5:** Confirmación de módulos (Dashboard, Search, Time Tracking, Compliance, Settings)
- [ ] **P6:** Funcionalidad de action icons (Chat, Tasks, Users, Settings)
- [ ] **P7:** Prioridades responsive (Desktop-first, Mobile-first, Igual prioridad)
- [ ] **P8:** Nivel de animaciones (Minimal, Moderate, Rich, Configurable)
- [ ] **P9:** Loading states (Spinner, Skeleton, Progress bar, Ninguno)
- [ ] **P10:** Prioridad de implementación (Ordenar 7 items)
- [ ] **P11:** Paleta de colores oficial/cerrada (Primary, Success, Error, Warning, Info, Surfaces light/dark) 🆕
- [ ] **P12:** Tipografía oficial (Font family, pesos, tamaños, line-heights) 🆕

**🎯 Resultado esperado:** Decisiones documentadas en LAYOUT-PRINCIPAL.md

---

### 2. 🏗️ Implementación Layout Principal Base

**📋 Basado en:** [LAYOUT-PRINCIPAL.md](./LAYOUT-PRINCIPAL.md)  
**⏱️ Tiempo estimado:** 2-3 días (16-24 horas)  
**🎯 Deadline:** Jueves 19 Febrero 2026

#### 2.1. Estructura de Carpetas (30 min)

- [ ] Crear `src/app/layout/` con subcarpetas
- [ ] Crear `src/app/features/` para módulos
- [ ] Actualizar `src/app/core/models/` con interfaces necesarias
- [ ] Actualizar `src/app/core/services/` con servicios de navegación

#### 2.2. Layout Components (8-10 horas)

- [ ] **MainLayoutComponent** (2h)
  - Container principal con grid/flex
  - Slots para header, sidebar, content, submenu
  - Integración con router-outlet
  - Manejo de estados (sidebar collapsed, fullscreen)

- [ ] **HeaderComponent** (3h)
  - Logo "CYRA"
  - Navegación de módulos (tabs/pills)
  - Context Selector (si va en header según P1)
  - Action buttons (chat, tasks, users, settings)
  - User profile avatar con dropdown
  - Responsive breakpoints

- [ ] **ContextSelectorComponent** (2h)
  - Dropdown compañía (mockdata inicial)
  - Dropdown proyecto filtrado por compañía
  - Validación de contexto completo
  - Estado persistente en localStorage
  - Integración con ContextService

- [ ] **SidebarComponent** (2h)
  - Navegación secundaria con iconos Lucide
  - Estados: collapsed/expanded
  - Highlight de ruta activa
  - Toggle button
  - Responsive: drawer en mobile

- [ ] **SubmenuComponent** (1h)
  - Configuración dinámica por módulo
  - Estilos según decisión P3
  - Integración con router

#### 2.3. Core Services (4-5 horas)

- [ ] **NavigationService** (1.5h)
  - Gestión de módulos y rutas
  - Estado de navegación (módulo activo, submenu items)
  - Signals para reactividad
  - Configuración de módulos (mockdata)

- [ ] **ContextService** (1.5h)
  - Gestión de Compañía/Proyecto seleccionados
  - Validación de contexto válido
  - Persistencia en localStorage
  - Signals para estado reactivo
  - Mock data inicial (2-3 compañías, 5-7 proyectos)

- [ ] **BackgroundService** (1h)
  - Gestión de fondos personalizados
  - Tipos: color, gradient, image, pattern
  - Persistencia por usuario
  - Aplicación dinámica vía CSS variables

- [ ] **BackgroundDirective** (1h)
  - Aplicar background al elemento
  - Responsive a cambios de preferencias
  - Optimización de performance

#### 2.4. Routing Configuration (2 horas)

- [ ] Actualizar `app.routes.ts` con lazy loading
- [ ] Crear rutas base para 5 módulos:
  - [ ] `features/dashboard/dashboard.routes.ts`
  - [ ] `features/search/search.routes.ts`
  - [ ] `features/time-tracking/time-tracking.routes.ts`
  - [ ] `features/compliance/compliance.routes.ts`
  - [ ] `features/settings/settings.routes.ts`
- [ ] Componentes placeholder para cada módulo
- [ ] Guards básicos (si aplica)

#### 2.5. Componentes PrimeNG Adicionales Necesarios (2-3 horas)

**Para el layout necesitamos configurar:**

- [ ] **Dropdown** (para Context Selector) - 45 min
  - Variables: `--p-dropdown-*`
  - Light + Dark mode
  - Estados: hover, focus, disabled
  - Agregar a `tailwind-css-variables.mjs`

- [ ] **Menu/MenuBar** (para action buttons) - 45 min
  - Variables: `--p-menu-*`
  - Light + Dark mode
  - Agregar a `tailwind-css-variables.mjs`

- [ ] **Avatar** (para user profile) - 30 min
  - Variables: `--p-avatar-*`
  - Light + Dark mode
  - Agregar a `tailwind-css-variables.mjs`

- [ ] **Sidebar** (componente PrimeNG si se usa) - 30 min
  - Variables: `--p-sidebar-*`
  - O implementar con div custom + Tailwind

#### 2.6. Testing Básico (2 horas)

- [ ] Tests unitarios para servicios (Navigation, Context, Background)
- [ ] Tests de componentes principales (Header, Sidebar, ContextSelector)
- [ ] Verificar lazy loading funciona correctamente

#### 2.7. Integración y Refinamiento (2-3 horas)

- [ ] Limpiar `app.ts` actual (mover demos a features)
- [ ] Integrar layout en `app.routes.ts`
- [ ] Verificar tema light/dark en todo el layout
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] Ajustes de spacing, colores, iconos
- [ ] Testing en navegadores (Chrome, Firefox, Safari)

**📝 Notas:**

- Usar mockdata para compañías/proyectos
- Iconos: Lucide para custom UI, PrimeIcons solo PrimeNG internals
- Colores: Siempre desde colors.constants.ts
- Todos los componentes: standalone, signals, OnPush

**🎯 Entregable:** Layout funcional navegable con 5 módulos placeholder

---

## 🔥 PRIORIDAD ALTA (Esta Semana - Antes del 21 Feb)

### 3. ⚡ Optimización Bundle (CRÍTICO)

**📋 Basado en:** [BUNDLE-OPTIMIZATION.md](./BUNDLE-OPTIMIZATION.md)  
**⏱️ Tiempo:** 1-2 horas  
**🎯 Objetivo:** Reducir bundle de 1.8MB a ~450KB (75% reducción)

#### 3.1. Phase 1: Quick Wins (1 hora)

**🎯 Resultado esperado:** Bundle inicial ≤ 500KB

- [ ] **Fix Lucide Icons** (20 min)
  - Archivo: `src/app/app.ts`
  - Acción: Remover `LucideAngularModule` de imports
  - Acción: Importar solo componentes específicos (Home, Globe, etc.)
  - Acción: Actualizar imports en todos los componentes que usen iconos
  - Impacto: **-2.3 MB** (~99% de lucide eliminado)

- [ ] **Lazy Load ECharts** (30 min)
  - Archivo: `src/app/shared/components/chart/chart.component.ts`
  - Acción: Cambiar `import * as echarts` a `await import('echarts')`
  - Acción: Agregar loading state con signal
  - Acción: Testing con gráficos existentes
  - Impacto: **-3.5 MB** (echarts solo se carga cuando se usa)

- [ ] **Rebuild y Verificación** (10 min)
  ```bash
  pnpm build
  # Verificar bundle size en dist/
  ```

  - Target: main.js ≤ 500 KB
  - Verificar que iconos se renderizan correctamente
  - Verificar que gráficos funcionan con lazy loading

**📊 Resultado esperado:**

- Antes: 1787 KB
- Después: ~450 KB (-75%)

#### 3.2. Phase 2: Advanced (Opcional - si se necesita más optimización)

**⏱️ Tiempo adicional:** 1-2 horas

- [ ] Lazy load features completas (ya incluido en layout si se hace bien)
- [ ] PrimeNG tree-shaking verification
- [ ] Route-level code splitting
- [ ] Preloading strategies configuration

#### 3.3. Actualizar angular.json Budgets (5 min)

```json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "600kb",  // Ajustado tras optimización
    "maximumError": "800kb"      // Más estricto
  }
]
```

---

### 4. 🎨 Ajustes de Colores y Consistencia Visual

**⏱️ Tiempo:** 2-3 horas

#### 4.1. Revisión de Paleta de Colores (1 hora)

- [ ] Auditar colores en `colors.constants.ts`
- [ ] Verificar contraste WCAG AA en light mode
- [ ] Verificar contraste WCAG AA en dark mode
- [ ] Ajustar colores si es necesario:
  - [ ] `primary` (Konecta Blue - #2A01CD) ✅ OK o ajustar
  - [ ] `success` (Green - #0E9F6E) ✅ OK o ajustar
  - [ ] `danger` (Red - #F05252) ✅ OK o ajustar
  - [ ] `warning` (Yellow - #F0FA00) ⚠️ Revisar contraste
  - [ ] `surface` grays (50, 900, 950) ✅ OK o ajustar

#### 4.2. Actualizar Componentes Configurados (1 hora)

**Revisar variables en `tailwind-css-variables.mjs`:**

- [ ] Button: Verificar colores alineados con paleta
- [ ] Card: Verificar borders y backgrounds
- [ ] InputText: Verificar focus states y borders
- [ ] Tree: Verificar hover y selection states

#### 4.3. Testing de Consistencia (1 hora)

- [ ] Verificar todos los componentes en light mode
- [ ] Verificar todos los componentes en dark mode
- [ ] Testing de accesibilidad (contrast checker)
- [ ] Screenshots para documentación

---

### 5. 🎨 Centralizar Design Tokens (Colores y Tipografía) 🆕

**⏱️ Tiempo:** 2-3 horas  
**🎯 Objetivo:** Single source of truth para colores y tipografía  
**⚠️ Depende de:** Respuestas PO (P11 y P12)

#### 5.1. Actualizar Paleta de Colores (1-1.5 horas)

**Archivo:** `src/app/core/constants/colors.constants.ts`

- [ ] **Recibir paleta oficial del PO** (formato hex con colores completos)
- [ ] **Actualizar colors.constants.ts** (45 min)
  - Reemplazar colores actuales con paleta oficial CYRA
  - Mantener estructura: primary, surface, success, danger, warning, info
  - Definir escalas completas (50-950) si se proporcionan
  - Agregar colores específicos del mockup (azul-púrpura gradient)
  - Documentar cada color con comentarios (uso, accesibilidad)

- [ ] **Validar contraste WCAG AA** (15 min)
  - Usar herramienta: https://webaim.org/resources/contrastchecker/
  - Text sobre backgrounds: Ratio mínimo 4.5:1
  - Large text: Ratio mínimo 3:1
  - Ajustar si no cumplen

- [ ] **Rebuild y testing** (30 min)
  ```bash
  pnpm start
  ```

  - Verificar plugin genera CSS variables correctamente
  - Testing visual en light mode
  - Testing visual en dark mode
  - Componentes PrimeNG mantienen estilos
  - Charts con ThemeColorsService funcionan

**Archivos afectados automáticamente:**

- ✅ `tailwind.config.ts` (importa colores)
- ✅ `tailwind-css-variables.mjs` (genera CSS vars)
- ✅ `theme-colors.service.ts` (importa colores)
- ✅ Todas las clases Tailwind (`bg-*`, `text-*`, `border-*`)
- ✅ Todos los componentes PrimeNG configurados

**⚠️ CRÍTICO:** No hardcodear colores en ningún componente, siempre usar:

- Tailwind classes: `bg-primary-500`, `text-surface-900`
- ThemeColorsService: `this.colors.primaryColor`, `this.colors.textColor()`

#### 5.2. Configurar Tipografía Oficial (1-1.5 horas)

**Archivos:** `src/index.html`, `tailwind.config.ts`, `src/styles.css`

- [ ] **Recibir definición tipográfica del PO** (font family, pesos, tamaños)

- [ ] **Opción A: Google Fonts** (30 min)
  - Agregar preconnect en `index.html`:
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    ```
  - Configurar en `tailwind.config.ts`:
    ```typescript
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      // Agregar otras si aplica
    }
    ```

- [ ] **Opción B: Fuente Custom** (1 hora)
  - Recibir archivos: `.woff2`, `.woff`, licencia
  - Colocar en `public/fonts/`
  - Definir @font-face en `src/styles.css`:
    ```css
    @font-face {
      font-family: 'CustomFont';
      src:
        url('/fonts/custom-font.woff2') format('woff2'),
        url('/fonts/custom-font.woff') format('woff');
      font-weight: 400;
      font-display: swap;
    }
    ```
  - Preload en `index.html`:
    ```html
    <link rel="preload" href="/fonts/custom-font.woff2" as="font" type="font/woff2" crossorigin />
    ```
  - Configurar en `tailwind.config.ts`

- [ ] **Definir Escala Tipográfica** (30 min)
  - Crear archivo: `src/app/core/constants/typography.constants.ts`

  ```typescript
  export const TYPOGRAPHY = {
    fontFamily: {
      primary: 'Inter, system-ui, sans-serif',
      mono: 'Fira Code, monospace', // Si aplica
    },
    fontSize: {
      h1: { size: '2.5rem', lineHeight: '1.2', weight: '700' },
      h2: { size: '2rem', lineHeight: '1.3', weight: '600' },
      h3: { size: '1.5rem', lineHeight: '1.4', weight: '600' },
      h4: { size: '1.25rem', lineHeight: '1.4', weight: '500' },
      bodyLarge: { size: '1.125rem', lineHeight: '1.6', weight: '400' },
      body: { size: '1rem', lineHeight: '1.5', weight: '400' },
      bodySmall: { size: '0.875rem', lineHeight: '1.5', weight: '400' },
      caption: { size: '0.75rem', lineHeight: '1.4', weight: '400' },
    },
  } as const;
  ```

- [ ] **Extender Tailwind con clases tipográficas** (15 min)
  - Actualizar `tailwind.config.ts`:

  ```typescript
  theme: {
    extend: {
      fontSize: {
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        // ... resto de tamaños
      }
    }
  }
  ```

- [ ] **Testing** (15 min)
  - Verificar fuente carga correctamente en todos los navegadores
  - Testing de performance (font loading, FOUT/FOIT)
  - Verificar todos los pesos se muestran correctamente
  - Testing responsive: tamaños se ven bien en mobile/tablet/desktop

**📝 Documentación:**

- [ ] Documentar decisiones en `.github/UI/typography-system.md` (nuevo)
- [ ] Actualizar `copilot-instructions.md` con referencias a tipografía

**🎯 Resultado esperado:**

- ✅ Colores centralizados en `colors.constants.ts` (single source of truth)
- ✅ Tipografía centralizada en `typography.constants.ts`
- ✅ Todo el sistema usa estos valores (Tailwind, PrimeNG, componentes custom)
- ✅ Fácil de actualizar: cambiar un valor → rebuild → todo actualizado

---

### 6. 📦 Servicios Core Faltantes

**⏱️ Tiempo:** 5-7 horas (ampliado para incluir Mock y SidebarIcons)

#### 6.1. Mock Data Service (1.5 horas) 🆕

**📋 Prioridad:** ALTA - No depender de backend

**Objetivo:** Sistema centralizado para servir datos mock en desarrollo sin backend

- [ ] **MockDataService** (1 hora)
  - Archivo: `src/app/core/services/mock-data.service.ts`
  - Simular HTTP delays con `delay()` operator
  - Estructura de datos mock por entidad:
    - [ ] Compañías (companies.mock.ts)
    - [ ] Proyectos (projects.mock.ts)
    - [ ] Usuarios (users.mock.ts)
    - [ ] Dashboard data (dashboard.mock.ts)
    - [ ] Search results (search.mock.ts)
  - Métodos con misma firma que API real
  - Signals para estado reactivo
  - Paginación mock
  - Filtrado y búsqueda mock

**Ejemplo estructura:**

```typescript
// mock-data.service.ts
@Injectable({ providedIn: 'root' })
export class MockDataService {
  // Flag para activar/desactivar mocks
  private useMocks = signal(environment.useMocks);

  getCompanies(): Observable<Company[]> {
    return of(MOCK_COMPANIES).pipe(
      delay(Math.random() * 500 + 200), // Simular latencia 200-700ms
    );
  }

  getProjectsByCompany(companyId: string): Observable<Project[]> {
    return of(MOCK_PROJECTS.filter((p) => p.companyId === companyId)).pipe(delay(300));
  }

  // Pagination mock
  getDashboardData(page: number, pageSize: number): Observable<PaginatedResponse<DashboardItem>> {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return of({
      data: MOCK_DASHBOARD_DATA.slice(start, end),
      total: MOCK_DASHBOARD_DATA.length,
      page,
      pageSize,
    }).pipe(delay(400));
  }
}
```

- [ ] **Mock Data Files** (30 min)
  - Crear carpeta: `src/app/core/mocks/`
  - Archivo por entidad con datos realistas:
    - `companies.mock.ts` - 5-10 compañías
    - `projects.mock.ts` - 15-20 proyectos
    - `users.mock.ts` - 10-15 usuarios
    - `dashboard.mock.ts` - Datos de dashboard
    - `search.mock.ts` - Resultados de búsqueda
  - TypeScript types correctos
  - Relaciones entre entidades consistentes

**Ejemplo:**

```typescript
// companies.mock.ts
export const MOCK_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Global Corp',
    industry: 'Technology',
    employees: 5000,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Tech Solutions',
    industry: 'Software',
    employees: 250,
    createdAt: '2024-03-20',
  },
  // ... más compañías
];
```

**🎯 Resultado esperado:**

- Desarrollo frontend sin dependencia de backend
- Datos consistentes y realistas para testing
- Fácil switch entre mock/real API
- Misma interfaz que servicios reales

---

#### 6.2. Sidebar Icons Service (1 hora) 🆕

**📋 Prioridad:** MEDIA - UX dinámica del sidebar

**Objetivo:** Gestionar iconos del sidebar dinámicamente según módulo activo

- [ ] **SidebarIconsService** (45 min)
  - Archivo: `src/app/core/services/sidebar-icons.service.ts`
  - Configuración de iconos por módulo
  - Estado reactivo con signals
  - Integración con NavigationService
  - Cambio automático al navegar
  - Configuración personalizable

**Ejemplo estructura:**

```typescript
// sidebar-icons.service.ts
export interface SidebarConfig {
  moduleId: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIconData; // Type de Lucide
  route: string;
  badge?: string | number;
  disabled?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SidebarIconsService {
  private navigationService = inject(NavigationService);

  // Configuración de iconos por módulo
  private sidebarConfigs: Record<string, SidebarConfig> = {
    dashboard: {
      moduleId: 'dashboard',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, route: '/dashboard/overview' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, route: '/dashboard/analytics' },
        { id: 'reports', label: 'Reports', icon: FileText, route: '/dashboard/reports' },
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
    // ... más módulos
  };

  // Signal con items actuales del sidebar
  currentSidebarItems = computed(() => {
    const activeModule = this.navigationService.activeModule();
    return this.sidebarConfigs[activeModule]?.items || [];
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

- [ ] **Integración con SidebarComponent** (15 min)
  - Actualizar `sidebar.component.ts` para usar el servicio
  - Renderizar iconos dinámicamente con `@for`
  - Estados activos basados en ruta actual
  - Badges opcionales si hay notificaciones

**Ejemplo integración:**

```typescript
// sidebar.component.ts
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

```html
<!-- sidebar.component.html -->
<nav class="flex flex-col items-center py-6 gap-4">
  @for (item of sidebarItems(); track item.id) {
  <button
    [routerLink]="item.route"
    [disabled]="item.disabled"
    class="relative w-12 h-12 flex items-center justify-center rounded-lg
             hover:bg-surface-50 dark:hover:bg-surface-800
             transition-colors duration-200"
    [class.bg-primary-500]="isActive(item.route)"
    [class.text-surface-0]="isActive(item.route)"
    [attr.aria-label]="item.label"
  >
    <lucide-icon [img]="item.icon" [size]="24" />

    @if (item.badge) {
    <span
      class="absolute -top-1 -right-1 w-5 h-5 bg-danger-500 
                     text-surface-0 text-xs rounded-full flex items-center justify-center"
    >
      {{ item.badge }}
    </span>
    }
  </button>
  }
</nav>
```

**🎯 Resultado esperado:**

- Sidebar dinámico según módulo activo
- Configuración centralizada y mantenible
- Fácil agregar/modificar iconos por módulo
- Soporte para badges (notificaciones, contadores)

---

#### 6.3. Authentication & Authorization (2 horas)

- [ ] **AuthService** (1h)
  - Login/logout básico (mockdata)
  - Token management
  - User profile signal
  - Estado de autenticación

- [ ] **AuthGuard** (30 min)
  - Proteger rutas autenticadas
  - Redirect a login si no autenticado

- [ ] **RoleGuard** (30 min)
  - Verificar roles/permisos por ruta
  - Configuración basada en roles

#### 6.4. HTTP Interceptors (1 hora)

- [ ] **AuthInterceptor**
  - Agregar token a headers
  - Refresh token logic (básico)

- [ ] **ErrorInterceptor**
  - Manejo global de errores HTTP
  - Logging de errores
  - Toast notifications para errores

- [ ] **LoadingInterceptor** (opcional)
  - Global loading indicator
  - Estado reactivo con signal

#### 6.5. Error Handling (1 hora)

- [ ] **ErrorHandlerService**
  - Manejo global de errores no capturados
  - Logging strategies
  - User-friendly error messages

- [ ] **LoggerService**
  - Console wrapper
  - Niveles: debug, info, warn, error
  - Disable en producción

---

## 📋 PRIORIDAD MEDIA (Próxima Semana - 22-28 Feb)

### 7. 🧩 Componentes PrimeNG Según Necesidad

**⏱️ Tiempo:** Variable (30-45 min por componente)  
**📍 Referencia:** [PRIMENG-COMPONENTS-STATUS.md](./.github/UI/PRIMENG-COMPONENTS-STATUS.md)

**Configurar solo cuando se necesiten en features:**

#### Form Components (Alta probabilidad de uso)

- [ ] **Checkbox** - 30 min
- [ ] **Radio Button** - 30 min
- [ ] **InputNumber** - 30 min
- [ ] **TextArea** - 30 min
- [ ] **Calendar** - 45 min (complejo)
- [ ] **MultiSelect** - 45 min

#### Data Components

- [ ] **Table** - 1 hora (muy complejo, muchas variables)
- [ ] **DataView** - 45 min
- [ ] **Paginator** - 30 min

#### Overlay Components

- [ ] **Dialog** - 45 min
- [ ] **Toast** (ya usado) - verificar si está completo
- [ ] **ConfirmDialog** - 45 min
- [ ] **Tooltip** - 30 min

**Proceso para cada componente:**

1. Identificar variables CSS necesarias (DevTools)
2. Agregar a `rootVars` (light) en `tailwind-css-variables.mjs`
3. Agregar a `darkVars` (dark) en `tailwind-css-variables.mjs`
4. Rebuild: `pnpm start`
5. Testing en light/dark
6. Documentar en PRIMENG-COMPONENTS-STATUS.md

---

### 8. 🌐 Internacionalización (i18n) Completa

**⏱️ Tiempo:** 2-3 horas

#### 8.1. Expansión de Traducciones (1.5 horas)

- [ ] Agregar traducciones para layout
  - `src/assets/i18n/es/layout.json`
  - `src/assets/i18n/en/layout.json`
- [ ] Traducciones para validaciones
  - `src/assets/i18n/es/validation.json`
  - `src/assets/i18n/en/validation.json`
- [ ] Traducciones para errores
  - `src/assets/i18n/es/errors.json`
  - `src/assets/i18n/en/errors.json`

#### 8.2. Language Switcher (1 hora)

- [ ] Componente LanguageSwitcherComponent
- [ ] Integrar en header
- [ ] Persistencia de idioma seleccionado
- [ ] Testing de cambio en runtime

#### 8.3. Configuración Adicional (30 min)

- [ ] Default language handling
- [ ] Missing translation handling
- [ ] Lazy loading de traducciones grandes

---

### 9. 🧪 Testing Setup Completo

**⏱️ Tiempo:** 3-4 horas

#### 9.1. Vitest Configuration (Unitarios) (1 hora)

- [ ] Configuración completa de vitest
- [ ] Setup files para Angular testing
- [ ] Mocks globales (services, HTTP)
- [ ] Coverage configuration
- [ ] Scripts en package.json:
  ```json
  "test:unit": "vitest",
  "test:unit:ui": "vitest --ui",
  "test:coverage": "vitest --coverage"
  ```

#### 9.2. Tests Templates (1 hora)

- [ ] Template para component tests
- [ ] Template para service tests
- [ ] Template para guard tests
- [ ] Template para pipe tests
- [ ] Ejemplos con signals y computed

#### 9.3. E2E Setup (Playwright) (2 horas)

- [ ] Instalación de Playwright
- [ ] Configuración básica
- [ ] Test de navegación básica
- [ ] Test de tema toggle
- [ ] CI/CD integration preparado
- [ ] Scripts:
  ```json
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui"
  ```

---

### 10. 📚 Documentación de Desarrollo

**⏱️ Tiempo:** 2-3 horas

#### 10.1. Developer Guide (1 hora)

- [ ] `docs/DEVELOPER-GUIDE.md`
  - Setup local (requisitos, instalación)
  - Scripts disponibles
  - Estructura de carpetas explicada
  - Workflows de desarrollo
  - Estándares de código

#### 10.2. Contributing Guide (30 min)

- [ ] `CONTRIBUTING.md`
  - Git branching strategy
  - Commit message conventions
  - PR process
  - Code review checklist

#### 10.3. API Documentation (1 hora)

- [ ] `docs/API.md`
  - Estructura de servicios
  - Interfaces principales
  - Ejemplos de uso
  - Mock data structure

---

## 🔮 PRIORIDAD BAJA (Cuando haya tiempo)

### 11. 🚀 CI/CD Pipeline

**⏱️ Tiempo:** 3-4 horas

- [ ] GitHub Actions workflow
  - [ ] Lint on PR
  - [ ] Unit tests on PR
  - [ ] Build verification
  - [ ] E2E tests (opcional)
- [ ] Build configuration
  - [ ] Development
  - [ ] Staging
  - [ ] Production
- [ ] Deploy automation (según infraestructura)

---

### 12. 🎯 Performance & SEO (Si aplica)

**⏱️ Tiempo:** 2-3 horas

- [ ] **Performance**
  - [ ] Lighthouse audit
  - [ ] Bundle analyzer
  - [ ] Image optimization strategy
  - [ ] Lazy loading images

- [ ] **SEO** (si es app pública)
  - [ ] Meta tags service
  - [ ] Structured data
  - [ ] Sitemap generation
  - [ ] robots.txt

---

### 13. 🧰 Developer Experience

**⏱️ Tiempo:** 1-2 horas

- [ ] **VS Code**
  - [ ] Workspace settings (.vscode/settings.json)
  - [ ] Recommended extensions (.vscode/extensions.json)
  - [ ] Debugging configuration (.vscode/launch.json)

- [ ] **Linting & Formatting**
  - [ ] ESLint configuration (si no existe)
  - [ ] Prettier pre-commit hook
  - [ ] Husky setup

- [ ] **Code Generation**
  - [ ] Schematics personalizados (opcional)
  - [ ] Snippets útiles

---

## 📊 Resumen de Tiempos Estimados

| Prioridad      | Categoría                                            | Tiempo Estimado | Deadline           |
| -------------- | ---------------------------------------------------- | --------------- | ------------------ |
| 🔴 **CRÍTICO** | Layout Principal Base                                | 16-24 horas     | **Jueves 19 Feb**  |
| 🔴 **CRÍTICO** | Respuestas PO (12 preguntas) 🆕                      | 1.5 horas       | **Lunes 17 Feb**   |
| 🟠 **ALTA**    | Optimización Bundle (Phase 1)                        | 1-2 horas       | Viernes 21 Feb     |
| 🟠 **ALTA**    | Ajustes Colores                                      | 2-3 horas       | Viernes 21 Feb     |
| 🟠 **ALTA**    | Centralizar Design Tokens (Colores + Tipografía) 🆕  | 2-3 horas       | Viernes 21 Feb     |
| 🟠 **ALTA**    | Servicios Core (Mock Data + Sidebar Icons + Auth) 🆕 | 5-7 horas       | Sábado 22 Feb      |
| 🟡 **MEDIA**   | Componentes PrimeNG Adicionales                      | Variable        | Por necesidad      |
| 🟡 **MEDIA**   | i18n Completa                                        | 2-3 horas       | Semana 22-28 Feb   |
| 🟡 **MEDIA**   | Testing Setup                                        | 3-4 horas       | Semana 22-28 Feb   |
| 🟡 **MEDIA**   | Documentación Dev                                    | 2-3 horas       | Semana 22-28 Feb   |
| 🟢 **BAJA**    | CI/CD                                                | 3-4 horas       | Cuando haya tiempo |
| 🟢 **BAJA**    | Performance/SEO                                      | 2-3 horas       | Cuando haya tiempo |
| 🟢 **BAJA**    | Developer Experience                                 | 1-2 horas       | Cuando haya tiempo |

**Total estimado para base estable:** 40-59 horas (~1-1.5 semanas de desarrollo)

---

## ✅ Checklist de "Base Estable" Completa

Para considerar la base estable y lista para desarrollo de features:

### Must-Have (Obligatorio)

- [ ] ✅ Layout principal funcional con navegación
- [ ] ✅ Context Selector (Compañía/Proyecto) operativo
- [ ] ✅ Routing con lazy loading configurado
- [ ] ✅ 5 módulos base con placeholders
- [ ] ✅ Bundle optimizado (≤500KB inicial)
- [ ] ✅ Sistema de temas light/dark funcionando en todo el layout
- [ ] ✅ Colores y tipografía centralizados (single source of truth) 🆕
- [ ] ✅ Colores consistentes y accesibles (WCAG AA)
- [ ] ✅ Servicios core: Navigation, Context, Background, Auth (básico)
- [ ] ✅ MockDataService para desarrollo sin backend 🆕
- [ ] ✅ SidebarIconsService para iconos dinámicos 🆕
- [ ] ✅ Guards básicos (Auth, Role)
- [ ] ✅ HTTP Interceptors (Auth, Error)
- [ ] ✅ Componentes PrimeNG para layout configurados (Dropdown, Menu, Avatar)
- [ ] ✅ Responsive básico (desktop + mobile)

### Should-Have (Altamente recomendado)

- [ ] 🟡 Testing unitario básico (servicios + componentes principales)
- [ ] 🟡 i18n completo (layout + validaciones + errores)
- [ ] 🟡 Error handling global
- [ ] 🟡 Loading states
- [ ] 🟡 Documentación developer guide

### Nice-to-Have (Opcional)

- [ ] 🟢 E2E tests
- [ ] 🟢 CI/CD pipeline
- [ ] 🟢 Performance optimizations adicionales
- [ ] 🟢 Animaciones y microinteracciones

---

## 📅 Planning Sugerido (Próximos 7 Días)

### **Domingo 15 Feb (HOY) - Planning & PO**

- [ ] Revisar LAYOUT-PRINCIPAL.md con Product Owner
- [ ] Obtener respuestas a las 10 preguntas
- [ ] Documentar decisiones

### **Lunes 16 Feb - Layout Día 1**

- [ ] Crear estructura de carpetas
- [ ] Implementar MainLayoutComponent
- [ ] Implementar HeaderComponent (50%)
- [ ] ContextSelectorComponent (inicio)

### **Martes 17 Feb - Layout Día 2**

- [ ] Finalizar HeaderComponent
- [ ] Finalizar ContextSelectorComponent
- [ ] Implementar SidebarComponent
- [ ] SubmenuComponent

### **Miércoles 18 Feb - Layout Día 3**

- [ ] Servicios Core (Navigation, Context, Background)
- [ ] Routing configuration
- [ ] Integración de componentes

### **Jueves 19 Feb - DEADLINE Layout**

- [ ] Refinamiento y ajustes
- [ ] Testing responsive
- [ ] Componentes PrimeNG adicionales (Dropdown, Menu)
- [ ] 🎯 **DEMO al Product Owner**

### **Viernes 20-21 Feb - Optimización + Design Tokens**

- [ ] Bundle optimization (Phase 1)
- [ ] Ajustes de colores
- [ ] **Centralizar colores y tipografía (single source of truth)** 🆕
  - [ ] Actualizar `colors.constants.ts` con paleta oficial PO
  - [ ] Crear `typography.constants.ts` con fuentes y escalas
  - [ ] Configurar en Tailwind y sistema de temas
  - [ ] Testing de consistencia visual
- [ ] Configurar componentes PrimeNG adicionales

### **Sábado-Domingo 22-23 Feb - Core Services**

- [ ] **MockDataService** para desarrollo sin backend (1.5h) 🆕
  - [ ] Estructura de mocks por entidad (companies, projects, users, dashboard, search)
  - [ ] Simular delays HTTP con RxJS delay()
  - [ ] Paginación y filtrado mock
  - [ ] Métodos con misma firma que servicios reales
- [ ] **SidebarIconsService** para iconos dinámicos (1h) 🆕
  - [ ] Configuración de iconos por módulo con signals
  - [ ] Integración con NavigationService
  - [ ] Actualizar SidebarComponent para usar servicio
  - [ ] Soporte para badges (notificaciones, contadores)
- [ ] Auth services, guards, interceptors (2h)
- [ ] Error handling (1h)
- [ ] Servicios complementarios (1h)

---

## 🎯 Criterio de Éxito

**La base estará lista cuando:**

1. ✅ Un desarrollador nuevo puede:
   - Clonar el repo
   - Ejecutar `pnpm install && pnpm start`
   - Ver el layout completo funcionando
   - Navegar entre módulos sin errores
   - Cambiar tema light/dark sin problemas
   - Seleccionar compañía/proyecto

2. ✅ El bundle está optimizado:
   - Initial bundle ≤ 500KB
   - No warnings en build
   - Lazy loading funciona correctamente

3. ✅ El layout cumple requisitos:
   - 3 niveles de navegación operativos
   - Context selector funcional
   - Responsive en 3 breakpoints
   - Accesible (keyboard navigation, ARIA)

4. ✅ Design system centralizado: 🆕
   - Colores en `colors.constants.ts` (single source of truth)
   - Tipografía en `typography.constants.ts` (single source of truth)
   - Todo el sistema usa estos valores (Tailwind, PrimeNG, componentes)
   - Cambiar un color/fuente → rebuild → todo actualizado

5. ✅ El código está listo para escalar:
   - Servicios core implementados
   - Guards y interceptors funcionando
   - Testing básico en place
   - Documentación mínima disponible

---

## 📞 Contacto y Dudas

**Tech Lead:** [Tu nombre]  
**Repositorio:** [URL]  
**Documentación:** `.github/` + `docs/`  
**Tracking:** GitHub Projects / Jira

---

**Documento creado:** Febrero 15, 2026  
**Última actualización:** Febrero 15, 2026  
**Estado:** 🟢 En progreso  
**Próxima revisión:** Jueves 19 Febrero (post-demo layout)

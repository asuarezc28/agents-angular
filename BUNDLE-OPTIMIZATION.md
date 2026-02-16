# Bundle Optimization - Análisis y Plan de Acción

**Proyecto:** CYRA Analytics  
**Fecha:** Febrero 14, 2026  
**Branch:** feat/base-config  
**Análisis basado en:** `dist/sae-analytics/stats.json`

---

## 📊 Estado Actual del Bundle

### Tamaños de Archivos Generados

```
main.js:    1787 KB  (~1.74 MB)  ⚠️ MUY CERCA del límite de 2MB
styles.css:   12 KB               ✅ OK
```

**Límites configurados en angular.json:**

```json
{
  "maximumWarning": "1MB", // ⚠️ YA SUPERADO
  "maximumError": "2MB" // ⚠️ PELIGROSAMENTE CERCA
}
```

---

## 🔴 Análisis de Librerías (Top Consumidores)

| Librería           | Tamaño (Source) | % del Total | Impacto      | Estado                     |
| ------------------ | --------------- | ----------- | ------------ | -------------------------- |
| **echarts**        | 3569 KB         | ~66%        | 🔴 CRÍTICO   | Se carga todo al inicio    |
| **lucide-angular** | 2420 KB         | ~45%        | 🔴 CRÍTICO   | Todos los iconos incluidos |
| **@angular/core**  | 1939 KB         | ~36%        | ✅ OK        | Framework base necesario   |
| **primeng**        | 599 KB          | ~11%        | 🟡 MEJORABLE | Tree-shaking parcial       |
| **zrender**        | 512 KB          | ~9%         | 🟡 MEJORABLE | Dependencia de echarts     |
| **rxjs**           | 164 KB          | ~3%         | ✅ OK        | Operadores necesarios      |
| **tslib**          | 29 KB           | <1%         | ✅ OK        | TypeScript runtime         |

**Total estimado (sin comprimir):** ~9 MB  
**Total comprimido en bundle:** ~1.8 MB

---

## 🚨 Problemas Identificados

### 1. ECharts - Carga Completa al Inicio (CRÍTICO)

**Ubicación:** `src/app/shared/components/chart/chart.component.ts`

```typescript
// ❌ PROBLEMA: Import estático
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  imports: [],
  template: `<div #chartContainer></div>`,
})
export class ChartComponent {
  constructor() {
    effect(() => {
      // echarts ya está cargado (3.5MB)
      this.chart = echarts.init(container);
    });
  }
}
```

**Impacto:**

- 🔴 3.5 MB cargados siempre, aunque no se usen gráficos
- 🔴 Usuario que solo ve tablas → descarga echarts innecesariamente
- 🔴 Tiempo de carga inicial aumenta 2-3 segundos

---

### 2. Lucide Angular - Todos los Iconos Incluidos (CRÍTICO)

**Ubicación:** `src/app/app.ts` (línea 13, 41)

```typescript
// ❌ PROBLEMA: Importa el módulo completo
import {
  LucideAngularModule,  // 2.4 MB de TODOS los iconos
  Home,
  Globe,
  Package,
  Check,
  Star,
  BarChart3,
  LineChart,
  CheckCircle,
} from 'lucide-angular';

@Component({
  imports: [
    LucideAngularModule,  // ❌ Carga 1000+ iconos
    // ...
  ]
})
```

**Impacto:**

- 🔴 2.4 MB de iconos incluidos cuando solo usas 8
- 🔴 Tree-shaking no funciona con el módulo completo
- 🔴 Ratio de desperdicio: 99.2% (8 de 1000+ iconos)

---

### 3. PrimeNG + Demos en App Root (MEJORABLE)

**Ubicación:** `src/app/app.ts`

```typescript
// ⚠️ PROBLEMA: Componentes cargados en app.ts
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ChartComponent } from './shared/components/chart/chart.component';
import { TreeDemoComponent } from './shared/components/tree-demo/tree-demo.component';

@Component({
  imports: [
    RouterOutlet,
    FormsModule,
    TranslateModule,
    ButtonModule,        // ⚠️ Se carga siempre
    CardModule,          // ⚠️ Se carga siempre
    ToastModule,         // ⚠️ Se carga siempre
    ChartComponent,      // ⚠️ Incluye echarts
    TreeDemoComponent,   // ⚠️ Demo no debería estar aquí
  ],
})
```

**Impacto:**

- 🟡 ~400 KB de PrimeNG cargados siempre
- 🟡 Componentes demo en producción
- 🟡 No hay lazy loading de features

---

## ✅ Soluciones Propuestas

### Solución 1: Lazy Loading de ECharts (Prioridad: ALTA)

**Archivo:** `src/app/shared/components/chart/chart.component.ts`

```typescript
// ✅ SOLUCIÓN: Import dinámico
import { Component, signal, effect, viewChild, ElementRef, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { EChartsOption } from 'echarts'; // Solo tipos (0 KB en runtime)

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  template: `
    <div #chartContainer class="w-full h-full"></div>
    @if (loading()) {
      <div class="absolute inset-0 flex items-center justify-center bg-surface-0/50">
        <span class="opacity-70">Cargando gráfico...</span>
      </div>
    }
  `,
})
export class ChartComponent {
  options = input.required<EChartsOption>();
  private chartContainer = viewChild<ElementRef>('chartContainer');
  private platformId = inject(PLATFORM_ID);
  private chart?: any;
  loading = signal(true);

  constructor() {
    effect(async () => {
      if (isPlatformBrowser(this.platformId)) {
        const container = this.chartContainer()?.nativeElement;
        const opts = this.options();

        if (container && opts) {
          // ⚡ Lazy load: Solo se descarga cuando se renderiza un gráfico
          const echarts = await import('echarts');
          this.loading.set(false);

          if (!this.chart) {
            this.chart = echarts.init(container);
          }
          this.chart.setOption(opts);
        }
      }
    });
  }
}
```

**Beneficios:**

- ✅ Bundle inicial: **-3.5 MB** (~-66% del tamaño actual)
- ✅ ECharts solo se descarga cuando hay un gráfico visible
- ✅ Usuario sin gráficos → No descarga echarts
- ✅ Indicador de carga visible para el usuario

**Riesgos:**

- ⚠️ Pequeño delay (200-500ms) al mostrar primer gráfico
- ✅ Mitigado con loading state y caché del navegador

---

### Solución 2: Iconos Específicos de Lucide (Prioridad: ALTA)

**Archivo:** `src/app/app.ts`

```typescript
// ✅ SOLUCIÓN: Solo importar componentes de iconos (sin módulo)
import {
  // LucideAngularModule, ❌ REMOVER
  Home,
  Globe,
  Package,
  Check,
  Star,
  BarChart3,
  LineChart,
  CheckCircle,
} from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    ToastModule,
    ChartComponent,
    // LucideAngularModule, ❌ REMOVER
    // ⚡ Importar cada icono como componente standalone
    Home,
    Globe,
    Package,
    Check,
    Star,
    BarChart3,
    LineChart,
    CheckCircle,
    ThemeToggleComponent,
    TreeDemoComponent,
  ],
  providers: [MessageService],
  templateUrl: './app.html',
})
export class App {
  // ✅ Los iconos siguen disponibles en el template
  protected readonly Home = Home;
  protected readonly Globe = Globe;
  // ... resto igual
}
```

**Cambios en template (si es necesario):**

```html
<!-- Verificar que la sintaxis sea correcta según lucide-angular v0.563.0 -->
<lucide-angular [name]="'home'" />
<!-- o -->
<i-lucide [name]="'home'" />
```

**Beneficios:**

- ✅ Bundle inicial: **-2.3 MB** (~99% reducción de lucide)
- ✅ Solo 8 iconos incluidos (los que usas)
- ✅ Tree-shaking automático por el bundler
- ✅ Sin cambios en la lógica, solo imports

**Riesgos:**

- ⚠️ Verificar sintaxis de template según versión de lucide-angular
- ✅ Bajo riesgo, solo cambios en imports

---

### Solución 3: Lazy Loading de Features (Prioridad: MEDIA)

**Estructura de carpetas a crear:**

```
src/app/
├── app.ts                    # ⚡ Minificado (solo shell)
├── app.html                  # ⚡ Solo header + router-outlet
├── app.routes.ts             # ⚡ Lazy routes
│
├── layout/                   # Layout components (siempre cargados)
│   ├── header/
│   │   └── header.component.ts
│   └── theme-toggle/         # Ya existe
│       └── theme-toggle.component.ts
│
├── features/                 # ⚡ TODO lazy loaded
│   └── dashboard/
│       ├── dashboard.routes.ts
│       ├── dashboard.component.ts
│       └── components/
│           ├── tree-demo/
│           └── chart-demo/
│
├── shared/
│   └── components/
│       └── chart/
│           └── chart.component.ts  # ⚡ Con lazy echarts
│
└── core/
    └── services/
```

**Paso 1: Simplificar app.ts**

```typescript
// src/app/app.ts - VERSIÓN MINIFICADA
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule, // i18n necesario en toda la app
    ThemeToggleComponent, // Toggle siempre visible
  ],
  template: `
    <div class="min-h-screen">
      <header
        class="flex justify-between items-center p-4 border-b border-surface-200 dark:border-surface-700"
      >
        <h1 class="text-2xl font-bold text-primary-500">CYRA</h1>
        <app-theme-toggle />
      </header>
      <main>
        <router-outlet />
      </main>
    </div>
  `,
})
export class App {}
```

**Paso 2: Crear app.routes.ts con lazy loading**

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    // ⚡ Lazy load completo del dashboard
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
```

**Paso 3: Crear dashboard feature**

```typescript
// src/app/features/dashboard/dashboard.component.ts
import { Component, signal, effect, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

// ⚡ PrimeNG solo aquí (lazy loaded)
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// ⚡ Lucide iconos específicos
import {
  Home,
  Globe,
  Package,
  Check,
  Star,
  BarChart3,
  LineChart,
  CheckCircle,
} from 'lucide-angular';

// ECharts
import type { EChartsOption } from 'echarts';
import { ChartComponent } from '@shared/components/chart/chart.component';
import { TreeDemoComponent } from './components/tree-demo/tree-demo.component';
import { ThemeColorsService } from '@core/services/theme-colors.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    ToastModule,
    ChartComponent,
    Home,
    Globe,
    Package,
    Check,
    Star,
    BarChart3,
    LineChart,
    CheckCircle,
    TreeDemoComponent,
  ],
  providers: [MessageService],
  templateUrl: './dashboard.component.html', // Copiar contenido de app.html actual
})
export class DashboardComponent {
  private readonly translate = inject(TranslateService);
  private readonly messageService = inject(MessageService);
  private readonly colors = inject(ThemeColorsService);

  // Lucide icons
  protected readonly Home = Home;
  protected readonly Globe = Globe;
  protected readonly Package = Package;
  protected readonly Check = Check;
  protected readonly Star = Star;
  protected readonly BarChart3 = BarChart3;
  protected readonly LineChart = LineChart;
  protected readonly CheckCircle = CheckCircle;

  protected readonly currentLang = signal('es');

  protected languages = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' },
  ];

  protected chartTitle = signal<string>('Ventas Mensuales 2024');

  protected chartOption = computed<EChartsOption>(() => ({
    title: {
      text: this.chartTitle(),
      left: 'center',
      textStyle: {
        color: this.colors.textColor(),
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: this.colors.backgroundHover(),
      borderColor: this.colors.borderColor(),
      textStyle: {
        color: this.colors.textColor(),
      },
    },
    legend: {
      top: 'bottom',
      textStyle: {
        color: this.colors.textColor(),
      },
    },
    xAxis: {
      type: 'category',
      data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      axisLine: {
        lineStyle: {
          color: this.colors.borderColor(),
        },
      },
      axisLabel: {
        color: this.colors.textColor(),
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: this.colors.borderColor(),
        },
      },
      axisLabel: {
        color: this.colors.textColor(),
      },
      splitLine: {
        lineStyle: {
          color: this.colors.borderColorSubtle(),
        },
      },
    },
    series: [
      {
        name: 'Ventas',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110],
        itemStyle: {
          color: this.colors.primaryColor,
        },
      },
      {
        name: 'Gastos',
        type: 'line',
        data: [80, 120, 100, 60, 50, 90],
        itemStyle: {
          color: this.colors.dangerColor,
        },
      },
    ],
  }));

  constructor() {
    effect(() => {
      this.translate.get('demo.chart.title').subscribe((text: string) => {
        this.chartTitle.set(text);
      });
    });
  }

  protected showMessage() {
    this.translate.get(['demo.toast.success', 'demo.toast.message']).subscribe((translations) => {
      this.messageService.add({
        severity: 'success',
        summary: translations['demo.toast.success'],
        detail: translations['demo.toast.message'],
      });
    });
  }

  protected changeLang(lang: string) {
    this.translate.use(lang);
    this.currentLang.set(lang);
  }
}
```

**Paso 4: Mover tree-demo a la feature**

```bash
# Mover componente
mv src/app/shared/components/tree-demo src/app/features/dashboard/components/
```

**Beneficios:**

- ✅ Bundle inicial: **-400 KB** (PrimeNG + demos)
- ✅ Carga instantánea del shell (<300ms)
- ✅ Dashboard se carga solo al acceder
- ✅ Mejor arquitectura para crecer (más features)

**Riesgos:**

- ⚠️ Más archivos para gestionar
- ⚠️ Pequeño delay al cambiar de ruta (200-400ms)
- ✅ Mitigado con prefetching y router preloading

---

## 📈 Comparativa de Resultados Esperados

### Escenario 1: Solo ECharts + Lucide (Cambios Mínimos)

**Esfuerzo:** 🟢 Bajo (30 minutos)  
**Riesgo:** 🟢 Bajo

| Métrica              | Antes   | Después      | Mejora      |
| -------------------- | ------- | ------------ | ----------- |
| Bundle inicial       | 1787 KB | **~450 KB**  | **-75%** 🎉 |
| Tiempo de carga (3G) | ~6s     | ~1.5s        | **-75%**    |
| Gráficos             | Instant | +200ms delay | Aceptable   |

**Archivos a modificar:**

- `src/app/shared/components/chart/chart.component.ts` (lazy echarts)
- `src/app/app.ts` (remover LucideAngularModule)

---

### Escenario 2: Full Optimization (Lazy Features)

**Esfuerzo:** 🟡 Medio (2-3 horas)  
**Riesgo:** 🟡 Medio

| Métrica              | Antes   | Después     | Mejora      |
| -------------------- | ------- | ----------- | ----------- |
| Bundle inicial       | 1787 KB | **~280 KB** | **-84%** 🚀 |
| Tiempo de carga (3G) | ~6s     | ~1s         | **-83%**    |
| Dashboard chunk      | 0 KB    | ~400 KB     | Lazy loaded |
| ECharts chunk        | 0 KB    | ~800 KB     | On demand   |

**Archivos a crear/modificar:**

- `src/app/app.ts` (simplificar)
- `src/app/app.routes.ts` (lazy routes)
- `src/app/features/dashboard/dashboard.component.ts` (nuevo)
- `src/app/features/dashboard/dashboard.component.html` (nuevo)
- `src/app/shared/components/chart/chart.component.ts` (lazy echarts)
- Mover `tree-demo` a dashboard feature

---

## 🎯 Plan de Implementación

### Fase 1: Quick Wins (Prioridad ALTA)

**Tiempo estimado:** 30-60 minutos  
**Impacto:** -75% del bundle inicial

#### Tarea 1.1: Optimizar ECharts

```bash
# Editar archivo
code src/app/shared/components/chart/chart.component.ts
```

**Cambios:**

1. Remover: `import * as echarts from 'echarts';`
2. Mantener: `import type { EChartsOption } from 'echarts';`
3. Agregar `loading` signal
4. Cambiar `echarts.init()` por `const echarts = await import('echarts'); echarts.init()`
5. Actualizar template con loading state

**Test:**

```bash
pnpm build
# Verificar que main.js bajó ~1-1.5MB
```

---

#### Tarea 1.2: Optimizar Lucide Icons

```bash
# Editar archivo
code src/app/app.ts
```

**Cambios:**

1. Remover línea 13: `LucideAngularModule,`
2. Remover línea 41: `LucideAngularModule,` del array imports
3. Agregar componentes de iconos al array:
   ```typescript
   imports: [
     // ... otros imports
     Home,
     Globe,
     Package,
     Check,
     Star,
     BarChart3,
     LineChart,
     CheckCircle,
   ];
   ```

**Test:**

```bash
pnpm build
# Verificar que main.js bajó otros ~1-2MB
pnpm start
# Verificar que iconos siguen funcionando
```

---

### Fase 2: Lazy Loading Architecture (Prioridad MEDIA)

**Tiempo estimado:** 2-3 horas  
**Impacto:** -84% del bundle inicial + mejor arquitectura

#### Tarea 2.1: Crear estructura de features

```bash
mkdir -p src/app/features/dashboard/components
mkdir -p src/app/layout
```

#### Tarea 2.2: Crear dashboard component

```bash
# Crear archivo
code src/app/features/dashboard/dashboard.component.ts
```

**Copiar todo el código de app.ts a dashboard.component.ts**

#### Tarea 2.3: Mover tree-demo

```bash
mv src/app/shared/components/tree-demo src/app/features/dashboard/components/
```

Actualizar import en dashboard.component.ts:

```typescript
import { TreeDemoComponent } from './components/tree-demo/tree-demo.component';
```

#### Tarea 2.4: Crear rutas lazy

```bash
code src/app/app.routes.ts
```

```typescript
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
```

#### Tarea 2.5: Simplificar app.ts

Reemplazar todo el contenido con la versión minificada (ver Solución 3 arriba)

**Test:**

```bash
pnpm build
# Verificar chunks separados:
# - main.js: ~280 KB
# - dashboard-chunk.js: ~400 KB
# - echarts-chunk.js: ~800 KB
pnpm start
# Verificar que todo funciona igual
```

---

### Fase 3: Path Aliases (Prioridad BAJA)

**Tiempo estimado:** 15 minutos  
**Impacto:** Mejor DX, imports más limpios

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@features/*": ["src/app/features/*"],
      "@shared/*": ["src/app/shared/*"],
      "@core/*": ["src/app/core/*"],
      "@layout/*": ["src/app/layout/*"]
    }
  }
}
```

**Actualizar imports:**

```typescript
// Antes
import { ChartComponent } from '../../../shared/components/chart/chart.component';

// Después
import { ChartComponent } from '@shared/components/chart/chart.component';
```

---

## ✅ Checklist de Implementación

### Pre-requisitos

- [ ] Estar en branch `feat/base-config`
- [ ] Ejecutar `pnpm build --stats-json` para baseline
- [ ] Commit de cambios actuales

### Fase 1: Quick Wins (HACER PRIMERO)

- [ ] **1.1** Modificar `chart.component.ts` con lazy import de echarts
- [ ] **1.2** Agregar `loading` signal y template update
- [ ] **1.3** Test: `pnpm build` → Verificar reducción de tamaño
- [ ] **1.4** Remover `LucideAngularModule` de imports en `app.ts` (línea 13)
- [ ] **1.5** Remover `LucideAngularModule` del array imports (línea 41)
- [ ] **1.6** Agregar componentes de iconos al array imports
- [ ] **1.7** Test: `pnpm start` → Verificar que iconos funcionan
- [ ] **1.8** Test: `pnpm build` → Verificar bundle <500KB
- [ ] **1.9** Commit: `feat: optimize echarts and lucide bundle size`

### Fase 2: Lazy Features (OPCIONAL, HACER DESPUÉS)

- [ ] **2.1** Crear carpeta `src/app/features/dashboard`
- [ ] **2.2** Crear `dashboard.component.ts` y copiar lógica de `app.ts`
- [ ] **2.3** Crear `dashboard.component.html` y copiar de `app.html`
- [ ] **2.4** Mover `tree-demo` a `features/dashboard/components`
- [ ] **2.5** Crear `app.routes.ts` con lazy loading
- [ ] **2.6** Simplificar `app.ts` a versión minificada
- [ ] **2.7** Actualizar imports en dashboard component
- [ ] **2.8** Test: `pnpm start` → Verificar navegación funciona
- [ ] **2.9** Test: `pnpm build` → Verificar chunks separados
- [ ] **2.10** Commit: `feat: implement lazy loading architecture`

### Fase 3: Path Aliases (OPCIONAL)

- [ ] **3.1** Agregar paths a `tsconfig.json`
- [ ] **3.2** Refactorizar imports con aliases
- [ ] **3.3** Test: `pnpm build` → Verificar compilación
- [ ] **3.4** Commit: `chore: add path aliases for cleaner imports`

### Validación Final

- [ ] `pnpm build` sin errores
- [ ] `pnpm start` y verificar funcionalidad completa
- [ ] Lighthouse audit: Performance > 90
- [ ] Bundle inicial < 500 KB (Fase 1) o < 300 KB (Fase 2)
- [ ] Actualizar `angular.json` budgets si es necesario

---

## 🔍 Validación de Resultados

### Comandos de Análisis

```bash
# 1. Build con stats
pnpm build --stats-json

# 2. Ver tamaños de outputs
node -e "const fs=require('fs'); const data=JSON.parse(fs.readFileSync('dist/sae-analytics/stats.json')); Object.entries(data.outputs).forEach(([name, info]) => console.log((info.bytes/1024).toFixed(2) + 'KB - ' + name));"

# 3. Ver librerías incluidas (top 15)
node -e "const fs=require('fs'); const data=JSON.parse(fs.readFileSync('dist/sae-analytics/stats.json')); const inputs = data.inputs || {}; const libs = {}; Object.keys(inputs).forEach(path => { if (path.includes('node_modules')) { const match = path.match(/node_modules\/\.pnpm\/([^\/]+)/); if (match) { const pkg = match[1].split('@')[0]; libs[pkg] = (libs[pkg] || 0) + (inputs[path].bytes || 0); } } }); Object.entries(libs).sort((a,b) => b[1] - a[1]).slice(0, 15).forEach(([name, bytes]) => console.log((bytes/1024).toFixed(2) + 'KB - ' + name));"

# 4. Lighthouse CI (para producción)
pnpm build
npx lighthouse http://localhost:4200 --view
```

### Métricas de Éxito

| Métrica                        | Baseline | Target Fase 1 | Target Fase 2 |
| ------------------------------ | -------- | ------------- | ------------- |
| Initial Bundle                 | 1787 KB  | < 500 KB      | < 300 KB      |
| LCP (Largest Contentful Paint) | ~3s      | < 1.5s        | < 1s          |
| TBT (Total Blocking Time)      | ~500ms   | < 200ms       | < 100ms       |
| Lighthouse Performance         | ~70      | > 85          | > 90          |

---

## 📚 Referencias

### Documentación Oficial

- [Angular Build Optimization](https://angular.dev/tools/cli/build-optimizer)
- [ECharts Tree Shaking](https://echarts.apache.org/handbook/en/basics/import/)
- [Lucide Angular Icons](https://lucide.dev/guide/packages/lucide-angular)
- [PrimeNG Standalone Components](https://primeng.org/installation)

### Archivos Relacionados

- [LAYOUT-PRINCIPAL.md](./LAYOUT-PRINCIPAL.md) - Arquitectura de layout propuesta
- [angular.json](./angular.json) - Configuración de build
- [ARCHITECTURE.MD](./ARCHITECTURE.MD) - Arquitectura general del proyecto

### Tools

- [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) - Para análisis visual
- [source-map-explorer](https://www.npmjs.com/package/source-map-explorer) - Para explorar dependencias

---

## 🚦 Decisión Recomendada

### ✅ Implementar AHORA (Fase 1)

**Justificación:**

- ⚡ Impacto inmediato: -75% bundle size
- 🟢 Riesgo bajo: Solo cambios en imports
- ⏱️ Tiempo mínimo: 30-60 minutos
- ✅ No afecta arquitectura actual
- ✅ Vale la pena hacer antes de construir nuevos componentes

### ⏳ Considerar DESPUÉS (Fase 2)

**Justificación:**

- Requiere refactorización mayor
- Mejor hacerlo cuando se implemente el layout principal (LAYOUT-PRINCIPAL.md)
- Permite arquitectura escalable para nuevas features
- Se puede hacer en paralelo con desarrollo de componentes

---

## 📝 Notas Adicionales

### Consideraciones de Producción

- [ ] Configurar CDN para chunks estáticos
- [ ] Implementar service worker para cache
- [ ] Considerar preloading strategy para routes frecuentes
- [ ] Monitorear bundle size en CI/CD

### Mejoras Futuras

- [ ] Lazy load de traducciones por idioma
- [ ] Code splitting por módulo de PrimeNG
- [ ] Implementar virtual scrolling en Tree component
- [ ] Considerar reducir calidad de iconos SVG (si afecta UX mínimamente)

---

**Documento creado:** Febrero 14, 2026  
**Última actualización:** Febrero 14, 2026  
**Estado:** 🟡 Pendiente de implementación

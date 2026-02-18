# Guía Completa de Ejemplos UI

Guía completa con ejemplos prácticos del sistema de diseño Konecta, incluyendo componentes de PrimeNG, iconos de Lucide, y colores programáticos para charts/TS en casos específicos.

## 📋 Tabla de Contenidos

1. [Sistema de Colores](#sistema-de-colores)
2. [Componentes PrimeNG](#componentes-primeng)
3. [Iconos Lucide](#iconos-lucide)
4. [Layouts y Tarjetas](#layouts-y-tarjetas)
5. [Formularios](#formularios)
6. [Tablas](#tablas)
7. [Diálogos & Overlays](#diálogos--overlays)
8. [Gráficos con ECharts](#gráficos-con-echarts)
9. [Tema Claro/Oscuro](#tema-clarooscuro)
10. [Accesibilidad](#accesibilidad)

---

## Sistema de Colores

### ✅ Uso Correcto de Colores

```typescript
// colors.constants.ts - Uso actual: colores programáticos para charts/TS específicos (por ahora)
export const COLORS = {
  primary: { 500: '#2A01CD' }, // Konecta Blue
  surface: {
    0: '#ffffff', // White
    50: '#F2F3F7', // Light gray
    900: '#262626', // Dark gray
    950: '#0F0F0F', // Near black
  },
  success: { 500: '#0E9F6E' }, // Green
  danger: { 500: '#F05252' }, // Red
  warning: { 500: '#F0FA00' }, // Yellow
  info: { 500: '#3b82f6' }, // Blue
} as const;
```

### HTML - Herencia de Color

```html
<!-- ✅ CORRECTO - El texto hereda color del body -->
<div class="p-4">
  <h1 class="text-2xl font-bold">Título Principal</h1>
  <p>Texto normal que hereda el color del body</p>
  <p class="opacity-80">Texto secundario con 80% opacidad</p>
  <p class="opacity-70">Texto terciario con 70% opacidad</p>
</div>

<!-- ❌ INCORRECTO - No usar clases de color explícitas en texto -->
<p class="text-surface-900 dark:text-surface-100">Texto</p>
```

### Fondos y Bordes

```html
<!-- Backgrounds con clases Tailwind -->
<div class="bg-primary-50 dark:bg-primary-900">Fondo primario claro/oscuro</div>

<div class="bg-surface-50 dark:bg-surface-900">Fondo de superficie</div>

<!-- Borders -->
<div class="border border-surface-200 dark:border-surface-700">Contenedor con borde</div>

<!-- Usando CSS variables -->
<div style="background-color: var(--p-surface-50)">Fondo usando CSS variable</div>
```

---

## Componentes PrimeNG

### Botones

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule, Save, Trash2, Download } from 'lucide-angular';

@Component({
  selector: 'app-button-examples',
  imports: [ButtonModule, LucideAngularModule],
  template: `
    <div class="flex flex-wrap gap-3">
      <!-- Primary Button -->
      <p-button label="Guardar" severity="primary" [rounded]="true" />

      <!-- Success Button -->
      <p-button label="Confirmar" severity="success" />

      <!-- Danger Button -->
      <p-button label="Eliminar" severity="danger" [outlined]="true" />

      <!-- Button con Icono Lucide -->
      <p-button label="Descargar" [rounded]="true">
        <lucide-icon [img]="Download" [size]="16" />
      </p-button>

      <!-- Icon-only Button -->
      <p-button
        [rounded]="true"
        [text]="true"
        [attr.aria-label]="'common.actions.save' | translate"
      >
        <lucide-icon [img]="Save" [size]="20" />
      </p-button>
    </div>
  `,
})
export class ButtonExamplesComponent {
  protected readonly Save = Save;
  protected readonly Trash2 = Trash2;
  protected readonly Download = Download;
}
```

### Tarjetas

```typescript
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule, Star, TrendingUp } from 'lucide-angular';

@Component({
  selector: 'app-card-examples',
  imports: [CardModule, ButtonModule, LucideAngularModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Card Simple -->
      <p-card>
        <ng-template pTemplate="header">
          <div class="flex items-center gap-2 p-4">
            <lucide-icon [img]="Star" class="text-warning-500" [size]="24" />
            <h3 class="text-lg font-semibold">Card con Icono</h3>
          </div>
        </ng-template>

        <p>Contenido del card que hereda el color del tema.</p>
        <p class="opacity-80 mt-2">Información secundaria.</p>

        <ng-template pTemplate="footer">
          <div class="flex gap-2">
            <p-button label="Acción" [text]="true" />
            <p-button label="Cancelar" severity="secondary" [text]="true" />
          </div>
        </ng-template>
      </p-card>

      <!-- Stats Card -->
      <p-card>
        <ng-template pTemplate="header">
          <div class="flex justify-between items-center p-4">
            <h3 class="font-semibold">Ventas Totales</h3>
            <lucide-icon [img]="TrendingUp" class="text-success-500" [size]="20" />
          </div>
        </ng-template>

        <div class="text-3xl font-bold">$24,500</div>
        <div class="flex items-center gap-2 mt-2">
          <span class="text-success-500 text-sm">+12.5%</span>
          <span class="opacity-70 text-sm">vs mes anterior</span>
        </div>
      </p-card>
    </div>
  `,
})
export class CardExamplesComponent {
  protected readonly Star = Star;
  protected readonly TrendingUp = TrendingUp;
}
```

---

## Iconos Lucide

### Icons con Colores Semánticos

```typescript
import { Component, signal } from '@angular/core';
import {
  LucideAngularModule,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Home,
  User,
  Settings,
} from 'lucide-angular';

@Component({
  selector: 'app-icon-examples',
  imports: [LucideAngularModule],
  template: `
    <div class="space-y-6">
      <!-- Estados con Colores Semánticos -->
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center gap-2">
          <lucide-icon
            [img]="CheckCircle"
            class="text-success-500 dark:text-success-300"
            [size]="24"
          />
          <span>Éxito</span>
        </div>

        <div class="flex items-center gap-2">
          <lucide-icon [img]="XCircle" class="text-danger-500 dark:text-danger-300" [size]="24" />
          <span>Error</span>
        </div>

        <div class="flex items-center gap-2">
          <lucide-icon
            [img]="AlertTriangle"
            class="text-warning-600 dark:text-warning-400"
            [size]="24"
          />
          <span>Advertencia</span>
        </div>

        <div class="flex items-center gap-2">
          <lucide-icon [img]="Info" class="text-info-500 dark:text-info-300" [size]="24" />
          <span>Información</span>
        </div>
      </div>

      <!-- Navegación -->
      <nav class="flex gap-4">
        <button
          class="flex items-center gap-2 p-2 rounded hover:bg-surface-100 dark:hover:bg-surface-800"
        >
          <lucide-icon [img]="Home" class="text-primary-500" [size]="20" />
          <span>Inicio</span>
        </button>

        <button
          class="flex items-center gap-2 p-2 rounded hover:bg-surface-100 dark:hover:bg-surface-800"
        >
          <lucide-icon [img]="User" class="text-surface-600 dark:text-surface-400" [size]="20" />
          <span>Perfil</span>
        </button>

        <button
          class="flex items-center gap-2 p-2 rounded hover:bg-surface-100 dark:hover:bg-surface-800"
        >
          <lucide-icon
            [img]="Settings"
            class="text-surface-600 dark:text-surface-400"
            [size]="20"
          />
          <span>Configuración</span>
        </button>
      </nav>

      <!-- Tamaños de Iconos -->
      <div class="flex items-center gap-4">
        <lucide-icon [img]="Home" [size]="16" class="text-primary-500" />
        <lucide-icon [img]="Home" [size]="20" class="text-primary-500" />
        <lucide-icon [img]="Home" [size]="24" class="text-primary-500" />
        <lucide-icon [img]="Home" [size]="32" class="text-primary-500" />
        <lucide-icon [img]="Home" [size]="48" class="text-primary-500" />
      </div>
    </div>
  `,
})
export class IconExamplesComponent {
  protected readonly CheckCircle = CheckCircle;
  protected readonly XCircle = XCircle;
  protected readonly AlertTriangle = AlertTriangle;
  protected readonly Info = Info;
  protected readonly Home = Home;
  protected readonly User = User;
  protected readonly Settings = Settings;
}
```

---

## Layouts y Tarjetas

### Layout de Dashboard

```typescript
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { LucideAngularModule, Users, TrendingUp, DollarSign, ShoppingCart } from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  imports: [CardModule, LucideAngularModule],
  template: `
    <div class="p-6 space-y-6">
      <h1 class="text-3xl font-bold">Dashboard</h1>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        @for (stat of stats; track stat.id) {
          <p-card>
            <div class="flex justify-between items-start">
              <div>
                <div class="opacity-70 text-sm">{{ stat.label }}</div>
                <div class="text-2xl font-bold mt-1">{{ stat.value }}</div>
                <div class="flex items-center gap-1 mt-2">
                  <span
                    [class]="stat.trend === 'up' ? 'text-success-500' : 'text-danger-500'"
                    class="text-sm"
                  >
                    {{ stat.change }}
                  </span>
                  <span class="opacity-70 text-sm">vs anterior</span>
                </div>
              </div>
              <div class="p-3 rounded-lg" [style.background]="'var(--p-' + stat.color + '-50)'">
                <lucide-icon
                  [img]="stat.icon"
                  [class]="'text-' + stat.color + '-500'"
                  [size]="24"
                />
              </div>
            </div>
          </p-card>
        }
      </div>

      <!-- Content Area -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <p-card class="lg:col-span-2">
          <ng-template pTemplate="header">
            <div class="p-4">
              <h3 class="font-semibold">Actividad Reciente</h3>
            </div>
          </ng-template>

          <div class="space-y-3">
            <p>Contenido principal del dashboard</p>
            <p class="opacity-80">Información secundaria</p>
          </div>
        </p-card>

        <p-card>
          <ng-template pTemplate="header">
            <div class="p-4">
              <h3 class="font-semibold">Notificaciones</h3>
            </div>
          </ng-template>

          <div class="space-y-2">
            <div class="p-2 rounded hover:bg-surface-100 dark:hover:bg-surface-800">
              <p class="text-sm font-medium">Nueva orden</p>
              <p class="text-xs opacity-70">Hace 2 horas</p>
            </div>
          </div>
        </p-card>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  protected readonly Users = Users;
  protected readonly TrendingUp = TrendingUp;
  protected readonly DollarSign = DollarSign;
  protected readonly ShoppingCart = ShoppingCart;

  stats = [
    {
      id: 1,
      label: 'Total Usuarios',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      color: 'primary',
      icon: this.Users,
    },
    {
      id: 2,
      label: 'Ventas',
      value: '$45,678',
      change: '+8.5%',
      trend: 'up',
      color: 'success',
      icon: this.DollarSign,
    },
    {
      id: 3,
      label: 'Pedidos',
      value: '432',
      change: '-3.2%',
      trend: 'down',
      color: 'info',
      icon: this.ShoppingCart,
    },
    {
      id: 4,
      label: 'Crecimiento',
      value: '+23%',
      change: '+5.4%',
      trend: 'up',
      color: 'warning',
      icon: this.TrendingUp,
    },
  ];
}
```

---

## Formularios

### Form con PrimeNG + Validación

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { LucideAngularModule, Save, X } from 'lucide-angular';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    LucideAngularModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4 max-w-md">
      <div class="flex flex-col gap-2">
        <label for="name" class="font-medium">Nombre</label>
        <input
          id="name"
          type="text"
          pInputText
          formControlName="name"
          placeholder="Juan Pérez"
          [class.ng-invalid]="form.get('name')?.invalid && form.get('name')?.touched"
        />
        @if (form.get('name')?.invalid && form.get('name')?.touched) {
          <small class="text-danger-500">El nombre es requerido</small>
        }
      </div>

      <div class="flex flex-col gap-2">
        <label for="email" class="font-medium">Email</label>
        <input
          id="email"
          type="email"
          pInputText
          formControlName="email"
          placeholder="juan@ejemplo.com"
          [class.ng-invalid]="form.get('email')?.invalid && form.get('email')?.touched"
        />
        @if (form.get('email')?.invalid && form.get('email')?.touched) {
          <small class="text-danger-500">Email inválido</small>
        }
      </div>

      <div class="flex flex-col gap-2">
        <label for="role" class="font-medium">Rol</label>
        <p-dropdown
          inputId="role"
          formControlName="role"
          [options]="roles"
          optionLabel="label"
          optionValue="value"
          placeholder="Seleccionar rol"
        />
      </div>

      <div class="flex gap-3 pt-4">
        <p-button type="submit" label="Guardar" [disabled]="form.invalid">
          <lucide-icon [img]="Save" [size]="16" />
        </p-button>

        <p-button
          type="button"
          label="Cancelar"
          severity="secondary"
          [outlined]="true"
          (click)="onCancel()"
        >
          <lucide-icon [img]="X" [size]="16" />
        </p-button>
      </div>
    </form>
  `,
})
export class UserFormComponent {
  private fb = inject(FormBuilder);

  protected readonly Save = Save;
  protected readonly X = X;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
  });

  roles = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Usuario', value: 'user' },
    { label: 'Invitado', value: 'guest' },
  ];

  onSubmit() {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
    }
  }

  onCancel() {
    this.form.reset();
  }
}
```

---

## Tablas

### Tabla de Datos con PrimeNG

```typescript
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { LucideAngularModule, Edit, Trash2 } from 'lucide-angular';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-users-table',
  imports: [TableModule, ButtonModule, TagModule, LucideAngularModule],
  template: `
    <p-table [value]="users" [tableStyle]="{ 'min-width': '50rem' }">
      <ng-template pTemplate="header">
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-user>
        <tr>
          <td>{{ user.name }}</td>
          <td class="opacity-80">{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <p-tag
              [value]="user.status === 'active' ? 'Activo' : 'Inactivo'"
              [severity]="user.status === 'active' ? 'success' : 'danger'"
            />
          </td>
          <td>
            <div class="flex gap-2">
              <p-button
                [text]="true"
                [rounded]="true"
                [attr.aria-label]="'common.actions.edit' | translate"
              >
                <lucide-icon [img]="Edit" [size]="16" class="text-primary-500" />
              </p-button>

              <p-button
                [text]="true"
                [rounded]="true"
                severity="danger"
                [attr.aria-label]="'common.actions.delete' | translate"
              >
                <lucide-icon [img]="Trash2" [size]="16" class="text-danger-500" />
              </p-button>
            </div>
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class UsersTableComponent {
  protected readonly Edit = Edit;
  protected readonly Trash2 = Trash2;

  users: User[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan@ejemplo.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'María García', email: 'maria@ejemplo.com', role: 'Usuario', status: 'active' },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos@ejemplo.com',
      role: 'Usuario',
      status: 'inactive',
    },
  ];
}
```

---

## Gráficos con ECharts

### Gráfico con ThemeColorsService

```typescript
import { Component, inject, computed } from '@angular/core';
import { ThemeColorsService } from '@/core/services/theme-colors.service';
import { ChartComponent } from '@/shared/components/chart/chart.component';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-sales-chart',
  imports: [ChartComponent],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">Ventas Mensuales</h2>
      <app-chart [option]="chartOption()" class="h-[400px]" />
    </div>
  `,
})
export class SalesChartComponent {
  private colors = inject(ThemeColorsService);

  protected chartOption = computed<EChartsOption>(() => ({
    title: {
      text: 'Ventas 2024',
      textStyle: {
        color: this.colors.textColor(),
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
      data: ['Ventas', 'Objetivo'],
      textStyle: {
        color: this.colors.textColor(),
      },
    },
    xAxis: {
      type: 'category',
      data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      axisLabel: {
        color: this.colors.textColor(),
      },
      axisLine: {
        lineStyle: {
          color: this.colors.borderColor(),
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: this.colors.textColor(),
      },
      axisLine: {
        lineStyle: {
          color: this.colors.borderColor(),
        },
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
        name: 'Objetivo',
        type: 'line',
        data: [100, 180, 140, 90, 85, 120],
        itemStyle: {
          color: this.colors.successColor,
        },
      },
    ],
  }));
}
```

---

## Tema Claro/Oscuro

### Componente de Cambio de Tema

```typescript
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '@/core/services/theme.service';
import { LucideAngularModule, Sun, Moon } from 'lucide-angular';

@Component({
  selector: 'app-theme-toggle',
  imports: [ButtonModule, LucideAngularModule],
  template: `
    <p-button
      (click)="themeService.toggleTheme()"
      [rounded]="true"
      [outlined]="true"
      [attr.aria-label]="
        themeService.isDarkMode()
          ? ('theme.toggle.toLight' | translate)
          : ('theme.toggle.toDark' | translate)
      "
    >
      <lucide-icon
        [img]="themeService.isDarkMode() ? Sun : Moon"
        [size]="20"
        [class]="themeService.isDarkMode() ? 'text-warning-500' : 'text-primary-500'"
      />
    </p-button>
  `,
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);

  protected readonly Sun = Sun;
  protected readonly Moon = Moon;
}
```

---

## Accesibilidad

### Ejemplos con ARIA y Foco

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule, X, Info } from 'lucide-angular';

@Component({
  selector: 'app-accessible-examples',
  imports: [ButtonModule, LucideAngularModule],
  template: `
    <div class="space-y-6">
      <!-- Botón icon-only con aria-label -->
      <p-button [rounded]="true" [attr.aria-label]="'common.actions.closeDialog' | translate">
        <lucide-icon [img]="X" [size]="20" />
      </p-button>

      <!-- Notificación con role y aria-live -->
      <div
        role="alert"
        aria-live="polite"
        class="flex items-start gap-3 p-4 rounded-lg border border-info-500 bg-info-50 dark:bg-info-900/20"
      >
        <lucide-icon [img]="Info" class="text-info-500" [size]="20" />
        <div>
          <p class="font-medium">Información importante</p>
          <p class="opacity-80 text-sm">Mensaje descriptivo</p>
        </div>
      </div>

      <!-- Link con contraste adecuado -->
      <a
        href="#"
        class="text-primary-600 dark:text-primary-400 underline hover:text-primary-700 dark:hover:text-primary-300"
        [attr.aria-label]="'common.actions.readMoreInfo' | translate"
      >
        Leer más
      </a>

      <!-- Focus visible -->
      <button
        class="p-3 rounded-lg border border-surface-300 dark:border-surface-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Botón con focus visible
      </button>
    </div>
  `,
})
export class AccessibleExamplesComponent {
  protected readonly X = X;
  protected readonly Info = Info;
}
```

---

## 🎯 Resumen de Mejores Prácticas

### ✅ Hacer

1. **Heredar colores de texto** - No usar clases `text-*` en elementos de texto
2. **Usar ThemeColorsService** - Para gráficos ECharts que se adapten al tema
3. **Iconos con colores semánticos** - Usar clases explícitas en iconos para jerarquía visual
4. **ARIA labels traducidos** - Siempre en botones solo-icono usando claves i18n
5. **Validación reactiva** - Mostrar errores solo después de touched
6. **Focus visible** - Usar `:focus-visible` para navegación por teclado
7. **Opacidad para jerarquía** - `opacity-80`, `opacity-70` para texto secundario

### ❌ Evitar

1. No hardcodear colores en componentes
2. No usar `text-surface-*` en elementos de texto
3. No hardcodear `aria-label` en iconos interactivos (usar `translate` + keys i18n)
4. No usar iconos PrimeIcons en UI custom (solo Lucide)
5. No definir colores en múltiples lugares

### 🔄 Flujo para Editar Colores

```bash
# 1. Editar colores
# src/app/core/constants/colors.constants.ts

# 2. Rebuild la aplicación (la integración oficial aplica cambios de theme/clases)
pnpm start    # Development con watch mode
# o
pnpm build    # Production build

# 3. Verificar cambios
# Todo se actualiza automáticamente:
# - Tailwind CSS classes (bg-*, text-*, border-*)
# - Tokens del theme PrimeNG + clases Tailwind
# - ThemeColorsService signals reactivos
```

### 📝 Añadir Componentes de PrimeNG

Para estilizar nuevos componentes PrimeNG con los colores Konecta:

```bash
# 1. Consultar la guía
# .github/UI/primeng-theming-guide.md

# 2. Ajustar theme/configuración si hace falta
# app.config.ts / estilos puntuales

# 3. Validar comportamiento en light/dark y aplicar override mínimo si procede

# 4. Rebuild
pnpm start

# 5. Verificar en ambos temas (light/dark)
```

---

**Última actualización**: Febrero 2026  
**Stack**: Angular 21.1.0 | PrimeNG 21.1.1 | Tailwind 3.x | Lucide 0.563.0

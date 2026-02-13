# Consideraciones para Nuevo Proyecto Angular + Tailwind CSS

## 📋 Setup Inicial - Checklist de Configuración

---

## 1. 🎨 Librerías de Iconos

### Opciones Recomendadas

#### Opción A: **Lucide Angular** (Recomendada)
```bash
npm install lucide-angular
```
**Ventajas:**
- ✅ 1,400+ iconos modernos y consistentes
- ✅ Tree-shakeable (solo importas los que usas)
- ✅ Soporte oficial para Angular
- ✅ Customizable (color, size, stroke-width)
- ✅ Open source y gratuito
- ✅ Excelente con Tailwind CSS

**Implementación:**
```typescript
// app.config.ts o app.module.ts
import { LucideAngularModule, Home, User, Settings } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({ Home, User, Settings })
  ]
})
```

```html
<!-- Uso en templates -->
<lucide-icon name="home" [size]="24" class="text-primary"></lucide-icon>
```

#### Opción B: **Heroicons**
```bash
npm install @ng-icons/core @ng-icons/heroicons
```

**Ventajas:**
- ✅ Diseñados por Tailwind Labs
- ✅ Perfecta integración con Tailwind
- ✅ Outline y Solid variants
- ✅ 292 iconos curados

#### Opción C: **Phosphor Icons**
```bash
npm install @phosphor-icons/angular
```

**Ventajas:**
- ✅ 9,072+ iconos
- ✅ 6 estilos diferentes (thin, light, regular, bold, fill, duotone)
- ✅ Muy flexible

### 📦 Pack de Iconos Custom

Si necesitas iconos propios de la empresa:

```typescript
// src/app/shared/icons/
export const CUSTOM_ICONS = {
  'company-logo': '<svg>...</svg>',
  'custom-chart': '<svg>...</svg>',
};

// icon.component.ts
@Component({
  selector: 'app-icon',
  template: `<span [innerHTML]="safeIcon" [class]="classes"></span>`,
  standalone: true
})
export class IconComponent {
  @Input() name!: string;
  @Input() size: number = 24;
  @Input() class: string = '';
  
  get safeIcon() {
    return this.sanitizer.bypassSecurityTrustHtml(
      CUSTOM_ICONS[this.name] || ''
    );
  }
}
```

### ✅ Decisión Recomendada
**Lucide Angular** + pack custom para iconos específicos de la empresa.

---

## 2. 🔧 Configuración de Path Aliases (tsconfig.json)

### Configuración Completa

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@app/*": ["app/*"],
      "@core/*": ["app/core/*"],
      "@shared/*": ["app/shared/*"],
      "@features/*": ["app/features/*"],
      "@environments/*": ["environments/*"],
      "@assets/*": ["assets/*"],
      "@models/*": ["app/core/models/*"],
      "@services/*": ["app/core/services/*"],
      "@utils/*": ["app/shared/utils/*"],
      "@components/*": ["app/shared/components/*"],
      "@guards/*": ["app/core/guards/*"],
      "@interceptors/*": ["app/core/interceptors/*"],
      "@constants/*": ["app/core/constants/*"],
      "@config/*": ["app/core/config/*"]
    }
  }
}
```

### Ejemplos de Uso

**Antes:**
```typescript
import { UserService } from '../../../core/services/user.service';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { ButtonComponent } from '../../../shared/components/button/button.component';
```

**Después:**
```typescript
import { UserService } from '@services/user.service';
import { AuthGuard } from '@guards/auth.guard';
import { ButtonComponent } from '@components/button/button.component';
```

### Estructura de Carpetas Recomendada

```
src/
├── app/
│   ├── core/                    # @core/*
│   │   ├── guards/              # @guards/*
│   │   ├── interceptors/        # @interceptors/*
│   │   ├── services/            # @services/*
│   │   ├── models/              # @models/*
│   │   ├── constants/           # @constants/*
│   │   └── config/              # @config/*
│   │
│   ├── shared/                  # @shared/*
│   │   ├── components/          # @components/*
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── utils/               # @utils/*
│   │
│   ├── features/                # @features/*
│   │   ├── dashboard/
│   │   ├── users/
│   │   └── settings/
│   │
├── assets/                      # @assets/*
└── environments/                # @environments/*
```

### Nota Importante
Después de modificar `tsconfig.json`, reiniciar el servidor de desarrollo (`ng serve`).

---

## 3. 🧩 Componentes Reutilizables - Librería Base

### Lista de Componentes Esenciales

#### 3.1. **Button Component**
```typescript
// src/app/shared/components/button/button.component.ts
@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="buttonClasses"
      (click)="handleClick($event)"
    >
      <lucide-icon 
        *ngIf="loading" 
        name="loader-circle" 
        class="animate-spin mr-2"
        [size]="16"
      ></lucide-icon>
      <lucide-icon 
        *ngIf="icon && !loading" 
        [name]="icon" 
        [size]="iconSize"
        [class]="iconPosition === 'left' ? 'mr-2' : 'ml-2'"
      ></lucide-icon>
      <ng-content></ng-content>
    </button>
  `,
  imports: [CommonModule, LucideAngularModule]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() fullWidth = false;
  @Output() clicked = new EventEmitter<Event>();

  get buttonClasses(): string {
    return [
      'inline-flex items-center justify-center',
      'rounded-lg font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      this.sizeClasses,
      this.variantClasses,
      this.fullWidth ? 'w-full' : ''
    ].join(' ');
  }

  get sizeClasses(): string {
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };
    return sizes[this.size];
  }

  get variantClasses(): string {
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20',
      ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    };
    return variants[this.variant];
  }

  handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
```

**Uso:**
```html
<app-button variant="primary" size="md" icon="save" (clicked)="onSave()">
  Guardar
</app-button>

<app-button variant="outline" [loading]="isLoading">
  Procesar
</app-button>
```

---

#### 3.2. **Input Component**
```typescript
@Component({
  selector: 'app-input',
  standalone: true,
  template: `
    <div class="space-y-1">
      <label *ngIf="label" [for]="id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>
      
      <div class="relative">
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [required]="required"
          [class]="inputClasses"
          [(ngModel)]="value"
          (blur)="onTouched()"
          (input)="onChange($event)"
        />
        
        <lucide-icon
          *ngIf="icon"
          [name]="icon"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          [size]="20"
        ></lucide-icon>
        
        <lucide-icon
          *ngIf="error"
          name="alert-circle"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
          [size]="20"
        ></lucide-icon>
      </div>
      
      <p *ngIf="hint && !error" class="text-sm text-gray-500 dark:text-gray-400">
        {{ hint }}
      </p>
      
      <p *ngIf="error" class="text-sm text-red-600 dark:text-red-400">
        {{ error }}
      </p>
    </div>
  `,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() id = `input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label?: string;
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() icon?: string;
  @Input() hint?: string;
  @Input() error?: string;
  
  value: any = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  get inputClasses(): string {
    return [
      'block w-full rounded-lg border',
      'px-4 py-2.5 text-gray-900 dark:text-white',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
      'bg-white dark:bg-gray-800',
      'transition-colors duration-200',
      this.icon ? 'pl-10' : '',
      this.error 
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
        : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed'
    ].join(' ');
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
```

---

#### 3.3. **Card Component**
```typescript
@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div [class]="cardClasses">
      <div *ngIf="header" class="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ header }}
        </h3>
      </div>
      
      <div [class]="bodyClasses">
        <ng-content></ng-content>
      </div>
      
      <div *ngIf="hasFooter" class="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  imports: [CommonModule]
})
export class CardComponent {
  @Input() header?: string;
  @Input() padding: boolean = true;
  @Input() hover: boolean = false;
  @ContentChild('footer') hasFooter?: any;

  get cardClasses(): string {
    return [
      'bg-white dark:bg-gray-800',
      'border border-gray-200 dark:border-gray-700',
      'rounded-xl shadow-sm',
      this.hover ? 'hover:shadow-md transition-shadow duration-200' : ''
    ].join(' ');
  }

  get bodyClasses(): string {
    return this.padding ? 'p-6' : '';
  }
}
```

---

#### 3.4. **Modal Component**
```typescript
@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        (click)="closeOnBackdrop && close()"
      ></div>
      
      <!-- Modal -->
      <div class="flex min-h-screen items-center justify-center p-4">
        <div 
          [class]="modalClasses"
          [@modalAnimation]
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ title }}
            </h2>
            <button
              *ngIf="closeable"
              (click)="close()"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <lucide-icon name="x" [size]="24"></lucide-icon>
            </button>
          </div>
          
          <!-- Body -->
          <div class="p-6">
            <ng-content></ng-content>
          </div>
          
          <!-- Footer -->
          <div *ngIf="hasFooter" class="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <ng-content select="[footer]"></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ],
  imports: [CommonModule, LucideAngularModule]
})
export class ModalComponent {
  @Input() title = '';
  @Input() isOpen = false;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() closeable = true;
  @Input() closeOnBackdrop = true;
  @Output() closed = new EventEmitter<void>();
  @ContentChild('footer') hasFooter?: any;

  get modalClasses(): string {
    const sizes = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl'
    };
    
    return [
      'relative w-full',
      sizes[this.size],
      'bg-white dark:bg-gray-800',
      'rounded-xl shadow-xl',
      'transform transition-all'
    ].join(' ');
  }

  close(): void {
    this.isOpen = false;
    this.closed.emit();
  }
}
```

---

#### 3.5. **Loading Spinner Component**
```typescript
@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <div [class]="containerClasses">
      <lucide-icon 
        name="loader-circle" 
        [size]="size" 
        class="animate-spin text-primary-600"
      ></lucide-icon>
      <p *ngIf="text" [class]="textClasses">{{ text }}</p>
    </div>
  `,
  imports: [CommonModule, LucideAngularModule]
})
export class SpinnerComponent {
  @Input() size: number = 24;
  @Input() text?: string;
  @Input() centered: boolean = true;

  get containerClasses(): string {
    return [
      'flex flex-col items-center gap-2',
      this.centered ? 'justify-center min-h-[200px]' : ''
    ].join(' ');
  }

  get textClasses(): string {
    return 'text-sm text-gray-600 dark:text-gray-400';
  }
}
```

---

#### 3.6. **Toast/Notification Component**
```typescript
// toast.service.ts
@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  show(message: string, type: ToastType = 'info', duration = 5000): void {
    const toast: Toast = {
      id: Date.now().toString(),
      message,
      type,
      duration
    };
    
    this.toastsSubject.next([...this.toastsSubject.value, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(toast.id), duration);
    }
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  remove(id: string): void {
    this.toastsSubject.next(
      this.toastsSubject.value.filter(t => t.id !== id)
    );
  }
}

// toast.component.ts
@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div
        *ngFor="let toast of toasts$ | async"
        [class]="getToastClasses(toast.type)"
        [@toastAnimation]
      >
        <lucide-icon [name]="getIcon(toast.type)" [size]="20"></lucide-icon>
        <p class="flex-1">{{ toast.message }}</p>
        <button (click)="remove(toast.id)" class="text-current opacity-70 hover:opacity-100">
          <lucide-icon name="x" [size]="18"></lucide-icon>
        </button>
      </div>
    </div>
  `,
  imports: [CommonModule, LucideAngularModule, AsyncPipe],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ToastContainerComponent {
  toasts$ = this.toastService.toasts$;

  constructor(private toastService: ToastService) {}

  getToastClasses(type: ToastType): string {
    const base = 'flex items-center gap-3 p-4 rounded-lg shadow-lg min-w-[300px] max-w-md';
    const types = {
      success: 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      error: 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    };
    return `${base} ${types[type]}`;
  }

  getIcon(type: ToastType): string {
    const icons = {
      success: 'check-circle',
      error: 'x-circle',
      warning: 'alert-triangle',
      info: 'info'
    };
    return icons[type];
  }

  remove(id: string): void {
    this.toastService.remove(id);
  }
}
```

---

#### 3.7. **Dropdown Component**
```typescript
@Component({
  selector: 'app-dropdown',
  standalone: true,
  template: `
    <div class="relative" (clickOutside)="close()">
      <button
        (click)="toggle()"
        [class]="triggerClasses"
      >
        <ng-content select="[trigger]"></ng-content>
      </button>
      
      <div
        *ngIf="isOpen"
        [class]="menuClasses"
        [@dropdownAnimation]
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  imports: [CommonModule],
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class DropdownComponent {
  @Input() position: 'left' | 'right' = 'right';
  isOpen = false;

  get triggerClasses(): string {
    return 'focus:outline-none';
  }

  get menuClasses(): string {
    const positions = {
      left: 'left-0',
      right: 'right-0'
    };
    
    return [
      'absolute top-full mt-2',
      positions[this.position],
      'min-w-[200px]',
      'bg-white dark:bg-gray-800',
      'border border-gray-200 dark:border-gray-700',
      'rounded-lg shadow-lg',
      'py-1',
      'z-10'
    ].join(' ');
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  close(): void {
    this.isOpen = false;
  }
}
```

---

### 📦 Checklist Componentes

- [ ] Button
- [ ] Input / Textarea
- [ ] Select / Dropdown
- [ ] Card
- [ ] Modal / Dialog
- [ ] Toast / Notification
- [ ] Loading Spinner
- [ ] Badge
- [ ] Table
- [ ] Pagination
- [ ] Tabs
- [ ] Accordion
- [ ] Tooltip
- [ ] Avatar
- [ ] Checkbox / Radio
- [ ] Toggle / Switch
- [ ] DatePicker
- [ ] Breadcrumbs
- [ ] Sidebar / Menu
- [ ] Navbar / Header

---

## 4. 🌗 Theme Dark/Light Mode

### Sistema de Themes con Tailwind CSS

#### 4.1. Configuración de Tailwind

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Habilitar dark mode con clase
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Paleta de colores (ver sección 6)
      }
    }
  }
}
```

#### 4.2. Theme Service

```typescript
// src/app/core/services/theme.service.ts
import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  
  // Signal para el theme actual
  theme = signal<Theme>(this.getStoredTheme());
  
  // Signal computado para el theme efectivo
  effectiveTheme = computed(() => {
    const theme = this.theme();
    if (theme === 'system') {
      return this.getSystemTheme();
    }
    return theme;
  });

  constructor() {
    // Effect para aplicar el theme cuando cambie
    effect(() => {
      this.applyTheme(this.effectiveTheme());
    });

    // Escuchar cambios en preferencias del sistema
    this.watchSystemTheme();
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  toggleTheme(): void {
    const current = this.effectiveTheme();
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  private getStoredTheme(): Theme {
    const stored = localStorage.getItem(this.THEME_KEY);
    return (stored as Theme) || 'system';
  }

  private getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  }

  private watchSystemTheme(): void {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (this.theme() === 'system') {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
  }
}
```

#### 4.3. Theme Toggle Component

```typescript
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button
      (click)="toggleTheme()"
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      [attr.aria-label]="'Cambiar a modo ' + (isDark() ? 'claro' : 'oscuro')"
    >
      <lucide-icon 
        [name]="isDark() ? 'sun' : 'moon'" 
        [size]="20"
        class="text-gray-700 dark:text-gray-300"
      ></lucide-icon>
    </button>
  `,
  imports: [LucideAngularModule]
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);
  
  isDark = computed(() => this.themeService.effectiveTheme() === 'dark');

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
```

#### 4.4. Theme Selector Component (con opción System)

```typescript
@Component({
  selector: 'app-theme-selector',
  standalone: true,
  template: `
    <div class="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <button
        *ngFor="let option of themeOptions"
        (click)="selectTheme(option.value)"
        [class]="getButtonClasses(option.value)"
      >
        <lucide-icon [name]="option.icon" [size]="18"></lucide-icon>
        <span class="text-sm">{{ option.label }}</span>
      </button>
    </div>
  `,
  imports: [CommonModule, LucideAngularModule]
})
export class ThemeSelectorComponent {
  private themeService = inject(ThemeService);
  
  currentTheme = this.themeService.theme;

  themeOptions = [
    { value: 'light' as Theme, label: 'Claro', icon: 'sun' },
    { value: 'dark' as Theme, label: 'Oscuro', icon: 'moon' },
    { value: 'system' as Theme, label: 'Sistema', icon: 'monitor' }
  ];

  selectTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  getButtonClasses(theme: Theme): string {
    const isActive = this.currentTheme() === theme;
    return [
      'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
      isActive
        ? 'bg-white dark:bg-gray-700 shadow-sm'
        : 'hover:bg-gray-200 dark:hover:bg-gray-700/50'
    ].join(' ');
  }
}
```

#### 4.5. Inicialización en app.component.ts

```typescript
@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-toast-container></app-toast-container>
  `
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    // El theme service se inicializa automáticamente
    // debido a providedIn: 'root'
  }
}
```

---

## 5. 🛡️ Core Module - Guards, Interceptors, Error Handling

### Estructura Core

```
src/app/core/
├── guards/
│   ├── auth.guard.ts
│   ├── role.guard.ts
│   └── unsaved-changes.guard.ts
├── interceptors/
│   ├── auth.interceptor.ts
│   ├── error.interceptor.ts
│   ├── loading.interceptor.ts
│   └── retry.interceptor.ts
├── services/
│   ├── error-handler.service.ts
│   └── http-error-handler.service.ts
├── models/
│   ├── api-response.model.ts
│   ├── error.model.ts
│   └── http-status.enum.ts
└── constants/
    └── http-status-codes.ts
```

---

### 5.1. HTTP Status Codes

```typescript
// src/app/core/constants/http-status-codes.ts
export enum HttpStatusCode {
  // 2xx Success
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // 3xx Redirection
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  NOT_MODIFIED = 304,

  // 4xx Client Errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504
}

export const HTTP_STATUS_MESSAGES: Record<number, string> = {
  [HttpStatusCode.BAD_REQUEST]: 'Solicitud inválida',
  [HttpStatusCode.UNAUTHORIZED]: 'No autorizado. Por favor, inicie sesión',
  [HttpStatusCode.FORBIDDEN]: 'No tiene permisos para realizar esta acción',
  [HttpStatusCode.NOT_FOUND]: 'Recurso no encontrado',
  [HttpStatusCode.CONFLICT]: 'Conflicto con el estado actual del recurso',
  [HttpStatusCode.UNPROCESSABLE_ENTITY]: 'Datos de entrada no válidos',
  [HttpStatusCode.TOO_MANY_REQUESTS]: 'Demasiadas solicitudes. Intente más tarde',
  [HttpStatusCode.INTERNAL_SERVER_ERROR]: 'Error interno del servidor',
  [HttpStatusCode.SERVICE_UNAVAILABLE]: 'Servicio no disponible temporalmente'
};
```

---

### 5.2. Error Models

```typescript
// src/app/core/models/error.model.ts
export interface AppError {
  code: string;
  message: string;
  statusCode: number;
  timestamp: Date;
  details?: any;
  path?: string;
}

export interface ApiErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: any;
  };
  statusCode: number;
  timestamp: string;
  path: string;
}

// src/app/core/models/api-response.model.ts
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
```

---

### 5.3. Guards

#### Auth Guard
```typescript
// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '@services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Guardar la URL intentada para redireccionar después del login
  authService.setRedirectUrl(state.url);
  
  return router.createUrlTree(['/auth/login']);
};
```

#### Role Guard
```typescript
// src/app/core/guards/role.guard.ts
export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  const requiredRoles = route.data['roles'] as string[];
  
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  const userRoles = authService.getUserRoles();
  const hasRole = requiredRoles.some(role => userRoles.includes(role));

  if (hasRole) {
    return true;
  }

  toastService.error('No tiene permisos para acceder a esta página');
  return router.createUrlTree(['/dashboard']);
};

// Uso en routing:
// {
//   path: 'admin',
//   canActivate: [authGuard, roleGuard],
//   data: { roles: ['admin', 'superadmin'] },
//   loadComponent: () => import('./admin.component')
// }
```

#### Unsaved Changes Guard
```typescript
// src/app/core/guards/unsaved-changes.guard.ts
export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const unsavedChangesGuard: CanDeactivateFn<ComponentCanDeactivate> = (
  component
) => {
  if (!component.canDeactivate || component.canDeactivate()) {
    return true;
  }

  return confirm('¿Está seguro de salir? Los cambios no guardados se perderán.');
};
```

---

### 5.4. Interceptors

#### Auth Interceptor
```typescript
// src/app/core/interceptors/auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  const token = authService.getToken();
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
```

#### Error Interceptor
```typescript
// src/app/core/interceptors/error.interceptor.ts
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastService = inject(ToastService);
  const errorHandler = inject(HttpErrorHandlerService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const appError = errorHandler.handleError(error, req.url);

      // Manejo específico por status code
      switch (error.status) {
        case HttpStatusCode.UNAUTHORIZED:
          router.navigate(['/auth/login']);
          break;
          
        case HttpStatusCode.FORBIDDEN:
          toastService.error(appError.message);
          router.navigate(['/dashboard']);
          break;
          
        case HttpStatusCode.NOT_FOUND:
          toastService.warning(appError.message);
          break;
          
        case HttpStatusCode.INTERNAL_SERVER_ERROR:
        case HttpStatusCode.SERVICE_UNAVAILABLE:
          toastService.error('Error del servidor. Intente nuevamente más tarde');
          break;
          
        default:
          if (error.status >= 400) {
            toastService.error(appError.message);
          }
      }

      return throwError(() => appError);
    })
  );
};
```

#### Loading Interceptor
```typescript
// src/app/core/interceptors/loading.interceptor.ts
@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  
  private requestCount = 0;

  show(): void {
    this.requestCount++;
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.loadingSubject.next(false);
    }
  }
}

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Excluir ciertas URLs del loading global
  const excludedUrls = ['/api/notifications', '/api/heartbeat'];
  const shouldShowLoading = !excludedUrls.some(url => req.url.includes(url));

  if (shouldShowLoading) {
    loadingService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (shouldShowLoading) {
        loadingService.hide();
      }
    })
  );
};
```

#### Retry Interceptor
```typescript
// src/app/core/interceptors/retry.interceptor.ts
export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  const maxRetries = 3;
  const retryDelay = 1000; // ms
  
  // Solo reintentar en métodos GET y errores de red/servidor
  const shouldRetry = (error: HttpErrorResponse) => {
    return req.method === 'GET' && 
           (error.status === 0 || error.status >= 500);
  };

  return next(req).pipe(
    retry({
      count: maxRetries,
      delay: (error: HttpErrorResponse, retryCount) => {
        if (!shouldRetry(error)) {
          return throwError(() => error);
        }
        
        console.log(`Retry attempt ${retryCount} for ${req.url}`);
        return timer(retryDelay * retryCount);
      }
    })
  );
};
```

---

### 5.5. Error Handler Service

```typescript
// src/app/core/services/http-error-handler.service.ts
@Injectable({ providedIn: 'root' })
export class HttpErrorHandlerService {
  
  handleError(error: HttpErrorResponse, url: string): AppError {
    let appError: AppError;

    if (error.error instanceof ErrorEvent) {
      // Error del cliente o de red
      appError = {
        code: 'CLIENT_ERROR',
        message: 'Error de conexión. Verifique su conexión a internet',
        statusCode: 0,
        timestamp: new Date(),
        path: url
      };
    } else {
      // Error del backend
      const apiError = error.error as ApiErrorResponse;
      
      appError = {
        code: apiError?.error?.code || `HTTP_${error.status}`,
        message: this.getErrorMessage(error, apiError),
        statusCode: error.status,
        timestamp: new Date(),
        details: apiError?.error?.details,
        path: url
      };
    }

    // Log del error (puede enviarse a un servicio de logging)
    console.error('HTTP Error:', appError);

    return appError;
  }

  private getErrorMessage(
    error: HttpErrorResponse, 
    apiError?: ApiErrorResponse
  ): string {
    // Mensaje personalizado del backend
    if (apiError?.error?.message) {
      return apiError.error.message;
    }

    // Mensaje por defecto según status code
    return HTTP_STATUS_MESSAGES[error.status] || 
           'Ha ocurrido un error inesperado';
  }
}

// src/app/core/services/error-handler.service.ts
@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
    private zone: NgZone
  ) {}

  handleError(error: any): void {
    const toastService = this.injector.get(ToastService);

    this.zone.run(() => {
      if (error instanceof HttpErrorResponse) {
        // Ya manejado por el interceptor
        return;
      }

      // Error de la aplicación
      console.error('Application Error:', error);
      
      toastService.error(
        'Ha ocurrido un error inesperado. Por favor, recargue la página'
      );

      // Aquí puedes enviar el error a un servicio de logging como Sentry
      // this.logErrorToService(error);
    });
  }
}
```

---

### 5.6. Configuración en app.config.ts

```typescript
// src/app/app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loadingInterceptor,
        retryInterceptor,
        errorInterceptor
      ])
    ),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    // Otros providers
  ]
};
```

---

## 6. 🎨 Paleta de Colores Centralizada

### Configuración en Tailwind

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Primary - Color principal de la marca
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Color base
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        
        // Secondary - Color secundario
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',  // Color base
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        
        // Accent - Color de acento
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',  // Color base
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e'
        },

        // Success
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',  // Color base
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16'
        },

        // Warning
        warning: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',  // Color base
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006'
        },

        // Error/Danger
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',  // Color base
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a'
        },

        // Gray - Base para fondos y textos
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        }
      },

      // Configuración específica para dark mode
      backgroundColor: {
        'dark-bg': '#0f172a',
        'dark-surface': '#1e293b',
        'dark-elevated': '#334155'
      },

      textColor: {
        'dark-primary': '#f1f5f9',
        'dark-secondary': '#cbd5e1',
        'dark-tertiary': '#94a3b8'
      },

      borderColor: {
        'dark-border': '#334155',
        'dark-border-light': '#475569'
      }
    }
  },
  plugins: []
}
```

---

### CSS Variables Approach (Alternativa)

```scss
// src/styles/themes/_colors.scss
:root {
  // Primary
  --color-primary-50: 239 246 255;
  --color-primary-500: 59 130 246;
  --color-primary-600: 37 99 235;
  --color-primary-700: 29 78 216;
  
  // Background
  --color-bg-primary: 255 255 255;
  --color-bg-secondary: 249 250 251;
  --color-bg-tertiary: 243 244 246;
  
  // Text
  --color-text-primary: 17 24 39;
  --color-text-secondary: 75 85 99;
  --color-text-tertiary: 156 163 175;
  
  // Borders
  --color-border-primary: 229 231 235;
  --color-border-secondary: 209 213 219;
}

.dark {
  // Primary (mismo en dark mode)
  --color-primary-50: 239 246 255;
  --color-primary-500: 59 130 246;
  --color-primary-600: 37 99 235;
  --color-primary-700: 29 78 216;
  
  // Background
  --color-bg-primary: 15 23 42;
  --color-bg-secondary: 30 41 59;
  --color-bg-tertiary: 51 65 85;
  
  // Text
  --color-text-primary: 241 245 249;
  --color-text-secondary: 203 213 225;
  --color-text-tertiary: 148 163 184;
  
  // Borders
  --color-border-primary: 51 65 85;
  --color-border-secondary: 71 85 105;
}

// Utility classes
.bg-primary { 
  background-color: rgb(var(--color-bg-primary)); 
}
.text-primary { 
  color: rgb(var(--color-text-primary)); 
}
.border-primary { 
  border-color: rgb(var(--color-border-primary)); 
}
```

---

### Theme Preset Service

```typescript
// src/app/core/services/theme-preset.service.ts
export interface ThemePreset {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

@Injectable({ providedIn: 'root' })
export class ThemePresetService {
  private presets: ThemePreset[] = [
    {
      name: 'blue',
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        accent: '#d946ef'
      }
    },
    {
      name: 'green',
      colors: {
        primary: '#22c55e',
        secondary: '#64748b',
        accent: '#f59e0b'
      }
    },
    {
      name: 'purple',
      colors: {
        primary: '#a855f7',
        secondary: '#64748b',
        accent: '#06b6d4'
      }
    }
  ];

  private currentPreset = signal<string>('blue');

  getPresets(): ThemePreset[] {
    return this.presets;
  }

  setPreset(name: string): void {
    const preset = this.presets.find(p => p.name === name);
    if (preset) {
      this.currentPreset.set(name);
      this.applyPreset(preset);
      localStorage.setItem('theme-preset', name);
    }
  }

  private applyPreset(preset: ThemePreset): void {
    const root = document.documentElement;
    
    // Aplicar colores como CSS variables
    Object.entries(preset.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }

  loadSavedPreset(): void {
    const saved = localStorage.getItem('theme-preset');
    if (saved) {
      this.setPreset(saved);
    }
  }
}
```

---

### Ejemplos de Uso de Colores

```html
<!-- Light mode -->
<div class="bg-white text-gray-900 border border-gray-200">
  Content
</div>

<!-- Dark mode automático -->
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
  Content
</div>

<!-- Usando colores de marca -->
<button class="bg-primary-600 hover:bg-primary-700 text-white">
  Primary Button
</button>

<button class="bg-secondary-600 hover:bg-secondary-700 text-white">
  Secondary Button
</button>

<!-- Estados -->
<div class="bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-300 border border-success-200 dark:border-success-800">
  Success message
</div>

<div class="bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-300 border border-error-200 dark:border-error-800">
  Error message
</div>
```

---

## 7. 🌍 Organización de Traducciones (i18n)

### Estructura de Archivos

```
src/assets/i18n/
├── es/
│   ├── common.json          # Textos comunes (botones, labels, mensajes)
│   ├── validation.json      # Mensajes de validación
│   ├── errors.json          # Mensajes de error
│   ├── auth.json            # Módulo de autenticación
│   ├── dashboard.json       # Dashboard
│   ├── users.json           # Módulo de usuarios
│   └── settings.json        # Configuración
├── en/
│   ├── common.json
│   ├── validation.json
│   ├── errors.json
│   └── ...
└── ca/
    └── ...
```

---

### Estrategia de Organización

#### ✅ Opción Recomendada: Separación por Módulo/Feature

**Ventajas:**
- Fácil de mantener y escalar
-ArchIvos más pequeños y manejables
- Lazy loading por módulo
- Múltiples desarrolladores pueden trabajar sin conflictos

---

### Estructura de Claves

#### 1. **common.json** - Elementos Compartidos

```json
{
  "buttons": {
    "save": "Guardar",
    "cancel": "Cancelar",
    "delete": "Eliminar",
    "edit": "Editar",
    "create": "Crear",
    "search": "Buscar",
    "filter": "Filtrar",
    "export": "Exportar",
    "import": "Importar",
    "close": "Cerrar",
    "confirm": "Confirmar",
    "back": "Volver",
    "next": "Siguiente",
    "previous": "Anterior",
    "submit": "Enviar"
  },
  "labels": {
    "name": "Nombre",
    "email": "Correo electrónico",
    "password": "Contraseña",
    "phone": "Teléfono",
    "address": "Dirección",
    "description": "Descripción",
    "status": "Estado",
    "date": "Fecha",
    "actions": "Acciones"
  },
  "messages": {
    "loading": "Cargando...",
    "noData": "No hay datos disponibles",
    "success": "Operación exitosa",
    "error": "Ha ocurrido un error",
    "confirmDelete": "¿Está seguro de que desea eliminar este elemento?",
    "unsavedChanges": "Tiene cambios sin guardar. ¿Desea salir?"
  },
  "pagination": {
    "itemsPerPage": "Elementos por página",
    "showing": "Mostrando {{from}} a {{to}} de {{total}} elementos",
    "page": "Página",
    "of": "de"
  },
  "status": {
    "active": "Activo",
    "inactive": "Inactivo",
    "pending": "Pendiente",
    "completed": "Completado",
    "cancelled": "Cancelado"
  }
}
```

---

#### 2. **validation.json** - Mensajes de Validación

```json
{
  "required": "Este campo es obligatorio",
  "requiredField": "El campo {{field}} es obligatorio",
  "email": "Debe ser un correo electrónico válido",
  "minLength": "Debe tener al menos {{min}} caracteres",
  "maxLength": "No puede superar {{max}} caracteres",
  "min": "El valor mínimo es {{min}}",
  "max": "El valor máximo es {{max}}",
  "pattern": "El formato no es válido",
  "passwordMismatch": "Las contraseñas no coinciden",
  "invalidDate": "La fecha no es válida",
  "dateRange": "La fecha inicial debe ser anterior a la fecha final",
  "invalidPhone": "El número de teléfono no es válido",
  "invalidUrl": "La URL no es válida",
  "fileSize": "El archivo no puede superar {{size}}MB",
  "fileType": "Tipo de archivo no permitido",
  "unique": "Este valor ya existe",
  "numeric": "Solo se permiten números",
  "alphanumeric": "Solo se permiten letras y números"
}
```

---

#### 3. **errors.json** - Mensajes de Error HTTP

```json
{
  "http": {
    "400": "Solicitud inválida",
    "401": "No autorizado. Por favor, inicie sesión",
    "403": "No tiene permisos para realizar esta acción",
    "404": "Recurso no encontrado",
    "409": "Conflicto con el estado actual del recurso",
    "422": "Datos de entrada no válidos",
    "429": "Demasiadas solicitudes. Intente más tarde",
    "500": "Error interno del servidor",
    "503": "Servicio no disponible temporalmente"
  },
  "network": {
    "offline": "Sin conexión a internet",
    "timeout": "La solicitud ha excedido el tiempo de espera",
    "serverError": "Error del servidor. Intente nuevamente más tarde"
  },
  "generic": "Ha ocurrido un error inesperado"
}
```

---

#### 4. **auth.json** - Módulo de Autenticación

```json
{
  "login": {
    "title": "Iniciar Sesión",
    "subtitle": "Ingrese sus credenciales para continuar",
    "email": "Correo electrónico",
    "password": "Contraseña",
    "rememberMe": "Recordarme",
    "forgotPassword": "¿Olvidó su contraseña?",
    "submit": "Iniciar Sesión",
    "noAccount": "¿No tiene cuenta?",
    "signUp": "Registrarse",
    "success": "Inicio de sesión exitoso",
    "error": "Credenciales inválidas"
  },
  "register": {
    "title": "Crear Cuenta",
    "name": "Nombre completo",
    "email": "Correo electrónico",
    "password": "Contraseña",
    "confirmPassword": "Confirmar contraseña",
    "terms": "Acepto los términos y condiciones",
    "submit": "Registrarse",
    "hasAccount": "¿Ya tiene cuenta?",
    "signIn": "Iniciar sesión",
    "success": "Cuenta creada exitosamente"
  },
  "forgotPassword": {
    "title": "Recuperar Contraseña",
    "description": "Ingrese su correo electrónico y le enviaremos instrucciones",
    "email": "Correo electrónico",
    "submit": "Enviar",
    "success": "Se ha enviado un correo con instrucciones",
    "backToLogin": "Volver al inicio de sesión"
  },
  "resetPassword": {
    "title": "Restablecer Contraseña",
    "newPassword": "Nueva contraseña",
    "confirmPassword": "Confirmar contraseña",
    "submit": "Restablecer",
    "success": "Contraseña restablecida exitosamente"
  }
}
```

---

#### 5. **dashboard.json** - Dashboard Principal

```json
{
  "title": "Panel de Control",
  "welcome": "Bienvenido, {{name}}",
  "stats": {
    "users": "Usuarios",
    "sales": "Ventas",
    "revenue": "Ingresos",
    "orders": "Pedidos"
  },
  "charts": {
    "salesByMonth": "Ventas por Mes",
    "userGrowth": "Crecimiento de Usuarios",
    "topProducts": "Productos Más Vendidos"
  },
  "recentActivity": {
    "title": "Actividad Reciente",
    "noActivity": "No hay actividad reciente"
  }
}
```

---

#### 6. **users.json** - Módulo de Usuarios

```json
{
  "list": {
    "title": "Usuarios",
    "createNew": "Nuevo Usuario",
    "search": "Buscar usuarios...",
    "columns": {
      "name": "Nombre",
      "email": "Email",
      "role": "Rol",
      "status": "Estado",
      "createdAt": "Fecha de Registro",
      "actions": "Acciones"
    },
    "empty": "No se encontraron usuarios",
    "filters": {
      "role": "Filtrar por rol",
      "status": "Filtrar por estado"
    }
  },
  "form": {
    "createTitle": "Crear Usuario",
    "editTitle": "Editar Usuario",
    "personalInfo": "Información Personal",
    "name": "Nombre completo",
    "email": "Correo electrónico",
    "phone": "Teléfono",
    "role": "Rol",
    "status": "Estado",
    "password": "Contraseña",
    "confirmPassword": "Confirmar contraseña",
    "submit": "Guardar",
    "cancel": "Cancelar"
  },
  "detail": {
    "title": "Detalle del Usuario",
    "info": "Información",
    "activity": "Actividad",
    "permissions": "Permisos"
  },
  "actions": {
    "edit": "Editar",
    "delete": "Eliminar",
    "activate": "Activar",
    "deactivate": "Desactivar",
    "resetPassword": "Restablecer Contraseña"
  },
  "messages": {
    "createSuccess": "Usuario creado exitosamente",
    "updateSuccess": "Usuario actualizado exitosamente",
    "deleteSuccess": "Usuario eliminado exitosamente",
    "deleteConfirm": "¿Está seguro de eliminar al usuario {{name}}?"
  },
  "roles": {
    "admin": "Administrador",
    "user": "Usuario",
    "moderator": "Moderador",
    "guest": "Invitado"
  }
}
```

---

### Convenciones de Nomenclatura

#### ✅ Buenas Prácticas

1. **camelCase para claves**
```json
{
  "confirmDelete": "¿Confirmar eliminación?",
  "itemsPerPage": "Elementos por página"
}
```

2. **Estructura jerárquica lógica**
```json
{
  "user": {
    "profile": {
      "edit": "Editar Perfil",
      "save": "Guardar Cambios"
    }
  }
}
```

3. **Nombres descriptivos y consistentes**
```json
{
  "form": {
    "createTitle": "Crear...",
    "editTitle": "Editar...",
    "viewTitle": "Ver..."
  }
}
```

4. **Plurales para listas**
```json
{
  "users": "Usuarios",
  "orders": "Pedidos",
  "products": "Productos"
}
```

---

### Uso en Componentes (con @ngx-translate)

#### Instalación
```bash
npm install @ngx-translate/core @ngx-translate/http-loader
```

#### Configuración

```typescript
// app.config.ts
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'es',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};
```

#### Uso en Templates

```html
<!-- Traducción simple -->
<h1>{{ 'common.buttons.save' | translate }}</h1>

<!-- Con interpolación -->
<p>{{ 'validation.minLength' | translate: {min: 8} }}</p>

<!-- En atributos -->
<input [placeholder]="'auth.login.email' | translate" />

<!-- Múltiples traducciones -->
<button>{{ 'common.buttons.' + action | translate }}</button>
```

#### Uso en TypeScript

```typescript
export class UserComponent {
  private translate = inject(TranslateService);
  
  deleteUser(user: User): void {
    const message = this.translate.instant('users.messages.deleteConfirm', {
      name: user.name
    });
    
    if (confirm(message)) {
      // Eliminar usuario
      this.toastService.success(
        this.translate.instant('users.messages.deleteSuccess')
      );
    }
  }
  
  changeLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
}
```

---

### Language Service

```typescript
// src/app/core/services/language.service.ts
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly LANGUAGE_KEY = 'app-language';
  
  currentLanguage = signal<string>(this.getStoredLanguage());
  
  availableLanguages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ca', name: 'Català', flag: '🏴' }
  ];

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private initLanguage(): void {
    const lang = this.currentLanguage();
    this.translate.setDefaultLang('es');
    this.translate.use(lang);
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLanguage.set(lang);
    localStorage.setItem(this.LANGUAGE_KEY, lang);
  }

  private getStoredLanguage(): string {
    const stored = localStorage.getItem(this.LANGUAGE_KEY);
    if (stored) return stored;
    
    // Detectar idioma del navegador
    const browserLang = this.translate.getBrowserLang() || 'es';
    return this.availableLanguages.some(l => l.code === browserLang) 
      ? browserLang 
      : 'es';
  }
}
```

---

### Language Selector Component

```typescript
@Component({
  selector: 'app-language-selector',
  standalone: true,
  template: `
    <div class="relative">
      <button
        (click)="isOpen = !isOpen"
        class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <span class="text-xl">{{ currentLang().flag }}</span>
        <span class="text-sm">{{ currentLang().code.toUpperCase() }}</span>
        <lucide-icon name="chevron-down" [size]="16"></lucide-icon>
      </button>
      
      <div
        *ngIf="isOpen"
        class="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[150px] z-50"
      >
        <button
          *ngFor="let lang of languages"
          (click)="selectLanguage(lang.code)"
          [class]="getItemClasses(lang.code)"
        >
          <span>{{ lang.flag }}</span>
          <span>{{ lang.name }}</span>
          <lucide-icon 
            *ngIf="currentLang().code === lang.code" 
            name="check" 
            [size]="16"
            class="ml-auto"
          ></lucide-icon>
        </button>
      </div>
    </div>
  `,
  imports: [CommonModule, LucideAngularModule]
})
export class LanguageSelectorComponent {
  private languageService = inject(LanguageService);
  
  isOpen = false;
  languages = this.languageService.availableLanguages;
  currentLang = computed(() => 
    this.languages.find(l => l.code === this.languageService.currentLanguage()) || this.languages[0]
  );

  selectLanguage(code: string): void {
    this.languageService.setLanguage(code);
    this.isOpen = false;
  }

  getItemClasses(code: string): string {
    const isActive = this.currentLang().code === code;
    return [
      'flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors',
      isActive 
        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
    ].join(' ');
  }
}
```

---

### Tips de Organización

#### ✅ DO

1. **Usar archivos separados por módulo**
   - Más fácil de mantener
   - Evita conflictos en git
   - Permite lazy loading

2. **Nomenclatura consistente**
   - `camelCase` para claves
   - Nombres descriptivos
   - Estructura jerárquica clara

3. **Agrupar por contexto**
   ```json
   {
     "form": { "title": "", "submit": "" },
     "list": { "title": "", "empty": "" },
     "detail": { "title": "", "info": "" }
   }
   ```

4. **Usar interpolación para valores dinámicos**
   ```json
   { "greeting": "Hola, {{name}}" }
   ```

5. **Mantener sincronizados todos los idiomas**
   - Mismas claves en todos los JSON
   - Scripts de validación

---

#### ❌ DON'T

1. **No usar un solo archivo gigante**
   ```json
   // ❌ NO: i18n/es.json con 5000 líneas
   ```

2. **No mezclar idiomas en el mismo archivo**
   ```json
   // ❌ NO
   {
     "title_es": "Título",
     "title_en": "Title"
   }
   ```

3. **No hardcodear textos en componentes**
   ```typescript
   // ❌ NO
   this.title = 'Usuarios';
   
   // ✅ SÍ
   this.title = this.translate.instant('users.list.title');
   ```

4. **No usar claves genéricas sin contexto**
   ```json
   // ❌ NO
   { "text1": "...", "label2": "..." }
   
   // ✅ SÍ
   { "userNameLabel": "...", "submitButton": "..." }
   ```

---

### Script de Validación

```typescript
// scripts/validate-translations.ts
import * as fs from 'fs';
import * as path from 'path';

const i18nDir = path.join(__dirname, '../src/assets/i18n');
const languages = ['es', 'en', 'ca'];

function getKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys = keys.concat(getKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

function validateTranslations(): void {
  const allKeys: Map<string, Set<string>> = new Map();
  
  // Recopilar claves por archivo
  languages.forEach(lang => {
    const langDir = path.join(i18nDir, lang);
    const files = fs.readdirSync(langDir);
    
    files.forEach(file => {
      const filePath = path.join(langDir, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const keys = getKeys(content);
      
      const fileKey = file.replace('.json', '');
      if (!allKeys.has(fileKey)) {
        allKeys.set(fileKey, new Set());
      }
      
      keys.forEach(k => allKeys.get(fileKey)!.add(k));
    });
  });
  
  // Validar que todos los idiomas tengan las mismas claves
  let hasErrors = false;
  
  allKeys.forEach((keys, file) => {
    const keyArray = Array.from(keys);
    
    languages.forEach(lang => {
      const filePath = path.join(i18nDir, lang, `${file}.json`);
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Falta archivo: ${lang}/${file}.json`);
        hasErrors = true;
        return;
      }
      
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const langKeys = getKeys(content);
      
      const missing = keyArray.filter(k => !langKeys.includes(k));
      if (missing.length > 0) {
        console.error(`❌ Claves faltantes en ${lang}/${file}.json:`);
        missing.forEach(k => console.error(`   - ${k}`));
        hasErrors = true;
      }
    });
  });
  
  if (!hasErrors) {
    console.log('✅ Todas las traducciones están sincronizadas');
  } else {
    process.exit(1);
  }
}

validateTranslations();
```

**Uso:**
```json
// package.json
{
  "scripts": {
    "validate:i18n": "ts-node scripts/validate-translations.ts"
  }
}
```

---

## 📋 Checklist General

### Setup Inicial
- [ ] Instalar Lucide Angular (o librería de iconos elegida)
- [ ] Configurar path aliases en tsconfig.json
- [ ] Configurar Tailwind con dark mode
- [ ] Crear estructura de carpetas (core, shared, features)

### Theme System
- [ ] Implementar ThemeService con signals
- [ ] Crear ThemeToggleComponent
- [ ] Configurar paleta de colores en Tailwind
- [ ] Testear dark mode en todos los componentes

### Core Module
- [ ] Crear Guards (auth, role, unsaved-changes)
- [ ] Crear Interceptors (auth, error, loading, retry)
- [ ] Implementar ErrorHandler global
- [ ] Configurar HTTP status codes
- [ ] Crear modelos de error

### Componentes Base
- [ ] Button
- [ ] Input
- [ ] Card
- [ ] Modal
- [ ] Toast/Notifications
- [ ] Spinner
- [ ] Dropdown
- [ ] Más componentes según necesidad

### Testing
- [ ] Unit tests para servicios core
- [ ] Tests para guards e interceptors
- [ ] Tests para componentes reutilizables

### Internacionalización (i18n)
- [ ] Instalar @ngx-translate/core y @ngx-translate/http-loader
- [ ] Crear estructura de carpetas por idioma
- [ ] Separar traducciones por módulo/feature
- [ ] Implementar LanguageService
- [ ] Crear LanguageSelectorComponent
- [ ] Configurar script de validación de traducciones
- [ ] Sincronizar todas las claves entre idiomas

---

**Fecha de Creación:** 2026-02-12  
**Estado:** En Planificación  
**Versión:** 1.0

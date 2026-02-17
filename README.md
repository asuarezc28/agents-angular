# 🚀 SAE Analytics - Angular 21 + Tailwind + PrimeNG + Konecta

Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) versión 21.1.3.

## 📦 Stack Tecnológico Actual

| Tecnología              | Versión | Propósito                                       |
| ----------------------- | ------- | ----------------------------------------------- |
| **Angular**             | ^21.1.0 | Framework (Standalone por defecto, Signals API) |
| **Angular CLI / Build** | ^21.1.3 | Tooling de desarrollo y build                   |
| **TypeScript**          | ~5.9.2  | Lenguaje (strict mode)                          |
| **Tailwind CSS**        | 3.x     | Utility-first CSS + plugin custom               |
| **PrimeNG**             | 21.1.1  | Componentes UI                                  |
| **Lucide Angular**      | 0.563.0 | 1,400+ iconos outline                           |
| **PrimeIcons**          | 7.0.0   | Iconos de PrimeNG internals                     |
| **ECharts**             | ^6.0.0  | Visualización de datos                          |
| **ngx-translate**       | 17.x    | Internacionalización (i18n)                     |
| **RxJS**                | ~7.8.0  | Programación reactiva                           |
| **Vitest**              | ^4.0.8  | Dependencia de testing disponible               |
| **pnpm**                | 9.15.0  | Gestor de paquetes recomendado                  |

## 🎨 Sistema de Temas Konecta

### Integración PrimeNG + Tailwind

Este proyecto usa una integración custom entre **PrimeNG** y **Tailwind CSS** con la **paleta de colores Konecta**. Todos los componentes PrimeNG se adaptan automáticamente al modo claro/oscuro.

**Características clave:**

- 🎯 **Single Source of Truth**: Colores en `src/app/core/constants/colors.constants.ts`
- 🔤 **Tipografía centralizada**: `src/app/core/constants/typography.constants.ts`
- 🌗 **Dark mode automático**: Clase `.dark` en documentElement
- 🎨 **Paleta Konecta**: `primary-500: #2A01CD`, `surface-0/50/900/950`
- ⚡ **Build-time CSS variables**: Plugin genera `--p-*` vars automáticamente
- 🔧 **Cero configuración manual**: PrimeNG usa variables CSS directamente

### Colores Principales

```typescript
primary-500: #2A01CD   // Konecta Blue
surface-0:   #ffffff   // White
surface-50:  #F2F3F7   // Light
surface-900: #262626   // Dark
surface-950: #0F0F0F   // Black
success-500: #0E9F6E   // Green
danger-500:  #F05252   // Red
warning-500: #F0FA00   // Yellow
```

### Arquitectura del Sistema

```
colors.constants.ts + tailwind.config.ts + tailwind-css-variables.mjs → CSS Variables (--p-*)
                                                         ↓
                                    ThemeService → .dark class
                                                         ↓
                                        PrimeNG Components + Custom UI
```

---

## 🚀 Comandos de Desarrollo

Los siguientes comandos están sincronizados con los scripts de `package.json`:

### Servidor de desarrollo

```bash
pnpm start
```

Inicia `ng serve` en `http://localhost:4200/`.

### Build (default)

```bash
pnpm build
```

Ejecuta `ng build`.

### Build producción

```bash
pnpm build:prod
```

Ejecuta `ng build --configuration production`.

### Build en watch (desarrollo)

```bash
pnpm watch
```

Ejecuta `ng build --watch --configuration development`.

### Tests unitarios

```bash
pnpm test
```

Ejecuta `ng test`.

### Tests con cobertura (CI/DevOps)

```bash
pnpm test:coverage
```

Ejecuta `ng test --watch=false --coverage --coverage-reporters=lcov --coverage-reporters=text-summary`.

### Angular CLI (passthrough)

```bash
pnpm ng -- <comando>
```

Ejemplo:

```bash
pnpm ng -- version
```

---

## 🎓 Documentación del Proyecto

### Guías Principales

- **[ARCHITECTURE.MD](./ARCHITECTURE.MD)** - Arquitectura general del proyecto

### Recursos Externos

- [Angular Docs](https://angular.dev) - Documentación oficial
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [PrimeNG](https://primeng.org) - Componentes Angular
- [Lucide Icons](https://lucide.dev) - 1,400+ iconos outline

---

## ⚠️ Reglas Críticas

### 🎨 Colores

1. ✅ Edita colores **SOLO** en `src/app/core/constants/colors.constants.ts`
2. ❌ **NO** agregues CSS variables manualmente
3. ❌ **NO** uses `theme()` en CSS (builds lentos)
4. ❌ **NO** hardcodees valores de color

### 🔤 Tipografía

1. ✅ Define tipografía **SOLO** en `src/app/core/constants/typography.constants.ts`
2. ✅ Consume tipografía vía `tailwind.config.ts` (`fontFamily.sans`)
3. ❌ **NO** hardcodees `font-family` en `styles.css` o componentes

### 📝 Texto

1. ✅ Deja que el texto herede color de `body { color: var(--p-text-color) }`
2. ❌ **NO** uses clases `text-surface-*` en elementos de texto
3. ✅ Usa `opacity-80` / `opacity-70` para jerarquía de texto

### 🎭 Iconos

1. ✅ **Lucide** para UI custom que escribes tú
2. ✅ **PrimeIcons** automático en componentes PrimeNG
3. ❌ **NO** uses PrimeIcons manualmente en UI custom

### ⚡ Angular 21

1. ✅ Standalone components (default)
2. ✅ Signals para estado (`signal()`, `computed()`)
3. ✅ Control flow nativo (`@if`, `@for`, `@switch`)
4. ❌ **NO** uses `*ngIf`, `*ngFor`, `*ngSwitch`
5. ❌ **NO** uses `ngClass`, `ngStyle`
6. ✅ `input()` y `output()` funciones (no decoradores)
7. ✅ `host` object en decoradores (sin `@HostBinding`/`@HostListener`)

---

## 🐛 Troubleshooting

| Problema                        | Solución                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Texto oscuro en modo oscuro** | Verifica que NO hay clases `text-surface-*`. El texto debe heredar de `body`.                                      |
| **Colores no actualizan**       | Reinicia dev server (`pnpm start`) después de editar `src/app/core/constants/colors.constants.ts`                  |
| **Tipografía no actualiza**     | Verifica `typography.constants.ts` y que `body` use `@apply font-sans`                                             |
| **Build tarda 60+ segundos**    | Verifica que NO hay llamadas `theme()` en CSS. Usa `var(--p-*)` directamente.                                      |
| **Iconos no se ven**            | Importa específicos: `import { Home } from 'lucide-angular'`                                                       |
| **PrimeNG sin estilos**         | Verifica `providePrimeNG()` en `src/app/app.config.ts` y que existan las variables `--p-*` generadas por el plugin |

---

## 📂 Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── constants/
│   │   │   ├── colors.constants.ts     # Single source of truth de colores
│   │   │   └── typography.constants.ts # Configuración central de tipografía
│   │   └── services/
│   │       └── theme.service.ts        # ThemeService con signals
│   ├── shared/
│   │   └── components/
│   │       ├── theme-toggle/          # Botón toggle tema
│   │       └── chart/                 # Wrapper ECharts
│   ├── app.config.ts                  # Providers globales (PrimeNG, i18n)
│   ├── app.routes.ts                  # Routing
│   └── app.ts                         # Root component
├── assets/
│   └── i18n/
│       ├── en/common.json             # Traducciones inglés
│       └── es/common.json             # Traducciones español (default)
└── styles.css                         # Global styles + Tailwind

Raíz:
├── tailwind.config.ts                 # Config Tailwind + tipografía central
├── tailwind-css-variables.mjs         # Plugin CSS vars (build-time)
```

---

**Última actualización:** Febrero 2026  
**Package Manager:** pnpm 9.15.0  
**Node Version:** Compatible con Angular 21

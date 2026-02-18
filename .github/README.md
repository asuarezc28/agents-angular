# .github Skills Structure

Documentación completa del sistema de skills organizados por dominio para agentes AI especializados.

## 📁 Estructura General

```
.github/
├── copilot-instructions.md          # Instrucciones globales del proyecto
├── angular/                          # Skills de Angular & TypeScript
│   ├── angular-agent.instructions.md
│   ├── angular-architecture.skill.md
│   ├── angular-best-practices/
│   ├── angular-component/
│   ├── angular-directives/
│   ├── angular-forms/
│   ├── angular-http/
│   ├── angular-performance/
│   ├── angular-pipes/
│   ├── angular-routing/
│   ├── angular-rxjs-patterns/
│   ├── angular-signals/
│   ├── angular-testing/
│   ├── error-handling-patterns/
│   ├── security.skill.md
│   └── typescript-advanced-types/
├── UI/                               # Skills de diseño visual y theming
│   ├── ui-agent.instructions.md
│   ├── tailwind-primeng-integration.skill.md
│   ├── icons-dual-system.skill.md
│   └── tailwind-design-system/
└── skill-creator/                    # Meta-skills para crear nuevas skills
```

## 🎯 Propósito de Cada Carpeta

### `/angular/`

**Agente**: Angular Skills Agent  
**Especialización**: Todo lo relacionado con Angular 21, TypeScript, y desarrollo frontend

**Skills disponibles**:

- Architecture & best practices
- Componentes standalone con signals
- Formularios reactivos
- Routing & guards
- HTTP & APIs
- RxJS patterns
- Directives & pipes
- Testing
- Performance optimization
- Error handling
- Security patterns
- TypeScript advanced types

### `/UI/`

**Agente**: UI/UX Skills Agent  
**Especialización**: Diseño visual, theming, colores del sistema, Tailwind CSS, PrimeNG, iconos

**Skills disponibles**:

- Integración oficial Tailwind CSS v3 + PrimeNG v21 (Aura)
- Sistema dual de iconos (Lucide + PrimeIcons)
- Design system con Tailwind
- Colores programáticos para charts vía `colors.constants.ts`
- Componentes visuales reutilizables

### `/skill-creator/`

**Agente**: Meta-agent para crear skills  
**Especialización**: Ayuda a crear nuevas skills siguiendo el formato estándar

## 📚 Stack Tecnológico Completo

### Frontend Framework

- **Angular**: 21.1.0
  - Standalone components
  - Signals API
  - Control flow syntax
  - OnPush change detection

### Styling & UI

- **Tailwind CSS**: 3.x
  - Integración oficial `tailwindcss-primeui`
  - Utilidades de diseño y layout
  - Utilidades alineadas con tokens de PrimeNG
- **PrimeNG**: 21.1.1
  - Aura theme preset
  - Dark mode selector: `.dark`
  - Components use CSS variables
- **Lucide Angular**: 0.563.0
  - 1,400+ outline icons
  - User-facing UI elements
- **PrimeIcons**: 7.0.0
  - PrimeNG internal components only

### Data Visualization

- **ECharts**: 6.x
  - Chart components
  - Responsive visualizations

### Internationalization

- **ngx-translate**: 17.x
  - Multi-language support
  - Default: Spanish (es)

### Build & Dev Tools

- **pnpm**: 9.15.0
  - Package manager
  - Git Bash integration
- **TypeScript**: Latest
  - Strict mode enabled
- **PostCSS**: 8.x
- **Autoprefixer**: 10.x

## 🎨 Sistema de Colores

### Paleta Oficial

```typescript
primary: { 500: '#2A01CD' }      // Konecta Blue
surface: {
  0: '#ffffff',                   // Konecta White
  50: '#F2F3F7',                 // Konecta Light
  900: '#262626',                // Konecta Dark
  950: '#0F0F0F'                 // Konecta Black
}
success: { 500: '#0E9F6E' }      // Green
danger: { 500: '#F05252' }       // Red
warning: { 500: '#F0FA00' }      // Yellow
info: { 500: '#3b82f6' }         // Blue
```

### Uso actual de `colors.constants.ts`

Actualmente se usa como paleta programática para `ThemeColorsService` (charts/TS específicos, por ahora):

```
/src/app/core/constants/colors.constants.ts
```

El theming global de PrimeNG viene del preset oficial `Aura` en `app.config.ts`.

## 🔧 Sistema de Temas

### Arquitectura

```
ThemeService → aplica clase `.dark` en `<html>`
  ↓
PrimeNG Aura (`app.config.ts`) → tokens de theme (`--p-*`)
  ↓
Tailwind + `tailwindcss-primeui` → utilidades alineadas con PrimeNG
  ↓
ThemeColorsService + `colors.constants.ts` → colores programáticos (charts/TS específicos, por ahora)
```

**Current Status:**

- ✅ PrimeNG theming configured with official `Aura` + `tailwindcss-primeui`
- ℹ️ For now, no per-component PrimeNG status matrix is maintained

### Características

- ✅ Light/Dark mode automático
- ✅ Persistencia en `localStorage`
- ✅ Soporte `prefers-color-scheme`
- ✅ Sin flickering durante toggle
- ✅ Integración oficial PrimeNG + Tailwind
- ✅ Performance optimizada

## 🎭 Sistema de Iconos Dual

### Estrategia

| Librería           | Uso                 | Cantidad | Estilo         |
| ------------------ | ------------------- | -------- | -------------- |
| **Lucide Angular** | UI custom, features | 1,400+   | Outline        |
| **PrimeIcons**     | PrimeNG internals   | Auto     | Filled/Outline |

### Regla de Oro

- Si **tú** escribes el markup → usa **Lucide**
- Si **PrimeNG** lo renderiza → usa **PrimeIcons** (automático)

## 📖 Cómo Usar las Skills

### 1. Identificar el Agente Correcto

```
¿Qué necesito?              → ¿Qué agente?
─────────────────────────────────────────────
Componente Angular          → angular/
Servicio HTTP               → angular/
Formulario reactivo         → angular/
Tema light/dark             → UI/
Cambiar colores             → UI/
Añadir iconos               → UI/
Integrar PrimeNG component  → UI/
```

### 2. Leer las Instrucciones del Agente

Cada carpeta tiene un archivo `*-agent.instructions.md` que explica:

- Qué tareas puede resolver
- Qué skills están disponibles
- Ejemplos de uso
- Limitaciones

### 3. Aplicar Skills Combinadas

Muchas tareas requieren múltiples skills:

**Ejemplo**: "Crear un formulario con tema y validación"

- **angular/angular-forms/** → Lógica del formulario
- **angular/angular-component/** → Estructura del componente
- **UI/tailwind-primeng-integration.skill.md** → Componentes PrimeNG

## 🚀 Mejores Prácticas

### Para Colores y Temas

1. ✅ Edita `colors.constants.ts` para colores programáticos (charts/TS específicos, por ahora)
2. ✅ Ejecuta `pnpm start` o `pnpm build` para aplicar cambios
3. ✅ Deja que el texto herede color de `body`
4. ✅ Usa `opacity-*` para jerarquía de texto
5. ✅ Iconos con colores semánticos explícitos
6. ✅ Si necesitas ajustar theming, sigue `primeng-theming-guide.md`
7. ❌ No uses `text-surface-*` en elementos de texto
8. ❌ No definas colores en múltiples lugares

### Para Iconos

1. ✅ Importa iconos específicos de Lucide
2. ✅ Usa Lucide para UI custom
3. ✅ Deja que PrimeNG use PrimeIcons internamente
4. ✅ Añade `aria-label` a botones solo-icono
5. ❌ No uses PrimeIcons en UI custom
6. ❌ No importes `* as Icons` (importa específicos)

### Para Angular

1. ✅ Usa standalone components (default en v20+)
2. ✅ Usa signals para estado local
3. ✅ Usa `input()` y `output()` (no decoradores)
4. ✅ Usa `OnPush` change detection
5. ✅ Usa control flow nativo (`@if`, `@for`)
6. ✅ Usa i18n para todo texto visible (incluyendo PrimeNG y componentes custom)
7. ❌ No uses NgModules
8. ❌ No uses `ngClass`, `ngStyle` (usa bindings)
9. ❌ No uses `@HostBinding`, `@HostListener`

## 📝 Crear Nuevas Skills

Sigue el formato estándar:

```markdown
# [Nombre] Skill

## Overview

Descripción breve del propósito

## Architecture

Diagramas o explicación de la arquitectura

## Usage Patterns

Ejemplos concretos de uso

## Best Practices

Reglas a seguir

## Common Issues

Problemas frecuentes y soluciones

## Summary

Tabla resumen o puntos clave
```

## 🔄 Mantenimiento de Skills

### Actualizar cuando:

- Stack tecnológico cambia de versión
- Nuevas mejores prácticas emergen
- Patrones comunes se repiten en el código
- Errores recurrentes necesitan documentación

### Revisar regularmente:

- `copilot-instructions.md` → Mantener stack actualizado
- Agent instructions → Asegurar skills están listadas
- Skills individuales → Verificar ejemplos funcionan

## 🎓 Recursos Adicionales

- **Angular Docs**: https://angular.dev
- **Tailwind CSS**: https://tailwindcss.com
- **PrimeNG**: https://primeng.org
- **Lucide Icons**: https://lucide.dev
- **ECharts**: https://echarts.apache.org

## 📞 Soporte

Para problemas específicos:

1. Consulta el skill relevante primero
2. Revisa "Common Issues" en el skill
3. Verifica que estás usando el agente correcto
4. Combina skills si la tarea es multi-dominio

---

**Última actualización**: Febrero 2026  
**Versiones**: Angular 21.1.0, Tailwind 3.x, PrimeNG 21.1.1, Lucide 0.563.0

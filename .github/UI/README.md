# 🎨 UI System Documentation

Documentación completa del sistema de diseño Konecta para el agente UI/UX.

---

## 📂 Estructura de Archivos

```
.github/UI/
├── README.md (este archivo)
├── ui-agent.instructions.md          # 🎯 INICIO AQUÍ - Instrucciones principales
│
├── Core Skills/                      # Skills especializados por tema
│   ├── konecta-theme-system.skill.md
│   ├── tailwind-primeng-integration.skill.md
│   ├── icons-dual-system.skill.md
│   ├── echarts-theme-colors.skill.md
│   └── tailwind-design-system/
│       └── tailwind-design-system.skill.md
│
├── Reference Guides/                 # Guías de consulta
│   ├── primeng-theming-guide.md
│   └── PRIMENG-COMPONENTS-STATUS.md
│
└── Examples/                         # Código de ejemplo
    └── EXAMPLES.md                   # 896+ líneas de ejemplos prácticos
```

---

## 🚀 Guía de Inicio Rápido

### Para el Agente UI

1. **Leer primero**: `ui-agent.instructions.md` (instrucciones principales)
2. **Seleccionar skill** según el tipo de solicitud
3. **Consultar ejemplos** en `EXAMPLES.md` para código de referencia

### Para Desarrolladores

1. **Single Source of Truth**: `src/app/core/constants/colors.constants.ts`
2. **Workflow de colores**: Editar archivo → `pnpm start` → Variables regeneradas automáticamente
3. **Sistema de iconos**: Lucide para UI custom, PrimeIcons para internos de PrimeNG
4. **Temas**: Light/Dark con CSS variables (`--p-*`)

---

## 📖 Documentos por Categoría

### 🎯 Principal (Leer siempre)

**ui-agent.instructions.md**

- Propósito del agente
- Lista completa de skills y recursos
- Guía de uso por tipo de solicitud
- Quick reference con comandos
- Reglas de oro

---

### 🎨 Core Skills (Usar según necesidad)

**konecta-theme-system.skill.md** (Sistema de Temas)

- ThemeService para toggle light/dark
- CSS variables generadas automáticamente
- Paleta de colores completa
- Principio de herencia de color
- Best practices de theming

**tailwind-primeng-integration.skill.md** (Integración)

- Arquitectura del sistema de colores
- Plugin `tailwind-css-variables.mjs`
- Workflow: editar → rebuild → auto-generación
- Cómo añadir componentes PrimeNG nuevos
- Troubleshooting común

**icons-dual-system.skill.md** (Sistema de Iconos)

- Lucide Angular (1,400+ iconos outline)
- PrimeIcons (solo para PrimeNG)
- Tabla de decisión: cuándo usar cada uno
- Importación correcta
- Colores semánticos en iconos

**echarts-theme-colors.skill.md** (Gráficos)

- ThemeColorsService para colores reactivos
- Signals que actualizan con cambio de tema
- Patrones de uso en ECharts
- Evitar hardcodeo de colores

**tailwind-design-system/** (Patrones de Diseño)

- Componentes reutilizables
- Layouts responsive
- Utilidades Tailwind
- Best practices CSS

---

### 📚 Reference Guides (Consulta técnica)

**primeng-theming-guide.md** (538 líneas)

- Arquitectura del plugin de CSS variables
- Cómo añadir soporte para nuevo componente PrimeNG
- Variables `rootVars` (light) y `darkVars` (dark)
- Estructura de variables por componente
- Ejemplos completos (Button, Card, InputText, Tree)

**PRIMENG-COMPONENTS-STATUS.md** (283 líneas)

- Lista de 115 componentes PrimeNG
- Estado actual: 4 configurados, 111 pendientes
- Prioridad de configuración
- Categorías: Form, Data, Overlay, Menu, etc.

---

### 💡 Ejemplos (código práctico)

**EXAMPLES.md** (896 líneas)

- Sistema de colores (uso correcto/incorrecto)
- Componentes PrimeNG (Botones, Tarjetas, Formularios, Tablas)
- Iconos Lucide (importación, uso, colores)
- Layouts y Tarjetas (grid, flex, responsive)
- Formularios completos (inputs, validación, estados)
- Tablas (paginación, ordenación, acciones)
- Diálogos y Overlays (modales, toasts)
- Gráficos ECharts (colores reactivos)
- Tema Claro/Oscuro (toggle, herencia)
- Accesibilidad (ARIA, keyboard, contraste)

---

## 🎯 Selección de Skill por Tipo de Solicitud

| Solicitud                  | Skill Principal                         | Ejemplos en                  |
| -------------------------- | --------------------------------------- | ---------------------------- |
| "Tema light/dark"          | `konecta-theme-system.skill.md`         | EXAMPLES.md → Temas          |
| "Cambiar color primario"   | `tailwind-primeng-integration.skill.md` | (editar colors.constants.ts) |
| "Añadir iconos"            | `icons-dual-system.skill.md`            | EXAMPLES.md → Iconos         |
| "Dropdown PrimeNG"         | `tailwind-primeng-integration.skill.md` | EXAMPLES.md → Formularios    |
| "Nuevo componente PrimeNG" | `primeng-theming-guide.md`              | (agregar al plugin)          |
| "Gráfico con colores"      | `echarts-theme-colors.skill.md`         | EXAMPLES.md → Gráficos       |
| "Layout responsive"        | `tailwind-design-system/`               | EXAMPLES.md → Layouts        |
| "Ver componentes listos"   | `PRIMENG-COMPONENTS-STATUS.md`          | (referencia)                 |

---

## 🛠️ Stack Tecnológico

- **Tailwind CSS**: 3.x con plugin personalizado
- **PrimeNG**: 21.1.1 con tema Aura
- **Lucide Angular**: 0.563.0 (iconos outline)
- **PrimeIcons**: 7.0.0 (iconos internos PrimeNG)
- **ECharts**: 6.x (visualización de datos)
- **Angular**: 21.1.0 (standalone, signals)

---

## 🔑 Archivos Críticos del Proyecto

| Archivo                                         | Propósito                  | ¿Editar?                    |
| ----------------------------------------------- | -------------------------- | --------------------------- |
| `src/app/core/constants/colors.constants.ts`    | **Single source of truth** | ✅ SÍ (colores)             |
| `tailwind.config.ts`                            | Config de Tailwind         | ⚠️ Solo escalas nuevas      |
| `tailwind-css-variables.mjs`                    | Plugin generador           | ⚠️ Solo añadir componentes  |
| `src/app/core/services/theme.service.ts`        | Toggle de tema             | ❌ Solo nueva funcionalidad |
| `src/app/core/services/theme-colors.service.ts` | Colores para JS            | ❌ Solo nueva lógica        |

---

## ✅ Reglas de Oro

1. **Single Source of Truth**: Colores solo en `colors.constants.ts`
2. **Herencia de Color**: Texto hereda de `body`, NO usar `text-surface-*`
3. **Iconos Duales**: Lucide para UI, PrimeIcons solo para PrimeNG interno
4. **Plugin Automático**: Editar → `pnpm start` → Variables regeneradas
5. **Consultar Ejemplos**: `EXAMPLES.md` tiene 896 líneas de código de referencia
6. **Estado de Componentes**: `PRIMENG-COMPONENTS-STATUS.md` muestra qué está listo
7. **i18n Accesible**: `aria-label`, `aria-describedby`, `title`, `alt` deben salir de `src/assets/i18n/{lang}/common.json`

---

## 📊 Estado Actual del Sistema

### Componentes PrimeNG Configurados (4)

- ✅ Button
- ✅ Card
- ✅ InputText
- ✅ Tree

### Pendientes (111+)

Ver lista completa en `PRIMENG-COMPONENTS-STATUS.md`

### CSS Variables Generadas

- ✅ Colores base (primary, surface, semantic)
- ✅ Variables de componentes (button, card, input, tree)
- ✅ Light mode (`:root`)
- ✅ Dark mode (`:root.dark`)
- ✅ Focus states
- ✅ Hover/active states

---

## 🆘 Troubleshooting Común

### "Los colores no cambian"

→ Ejecutar `pnpm start` para regenerar variables

### "El texto no se ve en dark mode"

→ Remover clases `text-surface-*`, dejar que herede

### "¿Qué icono usar?"

→ Consultar `icons-dual-system.skill.md` → Tabla de decisión

### "¿Cómo añadir componente PrimeNG?"

→ Seguir `primeng-theming-guide.md` → Añadir al plugin

### "Necesito ejemplos de formularios"

→ Ver `EXAMPLES.md` → Sección Formularios

---

## 📚 Recursos Externos

- [Tailwind CSS Docs](https://tailwindcss.com)
- [PrimeNG Components](https://primeng.org)
- [Lucide Icons](https://lucide.dev)
- [ECharts Docs](https://echarts.apache.org)
- [Angular Docs](https://angular.dev)

---

**Última actualización**: Febrero 14, 2026  
**Mantenedor**: UI/UX Agent  
**Estado**: ✅ Limpieza completada - Sistema optimizado

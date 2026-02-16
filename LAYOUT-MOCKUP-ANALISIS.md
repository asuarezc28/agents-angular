# Layout Mockup - Análisis de Componentes y Configuración

**Proyecto:** CYRA Analytics  
**Fuente:** Mockup Product Owner  
**Fecha:** Febrero 15, 2026  
**Objetivo:** Identificar componentes PrimeNG necesarios y configurar colores en plugin

---

## 📸 Análisis del Mockup

### Estructura Visual Identificada

```
┌─────────────────────────────────────────────────────────────────────┐
│ HEADER (Dark background)                                            │
│ ┌──────┐                    ┌──────────────────┐         ┌───────┐ │
│ │ CYRA │                    │  🗨️  ✓  👥  ⚙️ │         │ 👤   │ │
│ └──────┘                    └──────────────────┘         └───────┘ │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ CONTEXT SELECTOR (Glassmorphism effect)                            │
│   Compañía: [Global Corp ▼]    Proyecto: [Piloto VoC 2026 ▼]      │
└─────────────────────────────────────────────────────────────────────┘
┌────┐ ┌───────────────────────────────────────────────────────────┐
│ 📊 │ │                                                           │
│ 🔍 │ │                                                           │
│ ⏱️ │ │         Main content loads here...                       │
│ ⚖️ │ │                                                           │
│ ⚙️ │ │         (Gradient background: blue → purple)             │
│    │ │                                                           │
│    │ │                                                   ✨      │
│    │ │                                                           │
└────┘ └───────────────────────────────────────────────────────────┘
 SIDEBAR                    MAIN CONTENT AREA
```

---

## 🧩 Componentes PrimeNG Identificados

### 1. Header Superior

#### 1.1. Logo "CYRA"

- **Componente:** Custom (texto + estilos Tailwind)
- **PrimeNG:** ❌ No necesario
- **Estado:** ✅ Implementación directa con Tailwind

#### 1.2. Action Buttons (4 iconos centrales)

- **Iconos identificados:**
  - 🗨️ Chat/Mensajes
  - ✓ Tareas/Checklist
  - 👥 Usuarios/Team
  - ⚙️ Configuración/Settings

- **Opción A - Buttons con Badge:**
  - Componente: `p-button` (icon-only) + `p-badge`
  - PrimeNG: `Button` ✅ (ya configurado) + `Badge` ⚠️ (necesita configuración)
- **Opción B - Custom con Lucide:**
  - Componente: Botones custom con iconos Lucide
  - PrimeNG: ❌ No necesario
  - Recomendación: **Usar esta opción** (más control, menos peso)

#### 1.3. User Avatar

- **Componente:** `p-avatar` con imagen
- **PrimeNG:** `Avatar` ⚠️ (necesita configuración)
- **Prioridad:** ALTA
- **Estados necesarios:** hover (dropdown de perfil)

---

### 2. Context Selector

#### 2.1. Dropdowns (Compañía y Proyecto)

- **Componente:** `p-dropdown` × 2
- **PrimeNG:** `Dropdown` 🔴 **CRÍTICO - Necesita configuración**
- **Prioridad:** **MUY ALTA** (se usa 2 veces)
- **Características:**
  - Label inline: "Compañía:", "Proyecto:"
  - Fondo glassmorphism (blur + transparencia)
  - Chevron icon (PrimeIcons - ya cargado)
  - Filterable: posiblemente sí
  - Multi-level: No (dropdown simple)

#### 2.2. Container del Context Selector

- **Componente:** Custom div con Tailwind
- **Estilos necesarios:**
  - Backdrop blur: `backdrop-blur-md`
  - Background opacity: `bg-surface-900/20 dark:bg-surface-0/10`
  - Border radius: `rounded-lg`
  - Padding: `p-4`

---

### 3. Sidebar Vertical

#### 3.1. Navigation Icons

- **Iconos identificados:**
  1. 📊 Dashboard (LayoutDashboard de Lucide)
  2. 🔍 Search (Search de Lucide)
  3. ⏱️ Time Tracking (Clock de Lucide)
  4. ⚖️ Compliance (Scale de Lucide)
  5. ⚙️ Settings (Settings de Lucide)

- **Opción A - PrimeNG Sidebar:**
  - Componente: `p-sidebar`
  - PrimeNG: `Sidebar` ⚠️ (necesita configuración si se usa)
  - Ventajas: Animaciones built-in, responsive drawer
  - Desventajas: Más peso, menos control
- **Opción B - Custom Vertical Nav:**
  - Componente: Custom div + Lucide icons
  - PrimeNG: ❌ No necesario
  - Recomendación: **Usar esta opción** (más control, mejor para este caso)

---

### 4. Main Content Area

#### 4.1. Background

- **Componente:** Custom (Tailwind gradient)
- **PrimeNG:** ❌ No necesario
- **Estilos:**
  - Gradient: `bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900`
  - O usar Background Service (custom)

#### 4.2. Content Cards (futuro)

- **Componente:** `p-card`
- **PrimeNG:** `Card` ✅ (ya configurado)
- **Estado:** Listo para usar

---

## 🎨 Componentes PrimeNG que Necesitan Configuración

### 🔴 Prioridad CRÍTICA

#### 1. Dropdown

**Ubicación:** Context Selector (2 instancias)  
**Variables CSS necesarias:**

```css
/* Light Mode */
--p-dropdown-background: #ffffff;
--p-dropdown-border-color: #bdbdbd;
--p-dropdown-hover-background: #f5f5f5;
--p-dropdown-focus-border-color: #2a01cd;
--p-dropdown-color: #262626;

/* Dropdown panel (options list) */
--p-dropdown-panel-background: #ffffff;
--p-dropdown-panel-border-color: #e0e0e0;
--p-dropdown-item-hover-background: #f2f3f7;
--p-dropdown-item-selected-background: #2a01cd;
--p-dropdown-item-selected-color: #ffffff;

/* Dark Mode */
--p-dropdown-background: #262626;
--p-dropdown-border-color: #424242;
--p-dropdown-hover-background: #333333;
--p-dropdown-focus-border-color: #a6b7ff;
--p-dropdown-color: #f2f3f7;

/* Dropdown panel (dark) */
--p-dropdown-panel-background: #333333;
--p-dropdown-panel-border-color: #424242;
--p-dropdown-item-hover-background: #424242;
--p-dropdown-item-selected-background: #2a01cd;
--p-dropdown-item-selected-color: #f2f3f7;
```

**Archivo a editar:** `tailwind-css-variables.mjs`  
**Tiempo estimado:** 45 minutos

---

### 🟠 Prioridad ALTA

#### 2. Avatar

**Ubicación:** Header usuario  
**Variables CSS necesarias:**

```css
/* Light Mode */
--p-avatar-background: #e0e0e0;
--p-avatar-color: #757575;
--p-avatar-border-color: #bdbdbd;

/* Dark Mode */
--p-avatar-background: #424242;
--p-avatar-color: #f2f3f7;
--p-avatar-border-color: #616161;
```

**Archivo a editar:** `tailwind-css-variables.mjs`  
**Tiempo estimado:** 20 minutos

---

### 🟡 Prioridad MEDIA (Opcional)

#### 3. Badge (si se usa en action buttons)

**Ubicación:** Notificaciones en header  
**Variables CSS necesarias:**

```css
/* Light Mode */
--p-badge-primary-background: #2a01cd;
--p-badge-primary-color: #ffffff;
--p-badge-danger-background: #f05252;
--p-badge-danger-color: #ffffff;

/* Dark Mode (mismo) */
--p-badge-primary-background: #2a01cd;
--p-badge-primary-color: #ffffff;
--p-badge-danger-background: #f05252;
--p-badge-danger-color: #ffffff;
```

**Archivo a editar:** `tailwind-css-variables.mjs`  
**Tiempo estimado:** 15 minutos

---

#### 4. Menu/Menubar (si se usa dropdown de perfil)

**Ubicación:** Dropdown al hacer click en avatar  
**Variables CSS necesarias:**

```css
/* Light Mode */
--p-menu-background: #ffffff;
--p-menu-border-color: #e0e0e0;
--p-menu-item-hover-background: #f2f3f7;
--p-menu-item-color: #262626;

/* Dark Mode */
--p-menu-background: #262626;
--p-menu-border-color: #424242;
--p-menu-item-hover-background: #333333;
--p-menu-item-color: #f2f3f7;
```

**Archivo a editar:** `tailwind-css-variables.mjs`  
**Tiempo estimado:** 30 minutos

---

## ✅ Componentes PrimeNG Ya Configurados

| Componente    | Uso en Layout                  | Estado         |
| ------------- | ------------------------------ | -------------- |
| **Button**    | Action buttons, general uso    | ✅ Configurado |
| **Card**      | Contenido principal (futuro)   | ✅ Configurado |
| **InputText** | Formularios (futuro)           | ✅ Configurado |
| **Tree**      | Navegación jerárquica (futuro) | ✅ Configurado |

---

## 🛠️ Recomendaciones de Implementación

### Opción 1: Máximo PrimeNG (Más rápido, menos control)

```typescript
// Componentes PrimeNG a usar
import { DropdownModule } from 'primeng/dropdown'; // ⚠️ Configurar
import { AvatarModule } from 'primeng/avatar'; // ⚠️ Configurar
import { BadgeModule } from 'primeng/badge'; // 🟡 Opcional
import { MenuModule } from 'primeng/menu'; // 🟡 Opcional
import { ButtonModule } from 'primeng/button'; // ✅ Ya configurado
import { CardModule } from 'primeng/card'; // ✅ Ya configurado
```

**Componentes a configurar:** 2-4  
**Tiempo total:** 1.5 - 2 horas

---

### Opción 2: Híbrido (Recomendado - Balance)

```typescript
// PrimeNG solo para componentes complejos
import { DropdownModule } from 'primeng/dropdown'; // ⚠️ Configurar (CRÍTICO)
import { AvatarModule } from 'primeng/avatar'; // ⚠️ Configurar

// Custom con Lucide para UI simple
import {
  LayoutDashboard,
  Search,
  Clock,
  Scale,
  Settings,
  MessageSquare,
  CheckSquare,
  Users,
  Settings as SettingsIcon,
} from 'lucide-angular';
```

**Componentes a configurar:** 2  
**Tiempo total:** ~1 hora  
**Ventajas:**

- ✅ Menos peso en bundle
- ✅ Mayor control sobre UI
- ✅ MÁs fácil de mantener
- ✅ Mejor rendimiento

---

### Opción 3: Máximo Custom (Más control, más trabajo)

Solo usar PrimeNG para Dropdown (no hay alternativa simple).

```typescript
// Solo Dropdown de PrimeNG
import { DropdownModule } from 'primeng/dropdown'; // ⚠️ Configurar

// Todo lo demás custom
// - Avatar: Custom div + img + Tailwind
// - Sidebar: Custom nav + Lucide icons
// - Action buttons: Custom buttons + Lucide
// - Menu perfil: Custom dropdown con Headless UI o popover custom
```

**Componentes a configurar:** 1  
**Tiempo total:** 45 minutos (solo dropdown)  
**Ventajas:**

- ✅ Bundle mínimo
- ✅ Control total
- ❌ Más tiempo de desarrollo inicial
- ❌ Más código custom a mantener

---

## 🎯 Decisión Recomendada: **Opción 2 - Híbrido**

### Usar PrimeNG para:

1. ✅ **Dropdown** (Context Selector) - Complejo, vale la pena
2. ✅ **Avatar** - Simple, poco peso, bien diseñado
3. ✅ **Card** - Ya configurado, para contenido
4. ✅ **Button** - Ya configurado, para acciones

### Usar Custom (Tailwind + Lucide) para:

1. ✅ **Sidebar** - Más control, mejor responsive
2. ✅ **Action buttons** - Iconos simples, no necesitan PrimeNG
3. ✅ **Header** - Layout simple con flex
4. ✅ **Background** - Gradientes custom con Tailwind

---

## 📋 Plan de Acción

### Paso 1: Configurar Dropdown (CRÍTICO)

**⏱️ Tiempo:** 45 minutos

1. Abrir `tailwind-css-variables.mjs`
2. Agregar variables de Dropdown a `rootVars` (light mode)
3. Agregar variables de Dropdown a `darkVars` (dark mode)
4. Rebuild: `pnpm start`
5. Testing:
   - Crear componente ContextSelector con 2 dropdowns
   - Verificar estilos en light mode
   - Verificar estilos en dark mode
   - Verificar hover states
   - Verificar focus states
   - Verificar panel (lista de opciones)

**Checklist:**

- [ ] Variables light mode agregadas
- [ ] Variables dark mode agregadas
- [ ] Rebuild exitoso
- [ ] Testing visual en light
- [ ] Testing visual en dark
- [ ] Hover states OK
- [ ] Focus states OK
- [ ] Panel dropdown OK

---

### Paso 2: Configurar Avatar

**⏱️ Tiempo:** 20 minutos

1. Agregar variables de Avatar a `tailwind-css-variables.mjs`
2. Rebuild
3. Testing con avatar en header

**Checklist:**

- [ ] Variables light mode agregadas
- [ ] Variables dark mode agregadas
- [ ] Rebuild exitoso
- [ ] Testing visual en light
- [ ] Testing visual en dark

---

### Paso 3: Implementar Layout Base

**⏱️ Tiempo:** 8-10 horas (según ROADMAP)

- [ ] HeaderComponent con logo + action buttons + avatar
- [ ] ContextSelectorComponent con 2 dropdowns
- [ ] SidebarComponent con iconos Lucide
- [ ] MainLayoutComponent con grid/flex
- [ ] Routing setup
- [ ] Testing responsive

---

## 📊 Resumen de Configuración Necesaria

| Componente   | Plugin Config | Tiempo | Prioridad  | Uso en Mockup               |
| ------------ | ------------- | ------ | ---------- | --------------------------- |
| **Dropdown** | ⚠️ Necesita   | 45 min | 🔴 CRÍTICO | Context Selector (×2)       |
| **Avatar**   | ⚠️ Necesita   | 20 min | 🟠 ALTA    | Header usuario              |
| **Badge**    | 🟡 Opcional   | 15 min | 🟡 MEDIA   | Notificaciones (opcional)   |
| **Menu**     | 🟡 Opcional   | 30 min | 🟡 MEDIA   | Dropdown perfil (si se usa) |
| **Button**   | ✅ Listo      | -      | -          | Ya configurado              |
| **Card**     | ✅ Listo      | -      | -          | Ya configurado              |

**Total tiempo configuración mínima:** 1 hora (Dropdown + Avatar)  
**Total tiempo configuración completa:** 2 horas (todos)

---

## 🎨 Detalles de Estilo del Mockup

### Color Palette Observada

**Header:**

- Background: Dark (probablemente `surface-950` o custom #0a1929)
- Text: Light (`surface-0` o `surface-50`)

**Context Selector:**

- Background: Glassmorphism (blur + opacity)
- Border: Sutil, probablemente `border-surface-700`
- Dropdowns: Fondo semi-transparente

**Sidebar:**

- Background: Dark (match con header o ligeramente diferente)
- Icons: Light gray cuando inactivos
- Icon selected: `primary-500` (Konecta Blue) o `primary-400`
- Hover: Cambio de opacity o background sutil

**Main Content:**

- Background: Gradient `from-blue-900 via-blue-800 to-purple-900`
- O custom: `from-[#0a1e3d] via-[#0d2847] to-[#2d1b4e]`

**General:**

- Border radius: `rounded-lg` (8px)
- Spacing: Generoso, probablemente `p-4` o `p-6`
- Shadows: Sutiles, glassmorphism effects

---

## 🚀 Siguientes Pasos Inmediatos

1. **HOY (Domingo):**
   - [ ] Configurar Dropdown en plugin (45 min)
   - [ ] Configurar Avatar en plugin (20 min)
   - [ ] Rebuild y testing inicial

2. **Mañana (Lunes):**
   - [ ] Implementar HeaderComponent
   - [ ] Implementar ContextSelectorComponent
   - [ ] Integrar dropdowns con mockdata

3. **Martes-Miércoles:**
   - [ ] Implementar SidebarComponent
   - [ ] Implementar MainLayoutComponent
   - [ ] Routing y navegación

4. **Jueves (DEADLINE):**
   - [ ] Testing completo
   - [ ] Responsive
   - [ ] Demo al Product Owner

---

## 📎 Referencias

- **Mockup fuente:** Captura Product Owner (Febrero 15, 2026)
- **ROADMAP:** [ROADMAP-BASE-ESTABLE.md](./ROADMAP-BASE-ESTABLE.md)
- **Layout arquitectura:** [LAYOUT-PRINCIPAL.md](./LAYOUT-PRINCIPAL.md)
- **Componentes configurados:** [PRIMENG-COMPONENTS-STATUS.md](./.github/UI/PRIMENG-COMPONENTS-STATUS.md)
- **Plugin colores:** `tailwind-css-variables.mjs`
- **PrimeNG Dropdown docs:** https://primeng.org/dropdown
- **PrimeNG Avatar docs:** https://primeng.org/avatar

---

**Documento creado:** Febrero 15, 2026  
**Autor:** Análisis basado en mockup Product Owner  
**Estado:** 🟢 Listo para implementación  
**Próximo paso:** Configurar Dropdown + Avatar en plugin

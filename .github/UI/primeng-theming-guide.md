# 🎨 Guía de Theming PrimeNG (Sistema Actual)

## 📋 Resumen

Esta guía describe **cómo tematizar PrimeNG en este proyecto hoy** (sin patrones legacy):

- PrimeNG con preset oficial `Aura`
- Tailwind v3 + `tailwindcss-primeui`
- Dark mode por clase `.dark`
- `colors.constants.ts` reservado por ahora para casos programáticos de charts/TS (vía `ThemeColorsService`)

> Estado actual: **no** usamos plugin custom para generar tokens CSS de PrimeNG.

---

## 🏗️ Arquitectura del Sistema

```text
ThemeService
    └─ aplica `.dark` en documentElement

app.config.ts
    └─ providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.dark' } } })

tailwind.config.ts
    └─ tailwindcss-primeui (alinea utilidades Tailwind con tokens PrimeNG)

colors.constants.ts
    └─ ThemeColorsService (charts/TS específicos por ahora)
```

### Qué significa esto en práctica

- PrimeNG resuelve visualmente componentes a través de tokens `--p-*` del preset `Aura`.
- Tailwind se usa para composición/layout/spacing y utilidades visuales.
- El theming global UI **no** depende de `colors.constants.ts`.

---

## ⚙️ Configuración Base (Referencia)

### PrimeNG (`src/app/app.config.ts`)

```typescript
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

providePrimeNG({
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
    },
  },
  ripple: false,
});
```

### Tailwind (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss';
import PrimeUI from 'tailwindcss-primeui';

export default {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  plugins: [PrimeUI],
} satisfies Config;
```

---

## ✅ Flujo recomendado para theming

### 1) Cambios de UI global

Si el cambio es visual/global del sistema:

1. Ajusta configuración de theme en `app.config.ts` (Aura/overrides)
2. Ejecuta `pnpm start` o `pnpm build`
3. Verifica light/dark y contraste

### 2) Cambios para charts/TS

Si el cambio aplica solo a lógica programática (ECharts/TS):

1. Edita `src/app/core/constants/colors.constants.ts`
2. Verifica consumo en `ThemeColorsService`
3. Rebuild y validación visual

### 3) Nuevo componente PrimeNG

1. Úsalo con `Aura` sin overrides
2. Valida en light/dark y responsive
3. Si hay gap real, añade override mínimo y local
4. Documenta por qué existe ese override

---

## 🧩 Estrategia de Overrides

Usar overrides solo cuando:

- Hay un requisito de negocio no cubierto por Aura
- Existe problema claro de usabilidad/accesibilidad
- Hay inconsistencia visual crítica en una feature

Reglas:

- Preferir alcance local (componente/feature)
- Evitar reglas globales agresivas
- Evitar hardcodes masivos de color

---

## 🧪 Checklist de validación

- [ ] Render correcto en light y dark
- [ ] Contraste WCAG AA aceptable
- [ ] Focus visible en componentes interactivos
- [ ] Sin hardcodes de color innecesarios
- [ ] Sin overrides globales para resolver casos locales
- [ ] Si hay charts/TS, usan `ThemeColorsService` + `colors.constants.ts`

---

## 🛠️ Troubleshooting

### Problema: “No cambia el tema en algunos componentes”

Causas comunes:

- Override CSS local/global con mayor especificidad
- Clase `.dark` no aplicada correctamente

Qué revisar:

- `document.documentElement.classList.contains('dark')`
- valor de `--p-text-color` en DevTools
- reglas CSS que pisan tokens

### Problema: “El texto se ve mal en dark mode”

Causa:

- Se forzó color en texto (`text-surface-*` o color fijo)

Solución:

- Dejar herencia de color desde `body`
- Usar opacidad para niveles secundarios

### Problema: “Hay flicker al cambiar tema”

Causa:

- Transiciones activas durante el toggle

Solución:

- Mantener estrategia `.theme-transitioning` en `ThemeService`/`styles.css`

---

## 🔍 Debugging rápido

```javascript
// 1) ¿Dark mode activo?
document.documentElement.classList.contains('dark');

// 2) ¿Token de texto resuelto?
getComputedStyle(document.documentElement).getPropertyValue('--p-text-color');

// 3) ¿Color final aplicado al body?
getComputedStyle(document.body).getPropertyValue('color');
```

---

## 🚫 Qué no hacer

- No reintroducir `tailwind-css-variables.mjs` ni generación custom masiva de tokens
- No duplicar paletas en múltiples archivos
- No tratar `colors.constants.ts` como fuente global de theming UI
- No hardcodear color de texto en todos los componentes

---

## 📖 Referencias oficiales (PrimeNG)

- PrimeNG Home: https://primeng.org
- PrimeNG Theming Docs: https://primeng.org/theming
- Preset Aura: https://primeng.org/theming#aura
- PrimeNG Installation: https://primeng.org/installation
- PrimeNG Accessibility: https://primeng.org/guides/accessibility

## 📚 Guías útiles

- Componentes PrimeNG (catálogo): https://primeng.org/components
- Templates en PrimeNG: https://primeng.org/guides/templates
- Forms con PrimeNG: https://primeng.org/forms

## 🧠 Source code / paquete

- GitHub PrimeNG: https://github.com/primefaces/primeng
- Issues PrimeNG: https://github.com/primefaces/primeng/issues
- npm PrimeNG: https://www.npmjs.com/package/primeng

## 🔗 Referencias complementarias (stack)

- Tailwind v3 docs: https://v3.tailwindcss.com/docs
- tailwindcss-primeui (npm): https://www.npmjs.com/package/tailwindcss-primeui

---

## 📎 Referencias internas

- `src/app/app.config.ts`
- `tailwind.config.ts`
- `src/styles.css`
- `src/app/core/services/theme.service.ts`
- `src/app/core/constants/colors.constants.ts`
- `src/app/core/services/theme-colors.service.ts`
- `.github/UI/tailwind-primeng-integration.skill.md`
- `.github/UI/tailwind-design-system/tailwind-design-system.skill.md`
- `.github/UI/echarts-theme-colors.skill.md`

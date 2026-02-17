# Arquitectura Frontend Actual (Angular 21 + Tailwind 3 + PrimeNG)

## 0. Estado actual de decisiones (vigente)

### Stack confirmado en el proyecto

- **Angular**: `21.1.x` (standalone + signals)
- **TypeScript**: `~5.9.x` (strict)
- **Tailwind CSS**: `3.x`
- **PrimeNG**: `21.1.x`
- **PrimeIcons**: `7.x`
- **Lucide Angular**: `0.563.x`
- **ECharts**: `6.x`
- **ngx-translate**: `17.x`
- **Package manager**: `pnpm 9.15.0`

### Decisiones funcionales ya tomadas

- Arquitectura por capas `core / shared / features`.
- `BaseDataService` reutilizable para peticiones reales.
- Estrategia `useMocks` para alternar mock vs backend real.
- Mocks disponibles solo en `development` (no se publican en `production`).

### Decisión pendiente con negocio (UI/Theming)

**Pendiente de confirmación:**

1. Mantener **PrimeNG + Tailwind** adaptando el theme integrado (enfoque recomendado por velocidad), o
2. Ir a una personalización más profunda con mayor coste de mantenimiento.

Hasta nueva decisión, la estrategia vigente es:

- Usar PrimeNG con integración Tailwind y tokens de color corporativos.
- Evitar crear sistema visual paralelo salvo necesidad real de producto.

## 1. Setup Inicial

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

### 1.1 Configuración de imports

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

## 2. Librerías de Iconos

**Estado actual:** Se usa **Lucide Angular** para iconos de UI custom y **PrimeIcons** para componentes internos de PrimeNG.

### Lucide Angular

https://lucide.dev/icons/

```bash
npm install lucide-angular
```

**Ventajas:**

- 1,400+ iconos modernos y consistentes
- Tree-shakeable (solo importas los que usas)
- Soporte oficial para Angular
- Customizable (color, size, stroke-width)
- Excelente con Tailwind CSS

### PrimeIcons

https://primeng.org/icons

Se utiliza para iconografía interna de componentes PrimeNG.

## 3. Librerías de Gráficas

**Estado actual:** Se usa **ECharts** como librería principal.

### ECharts

https://echarts.apache.org/examples/en/index.html#chart-type-radar

## 4. Paleta de colores (Konecta)

### Colores Base

| Nombre            | RGB              | Hexadecimal |
| ----------------- | ---------------- | ----------- |
| **black**         | rgb(15 15 15)    | `#0F0F0F`   |
| **white**         | rgb(255 255 255) | `#FFFFFF`   |
| **blue**          | rgb(42 1 205)    | `#2A01CD`   |
| **blue2**         | rgb(166 183 255) | `#A6B7FF`   |
| **yellow**        | rgb(240 250 0)   | `#F0FA00`   |
| **dark**          | rgb(38 38 38)    | `#262626`   |
| **darkBlue**      | rgb(15 15 114)   | `#0F0F72`   |
| **gray / light**  | rgb(242 243 247) | `#F2F3F7`   |
| **success_story** | rgb(223 98 43)   | `#DF622B`   |

### Colores del Sistema

| Nombre        | RGB             | Hexadecimal |
| ------------- | --------------- | ----------- |
| **red-500**   | rgb(240 82 82)  | `#F05252`   |
| **red-800**   | rgb(155 28 28)  | `#9B1C1C`   |
| **green-500** | rgb(14 159 110) | `#0E9F6E`   |

### Colores Adicionales

| Nombre           | Hexadecimal   |
| ---------------- | ------------- |
| **Rojo Laravel** | `#FF2D20`     |
| **transparent**  | `transparent` |

---

---

## 5. Traducciones

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
└── fr/
    └── ...
```

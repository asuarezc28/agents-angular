# Consideraciones para Nuevo Proyecto Angular21 + Tailwind CSS V4 + Prime NG (Componentes)

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

#### Opción A: **Lucide Angular** (Recomendada)

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

#### Opción B: **Heroicons**

https://heroicons.com/

```bash
npm install @ng-icons/core @ng-icons/heroicons
```

**Ventajas:**

- Diseñados por Tailwind Labs
- Perfecta integración con Tailwind
- Outline y Solid variants
- 292 iconos curados

#### Opción C: **Phosphor Icons**

https://phosphoricons.com/

```bash
npm install @phosphor-icons/angular
```

**Ventajas:**

- 9,072+ iconos
- 6 estilos diferentes (thin, light, regular, bold, fill, duotone)
- Muy flexible

## 3. Librerías de Gráficas

#### 1.ECHARTS

https://echarts.apache.org/examples/en/index.html#chart-type-radar

#### 2.PRIME

https://primeng.org/chart

#### 3.NGX-ECHARTS

https://xieziyu.github.io/ngx-echarts/#/basic/basic-usage

#### 4.NG2-CHARTS

https://valor-software.com/ng2-charts/

#### 5.CHARTS JS

https://www.chartjs.org/docs/latest/

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

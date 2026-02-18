# Using Theme Colors in ECharts

## Overview

The `ThemeColorsService` provides centralized, theme-aware colors that automatically update when switching between light and dark modes. This eliminates the need to hardcode colors in each component that uses charts or other visual elements.

Color values for this service are imported from `src/app/core/constants/colors.constants.ts` (uso específico en charts/TS por ahora).

## Service Location

```
src/app/core/services/theme-colors.service.ts
```

## Architecture

```
ThemeService (.dark class toggle)
  ↓
ThemeColorsService + colors.constants.ts
  ↓
ECharts options (reactive colors)
```

**Workflow to edit colors:**

1. Edit `src/app/core/constants/colors.constants.ts`
2. Run `pnpm start` or `pnpm build`
3. ThemeColorsService values update
4. Charts and TS-driven visuals update automatically

## Basic Usage

### 1. Inject the Service

```typescript
import { inject, computed } from '@angular/core';
import { ThemeColorsService } from './core/services/theme-colors.service';
import type { EChartsOption } from 'echarts';

export class MyChartComponent {
  private readonly colors = inject(ThemeColorsService);

  // Your chart configuration
}
```

### 2. Use Computed Signals for Reactive Colors

```typescript
protected chartOption = computed<EChartsOption>(() => ({
  title: {
    text: 'My Chart Title',
    textStyle: {
      color: this.colors.textColor(), // Auto-updates with theme
    },
  },
  xAxis: {
    axisLabel: {
      color: this.colors.textColor(), // Labels adapt to theme
    },
  },
  series: [{
    type: 'bar',
    itemStyle: {
      color: this.colors.primaryColor, // Konecta brand color
    },
  }],
}));
```

## Available Colors

### Semantic Colors (Reactive)

These computed signals automatically update when the theme changes:

| Property              | Light Mode | Dark Mode | Usage                                 |
| --------------------- | ---------- | --------- | ------------------------------------- |
| `textColor()`         | `#262626`  | `#F2F3F7` | Labels, titles, general text          |
| `backgroundColor()`   | `#ffffff`  | `#0F0F0F` | Surface backgrounds (cards, tooltips) |
| `backgroundHover()`   | `#F2F3F7`  | `#262626` | Hover states, secondary backgrounds   |
| `borderColor()`       | `#E5E7EB`  | `#424242` | Borders, axis lines, dividers         |
| `borderColorSubtle()` | `#F2F3F7`  | `#333333` | Grid lines, subtle dividers           |

### Brand Colors (Static)

These remain constant across themes:

| Property       | Hexcode   | Usage                           |
| -------------- | --------- | ------------------------------- |
| `primaryColor` | `#2A01CD` | Konecta Blue (primary brand)    |
| `successColor` | `#0E9F6E` | Success states, positive data   |
| `dangerColor`  | `#F05252` | Error states, negative data     |
| `warningColor` | `#F0FA00` | Warning states, alerts          |
| `infoColor`    | `#3b82f6` | Information, neutral highlights |

## Common ECharts Patterns

### Chart Title

```typescript
title: {
  text: 'My Title',
  textStyle: {
    color: this.colors.textColor(),
  },
}
```

### Tooltip

```typescript
tooltip: {
  backgroundColor: this.colors.backgroundHover(),
  borderColor: this.colors.borderColor(),
  textStyle: {
    color: this.colors.textColor(),
  },
}
```

### Axis Configuration

```typescript
xAxis: {
  axisLine: {
    lineStyle: {
      color: this.colors.borderColor(),
    },
  },
  axisLabel: {
    color: this.colors.textColor(),
  },
}
```

### Grid Lines

```typescript
yAxis: {
  splitLine: {
    lineStyle: {
      color: this.colors.borderColorSubtle(),
    },
  },
}
```

### Series with Brand Colors

```typescript
series: [
  {
    name: 'Sales',
    type: 'bar',
    itemStyle: {
      color: this.colors.primaryColor, // Konecta Blue
    },
  },
  {
    name: 'Expenses',
    type: 'line',
    itemStyle: {
      color: this.colors.dangerColor, // Red
    },
  },
];
```

## Advanced Usage

### Custom Opacity

```typescript
series: [
  {
    type: 'bar',
    itemStyle: {
      color: this.colors.withOpacity(this.colors.primaryColor, 0.7),
    },
  },
];
```

### Accessing CSS Variables Directly

For PrimeNG component-specific variables:

```typescript
const cardBackground = this.colors.getCSSVariable('--p-card-background');
```

### Gradient Colors

```typescript
series: [
  {
    type: 'bar',
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: this.colors.primaryColor },
          { offset: 1, color: this.colors.withOpacity(this.colors.primaryColor, 0.3) },
        ],
      },
    },
  },
];
```

## Best Practices

1. **Always use `computed()`** for chart options that need theme reactivity
2. **Use semantic colors** (`textColor`, `borderColor`) for UI elements
3. **Use brand colors** (`primaryColor`, `dangerColor`) for data visualization
4. **Don't hardcode hex values** - use the service for consistency
5. **Test both themes** to ensure readability

## Example: Complete Chart Component

```typescript
import { Component, inject, computed } from '@angular/core';
import { ThemeColorsService } from './core/services/theme-colors.service';
import { ChartComponent } from './shared/components/chart/chart.component';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-sales-chart',
  imports: [ChartComponent],
  template: '<app-chart [option]="chartOption()" />',
})
export class SalesChartComponent {
  private readonly colors = inject(ThemeColorsService);

  protected chartOption = computed<EChartsOption>(() => ({
    title: {
      text: 'Monthly Sales',
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
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
        name: 'Sales',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110],
        itemStyle: {
          color: this.colors.primaryColor,
        },
      },
      {
        name: 'Target',
        type: 'line',
        data: [100, 150, 120, 90, 80, 100],
        itemStyle: {
          color: this.colors.successColor,
        },
      },
    ],
  }));
}
```

## Color Reference

For these chart/TS use cases, colors are defined in `src/app/core/constants/colors.constants.ts`:

```typescript
// Primary palette (Konecta)
primary: { 500: '#2A01CD' }

// Surface colors
surface: {
  0: '#ffffff',    // White
  50: '#F2F3F7',   // Light gray
  900: '#262626',  // Dark gray
  950: '#0F0F0F'   // Near black
}

// Semantic colors
success: { 500: '#0E9F6E' }  // Green
danger: { 500: '#F05252' }   // Red
warning: { 500: '#F0FA00' }  // Yellow
info: { 500: '#3b82f6' }     // Blue
```

---

## 📚 ECharts Official Documentation

### Quick Start & Basics

- **Official Documentation**: https://echarts.apache.org/en/index.html
- **Getting Started**: https://echarts.apache.org/handbook/en/get-started/
- **5 Minutes Tutorial**: https://echarts.apache.org/handbook/en/basics/download/

### Chart Types Reference

ECharts supports 20+ chart types out of the box:

| Chart Type       | URL                                                                     | Common Use Cases                     |
| ---------------- | ----------------------------------------------------------------------- | ------------------------------------ |
| **Line Chart**   | https://echarts.apache.org/examples/en/editor.html?c=line-simple        | Trends over time, continuous data    |
| **Bar Chart**    | https://echarts.apache.org/examples/en/editor.html?c=bar-simple         | Comparisons, categorical data        |
| **Pie Chart**    | https://echarts.apache.org/examples/en/editor.html?c=pie-simple         | Proportions, parts of a whole        |
| **Scatter Plot** | https://echarts.apache.org/examples/en/editor.html?c=scatter-simple     | Relationships, distributions         |
| **Candlestick**  | https://echarts.apache.org/examples/en/editor.html?c=candlestick-simple | Financial data, stock prices         |
| **Radar Chart**  | https://echarts.apache.org/examples/en/editor.html?c=radar              | Multi-dimensional data comparison    |
| **Heatmap**      | https://echarts.apache.org/examples/en/editor.html?c=heatmap-cartesian  | Matrix data, intensity visualization |
| **Tree/Treemap** | https://echarts.apache.org/examples/en/editor.html?c=treemap-simple     | Hierarchical data                    |
| **Gauge**        | https://echarts.apache.org/examples/en/editor.html?c=gauge-simple       | KPIs, single value indicators        |
| **Funnel**       | https://echarts.apache.org/examples/en/editor.html?c=funnel             | Process flows, conversions           |
| **Sankey**       | https://echarts.apache.org/examples/en/editor.html?c=sankey-simple      | Flow visualization, energy diagrams  |
| **Graph**        | https://echarts.apache.org/examples/en/editor.html?c=graph-simple       | Network relationships, nodes & edges |

### Interactive Examples Gallery

- **Main Gallery**: https://echarts.apache.org/examples/en/index.html
  - Filterable by chart type
  - Interactive editor
  - Live preview
  - Source code included

### API & Configuration

- **Option Configuration**: https://echarts.apache.org/en/option.html
  - Complete API reference
  - All configurable properties
  - Type definitions
  - Default values

- **Series Types**: https://echarts.apache.org/en/option.html#series
  - Detailed config for each chart type
  - Properties and methods
  - Event handling

### Theme & Styling

- **Theme Builder**: https://echarts.apache.org/en/theme-builder.html
  - Visual theme editor
  - Export custom themes
  - Color palette generator

- **Visual Design**: https://echarts.apache.org/handbook/en/concepts/visual-map/
  - Color mapping strategies
  - Visual encoding
  - Style customization

### Common Configurations

**Title & Legend**:

- Title: https://echarts.apache.org/en/option.html#title
- Legend: https://echarts.apache.org/en/option.html#legend

**Axes**:

- xAxis: https://echarts.apache.org/en/option.html#xAxis
- yAxis: https://echarts.apache.org/en/option.html#yAxis

**Tooltip & DataZoom**:

- Tooltip: https://echarts.apache.org/en/option.html#tooltip
- DataZoom: https://echarts.apache.org/en/option.html#dataZoom

### Best Practices & Guides

- **Performance Tips**: https://echarts.apache.org/handbook/en/best-practices/canvas-vs-svg/
- **Mobile Optimization**: https://echarts.apache.org/handbook/en/best-practices/mobile/
- **Accessibility**: https://echarts.apache.org/handbook/en/basics/help/
- **Data Loading**: https://echarts.apache.org/handbook/en/concepts/data-transform/

### Quick Examples for Common Charts

**Line Chart (Time Series)**:

```typescript
chartOption = computed<EChartsOption>(() => ({
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  yAxis: { type: 'value' },
  series: [
    {
      data: [150, 230, 224, 218, 135],
      type: 'line',
      itemStyle: { color: this.colors.primaryColor },
    },
  ],
}));
```

**Bar Chart (Comparison)**:

```typescript
chartOption = computed<EChartsOption>(() => ({
  xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
  yAxis: { type: 'value' },
  series: [
    {
      data: [120, 200, 150, 80, 70],
      type: 'bar',
      itemStyle: { color: this.colors.successColor },
    },
  ],
}));
```

**Pie Chart (Proportions)**:

```typescript
chartOption = computed<EChartsOption>(() => ({
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine', itemStyle: { color: this.colors.primaryColor } },
        { value: 735, name: 'Direct', itemStyle: { color: this.colors.successColor } },
        { value: 580, name: 'Email', itemStyle: { color: this.colors.infoColor } },
        { value: 484, name: 'Ads', itemStyle: { color: this.colors.warningColor } },
      ],
    },
  ],
}));
```

### TypeScript Types

ECharts provides full TypeScript support:

```typescript
import type {
  EChartsOption,
  LineSeriesOption,
  BarSeriesOption,
  PieSeriesOption,
  TooltipComponentOption,
  GridComponentOption,
} from 'echarts';

// Use specific types for type safety
const lineOption: LineSeriesOption = {
  type: 'line',
  data: [120, 200, 150],
  // TypeScript autocomplete available
};
```

### Resources Summary Table

| Resource             | URL                                       | Use For                    |
| -------------------- | ----------------------------------------- | -------------------------- |
| **Main Docs**        | https://echarts.apache.org/               | Overview & getting started |
| **Examples Gallery** | https://echarts.apache.org/examples/      | Visual inspiration & code  |
| **Option API**       | https://echarts.apache.org/en/option.html | Configuration reference    |
| **Handbook**         | https://echarts.apache.org/handbook/      | Concepts & best practices  |
| **GitHub**           | https://github.com/apache/echarts         | Source code & issues       |
| **NPM Package**      | https://www.npmjs.com/package/echarts     | Installation & versions    |

---

**Remember**: When using ECharts in this project, **always use `ThemeColorsService`** for colors to maintain theme consistency and avoid hardcoded values.

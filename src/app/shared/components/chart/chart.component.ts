import {
  Component,
  input,
  effect,
  viewChild,
  ElementRef,
  PLATFORM_ID,
  inject,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { ECharts, EChartsOption } from 'echarts';
import { APP_FONT_FAMILY } from '../../../core/constants/typography.constants';
import { ThemeColorsService } from '../../../core/services/theme-colors.service';

@Component({
  selector: 'app-chart',
  imports: [],
  template: `<div #chartContainer class="w-full h-full"></div>`,
})
export class ChartComponent {
  options = input.required<EChartsOption>();
  private chartContainer = viewChild<ElementRef>('chartContainer');
  private readonly platformId = inject(PLATFORM_ID);
  private readonly colors = inject(ThemeColorsService);
  private chart?: ECharts;
  private echartsLoader?: Promise<typeof import('echarts')>;
  private resizeObserver?: ResizeObserver;
  private listeningWindowResize = false;

  private readonly handleWindowResize = () => {
    this.chart?.resize();
  };

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const container = this.chartContainer()?.nativeElement;
        const opts = this.options();
        const themeTextColor = this.colors.textColor();
        const themeBorderColor = this.colors.borderColorSubtle();
        const themeBackgroundColor = this.colors.backgroundColor();

        if (container && opts) {
          void this.renderChart(container, opts, {
            textColor: themeTextColor,
            borderColor: themeBorderColor,
            backgroundColor: themeBackgroundColor,
          });
        }
      }
    });
  }

  private async renderChart(
    container: HTMLElement,
    opts: EChartsOption,
    theme: { textColor: string; borderColor: string; backgroundColor: string },
  ): Promise<void> {
    const echarts = await this.loadEcharts();

    if (!this.chart) {
      this.chart = echarts.init(container);
      this.setupResizeHandling(container);
    }

    this.chart.setOption(this.applyThemeToOptions(opts, theme), {
      notMerge: true,
      lazyUpdate: true,
    });
    this.chart.resize();
  }

  private loadEcharts(): Promise<typeof import('echarts')> {
    this.echartsLoader ??= import('echarts');
    return this.echartsLoader;
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }

    if (this.listeningWindowResize) {
      window.removeEventListener('resize', this.handleWindowResize);
      this.listeningWindowResize = false;
    }

    if (this.chart) {
      this.chart.dispose();
      this.chart = undefined;
    }
  }

  private setupResizeHandling(container: HTMLElement): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.chart?.resize();
      });

      this.resizeObserver.observe(container);
    }

    if (!this.listeningWindowResize) {
      window.addEventListener('resize', this.handleWindowResize);
      this.listeningWindowResize = true;
    }
  }

  private applyThemeToOptions(
    options: EChartsOption,
    theme: { textColor: string; borderColor: string; backgroundColor: string },
  ): EChartsOption {
    const warningAccent = this.getTokenColor(
      '--p-warning-600',
      this.getTokenColor('--p-warning-500', this.colors.warningColor),
    );

    const brandAccent = this.colors.primaryColor;

    const colorPalette = [
      this.getTokenColor('--p-primary-500', this.colors.primaryColor),
      this.getTokenColor('--p-info-500', this.colors.infoColor),
      warningAccent,
      this.getTokenColor('--p-danger-500', this.colors.dangerColor),
      brandAccent,
    ];

    const asRecord = (value: unknown): Record<string, unknown> =>
      value && typeof value === 'object' ? (value as Record<string, unknown>) : {};

    const applyTextStyleTheme = (
      textStyle: unknown,
      color = theme.textColor,
    ): Record<string, unknown> => ({
      color,
      fontFamily: APP_FONT_FAMILY,
      ...asRecord(textStyle),
    });

    const applyAxisTheme = (axis: unknown): unknown => {
      const axisRecord = asRecord(axis);
      if (Object.keys(axisRecord).length === 0) return axis;

      const axisLabel = asRecord(axisRecord['axisLabel']);
      const axisLine = asRecord(axisRecord['axisLine']);
      const axisLineStyle = asRecord(axisLine['lineStyle']);
      const splitLine = asRecord(axisRecord['splitLine']);
      const splitLineStyle = asRecord(splitLine['lineStyle']);
      const nameTextStyle = asRecord(axisRecord['nameTextStyle']);

      return {
        ...axisRecord,
        axisLabel: {
          ...applyTextStyleTheme(axisLabel),
        },
        axisLine: {
          lineStyle: {
            color: theme.borderColor,
            ...axisLineStyle,
          },
          ...axisLine,
        },
        splitLine: {
          lineStyle: {
            color: theme.borderColor,
            ...splitLineStyle,
          },
          ...splitLine,
        },
        nameTextStyle: {
          ...applyTextStyleTheme(nameTextStyle),
        },
      };
    };

    const applyAxisCollectionTheme = (axes: unknown): unknown => {
      if (Array.isArray(axes)) {
        return axes.map((axis) => applyAxisTheme(axis));
      }

      return applyAxisTheme(axes);
    };

    const tooltipRecord =
      options.tooltip && !Array.isArray(options.tooltip) ? asRecord(options.tooltip) : {};
    const tooltipTextStyle = asRecord(tooltipRecord['textStyle']);

    const radarTheme = (radar: unknown): unknown => {
      const radarRecord = asRecord(radar);
      if (Object.keys(radarRecord).length === 0) return radar;

      const axisName = asRecord(radarRecord['axisName']);
      const axisLine = asRecord(radarRecord['axisLine']);
      const axisLineStyle = asRecord(axisLine['lineStyle']);
      const splitLine = asRecord(radarRecord['splitLine']);
      const splitLineStyle = asRecord(splitLine['lineStyle']);

      return {
        ...radarRecord,
        axisName: {
          ...applyTextStyleTheme(axisName),
        },
        axisLine: {
          ...axisLine,
          lineStyle: {
            color: theme.borderColor,
            ...axisLineStyle,
          },
        },
        splitLine: {
          ...splitLine,
          lineStyle: {
            color: theme.borderColor,
            ...splitLineStyle,
          },
        },
      };
    };

    const themedRadar = Array.isArray(options.radar)
      ? options.radar.map((radar) => radarTheme(radar))
      : radarTheme(options.radar);

    return {
      ...options,
      backgroundColor: 'transparent',
      color: colorPalette,
      textStyle: applyTextStyleTheme(options.textStyle),
      title: Array.isArray(options.title)
        ? options.title.map((title) => ({
            ...title,
            textStyle: {
              ...applyTextStyleTheme(title.textStyle),
            },
          }))
        : options.title
          ? {
              ...options.title,
              textStyle: {
                ...applyTextStyleTheme(options.title.textStyle),
              },
            }
          : options.title,
      legend: Array.isArray(options.legend)
        ? options.legend.map((legend) => ({
            ...legend,
            textStyle: {
              ...applyTextStyleTheme(legend.textStyle),
            },
          }))
        : options.legend
          ? {
              ...options.legend,
              textStyle: {
                ...applyTextStyleTheme(options.legend.textStyle),
              },
            }
          : options.legend,
      tooltip: {
        backgroundColor: this.colors.withOpacity(theme.backgroundColor, 0.95),
        borderColor: theme.borderColor,
        textStyle: {
          ...applyTextStyleTheme(tooltipTextStyle),
        },
        ...tooltipRecord,
      },
      xAxis: applyAxisCollectionTheme(options.xAxis) as EChartsOption['xAxis'],
      yAxis: applyAxisCollectionTheme(options.yAxis) as EChartsOption['yAxis'],
      radar: themedRadar as EChartsOption['radar'],
    };
  }

  private getTokenColor(tokenName: string, fallback: string): string {
    const value = this.colors.getCSSVariable(tokenName);
    return value || fallback;
  }
}

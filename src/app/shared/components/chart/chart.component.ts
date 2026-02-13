import {
  Component,
  input,
  effect,
  viewChild,
  ElementRef,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart',
  imports: [],
  template: `<div #chartContainer class="w-full h-full"></div>`,
})
export class ChartComponent {
  options = input.required<EChartsOption>();
  private chartContainer = viewChild<ElementRef>('chartContainer');
  private platformId = inject(PLATFORM_ID);
  private chart?: echarts.ECharts;

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const container = this.chartContainer()?.nativeElement;
        const opts = this.options();

        if (container && opts) {
          if (!this.chart) {
            this.chart = echarts.init(container);
          }
          this.chart.setOption(opts);
        }
      }
    });
  }
}

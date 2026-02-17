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
  private readonly platformId = inject(PLATFORM_ID);
  private chart?: echarts.ECharts;
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

        if (container && opts) {
          if (!this.chart) {
            this.chart = echarts.init(container);
            this.setupResizeHandling(container);
          }

          this.chart.setOption(opts);
          this.chart.resize();
        }
      }
    });
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
}

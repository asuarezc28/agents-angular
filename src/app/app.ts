import { Component, signal, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { LucideAngularModule, FileIcon } from 'lucide-angular';
// ECharts
import type { EChartsOption } from 'echarts';
import { ChartComponent } from './shared/components/chart/chart.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    ToastModule,
    ChartComponent,
    LucideAngularModule,
    ThemeToggleComponent,
  ],
  providers: [MessageService],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly translate = inject(TranslateService);
  private readonly messageService = inject(MessageService);
  readonly FileIcon = FileIcon;
  protected readonly title = signal('sae-analytics');
  protected readonly currentLang = signal('es');

  protected languages = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' },
  ];

  // ECharts configuration
  protected chartOption = signal<EChartsOption>({
    title: {
      text: 'Ventas Mensuales 2024',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: 'bottom',
    },
    xAxis: {
      type: 'category',
      data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Ventas',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110],
        itemStyle: {
          color: '#3b82f6',
        },
      },
      {
        name: 'Gastos',
        type: 'line',
        data: [80, 120, 100, 60, 50, 90],
        itemStyle: {
          color: '#ef4444',
        },
      },
    ],
  });

  constructor() {
    // Initialize translations from JSON files
    this.translate.setDefaultLang('es');
    this.translate.use('es');

    // Update chart title when language changes
    effect(() => {
      this.translate.get('demo.chart.title').subscribe((text: string) => {
        this.chartOption.update((prev) => ({
          ...prev,
          title: { ...prev.title, text },
        }));
      });
    });
  }

  protected showMessage() {
    this.translate.get(['demo.toast.success', 'demo.toast.message']).subscribe((translations) => {
      this.messageService.add({
        severity: 'success',
        summary: translations['demo.toast.success'],
        detail: translations['demo.toast.message'],
      });
    });
  }

  protected changeLang(lang: string) {
    this.translate.use(lang);
    this.currentLang.set(lang);
  }
}

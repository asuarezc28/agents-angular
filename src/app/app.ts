import { Component, signal, effect, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import {
  LucideAngularModule,
  Home,
  Globe,
  Package,
  Check,
  Star,
  BarChart3,
  LineChart,
  CheckCircle,
} from 'lucide-angular';
// ECharts
import type { EChartsOption } from 'echarts';
import { ChartComponent } from './shared/components/chart/chart.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';
import { TreeDemoComponent } from './shared/components/tree-demo/tree-demo.component';
import { ThemeService } from './core/services/theme.service';
import { ThemeColorsService } from './core/services/theme-colors.service';

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
    TreeDemoComponent,
  ],
  providers: [MessageService],
  templateUrl: './app.html',
})
export class App {
  private readonly translate = inject(TranslateService);
  private readonly messageService = inject(MessageService);
  protected readonly themeService = inject(ThemeService);
  private readonly colors = inject(ThemeColorsService);

  // Lucide icons
  protected readonly Home = Home;
  protected readonly Globe = Globe;
  protected readonly Package = Package;
  protected readonly Check = Check;
  protected readonly Star = Star;
  protected readonly BarChart3 = BarChart3;
  protected readonly LineChart = LineChart;
  protected readonly CheckCircle = CheckCircle;

  protected readonly title = signal('sae-analytics');
  protected readonly currentLang = signal('es');

  protected languages = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' },
  ];

  // Chart title signal for i18n
  protected chartTitle = signal<string>('Ventas Mensuales 2024');

  // ECharts configuration with theme-aware colors
  protected chartOption = computed<EChartsOption>(() => ({
    title: {
      text: this.chartTitle(),
      left: 'center',
      textStyle: {
        color: this.colors.textColor(),
        fontSize: 18,
        fontWeight: 'bold',
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
    legend: {
      top: 'bottom',
      textStyle: {
        color: this.colors.textColor(),
      },
    },
    xAxis: {
      type: 'category',
      data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      axisLine: {
        lineStyle: {
          color: this.colors.borderColor(),
        },
      },
      axisLabel: {
        color: this.colors.textColor(),
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: this.colors.borderColor(),
        },
      },
      axisLabel: {
        color: this.colors.textColor(),
      },
      splitLine: {
        lineStyle: {
          color: this.colors.borderColorSubtle(),
        },
      },
    },
    series: [
      {
        name: 'Ventas',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110],
        itemStyle: {
          color: this.colors.primaryColor,
        },
      },
      {
        name: 'Gastos',
        type: 'line',
        data: [80, 120, 100, 60, 50, 90],
        itemStyle: {
          color: this.colors.dangerColor,
        },
      },
    ],
  }));

  constructor() {
    // Initialize translations from JSON files
    this.translate.setDefaultLang('es');
    this.translate.use('es');

    // Update chart title when language changes
    effect(() => {
      this.translate.get('demo.chart.title').subscribe((text: string) => {
        this.chartTitle.set(text);
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

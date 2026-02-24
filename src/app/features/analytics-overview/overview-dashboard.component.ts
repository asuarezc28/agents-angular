import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import type { EChartsOption } from 'echarts';
import { TranslateModule, TranslateService, type TranslationObject } from '@ngx-translate/core';
import { PanelViewFrameComponent } from '@features/layout/components/panel-view-frame/panel-view-frame.component';
import { AnalyticsOverviewItemComponent } from '@features/analytics-overview/components/analytics-overview-item/analytics-overview-item.component';
import { ChartComponent } from '@shared/components/chart/chart.component';
import { COLORS } from '@constants/colors.constants';

interface AnalyticsOverviewCard {
  id: string;
  group: string;
  title: string;
  description: string;
  chartOptions: EChartsOption;
  chartHeight?: string;
}

type BriefingMode = 'daily' | 'weekly';

@Component({
  selector: 'app-overview-dashboard',
  imports: [
    AnalyticsOverviewItemComponent,
    PanelViewFrameComponent,
    ChartComponent,
    TranslateModule,
  ],
  templateUrl: './overview-dashboard.component.html',
  styles: [
    `
      .daily-brief-secondary__item + .daily-brief-secondary__item {
        border-top: 1px solid var(--brief-border);
        margin-top: 1rem;
        padding-top: 1rem;
      }

      @media (min-width: 1024px) {
        .daily-brief-secondary__item + .daily-brief-secondary__item {
          border-top: 0;
          margin-top: 0;
          padding-top: 0;
        }

        .daily-brief-secondary__item:not(:nth-child(3n + 1)) {
          border-left: 1px solid var(--brief-border);
          padding-left: 1.25rem;
        }

        .daily-brief-secondary__item:nth-child(n + 4) {
          border-top: 1px solid var(--brief-border);
          padding-top: 1rem;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewDashboardComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);
  private readonly scrollThreshold = 3;

  protected readonly activeMode = signal<BriefingMode>('daily');
  protected readonly modeTabs: Array<{ id: BriefingMode; labelKey: string }> = [
    { id: 'daily', labelKey: 'analyticsOverview.tabs.daily' },
    { id: 'weekly', labelKey: 'analyticsOverview.tabs.weekly' },
  ];

  protected readonly briefingDateKey = 'analyticsOverview.header.date';
  protected readonly editionLabelKey = computed(() =>
    this.activeMode() === 'daily'
      ? 'analyticsOverview.header.edition.daily'
      : 'analyticsOverview.header.edition.weekly',
  );
  protected readonly panelBorderColor =
    'var(--p-card-border-color, var(--p-content-border-color, var(--p-surface-300)))';

  private readonly dangerMain = COLORS.danger[500];
  protected readonly dangerDeep = COLORS.danger[800];
  private readonly neutralSoft = COLORS.surface[300];
  private readonly neutralMid = COLORS.surface[400];

  private readonly dailyHeroCard: AnalyticsOverviewCard = {
    id: 'hero',
    group: 'analyticsOverview.groups.alert',
    title: 'analyticsOverview.hero.daily.title',
    description: 'analyticsOverview.hero.daily.description',
    chartHeight: '300px',
    chartOptions: {
      tooltip: { trigger: 'axis' },
      grid: { left: 14, right: 10, top: 16, bottom: 18, containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: ['Login issues', 'Top reason', 'Pics', 'Others'],
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 70,
        interval: 10,
      },
      series: [
        {
          type: 'line',
          smooth: true,
          areaStyle: { color: this.hexToRgba(this.dangerMain, 0.16) },
          lineStyle: { color: this.dangerMain, width: 3 },
          itemStyle: { color: this.dangerMain },
          z: 2,
          data: [20, 36, 30, 47, 44, 58, 73],
        },
        {
          type: 'bar',
          data: [
            { value: 29, itemStyle: { color: this.hexToRgba(this.dangerMain, 0.9) } },
            { value: 18, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.75) } },
            { value: 12, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.6) } },
            { value: 5, itemStyle: { color: this.hexToRgba(this.neutralSoft, 0.75) } },
          ],
          barMaxWidth: 22,
          barGap: '-100%',
          xAxisIndex: 0,
        },
      ],
    },
  };

  private readonly weeklyHeroCard: AnalyticsOverviewCard = {
    id: 'hero-weekly',
    group: 'analyticsOverview.groups.alert',
    title: 'analyticsOverview.hero.weekly.title',
    description: 'analyticsOverview.hero.weekly.description',
    chartHeight: '300px',
    chartOptions: {
      tooltip: { trigger: 'axis' },
      grid: { left: 14, right: 10, top: 16, bottom: 18, containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: ['Login issues', 'Top reason', 'Pics', 'Others'],
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 90,
        interval: 10,
      },
      series: [
        {
          type: 'line',
          smooth: true,
          areaStyle: { color: this.hexToRgba(this.dangerMain, 0.16) },
          lineStyle: { color: this.dangerMain, width: 3 },
          itemStyle: { color: this.dangerMain },
          z: 2,
          data: [28, 42, 39, 54, 57, 66, 81],
        },
        {
          type: 'bar',
          data: [
            { value: 41, itemStyle: { color: this.hexToRgba(this.dangerMain, 0.9) } },
            { value: 27, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.75) } },
            { value: 18, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.6) } },
            { value: 9, itemStyle: { color: this.hexToRgba(this.neutralSoft, 0.75) } },
          ],
          barMaxWidth: 22,
          barGap: '-100%',
          xAxisIndex: 0,
        },
      ],
    },
  };

  private readonly dailySecondaryCards: AnalyticsOverviewCard[] = [
    {
      id: 'business-1',
      group: 'analyticsOverview.groups.business',
      title: 'analyticsOverview.secondary.daily.business.title',
      description: 'analyticsOverview.secondary.daily.business.description',
      chartOptions: {
        tooltip: { trigger: 'axis' },
        grid: { left: 6, right: 6, top: 12, bottom: 14, containLabel: true },
        xAxis: { type: 'category', data: ['2013', '2014', '2015', '2016', '2017'] },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'bar',
            data: [160, 220, 260, 300, 430],
            barMaxWidth: 10,
            itemStyle: { color: this.hexToRgba(this.neutralMid, 0.7) },
          },
          {
            type: 'line',
            smooth: true,
            data: [180, 250, 270, 330, 520],
            lineStyle: { color: this.dangerMain, width: 2.5 },
            itemStyle: { color: this.dangerMain },
          },
        ],
      },
    },
    {
      id: 'quality-1',
      group: 'analyticsOverview.groups.quality',
      title: 'analyticsOverview.secondary.daily.quality.title',
      description: 'analyticsOverview.secondary.daily.quality.description',
      chartOptions: {
        tooltip: { trigger: 'axis' },
        grid: { left: 8, right: 8, top: 14, bottom: 18, containLabel: true },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLabel: { interval: 1 },
        },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'bar',
            data: [
              { value: 58, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.75) } },
              { value: 48, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.72) } },
              { value: 39, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.68) } },
              { value: 30, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.64) } },
              { value: 34, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.66) } },
              { value: 44, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.7) } },
              { value: 57, itemStyle: { color: this.hexToRgba(this.dangerMain, 0.92) } },
            ],
            barMaxWidth: 14,
          },
        ],
      },
    },
    {
      id: 'operations-1',
      group: 'analyticsOverview.groups.operations',
      title: 'analyticsOverview.secondary.daily.operations.title',
      description: 'analyticsOverview.secondary.daily.operations.description',
      chartOptions: {
        tooltip: { trigger: 'item' },
        radar: {
          indicator: [
            { name: 'Login', max: 100 },
            { name: 'Checkout', max: 100 },
            { name: 'Support', max: 100 },
            { name: 'CRM', max: 100 },
            { name: 'API', max: 100 },
          ],
          radius: '58%',
        },
        series: [
          {
            type: 'radar',
            data: [{ value: [76, 64, 82, 58, 71] }],
            lineStyle: { color: this.dangerMain, width: 2 },
            itemStyle: { color: this.dangerMain },
            areaStyle: { color: this.hexToRgba(this.dangerMain, 0.22) },
          },
        ],
      },
    },
    {
      id: 'business-2',
      group: 'analyticsOverview.groups.business',
      title: 'analyticsOverview.secondary.daily.business.title',
      description: 'analyticsOverview.secondary.daily.business.description',
      chartOptions: {
        tooltip: { trigger: 'axis' },
        grid: { left: 6, right: 6, top: 12, bottom: 14, containLabel: true },
        xAxis: { type: 'category', data: ['2013', '2014', '2015', '2016', '2017'] },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'bar',
            data: [160, 220, 260, 300, 430],
            barMaxWidth: 10,
            itemStyle: { color: this.hexToRgba(this.neutralMid, 0.7) },
          },
          {
            type: 'line',
            smooth: true,
            data: [180, 250, 270, 330, 520],
            lineStyle: { color: this.dangerMain, width: 2.5 },
            itemStyle: { color: this.dangerMain },
          },
        ],
      },
    },
    {
      id: 'quality-2',
      group: 'analyticsOverview.groups.quality',
      title: 'analyticsOverview.secondary.daily.quality.title',
      description: 'analyticsOverview.secondary.daily.quality.description',
      chartOptions: {
        tooltip: { trigger: 'axis' },
        grid: { left: 8, right: 8, top: 14, bottom: 18, containLabel: true },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLabel: { interval: 1 },
        },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'bar',
            data: [
              { value: 58, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.75) } },
              { value: 48, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.72) } },
              { value: 39, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.68) } },
              { value: 30, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.64) } },
              { value: 34, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.66) } },
              { value: 44, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.7) } },
              { value: 57, itemStyle: { color: this.hexToRgba(this.dangerMain, 0.92) } },
            ],
            barMaxWidth: 14,
          },
        ],
      },
    },
    {
      id: 'operations-2',
      group: 'analyticsOverview.groups.operations',
      title: 'analyticsOverview.secondary.daily.operations.title',
      description: 'analyticsOverview.secondary.daily.operations.description',
      chartOptions: {
        tooltip: { trigger: 'item' },
        radar: {
          indicator: [
            { name: 'Login', max: 100 },
            { name: 'Checkout', max: 100 },
            { name: 'Support', max: 100 },
            { name: 'CRM', max: 100 },
            { name: 'API', max: 100 },
          ],
          radius: '58%',
        },
        series: [
          {
            type: 'radar',
            data: [{ value: [76, 64, 82, 58, 71] }],
            lineStyle: { color: this.dangerMain, width: 2 },
            itemStyle: { color: this.dangerMain },
            areaStyle: { color: this.hexToRgba(this.dangerMain, 0.22) },
          },
        ],
      },
    },
  ];

  private readonly weeklySecondaryCards: AnalyticsOverviewCard[] = [
    {
      id: 'business-week-1',
      group: 'analyticsOverview.groups.business',
      title: 'analyticsOverview.secondary.weekly.business.title',
      description: 'analyticsOverview.secondary.weekly.business.description',
      chartOptions: {
        tooltip: { trigger: 'axis' },
        grid: { left: 6, right: 6, top: 12, bottom: 14, containLabel: true },
        xAxis: { type: 'category', data: ['S1', 'S2', 'S3', 'S4', 'S5'] },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'bar',
            data: [210, 280, 330, 370, 510],
            barMaxWidth: 10,
            itemStyle: { color: this.hexToRgba(this.neutralMid, 0.7) },
          },
          {
            type: 'line',
            smooth: true,
            data: [240, 300, 360, 410, 590],
            lineStyle: { color: this.dangerMain, width: 2.5 },
            itemStyle: { color: this.dangerMain },
          },
        ],
      },
    },
    {
      id: 'quality-week-1',
      group: 'analyticsOverview.groups.quality',
      title: 'analyticsOverview.secondary.weekly.quality.title',
      description: 'analyticsOverview.secondary.weekly.quality.description',
      chartOptions: {
        tooltip: { trigger: 'axis' },
        grid: { left: 8, right: 8, top: 14, bottom: 18, containLabel: true },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLabel: { interval: 1 },
        },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'bar',
            data: [
              { value: 72, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.75) } },
              { value: 66, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.72) } },
              { value: 54, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.68) } },
              { value: 48, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.64) } },
              { value: 45, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.66) } },
              { value: 52, itemStyle: { color: this.hexToRgba(this.neutralMid, 0.7) } },
              { value: 71, itemStyle: { color: this.hexToRgba(this.dangerMain, 0.92) } },
            ],
            barMaxWidth: 14,
          },
        ],
      },
    },
    {
      id: 'operations-week-1',
      group: 'analyticsOverview.groups.operations',
      title: 'analyticsOverview.secondary.weekly.operations.title',
      description: 'analyticsOverview.secondary.weekly.operations.description',
      chartOptions: {
        tooltip: { trigger: 'item' },
        radar: {
          indicator: [
            { name: 'Login', max: 100 },
            { name: 'Checkout', max: 100 },
            { name: 'Support', max: 100 },
            { name: 'CRM', max: 100 },
            { name: 'API', max: 100 },
          ],
          radius: '58%',
        },
        series: [
          {
            type: 'radar',
            data: [{ value: [84, 71, 88, 66, 77] }],
            lineStyle: { color: this.dangerMain, width: 2 },
            itemStyle: { color: this.dangerMain },
            areaStyle: { color: this.hexToRgba(this.dangerMain, 0.22) },
          },
        ],
      },
    },
  ];

  protected readonly heroCard = computed(() =>
    this.activeMode() === 'daily' ? this.dailyHeroCard : this.weeklyHeroCard,
  );

  protected readonly secondaryCards = computed(() =>
    this.activeMode() === 'daily' ? this.dailySecondaryCards : this.weeklySecondaryCards,
  );

  protected readonly shouldEnableInternalScroll = computed(
    () => this.secondaryCards().length > this.scrollThreshold,
  );

  constructor() {
    const initialLang = this.translate.currentLang || this.translate.getFallbackLang() || 'es';
    this.loadViewTranslations(initialLang);

    const fallbackLang = this.translate.getFallbackLang() || 'es';
    if (fallbackLang !== initialLang) {
      this.loadViewTranslations(fallbackLang);
    }

    this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ lang }) => {
      this.loadViewTranslations(lang);
    });
  }

  protected setMode(mode: BriefingMode): void {
    this.activeMode.set(mode);
  }

  private hexToRgba(hex: string, opacity: number): string {
    const sanitizedHex = hex.replace('#', '');
    const fullHex =
      sanitizedHex.length === 3
        ? sanitizedHex
            .split('')
            .map((char) => `${char}${char}`)
            .join('')
        : sanitizedHex;

    const red = Number.parseInt(fullHex.slice(0, 2), 16);
    const green = Number.parseInt(fullHex.slice(2, 4), 16);
    const blue = Number.parseInt(fullHex.slice(4, 6), 16);

    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  }

  private loadViewTranslations(lang: string): void {
    this.http
      .get<TranslationObject>(`/assets/i18n/${lang}/analytics-overview.json`)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => of({} as TranslationObject)),
      )
      .subscribe({
        next: (translations) => {
          if (Object.keys(translations).length === 0) {
            return;
          }

          this.translate.setTranslation(lang, translations, true);
        },
      });
  }
}

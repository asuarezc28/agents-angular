import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, of } from 'rxjs';
import { TranslateModule, TranslateService, type TranslationObject } from '@ngx-translate/core';
import { PanelViewFrameComponent } from '@features/layout/components/panel-view-frame/panel-view-frame.component';
import { AnalyticsOverviewItemComponent } from '@features/analytics-overview/components/analytics-overview-item/analytics-overview-item.component';
import { ChartComponent } from '@shared/components/chart/chart.component';
import { ViewLoadingStateComponent } from '@shared/components/view-loading-state/view-loading-state.component';
import { COLORS } from '@constants/colors.constants';
import type {
  AnalyticsOverviewData,
  BriefingMode,
} from '@features/analytics-overview/models/overview-dashboard.model';
import { AnalyticsOverviewDataService } from './services/analytics-overview-data.service';

@Component({
  selector: 'app-overview-dashboard',
  imports: [
    AnalyticsOverviewItemComponent,
    PanelViewFrameComponent,
    ChartComponent,
    NgComponentOutlet,
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
  private readonly dataService = inject(AnalyticsOverviewDataService);

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
  protected readonly dangerDeep = COLORS.danger[800];

  protected readonly isLoadingData = signal(true);
  protected readonly hasLoadError = signal(false);

  private readonly dailyData = signal<AnalyticsOverviewData | null>(null);
  private readonly weeklyData = signal<AnalyticsOverviewData | null>(null);

  protected readonly heroCard = computed(() => {
    const data = this.activeMode() === 'daily' ? this.dailyData() : this.weeklyData();
    return data?.heroCard ?? null;
  });

  protected readonly secondaryCards = computed(() => {
    const data = this.activeMode() === 'daily' ? this.dailyData() : this.weeklyData();
    return data?.secondaryCards ?? [];
  });

  protected readonly shouldEnableInternalScroll = computed(
    () => this.secondaryCards().length > this.scrollThreshold,
  );
  protected readonly loadingStateComponent = ViewLoadingStateComponent;

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

    this.loadOverviewData();
  }

  protected setMode(mode: BriefingMode): void {
    this.activeMode.set(mode);
  }

  private loadOverviewData(): void {
    this.isLoadingData.set(true);
    this.hasLoadError.set(false);

    forkJoin({
      daily: this.dataService.getDailyOverviewData(),
      weekly: this.dataService.getWeeklyOverviewData(),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ daily, weekly }) => {
          this.dailyData.set(daily);
          this.weeklyData.set(weekly);
          this.isLoadingData.set(false);
        },
        error: () => {
          this.hasLoadError.set(true);
          this.isLoadingData.set(false);
        },
      });
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

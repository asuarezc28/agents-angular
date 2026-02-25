import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { BaseDataService } from '@core/services/base-data.service';
import { MockDataService } from '@core/services/mock-data.service';
import type { AnalyticsOverviewData } from '@features/analytics-overview/models/overview-dashboard.model';

@Injectable({ providedIn: 'root' })
export class AnalyticsOverviewDataService extends BaseDataService {
  private readonly mockData = inject(MockDataService);
  private readonly visualDelayMs = 2200;

  getDailyOverviewData(): Observable<AnalyticsOverviewData> {
    return this.fromMockOrApi({
      mockRequest: () =>
        this.mockData.loadJson<AnalyticsOverviewData>('analytics-overview-daily.json'),
      apiRequest: () => this.apiGet<AnalyticsOverviewData>('/analytics/overview/daily'),
    }).pipe(delay(this.visualDelayMs));
  }

  getWeeklyOverviewData(): Observable<AnalyticsOverviewData> {
    return this.fromMockOrApi({
      mockRequest: () =>
        this.mockData.loadJson<AnalyticsOverviewData>('analytics-overview-weekly.json'),
      apiRequest: () => this.apiGet<AnalyticsOverviewData>('/analytics/overview/weekly'),
    }).pipe(delay(this.visualDelayMs));
  }
}

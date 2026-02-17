import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { catchError, map, of, startWith } from 'rxjs';
import { Company } from '../../../../core/mocks';
import { ContextDataService } from '../../../../core/services/context-data.service';
import { ChartComponent } from '../../../../shared/components/chart/chart.component';
import type { EChartsOption } from 'echarts';

type RequestState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'empty' }
  | { status: 'success'; data: Company[] };

@Component({
  selector: 'app-overview-dashboard',
  imports: [ChartComponent, TranslateModule],
  template: `
    <div class="grid grid-cols-1 gap-4">
      @if (companiesState(); as state) {
        @if (state.status === 'loading') {
          <p class="opacity-80">{{ 'messages.loading' | translate }}</p>
        } @else if (state.status === 'error') {
          <p class="opacity-80">{{ 'messages.error.generic' | translate }}</p>
        } @else if (state.status === 'empty') {
          <p class="opacity-80">{{ 'messages.noData' | translate }}</p>
        } @else {
          <div class="grid grid-cols-1 gap-2">
            @for (company of state.data; track company.id) {
              <div class="rounded border border-surface-200 dark:border-surface-700 p-3">
                <p class="font-medium">{{ company.name }}</p>
              </div>
            }
          </div>

          <div class="h-[400px]">
            <app-chart [options]="chartOptions()" />
          </div>
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewDashboardComponent {
  private readonly contextData = inject(ContextDataService);

  readonly companiesState = toSignal(
    this.contextData.getCompanies().pipe(
      map((companies) =>
        companies.length > 0
          ? ({ status: 'success', data: companies } as const)
          : ({ status: 'empty' } as const),
      ),
      startWith({ status: 'loading' } as const),
      catchError(() => of({ status: 'error' } as const)),
    ),
    { initialValue: { status: 'loading' } as const },
  );

  chartOptions(): EChartsOption {
    return {
      title: {
        text: 'Analytics Overview',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Revenue', 'Users'],
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Revenue',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230],
        },
        {
          name: 'Users',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330],
        },
      ],
    };
  }
}

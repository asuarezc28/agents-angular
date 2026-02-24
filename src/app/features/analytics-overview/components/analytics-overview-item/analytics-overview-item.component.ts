import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { ChartComponent } from '@shared/components/chart/chart.component';

@Component({
  selector: 'app-analytics-overview-item',
  imports: [ChartComponent],
  host: {
    class: 'block',
  },
  template: `
    <article class="p-0">
      <div class="flex items-stretch gap-4">
        <header class="flex-1 space-y-2">
          <p class="m-0 text-xs font-bold uppercase tracking-[0.06em] opacity-70">{{ group() }}</p>

          @if (compact()) {
            <h3 class="m-0 text-[1.05rem] font-bold leading-[1.25]">{{ title() }}</h3>
            <p class="m-0 text-[0.87rem] leading-[1.35] opacity-80">{{ description() }}</p>
          } @else {
            <h3 class="m-0 text-[1.55rem] font-bold leading-[1.15] max-[900px]:text-[1.25rem]">
              {{ title() }}
            </h3>
            <p class="m-0 text-[0.95rem] leading-[1.4] opacity-80">{{ description() }}</p>
          }
        </header>

        <div
          class="shrink-0 basis-[40%]"
          [style.height]="chartHeight()"
          [style.flexBasis]="chartWidth()"
          [style.minWidth]="chartMinWidth()"
        >
          <app-chart [options]="chartOptions()" />
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsOverviewItemComponent {
  readonly group = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly chartOptions = input.required<EChartsOption>();
  readonly compact = input(false);
  readonly chartHeight = input('220px');
  readonly chartWidth = input('40%');
  readonly chartMinWidth = input('220px');
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartComponent } from '../../../../shared/components/chart/chart.component';
import type { EChartsOption } from 'echarts';
import { PanelViewFrameComponent } from '../panel-view-frame/panel-view-frame.component';

@Component({
  selector: 'app-overview-dashboard',
  imports: [ChartComponent, PanelViewFrameComponent],
  template: `
    <app-panel-view-frame [showDecoration]="false">
      <div class="h-[400px]">
        <app-chart [options]="chartOptions()" />
      </div>
    </app-panel-view-frame>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewDashboardComponent {
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

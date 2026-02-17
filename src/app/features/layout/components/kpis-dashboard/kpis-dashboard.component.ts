import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartComponent } from '../../../../shared/components/chart/chart.component';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-kpis-dashboard',
  imports: [ChartComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="h-[300px]">
        <app-chart [options]="performanceChart()" />
      </div>
      <div class="h-[300px]">
        <app-chart [options]="satisfactionChart()" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpisDashboardComponent {
  performanceChart(): EChartsOption {
    return {
      title: {
        text: 'Performance KPIs',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Performance',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Completed' },
            { value: 735, name: 'In Progress' },
            { value: 580, name: 'Pending' },
            { value: 484, name: 'Delayed' },
          ],
        },
      ],
    };
  }

  satisfactionChart(): EChartsOption {
    return {
      title: {
        text: 'User Satisfaction',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
        max: 100,
      },
      series: [
        {
          name: 'Satisfaction %',
          type: 'bar',
          data: [85, 87, 82, 91, 88, 92, 89],
        },
      ],
    };
  }
}

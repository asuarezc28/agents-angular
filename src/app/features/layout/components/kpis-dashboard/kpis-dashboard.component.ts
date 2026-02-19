import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartComponent } from '../../../../shared/components/chart/chart.component';
import type { EChartsOption } from 'echarts';
import { PanelViewFrameComponent } from '../panel-view-frame/panel-view-frame.component';

@Component({
  selector: 'app-kpis-dashboard',
  imports: [ChartComponent, PanelViewFrameComponent],
  template: `
    <app-panel-view-frame [titleKey]="'layoutBase.panel.analytics.kpis.title'">
      <!-- class="grid grid-cols-1 md:grid-cols-2 gap-4" -->
      <div>
        <!-- <div class="h-[300px]">
          <app-chart [options]="performanceChart()" />
        </div> -->
        <div class="h-[300px]">
          <app-chart [options]="satisfactionChart()" />
        </div>
        <!-- <div class="h-[320px]">
          <app-chart [options]="teamRadarChart()" />
        </div>
        <div class="h-[320px]">
          <app-chart [options]="goalGaugeChart()" />
        </div>
        <div class="h-[320px]">
          <app-chart [options]="qualityScatterChart()" />
        </div>
        <div class="h-[320px]">
          <app-chart [options]="conversionFunnelChart()" />
        </div> -->
      </div>
    </app-panel-view-frame>
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

  teamRadarChart(): EChartsOption {
    return {
      title: {
        text: 'Team Capability Radar',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        data: ['Current', 'Target'],
      },
      radar: {
        indicator: [
          { name: 'Quality', max: 100 },
          { name: 'Velocity', max: 100 },
          { name: 'Reliability', max: 100 },
          { name: 'Innovation', max: 100 },
          { name: 'Collaboration', max: 100 },
          { name: 'Automation', max: 100 },
        ],
      },
      series: [
        {
          name: 'Capability',
          type: 'radar',
          data: [
            {
              value: [78, 72, 84, 68, 81, 74],
              name: 'Current',
            },
            {
              value: [85, 80, 90, 82, 88, 86],
              name: 'Target',
            },
          ],
        },
      ],
    };
  }

  goalGaugeChart(): EChartsOption {
    return {
      title: {
        text: 'Monthly Goal Completion',
      },
      tooltip: {
        formatter: '{a} <br/>{b}: {c}%',
      },
      series: [
        {
          name: 'Goal',
          type: 'gauge',
          progress: {
            show: true,
            width: 14,
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}%',
          },
          data: [
            {
              value: 76,
              name: 'Completion',
            },
          ],
        },
      ],
    };
  }

  qualityScatterChart(): EChartsOption {
    return {
      title: {
        text: 'Quality vs Delivery Scatter',
      },
      tooltip: {
        trigger: 'item',
      },
      xAxis: {
        type: 'value',
        name: 'Delivery Speed',
        min: 0,
        max: 100,
      },
      yAxis: {
        type: 'value',
        name: 'Quality Score',
        min: 0,
        max: 100,
      },
      series: [
        {
          type: 'scatter',
          symbolSize: 12,
          data: [
            [35, 78],
            [44, 82],
            [52, 74],
            [61, 89],
            [70, 85],
            [78, 80],
            [85, 92],
          ],
        },
      ],
    };
  }

  conversionFunnelChart(): EChartsOption {
    return {
      title: {
        text: 'Initiatives Funnel',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Pipeline',
          type: 'funnel',
          left: '10%',
          top: 40,
          bottom: 20,
          width: '80%',
          min: 0,
          max: 100,
          minSize: '20%',
          maxSize: '100%',
          sort: 'descending',
          gap: 4,
          label: {
            show: true,
            position: 'inside',
          },
          data: [
            { value: 100, name: 'Identified' },
            { value: 82, name: 'Validated' },
            { value: 63, name: 'Prioritized' },
            { value: 41, name: 'Executing' },
            { value: 28, name: 'Delivered' },
          ],
        },
      ],
    };
  }
}

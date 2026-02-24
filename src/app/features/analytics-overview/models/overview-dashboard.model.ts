import type { EChartsOption } from 'echarts';

export type BriefingMode = 'daily' | 'weekly';

export interface AnalyticsOverviewCard {
  id: string;
  group: string;
  title: string;
  description: string;
  chartOptions: EChartsOption;
  chartHeight?: string;
}

export interface AnalyticsOverviewData {
  heroCard: AnalyticsOverviewCard;
  secondaryCards: AnalyticsOverviewCard[];
}

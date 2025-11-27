/**
 * Type definitions for performance data
 */
export interface PerformanceItem {
  id: string;
  label: string;
  value: number;
  percentage: number;
  color: string;
}

export interface PerformanceData {
  title: string;
  items: PerformanceItem[];
  totalValue: number;
}


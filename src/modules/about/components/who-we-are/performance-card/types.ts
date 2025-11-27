/**
 * Type definitions for performance data
 */
export interface PerformanceItem {
  id: string;
  labelCount: number;
  labelKey: string; // Translation key for the label (e.g., 'students', 'sessions')
  value: number;
  percentage: number;
  color: string;
}

export interface PerformanceData {
  items: PerformanceItem[];
}


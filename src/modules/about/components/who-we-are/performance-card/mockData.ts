import { PerformanceData } from './types';

/**
 * Mock performance data for demonstration
 * In production, this would come from an API
 */
export const mockPerformanceData: PerformanceData = {
  items: [
    {
      id: '1',
      labelCount: 20,
      labelKey: 'students',
      value: 20,
      percentage: 32,
      color: '#9C27B0',
    },
    {
      id: '2',
      labelCount: 10,
      labelKey: 'students',
      value: 20,
      percentage: 32,
      color: '#4CAF50',
    },
    {
      id: '3',
      labelCount: 5,
      labelKey: 'students',
      value: 15,
      percentage: 26,
      color: '#FFC107',
    },
    {
      id: '4',
      labelCount: 7,
      labelKey: 'sessions',
      value: 7,
      percentage: 12,
      color: '#FF9800',
    },
  ],
};


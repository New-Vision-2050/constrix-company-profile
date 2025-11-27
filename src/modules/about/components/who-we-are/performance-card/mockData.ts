import { PerformanceData } from './types';

/**
 * Mock performance data for demonstration
 * In production, this would come from an API
 */
export const mockPerformanceData: PerformanceData = {
  title: 'Type of studying',
  totalValue: 62,
  items: [
    {
      id: '1',
      label: '20 students',
      value: 20,
      percentage: 32,
      color: '#9C27B0',
    },
    {
      id: '2',
      label: '10 students',
      value: 20,
      percentage: 32,
      color: '#4CAF50',
    },
    {
      id: '3',
      label: '5 students',
      value: 15,
      percentage: 26,
      color: '#FFC107',
    },
    {
      id: '4',
      label: '7 sessions',
      value: 7,
      percentage: 12,
      color: '#FF9800',
    },
  ],
};


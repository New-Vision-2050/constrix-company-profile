import { useState, useMemo } from 'react';
import { User, SortOrder } from './types';

/**
 * Custom hook for managing user list sorting
 * Separates business logic from UI components
 */
export function useUserSort(users: User[]) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      return sortOrder === 'desc'
        ? b.averageMark - a.averageMark
        : a.averageMark - b.averageMark;
    });
  }, [users, sortOrder]);

  return {
    sortedUsers,
    sortOrder,
    setSortOrder,
  };
}


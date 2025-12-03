/**
 * Type definitions for user data
 */
export interface User {
  id: string;
  name: string;
  averageMark: number;
  avatarColor: string;
  avatarSecondaryColor?: string;
}

export type SortOrder = 'asc' | 'desc';


export const isAuthenticated = (token?: string | null): boolean => {
  return !!token;
};

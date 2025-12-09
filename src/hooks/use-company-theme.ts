"use client";

import { useBE_Theme } from "@/lib/theme/client/theme-provider";

/**
 * Hook to access company theme data including branding assets and contact information
 * 
 * This hook provides access to:
 * - Theme colors and typography (also available via MUI's useTheme)
 * - Company branding: icon_url
 * - Contact information: email, phone
 * - Social media links: facebook, youtube, etc.
 * 
 * @returns Company theme data from the backend
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { data } = useCompanyTheme();
 *   
 *   return (
 *     <div>
 *       <img src={data.icon_url} alt="Company Logo" />
 *       <p>Email: {data.contact_info.email}</p>
 *       <p>Phone: {data.contact_info.phone}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useCompanyTheme() {
  return useBE_Theme();
}


import { PreviousWork } from "./previous-work";

/**
 * Service detail data structure
 * Centralized type definition for service details page
 * Ensures type safety across all components
 */
export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
  previousWorks?: PreviousWork[];
}


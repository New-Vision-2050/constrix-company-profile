import { BE_ServiceCategory } from "../service-category";

export enum ServiceStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface BE_Service {
  id: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: string;
  name: string;
  code: string;
  description?: string;
  categoryId?: string;
  price: number;
  discount?: number;
  durationMinutes?: number;
  status: ServiceStatus;
  notes?: string;
}

export interface BE_ServiceWithCategory extends BE_Service {
  category?: BE_ServiceCategory;
}

export enum ServiceCategoryStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface BE_ServiceCategory {
  id: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: string;
  name: string;
  code: string;
  description?: string;
  color?: string;
  status: ServiceCategoryStatus;
}

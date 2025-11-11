import { ServiceCategoryStatus } from "@/types/api/base/service-category";

export interface CreateServiceCategoryArgs {
  name: string;
  code: string;
  description?: string;
  color?: string;
  status?: ServiceCategoryStatus;
}

export interface UpdateServiceCategoryArgs
  extends Partial<CreateServiceCategoryArgs> {}

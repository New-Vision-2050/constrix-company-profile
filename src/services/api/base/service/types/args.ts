import { ServiceStatus } from "@/types/api/base/service";

export interface CreateServiceArgs {
  name: string;
  code: string;
  description?: string;
  categoryId?: string;
  price: number;
  discount?: number;
  durationMinutes?: number;
  status?: ServiceStatus;
  notes?: string;
}

export interface UpdateServiceArgs extends Partial<CreateServiceArgs> {}

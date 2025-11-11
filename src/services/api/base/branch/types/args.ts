import { BE_WorkingHours } from "@/types/api/base/branch";

export interface CreateBranchArgs {
  name: string;
  slug?: string;
  address: string;
  city: string;
  country?: string;
  phone: string;
  email?: string;
  workingHours?: BE_WorkingHours;
  logoUrl?: string;
}

export interface UpdateBranchArgs extends Partial<CreateBranchArgs> {}

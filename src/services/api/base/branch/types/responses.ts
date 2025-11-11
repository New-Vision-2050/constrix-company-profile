import { BE_Branch, BE_BranchWithWorkspace } from "@/types/api/base/branch";
import { BE_Pagination } from "@/types/api/common/pagination";

export type ListBranchesResponse = BE_Pagination<BE_BranchWithWorkspace[]>;
export type ShowBranchResponse = BE_BranchWithWorkspace;

export interface CreateBranchResponse extends BE_Branch {}
export interface UpdateBranchResponse extends BE_Branch {}

export interface BranchCountResponse {
  count: number;
}

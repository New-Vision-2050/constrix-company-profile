import {
  ListBranchesResponse,
  ShowBranchResponse,
  CreateBranchResponse,
  UpdateBranchResponse,
  BranchCountResponse,
} from "./types/responses";
import { CreateBranchArgs, UpdateBranchArgs } from "./types/args";
import { BE_ListParams } from "@/types/api/common/args/list";
import { workspaceApi } from "@/lib/axios/instances/workspace";

export const BranchApi = {
  list: (params?: BE_ListParams) =>
    workspaceApi.get<ListBranchesResponse>("branches", { params }),
  show: (id: string) => workspaceApi.get<ShowBranchResponse>("branches/" + id),
  showBySlug: (slug: string) =>
    workspaceApi.get<ShowBranchResponse>("branches/slug/" + slug),
  create: (args: CreateBranchArgs) =>
    workspaceApi.post<CreateBranchResponse>("branches", args),
  update: (id: string, args: UpdateBranchArgs) =>
    workspaceApi.put<UpdateBranchResponse>("branches/" + id, args),
  delete: (id: string) => workspaceApi.delete("branches/" + id),
  count: () => workspaceApi.get<BranchCountResponse>("branches/count"),
};

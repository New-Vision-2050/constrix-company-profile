import { baseApi } from "@/lib/axios/instances/base";
import {
  GetWorkspaceMembersResponse,
  ListWorkspacesResponse,
  ShowWorkspaceResponse,
} from "./types/responses";
import { CreateWorkspaceArgs, UpdateWorkspaceArgs } from "./types/args";
import { serialize } from "object-to-formdata";
import { BE_ListParams } from "@/types/api/common/args/list";

export const WorkspaceApi = {
  listMine: (params?: BE_ListParams) =>
    baseApi.get<ListWorkspacesResponse>("workspace/my", { params }),
  list: () => baseApi.get<ListWorkspacesResponse>("workspace/all"),
  show: (id: string) => baseApi.get<ShowWorkspaceResponse>("workspace/" + id),
  create: (args: CreateWorkspaceArgs) =>
    baseApi.post("workspace", serialize(args)),
  update: (id: string, args: UpdateWorkspaceArgs) =>
    baseApi.post("workspace/" + id, args),
  delete: (id: string) => baseApi.delete("workspace/" + id),
  getMembers: (id: string) =>
    baseApi.get<GetWorkspaceMembersResponse>(`workspace/${id}/members`),
  addMember: (workspaceId: string, userId: string) =>
    baseApi.post(`workspace/${workspaceId}/members`, { userId }),
  removeMember: (workspaceId: string, userId: string) =>
    baseApi.delete(`workspace/${workspaceId}/members/${userId}`),
};

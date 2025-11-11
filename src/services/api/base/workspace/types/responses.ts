import {
  BE_Workspace,
  BE_WorkspaceWithOwner,
} from "@/types/api/base/workspace";
import { BE_WorkspaceMemberWithUser } from "@/types/api/base/workspace/member";
import { BE_Pagination } from "@/types/api/common/pagination";

export type ListWorkspacesResponse = BE_Pagination<BE_WorkspaceWithOwner[]>;
export type ShowWorkspaceResponse = BE_WorkspaceWithOwner;

export interface CreateWorkspaceResponse extends BE_Workspace {}
export interface UpdateWorkspaceResponse extends BE_Workspace {}

export type GetWorkspaceMembersResponse = BE_WorkspaceMemberWithUser[];

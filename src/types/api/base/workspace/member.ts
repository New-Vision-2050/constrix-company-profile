import { BE_User } from "../user";

export interface BE_WorkspaceMember {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  workspaceId: string;
  invitedAt?: string;
  joinedAt: string;
  user?: BE_User;
}

export interface BE_WorkspaceMemberWithUser extends BE_WorkspaceMember {}

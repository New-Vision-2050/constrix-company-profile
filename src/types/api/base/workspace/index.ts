import { BE_Media } from "..";
import { BE_User } from "../user";

export interface BE_Workspace {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  ownerId: string;
  logo?: BE_Media;
  owner?: BE_User;
}

export interface BE_WorkspaceWithOwner extends BE_Workspace {}

export interface CreateWorkspaceArgs {
  name: string;
  description: string;
  logo?: File | null;
}
export interface UpdateWorkspaceArgs extends Partial<CreateWorkspaceArgs> {}

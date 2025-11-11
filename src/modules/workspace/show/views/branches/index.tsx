"use client";

import { BE_Workspace } from "@/types/api/base/workspace";
import BranchesGrid from "@/modules/branch/components/branches-grid";

type Props = {
  workspace: BE_Workspace;
};

function WorkspaceBranchesTab({ workspace }: Props) {
  return (
    <BranchesGrid
      workspaceId={workspace.id}
      queryKey="workspace-branches"
      showTitle={true}
      enableAdd={true}
      defaultParams={{ page: 1, perPage: 9 }}
    />
  );
}

export default WorkspaceBranchesTab;

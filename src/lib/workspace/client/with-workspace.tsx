"use client";

import { FC } from "react";
import { useAtomValue } from "jotai";
import { currentWorkspaceAtom } from "@/lib/jotai/atoms/workspace";

function withWorkspace(Component: FC<unknown>) {
  return function WorkspaceRequiredComponent(props: any) {
    const workspace = useAtomValue(currentWorkspaceAtom);

    if (!workspace) {
      // This should not happen if the server guard is working properly
      // But it's a good fallback for client-side navigation
      throw new Error(
        "With Workspace can only be used in a Client Component that has access to workspace context"
      );
    }

    return <Component {...props} />;
  };
}

export default withWorkspace;

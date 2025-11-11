import { getServerWorkspaceId } from "./get-workspace-id";
import { WorkspaceApi } from "@/services/api/base/workspace";
import { WorkspaceProvider } from "../client/workspace-provider";
import { redirect } from "next/navigation";

function withServerWorkspace(Component: any) {
  return async function WorkspaceRequiredComponent(props: any) {
    const workspaceId = await getServerWorkspaceId();

    // If no workspace ID in cookie, redirect to workspace selection or home
    if (!workspaceId) {
      return <Component {...props} />;
    }

    try {
      // Fetch workspace details
      const response = await WorkspaceApi.show(workspaceId);
      const workspace = response.data;

      // Provide workspace context to the component
      return (
        <WorkspaceProvider workspaceId={workspaceId} workspace={workspace}>
          <Component {...props} />
        </WorkspaceProvider>
      );
    } catch (error) {
      return <Component {...props} />;
      console.error("Failed to fetch workspace:", error);
      // If workspace fetch fails (invalid ID, no access, etc.), redirect
      redirect("/workspaces");
    }
  };
}

export default withServerWorkspace;

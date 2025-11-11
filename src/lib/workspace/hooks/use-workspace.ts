import { useSetAtom, useAtom } from "jotai";
import { useRouter } from "@/routes/hooks";
import {
  currentWorkspaceAtom,
  workspaceIdAtom,
  clearWorkspaceAtom,
} from "@/lib/jotai/atoms/workspace";
import { WorkspaceApi } from "@/services/api/base/workspace";
import { setCookie, deleteCookie } from "cookies-next";
import { WORKSPACE_COOKIE_NAME } from "@/lib/workspace/constants/cookie-name";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { isAxiosError } from "axios";
import { BE_WorkspaceWithOwner } from "@/types/api/base/workspace";

export const useWorkspace = () => {
  const router = useRouter();
  const [currentWorkspace, setCurrentWorkspace] = useAtom(currentWorkspaceAtom);
  const setWorkspaceId = useSetAtom(workspaceIdAtom);
  const clearWorkspace = useSetAtom(clearWorkspaceAtom);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const switchWorkspace = async (workspaceId: string) => {
    setIsLoading(true);
    try {
      const response = await WorkspaceApi.show(workspaceId);
      const workspace: BE_WorkspaceWithOwner = response.data;

      // Update client state
      setCurrentWorkspace(workspace);
      setWorkspaceId(workspaceId);

      // Set HTTP-only cookie for SSR
      setCookie(WORKSPACE_COOKIE_NAME, workspaceId, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      enqueueSnackbar(`Switched to workspace: ${workspace.name}`, {
        variant: "success",
      });

      return { success: true, workspace };
    } catch (error) {
      console.error("Workspace switch failed:", error);

      let errorMessage = "Failed to switch workspace. Please try again.";

      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          errorMessage = "Workspace not found or you don't have access to it.";
        } else if (error.response?.status === 403) {
          errorMessage = "You don't have permission to access this workspace.";
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      enqueueSnackbar(errorMessage, { variant: "error" });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const leaveWorkspace = async (options?: {
    redirectTo?: string;
    showMessage?: boolean;
  }) => {
    const { redirectTo = "/", showMessage = true } = options || {};

    setIsLoading(true);
    try {
      // Clear client state
      clearWorkspace();

      // Clear cookie
      deleteCookie(WORKSPACE_COOKIE_NAME);

      if (showMessage) {
        enqueueSnackbar("Left workspace successfully", { variant: "info" });
      }

      // Redirect to specified location
      router.replace(redirectTo);

      return { success: true };
    } catch (error) {
      console.error("Leave workspace failed:", error);
      return { success: false, error: "Failed to leave workspace" };
    } finally {
      setIsLoading(false);
    }
  };

  const hasWorkspace = !!currentWorkspace;

  return {
    currentWorkspace,
    hasWorkspace,
    isLoading,
    switchWorkspace,
    leaveWorkspace,
  };
};

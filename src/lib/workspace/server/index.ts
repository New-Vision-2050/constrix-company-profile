// Server-side only exports - only for server components and server actions
export { serverLeaveWorkspace, leaveWorkspaceAction } from "./leave-workspace";
export { getServerWorkspaceId } from "./get-workspace-id";
export { default as withServerWorkspace } from "./with-workspace";

// Constants (safe for both client and server)
export { WORKSPACE_COOKIE_NAME } from "../constants/cookie-name";

// Jotai atoms (safe for both client and server)
export {
  currentWorkspaceAtom,
  workspaceIdAtom,
  clearWorkspaceAtom,
  hasWorkspaceAtom,
  useCurrentWorkspace,
} from "@/lib/jotai/atoms/workspace";

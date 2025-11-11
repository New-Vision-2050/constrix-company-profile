// Client-side only exports - safe to import in client components
export { useWorkspace } from "../hooks/use-workspace";
export { WorkspaceProvider } from "./workspace-provider";
export { default as withWorkspace } from "./with-workspace";

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

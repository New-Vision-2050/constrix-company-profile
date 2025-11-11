import { WORKSPACE_COOKIE_NAME } from "@/lib/workspace/constants/cookie-name";
import { addCookieToHeaders } from "../addCookieToHeader";

export const addWorkspaceHeader = addCookieToHeaders(
  WORKSPACE_COOKIE_NAME,
  "workspace-id",
  (v) => v as string, // Just pass the workspace ID as-is
  Boolean
);

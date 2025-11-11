import { cache } from "react";
import { cookies } from "next/headers";
import { WORKSPACE_COOKIE_NAME } from "../constants/cookie-name";

export const getServerWorkspaceId = cache(async (): Promise<string | null> => {
  try {
    const cookieStore = cookies();
    const workspaceId = (await cookieStore).get(WORKSPACE_COOKIE_NAME)?.value;

    return workspaceId || null;
  } catch (error) {
    console.error("Error getting workspace ID:", error);
    return null;
  }
});

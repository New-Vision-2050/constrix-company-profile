import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { WORKSPACE_COOKIE_NAME } from "@/lib/workspace/constants/cookie-name";

/**
 * Server-side workspace leave action
 * Can be used in server components or server actions
 */
export async function serverLeaveWorkspace(redirectTo: string = "/") {
  try {
    const cookieStore = cookies();

    // Delete the workspace cookie
    (await cookieStore).delete(WORKSPACE_COOKIE_NAME);

    // Redirect to specified location
    redirect(redirectTo);
  } catch (error) {
    console.error("Server leave workspace failed:", error);
    // Even if there's an error, redirect to home
    redirect(redirectTo);
  }
}

/**
 * Server action for leaving workspace that can be called from forms
 */
export async function leaveWorkspaceAction() {
  await serverLeaveWorkspace();
}

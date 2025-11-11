import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/lib/auth/constants/cookie-name";

/**
 * Server-side logout action
 * Can be used in server components or server actions
 */
export async function serverLogout(redirectTo: string = "/login") {
  try {
    const cookieStore = cookies();

    // Delete the auth cookie
    (await cookieStore).delete(AUTH_COOKIE_NAME);

    // Redirect to login page
    redirect(redirectTo);
  } catch (error) {
    console.error("Server logout failed:", error);
    // Even if there's an error, redirect to login
    redirect(redirectTo);
  }
}

/**
 * Server action for logout that can be called from forms
 */
export async function logoutAction() {
  await serverLogout();
}

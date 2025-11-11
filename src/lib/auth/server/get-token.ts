import { cache } from "react";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "../constants/cookie-name";

export const getServerAuthToken = cache(async (): Promise<string | null> => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get(AUTH_COOKIE_NAME)?.value;

    return token || null;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
});

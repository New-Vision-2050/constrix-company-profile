"use server";

import { cookies } from "next/headers";
import { THEME_COOKIE_NAME } from "../constants/cookie-name";
import type { ThemeMode } from "./get-theme-mode";

export async function setServerThemeMode(mode: ThemeMode): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(THEME_COOKIE_NAME, mode, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  } catch (error) {
    console.error("Error setting theme mode:", error);
  }
}


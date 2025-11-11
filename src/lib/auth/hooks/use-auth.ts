import { useSetAtom, useAtom } from "jotai";
import { useRouter } from "@/routes/hooks";
import { userAtom, tokenAtom } from "@/lib/jotai/atoms/auth";
import { AuthApi } from "@/services/api/base/auth";
import { setCookie, deleteCookie } from "cookies-next";
import { AUTH_COOKIE_NAME } from "@/lib/auth/constants/cookie-name";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { isAxiosError } from "axios";

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await AuthApi.login(credentials);
      const { user: userData, token } = response.data;

      // Update client state
      setUser(userData);
      setToken(token);

      // Set HTTP-only cookie for SSR
      setCookie(AUTH_COOKIE_NAME, token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      enqueueSnackbar(`Welcome back ${userData.firstName}!`, {
        variant: "success",
      });

      return { success: true, user: userData };
    } catch (error) {
      console.error("Login failed:", error);

      let errorMessage = "Login failed. Please try again.";

      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          errorMessage = "Invalid email or password.";
        } else if (error.response?.status === 422) {
          errorMessage = error.response.data?.message || "Invalid input.";
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

  const logout = async (options?: {
    redirectTo?: string;
    showMessage?: boolean;
  }) => {
    const { redirectTo = "/login", showMessage = true } = options || {};

    setIsLoading(true);
    try {
      // Clear client state
      setUser(null);
      setToken(null);

      // Clear cookie
      deleteCookie(AUTH_COOKIE_NAME);

      if (showMessage) {
        enqueueSnackbar("Logged out successfully", { variant: "info" });
      }

      // Redirect to login page
      router.replace(redirectTo);

      return { success: true };
    } catch (error) {
      console.error("Logout failed:", error);
      return { success: false, error: "Logout failed" };
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};

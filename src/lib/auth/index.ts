// Client-side hooks and components
export { useAuth } from "./hooks/use-auth";
export { LogoutButton } from "./components/logout-button";

// Server-side utilities
export { serverLogout, logoutAction } from "./server/logout";
export { getServerAuthToken } from "./server/get-token";

// Constants
export { AUTH_COOKIE_NAME } from "./constants/cookie-name";

// Jotai atoms
export {
  userAtom,
  tokenAtom,
  logoutAtom,
  isAuthenticatedAtom,
  useUser,
} from "@/lib/jotai/atoms/auth";

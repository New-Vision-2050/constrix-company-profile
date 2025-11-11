import { AUTH_COOKIE_NAME } from "@/lib/auth/constants/cookie-name";
import { addCookieToHeaders } from "../addCookieToHeader";

export const addAuthorizationHeader = addCookieToHeaders(
  AUTH_COOKIE_NAME,
  "Authorization",
  (v) => `Bearer ${v}`,
  Boolean
);

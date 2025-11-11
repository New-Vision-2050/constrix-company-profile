"use client";

import { FC } from "react";

function withNoAuth(Component: FC<unknown>) {
  return function UnauthenticatedComponent(props: any) {
    // Authentication logic here (e.g., check cookies, tokens, etc.)
    const isAuthenticated = false; // Replace with real auth check

    if (isAuthenticated) {
      // Redirect authenticated users away from auth pages
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard"; // or wherever you want to redirect
      }
      return null;
    }

    return <Component {...props} />;
  };
}

export default withNoAuth;

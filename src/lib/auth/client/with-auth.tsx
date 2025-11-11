"use client";

import { FC } from "react";

function withAuth(Component: FC<unknown>) {
  return function AuthenticatedComponent(props: any) {
    // Authentication logic here (e.g., check cookies, tokens, etc.)
    const isAuthenticated = true; // Replace with real auth check

    if (!isAuthenticated) {
      // Redirect to login or show an error
      if (typeof window !== "undefined") {
        throw new Error(
          "With Auth can only be used in a Client Component, use withServerAuth for Server Components"
        );
      }
      return null;
    }

    return <Component {...props} />;
  };
}

export default withAuth;

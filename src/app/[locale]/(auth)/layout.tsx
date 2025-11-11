import { AuthLayout } from "@/layouts/auth";
import withServerNoAuth from "@/lib/auth/server/with-no-auth";
import { PropsWithChildren } from "react";

function AuthRootLayout({ children }: PropsWithChildren) {
  return <AuthLayout>{children}</AuthLayout>;
}

export default withServerNoAuth(AuthRootLayout);

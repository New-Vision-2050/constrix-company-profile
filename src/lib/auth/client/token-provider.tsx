// providers/AuthProvider.tsx
"use client";
import { tokenAtom, userAtom } from "@/lib/jotai/atoms/auth";
import { UserApi } from "@/services/api/base/user";
import { BE_User } from "@/types/api/base/user";
import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

export default function AuthHydrator({
  token,
  user,
  children,
}: {
  token: string | null;
  children: React.ReactNode;
  user: BE_User;
}) {
  useHydrateAtoms([
    [tokenAtom, token],
    [userAtom, user],
  ]);
  return children;
}

export function AuthProvider({
  token,
  children,
  user,
}: {
  token: string | null;
  children: React.ReactNode;
  user: BE_User;
}) {
  return (
    <Provider>
      <AuthHydrator token={token} user={user}>
        {children}
      </AuthHydrator>
    </Provider>
  );
}

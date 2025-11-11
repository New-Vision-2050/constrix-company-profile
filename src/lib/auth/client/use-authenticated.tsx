"use client";
import { tokenAtom } from "@/lib/jotai/atoms/auth";
import { useAtomValue } from "jotai";
import { isAuthenticated } from "../is-authenticated";
import { useMemo } from "react";

export const useAuthenticated = () => {
  const token = useAtomValue(tokenAtom);
  const authenticated: boolean = useMemo(() => isAuthenticated(token), [token]);

  return { authenticated, token };
};

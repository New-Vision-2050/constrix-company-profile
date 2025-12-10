"use client";

import { createContext, PropsWithChildren, useContext } from "react";
import { ThemeResponse } from "@/services/api/theme/response";

export const BE_ThemeContext = createContext<{
  data: ThemeResponse["payload"];
} | null>(null);

export const useBE_Theme = () => {
  const context = useContext(BE_ThemeContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }
  return context;
};

function BE_ThemeProvider({
  children,
  data,
}: PropsWithChildren<{
  data: ThemeResponse["payload"];
}>) {
  return (
    <BE_ThemeContext.Provider
      value={{
        data,
      }}
    >
      {children}
    </BE_ThemeContext.Provider>
  );
}

export default BE_ThemeProvider;

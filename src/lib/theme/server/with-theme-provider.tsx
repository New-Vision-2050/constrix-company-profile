import React from "react";
import { getTheme } from "./get-theme";
import BE_ThemeProvider from "../client/theme-provider";
import { ThemeResponse } from "@/services/api/theme/response";

function withBE_ThemeProvider<P extends object>(
  WrappedComponent: React.ComponentType<P & { theme: ThemeResponse["payload"] }>
) {
  return async function DataProviderHOC(props: P) {
    // Use cached permissions function
    const { payload: theme } = await getTheme();

    return (
      <BE_ThemeProvider data={theme}>
        <WrappedComponent {...props} theme={theme} />
      </BE_ThemeProvider>
    );
  };
}

export default withBE_ThemeProvider;

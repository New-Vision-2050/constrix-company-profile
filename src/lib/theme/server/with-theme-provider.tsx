import React from "react";
import { getTheme } from "./get-theme";
import BE_ThemeProvider from "../client/theme-provider";

function withBE_ThemeProvider<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return async function DataProviderHOC(props: P) {
    // Use cached permissions function
    const { payload: theme } = await getTheme();

    return (
      <BE_ThemeProvider data={theme}>
        <WrappedComponent {...props} />
      </BE_ThemeProvider>
    );
  };
}

export default withBE_ThemeProvider;

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

function ReactQueryClientProvider({ children }: PropsWithChildren) {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryClientProvider;

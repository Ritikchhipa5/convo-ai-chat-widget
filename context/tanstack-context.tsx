"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { createContext } from "react";

const TanstackContext = createContext({});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Optional: Set global defaults for all queries
      staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
      // refetchOnWindowFocus: true, // Refetch when window is focused
      retry: 2, // Retry failed queries 3 times
    },
    // Optional: Configure mutations globally
    mutations: {
      // mutation defaults here
    },
  },
});

function TanstackProvider({ children }: { children: React.ReactNode }) {
  return (
    <TanstackContext.Provider value={{}}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TanstackContext.Provider>
  );
}

export default TanstackProvider;

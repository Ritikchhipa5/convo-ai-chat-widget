"use client";

import { useProfile } from "@/hooks/settings/use-settings";
import { createContext, useContext, useMemo } from "react";

type AuthContextType = {
  user: any;
  isLoading: boolean;
};

const AppAuthContext = createContext<AuthContextType | null>(null);

export function AppAuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useProfile();
  const value = useMemo(
    () => ({
      user: data ?? null,
      isLoading,
    }),
    [data, isLoading]
  );

  console.log(value);
  return (
    <AppAuthContext.Provider value={value}>{children}</AppAuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AppAuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { hydrate, refetch, isAuthenticated, accessToken } = useAuth();

  useEffect(() => {
    hydrate();
    if (accessToken && !isAuthenticated) {
      refetch();
    }
  }, [hydrate, refetch, isAuthenticated, accessToken]);

  return <>{children}</>;
}

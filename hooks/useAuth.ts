"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

interface User {
  id: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  name: string;
}

export function useAuth() {
  const { user, accessToken, isAuthenticated, login, logout, hydrate } =
    useAuthStore();

  const queryClient = useQueryClient();

  const {
    data: me,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async (): Promise<User> => {
      const res = await api.get<User>("/auth/me");
      return res;
    },
    enabled: !!accessToken && !user,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await api.post<{ user: User; accessToken: string }>(
        "/auth/login",
        credentials,
      );
      return res;
    },
    onSuccess: (data) => {
      login(data.user, data.accessToken);
      queryClient.setQueryData(["auth", "me"], data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      name: string;
      role: "TENANT" | "LANDLORD";
    }) => {
      const res = await api.post<{ user: User; accessToken: string }>(
        "/auth/register",
        data,
      );
      return res;
    },
    onSuccess: (data) => {
      login(data.user, data.accessToken);
      queryClient.setQueryData(["auth", "me"], data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout", {});
    },
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
  });

  const refreshMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post<{ accessToken: string }>("/auth/refresh", {});
      return res;
    },
    onSuccess: (data) => {
      useAuthStore.getState().setTokens(data.accessToken);
    },
  });

  return {
    user: user ?? me ?? null,
    isLoading: isLoading || useAuthStore.getState().isLoading,
    isAuthenticated: isAuthenticated || !!user || !!me,
    error,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    refresh: refreshMutation.mutateAsync,
    refetch,
    hydrate,
    accessToken: useAuthStore.getState().accessToken,
  };
}

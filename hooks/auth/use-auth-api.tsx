import { fetcher } from "@/lib/api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSignIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      fetcher({
        url: "/auth/login",
        method: "POST",
        data: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: (data: {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
    }) =>
      fetcher({
        url: "/auth/create-account",
        method: "POST",
        data: data,
      }),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetcher({
        url: "/auth/logout",
        method: "POST",
      }),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useGoogle() {
  return useMutation({
    mutationFn: () =>
      fetcher({
        url: "/auth/google",
        method: "GET",
      }),
  });
}

"use client";

import { fetcher } from "@/lib/api/fetcher";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      fetcher({
        url: "/users/profile",
        method: "GET",
      }),

    retry: false,
  });
}

import { fetcher } from "@/lib/api/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAddDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { domain: string; description: string }) =>
      fetcher({
        url: "/domains",
        method: "POST",
        data: data,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["domains"],
      });
    },
  });
}

export function useGetDomains() {
  return useQuery<
    {
      id: string;
      name: string;
      icon: string;
      description: string;
      userId: string;
    }[]
  >({
    queryKey: ["domains"],
    queryFn: () =>
      fetcher({
        url: "/domains",
        method: "GET",
      }),
  });
}

export function useDeleteDomain(domainId: string) {
  return useMutation({
    mutationFn: () =>
      fetcher({
        url: `/domains/${domainId}`,
        method: "DELETE",
      }),
  });
}

export function useUpdateDomain(domainId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      domain,
      description,
    }: {
      domain: string;
      description: string;
    }) =>
      fetcher({
        url: `/domains/${domainId}`,
        method: "PATCH",
        data: {
          domain,
          description,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["domains"],
      });
    },
  });
}

export function useUpdateDomainChatbot(domainId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ welcomeMessage }: { welcomeMessage: string }) =>
      fetcher({
        url: `/domains/${domainId}/chatbot`,
        method: "PATCH",
        data: {
          welcomeMessage,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["domains"],
      });
    },
  });
}

export function useSpecificDomain(domainId: string) {
  return useQuery<{
    id: string;
    name: string;
    icon: string;
    description: string;
    userId: string;
    chatBot: {
      id: string;
      welcomeMessage: string;
      domainId: string;
      icon: string | null;
      background: string | null;
      helpdesk: boolean;
      textColor: string | null;
    };
  }>({
    queryKey: ["domains", domainId],
    queryFn: () =>
      fetcher({
        url: `/domains/${domainId}`,
        method: "GET",
      }),
  });
}

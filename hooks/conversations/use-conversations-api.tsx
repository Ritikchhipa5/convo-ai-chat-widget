import { fetcher } from "@/lib/api/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetConversations() {
  return useQuery<
    {
      id: string;
      status: string;
      chatBot: {
        id: string;
      };
      customer: {
        id: string;
        name: string;
      };
      messages: {
        id: string;
        createdAt: string;
        role: string;
        seen: boolean;
        message: string;
      }[];
    }[]
  >({
    queryKey: ["conversations"],
    queryFn: () =>
      fetcher({
        url: "/conversations",
        method: "GET",
      }),
  });
}

export function useGetSpecificConversation(converastionId: string) {
  return useQuery<{
    id: string;
    chatBot: { id: string };
    messages: {
      senderType: string;
      seen: boolean;
      message: string;
      createdAt: string;
      id: string;
    }[];
  }>({
    queryKey: ["conversations", converastionId],
    enabled: !!converastionId,
    queryFn: () =>
      fetcher({
        url: `/conversations/${converastionId}`,
        method: "GET",
      }),
  });
}

export function useSendMessageConversation() {
  return useMutation({
    mutationFn: (data: {
      conversationId: string;
      message: string;
      role: string;
    }) =>
      fetcher({
        url: `/conversations/send-message`,
        method: "POST",
        data,
      }),
  });
}

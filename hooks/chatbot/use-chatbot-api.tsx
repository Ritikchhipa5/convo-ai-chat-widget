import { fetcher } from "@/lib/api/fetcher";
import { useMutation } from "@tanstack/react-query";

export const useStartConversation = () => {
  return useMutation({
    mutationFn: ({ chatbotId }: { chatbotId: string }) =>
      fetcher<{ converstaionId: string }>({
        url: "/chatbot/init-conversation",
        method: "POST",
        data: {
          chatbotId,
        },
      }),
  });
};

export const useGetAllMessages = () => {
  return useMutation({
    mutationFn: () =>
      fetcher<{ messages: []; conversationId: string }>({
        url: `/chatbot/messages`,
        method: "GET",
      }),
  });
};

export const useSendMessages = () => {
  return useMutation({
    mutationFn: (data: {
      conversationId: string;
      message: string;
      tempMessageId: string;
    }) =>
      fetcher({
        url: `/messages/send`,
        method: "POST",
        data,
      }),
  });
};

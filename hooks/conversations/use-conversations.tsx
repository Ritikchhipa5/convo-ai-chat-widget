"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChatBotMessageProps,
  ChatBotMessageSchema,
  ConversationSearchProps,
  ConversationSearchSchema,
} from "@/schemas/conversation.schema";
import { useChatContext } from "@/context/use-chat-context";
import moment from "moment";
import {
  useGetConversations,
  useGetSpecificConversation,
  useSendMessageConversation,
} from "@/hooks/conversations/use-conversations-api";
import { getConversationKey, universalTimeInString } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { ROLE } from "@/constants/roles";
import { useSendMessages } from "@/hooks/chatbot/use-chatbot-api";

export const useConversations = () => {
  const { data: converstions, isPending: converstionsLoading } =
    useGetConversations();

  const { setChats, setCurrentConversation, currentConversation } =
    useChatContext();

  const { register, watch, control, setValue } =
    useForm<ConversationSearchProps>({
      resolver: zodResolver(ConversationSearchSchema as any),
      mode: "onChange",
    });

  const onGetActiveChatMessage = async (id: string) => {
    try {
      setCurrentConversation(id);
      setChats([]);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    converstions,
    converstionsLoading,
    control,
    register,
    onGetActiveChatMessage,
    currentConversation,
  };
};

export const useChatTime = (createdAt: Date, roomId: string) => {
  const { currentConversation } = useChatContext();
  const [messageSentAt, setMessageSentAt] = useState<string>();
  const [urgent, setUrgent] = useState<boolean>(false);

  const onSetMessageReceivedDate = async () => {
    const dt = new Date(createdAt);
    const current = new Date();
    const currentDate = current.getDate();
    const hr = dt.getHours();
    const min = dt.getMinutes();
    const date = dt.getDate();
    const month = dt.getMonth();
    const difference = currentDate - date;
    if (difference <= 0) {
      setMessageSentAt(`${hr}:${min}${hr > 12 ? "PM" : "AM"}`);

      if (current.getHours() - dt.getHours() < 2) {
        setUrgent(true);
      } else {
        setMessageSentAt(`$(date) ${moment(month).month()}`);
      }
    }
  };

  const onSeenChat = async () => {};

  useEffect(() => {
    onSeenChat();
  }, [currentConversation]);

  useEffect(() => {
    onSetMessageReceivedDate();
  }, []);

  return { urgent, messageSentAt };
};

export const useConversationChat = (id: string) => {
  const messageWindowRef = useRef<HTMLDivElement | null>(null);
  const { chats, setChats, currentConversation } = useChatContext();
  const { mutateAsync: sendMessage } = useSendMessages();
  const { data: conversation, isLoading } = useGetSpecificConversation(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatBotMessageProps>({
    resolver: zodResolver(ChatBotMessageSchema),
  });

  console.log(chats);
  // 🔽 Scroll to bottom on new messages
  useEffect(() => {
    if (!messageWindowRef.current) return;

    messageWindowRef.current.scrollTo({
      top: messageWindowRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chats]);

  console.log(id, "id");
  // 🔽 Subscribe to realtime messages
  useEffect(() => {
    if (!id) return;

    const channelName = getConversationKey(id);
    const channel = pusherClient?.subscribe(channelName);

    channel?.bind("message:new", (data: any) => {
      console.log(data, "datadata");
      // setChats((prev) => {
      //   if (prev.some((c) => c.id === data.id)) return prev;

      //   return [
      //     ...prev,
      //     {
      //       id: data.id,
      //       message: data.message,
      //       role: data.role,
      //       createdAt: data.createdAt,
      //       seen: data.seen ?? false,
      //     },
      //   ];
      // });
    });

    return () => {
      channel?.unbind_all();
      pusherClient?.unsubscribe(channelName);
    };
  }, [id]);

  useEffect(() => {
    if (!conversation?.id) return;

    const loadedChats = conversation.messages.map((chat) => ({
      id: chat.id,
      message: chat.message,
      senderType: chat.senderType,
      createdAt: chat.createdAt,
      seen: chat.seen,
    }));

    setChats(loadedChats); // 🔥 REPLACE
  }, [conversation?.id, setChats]);

  // 🔽 Submit message
  const onHandelMessage = handleSubmit(async (values) => {
    if (!values.content?.trim()) return;

    const optimisticMessage = {
      id: crypto.randomUUID(), // temp id
      message: values.content.trim(),
      senderType: ROLE.OWNER,
      createdAt: universalTimeInString(),
      seen: false,
      optimistic: true, // optional flag
    };

    reset();

    try {
      // 🔥 Optimistic UI update
      setChats((prev) => [...prev, optimisticMessage]);
      console.log(values);

      await sendMessage({
        conversationId: id,
        tempMessageId: optimisticMessage.id,
        message: values.content,
      });
    } catch (error) {
      // ❌ Rollback optimistic message on failure
      setChats((prev) => prev.filter((msg) => msg.id !== optimisticMessage.id));

      toast("Something went wrong");
    }
  });

  return {
    messageWindowRef,
    chats,
    register,
    onHandelMessage,
    loading: isLoading,
    currentConversation,
    errors,
  };
};

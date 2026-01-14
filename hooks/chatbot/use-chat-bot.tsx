import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { pusherClient } from "@/lib/pusher";
import { getConversationKey, universalTimeInString } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { ChatBotMessageProps } from "@/schemas/conversation.schema";
import {
  useGetAllMessages,
  useSendMessages,
  useStartConversation,
} from "@/hooks/chatbot/use-chatbot-api";
import { ROLE } from "@/constants/roles";

type BotScreen = "welcome-screen" | "chat-screen";

export const useChatBot = () => {
  // REFERENCES
  const messageWindowRef = useRef<HTMLDivElement | null>(null);

  // STATES
  const [currentBotId, setCurrentBotId] = useState<string>(
    "b450480c-50da-46a2-b041-87c99525e36b"
  );
  const [botScreen, setBotScreen] = useState<BotScreen>("chat-screen");
  const [onAiTyping, setOnAiTyping] = useState<boolean>(false);
  const [haveChatConverstion, setHaveChatConverstion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [botOpened, setBotOpened] = useState<boolean>(false);
  const [onChats, setOnChats] = useState<
    {
      id: string;
      senderType: string;
      message: string;
      createdAt?: string;
    }[]
  >([]);

  const { register, handleSubmit, reset } = useForm<ChatBotMessageProps>({
    // resolver: zodResolver(ChatBotMessageSchema),
  });

  //API CALLS
  const {
    mutateAsync: startConverastion,
    isPending: startConverastionPending,
  } = useStartConversation();
  const { mutateAsync: getAllMessages, isPending: getAllMessagesPending } =
    useGetAllMessages();
  const { mutateAsync: sendMessage, isPending } = useSendMessages();

  //INITIAL LOAD
  useEffect(() => {
    const existingSession = Cookies.get("cb_conversation");
    if (existingSession) {
      setHaveChatConverstion(existingSession);
      setBotScreen("chat-screen");
    }
  }, []);

  //AUTO SCROLL WHEN MESSAGE

  const onScrollBottom = () => {
    messageWindowRef.current?.scroll({
      top: messageWindowRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    onScrollBottom();
  }, [messageWindowRef, onChats]);

  // GET BOT ID FORM HTML
  // useEffect(() => {
  //   window.addEventListener("message", (e) => {
  //     const botid = e.data;
  //   });
  // }, []);

  //PUSHER
  useEffect(() => {
    if (haveChatConverstion) {
      const key = getConversationKey(haveChatConverstion);
      const channel = pusherClient?.subscribe(key);

      channel?.bind("message:typing", (data: any) => {
        setOnAiTyping(data?.loading);
      });

      channel?.bind("message:new", (data: any) => {
        setOnAiTyping(false);

        setOnChats((prev) => {
          const index = prev.findIndex(
            (chat) => chat.id === data?.tempMessageId
          );

          // 🔁 Update optimistic message ONLY
          if (index === -1) {
            // 🧠 Safety: ignore unexpected socket events
            console.warn("[message:new] Optimistic message not found", data);
            return prev;
          }

          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            id: data.id, // replace temp id
            senderType: data.senderType,
            message: data.message,
            createdAt: data.createdAt,
          };

          return updated;
        });
      });
    }
  }, [haveChatConverstion]);

  // RETRIVE ALL ACTIVE SESSION MESSAGES
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const { messages, conversationId } = await getAllMessages();
      setHaveChatConverstion(conversationId);
      setOnChats(messages || []);
      setLoading(false);
    };

    fetchMessages();
  }, [currentBotId]);

  // FUNCTIONS
  const onToogleChatBot = () => {
    setBotOpened((open) => !open);
  };

  const onBackWelcomeScreen = () => setBotScreen("welcome-screen");

  const onStartConveration = async () => {
    try {
      if (haveChatConverstion) {
        setBotScreen("chat-screen");
        return;
      } else {
        const { converstaionId } = await startConverastion({
          chatbotId: currentBotId,
        });
        setHaveChatConverstion(converstaionId);
        setBotScreen("chat-screen");
      }
    } catch (error) {
      setBotScreen("welcome-screen");
    }
  };

  const onSendMessage = handleSubmit(async (values) => {
    reset();

    const chat = {
      id: crypto.randomUUID(),
      senderType: ROLE["USER"],
      message: values.content,
      createdAt: universalTimeInString(),
    };

    if (values.content) {
      setOnChats((prev: any) => [...prev, chat]);

      await sendMessage({
        conversationId: haveChatConverstion,
        tempMessageId: chat.id,
        message: values.content,
      });
    }
  });

  return {
    botOpened,
    messageWindowRef,
    loading,
    botScreen,
    haveChatConverstion,
    startConverastionPending,
    onChats,
    onAiTyping,
    register,
    onToogleChatBot,
    onBackWelcomeScreen,
    onStartConveration,
    setOnChats,
    onSendMessage,
  };
};

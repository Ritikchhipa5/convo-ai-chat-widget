"use client";

import ChatCard from "@/components/conversation/chat-card";
import Loader from "@/components/loader";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConversations } from "@/hooks/conversations/use-conversations";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

function ConversationMenu() {
  const router = useRouter();
  const { id: routeId } = useParams<{ id: string }>();

  const {
    converstions,
    converstionsLoading,
    onGetActiveChatMessage,
    currentConversation,
  } = useConversations();

  useEffect(() => {
    if (!routeId || converstionsLoading || !converstions?.length) {
      return;
    }

    const exists = converstions.some((c) => c.id === routeId);

    if (exists && currentConversation !== routeId) {
      onGetActiveChatMessage(routeId);
    }
  }, [routeId, converstionsLoading, converstions]);

  return (
    <div className=" space-y-4">
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">
            <Mail />
            Unread
          </TabsTrigger>
          <TabsTrigger value="all">
            <Mail /> All
          </TabsTrigger>
          <TabsTrigger value="expired">
            <Mail /> Expired
          </TabsTrigger>
          <TabsTrigger value="starred">
            <Mail /> Starred
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div
        className={cn(
          "flex flex-col",
          !converstions?.length && "h-full justify-center"
        )}
      >
        <Loader loading={converstionsLoading}>
          {converstions?.length ? (
            converstions?.map((room) => (
              <ChatCard
                key={room.id}
                seen={room.messages?.[0]?.seen}
                id={room.id}
                onChat={() => {
                  onGetActiveChatMessage(room.id);
                  router.push(`/conversations/${room.id}`);
                }}
                createdAt={room.messages?.[0]?.createdAt}
                title={room.customer.name}
                description={room.messages?.[0]?.message}
                active={room.id === currentConversation}
              />
            ))
          ) : (
            <p className="text-xs text-center text-muted-foreground">
              No chats of you domain
            </p>
          )}
        </Loader>
      </div>
    </div>
  );
}

export default ConversationMenu;

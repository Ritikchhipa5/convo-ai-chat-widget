"use client";

import ConversationNotFound from "@/components/conversation/conversation-not-found";
import Messenger from "@/components/conversation/messanger";
import InfoBar from "@/components/infobar";
import Loader from "@/components/loader";
import { useConversationChat } from "@/hooks/conversations/use-conversations";
import { useGetSpecificConversation } from "@/hooks/conversations/use-conversations-api";
import { useParams } from "next/navigation";

type Params = {
  id: string;
};
function ConversationByIdPage() {
  const { id } = useParams<Params>();
  const { messageWindowRef, register, onHandelMessage, chats, loading } =
    useConversationChat(id);

  return (
    <>
      <InfoBar />
      <Loader loading={loading}>
        {chats ? (
          <Messenger
            chats={chats}
            ref={messageWindowRef}
            register={register}
            onHandelMessage={onHandelMessage}
          />
        ) : (
          <ConversationNotFound />
        )}
      </Loader>
    </>
  );
}

export default ConversationByIdPage;

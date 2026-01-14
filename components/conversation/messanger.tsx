"use client";

import { Bubble } from "@/components/chatbot/window/bubble";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ROLE } from "@/constants/roles";
import { Send } from "lucide-react";
import { forwardRef, memo } from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  onHandelMessage: React.FormEventHandler<HTMLFormElement>;
  chats: {
    message: string;
    id: string;
    senderType: string;
    createdAt: string;
    seen: boolean;
  }[];
  register: UseFormRegister<any>;
};

const Messenger = forwardRef<HTMLDivElement, Props>(
  ({ register, onHandelMessage, chats }, ref) => {
    return (
      <div className="flex h-full flex-col overflow-hidden">
        {/* Messages */}
        <div ref={ref} className="flex-1 overflow-y-auto h-full p-4 space-y-4">
          {chats?.length ? (
            chats?.map((chat) => (
              <Bubble
                activeUser={[ROLE["OWNER"], ROLE["AGENT"]].includes(
                  chat.senderType
                )}
                message={chat.message}
                createdAt={chat.createdAt}
                key={chat.id}
              />
            ))
          ) : (
            <p className="text-xs text-muted-foreground text-center">
              No chat is selected
            </p>
          )}
        </div>

        <form onSubmit={onHandelMessage} className="shrink-0 p-4 pb-1 ">
          <div className="flex items-end gap-x-2">
            <Textarea
              {...register("content")}
              rows={1}
              placeholder="Type a message..."
              className="resize-none rounded-2xl border-amber-200 min-h-10 max-h-20 overflow-y-auto focus-visible:ring-amber-400 bg-muted border-none"
            />

            <Button
              type="submit"
              size="icon"
              className="rounded-full bg-amber-500 hover:bg-amber-600 shrink-0"
            >
              <Send fill="white" className="h-4 w-4 -ml-0.5  text-white" />
            </Button>
          </div>
        </form>
      </div>
    );
  }
);

export default Messenger;

Messenger.displayName = "Messenger";

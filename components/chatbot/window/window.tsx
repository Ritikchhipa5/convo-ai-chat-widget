import BotPoweredBy from "@/components/chatbot/window/bot-powerdby";
import { Bubble } from "@/components/chatbot/window/bubble";
import ChatHeader from "@/components/chatbot/window/chat-header";
import RealTimeMode from "@/components/chatbot/window/real-time";
import Responding from "@/components/chatbot/window/responding";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ROLE } from "@/constants/roles";
import { Role } from "@/lib/generated/prisma/enums";
import { HelpCircle, MessageCircle, Paperclip, Send } from "lucide-react";
import React, { forwardRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  onMinimizeChatBot: VoidFunction;
  onBackScreen: VoidFunction;
  register: UseFormRegister<any>;
  chats: { senderType: string; message: string; createdAt?: string }[];
  onChat: VoidFunction;
  onResponding: boolean;
  // domainName: string | undefined;
  // theme?: string | null;
  // textColor?: string | null;
  // help?: boolean;
  // realtimeMode: { chatroom: string; mode: boolean } | undefined;
  // helpdesk:
  //   | {
  //       id: string;
  //       question: string;
  //       answer: string;
  //       domainId: string | null;
  //     }[]
  //   | undefined;
  // setChat: React.Dispatch<
  //   React.SetStateAction<
  //     {
  //       role: Role;
  //       link?: string;
  //       content: string;
  //     }[]
  //   >
  // >;
};

const BotWindow = forwardRef<HTMLDivElement, Props>(
  (
    {
      chats,
      onResponding,
      onMinimizeChatBot,
      onBackScreen,
      register,
      onChat,
      // domainName,
      // helpdesk,
      // realtimeMode,
      // setChat,
      // textColor,
      // theme,
      // help,
    },
    ref
  ) => {
    return (
      <>
        {/* Header */}
        <div className="shrink-0 bg-white/80 backdrop-blur">
          <ChatHeader
            onMinimize={onMinimizeChatBot}
            onBackScreen={onBackScreen}
          />
        </div>
        {/* {realtimeMode?.mode && (
          <RealTimeMode setChats={setChat} chatRoomId={realtimeMode.chatroom} />
        )} */}
        <Tabs
          defaultValue="chat"
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="mx-4 my-2 shrink-0">
            <TabsTrigger value="chat">
              <MessageCircle size={16} />
              Chat
            </TabsTrigger>
            <TabsTrigger value="helpdesk">
              <HelpCircle size={16} />
              Help Desk
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="chat"
            className="flex-1 flex flex-col overflow-hidden"
          >
            <Separator />

            {/* ✅ ONLY THIS SCROLLS */}
            <div
              ref={ref}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-linear-to-b from-white to-amber-50"
            >
              {chats?.map((chat, key) => (
                <Bubble
                  activeUser={chat.senderType === ROLE.USER}
                  message={chat.message}
                  createdAt={chat.createdAt}
                  key={key}
                />
              ))}
              {onResponding && <Responding />}
            </div>

            {/* Input always visible */}
            <form
              // onSubmit={onChat}
              className="shrink-0 border-t bg-white px-4  py-4"
            >
              <div className="flex items-end gap-x-2">
                <Label
                  htmlFor="bot-image"
                  className="cursor-pointer rounded-full p-2 hover:bg-amber-100"
                >
                  <Paperclip size={18} />
                  <Input
                    id="bot-image"
                    // {...register("image")}
                    type="file"
                    className="hidden"
                  />
                </Label>

                <Textarea
                  {...register("content")}
                  rows={1}
                  placeholder="Type a message..."
                  className="resize-none text-sm rounded-2xl border-amber-200 min-h-10 max-h-20 overflow-y-auto focus-visible:ring-amber-400 bg-muted border-none"
                />

                <Button
                  onClick={onChat}
                  type="submit"
                  size="icon"
                  className="rounded-full bg-amber-500 hover:bg-amber-600 shrink-0"
                >
                  <Send fill="white" className="h-4 w-4 -ml-0.5  text-white" />
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Helpdesk scrolls independently */}
          {/* <TabsContent value="helpdesk" className="flex-1 overflow-y-auto px-4">
            <Accordion type="single" collapsible>
              {helpdesk?.map((desk) => (
                <AccordionItem key={desk.id} value={desk.id}>
                  <AccordionTrigger>{desk.question}?</AccordionTrigger>
                  <AccordionContent>{desk.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent> */}
        </Tabs>
        <BotPoweredBy className=" bg-white pb-4" />
      </>
    );
  }
);

export default BotWindow;

BotWindow.displayName = "BotWindow";

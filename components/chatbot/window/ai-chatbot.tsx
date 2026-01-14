"use client";

import BotWindow from "@/components/chatbot/window/window";
import { useChatBot } from "@/hooks/chatbot/use-chat-bot";
import { cn } from "@/lib/utils";
import { BotIcon } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import WelcomeScreen from "@/components/chatbot/welcome/welcome-screen";
import { Card } from "@/components/ui/card";

type Props = {};

function AiChatbot({}: Props) {
  const {
    botOpened,
    botScreen,
    loading,
    haveChatConverstion,
    startConverastionPending,
    onChats,
    onAiTyping,
    messageWindowRef,
    register,
    onSendMessage,
    onToogleChatBot,
    onStartConveration,
    onBackWelcomeScreen,
  } = useChatBot();

  return (
    <div className=" h-screen flex flex-col justify-end items-end gap-4">
      <AnimatePresence>
        {botOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto fixed z-40"
          >
            <Card className="fixed bottom-6 py-0 gap-0 right-6 w-95 h-150 mr-10 rounded-3xl shadow-none overflow-hidden border bg-linear-to-b from-white to-amber-50 flex flex-col ">
              {botScreen === "welcome-screen" && (
                <WelcomeScreen
                  haveChatConverstion={haveChatConverstion}
                  onStart={onStartConveration}
                  loading={startConverastionPending}
                />
              )}
              {botScreen === "chat-screen" && (
                <BotWindow
                  onMinimizeChatBot={onToogleChatBot}
                  onBackScreen={onBackWelcomeScreen}
                  chats={onChats}
                  // setChat={setOnChats}
                  // realtimeMode={onRealTime}
                  // helpdesk={currentBot?.helpDesk}
                  // domainName={currentBot?.name}
                  ref={messageWindowRef}
                  // help={currentBot?.chatBot?.helpdesk}
                  // theme={currentBot?.chatBot?.background}
                  // textColor={currentBot?.chatBot?.textColor}
                  register={register}
                  onChat={onSendMessage}
                  onResponding={onAiTyping}
                />
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onClick={onToogleChatBot}
        className={cn(
          "pointer-events-auto z-50 rounded-full cursor-pointer w-14 h-14 flex items-center justify-center bg-amber-400 ",
          loading ? "invisible" : "visible"
        )}
      >
        <BotIcon />
      </div>
    </div>
  );
}

export default AiChatbot;

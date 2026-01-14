"use client";

import BotSetting from "@/components/forms/settings/bot-setting";
import ChatbotSetting from "@/components/forms/settings/chatbot-setting";
import DomainSetting from "@/components/forms/settings/domain-setting";
import HelpDesk from "@/components/forms/settings/help-desk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  id: string;
  name: string;
  description: string;
  plan?: "STANDARD" | "PRO" | "ULTIMATE" | undefined;
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  };
};

function DomainSettingsForm({
  plan = "STANDARD",
  chatBot,
  id,
  name,
  description,
}: Props) {
  return (
    <Tabs defaultValue="details" className=" ">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
        <TabsTrigger value="help_desk">Help Desk</TabsTrigger>
        <TabsTrigger value="bot_training">Training</TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="details">
          <DomainSetting
            id={id}
            chatBotId={chatBot.id}
            name={name}
            description={description}
          />
        </TabsContent>
        <TabsContent value="chatbot">
          <ChatbotSetting id={id} chatBot={chatBot} />
        </TabsContent>

        <TabsContent value="help_desk">
          <HelpDesk id={id} />
        </TabsContent>
        <TabsContent value="bot_training">
          <BotSetting id={id} />
        </TabsContent>
      </div>
    </Tabs>
  );
}

export default DomainSettingsForm;

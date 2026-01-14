import ChatbotGreetingMessageUpdate from "@/components/forms/settings/chatbot-greeting-message-update";
import ChatbotIconUpdate from "@/components/forms/settings/chatbot-icon-update";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDomain } from "@/hooks/domain/use-domain";

type Props = {
  id: string;
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
};
function ChatbotSetting({ chatBot, id }: Props) {
  const {
    onUpdateChatbotSetting,
    domainChatbotErrors,
    domainChatbotRegister,
    updateDomainChatbotPending,
  } = useDomain(id);
  return (
    <form className="space-y-10" onSubmit={onUpdateChatbotSetting}>
      <ChatbotIconUpdate
        chatBot={chatBot}
        register={domainChatbotRegister}
        errors={domainChatbotErrors}
      />
      <Separator />
      <ChatbotGreetingMessageUpdate
        message={chatBot?.welcomeMessage as string}
        register={domainChatbotRegister}
        errors={domainChatbotErrors}
      />
      <div className=" flex justify-end">
        <Button type="submit">
          <Loader loading={updateDomainChatbotPending}>Save</Loader>
        </Button>
      </div>
    </form>
  );
}

export default ChatbotSetting;

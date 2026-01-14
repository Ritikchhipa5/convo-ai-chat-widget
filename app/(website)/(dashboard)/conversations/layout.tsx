import ConversationMenu from "@/components/conversation/conversation-menu";
import { Separator } from "@/components/ui/separator";

async function ConversationsLayout({ children }: any) {
  return (
    <div className="flex h-full  w-full gap-x-4 overflow-hidden">
      <ConversationMenu />
      <Separator orientation="vertical" />
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}

export default ConversationsLayout;

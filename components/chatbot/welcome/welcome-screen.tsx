import { MessageCircle, SendHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import BotPoweredBy from "@/components/chatbot/window/bot-powerdby";

type Props = {
  loading: boolean;
  haveChatConverstion: string;
  onStart?: () => void;
};

function WelcomeScreen({ onStart, loading, haveChatConverstion }: Props) {
  return (
    <div className="flex flex-col h-full items-center justify-between p-4 text-center ">
      {/* Top */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="h-14 w-14 rounded-full bg-amber-100 flex items-center justify-center">
          <MessageCircle className="h-7 w-7 text-amber-500" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900">Welcome 👋</h2>

        <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
          Have a question or need help? We’re here to assist you in real time.
        </p>

        <p className="text-sm font-medium text-amber-600">Let’s chat with us</p>
      </div>

      {/* Bottom CTA */}
      <div className="w-full">
        <Button
          disabled={loading}
          className="w-full"
          size="lg"
          onClick={onStart}
        >
          <Loader loading={loading}>
            {haveChatConverstion ? "Let's chat" : "Start conversation"}
            <SendHorizontalIcon fill="white" />
          </Loader>
        </Button>
        <BotPoweredBy className="pt-4" />
      </div>
    </div>
  );
}

export default WelcomeScreen;

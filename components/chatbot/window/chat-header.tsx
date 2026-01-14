import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LucideArrowLeft, Minus } from "lucide-react";

type Props = {
  onMinimize: VoidFunction;
  onBackScreen: VoidFunction;
};
export default function ChatHeader({ onMinimize, onBackScreen }: Props) {
  return (
    <div className=" flex justify-between items-center px-4 py-3 border-b">
      <div className="flex items-center gap-2 ">
        <Button variant="ghost" size="icon-sm" onClick={onBackScreen}>
          <LucideArrowLeft />
        </Button>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/100" />
          <AvatarFallback>WP</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-sm font-semibold">Text Support</p>
          <p className="text-xs text-muted-foreground">Ai Assistant</p>
        </div>
      </div>

      <Button variant="ghost" size="icon-sm" onClick={onMinimize}>
        <Minus />
      </Button>
    </div>
  );
}

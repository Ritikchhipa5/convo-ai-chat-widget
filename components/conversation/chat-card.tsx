import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatTime } from "@/hooks/conversations/use-conversations";
import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";

type Props = {
  seen: boolean;
  id: string;
  onChat: VoidFunction;
  createdAt: string;
  title: string;
  description?: string;
  active: boolean;
};

function ChatCard({
  seen,
  id,
  onChat,
  createdAt,
  title,
  description,
  active,
}: Props) {
  const { messageSentAt, urgent } = useChatTime(new Date(), id);
  return (
    <div onClick={onChat}>
      <div
        className={cn(
          "group/item hover:bg-muted border border-transparent  rounded-xl relative flex min-w-0 cursor-pointer items-center gap-4  p-4",
          active &&
            "bg-amber-50 dark:bg-amber-400 dark:text-white dark:border-transparent border-amber-100 "
        )}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="min-w-0 grow">
          <div className="flex items-center justify-between">
            <span className="truncate text-sm font-medium">{title || "-"}</span>
            <span className="text-muted-foreground dark:text-white dark:opacity-70 flex-none text-xs">
              {createdAt ? messageSentAt : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {urgent && !seen && (
              <CheckCheck className="text-amber-500" size={18} />
            )}
            <span className="text-muted-foreground dark:text-white dark:opacity-70 truncate text-start text-sm">
              {description
                ? description.substring(0, 20) + "..."
                : "This chatroom is empty"}
            </span>
            <div className="ms-auto flex  h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 dark:bg-white dark:text-amber-400 text-xs text-white">
              2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatCard;

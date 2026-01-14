import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import clsx from "clsx";
import moment from "moment";
import { memo } from "react";

type Props = {
  activeUser: boolean;
  message: string;
  createdAt?: string;
};

export const Bubble = memo(function Bubble({
  activeUser,
  message,
  createdAt,
}: Props) {
  return (
    <div className={clsx("flex", activeUser ? "justify-end" : "gap-2")}>
      {!activeUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>E</AvatarFallback>
        </Avatar>
      )}

      <div
        className={clsx(
          "relative max-w-[70%] rounded-xl px-4 py-2 text-sm",
          activeUser ? "bg-amber-500 text-white" : "bg-muted text-foreground"
        )}
      >
        <p>{message}</p>

        {/* Time */}
        <span className="mt-1 block text-right text-[10px] opacity-70">
          {moment(createdAt).format("hh:mm A")}
        </span>
      </div>
    </div>
  );
});

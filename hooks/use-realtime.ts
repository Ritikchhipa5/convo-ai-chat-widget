import { Role } from "@/lib/generated/prisma/enums";

import React, { useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
function useRealtime(
  chatRoomId: string,
  setChats: React.Dispatch<
    React.SetStateAction<
      {
        role: Role;
        content: string;
        link?: string;
      }[]
    >
  >
) {
  useEffect(() => {
    pusherClient?.subscribe("");
    pusherClient?.bind("realtime-mode", (data: any) => {
      setChats((prev) => [
        ...prev,
        { role: data.chat.role, content: data.chat.message },
      ]);
    });
    return () => pusherClient?.unsubscribe("realtime-mode");
  }, []);
  return {};
}

export default useRealtime;

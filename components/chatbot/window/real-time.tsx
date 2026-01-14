import useRealtime from "@/hooks/use-realtime";
import { Role } from "@/lib/generated/prisma/enums";
import React from "react";

type Props = {
  chatRoomId: string;
  setChats: React.Dispatch<
    React.SetStateAction<
      {
        role: Role;
        content: string;
        link?: string;
      }[]
    >
  >;
};

function RealTimeMode({ setChats, chatRoomId }: Props) {
  useRealtime(chatRoomId, setChats);
  return <div>Realtime</div>;
}

export default RealTimeMode;

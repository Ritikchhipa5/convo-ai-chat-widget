"use client";

import {
  onGetConversationMode,
  onToggleRealtime,
} from "@/actions/conversation";
import { useChatContext } from "@/context/use-chat-context";
import { useLogout } from "@/hooks/auth/use-auth-api";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useAppSidebar = () => {
  const [realtime, setRealtime] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { mutateAsync: logout } = useLogout();

  const router = useRouter();
  const pathname = usePathname();
  const { chatRoom } = useChatContext();

  const onActivateRealtime = async (e: any) => {
    try {
      const realtime = await onToggleRealtime(
        chatRoom!,
        e.target.ariaChecked == "true" ? false : true
      );
      if (realtime) {
        setRealtime(realtime.chatRoom.live);
        toast("Success", {
          description: realtime.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGetCurrentMode = async () => {
    if (!chatRoom) return;
    setLoading(true);
    const mode = await onGetConversationMode(chatRoom!);
    if (mode) {
      setLoading(false);
      setRealtime(mode.live);
    }
  };

  useEffect(() => {
    if (chatRoom) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      onGetCurrentMode();
    }
  }, [chatRoom]);

  const page = pathname.split("/").pop();

  const onSignOut = () => {
    logout().then(() => {
      router.push("/");
    });
  };

  return {
    page,
    onSignOut,
    realtime,
    onActivateRealtime,
    chatRoom,
    loading,
  };
};

export default useAppSidebar;

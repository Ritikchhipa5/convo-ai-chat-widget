import InfoBar from "@/components/infobar";
import React from "react";

function ConversationsPage() {
  return (
    <>
      <InfoBar />
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Select a conversation to start chatting
        </p>
      </div>
    </>
  );
}

export default ConversationsPage;

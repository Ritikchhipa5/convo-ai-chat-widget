"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

type ChatInitialValuesProps = {
  realtime: boolean;
  setRealtime: React.Dispatch<React.SetStateAction<boolean>>;
  currentConversation: string | undefined;
  setCurrentConversation: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  chats: {
    message: string;
    id: string;
    senderType: string;
    createdAt: string;
    seen: boolean;
  }[];
  setChats: React.Dispatch<
    React.SetStateAction<
      {
        message: string;
        id: string;
        senderType: string;
        createdAt: string;
        seen: boolean;
      }[]
    >
  >;
};

const InitialValues: ChatInitialValuesProps = {
  currentConversation: undefined,
  setCurrentConversation: () => undefined,
  chats: [],
  setChats: () => undefined,

  realtime: false,
  setRealtime: () => undefined,
};

const ChatContext = createContext(InitialValues);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [realtime, setRealtime] = useState(InitialValues.realtime);

  const [currentConversation, setCurrentConversation] = useState(
    InitialValues.currentConversation
  );
  const [chats, setChats] = useState(InitialValues.chats);

  const values = {
    realtime,
    setRealtime,
    currentConversation,
    setCurrentConversation,
    chats,
    setChats,
  };
  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const state = useContext(ChatContext);
  return state;
};

"use server";

import prisma from "@/lib/prisma";
export const onToggleRealtime = async (id: string, state: boolean) => {
  try {
    const chatRoom = await prisma.chatRoom.update({
      where: {
        id,
      },
      data: { live: state },
      select: {
        id: true,
        live: true,
      },
    });

    if (chatRoom) {
      return {
        status: 200,
        message: chatRoom?.live
          ? "Realtime mode enabled"
          : "Realtime mode enabled",
        chatRoom,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetConversationMode = async (id: string) => {
  try {
    const mode = await prisma.chatRoom.findUnique({
      where: {
        id,
      },
      select: {
        live: true,
      },
    });
    return mode;
  } catch (error) {
    console.log(error);
  }
};

export const onGetChatMessages = async (id: string) => {
  try {
    const messages = await prisma.chatRoom.findMany({
      where: {
        id,
      },
      select: {
        id: true,
        live: true,
        message: {
          select: {
            id: true,
            role: true,
            message: true,
            createdAt: true,
            seen: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (messages) {
      return messages;
    }
  } catch (error) {
    console.log(error);
  }
};

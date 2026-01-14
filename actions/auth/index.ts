"use server";

import prisma from "@/lib/prisma";

export const onCompleteUserRegistration = async (
  fullName: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = prisma.user.create({
      data: {
        fullName,
        clerkId,
        type,
        subscriptions: {
          create: {},
        },
      },
      select: {
        fullName: true,
        id: true,
        type: true,
      },
    });

    if (registered) {
      return { status: 200, user: registered };
    }
  } catch {
    return { status: 400 };
  }
};

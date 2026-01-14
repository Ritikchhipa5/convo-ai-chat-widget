"use server";

import { onRealTimeChat } from "@/actions/conversation";
import { onMailer } from "@/actions/mailer";
import { Role } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { extractEmailFromString, extractURLfromString } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export const onGetCurrentChatBot = async (id: string) => {
  try {
    const chatbot = await prisma.domain.findUnique({
      where: {
        id,
      },
      select: {
        helpDesk: true,
        name: true,
        chatBot: {
          select: {
            id: true,
            welcomeMessage: true,
            icon: true,
            textColor: true,
            background: true,
            helpdesk: true,
          },
        },
      },
    });

    if (chatbot) {
      return chatbot;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onStoreConversations = async (
  id: string,
  message: string,
  role: Role
) => {
  await prisma.chatRoom.update({
    where: {
      id,
    },
    data: {
      message: {
        create: {
          message,
          role,
        },
      },
    },
  });
};
let customerEmail: string | undefined;

export const onAiChatBotAssistant = async (
  id: string,
  chat: { role: Role; content: string }[],
  author: "user",
  message: string
) => {
  try {
    const chatBotDomain = await prisma.domain.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        filterQuestions: {
          where: {
            answered: null,
          },
          select: {
            question: true,
          },
        },
      },
    });

    if (chatBotDomain) {
      const extractedEmail = extractEmailFromString(message);

      if (extractedEmail) {
        customerEmail = extractedEmail;
      }

      if (customerEmail) {
        const checkCustomer = await prisma.domain.findUnique({
          where: {
            id,
          },
          select: {
            user: {
              select: {
                clerkId: true,
              },
            },
            name: true,
            customer: {
              where: {
                email: {
                  startsWith: customerEmail,
                },
              },
              select: {
                id: true,
                email: true,
                questions: true,
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                    mailed: true,
                  },
                },
              },
            },
          },
        });

        if (checkCustomer && !checkCustomer.customer.length) {
          const newCustomer = await prisma.domain.update({
            where: {
              id,
            },
            data: {
              customer: {
                create: {
                  email: customerEmail,
                  questions: {
                    create: chatBotDomain.filterQuestions,
                  },
                  chatRoom: {
                    create: {},
                  },
                },
              },
            },
          });

          if (newCustomer) {
            console.log("new customer added");
            const response = {
              role: Role.assistant,
              content: `Welcome aboard ${
                customerEmail.split("@")[0]
              } ! I am glad to connect with you. Is there anythings need to help.`,
            };
            return { response };
          }
        }

        if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id,
            message,
            author
          );
          onRealTimeChat(
            checkCustomer.customer[0].chatRoom[0].id,
            message,
            "user",
            author
          );

          if (!checkCustomer.customer[0].chatRoom[0].mailed) {
            const _clerkClient = await clerkClient();
            const user = await _clerkClient.users.getUser(
              checkCustomer.user?.clerkId as string
            );

            onMailer(user.emailAddresses[0].emailAddress);

            const mailed = await prisma.chatRoom.update({
              where: {
                id: checkCustomer.customer[0].chatRoom[0].id,
              },
              data: {
                mailed: true,
              },
            });

            if (mailed) {
              return {
                live: true,
                chatRoom: checkCustomer.customer[0].chatRoom[0].id,
              };
            }
          }
          return {
            live: true,
            chatRoom: checkCustomer.customer[0].chatRoom[0].id,
          };
        }
        await onStoreConversations(
          checkCustomer?.customer[0].chatRoom[0].id as string,
          message,
          author
        );

        const chatCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: "assistant",
              content: `
You will get an array of questions that you must ask the customer.

Progress the conversation using those questions.

When ever you ask a question from the array i need you to add a keyword at the end of the question (complete) this keyword is extremely important.

Do not forget it.

only add this keyword when your asking a question from the array of questions. No other question satisfies this condition

Always maintain character and stay respectful.

The array of questions :
[${chatBotDomain.filterQuestions
                .map((questions) => questions.question)
                .join(", ")}]

if the customer says something out of context or inappropriate. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime) at the end.

if the customer agrees to book an appointment send them this link
http://localhost:3000/portal/${id}/appointment/${checkCustomer?.customer[0].id}

if the customer wants to buy a product redirect them to the payment page
http://localhost:3000/portal/${id}/payment/${checkCustomer?.customer[0].id}


      `,
            },
            ...chat,
            {
              role: "user",
              content: message,
            },
          ],
          model: "gpt-4o-mini",
        });

        if (chatCompletion.choices[0].message.content?.includes("(realtime)")) {
          const realtime = await prisma.chatRoom.update({
            where: {
              id: checkCustomer?.customer[0].chatRoom[0].id,
            },
            data: {
              live: true,
            },
          });

          if (realtime) {
            const response = {
              role: Role.assistant,
              content: chatCompletion.choices[0].message.content?.replace(
                "(realtime)",
                ""
              ),
            };

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id as string,
              response.content,
              "assistant"
            );

            return { response };
          }
        }

        if (chat[chat.length - 1].content.includes("(complete)")) {
          const firstUnansweredQuestion =
            await prisma.customerResponse.findFirst({
              where: {
                customerId: checkCustomer?.customer[0].id as string,
                answered: null,
              },
              select: {
                id: true,
              },
              orderBy: {
                question: "asc",
              },
            });

          if (firstUnansweredQuestion) {
            await prisma.customerResponse.update({
              where: {
                id: firstUnansweredQuestion.id,
              },
              data: {
                answered: message,
              },
            });
          }
        }

        if (chatCompletion) {
          const generateLink = extractURLfromString(
            chatCompletion.choices[0].message.content as string
          );

          if (generateLink) {
            const link = generateLink;
            const response = {
              role: Role.assistant,
              content: `you can follow this link to proceed`,
              link: link.slice(0, -1),
            };
            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id as string,
              `${response.content} ${response.link}`,
              "assistant"
            );
            return { response };
          }
          const response = {
            role: Role.assistant,
            content: chatCompletion.choices[0].message.content,
          };
          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id as string,
            `${response.content}`,
            "assistant"
          );
          return { response };
        }
      }

      console.log("No customer");

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "assistant",
            content: `
You are a highly knowledgeable and experienced sales representative for ${chatBotDomain.name} that offers a valuable product or service.

Your goal is to have a natural, human-like conversation with the customer in order to understand their needs, provide relevant information, and ultimately guide them towards making a purchase or redirect them to a link if they haven't provided all relevant information.

Right now you are talking to a customer for the first time. Start by giving them a warm welcome on behalf of ${chatBotDomain.name} and make them feel welcomed.

Your next task is to lead the conversation naturally to get the customers email address.
Be respectful and never break character.
      `,
          },
          ...chat,
          {
            role: "user",
            content: message,
          },
        ],
      });

      if (chatCompletion) {
        const response = {
          role: Role.assistant,
          content: chatCompletion.choices[0].message.content,
        };
        return { response };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

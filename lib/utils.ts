import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractUUIDFromString = (url: string) => {
  return url
    ?.match(
      /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/
    )
    ?.toString();
};

export function extractEmailFromString(message: string) {
  const match = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match?.toString();
}

export function extractURLfromString(text: string) {
  const match = text.match(/(https?:\/\/[^\s]+)/i);
  return match?.toString();
}

export const postToParent = (message: string) => {
  window.parent.postMessage(message, "*");
};

export function getConversationKey(conversationId: string) {
  return `conversation_${conversationId}`;
}

export const universalTimeInString = () => {
  return moment().utc().toISOString();
};

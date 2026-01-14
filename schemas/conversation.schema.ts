import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from "@/constants/constant";
import z, { ZodType } from "zod";

export type ConversationSearchProps = {
  query: string;
  domain: string;
};

export type ChatBotMessageProps = {
  content?: string | undefined;
  image?: any;
};

export const ConversationSearchSchema = z.object({
  query: z.string().min(1, "You must entry a search query"),
  domain: z.string().min(1, "You must select at least  a domain"),
});

export const ChatBotMessageSchema = z.object({
  content: z
    .string()
    .min(1)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  image: z.any().optional(),
});

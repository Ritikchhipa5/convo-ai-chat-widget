import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from "@/constants/constant";
import z, { optional } from "zod";

export type ChangedPasswordProps = {
  password: string;
  confirmPassword: string;
};

export type DomainSettingsProps = {
  domain: string;
  description: string;
};

export type DomainChatBotProps = {
  image: any;
  welcomeMessage: string;
};

export type HelpDeskQuestionsProps = {
  question: string;
  answer: string;
};
export type FilterQuestionsProps = {
  question: string;
};
export type AddDomainProps = {
  domain: string;
  image: string;
  description: string;
};

export const AddDomainSchema = z.object({
  domain: z
    .string()
    .min(4, { message: "A domain must have atleast 3 characters" })
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ""),
      "This is not a valid domain"
    ),
  description: z
    .string()
    .min(6, "The message must be at least 6 chars")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  image: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_UPLOAD_SIZE,
      "Your file must be less than 2MB"
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only JPG, JPEG & PNG are accepted file formats"
    ),
});

export const ChangedPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Your password must be at least 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "password should contain only alphabets and numbers"
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

export const DomainSettingsSchema = z.object({
  domain: z
    .string()
    .min(4, { message: "A domain must have at least 3 characters" })
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ""),
      "This is not a valid domain"
    )
    .optional()
    .or(z.literal("").transform(() => undefined)),
  // image: z.any().optional(),
  description: z
    .string()
    .min(6, "The message must be at least 6 chars")
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export const DomainChatBotSchema = z
  .object({
    image: z.any().optional(),
    welcomeMessage: z
      .string()
      .min(6, "The message must be at least 6 chars")
      .optional()
      .or(z.literal("").transform(() => undefined)),
  })
  .refine(
    (schema: any) => {
      if (schema.image?.length) {
        if (
          ACCEPTED_FILE_TYPES.includes(schema?.image?.[0]?.type) &&
          schema.image?.[0].size <= MAX_UPLOAD_SIZE
        ) {
          return true;
        }
      }
      if (!schema.image?.length) {
        return true;
      }
    },
    {
      path: ["image"],
      message: "Your file must be less than 2MB",
    }
  );

export const HelpDeskQuestionsSchema = z.object({
  question: z.string().min(1, "Question can't be empty"),
  answer: z.string().min(1, "Answer can't be empty"),
});

export const FilterQuestionsSchema = z.object({
  question: z.string().min(1, "Question can't be empty"),
});

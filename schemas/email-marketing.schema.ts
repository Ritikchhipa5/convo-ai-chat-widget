import z from "zod";

export type EmailMarketingType = { name: string };
export type EmailMarketingBodyType = { description: string };

export const EmailMarketingSchema = z.object({
  name: z.string().min(3, "campaign name must be at least 3 characters long"),
});

export const EmailMarketingBodySchema = z.object({
  description: z
    .string()
    .min(30, "description must be at least 30 characters long"),
});

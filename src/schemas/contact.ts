import * as z from "zod";

export const ContactSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  phoneNumber: z.string(),
});

export type ContactSchemaType = z.infer<typeof ContactSchema>;

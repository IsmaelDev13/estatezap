import * as z from "zod";

export const ColumnSchema = z.object({
  title: z.string().min(3),
});

export type ColumnSchemaType = z.infer<typeof ColumnSchema>;

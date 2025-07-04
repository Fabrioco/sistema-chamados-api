import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string(),
  description: z.string(),
  userId: z.string(),
  category: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["OPEN", "CLOSED"]),
});

export type CreateTicketDTO = z.infer<typeof createTicketSchema>;

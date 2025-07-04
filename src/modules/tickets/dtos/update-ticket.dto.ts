import { z } from "zod";

export const updateTicketSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  userId: z.string().optional(),
  category: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  status: z.enum(["OPEN", "CLOSED"]).optional(),
});

export type UpdateTicketDTO = z.infer<typeof updateTicketSchema>;

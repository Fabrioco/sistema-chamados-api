import { Request, Response } from "express";
import { createTicketSchema } from "./dtos/create-ticket.dto";
import TicketService from "./ticket.service";
import { updateTicketSchema } from "./dtos/update-ticket.dto";
import ticketService from "./ticket.service";

class TicketController {
  create = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const validation = await createTicketSchema.safeParseAsync(data);
      if (!validation.success) {
        const error = validation.error.errors[0];
        res.status(409).json({
          code: 409,
          status: error.code,
          field: error.path[0],
          message: error.message,
          suggestion: `Verifique se o campo ${error.path[0]} esta correto`,
        });
        return;
      }
      const ticket = await ticketService.createTicket(data);
      res.status(201).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const tickets = await ticketService.getAllTickets();
      res.status(200).json(tickets);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
    }
  };

  findUniqueById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ticket = await ticketService.getTicketById(id);
      res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
    }
  };

  findUniqueByUserId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const tickets = await ticketService.getTicketsByUserId(id);
      res.status(200).json(tickets);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const ticket = await ticketService.updateTicket(id, data);
      res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ticket = await ticketService.deleteTicket(id);
      res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
    }
  };
}

export default new TicketController();

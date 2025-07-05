import { CreateTicketDTO } from "./dtos/create-ticket.dto";
import { PrismaClient } from "@prisma/client";
import { UpdateTicketDTO } from "./dtos/update-ticket.dto";

const prisma = new PrismaClient();

class TicketRepository {
  async create(data: CreateTicketDTO) {
    return await prisma.ticket.create({
      data,
    });
  }

  async findAll() {
    return await prisma.ticket.findMany();
  }

  async findByPk(id: string) {
    const existingTicket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!existingTicket) {
      throw new Error("Ticket not found");
    }

    return existingTicket;
  }

  async findByUserId(userId: string) {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    return await prisma.ticket.findMany({
      where: { userId },
    });
  }

  async update(id: string, data: UpdateTicketDTO) {
    const existingTicket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!existingTicket) {
      throw new Error("Ticket not found");
    }

    return await prisma.ticket.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const existingTicket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!existingTicket) {
      throw new Error("Ticket not found");
    }

    return await prisma.ticket.delete({
      where: { id },
    });
  }
}

export default new TicketRepository();


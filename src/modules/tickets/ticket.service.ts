import { CreateTicketDTO } from "./dtos/create-ticket.dto";
import { UpdateTicketDTO } from "./dtos/update-ticket.dto";
import ticketRepository from "./ticket.repository";

class TicketService {
  async createTicket(data: CreateTicketDTO) {
    return ticketRepository.create(data);
  }

  async getAllTickets() {
    return ticketRepository.findAll();
  }

  async getTicketById(id: string) {
    return ticketRepository.findByPk(id);
  }

  async getTicketsByUserId(userId: string) {
    return ticketRepository.findByUserId(userId);
  }

  async updateTicket(id: string, data: UpdateTicketDTO) {
    return ticketRepository.update(id, data);
  }

  async deleteTicket(id: string) {
    return ticketRepository.delete(id);
  }
}

export default new TicketService();

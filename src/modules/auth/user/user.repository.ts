import { PrismaClient } from "@prisma/client";
import { RegisterDTO } from "../dtos/register.dto";

const prisma = new PrismaClient();

export class UserRepository {
  async findUnique(email: string) {
    return await prisma.user.findUnique({
      email,
    });
  }

  async create(data: RegisterDTO) {
    return await prisma.user.create({
      data,
    });
  }
}

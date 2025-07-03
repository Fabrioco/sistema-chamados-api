import { PrismaClient } from "@prisma/client";
import { RegisterDTO } from "./dtos/register.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class UserRepository {
  async findUnique(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: RegisterDTO) {
    return await prisma.user.create({
      data,
    });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  createToken(email: string) {
    return jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
  }
}

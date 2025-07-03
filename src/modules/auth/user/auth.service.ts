import { PrismaClient } from "@prisma/client";
import { RegisterDTO } from "../dtos/register.dto";
import { LoginDTO } from "../dtos/login.dto";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

class AuthUserService {
  async register(data: RegisterDTO) {
    const verifyUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (verifyUser) {
      throw new Error("Usuário já cadastrado");
    }

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    return user;
  }

  async login(data: LoginDTO) {
    const findUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (
      !findUser ||
      !(await this.comparePassword(data.password, findUser.password))
    ) {
      throw new Error("Usuário não encontrado");
    }

    const user = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      role: findUser.role,
    };

    return user;
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}

export default new AuthUserService();

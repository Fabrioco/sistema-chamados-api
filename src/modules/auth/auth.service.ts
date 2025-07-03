import { RegisterDTO } from "./dtos/register.dto";
import { LoginDTO } from "./dtos/login.dto";
import { UserRepository } from "./user.repository";
import { comparePassword } from "../../utils/compare-password";

export class AuthService {
  private UserRepository: UserRepository;

  constructor() {
    this.UserRepository = new UserRepository();
  }
  async register(data: RegisterDTO) {
    const verifyUser = await this.UserRepository.findUnique(data.email);

    if (verifyUser) {
      throw new Error("Usuário já cadastrado");
    }

    const user = await this.UserRepository.create(data);
    return user;
  }

  async login(data: LoginDTO) {
    const findUser = await this.UserRepository.findUnique(data.email);

    if (
      !findUser ||
      !(await comparePassword(data.password, findUser.password))
    ) {
      throw new Error("Credenciais inválidas");
    }

    delete findUser.password;
    const user = findUser;

    return user;
  }
}

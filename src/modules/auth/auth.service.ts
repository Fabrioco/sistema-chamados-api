import { RegisterDTO } from "./dtos/register.dto";
import { LoginDTO } from "./dtos/login.dto";
import { UserRepository } from "./user.repository";
import { comparePassword } from "../../utils/compare-password";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data: RegisterDTO) {
    const existingUser = await this.userRepository.findUnique(data.email);

    if (existingUser) {
      throw new Error("Usuário já cadastrado");
    }

    const user = await this.userRepository.create(data);
    return user;
  }

  async login(data: LoginDTO) {
    const foundUser = await this.userRepository.findUnique(data.email);

    if (
      !foundUser ||
      !(await comparePassword(data.password, foundUser.password))
    ) {
      throw new Error("Credenciais inválidas");
    }

    delete foundUser.password;
    return foundUser;
  }
}

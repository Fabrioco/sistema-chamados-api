import { RegisterDTO } from "./dtos/register.dto";
import { LoginDTO } from "./dtos/login.dto";
import { UserRepository } from "./user.repository";

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

    data.password = await this.userRepository.hashPassword(data.password);

    const user = await this.userRepository.create(data);
    return user;
  }

  async login(data: LoginDTO) {
    const foundUser = await this.userRepository.findUnique(data.email);

    if (
      !foundUser ||
      !(await this.userRepository.comparePassword(
        data.password,
        foundUser.password
      ))
    ) {
      throw new Error("Credenciais inválidas");
    }

    const token = this.userRepository.createToken(foundUser.email);

    delete foundUser.password;
    return { ...foundUser, token };
  }
}

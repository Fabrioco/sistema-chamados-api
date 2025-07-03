import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { registerSchema } from "./dtos/register.dto";
import { loginSchema } from "./dtos/login.dto";

class AuthUserController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const validation = await registerSchema.safeParseAsync(data);
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

      const user = await this.authService.register(data);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const validation = await loginSchema.safeParseAsync(data);
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

      const user = await this.authService.login(data);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
}

export default new AuthUserController();

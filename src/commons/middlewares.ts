import { NextFunction, Request, Response } from "express";

class Middlewares {
  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies;

      console.log(token);
      // Aqui você pode verificar o token com JWT, se quiser

      // Tudo certo, continua para o próximo
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new Middlewares();

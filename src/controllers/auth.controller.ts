import { AuthService } from "../service/impl/auth.service";
import { Request, Response, NextFunction } from 'express';

export class AuthController {

  constructor(private authService: AuthService) { }

  async login(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    try {
      const token = await this.authService.login(body);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
}

export { AuthService };

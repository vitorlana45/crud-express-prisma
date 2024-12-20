import { Request, Response, NextFunction } from 'express';
import { container } from '../container/dependencies';
import { TokenService } from '../security/token.service';
import { User } from '../interfaces/user.request.type';
import { Role } from '@prisma/client';

const tokenService: TokenService = container.tokenService;

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await tokenService.verify(token);

    req.user = decoded.payload as unknown as User;
  
    next();
  } 
  catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


export const roleMiddleware = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }
    next();
  };
};

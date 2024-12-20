import { User } from '../interfaces/user.request.type';

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}
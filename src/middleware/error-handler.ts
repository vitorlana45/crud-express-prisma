import { Request, Response, NextFunction } from 'express';
import { HttpErrorHandler } from '../exceptions/http-error.handler';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpErrorHandler) {
    res.status(err.status).json(
      {
        instant: new Date().toISOString(),
        error: err.message,
      }
    );
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
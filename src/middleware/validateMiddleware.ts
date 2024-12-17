import { type ClassConstructor, plainToInstance } from "class-transformer";
import { validate, type ValidationError } from "class-validator";
import type { NextFunction, Request, Response } from "express";

export function validateMiddleware<T>(type: "body" | "query", dtoClass: ClassConstructor<T>) {

  // o plainToInstance vai transformar um objeto em uma instancia de uma classe
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req[type]);

    const errors: ValidationError[] = await validate(dtoInstance as object);

    if (errors.length > 0) {
      const validationErrors = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));
      res.status(400).json({
        status: "fail",
        errors: validationErrors.map((error) => ({
          [error.property]: error.constraints,
        })),
      });
      return;
    }
    req[type] = dtoInstance;

    next();
  };
}

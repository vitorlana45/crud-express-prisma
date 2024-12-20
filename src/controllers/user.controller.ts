import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../service/user.service.interface';
import { UpdateUserResponse } from '../dto/response/update.user.response';
import { UserResponse } from '../dto/response/user.dto.response';
import { InvalidPaginationParams } from '../exceptions/user-errors';
import { PaginationParams } from '../interfaces/type.pagination.params';
import { CreateUserDto } from '../dto/request/create.user.request';


export class UserController {


  constructor(public userService: IUserService) { }

  async registerUser(req: Request, res: Response) {
    const body: CreateUserDto = req.body;
    const id: string = await this.userService.createUser(body);

    res.header('application/json');
    res.header('Location', `/users/${id}`);
    res.status(201).send();
  };


  async getUserByEmail(req: Request, res: Response, next: NextFunction) {

    const email = req.params.email;
    try {
      const user: UserResponse = await this.userService.getUserByEmail(email);

      res.status(200).json(user);

    } catch (error) {
      next(error);
    }
  }


  async getUserByID(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const user = await this.userService.getUserByID(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      const data: UpdateUserResponse = await this.userService.updateUser(id, req.body);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await this.userService.deleteUserById(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getAllUsersPagination(req: Request, res: Response, next: NextFunction) {
    const { page, limit } = req.query as unknown as PaginationParams;
    try {

      const pageNum = page ? parseInt(page as string, 10) : 1;
      const limitNum = limit ? parseInt(limit as string, 10) : 10;

      if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        throw new InvalidPaginationParams('Page and limit must be valid numbers greater than 0');
      }

      const users = await this.userService.getAllUserWithPagination(pageNum, limitNum);

      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
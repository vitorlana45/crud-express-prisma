// controllers/user.controller.ts
import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../service/user.service.interface';
import { UserService } from '../service/user.service';
import { UpdateUserResponse } from '../dto/response/update.user.response';
import { UpdateUserRequest } from '../dto/request/update.user.request';
import { UserResponse } from '../dto/response/user.dto.response';
import { InvalidPaginationParams } from '../exceptions/user-errors';
import { PaginationParams } from '../interfaces/type.pagination.params';

const userService: IUserService = new UserService();

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const id: string = await userService.createUser(req.body);

    res.header('application/json');
    res.header('Location', `/users/${id}`);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};


export const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {

  const email = req.params.email;
  try {
    const user: UserResponse | null = await userService.getUserByEmail(email);

    res.status(200).json(user);

  } catch (error) {
    next(error);
  }
}


export const getUserByID = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const user = await userService.getUserByID(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const data: UpdateUserResponse = await userService.updateUser(id, req.body);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.deleteUserById(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export const getAllUsersPagination = async (req: Request, res: Response, next: NextFunction) => {
  const { page, limit } = req.query as unknown as PaginationParams;
  try {

    const pageNum = page ? parseInt(page as string, 10) : 1;
    const limitNum = limit ? parseInt(limit as string, 10) : 10;

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
      throw new InvalidPaginationParams('Page and limit must be valid numbers greater than 0');
    }

    const users = await userService.getAllUserWithPagination(pageNum, limitNum);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
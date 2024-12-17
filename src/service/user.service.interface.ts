import { CreateUserDto } from '../dto/request/create.user.request';
import { UserResponse } from '../dto/response/user.dto.response';
import { UpdateUserRequest } from '../dto/request/update.user.request';
import { UpdateUserResponse } from '../dto/response/update.user.response';
import { PaginatedResult } from '../interfaces/pagination.type.interface';

export interface IUserService {
  createUser(data: CreateUserDto): Promise<string>;
  getUserByEmail(email: string): Promise<UserResponse>;
  updateUser(id: string, data: UpdateUserRequest): Promise<UpdateUserResponse>;
  deleteUserById(id: string): Promise<void>;
  getAllUserWithPagination(page: number, limit: number): Promise<PaginatedResult>;
  getUserByID(id: string): Promise<UserResponse>;
}
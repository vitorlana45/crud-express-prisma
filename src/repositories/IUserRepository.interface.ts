import { User } from '@prisma/client';
import { PaginatedResult } from '../interfaces/pagination.type.interface';

export interface IUserRepository {
  createUser(data: Omit<User, 'id' | 'role' | 'createdAt' | 'updatedAt'>): Promise<User>;

  getUserById(id: string): Promise<User | null>;

  getAllUsers(): Promise<User[]>;

  updateUser(id: string, data: Partial<User>): Promise<User>;

  deleteUser(id: string): Promise<User>;

  findUserByEmail(email: string): Promise<User | null>;

  findUserById(id: string): Promise<User | null>;

  getUserByIdForUpdate(userId: string): Promise<Partial<User> | null>;

  existUserByEmail(email: string): Promise<boolean>;

  existsUserWithId(id: string): Promise<boolean>;

  getAllUsersWithPagination(page: number, limit: number): Promise<PaginatedResult>;
}

import { PrismaClient, User } from '@prisma/client';
import { PaginatedResult } from '../../interfaces/pagination.type.interface';
import { IUserRepository } from '../IUserRepository.interface';

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {

  async createUser(data: Omit<User, 'id' | 'role' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return await prisma.user.delete({
      where: { id },
    });
  }


  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUserByIdForUpdate(userId: string): Promise<Partial<User> | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        password: true,
      },
    });
  }

  async existUserByEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return !!user;
  }

  async existsUserWithId(id: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return !!user;
  }


  async getAllUsersWithPagination(page: number, limit: number): Promise<PaginatedResult> {
    const offset = (page - 1) * limit;

    // Contar o número total de registros
    const totalElements = await prisma.user.count();

    // Recuperar os dados paginados
    const content = await prisma.user.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    const totalPages = Math.ceil(totalElements / limit);

    return {
      content,
      page,
      limit,
      totalElements,
      totalPages,
    };
  }
}




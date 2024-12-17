import { User } from "../../models/user.model";
import { IUserService } from "../user.service.interface";
import { CreateUserDto } from "../../dto/request/create.user.request";
import { UserRepository } from '../../repositories/user.repository';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { UserResponse } from "../../dto/response/user.dto.response";
import { InvalidPaginationParams, UserAlreadyExist, UserNotFound } from "../../exceptions/user-errors";
import { HttpErrorHandler } from "../../exceptions/http-error.handler";
import { UpdateUserRequest } from "../../dto/request/update.user.request";
import { UpdateUserResponse } from "../../dto/response/update.user.response";
import { PaginatedResult } from "../../interfaces/pagination.type.interface";


dotenv.config();

export class UserService implements IUserService {

  private repository: UserRepository;
  private readonly secretKey: string;

  constructor(repository?: UserRepository) {
    this.repository = repository || new UserRepository();

    if (!process.env.SECRET_KEY) {
      throw new HttpErrorHandler(500, "SECRET_KEY is not defined in the environment variables");
    };
    this.secretKey = process.env.SECRET_KEY;
  }


  createUser = async (data: CreateUserDto): Promise<string> => {
    const { name, email, password } = data;

    const encryptPassword = await bcrypt.hash(password + this.secretKey, 10);
    const entity = new User(name, email, encryptPassword);

    if (await this.repository.findUserByEmail(email) !== null) {
      throw new UserAlreadyExist("User already exists");
    }

    const result = await this.repository.createUser(entity);
    return result.id;
  };

  getUserByEmail = async (email: string): Promise<UserResponse | null> => {
    const user = await this.repository.findUserByEmail(email);
    if (!user) {
      throw new UserNotFound();
    }
    return new UserResponse(user.id, user.name, user.email, user.role, user.createdAt, user.updatedAt);
  };

  getUserByID = async (id: string): Promise<UserResponse | null> => {
    const user = await this.repository.findUserById(id);
    if (!user) {
      throw new UserNotFound();
    }
    return new UserResponse(user.id, user.name, user.email, user.role, user.createdAt, user.updatedAt);
  };

  updateUser = async (id: string, data: UpdateUserRequest): Promise<UpdateUserResponse> => {

    const user = await this.repository.getUserByIdForUpdate(id);

    if (!user) {
      throw new UserNotFound();
    }

    let entity: Partial<User> = user;

    if (data.email !== null) {
      if (await this.repository.existUserByEmail(data.email!)) {
        throw new UserAlreadyExist(`User with email '${data.email}' already exists`);
      }
      entity.email = data.email;
    }

    if (data.name !== null) {
      entity.name = data.name;
    }

    if (data.password !== null) {
      entity.password = await bcrypt.hash(data.password! + this.secretKey, 10);
    }

    const updatedUser = await this.repository.updateUser(id, entity);

    return new UpdateUserResponse(updatedUser.id, updatedUser.name, updatedUser.email, updatedUser.role, updatedUser.createdAt, updatedUser.updatedAt);
  }

  deleteUserById = async (id: string): Promise<void> => {
    await this.existsUserWithId(id);
    await this.repository.deleteUser(id);
  }


  async getAllUserWithPagination(page: number, limit: number): Promise<PaginatedResult> {

    if (page < 1 || limit < 1) throw new InvalidPaginationParams('Page and limit must be greater than 0');


    const obj: PaginatedResult = await this.repository.getAllUsersWithPagination(page, limit);

    const newListResponse: UserResponse[] = obj.content
      .filter(user => user.id && user.name && user.email && user.role && user.createdAt && user.updatedAt)
      .map(user => new UserResponse(user.id!, user.name!, user.email!, user.role!, user.createdAt!, user.updatedAt!));

    obj.content = newListResponse;

    return obj;
  }



  existsUserWithId = async (id: string) => {
    if (!await this.repository.existsUserWithId(id)) {
      throw new UserNotFound();
    }
  }
}

import { Role } from '@prisma/client';

export class UserResponse {

  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;


  constructor(id: string, name: string, email: string, role: Role, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

};
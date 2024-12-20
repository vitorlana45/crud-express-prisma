import { Role } from "@prisma/client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

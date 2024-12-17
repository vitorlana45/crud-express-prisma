import { User } from "@prisma/client";

export interface PaginatedResult {
  content: Partial<User>[];
  page: number;
  limit: number;
  totalElements: number;
  totalPages: number;
}
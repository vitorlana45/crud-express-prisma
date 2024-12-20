"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserRepository {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.create({
                data,
            });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({
                where: { id },
            });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findMany();
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.update({
                where: { id },
                data,
            });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.delete({
                where: { id },
            });
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({
                where: { email },
            });
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({
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
        });
    }
    getUserByIdForUpdate(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({
                where: { id: userId },
                select: {
                    name: true,
                    email: true,
                    password: true,
                },
            });
        });
    }
    existUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { email },
            });
            return !!user;
        });
    }
    existsUserWithId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { id },
            });
            return !!user;
        });
    }
    getAllUsersWithPagination(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * limit;
            // Contar o número total de registros
            const totalElements = yield prisma.user.count();
            // Recuperar os dados paginados
            const content = yield prisma.user.findMany({
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
        });
    }
}
exports.UserRepository = UserRepository;

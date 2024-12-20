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
exports.UserController = void 0;
const user_errors_1 = require("../exceptions/user-errors");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const id = yield this.userService.createUser(body);
            res.header('application/json');
            res.header('Location', `/users/${id}`);
            res.status(201).send();
        });
    }
    ;
    getUserByEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.params.email;
            try {
                const user = yield this.userService.getUserByEmail(email);
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUserByID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield this.userService.getUserByID(id);
            res.status(200).json(user);
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const data = yield this.userService.updateUser(id, req.body);
                res.status(200).send(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.deleteUserById(req.params.id);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllUsersPagination(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = req.query;
            try {
                const pageNum = page ? parseInt(page, 10) : 1;
                const limitNum = limit ? parseInt(limit, 10) : 10;
                if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
                    throw new user_errors_1.InvalidPaginationParams('Page and limit must be valid numbers greater than 0');
                }
                const users = yield this.userService.getAllUserWithPagination(pageNum, limitNum);
                res.status(200).json(users);
            }
            catch (error) {
                console.error(error);
                next(error);
            }
        });
    }
    ;
}
exports.UserController = UserController;

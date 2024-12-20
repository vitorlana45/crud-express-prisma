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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_dto_response_1 = require("../../dto/response/user.dto.response");
const user_errors_1 = require("../../exceptions/user-errors");
const http_error_handler_1 = require("../../exceptions/http-error.handler");
const update_user_response_1 = require("../../dto/response/update.user.response");
dotenv_1.default.config();
class UserService {
    constructor(userRepo) {
        this.createUser = (data) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = data;
            const encryptPassword = yield bcrypt_1.default.hash(password + this.secretKey, 10);
            const entity = new user_model_1.User(name, email, encryptPassword);
            if ((yield this.repository.findUserByEmail(email)) !== null) {
                throw new user_errors_1.UserAlreadyExist("User already exists");
            }
            const result = yield this.repository.createUser(entity);
            return result.id;
        });
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findUserByEmail(email);
            if (!user) {
                throw new user_errors_1.UserNotFound();
            }
            return new user_dto_response_1.UserResponse(user.id, user.name, user.email, user.role, user.createdAt, user.updatedAt);
        });
        this.getUserByID = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findUserById(id);
            if (!user) {
                throw new user_errors_1.UserNotFound();
            }
            return new user_dto_response_1.UserResponse(user.id, user.name, user.email, user.role, user.createdAt, user.updatedAt);
        });
        this.updateUser = (id, data) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.getUserByIdForUpdate(id);
            if (!user) {
                throw new user_errors_1.UserNotFound();
            }
            let entity = user;
            if (data.email !== null) {
                if (yield this.repository.existUserByEmail(data.email)) {
                    throw new user_errors_1.UserAlreadyExist(`User with email '${data.email}' already exists`);
                }
                entity.email = data.email;
            }
            if (data.name !== null) {
                entity.name = data.name;
            }
            if (data.password !== null) {
                entity.password = yield bcrypt_1.default.hash(data.password + this.secretKey, 10);
            }
            const updatedUser = yield this.repository.updateUser(id, entity);
            return new update_user_response_1.UpdateUserResponse(updatedUser.id, updatedUser.name, updatedUser.email, updatedUser.role, updatedUser.createdAt, updatedUser.updatedAt);
        });
        this.deleteUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.existsUserWithId(id);
            yield this.repository.deleteUser(id);
        });
        this.existsUserWithId = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.repository.existsUserWithId(id))) {
                throw new user_errors_1.UserNotFound();
            }
        });
        this.repository = userRepo;
        if (!process.env.SECRET_KEY) {
            throw new http_error_handler_1.HttpErrorHandler(500, "SECRET_KEY is not defined in the environment variables");
        }
        ;
        this.secretKey = process.env.SECRET_KEY;
    }
    getAllUserWithPagination(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page < 1 || limit < 1)
                throw new user_errors_1.InvalidPaginationParams('Page and limit must be greater than 0');
            const obj = yield this.repository.getAllUsersWithPagination(page, limit);
            const newListResponse = obj.content
                .filter(user => user.id && user.name && user.email && user.role && user.createdAt && user.updatedAt)
                .map(user => new user_dto_response_1.UserResponse(user.id, user.name, user.email, user.role, user.createdAt, user.updatedAt));
            obj.content = newListResponse;
            return obj;
        });
    }
}
exports.UserService = UserService;

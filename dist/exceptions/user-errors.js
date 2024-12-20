"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPaginationParams = exports.UserNotFound = exports.UserAlreadyExist = void 0;
const http_error_handler_1 = require("../exceptions/http-error.handler");
class UserAlreadyExist extends http_error_handler_1.HttpErrorHandler {
    constructor(message) {
        super(409, message);
    }
}
exports.UserAlreadyExist = UserAlreadyExist;
class UserNotFound extends http_error_handler_1.HttpErrorHandler {
    constructor() {
        super(404, "User not found");
    }
}
exports.UserNotFound = UserNotFound;
class InvalidPaginationParams extends http_error_handler_1.HttpErrorHandler {
    constructor(message) {
        super(400, message);
    }
}
exports.InvalidPaginationParams = InvalidPaginationParams;

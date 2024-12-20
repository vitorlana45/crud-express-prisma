"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorHandler = void 0;
class HttpErrorHandler extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.HttpErrorHandler = HttpErrorHandler;

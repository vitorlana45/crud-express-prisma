"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_error_handler_1 = require("../exceptions/http-error.handler");
const errorHandler = (err, req, res, next) => {
    console.error("asdsd");
    if (err instanceof http_error_handler_1.HttpErrorHandler) {
        res.status(err.status).json({
            instant: new Date().toISOString(),
            error: err.message,
        });
    }
    else {
        console.log("erro internal ");
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.errorHandler = errorHandler;

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/exceptions/user-errors.ts
var user_errors_exports = {};
__export(user_errors_exports, {
  InvalidPaginationParams: () => InvalidPaginationParams,
  UserAlreadyExist: () => UserAlreadyExist,
  UserNotFound: () => UserNotFound
});
module.exports = __toCommonJS(user_errors_exports);

// src/exceptions/http-error.handler.ts
var HttpErrorHandler = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
};

// src/exceptions/user-errors.ts
var UserAlreadyExist = class extends HttpErrorHandler {
  constructor(message) {
    super(409, message);
  }
};
var UserNotFound = class extends HttpErrorHandler {
  constructor() {
    super(404, "User not found");
  }
};
var InvalidPaginationParams = class extends HttpErrorHandler {
  constructor(message) {
    super(400, "Invalid filter or pagination");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InvalidPaginationParams,
  UserAlreadyExist,
  UserNotFound
});

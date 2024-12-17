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

// src/middleware/error-handler.ts
var error_handler_exports = {};
__export(error_handler_exports, {
  errorHandler: () => errorHandler
});
module.exports = __toCommonJS(error_handler_exports);

// src/exceptions/http-error.handler.ts
var HttpErrorHandler = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
};

// src/middleware/error-handler.ts
var errorHandler = (err, req, res, next) => {
  if (err instanceof HttpErrorHandler) {
    res.status(err.status).json(
      {
        instant: (/* @__PURE__ */ new Date()).toISOString(),
        error: err.message
      }
    );
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorHandler
});

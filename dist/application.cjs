"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/application.ts
var application_exports = {};
__export(application_exports, {
  default: () => createApplication
});
module.exports = __toCommonJS(application_exports);
var import_express2 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);

// src/routes/router.ts
var import_express = require("express");

// src/models/user.model.ts
var User = class {
  constructor(name, email, password, role, createdAt, updatedAt) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
};

// src/repositories/user.repository.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var UserRepository = class {
  createUser(data) {
    return __async(this, null, function* () {
      return yield prisma.user.create({
        data
      });
    });
  }
  getUserById(id) {
    return __async(this, null, function* () {
      return yield prisma.user.findUnique({
        where: { id }
      });
    });
  }
  getAllUsers() {
    return __async(this, null, function* () {
      return yield prisma.user.findMany();
    });
  }
  updateUser(id, data) {
    return __async(this, null, function* () {
      return yield prisma.user.update({
        where: { id },
        data
      });
    });
  }
  deleteUser(id) {
    return __async(this, null, function* () {
      return yield prisma.user.delete({
        where: { id }
      });
    });
  }
};

// src/service/user.service.ts
var import_client2 = require("@prisma/client");
var UserService = class {
  constructor() {
    this.createUser = (data) => __async(this, null, function* () {
      const { name, email, password } = data;
      const entity = new User(name, email, password, import_client2.Role.USER, /* @__PURE__ */ new Date(), /* @__PURE__ */ new Date());
      try {
        const result = yield this.repository.createUser(entity);
        return result.id;
      } catch (error) {
        throw error;
      }
    });
    this.repository = new UserRepository();
  }
  getUser() {
    throw new Error("Method not implemented.");
  }
  updateUser(data) {
    throw new Error("Method not implemented.");
  }
  deleteUser() {
    throw new Error("Method not implemented.");
  }
  getAll() {
    throw new Error("Method not implemented.");
  }
};

// src/controllers/user.controller.ts
var userService = new UserService();
var registerUser = (req, res) => __async(void 0, null, function* () {
  const id = yield userService.createUser(req.body);
  res.header("application/json");
  res.header("Location", `/users/${id}`);
  res.status(201).send();
});

// src/routes/router.ts
var router = (0, import_express.Router)();
router.post("/users", registerUser);

// src/application.ts
function createApplication() {
  const app = (0, import_express2.default)();
  app.use(import_express2.default.json());
  app.use("/api", router);
  app.use((0, import_cors.default)());
  return app;
}

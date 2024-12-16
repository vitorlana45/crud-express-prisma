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

// src/service/user.service.ts
var user_service_exports = {};
__export(user_service_exports, {
  UserService: () => UserService
});
module.exports = __toCommonJS(user_service_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserService
});

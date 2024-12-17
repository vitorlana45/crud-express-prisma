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

// src/repositories/user.repository.ts
var user_repository_exports = {};
__export(user_repository_exports, {
  UserRepository: () => UserRepository
});
module.exports = __toCommonJS(user_repository_exports);
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
  findUserByEmail(email) {
    return __async(this, null, function* () {
      return yield prisma.user.findUnique({
        where: { email }
      });
    });
  }
  findUserById(id) {
    return __async(this, null, function* () {
      return yield prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });
    });
  }
  getUserByIdForUpdate(userId) {
    return __async(this, null, function* () {
      return yield prisma.user.findUnique({
        where: { id: userId },
        select: {
          name: true,
          email: true,
          password: true
        }
      });
    });
  }
  existUserByEmail(email) {
    return __async(this, null, function* () {
      const user = yield prisma.user.findUnique({
        where: { email }
      });
      return !!user;
    });
  }
  existsUserWithId(id) {
    return __async(this, null, function* () {
      const user = yield prisma.user.findUnique({
        where: { id }
      });
      return !!user;
    });
  }
  getAllUsersWithPagination(page, limit) {
    return __async(this, null, function* () {
      const offset = (page - 1) * limit;
      const totalElements = yield prisma.user.count();
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
          updatedAt: true
        },
        orderBy: {
          id: "asc"
        }
      });
      const totalPages = Math.ceil(totalElements / limit);
      return {
        content,
        page,
        limit,
        totalElements,
        totalPages
      };
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserRepository
});

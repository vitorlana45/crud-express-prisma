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
  default: () => application_default
});
module.exports = __toCommonJS(application_exports);
var import_express2 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);

// src/routes/router.ts
var import_express = require("express");

// src/models/user.model.ts
var User = class {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
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

// src/service/impl/user.service.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);

// src/dto/response/user.dto.response.ts
var UserResponse = class {
  constructor(id, name, email, role, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
};

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

// src/dto/response/update.user.response.ts
var UpdateUserResponse = class {
  constructor(id, name, email, role, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
};

// src/service/impl/user.service.ts
import_dotenv.default.config();
var UserService = class {
  constructor(repository) {
    this.createUser = (data) => __async(this, null, function* () {
      const { name, email, password } = data;
      const encryptPassword = yield import_bcrypt.default.hash(password + this.secretKey, 10);
      const entity = new User(name, email, encryptPassword);
      if ((yield this.repository.findUserByEmail(email)) !== null) {
        throw new UserAlreadyExist("User already exists");
      }
      const result = yield this.repository.createUser(entity);
      return result.id;
    });
    this.getUserByEmail = (email) => __async(this, null, function* () {
      const user = yield this.repository.findUserByEmail(email);
      if (!user) {
        throw new UserNotFound();
      }
      return new UserResponse(user.id, user.name, user.email, user.role, user.createdAt, user.updatedAt);
    });
    this.getUserByID = (id) => __async(this, null, function* () {
      const user = yield this.repository.findUserById(id);
      if (!user) {
        throw new UserNotFound();
      }
      return new UserResponse(user.id, user.name, user.email, user.role, user.createdAt, user.updatedAt);
    });
    this.updateUser = (id, data) => __async(this, null, function* () {
      const user = yield this.repository.getUserByIdForUpdate(id);
      if (!user) {
        throw new UserNotFound();
      }
      let entity = user;
      if (data.email !== null) {
        if (yield this.repository.existUserByEmail(data.email)) {
          throw new UserAlreadyExist(`User with email '${data.email}' already exists`);
        }
        entity.email = data.email;
      }
      if (data.name !== null) {
        entity.name = data.name;
      }
      if (data.password !== null) {
        entity.password = yield import_bcrypt.default.hash(data.password + this.secretKey, 10);
      }
      const updatedUser = yield this.repository.updateUser(id, entity);
      return new UpdateUserResponse(updatedUser.id, updatedUser.name, updatedUser.email, updatedUser.role, updatedUser.createdAt, updatedUser.updatedAt);
    });
    this.deleteUserById = (id) => __async(this, null, function* () {
      yield this.existsUserWithId(id);
      yield this.repository.deleteUser(id);
    });
    this.existsUserWithId = (id) => __async(this, null, function* () {
      if (!(yield this.repository.existsUserWithId(id))) {
        throw new UserNotFound();
      }
    });
    this.repository = repository || new UserRepository();
    if (!process.env.SECRET_KEY) {
      throw new HttpErrorHandler(500, "SECRET_KEY is not defined in the environment variables");
    }
    ;
    this.secretKey = process.env.SECRET_KEY;
  }
  getAllUserWithPagination(page, limit) {
    return __async(this, null, function* () {
      if (page < 1 || limit < 1)
        throw new InvalidPaginationParams("Page and limit must be greater than 0");
      const obj = yield this.repository.getAllUsersWithPagination(page, limit);
      const newListResponse = obj.content.filter((user) => user.id && user.name && user.email && user.role && user.createdAt && user.updatedAt).map((user) => new UserResponse(user.id, user.name, user.email, user.role, user.createdAt, user.updatedAt));
      obj.content = newListResponse;
      return obj;
    });
  }
};

// src/controllers/user.controller.ts
var userService = new UserService();
var registerUser = (req, res, next) => __async(void 0, null, function* () {
  try {
    const id = yield userService.createUser(req.body);
    res.header("application/json");
    res.header("Location", `/users/${id}`);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});
var getUserByEmail = (req, res, next) => __async(void 0, null, function* () {
  const email = req.params.email;
  try {
    const user = yield userService.getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
var getUserByID = (req, res, next) => __async(void 0, null, function* () {
  const id = req.params.id;
  try {
    const user = yield userService.getUserByID(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
var updateUser = (req, res, next) => __async(void 0, null, function* () {
  const id = req.params.id;
  try {
    const data = yield userService.updateUser(id, req.body);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});
var deleteUser = (req, res, next) => __async(void 0, null, function* () {
  try {
    yield userService.deleteUserById(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
var getAllUsersPagination = (req, res, next) => __async(void 0, null, function* () {
  const { page, limit } = req.query;
  try {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
      throw new InvalidPaginationParams("Page and limit must be valid numbers greater than 0");
    }
    const users = yield userService.getAllUserWithPagination(pageNum, limitNum);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// src/routes/router.ts
var router = (0, import_express.Router)();
router.post("/users", registerUser);
router.get("/users/:email", getUserByEmail);
router.get("/users/get/:id", getUserByID);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.get("/users", getAllUsersPagination);
var router_default = router;

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

// src/application.ts
function createApplication() {
  const app = (0, import_express2.default)();
  app.use(import_express2.default.json());
  app.use("/api", router_default);
  app.use((0, import_cors.default)());
  app.use(errorHandler);
  return app;
}
var application_default = createApplication;

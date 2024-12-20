"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserResponse = void 0;
class UpdateUserResponse {
    constructor(id, name, email, role, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.UpdateUserResponse = UpdateUserResponse;

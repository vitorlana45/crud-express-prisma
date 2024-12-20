"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    constructor(repo) {
        this.repo = repo;
    }
    login({ email, password }) {
        throw new Error('Method not implemented.');
    }
}
exports.AuthService = AuthService;

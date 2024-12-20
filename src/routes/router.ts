import { Router } from 'express'
import { validateMiddleware } from '../middleware/validateMiddleware';
import { CreateUserDto } from '../dto/request/create.user.request';
import { UpdateUserRequest } from '../dto/request/update.user.request';

import { container } from '../container/dependencies';


const router = Router();

const userController = container.userController;
const authController = container.authController;

router.post("/users", validateMiddleware("body", CreateUserDto), userController.registerUser.bind(userController));
router.get("/users/get/:id", userController.getUserByID.bind(userController));
router.get("/users/:email", userController.getUserByEmail.bind(userController));
router.patch("/users/:id", validateMiddleware("body", UpdateUserRequest), userController.updateUser.bind(userController))
router.delete("/users/:id", userController.deleteUser.bind(userController));
router.get("/users", userController.getAllUsersPagination.bind(userController));


// auth routes
router.post("/auth/login", authController.login.bind(authController));


export default router;
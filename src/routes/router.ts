import { Router } from 'express'
import { validateMiddleware } from '../middleware/validateMiddleware';
import { CreateUserDto } from '../dto/request/create.user.request';
import { UpdateUserRequest } from '../dto/request/update.user.request';
import { roleMiddleware, authMiddleware } from '../middleware/auth.middleware';

import { container } from '../container/dependencies';
import { Role } from '@prisma/client';

const router = Router();

const userController = container.userController;
const authController = container.authController;

router.post(
  "/users",
  authMiddleware,
  roleMiddleware([Role.ADMIN, Role.USER]),
  validateMiddleware("body", CreateUserDto),
  userController.registerUser.bind(userController)
);

router.get(
  "/users/get/:id",
  authMiddleware,
  roleMiddleware([Role.ADMIN, Role.USER]),
  userController.getUserByID.bind(userController)
);

router.get(
  "/users/:email",
  authMiddleware,
  roleMiddleware([Role.USER, Role.ADMIN]),
  userController.getUserByEmail.bind(userController)
);

router.patch(
  "/users/:id",
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  validateMiddleware("body", UpdateUserRequest),
  userController.updateUser.bind(userController)
);

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  userController.deleteUser.bind(userController)
);

router.get(
  "/users",
  authMiddleware,
  roleMiddleware([Role.ADMIN, Role.USER]),
  userController.getAllUsersPagination.bind(userController)
);

// auth routes
router.post(
  "/auth/login",
  authController.login.bind(authController)
);

export default router;
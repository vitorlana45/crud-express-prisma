import { Router } from 'express'
import { registerUser, getUserByEmail, getUserByID, updateUser, deleteUser, getAllUsersPagination } from '../controllers/user.controller'
import { validateMiddleware } from '../middleware/validateMiddleware';
import { CreateUserDto } from '../dto/request/create.user.request';
import { UpdateUserRequest } from '../dto/request/update.user.request';

const router = Router();

router.post("/users", validateMiddleware("body", CreateUserDto), registerUser)
router.get("/users/:email", getUserByEmail)
router.get("/users/get/:id", getUserByID)
router.patch("/users/:id", validateMiddleware("body", UpdateUserRequest), updateUser)
router.delete("/users/:id", deleteUser)
router.get("/users", getAllUsersPagination);


export default router;
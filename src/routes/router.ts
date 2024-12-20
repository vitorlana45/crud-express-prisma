import { AuthService, AuthController } from './../controllers/auth.controller';
import { TokenService } from './../service/impl/token.service';
import { Router } from 'express'
import { validateMiddleware } from '../middleware/validateMiddleware';
import { CreateUserDto } from '../dto/request/create.user.request';
import { UpdateUserRequest } from '../dto/request/update.user.request';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../service/impl/user.service';
import { UserRepository } from '../repositories/user.repository';



const router = Router();
// TODO: renomear os nomes depois
// TODO: compreender melhor o bind 
// estrutura hexagonal, adapters

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);
const TokenServiceInstance = new TokenService(process.env.JWT_SECRET!);
const AuthServiceInstance = new AuthService(repository, TokenServiceInstance);
const authControllerInstance = new AuthController(AuthServiceInstance);


// entender melhor sobre o BIND e o async retonar CallBacks e ter o seu proprio this
router.post("/users", validateMiddleware("body", CreateUserDto), controller.registerUser.bind(controller));
router.get("/users/get/:id", controller.getUserByID.bind(controller));
router.get("/users/:email", controller.getUserByEmail.bind(controller));
router.patch("/users/:id", validateMiddleware("body", UpdateUserRequest), controller.updateUser.bind(controller))
router.delete("/users/:id", controller.deleteUser.bind(controller));
router.get("/users", controller.getAllUsersPagination.bind(controller));


// auth routes
router.post("/auth/login", authControllerInstance.login.bind(authControllerInstance));


export default router;
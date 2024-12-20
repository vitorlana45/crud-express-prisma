import { AuthService, AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../service/impl/user.service';
import { UserRepository } from '../repositories/user.repository';
import { TokenService } from '../security/token.service';

class DependencyContainer {
  private _userRepository: UserRepository;
  private _userService: UserService;
  private _userController: UserController;
  private _tokenService: TokenService;
  private _authService: AuthService;
  private _authController: AuthController;

  constructor() {
    this._userRepository = new UserRepository();
    this._userService = new UserService(this._userRepository);
    this._userController = new UserController(this._userService);
    this._tokenService = new TokenService(process.env.JWT_SECRET!);
    this._authService = new AuthService(this._userRepository, this._tokenService);
    this._authController = new AuthController(this._authService);
  }

  get userRepository(): UserRepository {
    return this._userRepository;
  }

  get userService(): UserService {
    return this._userService;
  }

  get userController(): UserController {
    return this._userController;
  }

  get tokenService(): TokenService {
    return this._tokenService;
  }

  get authService(): AuthService {
    return this._authService;
  }

  get authController(): AuthController {
    return this._authController;
  }
}

// Exporta uma única instância do container
export const container = new DependencyContainer();
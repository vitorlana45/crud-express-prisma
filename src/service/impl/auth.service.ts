import { AuthRequestDto } from "../../dto/request/auth.request";
import { LoginResponseDto } from "../../dto/response/login.response";
import { CredentialsNotMatch, UserNotFound } from "../../exceptions/user-errors";
import { UserRepository } from "../../repositories/user.repository";
import bcrypt from 'bcrypt';
import { TokenService } from "./token.service";


export class AuthService {

  constructor(private repository: UserRepository, private readonly tokenService: TokenService) { }

  async login({ email, password }: AuthRequestDto): Promise<LoginResponseDto> {

    const findUser = await this.repository.findUserByEmail(email);

    if (!findUser) throw new UserNotFound();

    const comparePassword = await bcrypt.compare(password, findUser.password);

    if (!comparePassword) {
      throw new CredentialsNotMatch();
    }

    const jwt = await this.tokenService.generate({ email: findUser.email, id: findUser.id });

    return { token: jwt };
  }
}
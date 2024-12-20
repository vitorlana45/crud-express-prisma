import { AuthRequestDto } from '../dto/request/auth.request'
import { LoginResponseDto } from '../dto/response/login.response';

export interface IAuthService {
  login({ email, password }: AuthRequestDto): Promise<LoginResponseDto>;
}
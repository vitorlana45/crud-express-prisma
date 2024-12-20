import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthRequestDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}
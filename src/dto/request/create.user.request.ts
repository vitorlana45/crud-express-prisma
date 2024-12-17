import "reflect-metadata";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "Name is required" })
  @Length(3, 50, { message: "Name must be between 3 and 50 characters" })
  @IsString({ message: "Name must be a string" })
  name: string;

  @IsEmail({}, { message: "Invalid email" })
  email: string;

  @IsNotEmpty({ message: "Password is required" })
  @Length(6, 50, { message: "Password must be between 6 and 50 characters" })
  @IsString({ message: "password must be a string" })
  password: string;

}
import { IsEmail, IsString } from "class-validator";

export class UpdateUserRequest {

  @IsString({ message: "Name must be a string" })
  name?: string;
  @IsEmail()
  email?: string;
  password?: string;

}
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RegisterRequest } from '../proto/auth.pb';

export class RegisterRequestDto implements RegisterRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

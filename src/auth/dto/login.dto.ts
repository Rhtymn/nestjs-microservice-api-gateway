import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginRequest } from '../proto/auth.pb';

export class LoginRequestDto implements LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

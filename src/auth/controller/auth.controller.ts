import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { RegisterRequestDto } from '../dto/register.dto';
import {
  GetMeResponse,
  LoginResponse,
  RegisterResponse,
  User as UserPayload,
} from '../proto/auth.pb';
import { LoginRequestDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
import { firstValueFrom } from 'rxjs';
import { Response } from 'express';
import { AuthGuard } from '../guard/auth.guard';
import { User } from '../decorator/user.decorator';
import { AUTH_SERVICE } from 'libs/common';

@Controller('auth')
export class AuthController {
  @Inject(AUTH_SERVICE)
  private readonly authService: AuthService;

  @Post('register')
  private async register(
    @Body() registerRequest: RegisterRequestDto,
    @Res() res: Response,
  ): Promise<Response<RegisterResponse>> {
    const observable = await this.authService.register(registerRequest);
    const response = await firstValueFrom(observable);
    return res.status(response.status).json(response);
  }

  @Post('login')
  private async login(
    @Body() loginRequest: LoginRequestDto,
    @Res() res: Response,
  ): Promise<Response<LoginResponse>> {
    const observable = await this.authService.login(loginRequest);
    const response = await firstValueFrom(observable);
    return res.status(response.status).json(response);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  private async me(
    @User() user: UserPayload,
    @Res() res: Response,
  ): Promise<Response<GetMeResponse>> {
    return res.status(HttpStatus.OK).json(user);
  }
}

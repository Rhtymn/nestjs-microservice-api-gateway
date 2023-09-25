import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  GetMeRequest,
  GetMeResponse,
  LoginResponse,
  RegisterResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '../proto/auth.pb';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { RegisterRequestDto } from '../dto/register.dto';
import { LoginRequestDto } from '../dto/login.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private svc: AuthServiceClient;

  constructor(@Inject(AUTH_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  public async register(
    registerRequest: RegisterRequestDto,
  ): Promise<Observable<RegisterResponse>> {
    return this.svc.register(registerRequest);
  }

  public async login(
    loginRequest: LoginRequestDto,
  ): Promise<Observable<LoginResponse>> {
    return this.svc.login(loginRequest);
  }

  public async validateToken(
    validateTokenRequest: ValidateTokenRequest,
  ): Promise<Observable<ValidateTokenResponse>> {
    return this.svc.validateToken(validateTokenRequest);
  }

  public async getMe(
    getMeRequest: GetMeRequest,
  ): Promise<Observable<GetMeResponse>> {
    return this.svc.getMe(getMeRequest);
  }
}

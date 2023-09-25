import {
  CanActivate,
  Injectable,
  Inject,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { GetMeResponse, ValidateTokenResponse } from '../proto/auth.pb';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AUTH_SERVICE } from 'libs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AUTH_SERVICE)
  private readonly authService: AuthService;

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token: string | undefined =
      request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    const isValidToken: ValidateTokenResponse = await firstValueFrom(
      await this.authService.validateToken({ token }),
    );

    if (isValidToken.status == HttpStatus.UNAUTHORIZED) {
      return false;
    }

    const response: GetMeResponse = await firstValueFrom(
      await this.authService.getMe({ token }),
    );

    request.user = response.user;

    return true;
  }
}

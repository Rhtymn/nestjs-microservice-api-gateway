import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from './proto/auth.pb';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { AUTH_SERVICE } from 'libs/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: AUTH_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-proto/proto/auth.proto',
        },
      },
    ]),
  ],
  providers: [{ provide: AUTH_SERVICE, useClass: AuthService }],
  controllers: [AuthController],
})
export class AuthModule {}

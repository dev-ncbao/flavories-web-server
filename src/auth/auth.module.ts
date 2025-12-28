import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stratergy';
import { ConfigService } from '@nestjs/config';
import { APP_CONSTANTS } from 'src/common/constants/app.constants';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                global: true,
                signOptions: { expiresIn: APP_CONSTANTS.JWT_EXPIRES_IN }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInRequest } from './auth.dto';
import { isValidEmail } from 'src/common/utils/emailUtils';
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(signInDto: SignInRequest): Promise<string> {
        let user: User | null;
        const isEmailIdentifier: boolean = isValidEmail(
            signInDto.usernameOrEmail
        );

        if (isEmailIdentifier) {
            user = await this.usersService.findOneByEmailAndPassword(
                signInDto.usernameOrEmail,
                signInDto.password
            );
        } else {
            user = await this.usersService.findOneByUsernameAndPassword(
                signInDto.usernameOrEmail,
                signInDto.password
            );
        }

        if (!user) {
            throw new UnauthorizedException(
                `${isEmailIdentifier ? 'Email' : 'Username'} or password is incorrect`
            );
        }

        const token: string = await this.jwtService.signAsync({
            sub: Number(user.id)
        });

        return token;
    }
}

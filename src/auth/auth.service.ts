import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(signInDto: SignInRequestDto): Promise<string> {
        const user = await this.usersService.findOneByUsernameAndPassword(
            signInDto.username,
            signInDto.password,
        );

        console.log('ncbao', user);

        if (!user) {
            throw new UnauthorizedException(
                'Username or password is not valid',
            );
        }

        const token: string = await this.jwtService.signAsync({
            sub: Number(user.id),
            email: user.email,
            username: user.username,
        });

        return token;
    }
}

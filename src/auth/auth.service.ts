import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInRequest, SignUpRequest } from './auth.dto';
import { isValidEmail } from 'src/common/utils/email.utils';
import { User } from 'src/users/user.model';
import { APP_CONSTANTS } from 'src/common/constants/app.constants';

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
            sub: Number(user.dataValues.userId)
        });

        return token;
    }

    async signUp(signUpDto: SignUpRequest): Promise<void> {
        const validationMessages: string[] = [];

        if (!signUpDto.firstName) {
            validationMessages.push('firstName could not be empty.');
        }

        if (!signUpDto.lastName) {
            validationMessages.push('lastName could not be empty.');
        }

        if (!signUpDto.email) {
            validationMessages.push('email could not be empty.');
        } else if (await this.usersService.findOneByEmail(signUpDto.email)) {
            throw new ConflictException('email is already exist.');
        }

        if (!signUpDto.username) {
            validationMessages.push('username could not be empty.');
        } else if (
            await this.usersService.findOneByUsername(signUpDto.username)
        ) {
            throw new ConflictException('username is already exist.');
        }

        if (!signUpDto.password) {
            validationMessages.push('password could not be empty.');
        }

        if (!signUpDto.confirmPassword) {
            validationMessages.push('confirmPassword could not be empty.');
        }

        if (signUpDto.password !== signUpDto.confirmPassword) {
            validationMessages.push('password is not matched confirmPassword.');
        }

        if (validationMessages.length) {
            throw new BadRequestException(validationMessages);
        }

        await this.usersService.createUser(
            signUpDto.firstName,
            signUpDto.lastName,
            signUpDto.email,
            signUpDto.username,
            signUpDto.password
        );
    }
}

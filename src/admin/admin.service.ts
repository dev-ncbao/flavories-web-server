'use strict';

import {
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { AdminSignInRequest } from './admin.dto';
import { isValidEmail } from 'src/common/utils/email.utils';
import { User } from 'src/users/user.model';
import { APP_CONSTANTS } from 'src/common/constants/app.constants';

@Injectable()
export class AdminService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(signInDto: AdminSignInRequest): Promise<string> {
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

        // Check if user is admin (roleId = 1)
        if (user.dataValues.roleId !== Number(APP_CONSTANTS.ADMIN_ROLE_ID)) {
            throw new UnauthorizedException(
                'Access denied. Admin privileges required.'
            );
        }

        const token: string = await this.jwtService.signAsync({
            sub: Number(user.dataValues.userId)
        });

        return token;
    }
}


import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/users.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User) private userModel: typeof User
    ) {}

    async login(user: LoginUserDto) {
        const foundUser = await this.userModel.findOne({
            where: { username: user.username, password: user.password }
        });

        if (foundUser) {
            const payload = { username: foundUser.username, sub: foundUser.id };
            return { access_token: this.jwtService.sign(payload) };
        }

        return null;
    }
}

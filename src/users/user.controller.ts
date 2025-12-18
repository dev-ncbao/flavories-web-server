import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { AuthenticatedRequest } from './../common/types/authenticated-user';

@ApiBearerAuth('accessToken')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private userService: UserService) {}

    @Get('profile')
    async getProfile(@Request() req: AuthenticatedRequest) {
        const foundUser = await this.userService.findOneById(req.user.id);

        const response: UserDto = {
            email: foundUser.dataValues.email,
            username: foundUser.dataValues.username,
            firstName: foundUser.dataValues.firstName,
            lastName: foundUser.dataValues.lastName,
            genderId: foundUser.dataValues.genderId,
            avatarUrl: foundUser.dataValues.avatarUrl,
            bio: foundUser.dataValues.bio
        };

        return response;
    }
}

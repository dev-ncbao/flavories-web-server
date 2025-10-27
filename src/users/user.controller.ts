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

        console.log('Found user for profile:', foundUser);

        const response: UserDto = {
            email: foundUser.getEmail(),
            username: foundUser.getUsername(),
            firstName: foundUser.getFirstName(),
            lastName: foundUser.getLastName(),
            gender: foundUser.getGender(),
            avatarUrl: foundUser.getAvatarUrl(),
            bio: foundUser.getBio()
        };

        return response;
    }
}

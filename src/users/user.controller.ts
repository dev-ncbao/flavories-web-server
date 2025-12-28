import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { AuthenticatedRequest } from './../common/types/authenticated-user';

@ApiBearerAuth('accessToken')
@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private userService: UserService) {}

    @Get('profile')
    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
    async getProfile(@Request() req: AuthenticatedRequest) {
        const foundUser = await this.userService.findOneById(req.user.userId);

        const response: UserDto = {
            userId: foundUser.dataValues.userId,
            email: foundUser.dataValues.email,
            username: foundUser.dataValues.username,
            firstName: foundUser.dataValues.firstName,
            lastName: foundUser.dataValues.lastName,
            genderId: foundUser.dataValues.genderId,
            avatarUrl: foundUser.dataValues.avatarUrl,
            bio: foundUser.dataValues.bio,
            roleId: foundUser.dataValues.roleId
        };

        return response;
    }

    @Get('recipes')
    @ApiOperation({ summary: 'Get recipes created by the authenticated user' })
    @ApiResponse({ status: 200, description: 'User recipes retrieved successfully' })
    async getMyRecipes(@Request() req: AuthenticatedRequest) {
        return this.userService.findRecipesByUserId(req.user.userId);
    }

    @Get('courses')
    @ApiOperation({ summary: 'Get courses created by the authenticated user' })
    @ApiResponse({ status: 200, description: 'User courses retrieved successfully' })
    async getMyCourses(@Request() req: AuthenticatedRequest) {
        return this.userService.findCoursesByUserId(req.user.userId);
    }
}

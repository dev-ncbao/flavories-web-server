'use strict';

import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
    AdminSignInRequest,
    AdminSignInResponse
} from './admin.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'Admin login' })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        type: AdminSignInResponse
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid credentials or not an admin'
    })
    async signIn(@Body() signInDto: AdminSignInRequest): Promise<AdminSignInResponse> {
        const token: string = await this.adminService.signIn(signInDto);

        const response: AdminSignInResponse = {
            accessToken: token
        };

        return response;
    }
}


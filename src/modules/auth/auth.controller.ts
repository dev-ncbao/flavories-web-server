import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from '../users/users.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() user: LoginUserDto) {
        return this.authService.login(user);
    }
}

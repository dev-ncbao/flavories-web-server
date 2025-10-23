import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    Get
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequest, SignInResponse } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInRequest) {
        const token: string = await this.authService.signIn(signInDto);

        const response: SignInResponse = {
            accessToken: token
        };

        return response;
    }

    @Get('check')
    isSignedIn(): string {
        return 'You are signed in!';
    }
}

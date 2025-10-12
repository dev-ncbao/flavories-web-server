import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignInResponseDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInRequestDto) {
        const token: string = await this.authService.signIn(signInDto);

        const response: SignInResponseDto = {
            access_token: token,
        };

        return response;
    }

    @Get('check')
    isSignedIn(): string {
        return 'You are signed in!';
    }
}

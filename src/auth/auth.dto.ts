import { ApiProperty } from '@nestjs/swagger';

export class SignInRequest {
    @ApiProperty()
    usernameOrEmail: string;

    @ApiProperty()
    password: string;
}

export class SignInResponse {
    accessToken: string;
}

export class TokenPayload {
    sub: number;
}

export class SignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

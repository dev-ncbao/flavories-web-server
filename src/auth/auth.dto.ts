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

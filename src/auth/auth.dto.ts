import { ApiProperty } from '@nestjs/swagger';

export class SignInRequestDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}

export class SignInResponseDto {
    access_token: string;
}

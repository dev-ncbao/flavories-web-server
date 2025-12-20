'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class AdminSignInRequest {
    @ApiProperty({ description: 'Username or email' })
    usernameOrEmail: string;

    @ApiProperty({ description: 'Password' })
    password: string;
}

export class AdminSignInResponse {
    @ApiProperty()
    accessToken: string;
}


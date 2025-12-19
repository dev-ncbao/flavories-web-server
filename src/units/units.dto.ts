'use strict';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUnitDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    abbreviation?: string;
}

export class UpdateUnitDto extends PartialType(CreateUnitDto) {}


'use strict';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateIngredientDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    unitId?: number | null;
}

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {}


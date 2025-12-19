'use strict';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateRecipeStepDto {
    @ApiProperty()
    recipeId: number;

    @ApiProperty()
    stepNumber: number;

    @ApiProperty()
    description: string;
}

export class UpdateRecipeStepDto extends PartialType(CreateRecipeStepDto) {}


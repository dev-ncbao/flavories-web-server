'use strict';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateRecipeIngredientDto {
    @ApiProperty()
    ingredientId: number;

    @ApiProperty()
    recipeId: number;

    @ApiProperty({ required: false, description: 'Amount of ingredient (e.g., grams)' })
    amount?: number;
}

export class UpdateRecipeIngredientDto extends PartialType(
    class {
        @ApiProperty({ required: false })
        amount?: number;
    }
) {}


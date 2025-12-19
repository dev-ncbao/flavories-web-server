'use strict';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCourseIngredientDto {
    @ApiProperty()
    ingredientId: number;

    @ApiProperty()
    courseId: number;

    @ApiProperty({ required: false, description: 'Amount of ingredient (e.g., grams)' })
    amount?: number;
}

export class UpdateCourseIngredientDto extends PartialType(
    class {
        // @ApiProperty({ required: false })
        amount?: number;
    }
) {}


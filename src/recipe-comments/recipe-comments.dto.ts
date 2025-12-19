'use strict';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateRecipeCommentDto {
    @ApiProperty()
    recipeId: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    comment: string;
}

export class UpdateRecipeCommentDto extends PartialType(CreateRecipeCommentDto) {}


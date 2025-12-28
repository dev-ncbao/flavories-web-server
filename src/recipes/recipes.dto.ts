'use strict';

import { ApiProperty, PartialType } from '@nestjs/swagger';

class IngredientUnitDto {
    @ApiProperty()
    unitId: number;

    @ApiProperty()
    abbreviation: string;
}

class IngredientDto {
    @ApiProperty()
    ingredientId: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    unit: IngredientUnitDto;
}

export class RecipeIngredientItemDto {
    @ApiProperty()
    amount: string;

    @ApiProperty()
    ingredient: IngredientDto;
}

export class RecipeStepItemDto {
    @ApiProperty()
    stepNumber: number;

    @ApiProperty()
    description: string;
}

export class CreateRecipeDto {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    thumbnailUrl?: string;

    @ApiProperty({ required: false, default: 0 })
    viewCount?: number;

    @ApiProperty({ required: false, default: 0 })
    hotRating?: number;

    @ApiProperty({ required: false })
    linkedCourseId?: number | null;

    @ApiProperty({ type: [RecipeIngredientItemDto], required: false })
    recipeIngredients?: RecipeIngredientItemDto[];

    @ApiProperty({ type: [RecipeStepItemDto], required: false })
    recipeSteps?: RecipeStepItemDto[];
}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}


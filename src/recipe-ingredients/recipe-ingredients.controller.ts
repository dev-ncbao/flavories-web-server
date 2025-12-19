'use strict';

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import {
    CreateRecipeIngredientDto,
    UpdateRecipeIngredientDto
} from './recipe-ingredients.dto';

@ApiTags('recipe-ingredients')
@Controller('recipe-ingredients')
export class RecipeIngredientsController {
    constructor(private readonly recipeIngredientsService: RecipeIngredientsService) {}

    @Post()
    async create(@Body() dto: CreateRecipeIngredientDto) {
        return this.recipeIngredientsService.create(dto);
    }

    @Get()
    async findAll() {
        return this.recipeIngredientsService.findAll();
    }

    @Get(':recipeId/:ingredientId')
    async findOne(
        @Param('recipeId', ParseIntPipe) recipeId: number,
        @Param('ingredientId', ParseIntPipe) ingredientId: number
    ) {
        return this.recipeIngredientsService.findOne(recipeId, ingredientId);
    }

    @Patch(':recipeId/:ingredientId')
    async update(
        @Param('recipeId', ParseIntPipe) recipeId: number,
        @Param('ingredientId', ParseIntPipe) ingredientId: number,
        @Body() dto: UpdateRecipeIngredientDto
    ) {
        return this.recipeIngredientsService.update(recipeId, ingredientId, dto);
    }

    @Delete(':recipeId/:ingredientId')
    async remove(
        @Param('recipeId', ParseIntPipe) recipeId: number,
        @Param('ingredientId', ParseIntPipe) ingredientId: number
    ) {
        await this.recipeIngredientsService.remove(recipeId, ingredientId);
        return { message: 'Recipe ingredient deleted' };
    }
}


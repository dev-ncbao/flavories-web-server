'use strict';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RecipeIngredient } from './recipe-ingredients.model';
import {
    CreateRecipeIngredientDto,
    UpdateRecipeIngredientDto
} from './recipe-ingredients.dto';

@Injectable()
export class RecipeIngredientsService {
    constructor(
        @InjectModel(RecipeIngredient)
        private readonly recipeIngredientModel: typeof RecipeIngredient
    ) {}

    async create(dto: CreateRecipeIngredientDto): Promise<RecipeIngredient> {
        return this.recipeIngredientModel.create({ ...dto });
    }

    async findAll(): Promise<RecipeIngredient[]> {
        return this.recipeIngredientModel.findAll();
    }

    async findOne(recipeId: number, ingredientId: number): Promise<RecipeIngredient> {
        const item = await this.recipeIngredientModel.findOne({
            where: { recipeId, ingredientId }
        });
        if (!item) {
            throw new NotFoundException('Recipe ingredient not found');
        }
        return item;
    }

    async update(
        recipeId: number,
        ingredientId: number,
        dto: UpdateRecipeIngredientDto
    ): Promise<RecipeIngredient> {
        const item = await this.findOne(recipeId, ingredientId);
        await item.update({ ...dto });
        return item;
    }

    async remove(recipeId: number, ingredientId: number): Promise<void> {
        const item = await this.findOne(recipeId, ingredientId);
        await item.destroy();
    }
}


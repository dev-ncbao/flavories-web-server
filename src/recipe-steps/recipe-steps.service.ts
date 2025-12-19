'use strict';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RecipeStep } from './recipe-steps.model';
import {
    CreateRecipeStepDto,
    UpdateRecipeStepDto
} from './recipe-steps.dto';
import { Recipe } from 'src/recipes/recipes.model';

@Injectable()
export class RecipeStepsService {
    constructor(
        @InjectModel(RecipeStep)
        private readonly recipeStepModel: typeof RecipeStep
    ) {}

    async create(dto: CreateRecipeStepDto): Promise<RecipeStep> {
        return this.recipeStepModel.create({ ...dto });
    }

    async findAll(): Promise<RecipeStep[]> {
        return this.recipeStepModel.findAll({
            include: [
                {
                    model: Recipe,
                    attributes: ['recipeId', 'name', 'thumbnailUrl']
                }
            ],
            order: [
                ['recipeId', 'ASC'],
                ['stepNumber', 'ASC']
            ]
        });
    }

    async findByRecipeId(recipeId: number): Promise<RecipeStep[]> {
        return this.recipeStepModel.findAll({
            where: { recipeId },
            include: [
                {
                    model: Recipe,
                    attributes: ['recipeId', 'name', 'thumbnailUrl']
                }
            ],
            order: [['stepNumber', 'ASC']]
        });
    }

    async findOne(id: number): Promise<RecipeStep> {
        const item = await this.recipeStepModel.findByPk(id, {
            include: [
                {
                    model: Recipe,
                    attributes: ['recipeId', 'name', 'thumbnailUrl']
                }
            ]
        });
        if (!item) {
            throw new NotFoundException('Recipe step not found');
        }
        return item;
    }

    async update(id: number, dto: UpdateRecipeStepDto): Promise<RecipeStep> {
        const item = await this.findOne(id);
        await item.update({ ...dto });
        return item;
    }

    async remove(id: number): Promise<void> {
        const item = await this.findOne(id);
        await item.destroy();
    }
}


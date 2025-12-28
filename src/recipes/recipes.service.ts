'use strict';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Recipe } from './recipes.model';
import {
    CreateRecipeDto,
    UpdateRecipeDto,
    RecipeIngredientItemDto,
    RecipeStepItemDto
} from './recipes.dto';
import { User } from 'src/users/user.model';
import { RecipeIngredient } from 'src/recipe-ingredients/recipe-ingredients.model';
import { Ingredient } from 'src/ingredients/ingredients.model';
import { Unit } from 'src/units/units.model';
import { RecipeComment } from 'src/recipe-comments/recipe-comments.model';
import { RecipeStep } from 'src/recipe-steps/recipe-steps.model';
import { USER_ATTRIBUTES, getStartOfCurrentMonth } from 'src/common/utils/sequelize.utils';
import { APP_CONSTANTS } from 'src/common/constants/app.constants';

@Injectable()
export class RecipesService {
    constructor(
        @InjectModel(Recipe)
        private readonly recipeModel: typeof Recipe,
        @InjectModel(RecipeIngredient)
        private readonly recipeIngredientModel: typeof RecipeIngredient,
        @InjectModel(RecipeStep)
        private readonly recipeStepModel: typeof RecipeStep
    ) {}

    async create(dto: CreateRecipeDto): Promise<Recipe> {
        // Extract nested data
        const recipeIngredients = dto.recipeIngredients as RecipeIngredientItemDto[] | undefined;
        const recipeSteps = dto.recipeSteps as RecipeStepItemDto[] | undefined;
        const recipeData = {
            userId: dto.userId,
            name: dto.name,
            description: dto.description,
            thumbnailUrl: dto.thumbnailUrl,
            viewCount: dto.viewCount,
            hotRating: dto.hotRating,
            linkedCourseId: dto.linkedCourseId
        };

        // Create the recipe
        const recipe = await this.recipeModel.create(recipeData);

        // Create recipe ingredients if provided
        if (recipeIngredients && Array.isArray(recipeIngredients) && recipeIngredients.length > 0) {
            const ingredientsToCreate: Array<{
                recipeId: number;
                ingredientId: number;
                amount: number | null;
            }> = [];
            for (const item of recipeIngredients) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                const ingredientId = item?.ingredient?.ingredientId;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                const amount = item?.amount;
                if (typeof ingredientId === 'number') {
                    ingredientsToCreate.push({
                        recipeId: recipe.recipeId,
                        ingredientId,
                        amount: amount ? parseFloat(String(amount)) : null
                    });
                }
            }
            await this.recipeIngredientModel.bulkCreate(ingredientsToCreate);
        }

        // Create recipe steps if provided
        if (recipeSteps && Array.isArray(recipeSteps) && recipeSteps.length > 0) {
            const stepsToCreate: Array<{
                recipeId: number;
                stepNumber: number;
                description: string;
            }> = [];
            for (const step of recipeSteps) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                const stepNumber = step?.stepNumber;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                const description = step?.description;
                if (typeof stepNumber === 'number' && typeof description === 'string') {
                    stepsToCreate.push({
                        recipeId: recipe.recipeId,
                        stepNumber,
                        description
                    });
                }
            }
            await this.recipeStepModel.bulkCreate(stepsToCreate);
        }

        // Return recipe with all associations
        return this.findOne(recipe.recipeId);
    }

    async findAll(): Promise<Recipe[]> {
        return this.recipeModel.findAll({
            include: [
                {
                    model: User,
                    attributes: [...USER_ATTRIBUTES]
                }
            ]
        });
    }

    async findOne(recipeId: number): Promise<Recipe> {
        const recipe = await this.recipeModel.findByPk(recipeId, {
            include: [
                {
                    model: User,
                    attributes: USER_ATTRIBUTES.filter(attr => attr !== 'userId')
                },
                {
                    model: RecipeIngredient,
                    attributes: ['amount'],
                    include: [
                        {
                            model: Ingredient,
                            attributes: ['name'],
                            include: [
                                { model: Unit, attributes: ['abbreviation'] }
                            ]
                        }
                    ]
                },
                {
                    model: RecipeComment,
                    attributes: ['recipeCommentId', 'comment', 'createdAt'],
                    include: [
                        {
                            model: User,
                            attributes: [
                                'username',
                                'avatarUrl',
                                'firstName',
                                'lastName'
                            ]
                        }
                    ]
                },
                {
                    model: RecipeStep,
                    attributes: ['stepNumber', 'description']
                }
            ]
        });
        if (!recipe) {
            throw new NotFoundException('Recipe not found');
        }
        return recipe;
    }

    async update(recipeId: number, dto: UpdateRecipeDto): Promise<Recipe> {
        const recipe = await this.findOne(recipeId);
        await recipe.update({ ...dto });
        return recipe;
    }

    async remove(recipeId: number): Promise<void> {
        const recipe = await this.findOne(recipeId);
        await recipe.destroy();
    }

    async getTopThisMonth(limit: number = APP_CONSTANTS.DEFAULT_TOP_LIMIT): Promise<Recipe[]> {
        const startOfMonth = getStartOfCurrentMonth();
        return this.recipeModel.findAll({
            where: {
                createdAt: { [Op.gte]: startOfMonth }
            },
            order: [
                ['likeCount', 'DESC'],
                ['createdAt', 'DESC']
            ],
            limit,
            include: [
                {
                    model: User,
                    attributes: [...USER_ATTRIBUTES]
                }
            ]
        });
    }

    async getNewestThisMonth(limit: number = APP_CONSTANTS.DEFAULT_TOP_LIMIT): Promise<Recipe[]> {
        const startOfMonth = getStartOfCurrentMonth();
        return this.recipeModel.findAll({
            where: {
                createdAt: { [Op.gte]: startOfMonth }
            },
            order: [['createdAt', 'DESC']],
            limit,
            include: [
                {
                    model: User,
                    attributes: [...USER_ATTRIBUTES]
                }
            ]
        });
    }

    async getTopAllTime(limit: number = APP_CONSTANTS.DEFAULT_TOP_LIMIT): Promise<Recipe[]> {
        return this.recipeModel.findAll({
            order: [
                ['likeCount', 'DESC'],
                ['createdAt', 'DESC']
            ],
            limit,
            include: [
                {
                    model: User,
                    attributes: [...USER_ATTRIBUTES]
                }
            ]
        });
    }
}

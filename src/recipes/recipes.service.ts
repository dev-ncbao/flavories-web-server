'use strict';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Recipe } from './recipes.model';
import { CreateRecipeDto, UpdateRecipeDto } from './recipes.dto';
import { User } from 'src/users/user.model';

@Injectable()
export class RecipesService {
    constructor(
        @InjectModel(Recipe)
        private readonly recipeModel: typeof Recipe
    ) {}

    async create(dto: CreateRecipeDto): Promise<Recipe> {
        return this.recipeModel.create({ ...dto });
    }

    async findAll(): Promise<Recipe[]> {
        return this.recipeModel.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        'userId',
                        'username',
                        'avatarUrl',
                        'firstName',
                        'lastName'
                    ]
                }
            ]
        });
    }

    async findOne(recipeId: number): Promise<Recipe> {
        const recipe = await this.recipeModel.findByPk(recipeId, {
            include: [
                {
                    model: User,
                    attributes: [
                        'userId',
                        'username',
                        'avatarUrl',
                        'firstName',
                        'lastName'
                    ]
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

    async getTopThisMonth(limit = 20): Promise<Recipe[]> {
        const now = new Date();
        const startOfMonth = new Date(
            Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0)
        );
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
                    attributes: [
                        'userId',
                        'username',
                        'avatarUrl',
                        'firstName',
                        'lastName'
                    ]
                }
            ]
        });
    }

    async getNewestThisMonth(limit = 20): Promise<Recipe[]> {
        const now = new Date();
        const startOfMonth = new Date(
            Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0)
        );
        return this.recipeModel.findAll({
            where: {
                createdAt: { [Op.gte]: startOfMonth }
            },
            order: [['createdAt', 'DESC']],
            limit
        });
    }

    async getTopAllTime(limit = 20): Promise<Recipe[]> {
        return this.recipeModel.findAll({
            order: [
                ['hotRating', 'DESC'],
                ['createdAt', 'DESC']
            ],
            limit
        });
    }
}

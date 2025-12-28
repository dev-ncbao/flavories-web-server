'use strict';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RecipeComment } from './recipe-comments.model';
import {
    CreateRecipeCommentDto,
    UpdateRecipeCommentDto
} from './recipe-comments.dto';
import { Recipe } from 'src/recipes/recipes.model';
import { User } from 'src/users/user.model';
import { USER_ATTRIBUTES } from 'src/common/utils/sequelize.utils';

@Injectable()
export class RecipeCommentsService {
    constructor(
        @InjectModel(RecipeComment)
        private readonly recipeCommentModel: typeof RecipeComment
    ) {}

    async create(dto: CreateRecipeCommentDto): Promise<RecipeComment> {
        return this.recipeCommentModel.create({ ...dto });
    }

    async findAll(): Promise<RecipeComment[]> {
        return this.recipeCommentModel.findAll({
            include: [
                {
                    model: Recipe,
                    attributes: ['recipeId', 'name', 'thumbnailUrl']
                },
                {
                    model: User,
                    attributes: [...USER_ATTRIBUTES]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    async findOne(id: number): Promise<RecipeComment> {
        const item = await this.recipeCommentModel.findByPk(id, {
            include: [
                {
                    model: Recipe,
                    attributes: ['recipeId', 'name', 'thumbnailUrl']
                },
                {
                    model: User,
                    attributes: [...USER_ATTRIBUTES]
                }
            ]
        });
        if (!item) {
            throw new NotFoundException('Recipe comment not found');
        }
        return item;
    }

    async update(id: number, dto: UpdateRecipeCommentDto): Promise<RecipeComment> {
        const item = await this.findOne(id);
        await item.update({ ...dto });
        return item;
    }

    async remove(id: number): Promise<void> {
        const item = await this.findOne(id);
        await item.destroy();
    }
}


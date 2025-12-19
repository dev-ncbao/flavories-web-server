'use strict';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ingredient } from './ingredients.model';
import { CreateIngredientDto, UpdateIngredientDto } from './ingredients.dto';
import { Unit } from 'src/units/units.model';

@Injectable()
export class IngredientsService {
    constructor(
        @InjectModel(Ingredient)
        private readonly ingredientModel: typeof Ingredient
    ) {}

    async create(dto: CreateIngredientDto): Promise<Ingredient> {
        return this.ingredientModel.create({ ...dto });
    }

    async findAll(): Promise<Ingredient[]> {
        return this.ingredientModel.findAll({
            include: [
                {
                    model: Unit,
                    attributes: ['unitId', 'name', 'abbreviation']
                }
            ]
        });
    }

    async findOne(ingredientId: number): Promise<Ingredient> {
        const ingredient = await this.ingredientModel.findByPk(ingredientId, {
            include: [
                {
                    model: Unit,
                    attributes: ['unitId', 'name', 'abbreviation']
                }
            ]
        });
        if (!ingredient) {
            throw new NotFoundException('Ingredient not found');
        }
        return ingredient;
    }

    async update(
        ingredientId: number,
        dto: UpdateIngredientDto
    ): Promise<Ingredient> {
        const ingredient = await this.findOne(ingredientId);
        await ingredient.update({ ...dto });
        return ingredient;
    }

    async remove(ingredientId: number): Promise<void> {
        const ingredient = await this.findOne(ingredientId);
        await ingredient.destroy();
    }
}


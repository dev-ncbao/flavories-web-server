'use strict';

import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';
import { Recipe } from 'src/recipes/recipes.model';

@Table({
    tableName: 'recipe_steps',
    timestamps: true
})
export class RecipeStep extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    recipeStepId: number;

    @ForeignKey(() => Recipe)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    recipeId: number;

    @BelongsTo(() => Recipe)
    recipe: Recipe;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    stepNumber: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    description: string;
}


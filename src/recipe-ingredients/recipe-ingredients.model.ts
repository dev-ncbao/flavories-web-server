'use strict';

import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

@Table({
    tableName: 'recipe_ingredients',
    timestamps: true
})
export class RecipeIngredient extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    ingredientId: number;

    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    recipeId: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: true
    })
    amount: number | null;
}


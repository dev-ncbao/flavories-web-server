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
import { User } from 'src/users/user.model';

@Table({
    tableName: 'recipe_comments',
    timestamps: true
})
export class RecipeComment extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    recipeCommentId: number;

    @ForeignKey(() => Recipe)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    recipeId: number;

    @BelongsTo(() => Recipe)
    recipe: Recipe;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    comment: string;
}


'use strict';

import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

@Table({
    tableName: 'recipes',
    timestamps: true
})
export class Recipe extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    recipeId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    @ForeignKey(() => User)
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    description: string | null;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    viewCount: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0
    })
    likeCount: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0
    })
    dislikeCount: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    thumbnailUrl: string | null;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    linkedCourseId: number | null;
}

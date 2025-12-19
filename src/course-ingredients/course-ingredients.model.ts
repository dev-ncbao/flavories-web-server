'use strict';

import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Ingredient } from 'src/ingredients/ingredients.model';
import { Course } from 'src/courses/courses.model';

@Table({
    tableName: 'course_ingredients',
    timestamps: true
})
export class CourseIngredient extends Model {
    @PrimaryKey
    @ForeignKey(() => Ingredient)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    ingredientId: number;

    @BelongsTo(() => Ingredient)
    ingredient: Ingredient;

    @PrimaryKey
    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    courseId: number;

    @BelongsTo(() => Course)
    course: Course;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: true
    })
    amount: number | null;
}


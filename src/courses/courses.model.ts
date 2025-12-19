'use strict';

import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { CourseComment } from 'src/course-comments/course-comments.model';
import { CourseIngredient } from 'src/course-ingredients/course-ingredients.model';
import { CourseStep } from 'src/course-steps/course-steps.model';

@Table({
    tableName: 'courses',
    timestamps: true
})
export class Course extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    courseId: number;

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
        allowNull: true
    })
    videoUrl: string | null;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    thumbnailUrl: string | null;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    viewCount: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    commentCount: number;

    @Column({
        type: DataType.DECIMAL(1, 1),
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('rating') as string;
            return rawValue ? Number(rawValue) : null;
        }
    })
    rating: number | null;

    @Column({
        type: DataType.DECIMAL(10, 0),
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('price') as string;
            return rawValue ? Number(rawValue) : null;
        }
    })
    price: number | null;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    linkedRecipeId: number | null;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    description: string | null;

    @HasMany(() => CourseIngredient)
    courseIngredients: CourseIngredient[];

    @HasMany(() => CourseComment)
    courseComments: CourseComment[];

    @HasMany(() => CourseStep)
    courseSteps: CourseStep[];
}

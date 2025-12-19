'use strict';

import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';
import { Course } from 'src/courses/courses.model';

@Table({
    tableName: 'course_steps',
    timestamps: true
})
export class CourseStep extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    courseStepId: number;

    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    courseId: number;

    @BelongsTo(() => Course)
    course: Course;

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


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
import { User } from 'src/users/user.model';

@Table({
    tableName: 'course_comments',
    timestamps: true
})
export class CourseComment extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    courseCommentId: number;

    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    courseId: number;

    @BelongsTo(() => Course)
    course: Course;

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


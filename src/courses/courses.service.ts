'use strict';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Course } from './courses.model';
import { CreateCourseDto, UpdateCourseDto } from './courses.dto';
import { User } from 'src/users/user.model';
import { CourseIngredient } from 'src/course-ingredients/course-ingredients.model';
import { Ingredient } from 'src/ingredients/ingredients.model';
import { Unit } from 'src/units/units.model';
import { CourseComment } from 'src/course-comments/course-comments.model';
import { CourseStep } from 'src/course-steps/course-steps.model';

@Injectable()
export class CoursesService {
    constructor(
        @InjectModel(Course)
        private readonly courseModel: typeof Course
    ) {}

    async create(dto: CreateCourseDto): Promise<Course> {
        return this.courseModel.create({ ...dto });
    }

    async findAll(): Promise<Course[]> {
        return this.courseModel.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        'userId',
                        'username',
                        'avatarUrl',
                        'firstName',
                        'lastName'
                    ]
                }
            ]
        });
    }

    async findOne(courseId: number): Promise<Course> {
        const course = await this.courseModel.findByPk(courseId, {
            include: [
                {
                    model: User,
                    attributes: [
                        'username',
                        'avatarUrl',
                        'firstName',
                        'lastName'
                    ]
                },
                {
                    model: CourseIngredient,
                    attributes: ['amount'],
                    include: [
                        {
                            model: Ingredient,
                            attributes: ['name'],
                            include: [
                                { model: Unit, attributes: ['abbreviation'] }
                            ]
                        }
                    ]
                },
                {
                    model: CourseComment,
                    attributes: ['courseCommentId', 'comment', 'createdAt'],
                    include: [
                        {
                            model: User,
                            attributes: [
                                'username',
                                'avatarUrl',
                                'firstName',
                                'lastName'
                            ]
                        }
                    ]
                },
                {
                    model: CourseStep,
                    attributes: ['stepNumber', 'description']
                }
            ]
        });
        if (!course) {
            throw new NotFoundException('Course not found');
        }
        return course;
    }

    async update(courseId: number, dto: UpdateCourseDto): Promise<Course> {
        const course = await this.findOne(courseId);
        await course.update({ ...dto });
        return course;
    }

    async remove(courseId: number): Promise<void> {
        const course = await this.findOne(courseId);
        await course.destroy();
    }

    async getTopThisMonth(limit = 20): Promise<Course[]> {
        const now = new Date();
        const startOfMonth = new Date(
            Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0)
        );
        return this.courseModel.findAll({
            where: {
                createdAt: { [Op.gte]: startOfMonth }
            },
            order: [
                ['rating', 'DESC'],
                ['createdAt', 'DESC']
            ],
            limit,
            include: [
                {
                    model: User,
                    attributes: [
                        'userId',
                        'username',
                        'avatarUrl',
                        'firstName',
                        'lastName'
                    ]
                }
            ]
        });
    }

    async getNewestThisMonth(limit = 20): Promise<Course[]> {
        const now = new Date();
        const startOfMonth = new Date(
            Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0)
        );
        return this.courseModel.findAll({
            where: {
                createdAt: { [Op.gte]: startOfMonth }
            },
            order: [['createdAt', 'DESC']],
            limit,
            include: [
                {
                    model: User,
                    attributes: [
                        'userId',
                        'username',
                        'avatarUrl',
                        'firstName',
                        'lastName'
                    ]
                }
            ]
        });
    }

    async getTopAllTime(limit = 20): Promise<Course[]> {
        return this.courseModel.findAll({
            order: [
                ['rating', 'DESC'],
                ['createdAt', 'DESC']
            ],
            limit,
            include: [
                {
                    model: User,
                    attributes: [
                        'userId',
                        'username',
                        'avatarUrl',
                        'firstName',
                        'lastName'
                    ]
                }
            ]
        });
    }
}


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
import { USER_ATTRIBUTES, getStartOfCurrentMonth } from 'src/common/utils/sequelize.utils';
import { APP_CONSTANTS } from 'src/common/constants/app.constants';

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
                    attributes: [...USER_ATTRIBUTES]
                }
            ]
        });
    }

    async findOne(courseId: number): Promise<Course> {
        const course = await this.courseModel.findByPk(courseId, {
            include: [
                {
                    model: User,
                    attributes: USER_ATTRIBUTES.filter(attr => attr !== 'userId')
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

    async getTopThisMonth(limit: number = APP_CONSTANTS.DEFAULT_TOP_LIMIT): Promise<Course[]> {
        const startOfMonth = getStartOfCurrentMonth();
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
                    attributes: [...USER_ATTRIBUTES]
                }
            ]
        });
    }

    async getNewestThisMonth(limit: number = APP_CONSTANTS.DEFAULT_TOP_LIMIT): Promise<Course[]> {
        const startOfMonth = getStartOfCurrentMonth();
        return this.courseModel.findAll({
            where: {
                createdAt: { [Op.gte]: startOfMonth }
            },
            order: [['createdAt', 'DESC']],
            limit,
            include: [
                {
                    model: User,
                    attributes: [...USER_ATTRIBUTES]
                }
            ]
        });
    }

    async getTopAllTime(limit: number = APP_CONSTANTS.DEFAULT_TOP_LIMIT): Promise<Course[]> {
        return this.courseModel.findAll({
            order: [
                ['rating', 'DESC'],
                ['createdAt', 'DESC']
            ],
            limit,
            include: [
                {
                    model: User,
                    attributes: [...USER_ATTRIBUTES]
                }
            ]
        });
    }
}


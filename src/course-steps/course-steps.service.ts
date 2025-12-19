'use strict';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CourseStep } from './course-steps.model';
import {
    CreateCourseStepDto,
    UpdateCourseStepDto
} from './course-steps.dto';
import { Course } from 'src/courses/courses.model';

@Injectable()
export class CourseStepsService {
    constructor(
        @InjectModel(CourseStep)
        private readonly courseStepModel: typeof CourseStep
    ) {}

    async create(dto: CreateCourseStepDto): Promise<CourseStep> {
        return this.courseStepModel.create({ ...dto });
    }

    async findAll(): Promise<CourseStep[]> {
        return this.courseStepModel.findAll({
            include: [
                {
                    model: Course,
                    attributes: ['courseId', 'name', 'thumbnailUrl']
                }
            ],
            order: [
                ['courseId', 'ASC'],
                ['stepNumber', 'ASC']
            ]
        });
    }

    async findByCourseId(courseId: number): Promise<CourseStep[]> {
        return this.courseStepModel.findAll({
            where: { courseId },
            include: [
                {
                    model: Course,
                    attributes: ['courseId', 'name', 'thumbnailUrl']
                }
            ],
            order: [['stepNumber', 'ASC']]
        });
    }

    async findOne(id: number): Promise<CourseStep> {
        const item = await this.courseStepModel.findByPk(id, {
            include: [
                {
                    model: Course,
                    attributes: ['courseId', 'name', 'thumbnailUrl']
                }
            ]
        });
        if (!item) {
            throw new NotFoundException('Course step not found');
        }
        return item;
    }

    async update(id: number, dto: UpdateCourseStepDto): Promise<CourseStep> {
        const item = await this.findOne(id);
        await item.update({ ...dto });
        return item;
    }

    async remove(id: number): Promise<void> {
        const item = await this.findOne(id);
        await item.destroy();
    }
}


'use strict';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CourseComment } from './course-comments.model';
import {
    CreateCourseCommentDto,
    UpdateCourseCommentDto
} from './course-comments.dto';
import { Course } from 'src/courses/courses.model';
import { User } from 'src/users/user.model';
import { USER_ATTRIBUTES } from 'src/common/utils/sequelize.utils';

@Injectable()
export class CourseCommentsService {
    constructor(
        @InjectModel(CourseComment)
        private readonly courseCommentModel: typeof CourseComment
    ) {}

    async create(dto: CreateCourseCommentDto): Promise<CourseComment> {
        return this.courseCommentModel.create({ ...dto });
    }

    async findAll(): Promise<CourseComment[]> {
        return this.courseCommentModel.findAll({
            include: [
                {
                    model: Course,
                    attributes: ['courseId', 'name', 'thumbnailUrl']
                },
                {
                    model: User,
                    attributes: [...USER_ATTRIBUTES]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    async findOne(id: number): Promise<CourseComment> {
        const item = await this.courseCommentModel.findByPk(id, {
            include: [
                {
                    model: Course,
                    attributes: ['courseId', 'name', 'thumbnailUrl']
                },
                {
                    model: User,
                    attributes: [...USER_ATTRIBUTES]
                }
            ]
        });
        if (!item) {
            throw new NotFoundException('Course comment not found');
        }
        return item;
    }

    async update(id: number, dto: UpdateCourseCommentDto): Promise<CourseComment> {
        const item = await this.findOne(id);
        await item.update({ ...dto });
        return item;
    }

    async remove(id: number): Promise<void> {
        const item = await this.findOne(id);
        await item.destroy();
    }
}


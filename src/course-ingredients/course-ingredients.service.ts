'use strict';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CourseIngredient } from './course-ingredients.model';
import {
    CreateCourseIngredientDto,
    UpdateCourseIngredientDto
} from './course-ingredients.dto';

@Injectable()
export class CourseIngredientsService {
    constructor(
        @InjectModel(CourseIngredient)
        private readonly courseIngredientModel: typeof CourseIngredient
    ) {}

    async create(dto: CreateCourseIngredientDto): Promise<CourseIngredient> {
        return this.courseIngredientModel.create({ ...dto });
    }

    async findAll(): Promise<CourseIngredient[]> {
        return this.courseIngredientModel.findAll();
    }

    async findOne(courseId: number, ingredientId: number): Promise<CourseIngredient> {
        const item = await this.courseIngredientModel.findOne({
            where: { courseId, ingredientId }
        });
        if (!item) {
            throw new NotFoundException('Course ingredient not found');
        }
        return item;
    }

    async update(
        courseId: number,
        ingredientId: number,
        dto: UpdateCourseIngredientDto
    ): Promise<CourseIngredient> {
        const item = await this.findOne(courseId, ingredientId);
        await item.update({ ...dto });
        return item;
    }

    async remove(courseId: number, ingredientId: number): Promise<void> {
        const item = await this.findOne(courseId, ingredientId);
        await item.destroy();
    }
}


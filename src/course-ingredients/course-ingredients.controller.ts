'use strict';

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseIngredientsService } from './course-ingredients.service';
import {
    CreateCourseIngredientDto,
    UpdateCourseIngredientDto
} from './course-ingredients.dto';

@ApiTags('course-ingredients')
@Controller('course-ingredients')
export class CourseIngredientsController {
    constructor(private readonly courseIngredientsService: CourseIngredientsService) {}

    @Post()
    async create(@Body() dto: CreateCourseIngredientDto) {
        return this.courseIngredientsService.create(dto);
    }

    @Get()
    async findAll() {
        return this.courseIngredientsService.findAll();
    }

    @Get(':courseId/:ingredientId')
    async findOne(
        @Param('courseId', ParseIntPipe) courseId: number,
        @Param('ingredientId', ParseIntPipe) ingredientId: number
    ) {
        return this.courseIngredientsService.findOne(courseId, ingredientId);
    }

    @Patch(':courseId/:ingredientId')
    async update(
        @Param('courseId', ParseIntPipe) courseId: number,
        @Param('ingredientId', ParseIntPipe) ingredientId: number,
        @Body() dto: UpdateCourseIngredientDto
    ) {
        return this.courseIngredientsService.update(courseId, ingredientId, dto);
    }

    @Delete(':courseId/:ingredientId')
    async remove(
        @Param('courseId', ParseIntPipe) courseId: number,
        @Param('ingredientId', ParseIntPipe) ingredientId: number
    ) {
        await this.courseIngredientsService.remove(courseId, ingredientId);
        return { message: 'Course ingredient deleted' };
    }
}


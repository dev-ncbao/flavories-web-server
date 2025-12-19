'use strict';

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseStepsService } from './course-steps.service';
import {
    CreateCourseStepDto,
    UpdateCourseStepDto
} from './course-steps.dto';

@ApiTags('course-steps')
@Controller('course-steps')
export class CourseStepsController {
    constructor(private readonly courseStepsService: CourseStepsService) {}

    @Post()
    async create(@Body() dto: CreateCourseStepDto) {
        return this.courseStepsService.create(dto);
    }

    @Get()
    async findAll(@Query('courseId') courseId?: string) {
        if (courseId) {
            return this.courseStepsService.findByCourseId(Number(courseId));
        }
        return this.courseStepsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.courseStepsService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCourseStepDto
    ) {
        return this.courseStepsService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.courseStepsService.remove(id);
        return { message: 'Course step deleted' };
    }
}


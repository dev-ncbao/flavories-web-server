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
import { CourseCommentsService } from './course-comments.service';
import {
    CreateCourseCommentDto,
    UpdateCourseCommentDto
} from './course-comments.dto';

@ApiTags('course-comments')
@Controller('course-comments')
export class CourseCommentsController {
    constructor(private readonly courseCommentsService: CourseCommentsService) {}

    @Post()
    async create(@Body() dto: CreateCourseCommentDto) {
        return this.courseCommentsService.create(dto);
    }

    @Get()
    async findAll() {
        return this.courseCommentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.courseCommentsService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCourseCommentDto
    ) {
        return this.courseCommentsService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.courseCommentsService.remove(id);
        return { message: 'Course comment deleted' };
    }
}


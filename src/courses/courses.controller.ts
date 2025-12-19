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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto } from './courses.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Post()
    async create(@Body() dto: CreateCourseDto) {
        return this.coursesService.create(dto);
    }

    @Get()
    async findAll() {
        return this.coursesService.findAll();
    }

    @Get('top-month')
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of courses to return (default: 20)'
    })
    async topThisMonth(
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
    ) {
        return await this.coursesService.getTopThisMonth(limit ?? 20);
    }

    @Get('new-month')
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of courses to return (default: 20)'
    })
    async newestThisMonth(
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
    ) {
        return await this.coursesService.getNewestThisMonth(limit ?? 20);
    }

    @Get('hot-all')
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of courses to return (default: 20)'
    })
    async topAll(
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
    ) {
        return await this.coursesService.getTopAllTime(limit ?? 20);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.coursesService.findOne(Number(id));
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
        return this.coursesService.update(Number(id), dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.coursesService.remove(Number(id));
        return { message: 'Course deleted' };
    }
}


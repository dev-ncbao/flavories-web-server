'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseComment } from './course-comments.model';
import { CourseCommentsService } from './course-comments.service';
import { CourseCommentsController } from './course-comments.controller';

@Module({
    imports: [SequelizeModule.forFeature([CourseComment])],
    controllers: [CourseCommentsController],
    providers: [CourseCommentsService],
    exports: [CourseCommentsService]
})
export class CourseCommentsModule {}


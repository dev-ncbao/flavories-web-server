'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseStep } from './course-steps.model';
import { CourseStepsService } from './course-steps.service';
import { CourseStepsController } from './course-steps.controller';

@Module({
    imports: [SequelizeModule.forFeature([CourseStep])],
    controllers: [CourseStepsController],
    providers: [CourseStepsService],
    exports: [CourseStepsService]
})
export class CourseStepsModule {}


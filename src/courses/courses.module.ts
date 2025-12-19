'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './courses.model';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

@Module({
    imports: [SequelizeModule.forFeature([Course])],
    controllers: [CoursesController],
    providers: [CoursesService],
    exports: [CoursesService]
})
export class CoursesModule {}


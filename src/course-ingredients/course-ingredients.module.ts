'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseIngredient } from './course-ingredients.model';
import { CourseIngredientsService } from './course-ingredients.service';
import { CourseIngredientsController } from './course-ingredients.controller';

@Module({
    imports: [SequelizeModule.forFeature([CourseIngredient])],
    controllers: [CourseIngredientsController],
    providers: [CourseIngredientsService],
    exports: [CourseIngredientsService]
})
export class CourseIngredientsModule {}


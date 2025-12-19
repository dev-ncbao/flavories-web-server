'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipeStep } from './recipe-steps.model';
import { RecipeStepsService } from './recipe-steps.service';
import { RecipeStepsController } from './recipe-steps.controller';

@Module({
    imports: [SequelizeModule.forFeature([RecipeStep])],
    controllers: [RecipeStepsController],
    providers: [RecipeStepsService],
    exports: [RecipeStepsService]
})
export class RecipeStepsModule {}


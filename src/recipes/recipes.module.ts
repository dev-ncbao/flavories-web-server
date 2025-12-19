'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipes.model';

@Module({
    imports: [SequelizeModule.forFeature([Recipe])],
    controllers: [RecipesController],
    providers: [RecipesService],
    exports: [RecipesService]
})
export class RecipesModule {}


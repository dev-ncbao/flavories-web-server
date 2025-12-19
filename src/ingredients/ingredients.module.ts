'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './ingredients.model';
import { Unit } from 'src/units/units.model';

@Module({
    imports: [SequelizeModule.forFeature([Ingredient, Unit])],
    controllers: [IngredientsController],
    providers: [IngredientsService],
    exports: [IngredientsService]
})
export class IngredientsModule {}


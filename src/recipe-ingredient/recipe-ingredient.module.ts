import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipeIngredient } from './recipe-ingredient.model';
import { RecipeIngredientService } from './recipe-ingredient.service';
import { RecipeIngredientController } from './recipe-ingredient.controller';

@Module({
    imports: [SequelizeModule.forFeature([RecipeIngredient])],
    providers: [RecipeIngredientService],
    controllers: [RecipeIngredientController]
})
export class RecipeIngredientModule {}

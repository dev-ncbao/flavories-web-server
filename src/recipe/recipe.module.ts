import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from './recipe.model';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
    imports: [SequelizeModule.forFeature([Recipe])],
    controllers: [RecipeController],
    providers: [RecipeService]
})
export class RecipeModule {}

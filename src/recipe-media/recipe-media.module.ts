import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipeMedia } from './recipe-media.model';
import { RecipeMediaService } from './recipe-media.service';
import { RecipeMediaController } from './recipe-media.controller';

@Module({
  imports: [SequelizeModule.forFeature([RecipeMedia])],
  providers: [RecipeMediaService],
  controllers: [RecipeMediaController],
})
export class RecipeMediaModule {}

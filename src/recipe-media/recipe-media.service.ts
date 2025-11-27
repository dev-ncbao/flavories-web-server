import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RecipeMedia } from './recipe-media.model';
import { RecipeMediaDto } from './recipe-media.dto';

@Injectable()
export class RecipeMediaService {
  constructor(
    @InjectModel(RecipeMedia)
    private recipeMediaModel: typeof RecipeMedia,
  ) {}

  async findAll(): Promise<RecipeMedia[]> {
    return this.recipeMediaModel.findAll();
  }

  async findOne(id: number): Promise<RecipeMedia | null> {
    return this.recipeMediaModel.findByPk(id);
  }

  async create(dto: RecipeMediaDto): Promise<RecipeMedia> {
    return this.recipeMediaModel.create(dto as any);
  }

  async update(id: number, dto: RecipeMediaDto): Promise<[number, RecipeMedia[]]> {
    return this.recipeMediaModel.update(dto, { where: { id }, returning: true });
  }

  async remove(id: number): Promise<number> {
    return this.recipeMediaModel.destroy({ where: { id } });
  }
}

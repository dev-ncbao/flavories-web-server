import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RecipeIngredient } from './recipe-ingredient.model';
import { RecipeIngredientDto } from './recipe-ingredient.dto';

@Injectable()
export class RecipeIngredientService {
  constructor(
    @InjectModel(RecipeIngredient)
    private recipeIngredientModel: typeof RecipeIngredient,
  ) {}

  async findAll(): Promise<RecipeIngredient[]> {
    return this.recipeIngredientModel.findAll();
  }

  async findOne(id: number): Promise<RecipeIngredient | null> {
    return this.recipeIngredientModel.findByPk(id);
  }

  async create(dto: RecipeIngredientDto): Promise<RecipeIngredient> {
    return this.recipeIngredientModel.create(dto as any);
  }

  async update(id: number, dto: RecipeIngredientDto): Promise<[number, RecipeIngredient[]]> {
    return this.recipeIngredientModel.update(dto, { where: { id }, returning: true });
  }

  async remove(id: number): Promise<number> {
    return this.recipeIngredientModel.destroy({ where: { id } });
  }
}

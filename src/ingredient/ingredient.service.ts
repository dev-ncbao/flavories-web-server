import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ingredient } from './ingredient.model';
import { IngredientDto } from './ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient)
    private ingredientModel: typeof Ingredient,
  ) {}

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientModel.findAll();
  }

  async findOne(id: number): Promise<Ingredient | null> {
    return this.ingredientModel.findByPk(id);
  }

  async create(dto: IngredientDto): Promise<Ingredient> {
    return this.ingredientModel.create(dto as any);
  }

  async update(id: number, dto: IngredientDto): Promise<[number, Ingredient[]]> {
    return this.ingredientModel.update(dto, { where: { id }, returning: true });
  }

  async remove(id: number): Promise<number> {
    return this.ingredientModel.destroy({ where: { id } });
  }
}

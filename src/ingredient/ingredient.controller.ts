import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientDto } from './ingredient.dto';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly service: IngredientService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: IngredientDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: IngredientDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}

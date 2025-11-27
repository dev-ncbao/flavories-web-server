import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RecipeMediaService } from './recipe-media.service';
import { RecipeMediaDto } from './recipe-media.dto';

@Controller('recipe-media')
export class RecipeMediaController {
  constructor(private readonly service: RecipeMediaService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: RecipeMediaDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: RecipeMediaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}

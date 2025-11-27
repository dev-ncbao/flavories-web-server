import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderDto } from './gender.dto';

@Controller('gender')
export class GenderController {
  constructor(private readonly service: GenderService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: GenderDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: GenderDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}

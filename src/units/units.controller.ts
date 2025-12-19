'use strict';

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UnitsService } from './units.service';
import { CreateUnitDto, UpdateUnitDto } from './units.dto';

@ApiTags('units')
@Controller('units')
export class UnitsController {
    constructor(private readonly unitsService: UnitsService) {}

    @Post()
    async create(@Body() dto: CreateUnitDto) {
        return this.unitsService.create(dto);
    }

    @Get()
    async findAll() {
        return this.unitsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.unitsService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUnitDto
    ) {
        return this.unitsService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.unitsService.remove(id);
        return { message: 'Unit deleted' };
    }
}


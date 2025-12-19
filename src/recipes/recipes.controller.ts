'use strict';

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto } from './recipes.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Post()
    async create(@Body() dto: CreateRecipeDto) {
        return this.recipesService.create(dto);
    }

    @Get()
    async findAll() {
        return this.recipesService.findAll();
    }

    @Get('top-month')
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of recipes to return (default: 20)'
    })
    async topThisMonth(
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
    ) {
        return await this.recipesService.getTopThisMonth(limit ?? 20);
    }

    @Get('new-month')
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of recipes to return (default: 20)'
    })
    async newestThisMonth(
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
    ) {
        return await this.recipesService.getNewestThisMonth(limit ?? 20);
    }

    @Get('hot-all')
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of recipes to return (default: 20)'
    })
    async hotAll(
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
    ) {
        return await this.recipesService.getTopAllTime(limit ?? 20);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.recipesService.findOne(Number(id));
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateRecipeDto) {
        return this.recipesService.update(Number(id), dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.recipesService.remove(Number(id));
        return { message: 'Recipe deleted' };
    }
}

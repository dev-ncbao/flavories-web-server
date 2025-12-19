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
import { ApiTags } from '@nestjs/swagger';
import { RecipeStepsService } from './recipe-steps.service';
import {
    CreateRecipeStepDto,
    UpdateRecipeStepDto
} from './recipe-steps.dto';

@ApiTags('recipe-steps')
@Controller('recipe-steps')
export class RecipeStepsController {
    constructor(private readonly recipeStepsService: RecipeStepsService) {}

    @Post()
    async create(@Body() dto: CreateRecipeStepDto) {
        return this.recipeStepsService.create(dto);
    }

    @Get()
    async findAll(@Query('recipeId') recipeId?: string) {
        if (recipeId) {
            return this.recipeStepsService.findByRecipeId(Number(recipeId));
        }
        return this.recipeStepsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.recipeStepsService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateRecipeStepDto
    ) {
        return this.recipeStepsService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.recipeStepsService.remove(id);
        return { message: 'Recipe step deleted' };
    }
}


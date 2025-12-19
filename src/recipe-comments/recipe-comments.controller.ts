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
import { RecipeCommentsService } from './recipe-comments.service';
import {
    CreateRecipeCommentDto,
    UpdateRecipeCommentDto
} from './recipe-comments.dto';

@ApiTags('recipe-comments')
@Controller('recipe-comments')
export class RecipeCommentsController {
    constructor(private readonly recipeCommentsService: RecipeCommentsService) {}

    @Post()
    async create(@Body() dto: CreateRecipeCommentDto) {
        return this.recipeCommentsService.create(dto);
    }

    @Get()
    async findAll() {
        return this.recipeCommentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.recipeCommentsService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateRecipeCommentDto
    ) {
        return this.recipeCommentsService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.recipeCommentsService.remove(id);
        return { message: 'Recipe comment deleted' };
    }
}


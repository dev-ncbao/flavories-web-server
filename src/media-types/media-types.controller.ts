import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param
} from '@nestjs/common';
import { MediaTypesService } from './media-types.service';
import { MediaTypesDto } from './media-types.dto';

@Controller('media-types')
export class MediaTypesController {
    constructor(private readonly service: MediaTypesService) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() dto: MediaTypesDto) {
        return this.service.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: MediaTypesDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}

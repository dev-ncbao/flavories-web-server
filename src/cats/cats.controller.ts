import {
    Body,
    Controller,
    Get,
    Post,
} from '@nestjs/common';
import { Cat } from './cats.model';
import { CatsService } from './cats.service';
import { CreateCatDto } from './cats.dto';

@Controller('cats')
export class CatsController {
    constructor(private catService: CatsService) {}

    @Get()
    findAll(): Promise<Cat[]> {
        return this.catService.findAll();
    }

    @Get(':id')
    findOne(): Cat {
        return new Cat();
    }

    @Post()
    create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
        return this.catService.create(createCatDto);
    }

    // @Put()
    // update(): string {
    //     return 'Hello Cat!';
    // }

    // @Delete()
    // delete(): string {
    //     return 'Hello Cat!';
    // }
}

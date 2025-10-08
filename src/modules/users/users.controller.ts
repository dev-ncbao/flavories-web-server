import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body
} from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(Number(id));
    }

    @Post()
    create(@Body() user: { id: number; name: string }) {
        return this.userService.create(user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: { name: string }) {
        return this.userService.update(Number(id), body.name);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(Number(id));
    }
}

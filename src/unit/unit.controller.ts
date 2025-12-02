import { Controller, Get } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitDto } from './unit.dto';

@Controller('units')
export class UnitController {
    constructor(private readonly service: UnitService) {}

    @Get()
    async findAll(): Promise<UnitDto[]> {
        const units = await this.service.findAll();
        console.log('Units found:', units);
        return units.map((unit) => UnitDto.fromModel(unit));
    }
}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Unit } from './unit.model';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';

@Module({
  imports: [SequelizeModule.forFeature([Unit])],
  providers: [UnitService],
  controllers: [UnitController],
})
export class UnitModule {}

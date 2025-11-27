import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Gender } from './gender.model';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';

@Module({
  imports: [SequelizeModule.forFeature([Gender])],
  providers: [GenderService],
  controllers: [GenderController],
})
export class GenderModule {}

'use strict';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCourseStepDto {
    @ApiProperty()
    courseId: number;

    @ApiProperty()
    stepNumber: number;

    @ApiProperty()
    description: string;
}

export class UpdateCourseStepDto extends PartialType(CreateCourseStepDto) {}


'use strict';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCourseCommentDto {
    @ApiProperty()
    courseId: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    comment: string;
}

export class UpdateCourseCommentDto extends PartialType(CreateCourseCommentDto) {}


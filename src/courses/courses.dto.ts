'use strict';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCourseDto {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    videoUrl?: string;

    @ApiProperty({ required: false })
    thumbnailUrl?: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false, default: 0 })
    viewCount?: number;

    @ApiProperty({ required: false })
    rating?: number;

    @ApiProperty({ required: false })
    linkedRecipeId?: number | null;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}


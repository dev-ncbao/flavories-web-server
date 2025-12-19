'use strict';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateRecipeDto {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    thumbnailUrl?: string;

    @ApiProperty({ required: false, default: 0 })
    viewCount?: number;

    @ApiProperty({ required: false, default: 0 })
    hotRating?: number;

    @ApiProperty({ required: false })
    linkedCourseId?: number | null;
}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}


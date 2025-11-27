export class RatingDto {
    id: number;
    userId: number;
    recipeId: number;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CreateRatingDto {
    userId: number;
    recipeId: number;
    rating: number;
}

export class UpdateRatingDto {
    rating: number;
}

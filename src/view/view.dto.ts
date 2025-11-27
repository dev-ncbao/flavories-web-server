export class ViewDto {
    id: number;
    userId: number | null;
    recipeId: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CreateViewDto {
    userId?: number;
    recipeId: number;
}

import { Column, /* DataType, */ Model, Table } from 'sequelize-typescript';

@Table
export class Recipe extends Model {
    @Column /* ({
        type: DataType.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('name') as string | null;
        },
    }) */
    name: string;
    getName(): string | null {
        return this.getDataValue('name') as string | null;
    }

    @Column /* ({
        type: DataType.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('description') as string | null;
        },
    }) */
    description: string;
    getDescription(): string | null {
        return this.getDataValue('description') as string | null;
    }

    @Column /* ({
        type: DataType.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('image') as string | null;
        },
    }) */
    image: string;
    getImage(): string | null {
        return this.getDataValue('image') as string | null;
    }

    @Column /* ({
        type: DataType.DECIMAL(2, 1),
        allowNull: false,
        defaultValue: 0.0,
        get() {
            return this.getDataValue('rating') as number;
        },
    }) */
    rating: number;
    getRating(): number {
        const value = this.getDataValue('rating') as string | number;
        return parseFloat(String(value));
    }

    @Column /* ({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get() {
            return this.getDataValue('likeCount') as number;
        },
    }) */
    likeCount: number;
    getLikeCount(): number {
        return this.getDataValue('likeCount') as number;
    }

    @Column /* ({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get() {
            return this.getDataValue('dislikeCount') as number;
        },
    }) */
    dislikeCount: number;
    getDislikeCount(): number {
        return this.getDataValue('dislikeCount') as number;
    }

    @Column /* ({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get() {
            return this.getDataValue('viewCount') as number;
        },
    }) */
    viewCount: number;
    getViewCount(): number {
        return this.getDataValue('viewCount') as number;
    }

    @Column /* ({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get() {
            return this.getDataValue('commentCount') as number;
        },
    }) */
    commentCount: number;
    getCommentCount(): number {
        return this.getDataValue('commentCount') as number;
    }

    @Column /* ({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
        get() {
            return this.getDataValue('trendingScore') as number;
        },
    }) */
    trendingScore: number;
    getTrendingScore(): number {
        const value = this.getDataValue('trendingScore') as string | number;
        return parseFloat(String(value));
    }
}

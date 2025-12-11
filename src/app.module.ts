import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { MediaTypesModule } from './media-types/media-types.module';
import { RecipeMediaModule } from './recipe-media/recipe-media.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { CommentModule } from './comment/comment.module';
import { RatingModule } from './rating/rating.module';
import { LikeModule } from './like/like.module';
import { DislikeModule } from './dislike/dislike.module';
import { ViewModule } from './view/view.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecipeIngredientModule } from './recipe-ingredient/recipe-ingredient.module';
import { UnitModule } from './unit/unit.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        SequelizeModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: 'mysql',
                host: configService.get<string>('DB_HOST', 'localhost'),
                port: configService.get<number>('DB_PORT', 3306),
                username: configService.get<string>('DB_USERNAME', 'sa'),
                password: configService.get<string>('DB_PASSWORD', '1111'),
                database: configService.get<string>('DB_DATABASE', 'flavories'),
                autoLoadModels: true,
                synchronize: false // Keep false in production, use migrations instead
            })
        }),
        MediaTypesModule,
        RecipeMediaModule,
        AuthModule,
        UserModule,
        RecipeModule,
        CommentModule,
        RatingModule,
        LikeModule,
        DislikeModule,
        ViewModule,
        RecipeIngredientModule,
        UnitModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

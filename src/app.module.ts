import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ViewModule } from './view/view.module';
import { RecipesModule } from './recipes/recipes.module';
import { RecipeIngredientsModule } from './recipe-ingredients/recipe-ingredients.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
        AuthModule,
        UserModule,
        ViewModule,
        RecipesModule,
        RecipeIngredientsModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

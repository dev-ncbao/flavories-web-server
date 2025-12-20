import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ViewModule } from './view/view.module';
import { RecipesModule } from './recipes/recipes.module';
import { RecipeIngredientsModule } from './recipe-ingredients/recipe-ingredients.module';
import { UnitsModule } from './units/units.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipeCommentsModule } from './recipe-comments/recipe-comments.module';
import { RecipeStepsModule } from './recipe-steps/recipe-steps.module';
import { CoursesModule } from './courses/courses.module';
import { CourseCommentsModule } from './course-comments/course-comments.module';
import { CourseIngredientsModule } from './course-ingredients/course-ingredients.module';
import { CourseStepsModule } from './course-steps/course-steps.module';
import { PaymentModule } from './payment/payment.module';
import { AdminModule } from './admin/admin.module';
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
        RecipeIngredientsModule,
        UnitsModule,
        IngredientsModule,
        RecipeCommentsModule,
        RecipeStepsModule,
        CoursesModule,
        CourseCommentsModule,
        CourseIngredientsModule,
        CourseStepsModule,
        PaymentModule,
        AdminModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

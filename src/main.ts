import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: 'http://localhost:5555'
    });

    // app.useGlobalInterceptors(
    //     new ClassSerializerInterceptor(app.get(Reflector))
    // );

    const config = new DocumentBuilder()
        .setTitle('Flavories API')
        .setVersion('version: 1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Enter JWT token'
            },
            'accessToken'
        )
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory, {
        swaggerOptions: {
            persistAuthorization: true
        }
    });

    await app.listen(3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

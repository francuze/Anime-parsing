import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Anime Parsing')
    .setDescription('Anime Parsing')
    .setVersion('1.0')
    .addTag('anime')
    .build();

  // Создаем Swagger Модуль для начало работы
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Запускаем Nest с портом 3000
  await app.listen(3000);
}
bootstrap();
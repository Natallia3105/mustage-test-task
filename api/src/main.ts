import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*', // In production, it must be replaced allowed frontend domain(s), e.g., 'https://app.mustage.com'
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Mustage test task API')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('Todos')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // So I'm going to basically tell NestJS whenever you encounter a validation
  // decorator, I want you to run your validation pipe, so I don't have to
  // explicit define it in any controller, or in any parameter.
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter, HttpResponseNormalizer, LoggingInterceptor } from './common';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  //Current version api segment
  app.setGlobalPrefix("/api/v1");

  // Validate all request body using DTO objects
  app.useGlobalPipes(new ValidationPipe({stopAtFirstError: true, forbidNonWhitelisted: true, whitelist: true}));

  // Adds a false flag on exceptions and return an error;
  app.useGlobalFilters(new HttpExceptionFilter())

  // Adds a true flag on successful responses
  app.useGlobalInterceptors(new HttpResponseNormalizer())

  await app.listen(3000);
}
bootstrap();
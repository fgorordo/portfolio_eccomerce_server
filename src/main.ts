import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter, HttpResponseNormalizer, LoggingInterceptor } from './common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { NodeEnvs } from './config/interface';

async function bootstrap() {
  const options: NestApplicationOptions = { 
    logger: process.env.NODE_ENV === NodeEnvs.PRODUCTION 
    ? ['warn','error', 'log']
    : ['debug', 'error', 'log', 'verbose', 'warn'] 
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, options);

  app.disable('x-powered-by');
  app.enableCors();
  app.use(helmet());
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy());

  //Current version api segment
  app.setGlobalPrefix('/api/v1');

  // Validate all request body using DTO objects
  app.useGlobalPipes(new ValidationPipe({stopAtFirstError: true, forbidNonWhitelisted: true, whitelist: true}));

  // Adds a false flag on exceptions and return an error;
  app.useGlobalFilters(new HttpExceptionFilter())

  // Adds a true flag on successful responses
  app.useGlobalInterceptors(new HttpResponseNormalizer())

  await app.listen(3000);
}
bootstrap();
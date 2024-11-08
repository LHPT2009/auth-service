import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from 'common/exceptions/interceptors/transform.interceptor';
import { AllExceptionsFilter } from 'common/exceptions/filter/all-exceptions.filter';
import { ErrorHandlingByEnvironmentInterceptor } from 'common/exceptions/interceptors/error-handling-by-environment.interceptor';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ErrorHandlingByEnvironmentInterceptor(),
  )
  await app.listen(3000);
}
bootstrap();

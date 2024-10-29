import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from 'common/exceptions/interceptors/transform.interceptor';
import { ErrorHandlingInterceptor } from 'common/exceptions/interceptors/error-handling.interceptor';
import { AllExceptionsFilter } from 'common/exceptions/filter/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    // new ErrorHandlingInterceptor(),
  )
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();

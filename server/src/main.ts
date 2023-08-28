import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from '@V1/interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ['POST', 'GET', 'PATCH', 'DELETE'],

  })
  app.setGlobalPrefix('v1')
  await app.listen(4000);
}
bootstrap();

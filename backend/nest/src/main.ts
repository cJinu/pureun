import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:3000", "http://172.23.48.1/","192.168.30.*", 'http://172.26.80.1:3000'],
    credentials: true,
    exposedHeaders: ['Authorization','*'], // * 사용할 헤더 추가.
  });
  const config = new DocumentBuilder()
    .setTitle('purin')
    .setDescription('ETA commonPJT purin API description')
    .setVersion('1.0')
    .addTag('User') // Controller mapping
    .addTag('Pot')
    .addTag('Device')
    .addTag('Calender')
    .addTag('Pot-state')
    .addTag('Talk')
    .addTag('Species')
    .addTag('User-login')
    .build();
  
  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new IoAdapter(app));
  app.setGlobalPrefix('v1')
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)
  await app.listen(3000);
}
bootstrap();

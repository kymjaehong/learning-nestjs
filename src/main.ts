import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // dto 유효성 검사
    new ValidationPipe({
      whitelist: true, // json에 불필요한 프로퍼티 무시
      forbidNonWhitelisted: true, // json에 불필요한 프로퍼티 존재 시, 에러 발생
      transform: true, // json에서 보낸 프로퍼티 타입을 원하는 타입으로 변경 (url parameter's default type: string)
    })
  )
  await app.listen(3000);
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';

// NestJS는 여러 개의 모듈로 이루어져 있다.
// App Module은 App Controller, AppService만을 가져야 한다.
// 대신 imports에 다른 모듈을 추가한다.
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

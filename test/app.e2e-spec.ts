import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach -> All
  // 테스트가 실행될 때마다 새롭게 애플리케이션을 실행하는 것을 방지
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // json에 불필요한 프로퍼티 무시
        forbidNonWhitelisted: true, // json에 불필요한 프로퍼티 존재 시, 에러 발생
        transform: true, // json에서 보낸 프로퍼티 타입을 원하는 타입으로 변경 (url parameter's default type: string)
      })
    )
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([])
    })

    it("POST 201", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "test",
          year: 2023,
          genres: ["test"]
        })
        .expect(201)
    })

    it("POST 400", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "test",
          year: 2023,
          genres: ["test"],
          other: "thing"
        })
        .expect(400)
    })

    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404)
    })
  })

  describe("/movies/:id", () => {
    
    it("GET 200", () => {
      // test 서버에서는 id가 string으로 나타난다.
      // 왜 transform이 동작하지 않는가?
      // main.ts에 설정한 app 설정을 동일하게 추가
      return request(app.getHttpServer()).get("/movies/1").expect(200)
    })

    it("GET 404", () => {
      return request(app.getHttpServer()).get("/movies/999").expect(404)
    })
    it("PATCH 200", () => {
      return request(app.getHttpServer()).patch("/movies/1").send({title: "updated test"}).expect(200)
    })
    it("DELETE 200", () => {
      return request(app.getHttpServer()).delete("/movies/1").expect(200)
    })
  })

  

});

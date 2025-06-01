import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

describe('SpeechResult (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  it('POST /speech-result로 텍스트 저장', async () => {
    const res = await request(app.getHttpServer())
      .post('/speech-result')
      .send({ text: '테스트 음성 텍스트' })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.id).toBeDefined();
  });

  it('GET /speech-result로 저장된 텍스트 조회', async () => {
    const res = await request(app.getHttpServer())
      .get('/speech-result')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].text).toBeDefined();
  });
});

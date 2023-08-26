import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

describe('Users (e2e)', () => {
  let app: INestApplication;

  let token;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    const response = await request(app.getHttpServer())
      .post('/session/register')
      .send({
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
      });

    token = response.body.access_token;
  });

  it('/users (GET) not authorized', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Sem autorização 🥷');
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('/users (GET) create a new user', async () => {
    await request(app.getHttpServer())
      .post('/users/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test@admin.com',
        password: 'admin',
        name: 'test',
      });

    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

describe('session login (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    await request(app.getHttpServer()).post('/session/register').send({
      name: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
    });
  });

  it('/session/signin (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/session/signin')
      .send({
        email: 'admin@admin.com',
        password: 'admin',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Login com sucesso');
    expect(response.body.access_token).toBeTruthy();
  });

  it('/session/signin (POST) password incorrect', async () => {
    const response = await request(app.getHttpServer())
      .post('/session/signin')
      .send({
        email: 'admin@admin.com',
        password: 'ad',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email or password incorrect');
    expect(response.body.access_token).toBeFalsy();
  });

  it('/session/signin (POST) invalid email', async () => {
    const response = await request(app.getHttpServer())
      .post('/session/signin')
      .send({
        email: 'admin',
        password: 'admin',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['email must be an email']);
    expect(response.body.access_token).toBeFalsy();
  });

  it('/session/signin (POST) without email', async () => {
    const response = await request(app.getHttpServer())
      .post('/session/signin')
      .send({
        // email: 'admin',
        password: 'admin',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['email must be an email']);
    expect(response.body.access_token).toBeFalsy();
  });

  it('/session/signin (POST) without password', async () => {
    const response = await request(app.getHttpServer())
      .post('/session/signin')
      .send({
        email: 'admin@admin.com',
        // password: 'admin',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['password should not be empty']);
    expect(response.body.access_token).toBeFalsy();
  });
});

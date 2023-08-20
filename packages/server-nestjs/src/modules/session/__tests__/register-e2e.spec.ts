import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/session/register (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/session/register')
      .send({
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Registrado com sucesso');
    expect(response.body.access_token).toBeTruthy();
  });

  it('/session/register (POST) without name', async () => {
    const response = await request(app.getHttpServer())
      .post('/session/register')
      .send({
        // name: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['name should not be empty']);
    expect(response.body.access_token).toBeFalsy();
  });

  it('/session/register (POST) without email', async () => {
    const response = await request(app.getHttpServer())
      .post('/session/register')
      .send({
        name: 'admin',
        // email: 'admin@admin.com',
        password: 'admin',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['email must be an email']);
    expect(response.body.access_token).toBeFalsy();
  });

  it('/session/register (POST) invalid email', async () => {
    const response = await request(app.getHttpServer())
      .post('/session/register')
      .send({
        name: 'admin',
        email: 'admin',
        password: 'admin',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['email must be an email']);
    expect(response.body.access_token).toBeFalsy();
  });

  it('/session/register (POST) without password', async () => {
    const response = await request(app.getHttpServer())
      .post('/session/register')
      .send({
        name: 'admin',
        email: 'admin@admin.com',
        // password: 'admin',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['password should not be empty']);
    expect(response.body.access_token).toBeFalsy();
  });

  it('/session/register (POST) conflitc', async () => {
    await request(app.getHttpServer()).post('/session/register').send({
      name: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
    });

    const response = await request(app.getHttpServer())
      .post('/session/register')
      .send({
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
      });

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('Usuário já existe');
    expect(response.body.access_token).toBeFalsy();
  });
});

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

  it('/users/create (POST) not authorized', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/create')
      .send({
        email: 'test@admin.com',
        password: 'admin',
        name: 'test',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Sem autorização 🥷');
  });

  it('/users/create (POST) created with success', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test@admin.com',
        password: 'admin',
        name: 'test',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('test');
    expect(response.body.email).toBe('test@admin.com');
  });

  it('/users/create (POST) missing name', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test@admin.com',
        password: 'admin',
        // name: 'test'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['name should not be empty']);
  });
  it('/users/create (POST) invalid email', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test',
        password: 'admin',
        name: 'test',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['email must be an email']);
  });

  it('/users/create (POST) missing password', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test@admin.com',
        // password: 'admin',
        name: 'test',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['password should not be empty']);
  });

  it('/users/create (POST) missing email', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        // email: 'test@admin.com',
        password: 'admin',
        name: 'test',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['email must be an email']);
  });
});

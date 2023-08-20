import { SessionService } from '../session.service'
import { SessionController } from '../session.controller'
import { UsersService } from '@/modules/users/users.service';
import { UserRepository } from '@/modules/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/database/prismaServices';
import { ConflictException } from '@nestjs/common';


describe('Session register', () => {
  let sessionController: SessionController;
  let prisma: PrismaService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [PrismaService, JwtService, UserRepository, UsersService, SessionService],
    }).compile();

    sessionController = app.get<SessionController>(SessionController);
    prisma = app.get<PrismaService>(PrismaService)

  });

  it('Successful registration', async () => {
    const user = {
      id: faker.number.int(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.internet.userName(),
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.anytime(),
    };


    prisma.user.findFirst = jest.fn().mockReturnValueOnce(null);
    prisma.user.create = jest.fn().mockReturnValueOnce(user);

    const response = await sessionController.register({
      email: user.email,
      password: user.password,
      name: user.name
    })

    expect(response.access_token).toBeTruthy();
    expect(response.message).toBe('Registrado com sucesso');

  });

  it('User exists', async () => {
    const user = {
      id: faker.number.int(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.internet.userName(),
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.anytime(),
    };

    prisma.user.findFirst = jest.fn().mockReturnValueOnce(user);

    const response = sessionController.register({
      email: user.email,
      password: user.password,
      name: user.name
    })

    await expect(response).rejects.toEqual(new ConflictException('Usuário já existe'))

  });

});

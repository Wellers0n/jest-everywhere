import { SessionService } from '../session.service'
import { SessionController } from '../session.controller'
import { UsersService } from '@/modules/users/users.service';
import { UserRepository } from '@/modules/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/database/prismaServices';
import * as bcrypt from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';


describe('session login', () => {
  let sessionController: SessionController;
  let prisma: PrismaService

  const user = {
    id: faker.number.int(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.internet.userName(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [PrismaService, JwtService, UserRepository, UsersService, SessionService],
    }).compile();

    sessionController = app.get<SessionController>(SessionController);
    prisma = app.get<PrismaService>(PrismaService)

  });

  it('login with success', async () => {

    prisma.user.findFirst = jest.fn().mockReturnValueOnce(user);
    bcrypt.compareSync = jest.fn().mockReturnValueOnce(true);

    const response = await sessionController.signIn({
      email: user.email,
      password: user.password
    })

    expect(response.access_token).toBeTruthy();
    expect(response.message).toBe('Login com sucesso');

  });

  it('Login with email incorrect', async () => {
    const user = null

    prisma.user.findFirst = jest.fn().mockReturnValueOnce(user);

    const response = sessionController.signIn({
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    await expect(response).rejects.toEqual(new BadRequestException('Email or password incorrect'))

  });

  it('Login with password incorrect', async () => {

    prisma.user.findFirst = jest.fn().mockReturnValueOnce(user);
    bcrypt.compareSync = jest.fn().mockReturnValueOnce(false);


    const response = sessionController.signIn({
      email: user.email,
      password: faker.internet.password()
    })

    await expect(response).rejects.toEqual(new BadRequestException('Email or password incorrect'))

  });


});

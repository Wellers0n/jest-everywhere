import { SessionService } from './session.service'
import { SessionController } from './session.controller'
import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { LoginBodyDTO } from './dtos/login-body.dto';
import { RegisterBodyDTO } from './dtos/register-body.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { PrismaService } from '@/database/prismaServices';


describe('Session service', () => {
  let sessionService: SessionService;
  let usersService: UsersService;

  const userMock = {
    id: faker.number.int(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.internet.userName(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };

  const userMockSignIn: LoginBodyDTO = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const userMockRegister: RegisterBodyDTO = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.internet.userName(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        JwtService,
        UsersService,
        UserRepository,
        PrismaService
      ],
    }).compile();

    sessionService = app.get<SessionService>(SessionService);
    usersService = app.get<UsersService>(UsersService);

  });

  it('should return a success signIn', async () => {

    bcrypt.compareSync = jest.fn().mockReturnValueOnce(true);
    usersService.findByEmail = jest.fn().mockReturnValueOnce(userMock);


    const response = await sessionService.signIn(userMockSignIn)


    expect(response.access_token).toBeTruthy();
    expect(response.message).toBe('Login com sucesso');

  });

  it('should return signIn with incorrect email', async () => {

    bcrypt.compareSync = jest.fn().mockReturnValueOnce(true);

    usersService.findByEmail = jest.fn().mockReturnValueOnce(null);

    const response = sessionService.signIn(userMockSignIn)

    await expect(response).rejects.toEqual(new BadRequestException('Email or password incorrect'))

  });

  it('should return signIn with incorrect password', async () => {

    bcrypt.compareSync = jest.fn().mockReturnValueOnce(false);

    usersService.findByEmail = jest.fn().mockReturnValueOnce(userMock);

    const response = sessionService.signIn(userMockSignIn)

    await expect(response).rejects.toEqual(new BadRequestException('Email or password incorrect'))

  });

  it('should return successful register', async () => {

    usersService.findByEmail = jest.fn().mockReturnValueOnce(null);

    usersService.create = jest.fn().mockReturnValueOnce(userMock);

    const response = await sessionService.register(userMockRegister)

    expect(response.access_token).toBeTruthy();
    expect(response.message).toBe('Registrado com sucesso');

  });

  it('should return an existing user', async () => {
    
    usersService.findByEmail = jest.fn().mockReturnValueOnce(userMock);

    const response = sessionService.register(userMockRegister)

    await expect(response).rejects.toEqual(new ConflictException('Usuário já existe'))

  });

});

import { SessionService } from './session.service'
import { SessionController } from './session.controller'
import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing';

import { LoginBodyDTO } from './dtos/login-body.dto';
import { RegisterBodyDTO } from './dtos/register-body.dto';


describe('Session controller', () => {
  let sessionController: SessionController;

  const userMockSignIn: LoginBodyDTO = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const userMockRegister: RegisterBodyDTO = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.internet.userName(),
  };

  const sessionMockResponse = {
    access_token: faker.string.uuid,
    message: faker.internet.emoji
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [
        {
          provide: SessionService,
          useValue: {
            signIn: jest.fn().mockResolvedValue(sessionMockResponse),
            register: jest.fn().mockResolvedValue(sessionMockResponse)
          }
        }
      ],
    }).compile();

    sessionController = app.get<SessionController>(SessionController);

  });

  it('should return a success signIn', async () => {

    const response = await sessionController.signIn(userMockSignIn)

    expect(response).toEqual(sessionMockResponse);

  });

  it('should return a success register', async () => {

    const response = await sessionController.register(userMockRegister)

    expect(response).toEqual(sessionMockResponse);

  });

});

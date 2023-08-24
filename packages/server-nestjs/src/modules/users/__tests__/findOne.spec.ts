import { UsersService } from '@/modules/users/users.service';
import { UserRepository } from '@/modules/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/database/prismaServices';
import { UsersController } from '../users.controller';

describe('Users unit test', () => {

  let usersController: UsersController;
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
      controllers: [UsersController],
      providers: [PrismaService, JwtService, UserRepository, UsersService],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    prisma = app.get<PrismaService>(PrismaService)

  });

  it('Should return an user', async () => {

    prisma.user.findFirst = jest.fn().mockReturnValueOnce(user);

    const response = await usersController.findOne({
      id: user.id
    })

    expect(response).toBe(user)

  });

  it('Should return user not found', async () => {

    prisma.user.findFirst = jest.fn().mockReturnValueOnce({});

    const response = await usersController.findOne({
      id: user.id
    })

    expect(response).toEqual({})

  });


});

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '@/database/prismaServices';
import { UserRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}

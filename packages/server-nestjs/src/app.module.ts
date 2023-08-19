import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { SessionModule } from './modules/session/session.module';

@Module({
  imports: [UsersModule, SessionModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { LoginBodyDTO } from './dtos/login-body.dto';
import { RegisterBodyDTO } from './dtos/register-body.dto';
import {
  ApiConflictResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AuthUnauthorizedResponse,
  AuthOkResponse,
  AuthConflictResponse,
} from './swagger/auth.swagger';

@Controller('session')
@ApiTags('Session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @ApiOkResponse({ type: AuthOkResponse })
  @ApiUnauthorizedResponse({ type: AuthUnauthorizedResponse })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() body: LoginBodyDTO) {
    const { email, password } = body;
    return this.sessionService.signIn({ email, password });
  }

  @ApiOkResponse({ type: AuthOkResponse })
  @ApiConflictResponse({ type: AuthConflictResponse })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  getProfile(@Body() body: RegisterBodyDTO) {
    const { email, password, name } = body;
    return this.sessionService.register({ name, email, password });
  }
}

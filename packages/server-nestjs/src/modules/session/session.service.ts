import {
  Injectable,
  ConflictException,
  BadRequestException
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginBodyDTO } from './dtos/login-body.dto';
import { RegisterBodyDTO } from './dtos/register-body.dto';

@Injectable()
export class SessionService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(data: LoginBodyDTO) {
    const { email, password } = data;

    const user = await this.usersService.findByEmail({ email });

    if (!user) throw new BadRequestException('Email or password incorrect');

    const correctPassword = bcrypt.compareSync(password, user.password);

    if (!correctPassword) {
      throw new BadRequestException('Email or password incorrect');
    }

    const payload = { id: user.id, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET
      }),
      message: 'Login com sucesso',
    };
  }

  async register(data: RegisterBodyDTO) {
    const { email, name, password } = data;

    const userExist = await this.usersService.findByEmail({ email });

    if (userExist) throw new ConflictException('Usuário já existe');

    const user = await this.usersService.create({ email, name, password });

    const payload = { id: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET
      }),
      message: 'Registrado com sucesso',
    };
  }
}

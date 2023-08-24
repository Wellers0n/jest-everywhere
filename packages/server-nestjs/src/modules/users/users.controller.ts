import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserBodyDTO } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { SessionGuard } from '../session/session.guard';
import {
  UserOkResponse,
  UserUnauthorizedResponse,
} from './swagger/users.swagger';
import { FindOneUserParamDTO } from './dtos/find-one-user.dto';
import { UpdateUserBodyDTO, UpdateUserParamDTO } from './dtos/update-user.dto';
import { FindUserQueryDTO } from './dtos/find-user.dto';
import { DeleteUserParamDTO } from './dtos/delete-user.dto';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(SessionGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserOkResponse })
  @ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
  create(@Body() body: CreateUserBodyDTO): Promise<UserEntity> {
    const { name, email, password } = body;
    return this.usersService.create({ name, email, password });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserOkResponse })
  @ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
  findByEmail(@Query() query: FindUserQueryDTO): Promise<UserEntity[]> {
    const { email, name } = query;
    return this.usersService.findAll({ email, name });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserOkResponse })
  @ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
  findOne(@Param() param: FindOneUserParamDTO): Promise<UserEntity> {
    const { id } = param;
    return this.usersService.findOne({ id: Number(id) });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserOkResponse })
  @ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
  update(
    @Param() param: UpdateUserParamDTO,
    @Body() body: UpdateUserBodyDTO,
  ): Promise<UserEntity> {
    const { id } = param;
    const { name, email } = body;
    return this.usersService.update({ id: Number(id), name, email });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
  delete(@Param() param: DeleteUserParamDTO): Promise<void> {
    const { id } = param;
    return this.usersService.delete({ id: Number(id) });
  }
}

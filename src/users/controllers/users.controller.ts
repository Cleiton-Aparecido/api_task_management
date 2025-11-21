import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersUseCase } from '../services/users.usecase';
import { Admin } from 'typeorm';
type AuthRequest = Request & {
  user?: { id: string; email: string; name?: string; admin?: boolean };
};

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersUseCase) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'cadastrar usuários',
  })
  // @ApiBody({
  //   description: 'Cadastrar novo usuário, e email não deve ser duplicado',
  //   type: CreateUserDto,
  // })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    example: { statusCode: 201, message: 'Usuário criado com sucesso' },
  })
  @ApiResponse({
    status: 409,
    description: 'Usuário criado com sucesso',
    example: {
      message: 'E-mail já cadastrado',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() data: CreateUserDto) {
    console.log(data);
    return await this.usersService.create(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Consultar informações do usuário autenticado',
  })
  @ApiResponse({
    status: 200,
    description: 'Consultar informações do usuário autenticado',
    schema: {
      example: {
        id: '73f45c85-744b-41db-a570-19c2097631d5',
        name: 'user',
        email: 'cleiton@email.com',
        createdAt: '2025-10-25T16:30:16.000Z',
        updatedAt: '2025-10-25T16:30:16.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    schema: {
      example: {
        message: 'Usuário inexistente',
        statusCode: 404,
      },
    },
  })
  async get(@Req() req: AuthRequest) {
    const userId = req.user?.id;
    if (!userId) {
      return { message: 'User not authenticated', feedId: '0' };
    }
    const safeUser = await this.usersService.get(userId);
    return safeUser;
  }

  @Patch(':id/password')
  @ApiOperation({
    summary: 'Rota para fazer alteração de senha',
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário não encontrado',
    schema: {
      example: {
        message: 'Senha antiga incorreta',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  async changePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: ChangePasswordDto,
    @Req() req: AuthRequest,
  ): Promise<any> {
    const userId = req.user?.id;
    const admin = req.user?.admin;

    if (userId !== id && !admin) {
      throw new ForbiddenException(
        'User not authenticated to change password for this user',
      );
    }

    await this.usersService.changePassword(id, dto);
    return { message: 'Senha atualizada com sucesso' };
  }
}

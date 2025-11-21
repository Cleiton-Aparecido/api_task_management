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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersUseCase } from '../services/users.usecase';
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
        id: 'f7f8498a-a51d-44d8-bf3a-5d632d9d104c',
        name: 'user',
        email: 'cleiton1245@email.com',
        createdAt: '2025-11-21T20:16:39.982Z',
        updatedAt: '2025-11-21T20:16:39.982Z',
        usersPermissions: [
          {
            id: '114881a6-dc0f-4714-b05b-bb0af6e4a3d2',
            userId: 'f7f8498a-a51d-44d8-bf3a-5d632d9d104c',
            permissionId: '63c54479-9f43-47b8-9d37-b4e60fb59fe4',
            permission: {
              id: '63c54479-9f43-47b8-9d37-b4e60fb59fe4',
              name: 'ADMIN',
              createdAt: '2025-11-21T17:48:28.976Z',
              updatedAt: '2025-11-21T17:48:28.976Z',
              deletedAt: null,
            },
            createdAt: '2025-11-21T20:16:40.009Z',
            updatedAt: '2025-11-21T20:16:40.009Z',
            deletedAt: null,
          },
        ],
        permissions: ['ADMIN'],
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

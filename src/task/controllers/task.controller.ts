import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from '../dto/createTask.dto';
import { TaskUseCase } from '../service/task.usecase';
import { Admin } from 'typeorm';

type AuthRequest = Request & {
  user?: { id: string; email: string; name?: string; admin?: boolean };
};
@ApiTags('Task')
@Controller('task')
export class taskController {
  constructor(private taskService: TaskUseCase) {}

  @Post('')
  @ApiOperation({
    summary: 'Create task',
  })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    schema: {
      example: {
        message: 'Task Criada com sucesso',
        taskId: '357fae0d-1078-4e18-a7e1-4c0ccc90f05a',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido ou não fornecido',
    schema: {
      example: {
        message: 'Token inválido ou não fornecido',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'error creating task',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  })
  async create(
    @Body() body: CreateTaskDto,
    @Req() req: AuthRequest,
  ): Promise<any> {
    const userId = req.user?.id;

    if (!userId) {
      throw new ForbiddenException(
        'User not authenticated to change password for this user',
      );
    }

    return await this.taskService.create({
      ...body,
      userId: userId?.toString(),
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar lista de tasks',
  })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    schema: {
      example: [
        {
          id: '2e2a8f96-fb3b-48bb-b9e4-52d89d275b7d',
          title: 'Bug no sistema',
          description: 'descricao da task',
          userId: 'f7f8498a-a51d-44d8-bf3a-5d632d9d104c',
          createdAt: '2025-11-21T22:11:31.199Z',
          updatedAt: '2025-11-21T22:11:31.199Z',
          deletedAt: null,
        },
        {
          id: '06d86f8c-1b47-4b80-9502-ce7e9f497989',
          title: 'Bug no sistema',
          description: 'descricao da task',
          userId: 'f7f8498a-a51d-44d8-bf3a-5d632d9d104c',
          createdAt: '2025-11-21T22:12:48.494Z',
          updatedAt: '2025-11-21T22:12:48.494Z',
          deletedAt: null,
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido ou não fornecido',
    schema: {
      example: {
        message: 'Token inválido ou não fornecido',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'error creating task',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  })
  async getTasks(@Req() req: AuthRequest): Promise<any> {
    const userId = req.user?.id;
    const Admin = req.user?.admin;

    if (!userId) {
      throw new ForbiddenException(
        'User not authenticated to change password for this user',
      );
    }
    if (Admin) {
      return await this.taskService.getTasks({});
    }

    return await this.taskService.getTasks({ userId });
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'deletar task',
  })
  @ApiResponse({
    status: 201,
    description: 'delete task successfully',
    schema: {
      example: {
        message: 'delete task',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'error delete task',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  })
  async deleteTask(@Param('id') id: string): Promise<any> {
    await this.taskService.deleteTask(id);
    return { message: 'delete task' };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar task',
  })
  @ApiResponse({
    status: 201,
    description: 'atualizado com sucesso',
    schema: {
      example: {
        message: 'delete task',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'error update task',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  async updateTask(
    @Param('id') id: string,
    @Body() data: CreateTaskDto,
  ): Promise<any> {
    return await this.taskService.Update({ id: id }, data);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Titulo',
    example: 'Bug no sistema',
    required: true,
  })
  @IsDefined({ message: 'O campo name é obrigatório' })
  @MaxLength(60, { message: 'O nome deve ter no máximo 60 caracteres' })
  @IsNotEmpty({ message: 'O campo title não pode ser vazio' })
  title: string;

  @ApiProperty({
    description: 'Description',
    example: 'descricao da task',
    required: true,
  })
  @IsNotEmpty({ message: 'O campo title não pode ser vazio' })
  @IsDefined({ message: 'O campo name é obrigatório' })
  @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres' })
  description: string;
}

export class CreateTaskInUserDto extends CreateTaskDto {
  userId: string;
}

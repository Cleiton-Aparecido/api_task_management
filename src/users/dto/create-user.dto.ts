import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsBoolean,
  MaxLength,
  MinLength,
  IsDefined,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'email',
    example: 'user@email.com',
    required: true,
  })
  @IsDefined({ message: 'O campo email é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty({
    description: 'name',
    example: 'Fulano',
    required: true,
  })
  @IsDefined({ message: 'O campo name é obrigatório' })
  @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres' })
  name: string;

  @ApiProperty({
    description: 'password',
    example: '123456',
    required: true,
  })
  @IsDefined({ message: 'O campo password é obrigatório' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @ApiProperty({
    description: 'admin (true ou false)',
    example: true,
    required: true,
  })
  @IsDefined({ message: 'O campo admin é obrigatório' })
  @IsBoolean({ message: 'O campo admin deve ser booleano' })
  admin: boolean;
}

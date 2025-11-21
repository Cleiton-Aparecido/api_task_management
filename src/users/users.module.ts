import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/config/entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { IUsersRepository } from './interfaces/users.repository.interface';
import { UseCaseProvider } from './providers/user.provider';
import { UsersRepository } from './repository/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UseCaseProvider,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
  exports: [IUsersRepository, UseCaseProvider],
})
export class UsersModule {}

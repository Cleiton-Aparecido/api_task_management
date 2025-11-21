import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/config/entities/task.entity';
import { ITaskRepository } from './interface/task.repository.interface';
import { TaskUseCaseProvider } from './providers/task.provider';
import { TaskRepository } from './repository/task.repository';
import { taskController } from './controllers/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [taskController],
  providers: [
    TaskUseCaseProvider,
    {
      provide: ITaskRepository,
      useClass: TaskRepository,
    },
  ],
  exports: [],
})
export class TaskModule {}

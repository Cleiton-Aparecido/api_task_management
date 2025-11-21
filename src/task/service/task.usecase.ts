import { Task } from 'src/config/entities/task.entity';
import { CreateTaskInUserDto } from '../dto/createTask.dto';

export abstract class TaskUseCase {
  abstract create(data: CreateTaskInUserDto): Promise<any>;
  abstract getTasks(data: Partial<Task>): Promise<any>;
  abstract deleteTask(id: string): Promise<any>;
  abstract Update(data: Partial<Task>, update: Partial<Task>): Promise<any>;
}

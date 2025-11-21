import { Task } from 'src/config/entities/task.entity';
import { DeepPartial } from 'typeorm';

export abstract class ITaskRepository {
  abstract create(data: DeepPartial<Task>): Promise<Task>;
  abstract save(data: DeepPartial<Task>): Promise<Task>;
  abstract find(data: DeepPartial<Task>): Promise<Task>;
  abstract update(
    data: Partial<Task>,
    update: Partial<Task>,
  ): Promise<Task | any>;
}

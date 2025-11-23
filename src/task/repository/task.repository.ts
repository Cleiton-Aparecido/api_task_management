import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/config/entities/task.entity';
import { FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { ITaskRepository } from '../interface/task.repository.interface';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  private buildWhere(partial: Partial<Task>): FindOptionsWhere<Task> {
    const { feeds, deletedAt, ...rest } = partial as any;
    const where: any = {};
    Object.entries(rest).forEach(([key, value]) => {
      if (value === undefined || value === null || typeof value === 'object')
        return;
      where[key] = value;
    });

    if (deletedAt === null) {
      where.deletedAt = IsNull();
    } else if (deletedAt instanceof Date) {
      where.deletedAt = deletedAt;
    }

    return where as FindOptionsWhere<Task>;
  }

  async create(data: Task): Promise<Task | any> {
    return this.taskRepository.create(data);
  }
  async save(data: Task): Promise<Task | any> {
    return this.taskRepository.save(data);
  }

  async find(data: Task): Promise<Task | any> {
    const where = this.buildWhere(data);

    return this.taskRepository
      .createQueryBuilder('task')
      .leftJoin('task.user', 'user')
      .select([
        'task.id AS id',
        'task.title AS title',
        'task.description AS description',
        'task.createdAt AS "createdAt"',
        'task.updatedAt AS "updatedAt"',
        'user.name AS "userName"',
      ])
      .where({
        ...where,
        deletedAt: IsNull(),
      })
      .getRawMany();
  }
  async update(data: Task, update: Partial<Task>): Promise<Task | any> {
    const where = this.buildWhere(data);

    await this.taskRepository.update(where, update);

    return await this.taskRepository.findOne({ where });
  }
}

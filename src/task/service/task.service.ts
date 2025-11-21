import { Injectable } from '@nestjs/common';

import { CreateTaskInUserDto } from '../dto/createTask.dto';
import { ITaskRepository } from '../interface/task.repository.interface';
import { TaskUseCase } from './task.usecase';
import { Task } from 'src/config/entities/task.entity';

@Injectable()
export class TaskService implements TaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async create(userId: CreateTaskInUserDto): Promise<any> {
    try {
      const task = await this.taskRepository.create({
        title: userId.title,
        description: userId.description,
        user: { id: userId.userId },
      });
      const taskData = await this.taskRepository.save(task);

      return { message: 'Task Criada com sucesso', taskId: taskData.id };
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }
  async getTasks(data: Partial<Task>): Promise<any> {
    try {
      const taskData = await this.taskRepository.find(data);

      return taskData;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }
  async deleteTask(id: string): Promise<any> {
    try {
      await this.taskRepository.update({ id: id }, { deletedAt: new Date() });
      return { message: 'Task deleted successfully' };
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  async Update(data: Partial<Task>, update: Partial<Task>): Promise<any> {
    try {
      const task = await this.taskRepository.update({ id: data.id }, update);
      return task;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTasksDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksPostgresRepository } from './tasks.repository';
import { NotFoundTaskException } from './exceptions/NotFoundTaskException';
import { User } from 'src/auth/user.entity';
import { TasksRepository } from './tasks-repository.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksPostgresRepository)
    private taskRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task | null> {
    const found = await this.taskRepository.findOneBy({ id, user });

    if (!found) {
      throw new NotFoundTaskException(id);
    }

    return found;
  }

  createTask(createTaskDto: CreateTasksDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateStatus(
    id: string,
    user: User,
    status: TaskStatus,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundTaskException(id);
    }
  }
}

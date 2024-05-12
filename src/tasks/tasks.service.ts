import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTasksDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { NotFoundTaskException } from './exceptions/NotFoundTaskException';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository
  ) { }

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto

    // define a temporary array to hold the result
    let tasks = await this.getAllTasks()

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task => {
        return task.title.includes(search) || task.description.includes(search)
      });
    }

    return tasks;
  }

  async getTaskById(id: string): Promise<Task | null> {
    const found = await this.taskRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundTaskException(id);
    }

    return found;
  }

  createTask(createTaskDto: CreateTasksDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundTaskException(id);
    }
  }
}

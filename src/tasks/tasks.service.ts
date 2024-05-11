import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTasksDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto

    // define a temporary array to hold the result
    let tasks = this.getAllTasks()

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

  getTaskById(id: string): Task | null {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTasksDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateStatusById(id: string, status: TaskStatus): Task {
    const taskToUpdate = this.getTaskById(id);
    taskToUpdate.status = status;
    return taskToUpdate;
  }

  updateTitleById(id: string, title: string): Task {
    const taskToUpdate = this.getTaskById(id);
    taskToUpdate.title = title;
    return taskToUpdate;
  }

  updateDescriptionById(id: string, description: string): Task {
    const taskToUpdate = this.getTaskById(id);
    taskToUpdate.description = description;
    return taskToUpdate;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
}

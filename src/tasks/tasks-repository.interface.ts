import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { CreateTasksDto } from './dto/create-task.dto';
import { DataSource, Repository } from 'typeorm';

export abstract class TasksRepository extends Repository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  abstract getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;

  abstract createTask(createTaskDto: CreateTasksDto, user: User): Promise<Task>;
}

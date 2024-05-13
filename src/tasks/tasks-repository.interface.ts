import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { CreateTasksDto } from './dto/create-task.dto';
import { Repository } from 'typeorm';

export abstract class TasksRepository extends Repository<Task> {

  abstract getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;

  abstract createTask(createTaskDto: CreateTasksDto, user: User): Promise<Task>;
}

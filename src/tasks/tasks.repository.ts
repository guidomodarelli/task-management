import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTasksDto } from "./dto/create-task.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TasksRepository extends Repository<Task> {

  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager())
  }

  async createTask(createTaskDto: CreateTasksDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
    })

    await this.save(task);
    return task;
  }

}

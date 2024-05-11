import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTasksDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/udpate-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // if we have any filters defined, call tasksService.getTasksWithFilters
    // otherwise, just get al tasks
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTasksDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateStatusById(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateStatusById(id, status);
  }

  @Patch('/:id/title')
  updateTitleById(@Param('id') id: string, @Body('title') title: string): Task {
    return this.tasksService.updateTitleById(id, title);
  }

  @Patch('/:id/description')
  updateTask(@Param('id') id: string, @Body('description') description: string): Task {
    return this.tasksService.updateDescriptionById(id, description);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }
}

# Dependency Injection in NestJS

Any component with the NestJS ecosystem can inject a provider that decorated with the `@Injectable`

We define the dependencies in the constructor of the class. NestJS will take careof the injection for us, and it will then available as a class property.

```ts
@Controller("/tasks")
export class TaskController {
  // We can inject the TaskService into this controller
  // because we've defined it as a provider in the module
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }
}
```
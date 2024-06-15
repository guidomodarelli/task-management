# NestJS Controller

- Responsible for handling incoming requests and returning responses to the client

![Controller](./images/Nestjs-controller.png)

- The controller will then be the entry point, communicate with the service and return the result.
- Bound to specific path (for example, `/tasks` for the task resource)
- Contains <ins>handlers</ins>, which <ins>endpoints</ins> and <ins>request methods</ins> (GET, POST, DELETE, etc.)
- Can take advantage of <ins>dependency injection</ins> to consume providers within the same module

## Defining a Controller

```ts
@Controller("/tasks")
export class TaskController {
  // ...
}
```

## Defining a Handler

```ts
@Get()
getAllTasks() {
  // ...
}

@Post()
createTask() {
  // ...
}
```

![HTTP Request Incoming](./images/HTTP-request-incoming.png)

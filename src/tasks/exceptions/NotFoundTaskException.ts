import { NotFoundException } from "@nestjs/common";

export class NotFoundTaskException extends NotFoundException {
  constructor(id: string) {
    super(`Task with ID "${id}" not found`)
  }
}

// Before starting to test the service, obviously we'll need to initialize
// it somehow.
//
// And we are not testing a pure function, but instead we are
// testing something that is within the NestJS module ecosystem.
//
// There is a whole ecosystem of modules and providers and services and imports
// and stuff like that, that we need to interact with.
//
// And luckily NestJS is providing us with a package that we can import that
// helps us with testing, and that is the NestJS testing package o testing module.

import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksPostgresRepository } from './tasks.repository';
import { User } from 'src/auth/user.entity';

// You can mock in multiple ways.
// One way would just be to provide a plain object.
// The other way would be to define a factory function.
//
// I prefer the factory function away because then when we use beforeEach,
// it gets generated every time from scratch.
//
// Whereas using an object, you deal with object reference problems in Javascript
// and so on.
const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser: User = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

// I know my taskService depends on tasksRepository
describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: ReturnType<typeof mockTasksRepository>;

  // I need to simulate a module in NestJS
  // I don't have to do that because the NestJS testing module helps with
  // that or testing tools.
  beforeEach(async () => {
    // Initialiaze a NestJS module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        // That is not enough because our task service relies on the tasks repository
        // And we cannot initialize type here because we don't want to interact with
        // the database.
        // So, Why do we do? We need to somehow be able to provide our task service
        // with tasks repository. But not the real one.
        // We can use a technique called mocking for that.
        //
        // When we think about our tasksRepository, at the end of the day, It's
        // just an object with a bunch of methods and properties.
        //
        // So that's what we need to mock.
        TasksService,
        {
          // That is how do tell NestJS to inject the mockTasksRepository instead
          // of the real one
          provide: TasksPostgresRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksPostgresRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      // DELETE
      // expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      tasksRepository.getTasks.mockResolvedValue('someValue');
      // call tasksService.getTasks, which should then call the repository's getTasks
      const result = await tasksService.getTasks(null, mockUser);
      // DELETE
      // expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});

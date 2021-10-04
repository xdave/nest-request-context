import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from './example.controller';

describe('ExampleController', () => {
  let exampleController: ExampleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [ExampleController],
    }).compile();

    exampleController = app.get<ExampleController>(ExampleController);
  });

  it('should be defined', () => {
    expect(exampleController).toBeDefined();
  });
});

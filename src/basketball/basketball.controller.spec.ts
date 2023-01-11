import { Test, TestingModule } from '@nestjs/testing';
import { BasketballController } from './basketball.controller';
import { BasketballService } from './basketball.service';

describe('BasketballController', () => {
  let controller: BasketballController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasketballController],
      providers: [BasketballService],
    }).compile();

    controller = module.get<BasketballController>(BasketballController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

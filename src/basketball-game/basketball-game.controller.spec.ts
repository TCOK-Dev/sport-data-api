import { Test, TestingModule } from '@nestjs/testing';
import { BasketballGameController } from './basketball-game.controller';
import { BasketballGameService } from './basketball-game.service';

describe('BasketballGameController', () => {
  let controller: BasketballGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasketballGameController],
      providers: [BasketballGameService],
    }).compile();

    controller = module.get<BasketballGameController>(BasketballGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BasketballGameScoreController } from './basketball-game-score.controller';
import { BasketballGameScoreService } from './basketball-game-score.service';

describe('BasketballGameScoreController', () => {
  let controller: BasketballGameScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasketballGameScoreController],
      providers: [BasketballGameScoreService],
    }).compile();

    controller = module.get<BasketballGameScoreController>(BasketballGameScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

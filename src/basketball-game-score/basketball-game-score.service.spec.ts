import { Test, TestingModule } from '@nestjs/testing';
import { BasketballGameScoreService } from './basketball-game-score.service';

describe('BasketballGameScoreService', () => {
  let service: BasketballGameScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasketballGameScoreService],
    }).compile();

    service = module.get<BasketballGameScoreService>(
      BasketballGameScoreService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BasketballGameScoreResolver } from './basketball-game-score.resolver';
import { BasketballGameScoreService } from './basketball-game-score.service';

describe('BasketballGameScoreResolver', () => {
  let resolver: BasketballGameScoreResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasketballGameScoreResolver, BasketballGameScoreService],
    }).compile();

    resolver = module.get<BasketballGameScoreResolver>(BasketballGameScoreResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

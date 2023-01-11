import { Test, TestingModule } from '@nestjs/testing';
import { BasketballGameResolver } from './basketball-game.resolver';
import { BasketballGameService } from './basketball-game.service';

describe('BasketballGameResolver', () => {
  let resolver: BasketballGameResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasketballGameResolver, BasketballGameService],
    }).compile();

    resolver = module.get<BasketballGameResolver>(BasketballGameResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

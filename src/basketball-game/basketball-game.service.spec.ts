import { Test, TestingModule } from '@nestjs/testing';
import { BasketballGameService } from './basketball-game.service';

describe('BasketballGameService', () => {
  let service: BasketballGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasketballGameService],
    }).compile();

    service = module.get<BasketballGameService>(BasketballGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

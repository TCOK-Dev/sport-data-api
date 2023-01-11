import { Test, TestingModule } from '@nestjs/testing';
import { BasketballResolver } from './basketball.resolver';
import { BasketballService } from './basketball.service';

describe('BasketballResolver', () => {
  let resolver: BasketballResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasketballResolver, BasketballService],
    }).compile();

    resolver = module.get<BasketballResolver>(BasketballResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

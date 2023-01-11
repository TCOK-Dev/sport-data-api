import { Test, TestingModule } from '@nestjs/testing';
import { BasketballService } from './basketball.service';

describe('BasketballService', () => {
  let service: BasketballService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasketballService],
    }).compile();

    service = module.get<BasketballService>(BasketballService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

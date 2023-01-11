import { Module } from '@nestjs/common';
import { BasketballGameScoreService } from './basketball-game-score.service';
import { BasketballGameScoreResolver } from './basketball-game-score.resolver';

@Module({
  providers: [BasketballGameScoreResolver, BasketballGameScoreService]
})
export class BasketballGameScoreModule {}

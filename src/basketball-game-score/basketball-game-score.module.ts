import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketballGameScoreService } from './basketball-game-score.service';
import { BasketballGameScoreController } from './basketball-game-score.controller';
import { BasketballGameScore } from './entities/basketball-game-score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BasketballGameScore])],
  controllers: [BasketballGameScoreController],
  providers: [BasketballGameScoreService],
  exports: [BasketballGameScoreService],
})
export class BasketballGameScoreModule {}

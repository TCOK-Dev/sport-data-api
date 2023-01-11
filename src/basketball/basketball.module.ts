import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketballGameScoreModule } from 'src/basketball-game-score/basketball-game-score.module';
import { BasketballGameModule } from 'src/basketball-game/basketball-game.module';
import { BasketballController } from './basketball.controller';
import { BasketballService } from './basketball.service';
import { Basketball } from './entities/basketball.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Basketball]),
    BasketballGameModule,
    BasketballGameScoreModule,
  ],
  controllers: [BasketballController],
  providers: [BasketballService],
  exports: [BasketballService],
})
export class BasketballModule {}

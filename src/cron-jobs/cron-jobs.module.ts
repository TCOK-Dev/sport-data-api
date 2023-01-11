import { Module } from '@nestjs/common';
import { BasketballGameScoreModule } from 'src/basketball-game-score/basketball-game-score.module';
import { BasketballGameModule } from 'src/basketball-game/basketball-game.module';
import { BasketballModule } from 'src/basketball/basketball.module';
import { CronJobsService } from './cron-jobs.service';

@Module({
  imports: [BasketballModule, BasketballGameModule, BasketballGameScoreModule],
  controllers: [],
  providers: [CronJobsService],
})
export class CronJobsModule {}

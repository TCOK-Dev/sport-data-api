import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { BasketballGameScoreModule } from './basketball-game-score/basketball-game-score.module';
import { BasketballGameModule } from './basketball-game/basketball-game.module';
import { BasketballModule } from './basketball/basketball.module';
import { CronJobsModule } from './cron-jobs/cron-jobs.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    ScheduleModule.forRoot(),
    BasketballGameScoreModule,
    BasketballGameModule,
    BasketballModule,
    CronJobsModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketballGameScoreModule } from './basketball-game-score/basketball-game-score.module';
import { BasketballGameModule } from './basketball-game/basketball-game.module';
import { BasketballModule } from './basketball/basketball.module';
import { CronJobsModule } from './cron-jobs/cron-jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    BasketballGameScoreModule,
    BasketballGameModule,
    BasketballModule,
    CronJobsModule,
  ],
})
export class AppModule {}

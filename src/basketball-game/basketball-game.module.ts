import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketballGameService } from './basketball-game.service';
import { BasketballGameController } from './basketball-game.controller';
import { BasketballGame } from './entities/basketball-game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BasketballGame])],
  controllers: [BasketballGameController],
  providers: [BasketballGameService],
  exports: [BasketballGameService],
})
export class BasketballGameModule {}

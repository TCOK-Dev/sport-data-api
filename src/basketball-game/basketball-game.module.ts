import { Module } from '@nestjs/common';
import { BasketballGameService } from './basketball-game.service';
import { BasketballGameResolver } from './basketball-game.resolver';

@Module({
  providers: [BasketballGameResolver, BasketballGameService]
})
export class BasketballGameModule {}

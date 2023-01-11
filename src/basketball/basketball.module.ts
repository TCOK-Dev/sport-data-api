import { Module } from '@nestjs/common';
import { BasketballResolver } from './basketball.resolver';
import { BasketballService } from './basketball.service';

@Module({
  providers: [BasketballResolver, BasketballService],
})
export class BasketballModule {}

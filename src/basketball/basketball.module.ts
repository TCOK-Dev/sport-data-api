import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketballController } from './basketball.controller';
import { BasketballService } from './basketball.service';
import { Basketball } from './entities/basketball.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Basketball])],
  controllers: [BasketballController],
  providers: [BasketballService],
  exports: [BasketballService],
})
export class BasketballModule {}

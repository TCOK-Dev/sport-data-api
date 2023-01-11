import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BasketballGameScore } from 'src/basketball-game-score/entities/basketball-game-score.entity';
import { Basketball } from 'src/basketball/entities/basketball.entity';

export class CreateBasketballGameDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  quarter: string;

  @IsNumber()
  @IsOptional()
  clock: number;

  @IsString()
  @IsOptional()
  awayTeam: string;

  @IsString()
  @IsOptional()
  homeTeam: string;

  @IsNumber()
  @IsOptional()
  awayScore: number;

  @IsNumber()
  @IsOptional()
  homeScore: number;

  @IsString()
  @IsOptional()
  awaySpread: string;

  @IsString()
  @IsOptional()
  homeSpread: string;

  @IsString()
  @IsOptional()
  awayOverUnder: string;

  @IsString()
  @IsOptional()
  homeOverUnder: string;

  basketball: Basketball;

  scores: BasketballGameScore[];
}

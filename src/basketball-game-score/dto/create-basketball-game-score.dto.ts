import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BasketballGame } from 'src/basketball-game/entities/basketball-game.entity';

export class CreateBasketballGameScoreDto {
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

  game: BasketballGame;
}

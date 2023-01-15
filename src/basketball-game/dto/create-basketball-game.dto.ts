import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBasketballGameScoreDto } from 'src/basketball-game-score/dto/create-basketball-game-score.dto';
import { CreateBasketballDto } from 'src/basketball/dto/create-basketball.dto';

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

  @IsOptional()
  basketball?: CreateBasketballDto;

  @IsOptional()
  scores?: CreateBasketballGameScoreDto[];
}
